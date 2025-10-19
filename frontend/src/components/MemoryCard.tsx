import React, { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { ButterflyMemory } from './MemoryButterfly'
import { useAudio } from '../contexts/AudioContext'
import './MemoryCard.css'

interface MemoryCardProps {
  memory: ButterflyMemory | null
  onClose: () => void
}

// 遮罩层 - 营造夜晚宁静的氛围
const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(5, 10, 31, 0.85) 0%,      /* 深邃的夜空 */
    rgba(12, 20, 70, 0.90) 50%,    /* 午夜蓝 */
    rgba(34, 58, 92, 0.85) 100%    /* 黎明前的深蓝 */
  );
  backdrop-filter: blur(12px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  
  /* 添加星光闪烁效果 */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      radial-gradient(1px 1px at 20% 30%, rgba(255, 255, 255, 0.3), transparent),
      radial-gradient(1px 1px at 60% 70%, rgba(135, 206, 235, 0.4), transparent),
      radial-gradient(1px 1px at 50% 50%, rgba(255, 255, 255, 0.2), transparent),
      radial-gradient(1px 1px at 80% 10%, rgba(152, 228, 214, 0.3), transparent),
      radial-gradient(1px 1px at 90% 60%, rgba(255, 255, 255, 0.2), transparent);
    background-repeat: repeat;
    background-size: 200px 200px;
    animation: twinkle 3s ease-in-out infinite alternate;
    pointer-events: none;
  }
  
  @keyframes twinkle {
    0% { opacity: 0.3; }
    100% { opacity: 0.7; }
  }
`

// 卡片容器 - 夜空回忆盒子
const CardContainer = styled(motion.div)`
  background: linear-gradient(
    160deg,
    rgba(15, 25, 50, 0.95) 0%,      /* 深蓝夜空 */
    rgba(25, 35, 70, 0.90) 30%,     /* 午夜 */
    rgba(34, 58, 92, 0.95) 70%,     /* 黎明前 */
    rgba(20, 30, 60, 0.95) 100%     /* 深邃 */
  );
  border-radius: 20px;
  padding: 40px;
  max-width: 700px;
  width: 100%;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 
    0 25px 80px rgba(0, 0, 0, 0.6),
    0 0 60px rgba(135, 206, 235, 0.2),
    inset 0 1px 0 rgba(135, 206, 235, 0.1),
    inset 0 -1px 0 rgba(83, 52, 131, 0.1);
  border: 1.5px solid rgba(135, 206, 235, 0.3);
  position: relative;
  
  /* 内部光晕效果 */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 150px;
    background: radial-gradient(
      ellipse at top,
      rgba(135, 206, 235, 0.08) 0%,
      transparent 70%
    );
    border-radius: 20px 20px 0 0;
    pointer-events: none;
  }
  
  /* 自定义滚动条 */
  &::-webkit-scrollbar {
    width: 10px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(10, 15, 35, 0.3);
    border-radius: 5px;
    margin: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(
      180deg,
      rgba(135, 206, 235, 0.5) 0%,
      rgba(152, 228, 214, 0.5) 100%
    );
    border-radius: 5px;
    
    &:hover {
      background: linear-gradient(
        180deg,
        rgba(135, 206, 235, 0.7) 0%,
        rgba(152, 228, 214, 0.7) 100%
      );
    }
  }
`

// 关闭按钮 - 隐藏式设计
const CloseButton = styled(motion.button)`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1.5px solid rgba(135, 206, 235, 0.3);
  background: rgba(15, 25, 50, 0.6);
  color: rgba(255, 255, 255, 0.7);
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(255, 107, 107, 0.2);
    border-color: rgba(255, 107, 107, 0.5);
    color: rgba(255, 255, 255, 0.9);
    transform: scale(1.1) rotate(90deg);
  }
