import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'

// 蝴蝶数据类型
export interface ButterflyMemory {
  id: number
  created_at: string
  user_name: string
  title: string
  content: string
  image_url: string | null
  audio_url: string | null
  web_url: string | null
  weight: number  // 1-5，决定蝴蝶尺寸
  is_published: boolean
  // 位置信息（计算得出）
  position?: {
    x: number
    y: number
  }
}

interface MemoryButterflyProps {
  memory: ButterflyMemory
  onClick: () => void
}

// 蝴蝶容器 - 根据position绝对定位
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

// 计算蝴蝶尺寸：基础尺寸 80px，然后根据weight调整
// weight=1: 80 * 0.25 = 20px
// weight=2: 80 * 0.45 = 36px
// weight=3: 80 * 0.65 = 52px
// weight=4: 80 * 0.85 = 68px
// weight=5: 80 * 1.05 = 84px
const calculateButterflySize = (weight: number): number => {
  const baseSize = 80
  const scaleFactor = 0.05 + (weight * 0.2)  // weight=1时为0.25，每增加1，增加0.2
  return Math.round(baseSize * scaleFactor)
}

const MemoryButterfly: React.FC<MemoryButterflyProps> = ({ memory, onClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  
  // 计算蝴蝶尺寸
  const butterflySize = calculateButterflySize(memory.weight)
  
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
        alt={memory.title}
        size={butterflySize}
      />
    </ButterflyContainer>
  )
}

export default MemoryButterfly

