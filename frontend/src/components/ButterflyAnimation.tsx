import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

interface ButterflyAnimationProps {
  isHovered: boolean
  size?: number  // 🦋 蝴蝶图片尺寸调整：修改这里的默认值或在调用时传入size参数来调整蝴蝶图片大小
}

const ButterflyContainer = styled(motion.div)<{ size: number }>`
  position: absolute;
  /* 🦋 蝴蝶图片尺寸设置：容器宽高由size参数控制 */
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  right: -${props => props.size / 2}px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 20;
  pointer-events: none;
`

const ButterflyImage = styled(motion.img)<{ size: number }>`
  /* 🦋 蝴蝶图片尺寸设置：图片实际显示尺寸由size参数控制 */
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  object-fit: contain;
  position: absolute;
  top: 0;
  left: 0;
`

const ButterflyAnimation: React.FC<ButterflyAnimationProps> = ({ 
  isHovered, 
  size = 150  // 🦋 蝴蝶图片尺寸调整：修改这里的默认值来调整蝴蝶图片大小
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(1) // 默认显示第二张图片（七影碟-4.png）
  const intervalRef = useRef<number | null>(null)

  const butterflyImages = [
    '/images/七影碟-3.png',  // 翅膀闪动状态1
    '/images/七影碟-4.png'   // 翅膀闪动状态2（默认显示）
  ]

  useEffect(() => {
    if (isHovered) {
      // 悬停时开始动画循环
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex(prev => (prev + 1) % butterflyImages.length)
      }, 400) // 每400ms切换一次图片，模拟蝴蝶翅膀闪动
    } else {
      // 不悬停时停止动画循环，显示默认图片
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      setCurrentImageIndex(1) // 显示默认图片（七影碟-4.png）
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isHovered])

  return (
    <ButterflyContainer
      size={size}
      initial={{ opacity: 0, scale: 0.5, x: -20 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.5, x: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <ButterflyImage
        src={butterflyImages[currentImageIndex]}
        alt="蝴蝶动画"
        size={size}
        // 🦋 简化动画：只保留图片循环播放，无缩放和旋转特效
      />
    </ButterflyContainer>
  )
}

export default ButterflyAnimation 