`

// 作者名 - 重点突出的星光效果
const AuthorName = styled.h2`
  color: #fff;
  font-size: 36px;
  font-weight: 800;
  margin: 0 0 15px 0;
  font-family: '华文行楷', 'STXingkai', 'KaiTi', 'SimKai', cursive;
  text-shadow: 
    0 0 25px rgba(152, 228, 214, 0.8),
    0 0 50px rgba(152, 228, 214, 0.5),
    0 0 75px rgba(152, 228, 214, 0.3),
    2px 2px 15px rgba(0, 0, 0, 0.6);
  background: linear-gradient(
    120deg,
    #98E4D6 0%,
    #87CEEB 25%,
    #E0F7FA 50%,
    #87CEEB 75%,
    #98E4D6 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 200%;
  animation: shimmer 3s ease-in-out infinite;
  padding-right: 50px;
  letter-spacing: 2px;
  text-align: center;
  
  @keyframes shimmer {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
`

// 日期信息 - 柔和的夜色，居中显示
const MetaInfo = styled.div<{ hasOtherContent?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
  padding: 15px 0;
  border-bottom: ${props => props.hasOtherContent ? '1px solid rgba(135, 206, 235, 0.2)' : 'none'};
`

const DateDisplay = styled.span`
  color: rgba(135, 206, 235, 0.8);
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  
  &::before {
    content: '🌙';
    font-size: 18px;
  }
`

// 内容区域 - 柔和的阅读体验
const Content = styled.div`
  color: rgba(255, 255, 255, 0.85);
  font-size: 16px;
  line-height: 1.9;
  margin-bottom: 25px;
  white-space: pre-wrap;
  word-wrap: break-word;
  padding: 20px 0;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  
  /* 首字放大效果 */
  &::first-letter {
    font-size: 2em;
    font-weight: bold;
    float: left;
    margin-right: 8px;
    line-height: 1;
    color: rgba(152, 228, 214, 0.9);
  }
`


// 音频播放器 - 夜色主题
const AudioPlayer = styled.audio`
  width: 100%;
  margin: 25px 0;
  border-radius: 12px;
  height: 50px;
  
  &::-webkit-media-controls-panel {
    background: linear-gradient(
      90deg,
      rgba(15, 25, 50, 0.8) 0%,
      rgba(34, 58, 92, 0.8) 100%
    );
    border-radius: 12px;
  }
  
  &::-webkit-media-controls-play-button,
  &::-webkit-media-controls-pause-button {
    background-color: rgba(135, 206, 235, 0.8);
    border-radius: 50%;
  }
  
  &::-webkit-media-controls-current-time-display,
  &::-webkit-media-controls-time-remaining-display {
    color: rgba(255, 255, 255, 0.9);
  }
  
  &::-webkit-media-controls-timeline {
    background-color: rgba(135, 206, 235, 0.3);
    border-radius: 25px;
  }
`

// 链接按钮 - 星光效果
const LinkButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #1A1A2E, #16213E);
  color: #fff;
  padding: 12px 28px;
  border-radius: 20px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 
    0 4px 15px rgba(0, 0, 0, 0.4),
    0 0 20px rgba(135, 206, 235, 0.1);
  border: 1px solid rgba(135, 206, 235, 0.3);
  font-size: 15px;
  
  &::before {
    content: '🔗';
    font-size: 18px;
  }
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 
      0 6px 20px rgba(0, 0, 0, 0.5),
      0 0 30px rgba(135, 206, 235, 0.2);
  }
  
  &:active {
    transform: scale(0.98);
  }
`

// 错误提示
const ErrorMessage = styled(motion.div)`
  background: rgba(255, 107, 107, 0.15);
  border: 1.5px solid rgba(255, 107, 107, 0.4);
  border-radius: 10px;
  padding: 12px 16px;
  margin-top: 15px;
  color: rgba(255, 150, 150, 0.95);
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  
  &::before {
    content: '⚠️';
    font-size: 18px;
  }
`

/**
 * 获取记忆的图片数组，从image_url字段中解析逗号分隔的图片URL
 * @param memory 蝴蝶记忆数据
 * @returns 图片URL数组
 */
const getMemoryImages = (memory: ButterflyMemory): string[] => {
  if (!memory.image_url || !memory.image_url.trim()) {
    return []
  }
  
  // 按逗号分隔图片URL，并过滤空字符串
  const images = memory.image_url
    .split(',')
    .map(url => url.trim())
    .filter(url => url.length > 0)
  
  return images
}

/**
 * 随机选择图片数组中的指定数量图片
 * @param images 图片数组
 * @param maxCount 最大选择数量
 * @returns 随机选择的图片数组
 */
const selectRandomImages = (images: string[], maxCount: number): string[] => {
  if (images.length <= maxCount) {
    return images
  }
  
  // 创建图片索引数组
  const indices = Array.from({ length: images.length }, (_, i) => i)
  
  // 随机打乱数组
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[indices[i], indices[j]] = [indices[j], indices[i]]
  }
  
  // 选择前maxCount个
  return indices.slice(0, maxCount).map(index => images[index])
}

const MemoryCard: React.FC<MemoryCardProps> = ({ memory, onClose }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [linkError, setLinkError] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [showImageModal, setShowImageModal] = useState(false)
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [isInitialized, setIsInitialized] = useState(false)
  
  // 使用音频管理上下文
  const { 
    playMemoryAudio, 
    pauseMemoryAudio,
    stopMemoryAudio,
    isMemoryPlaying,
    setMemoryCardOpen 
  } = useAudio()

  // 初始化图片选择 - 只在组件首次打开时执行
  useEffect(() => {
    if (memory && !isInitialized) {
      const allImages = getMemoryImages(memory)
      if (allImages.length > 0) {
        const randomImages = selectRandomImages(allImages, 9)
        setSelectedImages(randomImages)
      }
      setIsInitialized(true)
    }
  }, [memory, isInitialized])

  // 当组件关闭时重置状态，确保下次打开时重新选择图片
  useEffect(() => {
    return () => {
      // 组件卸载时重置状态
      setIsInitialized(false)
      setSelectedImages([])
    }
  }, [])
  
  // 音频播放控制 - 合并播放和停止功能
  const handleAudioToggle = () => {
    if (isMemoryPlaying) {
      // 如果正在播放，则停止（会恢复神域BGM）
      stopMemoryAudio()
    } else {
      // 如果未播放，则开始播放
      if (memory?.audio_url) {
        playMemoryAudio(memory.audio_url)
      }
    }
  }
  
  // 组件挂载时设置信息框为打开状态
  useEffect(() => {
    setMemoryCardOpen(true)
    
    // 组件卸载时设置信息框为关闭状态
    return () => {
      setMemoryCardOpen(false)
    }
  }, [setMemoryCardOpen])
  
  // 格式化日期
  const formatDate = (dateString: string) => {
    try {
      // 检查日期字符串是否有效
      if (!dateString || typeof dateString !== 'string') {
        return '未知时间'
      }
      
      const date = new Date(dateString)
      
      // 检查日期是否有效
      if (isNaN(date.getTime())) {
        console.warn('无效的日期字符串:', dateString)
        return '无效日期'
      }
      
      return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch (error) {
      console.error('日期格式化错误:', error, '原始字符串:', dateString)
      return '日期错误'
    }
  }

  // 点击遮罩关闭
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setMemoryCardOpen(false) // 先设置状态
      onClose()
    }
  }

  // ESC键关闭
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMemoryCardOpen(false) // 先设置状态
        onClose()
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, setMemoryCardOpen])

  // 处理图片点击
  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl)
    setShowImageModal(true)
  }

  // 关闭图片模态框
  const closeImageModal = () => {
    setShowImageModal(false)
    setSelectedImage(null)
  }

  // 调整预览框尺寸的函数
  const adjustModalSize = (img: HTMLImageElement) => {
    const modalContent = img.closest('.modal-content') as HTMLElement
    
    if (modalContent) {
      // 获取图片的自然尺寸
      const imgWidth = img.naturalWidth
      const imgHeight = img.naturalHeight
      
      // 计算合适的显示尺寸（保持宽高比）
      const maxWidth = window.innerWidth * 0.9 - 80 // 减去padding
      const maxHeight = window.innerHeight * 0.9 - 120 // 减去header和padding
      
      let displayWidth = imgWidth
      let displayHeight = imgHeight
      
      // 如果图片太大，按比例缩放
      if (imgWidth > maxWidth || imgHeight > maxHeight) {
        const widthRatio = maxWidth / imgWidth
        const heightRatio = maxHeight / imgHeight
        const ratio = Math.min(widthRatio, heightRatio)
        
        displayWidth = imgWidth * ratio
        displayHeight = imgHeight * ratio
      }
      
      // 设置模态框内容尺寸
      modalContent.style.width = `${displayWidth + 40}px` // 40px是左右padding
      modalContent.style.height = `${displayHeight + 100}px` // 100px是header和padding
    }
  }

  // 处理图片加载完成，调整预览框尺寸
  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.target as HTMLImageElement
    adjustModalSize(img)
  }

  // 监听窗口大小变化
  useEffect(() => {
    const handleResize = () => {
      if (showImageModal && selectedImage) {
        const img = document.querySelector('.modal-image-preview') as HTMLImageElement
        if (img && img.complete) {
          adjustModalSize(img)
        }
      }
    }

    if (showImageModal) {
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [showImageModal, selectedImage])

  // 验证并处理链接点击
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!memory?.web_url) return
    
    // 简单的URL验证
    try {
      const url = new URL(memory.web_url)
      if (!url.protocol.startsWith('http')) {
        e.preventDefault()
        setLinkError('链接格式不正确，请确认链接是否以 http:// 或 https:// 开头')
        setTimeout(() => setLinkError(null), 5000)
      }
    } catch (error) {
      e.preventDefault()
      setLinkError('链接格式不正确，请联系管理员确认链接的正确性')
      setTimeout(() => setLinkError(null), 5000)
    }
  }

  if (!memory) return null

  return (
    <AnimatePresence>
      <Overlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        onClick={handleOverlayClick}
      >
        <CardContainer
          ref={cardRef}
          initial={{ opacity: 0, scale: 0.85, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 50 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
        >
          <CloseButton
            onClick={() => {
              setMemoryCardOpen(false) // 先设置状态
              onClose()
            }}
            whileHover={{ scale: 1.15, rotate: 90 }}
            whileTap={{ scale: 0.95 }}
          >
            ×
          </CloseButton>
          
          {/* 作者名 - 重点突出显示 */}
          <AuthorName>{memory.user_name}</AuthorName>
          
          {/* 检查是否有其他内容 */}
          {(() => {
            const hasContent = memory.content && memory.content.trim().length > 0
            const hasImages = selectedImages.length > 0
            const hasAudio = memory.audio_url && memory.audio_url.trim().length > 0
            const hasLink = memory.web_url && memory.web_url.trim().length > 0
            const hasOtherContent = hasContent || hasImages || hasAudio || hasLink
            
            return (
              <>
                {/* 日期信息 - 居中显示 */}
                <MetaInfo hasOtherContent={!!hasOtherContent}>
                  <DateDisplay>{formatDate(memory.created_at)}</DateDisplay>
                </MetaInfo>
                
                {/* 如果有其他内容才显示 */}
                {hasOtherContent && (
                  <>
                    {/* 内容 - 如果存在则显示 */}
                    {hasContent && <Content>{memory.content}</Content>}
                    
                    {/* 图片 - 根据数量选择展示方式 */}
                    {(() => {
                      if (selectedImages.length === 0) return null
                      
                      const allImages = getMemoryImages(memory)
                      
                      // 如果只有一张图片，使用单张展示
                      if (selectedImages.length === 1) {
                        return (
                          <div className="memory-single-image-container">
                            <h4 className="images-title">
                              📷 记忆图片 (1张)
                              {allImages.length > 1 && (
                                <span className="random-note"> (从{allImages.length}张中随机选择)</span>
                              )}
                            </h4>
                            <div className="single-image-wrapper">
                              <img 
                                src={selectedImages[0]} 
                                alt="记忆图片"
                                className="single-image"
                                onClick={() => handleImageClick(selectedImages[0])}
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
                          </div>
                        )
                      }
                      
                      // 多张图片使用九宫格展示
                      return (
                        <div className="memory-images-container">
                          <h4 className="images-title">
                            📷 记忆图片 ({selectedImages.length}张)
                            {allImages.length > 9 && (
                              <span className="random-note"> (从{allImages.length}张中随机选择)</span>
                            )}
                          </h4>
                          <div className="images-grid">
                            {selectedImages.map((url, index) => (
                              <div 
                                key={index} 
                                className="grid-image-item"
                                onClick={() => handleImageClick(url)}
                              >
                                <img 
                                  src={url} 
                                  alt={`记忆图片 ${index + 1}`}
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
                        </div>
                      )
                    })()}
                    
                    {/* 按钮区域 - 根据音频和链接的存在情况调整布局 */}
                    {(hasAudio || hasLink) && (
            <div style={{ 
              margin: '25px 0',
              display: 'flex', 
              justifyContent: memory.audio_url && memory.web_url ? 'center' : 'center',
              gap: '15px',
              flexWrap: 'wrap'
            }}>
              {/* 音频播放控制 - 如果存在音频则显示 */}
              {memory.audio_url && (
                <button
                  onClick={handleAudioToggle}
                  style={{
                    background: isMemoryPlaying 
                      ? 'linear-gradient(135deg, #2C1810, #4A2C17)' 
                      : 'linear-gradient(135deg, #1A1A2E, #16213E)',
                    border: '1px solid rgba(135, 206, 235, 0.3)',
                    borderRadius: '20px',
                    padding: '12px 28px',
                    color: 'white',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontSize: '15px',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.4), 0 0 20px rgba(135, 206, 235, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)'
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.5), 0 0 30px rgba(135, 206, 235, 0.2)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)'
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.4), 0 0 20px rgba(135, 206, 235, 0.1)'
                  }}
                >
                  <span style={{ fontSize: '18px' }}>
                    {isMemoryPlaying ? '⏹' : '▶'}
                  </span>
                  <span>{isMemoryPlaying ? '停止回忆' : '播放回忆'}</span>
                </button>
              )}
              
              {/* 跳转链接 - 如果存在则显示 */}
              {memory.web_url && (
                <LinkButton
                  href={memory.web_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLinkClick}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  跳转回忆
                </LinkButton>
              )}
            </div>
                    )}
                    
                    {/* 链接错误提示 */}
                    {memory.web_url && linkError && (
                      <ErrorMessage
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        {linkError}
                      </ErrorMessage>
                    )}
                  </>
                )}
              </>
            )
          })()}
        </CardContainer>
      </Overlay>

      {/* 图片模态框 */}
      <AnimatePresence>
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
                <button className="modal-close-btn" onClick={closeImageModal}>×</button>
              </div>
              <div className="modal-body">
                <img 
                  src={selectedImage} 
                  alt="图片预览" 
                  className="modal-image-preview"
                  onLoad={handleImageLoad}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </AnimatePresence>
  )
}

export default MemoryCard
