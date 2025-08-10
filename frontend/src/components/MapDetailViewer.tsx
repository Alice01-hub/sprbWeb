import React, { useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'

interface MapDetailViewerProps {
  isOpen: boolean
  onClose: () => void
  mapImage: string
  title: string
  description: string
  iconEmoji?: string
  iconPosition?: { x: number; y: number }
  iconPositions?: { x: number; y: number; emoji?: string; icon?: string; size?: number }[] // 新增size属性
  mode: 'desc' | 'full'
}

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`

const ModalContent = styled(motion.div)<{ small?: boolean }>`
  background: white;
  border-radius: 20px;
  max-width: ${props => props.small ? '350px' : '95vw'};
  max-height: ${props => props.small ? '180px' : '95vh'};
  min-width: ${props => props.small ? '260px' : 'unset'};
  min-height: ${props => props.small ? '120px' : 'unset'};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  padding: ${props => props.small ? '24px 20px' : '20px'};
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
  justify-content: center;
`



const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 75vh;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
`

const MapImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 15px;
`

const MapIcon = styled(motion.div)<{ x: number; y: number; size?: number }>`
  position: absolute;
  font-size: ${props => props.size || 30}px;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  transform: translate(-50%, -50%);
  z-index: 5;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5));
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
`

const MapIconImage = styled.img<{ size?: number }>`
  width: ${props => props.size || 30}px;
  height: ${props => props.size || 30}px;
  object-fit: contain;
`

const InfoSection = styled.div`
  text-align: center;
  max-width: 600px;
`

const Title = styled.h3`
  font-size: 28px;
  color: #5d4037;
  margin: 0 0 10px 0;
  font-weight: 700;
  font-family: 'KaiTi', 'SimKai', serif;
`

const Description = styled.p`
  font-size: 18px;
  color: #666;
  margin: 0;
  line-height: 1.6;
  text-align: center;
`

const MapDetailViewer: React.FC<MapDetailViewerProps> = ({
  isOpen,
  onClose,
  mapImage,
  title,
  description,
  iconEmoji = '🤭',
  iconPosition = { x: 50, y: 50 },
  iconPositions, // 新增
  mode
}) => {
  if (!isOpen) return null

  // 保证每个icon都带emoji属性，兼容类型
  const iconsToRender = iconPositions && iconPositions.length > 0
    ? iconPositions
    : []

  // 计算图像在容器中的实际显示区域，用于像素级定位与尺寸缩放
  const containerRef = useRef<HTMLDivElement | null>(null)
  const imgRef = useRef<HTMLImageElement | null>(null)
  const [naturalSize, setNaturalSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 })
  const [containerSize, setContainerSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 })

  const updateSizes = () => {
    const c = containerRef.current
    if (c) {
      setContainerSize({ w: c.clientWidth, h: c.clientHeight })
    }
    const img = imgRef.current
    if (img && img.naturalWidth && img.naturalHeight) {
      setNaturalSize({ w: img.naturalWidth, h: img.naturalHeight })
    }
  }

  useEffect(() => {
    updateSizes()
    const handler = () => updateSizes()
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  const displayed = useMemo(() => {
    const cw = containerSize.w
    const ch = containerSize.h
    const iw = naturalSize.w
    const ih = naturalSize.h
    if (!cw || !ch || !iw || !ih) {
      return { left: 0, top: 0, width: 0, height: 0, scale: 1 }
    }
    const containerRatio = cw / ch
    const imageRatio = iw / ih
    let width = 0
    let height = 0
    let left = 0
    let top = 0
    if (imageRatio > containerRatio) {
      // 图片更“宽”，以宽度铺满
      width = cw
      height = cw / imageRatio
      left = 0
      top = (ch - height) / 2
    } else {
      // 图片更“高”，以高度铺满
      height = ch
      width = ch * imageRatio
      left = (cw - width) / 2
      top = 0
    }
    // 按照一个基准宽度来缩放图标尺寸
    const BASE_WIDTH = 1000
    const scale = width > 0 ? width / BASE_WIDTH : 1
    return { left, top, width, height, scale }
  }, [containerSize, naturalSize])

  return (
    <AnimatePresence>
      <ModalOverlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <ModalContent
          small={mode === 'desc'}
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          onClick={e => e.stopPropagation()}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >

          {mode === 'desc' ? (
            <>
              <Title>{title}</Title>
              <Description>{description}</Description>
            </>
          ) : (
            <>
              <MapContainer ref={containerRef}>
                <MapImage
                  ref={imgRef as React.RefObject<HTMLImageElement>}
                  src={mapImage}
                  alt={title}
                  onLoad={updateSizes}
                />
                {iconsToRender.map((pos, idx) => {
                  const left = displayed.left + (displayed.width * (pos.x / 100))
                  const top = displayed.top + (displayed.height * (pos.y / 100))
                  const base = pos.size ?? 30
                  const sizePx = Math.max(16, Math.round(base * (displayed.scale || 1)))
                  return (
                    <MapIcon
                      key={idx}
                      x={left}
                      y={top}
                      size={sizePx}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.3 + idx * 0.1, type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      {pos.icon ? (
                        <MapIconImage src={pos.icon} alt="icon" size={sizePx} />
                      ) : (
                        pos.emoji || iconEmoji
                      )}
                    </MapIcon>
                  )
                })}
              </MapContainer>
              <InfoSection>
                <Title>{title}</Title>
                <Description>{description}</Description>
              </InfoSection>
            </>
          )}
        </ModalContent>
      </ModalOverlay>
    </AnimatePresence>
  )
}

export default MapDetailViewer 