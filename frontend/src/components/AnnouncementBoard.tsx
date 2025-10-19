import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { supabase } from '../config/supabaseClient'
import './AnnouncementBoard.css'

// 公告项组件
const AnimatedAnnouncementItem = ({ 
  announcement, 
  index, 
  isSelected, 
  onSelect, 
  onMouseEnter 
}: {
  announcement: any
  index: number
  isSelected: boolean
  onSelect: (announcement: any, index: number) => void
  onMouseEnter: (index: number) => void
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.5, once: false })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
      case 'high':  // 向后兼容旧值
        return '#ff4757'  // 红色 - 紧急通知
      case 'important':
      case 'medium':  // 向后兼容旧值
        return '#ffa502'  // 黄色 - 重要通知
      case 'normal':
      case 'low':  // 向后兼容旧值
        return '#2ed573'  // 绿色 - 一般通知
      default:
        return '#747d8c'  // 默认灰色
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-CN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <motion.div
      ref={ref}
      data-index={index}
      onMouseEnter={() => onMouseEnter(index)}
      onClick={() => onSelect(announcement, index)}
      initial={{ scale: 0.7, opacity: 0, y: 20 }}
      animate={inView ? { scale: 1, opacity: 1, y: 0 } : { scale: 0.7, opacity: 0, y: 20 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      style={{ marginBottom: "0.5rem" }}
      whileHover={{ 
        scale: 1.02,
        y: -2,
        transition: { duration: 0.2 }
      }}
      whileTap={{ 
        scale: 0.98,
        transition: { duration: 0.1 }
      }}
    >
      <div 
        className="announcement-item"
        style={{ 
          backgroundColor: getPriorityColor(announcement.priority),
          borderColor: getPriorityColor(announcement.priority)
        }}
      >
        <div className="announcement-content">
          <h3 className="announcement-title">{announcement.title}</h3>
          <span className="announcement-date">{formatDate(announcement.created_at)}</span>
        </div>
      </div>
    </motion.div>
  )
}

