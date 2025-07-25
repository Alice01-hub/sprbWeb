import React, { useState } from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'

// 星点组件（用motion.div实现动画）
const Star = motion<{x: number, y: number, size: number, opacity: number}>(styled.div`
  position: absolute;
  left: ${props => props.x}vw;
  top: ${props => props.y}vh;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: rgba(255,255,255,${props => props.opacity});
  border-radius: 50%;
  pointer-events: none;
  filter: blur(0.5px);
`)

interface StarData {
  x: number
  y: number
  size: number
  opacity: number
  float: number
  duration: number
}

interface StarryBackgroundProps {
  isVisible?: boolean
}

const StarryBackground: React.FC<StarryBackgroundProps> = ({ isVisible = true }) => {
  // 随机生成星点数组（增加动画参数）
  const [stars] = useState<StarData[]>(() => {
    const arr = []
    for (let i = 0; i < 80; i++) {
      arr.push({
        x: Math.random() * 100, // vw
        y: Math.random() * 100, // vh
        size: Math.random() * 1.8 + 0.7, // 0.7~2.5px
        opacity: Math.random() * 0.5 + 0.5, // 0.5~1
        float: Math.random() * 6 + 2, // 浮动幅度2~8px
        duration: Math.random() * 3 + 2 // 动画时长2~5s
      })
    }
    return arr
  })

  if (!isVisible) return null

  return (
    <>
      {stars.map((star, idx) => (
        <Star
          key={idx}
          x={star.x}
          y={star.y}
          size={star.size}
          opacity={star.opacity}
          animate={{
            y: [0, -star.float, 0, star.float, 0],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
            delay: Math.random() * 3
          }}
        />
      ))}
    </>
  )
}

export default StarryBackground