import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'

// 蝴蝶数据类型
export interface ButterflyMemory {
  id: number
  created_at: string
  user_name: string
  content: string
  image_url: string | null  // 支持逗号分隔的多张图片URL
  audio_url: string | null
  web_url: string | null
  is_published: boolean
  // 位置信息（计算得出）
  position?: {
    x: number
    y: number
  }
}

/**
 * 计算七影蝶拥有的字段数量
 * @param memory 蝴蝶记忆数据
 * @returns 字段数量（1-4）
 */
export const calculateFieldCount = (memory: ButterflyMemory): number => {
  let count = 0
  
  // 检查文字内容
  if (memory.content && memory.content.trim().length > 0) {
    count++
  }
  
  // 检查图片内容：从image_url字段中解析逗号分隔的图片
  if (memory.image_url && memory.image_url.trim().length > 0) {
    const images = memory.image_url.split(',').map(url => url.trim()).filter(url => url.length > 0)
    if (images.length > 0) {
      count++
    }
  }
  
  // 检查音频内容
  if (memory.audio_url && memory.audio_url.trim().length > 0) {
    count++
  }
  
  // 检查跳转链接
  if (memory.web_url && memory.web_url.trim().length > 0) {
    count++
  }
  
  // 如果没有字段，返回0（将使用默认权重0.5）
  return count
}

interface MemoryButterflyProps {
  memory: ButterflyMemory
  onClick: () => void
}

// 蝴蝶容器 - 根据position绝对定位，位置坐标表示蝴蝶中心
const ButterflyContainer = styled(motion.div)<{ 
  x: number
  y: number
  size: number 
}>`
  position: absolute;
  left: ${props => props.x}%;
  top: ${props => props.y}%;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  transform: translate(-50%, -50%); /* 让位置坐标表示蝴蝶中心 */
  z-index: 10;
  filter: drop-shadow(0 2px 8px rgba(135, 206, 235, 0.3));
  transition: filter 0.3s ease;
  
  /* 添加特殊类名，供灯笼鼠标检测 */
  &.memory-butterfly {
    cursor: pointer;
  }
  
  &:hover {
    filter: drop-shadow(0 4px 16px rgba(135, 206, 235, 0.6));
  }
`

// 蝴蝶图片
const ButterflyImage = styled.img<{ size: number }>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  object-fit: contain;
  pointer-events: none;
`

// 蝴蝶图片URL
const BUTTERFLY_IMAGES = [
  'https://sprbweb-src.oss-cn-guangzhou.aliyuncs.com/public/images/webps/%E4%B8%83%E5%BD%B1%E8%9D%B6-3.webp',
  'https://sprbweb-src.oss-cn-guangzhou.aliyuncs.com/public/images/webps/%E4%B8%83%E5%BD%B1%E8%9D%B6-4.webp'
]

// 计算蝴蝶尺寸：根据字段数量动态调整
// 公式：(字段数量 + 1) × 25px
// 0个字段: (0 + 1) × 25 = 25px
// 1个字段: (1 + 1) × 25 = 50px
// 2个字段: (2 + 1) × 25 = 75px  
// 3个字段: (3 + 1) × 25 = 100px
// 4个字段: (4 + 1) × 25 = 125px
export const calculateButterflySize = (fieldCount: number): number => {
  const baseSize = 25  // 基础尺寸25px
  return (fieldCount + 1) * baseSize
}

const MemoryButterfly: React.FC<MemoryButterflyProps> = ({ memory, onClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  
  // 计算蝴蝶尺寸
  const fieldCount = calculateFieldCount(memory)
  const butterflySize = calculateButterflySize(fieldCount)
  
  // 获取位置，如果没有则默认中心位置
  const position = memory.position || { x: 50, y: 50 }

  // 自动播放动画：根据悬停状态调整速度
  // 正常速度：400ms，悬停速度：200ms
  useEffect(() => {
    const interval = isHovered ? 200 : 400
    
    intervalRef.current = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % BUTTERFLY_IMAGES.length)
    }, interval)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isHovered])

  return (
    <ButterflyContainer
      x={position.x}
      y={position.y}
      size={butterflySize}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="memory-butterfly"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        y: [0, -5, 0, -3, 0]  // 轻微上下浮动效果
      }}
      transition={{ 
        opacity: { duration: 0.5 },
        scale: { duration: 0.5 },
        y: { 
          duration: 3, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }
      }}
      whileHover={{ 
        scale: 1.1,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.95 }}
    >
      <ButterflyImage
        src={BUTTERFLY_IMAGES[currentImageIndex]}
        alt={memory.user_name}
        size={butterflySize}
      />
    </ButterflyContainer>
  )
}

export default MemoryButterfly

