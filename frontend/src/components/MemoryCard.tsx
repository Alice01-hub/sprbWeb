import React, { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { ButterflyMemory } from './MemoryButterfly'

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
  cursor: pointer;
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

// 标题 - 渐变星光效果
const Title = styled.h2`
  color: #fff;
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 20px 0;
  font-family: '华文行楷', 'STXingkai', 'KaiTi', 'SimKai', cursive;
  text-shadow: 
    0 0 20px rgba(135, 206, 235, 0.5),
    0 0 40px rgba(135, 206, 235, 0.3),
    2px 2px 10px rgba(0, 0, 0, 0.5);
  background: linear-gradient(
    120deg,
    #87CEEB 0%,
    #98E4D6 30%,
    #E0F7FA 50%,
    #98E4D6 70%,
    #87CEEB 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 200%;
  animation: shimmer 4s ease-in-out infinite;
  padding-right: 50px;
  letter-spacing: 1px;
  
  @keyframes shimmer {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
`

// 作者和日期信息 - 柔和的夜色
const MetaInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  flex-wrap: wrap;
  gap: 15px;
  padding: 12px 0;
  border-bottom: 1px solid rgba(135, 206, 235, 0.15);
`

const Author = styled.span`
  color: rgba(152, 228, 214, 0.95);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &::before {
    content: '✨';
    font-size: 16px;
  }
`

const DateDisplay = styled.span`
  color: rgba(135, 206, 235, 0.7);
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &::before {
    content: '🌙';
    font-size: 14px;
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

// 图片容器
const ImageContainer = styled.div`
  margin: 25px 0;
  border-radius: 12px;
  overflow: hidden;
  max-height: 450px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(5, 10, 31, 0.4);
  border: 1px solid rgba(135, 206, 235, 0.2);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(135, 206, 235, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    border-color: rgba(135, 206, 235, 0.4);
    box-shadow: 
      0 12px 48px rgba(0, 0, 0, 0.5),
      0 0 30px rgba(135, 206, 235, 0.3);
    transform: translateY(-2px);
  }
  
  &::after {
    content: '🔍 点击查看大图';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.7) 0%,
      transparent 100%
    );
    color: rgba(255, 255, 255, 0.9);
    padding: 15px;
    text-align: center;
    font-size: 14px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::after {
    opacity: 1;
  }
`

const ContentImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 450px;
  object-fit: contain;
`

// 图片放大查看器
const ImageLightbox = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.95);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  cursor: pointer;
`

const LightboxImage = styled(motion.img)`
  max-width: 95%;
  max-height: 95%;
  object-fit: contain;
  box-shadow: 
    0 20px 100px rgba(0, 0, 0, 0.8),
    0 0 80px rgba(135, 206, 235, 0.4);
  border-radius: 8px;
  cursor: default;
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
  gap: 10px;
  background: linear-gradient(
    135deg,
    rgba(83, 52, 131, 0.8) 0%,
    rgba(114, 9, 183, 0.8) 50%,
    rgba(135, 206, 235, 0.8) 100%
  );
  color: #fff;
  padding: 14px 28px;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  margin-top: 20px;
  transition: all 0.3s ease;
  box-shadow: 
    0 6px 20px rgba(114, 9, 183, 0.4),
    0 0 20px rgba(135, 206, 235, 0.2);
  border: 1px solid rgba(135, 206, 235, 0.3);
  font-size: 15px;
  
  &::before {
    content: '🔗';
    font-size: 18px;
  }
  
  &:hover {
    background: linear-gradient(
      135deg,
      rgba(114, 9, 183, 0.9) 0%,
      rgba(83, 52, 131, 0.9) 50%,
      rgba(135, 206, 235, 0.9) 100%
    );
    transform: translateY(-3px);
    box-shadow: 
      0 10px 30px rgba(114, 9, 183, 0.6),
      0 0 40px rgba(135, 206, 235, 0.4);
  }
  
  &:active {
    transform: translateY(-1px);
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

const MemoryCard: React.FC<MemoryCardProps> = ({ memory, onClose }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isImageExpanded, setIsImageExpanded] = useState(false)
  const [linkError, setLinkError] = useState<string | null>(null)
  
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
      onClose()
    }
  }

  // ESC键关闭
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isImageExpanded) {
          setIsImageExpanded(false)
        } else {
          onClose()
        }
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, isImageExpanded])

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
            onClick={onClose}
            whileHover={{ scale: 1.15, rotate: 90 }}
            whileTap={{ scale: 0.95 }}
          >
            ×
          </CloseButton>
          
          <Title>{memory.title}</Title>
          
          {/* 作者和日期信息 - 始终显示 */}
          <MetaInfo>
            <Author>{memory.user_name}</Author>
            <DateDisplay>{formatDate(memory.created_at)}</DateDisplay>
          </MetaInfo>
          
          {/* 内容 - 如果存在则显示 */}
          {memory.content && <Content>{memory.content}</Content>}
          
          {/* 图片 - 如果存在则显示，点击可放大 */}
          {memory.image_url && (
            <ImageContainer onClick={() => setIsImageExpanded(true)}>
              <ContentImage src={memory.image_url} alt={memory.title} />
            </ImageContainer>
          )}
          
          {/* 音频播放器 - 如果存在则显示 */}
          {memory.audio_url && (
            <AudioPlayer controls>
              <source src={memory.audio_url} type="audio/mpeg" />
              您的浏览器不支持音频播放。
            </AudioPlayer>
          )}
          
          {/* 跳转链接 - 如果存在则显示 */}
          {memory.web_url && (
            <>
              <LinkButton
                href={memory.web_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLinkClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                查看相关内容
              </LinkButton>
              
              {/* 链接错误提示 */}
              {linkError && (
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
        </CardContainer>
      </Overlay>
      
      {/* 图片放大查看器 */}
      {isImageExpanded && memory.image_url && (
        <ImageLightbox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => setIsImageExpanded(false)}
        >
          <LightboxImage
            src={memory.image_url}
            alt={memory.title}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          />
        </ImageLightbox>
      )}
    </AnimatePresence>
  )
}

export default MemoryCard
