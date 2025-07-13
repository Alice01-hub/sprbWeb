import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'

interface StarryBackgroundProps {
  isVisible: boolean
}

interface Star {
  id: number
  x: number
  y: number
  size: number
  animationDelay: number
  animationDuration: number
}

// 星星闪烁动画
const starTwinkle = keyframes`
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
`

// 星星漂浮动画
const starFloat = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-3px);
  }
`

const StarryContainer = styled.div<{ isVisible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(10, 25, 50, 0.95) 0%,      /* 深蓝黑色 */
    rgba(15, 35, 65, 0.9) 20%,      /* 深蓝色 */
    rgba(20, 45, 80, 0.85) 40%,     /* 中深蓝色 */
    rgba(25, 55, 95, 0.8) 60%,      /* 中蓝色 */
    rgba(30, 65, 110, 0.75) 80%,    /* 浅蓝色 */
    rgba(35, 75, 125, 0.7) 100%     /* 最浅蓝色 */
  );
  border-radius: 15px;
  opacity: ${props => props.isVisible ? 1 : 0};
  transition: opacity 0.4s ease;
  overflow: hidden;
  z-index: 1;
`

const Star = styled.div<{ 
  x: number; 
  y: number; 
  size: number; 
  animationDelay: number; 
  animationDuration: number;
}>`
  position: absolute;
  left: ${props => props.x}%;
  top: ${props => props.y}%;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.6) 50%, transparent 100%);
  border-radius: 50%;
  animation: 
    ${starTwinkle} ${props => props.animationDuration}s infinite ease-in-out,
    ${starFloat} ${props => props.animationDuration * 1.5}s infinite ease-in-out;
  animation-delay: ${props => props.animationDelay}s;
  z-index: 2;
  
  /* 添加光晕效果 */
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: ${props => props.size * 2}px;
    height: ${props => props.size * 2}px;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: ${starTwinkle} ${props => props.animationDuration * 0.8}s infinite ease-in-out;
    animation-delay: ${props => props.animationDelay * 0.5}s;
  }
`

const StarryBackground: React.FC<StarryBackgroundProps> = ({ isVisible }) => {
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    // 生成随机星星
    const generateStars = () => {
      const newStars: Star[] = []
      const starCount = 25 // 星星数量

      for (let i = 0; i < starCount; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100, // 0-100% 的位置
          y: Math.random() * 100,
          size: Math.random() * 3 + 1, // 1-4px 的大小
          animationDelay: Math.random() * 3, // 0-3s 的延迟
          animationDuration: Math.random() * 2 + 2, // 2-4s 的持续时间
        })
      }
      setStars(newStars)
    }

    generateStars()
  }, [])

  return (
    <StarryContainer isVisible={isVisible}>
      {stars.map((star) => (
        <Star
          key={star.id}
          x={star.x}
          y={star.y}
          size={star.size}
          animationDelay={star.animationDelay}
          animationDuration={star.animationDuration}
        />
      ))}
    </StarryContainer>
  )
}

export default StarryBackground 