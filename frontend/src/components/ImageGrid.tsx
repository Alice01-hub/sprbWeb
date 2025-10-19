import React, { useState } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'

interface ImageGridProps {
  images: string[]
  maxImages?: number
  onImageClick?: (imageUrl: string, index: number) => void
}

// 九宫格容器
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin: 25px 0;
  border-radius: 12px;
  overflow: hidden;
  background: rgba(5, 10, 31, 0.4);
  border: 1px solid rgba(135, 206, 235, 0.2);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(135, 206, 235, 0.1);
  transition: all 0.3s ease;
  position: relative;
  padding: 8px;
  
  &:hover {
    border-color: rgba(135, 206, 235, 0.4);
    box-shadow: 
      0 12px 48px rgba(0, 0, 0, 0.5),
      0 0 30px rgba(135, 206, 235, 0.3);
    transform: translateY(-2px);
  }
  
  &::after {
    content: '🔍 点击任意图片查看大图';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.8) 0%,
      transparent 100%
    );
    color: rgba(255, 255, 255, 0.9);
    padding: 15px;
    text-align: center;
    font-size: 14px;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }
  
  &:hover::after {
    opacity: 1;
  }
`

// 单张图片容器（当只有1张图片时）
const SingleImageContainer = styled.div`
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

// 网格图片项
const GridImage = styled(motion.img)`
  width: 100%;
  height: 120px;
  object-fit: cover;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: scale(1.05);
    z-index: 10;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
    border: 2px solid rgba(135, 206, 235, 0.6);
  }
  
  &:active {
    transform: scale(0.95);
  }
`

// 单张图片
const SingleImage = styled(motion.img)`
  width: 100%;
  height: auto;
  max-height: 450px;
  object-fit: contain;
  cursor: pointer;
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
  backdrop-filter: blur(10px);
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

// 导航按钮
const NavButton = styled(motion.button)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.8);
  border: 2px solid rgba(135, 206, 235, 0.3);
  color: white;
  font-size: 24px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(135, 206, 235, 0.9);
    border-color: rgba(135, 206, 235, 0.8);
    transform: translateY(-50%) scale(1.1);
    box-shadow: 0 8px 25px rgba(135, 206, 235, 0.4);
  }
  
  &:active {
    transform: translateY(-50%) scale(0.95);
  }
  
  &.prev {
    left: 30px;
  }
  
  &.next {
    right: 30px;
  }
`

// 图片计数器
const ImageCounter = styled.div`
  position: absolute;
  top: 30px;
  right: 30px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px 20px;
  border-radius: 25px;
  font-size: 14px;
  font-weight: 600;
  border: 1px solid rgba(135, 206, 235, 0.3);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
`

// 关闭按钮
const CloseButton = styled(motion.button)`
  position: absolute;
  top: 30px;
  left: 30px;
  background: rgba(0, 0, 0, 0.8);
  border: 2px solid rgba(255, 107, 107, 0.3);
  color: white;
  font-size: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(255, 107, 107, 0.9);
    border-color: rgba(255, 107, 107, 0.8);
    transform: scale(1.1);
    box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
  }
  
  &:active {
    transform: scale(0.95);
  }
`

// 加载指示器
const LoadingIndicator = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  border: 3px solid rgba(135, 206, 235, 0.3);
  border-top: 3px solid #87CEEB;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: translate(-50%, -50%) rotate(0deg); }
    100% { transform: translate(-50%, -50%) rotate(360deg); }
  }
`

// 错误指示器
const ErrorIndicator = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: rgba(255, 107, 107, 0.8);
  font-size: 12px;
  text-align: center;
  background: rgba(0, 0, 0, 0.7);
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid rgba(255, 107, 107, 0.3);
`

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

