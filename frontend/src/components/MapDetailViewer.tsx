import React from 'react'
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

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(0, 0, 0, 0.1);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  color: #333;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: all 0.3s ease;
  &:hover {
    background: rgba(0, 0, 0, 0.2);
    transform: scale(1.1);
  }
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
  left: ${props => props.x}%;
  top: ${props => props.y}%;
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
          <CloseButton
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            ✕
          </CloseButton>
          {mode === 'desc' ? (
            <>
              <Title>{title}</Title>
              <Description>{description}</Description>
            </>
          ) : (
            <>
              <MapContainer>
                <MapImage src={mapImage} alt={title} />
                {iconsToRender.map((pos, idx) => (
                  <MapIcon
                    key={idx}
                    x={pos.x}
                    y={pos.y}
                    size={pos.size}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3 + idx * 0.1, type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    {pos.icon ? (
                      <MapIconImage src={pos.icon} alt="icon" size={pos.size} />
                    ) : (
                      pos.emoji || iconEmoji
                    )}
                  </MapIcon>
                ))}
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