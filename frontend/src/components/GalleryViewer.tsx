import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'

export interface GalleryImage {
  src: string
  label: string
}

export interface GalleryViewerProps {
  isOpen: boolean
  onClose: () => void
  images: GalleryImage[]
  currentIndex: number
  title: string
  onPrevious?: () => void
  onNext?: () => void
  onIndexChange?: (index: number) => void
}

const ModalOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`

const ModalContent = styled(motion.div)`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
`

const ModalImage = styled.img`
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
`

const ModalInfo = styled.div`
  text-align: center;
  color: #333;
`

const ModalTitle = styled.h3`
  font-size: 22px;
  margin: 0 0 4px 0;
  color: #5d4037;
  font-family: 'KaiTi', 'SimKai', serif;
  font-weight: 700;
`

const ModalLabel = styled.p`
  font-size: 16px;
  margin: 0;
  color: #666;
  font-weight: 500;
`

const ImageCounter = styled.div`
  font-size: 14px;
  color: #666;
  margin-top: 4px;
  font-weight: 500;
`

const IndicatorBar = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`

const IndicatorDot = styled(motion.button)<{ active: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: ${props => (props.active ? '#5d4037' : '#ccc')};
  cursor: pointer;
`

export default function GalleryViewer(props: GalleryViewerProps) {
  const { isOpen, onClose, images, currentIndex, title, onPrevious, onNext, onIndexChange } = props
  const containerRef = useRef<HTMLDivElement>(null)

  // 统一的索引变更调用
  const changeIndexBy = useCallback(
    (delta: number) => {
      if (!images.length) return
      const nextIndex = (currentIndex + delta + images.length) % images.length
      if (onIndexChange) {
        onIndexChange(nextIndex)
      } else if (delta < 0 && onPrevious) {
        onPrevious()
      } else if (delta > 0 && onNext) {
        onNext()
      }
    },
    [currentIndex, images.length, onIndexChange, onPrevious, onNext]
  )

  // 滚轮切换
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (!isOpen || images.length <= 1) return
      e.preventDefault()
      changeIndexBy(e.deltaY > 0 ? 1 : -1)
    },
    [isOpen, images.length, changeIndexBy]
  )

  // 触摸滑动
  const touchStartX = useRef<number | null>(null)
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
  }, [])
  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX.current == null) return
      const diff = touchStartX.current - e.targetTouches[0].clientX
      if (Math.abs(diff) > 50) {
        changeIndexBy(diff > 0 ? 1 : -1)
        touchStartX.current = null
      }
    },
    [changeIndexBy]
  )
  const onTouchEnd = useCallback(() => {
    touchStartX.current = null
  }, [])

  // 键盘切换 / 关闭
  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      if (!isOpen) return
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          changeIndexBy(-1)
          break
        case 'ArrowRight':
          e.preventDefault();
          changeIndexBy(1)
          break
        case 'Escape':
          e.preventDefault();
          onClose()
          break
      }
    }
    document.addEventListener('keydown', keyHandler)
    return () => document.removeEventListener('keydown', keyHandler)
  }, [isOpen, changeIndexBy, onClose])

  // 绑定滚轮
  useEffect(() => {
    const el = containerRef.current
    if (!el || images.length <= 1) return
    el.addEventListener('wheel', handleWheel, { passive: false })
    return () => el.removeEventListener('wheel', handleWheel)
  }, [handleWheel, images.length])

  if (!isOpen || images.length === 0) return null

  return (
    <AnimatePresence>
      <ModalOverlay initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
        <ModalContent
          ref={containerRef}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={e => e.stopPropagation()}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <ModalImage src={images[currentIndex]?.src} alt={`${title} - ${images[currentIndex]?.label}`} />
          <ModalInfo>
            <ModalTitle>{title}</ModalTitle>
            <ModalLabel>{images[currentIndex]?.label}</ModalLabel>
            {images.length > 1 && (
              <ImageCounter>{currentIndex + 1} / {images.length}</ImageCounter>
            )}
          </ModalInfo>

          {images.length > 1 && (
            <IndicatorBar>
              {images.map((_, idx) => (
                <IndicatorDot
                  key={idx}
                  active={idx === currentIndex}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (onIndexChange) onIndexChange(idx)
                    else if (idx !== currentIndex) changeIndexBy(idx > currentIndex ? 1 : -1)
                  }}
                />
              ))}
            </IndicatorBar>
          )}
        </ModalContent>
      </ModalOverlay>
    </AnimatePresence>
  )
}