const ImageGrid: React.FC<ImageGridProps> = ({ 
  images, 
  maxImages = 9, 
  onImageClick 
}) => {
  const [expandedImage, setExpandedImage] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())
  const [errorImages, setErrorImages] = useState<Set<string>>(new Set())
  
  // 如果没有图片，不渲染
  if (!images || images.length === 0) {
    return null
  }
  
  // 随机选择图片（如果超过最大数量）
  const selectedImages = selectRandomImages(images, maxImages)
  
  // 处理图片点击
  const handleImageClick = (imageUrl: string, index: number) => {
    if (onImageClick) {
      onImageClick(imageUrl, index)
    } else {
      setExpandedImage(imageUrl)
      setCurrentImageIndex(index)
    }
  }
  
  // 关闭放大查看
  const closeLightbox = () => {
    setExpandedImage(null)
  }
  
  // 导航到上一张图片
  const goToPrevious = () => {
    const newIndex = currentImageIndex === 0 ? selectedImages.length - 1 : currentImageIndex - 1
    setCurrentImageIndex(newIndex)
    setExpandedImage(selectedImages[newIndex])
  }
  
  // 导航到下一张图片
  const goToNext = () => {
    const newIndex = currentImageIndex === selectedImages.length - 1 ? 0 : currentImageIndex + 1
    setCurrentImageIndex(newIndex)
    setExpandedImage(selectedImages[newIndex])
  }
  
  // 键盘导航
  const handleKeyDown = (e: KeyboardEvent) => {
    if (expandedImage) {
      if (e.key === 'Escape') {
        closeLightbox()
      } else if (e.key === 'ArrowLeft') {
        goToPrevious()
      } else if (e.key === 'ArrowRight') {
        goToNext()
      }
    }
  }
  
  // 处理图片加载成功
  const handleImageLoad = (imageUrl: string) => {
    setLoadedImages(prev => new Set([...prev, imageUrl]))
    setErrorImages(prev => {
      const newSet = new Set(prev)
      newSet.delete(imageUrl)
      return newSet
    })
  }
  
  // 处理图片加载失败
  const handleImageError = (imageUrl: string) => {
    setErrorImages(prev => new Set([...prev, imageUrl]))
  }
  
  // 添加键盘事件监听
  React.useEffect(() => {
    if (expandedImage) {
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [expandedImage, currentImageIndex, selectedImages.length])
  
  // 只有1张图片时使用单张展示
  if (selectedImages.length === 1) {
    return (
      <>
        <SingleImageContainer onClick={() => handleImageClick(selectedImages[0], 0)}>
          <SingleImage
            src={selectedImages[0]}
            alt="记忆图片"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          />
        </SingleImageContainer>
        
        {/* 单张图片的放大查看器 */}
        <AnimatePresence>
          {expandedImage && (
            <ImageLightbox
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeLightbox}
            >
              <LightboxImage
                src={expandedImage}
                alt="记忆图片"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
              />
            </ImageLightbox>
          )}
        </AnimatePresence>
      </>
    )
  }
  
  // 多张图片时使用九宫格展示
  return (
    <>
      <GridContainer>
        {selectedImages.map((imageUrl, index) => {
          const isLoaded = loadedImages.has(imageUrl)
          const hasError = errorImages.has(imageUrl)
          
          return (
            <div key={`${imageUrl}-${index}`} style={{ position: 'relative' }}>
              <GridImage
                src={imageUrl}
                alt={`记忆图片 ${index + 1}`}
                onClick={() => isLoaded && handleImageClick(imageUrl, index)}
                onLoad={() => handleImageLoad(imageUrl)}
                onError={() => handleImageError(imageUrl)}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ 
                  opacity: isLoaded ? 1 : 0.3, 
                  scale: 1 
                }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: isLoaded ? 1.05 : 1 }}
                whileTap={{ scale: isLoaded ? 0.95 : 1 }}
                style={{
                  cursor: isLoaded ? 'pointer' : 'default',
                  filter: hasError ? 'grayscale(100%)' : 'none'
                }}
              />
              
              {/* 加载指示器 */}
              {!isLoaded && !hasError && (
                <LoadingIndicator />
              )}
              
              {/* 错误指示器 */}
              {hasError && (
                <ErrorIndicator>
                  加载失败
                </ErrorIndicator>
              )}
            </div>
          )
        })}
      </GridContainer>
      
      {/* 九宫格的放大查看器 */}
      <AnimatePresence>
        {expandedImage && (
          <ImageLightbox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeLightbox}
          >
            <CloseButton
              onClick={(e) => {
                e.stopPropagation()
                closeLightbox()
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              ×
            </CloseButton>
            
            <NavButton
              className="prev"
              onClick={(e) => {
                e.stopPropagation()
                goToPrevious()
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              ‹
            </NavButton>
            
            <LightboxImage
              src={expandedImage}
              alt={`记忆图片 ${currentImageIndex + 1}`}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            />
            
            <NavButton
              className="next"
              onClick={(e) => {
                e.stopPropagation()
                goToNext()
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              ›
            </NavButton>
            
            <ImageCounter>
              {currentImageIndex + 1} / {selectedImages.length}
            </ImageCounter>
          </ImageLightbox>
        )}
      </AnimatePresence>
    </>
  )
}

export default ImageGrid
