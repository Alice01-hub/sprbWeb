import React, { useState, useRef, useEffect, ReactNode } from 'react'
import styled from 'styled-components'
import { useDevice } from '../contexts/DeviceContext'

interface TouchOptimizedTooltipProps {
  children: ReactNode
  content: ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'
  className?: string
}

interface TooltipContainerProps {
  position: 'top' | 'bottom' | 'left' | 'right'
}

const TooltipWrapper = styled.div`
  position: relative;
  display: inline-block;
`

const TooltipContainer = styled.div<TooltipContainerProps>`
  position: absolute;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  min-width: 200px;
  max-width: 300px;
  
  /* 根据位置调整定位 */
  ${props => {
    switch (props.position) {
      case 'top':
        return `
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          margin-bottom: 8px;
          
          &::after {
            content: '';
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            border: 6px solid transparent;
            border-top-color: #fff;
          }
        `
      case 'bottom':
        return `
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          margin-top: 8px;
          
          &::after {
            content: '';
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            border: 6px solid transparent;
            border-bottom-color: #fff;
          }
        `
      case 'left':
        return `
          right: 100%;
          top: 50%;
          transform: translateY(-50%);
          margin-right: 8px;
          
          &::after {
            content: '';
            position: absolute;
            left: 100%;
            top: 50%;
            transform: translateY(-50%);
            border: 6px solid transparent;
            border-left-color: #fff;
          }
        `
      case 'right':
        return `
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
          margin-left: 8px;
          
          &::after {
            content: '';
            position: absolute;
            right: 100%;
            top: 50%;
            transform: translateY(-50%);
            border: 6px solid transparent;
            border-right-color: #fff;
          }
        `
      default:
        return ''
    }
  }}
  
  /* 移动端优化 */
  @media (max-width: 768px) {
    min-width: 250px;
    max-width: 90vw;
    font-size: 14px;
    
    /* 在移动端，优先显示在上方或下方，避免左右溢出 */
    ${props => (props.position === 'left' || props.position === 'right') && `
      left: 50%;
      transform: translateX(-50%);
      top: 100%;
      margin-top: 8px;
      margin-left: 0;
      margin-right: 0;
      
      &::after {
        left: 50%;
        right: auto;
        top: auto;
        bottom: 100%;
        transform: translateX(-50%) translateY(0);
        border: 6px solid transparent;
        border-bottom-color: #fff;
        border-left-color: transparent;
        border-right-color: transparent;
      }
    `}
  }
`

const ChildrenWrapper = styled.div`
  cursor: pointer;
  
  /* 桌面端保持原有的悬停样式 */
  @media (min-width: 769px) {
    cursor: default;
  }
`

export const TouchOptimizedTooltip: React.FC<TouchOptimizedTooltipProps> = ({
  children,
  content,
  position = 'top',
  className
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const { isMobile } = useDevice()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<number>()

  // 处理点击外部区域关闭tooltip（仅移动端）
  useEffect(() => {
    if (!isMobile || !isVisible) return

    const handleClickOutside = (event: Event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsVisible(false)
      }
    }

    const handleTouchOutside = (event: TouchEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsVisible(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleTouchOutside)
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleTouchOutside)
    }
  }, [isMobile, isVisible])

  // 清理定时器
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleMouseEnter = () => {
    if (!isMobile) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      setIsVisible(true)
    }
  }

  const handleMouseLeave = () => {
    if (!isMobile) {
      // 添加小延迟，避免鼠标快速移动时闪烁
      timeoutRef.current = window.setTimeout(() => {
        setIsVisible(false)
      }, 100)
    }
  }

  const handleClick = (event: React.MouseEvent) => {
    if (isMobile) {
      event.preventDefault()
      event.stopPropagation()
      setIsVisible(!isVisible)
    }
  }

  const handleTouchStart = (event: React.TouchEvent) => {
    if (isMobile) {
      event.preventDefault()
      setIsVisible(!isVisible)
    }
  }

  return (
    <TooltipWrapper 
      ref={wrapperRef}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <ChildrenWrapper
        onClick={handleClick}
        onTouchStart={handleTouchStart}
      >
        {children}
      </ChildrenWrapper>
      
      {isVisible && (
        <TooltipContainer position={position}>
          {content}
        </TooltipContainer>
      )}
    </TooltipWrapper>
  )
}

// 预定义的tooltip内容组件，与现有设计保持一致
export const TooltipImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 4px;
  margin-bottom: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);
`

export const TooltipTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #333;
  margin-bottom: 4px;
  text-align: center;
`

export const TooltipDesc = styled.div`
  font-size: 14px;
  color: #666;
  line-height: 1.4;
`

// 用于创建带图片的tooltip内容的便捷组件
interface TooltipContentProps {
  image?: string
  title: string
  description: string
  alt?: string
}

export const TooltipContent: React.FC<TooltipContentProps> = ({
  image,
  title,
  description,
  alt
}) => (
  <>
    {image && <TooltipImage src={image} alt={alt || title} />}
    <TooltipTitle>{title}</TooltipTitle>
    <TooltipDesc>{description}</TooltipDesc>
  </>
)

export default TouchOptimizedTooltip