// 公告栏组件
const AnnouncementBoard = () => {
  const [announcements, setAnnouncements] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [keyboardNav, setKeyboardNav] = useState(false)
  const [isListExpanded, setIsListExpanded] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [showImageModal, setShowImageModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [imagesPerPage] = useState(9)

  const listRef = useRef<HTMLDivElement>(null)

  // 分页相关函数
  const getImageUrls = (imgUrl: any): string[] => {
    let imageUrls: string[] = [];
    try {
      if (typeof imgUrl === 'string') {
        imageUrls = JSON.parse(imgUrl);
      } else if (Array.isArray(imgUrl)) {
        imageUrls = imgUrl;
      }
    } catch (e) {
      if (typeof imgUrl === 'string') {
        imageUrls = imgUrl.split(',').map((url: string) => url.trim());
      }
    }
    return imageUrls;
  }

  const getPaginatedImages = (imageUrls: string[]) => {
    const totalPages = Math.ceil(imageUrls.length / imagesPerPage);
    const startIndex = (currentPage - 1) * imagesPerPage;
    const endIndex = startIndex + imagesPerPage;
    return {
      images: imageUrls.slice(startIndex, endIndex),
      totalPages,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1
    };
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  }

  const resetPagination = () => {
    setCurrentPage(1);
  }

  // 格式化公告内容的函数
  const formatAnnouncementContent = (content: string) => {
    if (!content) return null;

    // 按换行符分割内容
    const lines = content.split('\n');
    
    return lines.map((line, index) => {
      const trimmedLine = line.trim();
      
      // 空行处理
      if (!trimmedLine) {
        return <div key={index} className="content-break"></div>;
      }
      
      // 标题处理 (# 标题)
      if (trimmedLine.startsWith('# ')) {
        const titleText = trimmedLine.substring(2);
        return <h3 key={index} className="content-title">{titleText}</h3>;
      }
      
      // 二级标题处理 (## 标题)
      if (trimmedLine.startsWith('## ')) {
        const titleText = trimmedLine.substring(3);
        return <h4 key={index} className="content-subtitle">{titleText}</h4>;
      }
      
      // 列表项处理 (- 项目)
      if (trimmedLine.startsWith('- ')) {
        const listText = trimmedLine.substring(2);
        return <div key={index} className="content-list-item">• {formatInlineText(listText)}</div>;
      }
      
      // 缩进处理 (检测行首空格数量)
      const leadingSpaces = line.length - line.trimStart().length;
      if (leadingSpaces >= 2) {
        const indentLevel = Math.floor(leadingSpaces / 2);
        const indentText = line.trim();
        return (
          <div key={index} className="content-indent" style={{ marginLeft: `${indentLevel * 24}px` }}>
            {formatInlineText(indentText)}
          </div>
        );
      }
      
      // 普通段落处理
      return (
        <p key={index} className="content-paragraph">
          {formatInlineText(trimmedLine)}
        </p>
      );
    });
  };

  // 格式化行内文本的函数
  const formatInlineText = (text: string) => {
    if (!text) return null;
    
    // 处理加粗 (**文字**)
    const boldRegex = /\*\*(.*?)\*\*/g;
    let formattedText = text.replace(boldRegex, '<strong>$1</strong>');
    
    // 处理斜体 (*文字*)
    const italicRegex = /\*(.*?)\*/g;
    formattedText = formattedText.replace(italicRegex, '<em>$1</em>');
    
    // 处理代码 (`代码`)
    const codeRegex = /`(.*?)`/g;
    formattedText = formattedText.replace(codeRegex, '<code>$1</code>');
    
    // 处理链接 [文字](链接)
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    formattedText = formattedText.replace(linkRegex, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    
    // 处理表情符号 (将 :smile: 转换为 😊)
    const emojiMap: { [key: string]: string } = {
      ':smile:': '😊',
      ':heart:': '❤️',
      ':star:': '⭐',
      ':warning:': '⚠️',
      ':info:': 'ℹ️',
      ':check:': '✅',
      ':cross:': '❌',
      ':arrow:': '➡️',
      ':fire:': '🔥',
      ':sparkles:': '✨'
    };
    
    Object.entries(emojiMap).forEach(([code, emoji]) => {
      formattedText = formattedText.replace(new RegExp(code, 'g'), emoji);
    });
    
    // 使用 dangerouslySetInnerHTML 渲染格式化后的文本
    return <span dangerouslySetInnerHTML={{ __html: formattedText }} />;
  };

  useEffect(() => {
    fetchAnnouncements()
  }, [])

  const fetchAnnouncements = async () => {
    try {
      setLoading(true)
      setError(null)
      
      console.log('🔍 开始获取公告数据...')
      console.log('Supabase URL:', supabase.supabaseUrl)
      console.log('Supabase Key:', supabase.supabaseKey ? '已设置' : '未设置')
      console.log('Supabase Key长度:', supabase.supabaseKey?.length || 0)
      
      // 测试Supabase连接
      const { data: testData, error: testError } = await supabase
        .from('announcements')
        .select('id')
        .limit(1)
      
      if (testError) {
        console.error('❌ Supabase连接测试失败:', testError)
        console.error('连接错误详情:', {
          message: testError.message,
          details: testError.details,
          hint: testError.hint,
          code: testError.code
        })
        setError(`数据库连接失败: ${testError.message}`)
        return
      }
      
      console.log('✅ Supabase连接测试成功')
      
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false })

      console.log('📊 查询结果:', { data, error })

      if (error) {
        console.error('❌ 获取公告失败:', error)
        console.error('错误详情:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        })
        setError(`获取公告失败: ${error.message}`)
        return
      }

      console.log('✅ 成功获取公告:', data?.length || 0, '条')
      setAnnouncements(data || [])
      
    } catch (err: any) {
      console.error('❌ 获取公告过程中发生错误:', err)
      console.error('错误堆栈:', err.stack)
      setError(`网络错误: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleAnnouncementSelect = (announcement: any, index: number) => {
    setSelectedAnnouncement(announcement)
    setSelectedIndex(index)
    setShowModal(true)
    resetPagination() // 重置分页到第一页
  }

  const handleMouseEnter = (index: number) => {
    setSelectedIndex(index)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedAnnouncement(null)
  }

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl)
    setShowImageModal(true)
  }

  const closeImageModal = () => {
    setShowImageModal(false)
    setSelectedImage(null)
  }

  const toggleList = () => {
    setIsListExpanded(!isListExpanded)
  }

  // 键盘导航
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || (e.key === "Tab" && !e.shiftKey)) {
        e.preventDefault()
        setKeyboardNav(true)
        setSelectedIndex((prev) => Math.min(prev + 1, announcements.length - 1))
      } else if (e.key === "ArrowUp" || (e.key === "Tab" && e.shiftKey)) {
        e.preventDefault()
        setKeyboardNav(true)
        setSelectedIndex((prev) => Math.max(prev - 1, 0))
      } else if (e.key === "Enter") {
        if (selectedIndex >= 0 && selectedIndex < announcements.length) {
          e.preventDefault()
          handleAnnouncementSelect(announcements[selectedIndex], selectedIndex)
        }
      } else if (e.key === "Escape") {
        closeModal()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [announcements, selectedIndex])

  // 自动滚动到选中项
  useEffect(() => {
    if (!keyboardNav || selectedIndex < 0 || !listRef.current) return
    
    const container = listRef.current
    const selectedItem = container.querySelector(`[data-index="${selectedIndex}"]`) as HTMLElement | null
    
    if (selectedItem) {
      const extraMargin = 50
      const containerScrollTop = container.scrollTop
      const containerHeight = container.clientHeight
      const itemTop = selectedItem.offsetTop
      const itemBottom = itemTop + selectedItem.offsetHeight
      
      if (itemTop < containerScrollTop + extraMargin) {
        container.scrollTo({ top: itemTop - extraMargin, behavior: "smooth" })
      } else if (itemBottom > containerScrollTop + containerHeight - extraMargin) {
        container.scrollTo({
          top: itemBottom - containerHeight + extraMargin,
          behavior: "smooth",
        })
      }
    }
    setKeyboardNav(false)
  }, [selectedIndex, keyboardNav])

  // 点击外部区域关闭公告栏
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      
      // 检查点击的是否是公告栏相关元素
      const isAnnouncementElement = target.closest('.announcement-board-container')
      
      if (isListExpanded && !isAnnouncementElement) {
        setIsListExpanded(false)
      }
    }

    // 只在公告栏展开时添加事件监听器
    if (isListExpanded) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isListExpanded])

  if (error) {
    return (
      <div className="error-container">
        <h2>加载失败</h2>
        <p>{error}</p>
        <button onClick={fetchAnnouncements} className="retry-btn">
          重试
        </button>
      </div>
    )
  }

  return (
    <div className="announcement-board-container">
      <main className="announcement-main-content">
        {announcements.length === 0 ? (
          <div className="no-announcements">
            <p>暂无公告</p>
          </div>
        ) : (
          <div className="announcements-container">
            {/* 下拉/收起区域 */}
            <div className="toggle-area" onClick={toggleList}>
              <div className="wood-knot"></div>
              <div className="wood-knot"></div>
              <div className="wood-ring"></div>
              <div className="wood-ring"></div>
              <span className="toggle-text">
                {isListExpanded ? '关闭公告栏' : '打开公告栏'}
              </span>
            </div>

            {/* 公告列表 */}
            <AnimatePresence>
              {isListExpanded && (
                <motion.div 
                  className="scroll-list-container"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  {/* 木制纹理装饰 */}
                  <div className="wood-ring"></div>
                  <div className="wood-ring"></div>
                  
                  <div
                    ref={listRef}
                    className="scroll-list"
                  >
                    {loading ? (
                      <div className="loading-indicator">
                        <div className="loading-spinner-small"></div>
                        <span>加载中...</span>
                      </div>
                    ) : (
                      announcements.map((announcement, index) => (
                        <AnimatedAnnouncementItem
                          key={announcement.id}
                          announcement={announcement}
                          index={index}
                          isSelected={selectedIndex === index}
                          onSelect={handleAnnouncementSelect}
                          onMouseEnter={handleMouseEnter}
                        />
                      ))
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </main>

      {/* 模态框 */}
      {showModal && selectedAnnouncement && (
        <motion.div 
          className="modal-overlay" 
          onClick={closeModal}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="modal-content" 
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="modal-header">
              <h2>{selectedAnnouncement.title}</h2>
              <button className="modal-close" onClick={closeModal}>×</button>
            </div>
            
            <div className="modal-body">
              <div className="modal-meta">
                <span 
                  className="priority-badge"
                  style={{ 
                    backgroundColor: (selectedAnnouncement.priority === 'urgent' || selectedAnnouncement.priority === 'high') ? '#ff4757' : 
                                   (selectedAnnouncement.priority === 'important' || selectedAnnouncement.priority === 'medium') ? '#ffa502' : '#2ed573'
                  }}
                >
                  {(selectedAnnouncement.priority === 'urgent' || selectedAnnouncement.priority === 'high') ? '紧急通知' : 
                   (selectedAnnouncement.priority === 'important' || selectedAnnouncement.priority === 'medium') ? '重要通知' : '一般通知'}
                </span>
                <span className="author">发布人: {selectedAnnouncement.author}</span>
                <span className="date">
                  {new Date(selectedAnnouncement.created_at).toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
              
              <div className="modal-content-text">
                {formatAnnouncementContent(selectedAnnouncement.content)}
                
                {/* 多图九宫格显示区域 */}
                {selectedAnnouncement.img_url && (() => {
                  const imageUrls = getImageUrls(selectedAnnouncement.img_url);
                  const { images, totalPages, hasNextPage, hasPrevPage } = getPaginatedImages(imageUrls);
                  
                  return (
                    <div className="modal-images-container">
                      <h4 className="images-title">📷 相关图片 ({imageUrls.length}张)</h4>
                      <div className="images-grid">
                        {images.map((url, index) => (
                          <div 
                            key={index} 
                            className="grid-image-item"
                            onClick={() => handleImageClick(url)}
                          >
                            <img 
                              src={url} 
                              alt={`图片 ${(currentPage - 1) * imagesPerPage + index + 1}`}
                              className="grid-image"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const nextSibling = target.nextSibling as HTMLElement;
                                if (nextSibling) {
                                  nextSibling.style.display = 'flex';
                                }
                              }}
                            />
                            <div className="image-error-placeholder" style={{ display: 'none' }}>
                              <span>❌</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* 分页控件 */}
                      {totalPages > 1 && (
                        <div className="pagination-controls">
                          <button 
                            className="pagination-btn prev-btn"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={!hasPrevPage}
                          >
                            ← 上一页
                          </button>
                          
                          <div className="pagination-info">
                            <span className="current-page">{currentPage}</span>
                            <span className="page-separator">/</span>
                            <span className="total-pages">{totalPages}</span>
                          </div>
                          
                          <button 
                            className="pagination-btn next-btn"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={!hasNextPage}
                          >
                            下一页 →
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* 图片模态框 */}
      {showImageModal && selectedImage && (
        <motion.div 
          className="modal-overlay" 
          onClick={closeImageModal}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="modal-content" 
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="modal-header">
              <h2>图片预览</h2>
              <button className="modal-close" onClick={closeImageModal}>×</button>
            </div>
            <div className="modal-body">
              <img src={selectedImage} alt="图片预览" className="modal-image-preview" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default AnnouncementBoard
