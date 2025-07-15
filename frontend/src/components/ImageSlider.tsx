import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'

interface ImageSliderProps {
  images: Array<{
    src: string
    label: string
  }>
  title: string
  autoPlay?: boolean
  interval?: number
  onImageClick?: (imageIndex: number) => void // 新增：点击图片的回调
}

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
`

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

const SliderImage = styled(motion.img)<{ clickable?: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  user-select: none;
  cursor: ${props => props.clickable ? 'pointer' : 'default'};
  transition: transform 0.3s ease;
  
  &:hover {
    transform: ${props => props.clickable ? 'scale(1.05)' : 'none'};
  }
`

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.3) 70%,
    rgba(0, 0, 0, 0.6) 100%
  );
  pointer-events: none;
`

const ImageLabel = styled(motion.div)`
  position: absolute;
  bottom: 10px;
  left: 15px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
  z-index: 10;
`

const ControlsContainer = styled.div`
  position: absolute;
  bottom: 10px;
  right: 15px;
  display: flex;
  gap: 8px;
  z-index: 10;
`

const ControlButton = styled(motion.button)<{ active?: boolean }>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.6)'};
  color: ${props => props.active ? '#333' : '#666'};
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.9);
    color: #333;
    transform: scale(1.1);
  }
`

const DotsContainer = styled.div`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
  z-index: 10;
`

const Dot = styled(motion.button)<{ active?: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.4)'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.7);
    transform: scale(1.2);
  }
`

const ImageSlider: React.FC<ImageSliderProps> = ({ 
  images, 
  title, 
  autoPlay = true, 
  interval = 3000,
  onImageClick // 新增：点击回调
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)

  // 自动播放逻辑
  useEffect(() => {
    if (!isPlaying || images.length <= 1) return

    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length)
    }, interval)

    return () => clearInterval(timer)
  }, [isPlaying, images.length, interval])

  const handlePrevious = () => {
    setCurrentIndex(prev => (prev - 1 + images.length) % images.length)
  }

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % images.length)
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  // 新增：处理图片点击
  const handleImageClick = () => {
    if (onImageClick) {
      onImageClick(currentIndex)
    }
  }

  if (images.length === 0) {
    return (
      <SliderContainer>
        <div style={{ 
          width: '100%', 
          height: '100%', 
          background: '#f0f0f0', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: '#666',
          fontSize: '14px'
        }}>
          暂无图片
        </div>
      </SliderContainer>
    )
  }

  return (
    <SliderContainer>
      <ImageContainer>
        <AnimatePresence mode="wait">
          <SliderImage
            key={currentIndex}
            src={images[currentIndex].src}
            alt={`${title} - ${images[currentIndex].label}`}
            clickable={!!onImageClick}
            onClick={handleImageClick}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </AnimatePresence>
        
        <ImageOverlay />
        
        <ImageLabel
          key={`label-${currentIndex}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {images[currentIndex].label}
        </ImageLabel>

        {/* 控制按钮 */}
        <ControlsContainer>
          {images.length > 1 && (
            <>
              <ControlButton
                onClick={handlePrevious}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                ‹
              </ControlButton>
              
              <ControlButton
                onClick={handlePlayPause}
                active={isPlaying}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {isPlaying ? '⏸' : '▶'}
              </ControlButton>
              
              <ControlButton
                onClick={handleNext}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                ›
              </ControlButton>
            </>
          )}
        </ControlsContainer>

        {/* 指示器 */}
        {images.length > 1 && (
          <DotsContainer>
            {images.map((_, index) => (
              <Dot
                key={index}
                active={index === currentIndex}
                onClick={() => setCurrentIndex(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </DotsContainer>
        )}
      </ImageContainer>
    </SliderContainer>
  )
}

export default ImageSlider 