import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import OSS_CONFIG from '../config/ossConfig';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: linear-gradient(
    135deg, 
    #87CEEB 0%,    /* 天蓝色 */
    #98E4D6 20%,   /* 薄荷绿 */
    #F4E285 40%,   /* 浅黄色 */
    #FFB347 60%,   /* 金橙色 */
    #FF8C69 80%,   /* 珊瑚色 */
    #FFA07A 100%   /* 浅橙色 */
  );
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 20px;
  padding-top: 30px;
  padding-bottom: 40px;
`

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 30px;
`

const Title = styled.h1`
  font-size: 48px;
  color: #5d4037;
  margin-bottom: 10px;
  font-weight: 700;
  font-family: 'KaiTi', 'SimKai', serif;
  text-align: center;
`

const Subtitle = styled.h2`
  font-size: 24px;
  color: #ff6b35;
  margin-bottom: 20px;
  font-weight: 600;
  text-align: center;
`

const NoticeBox = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 20px 30px;
  margin: 20px auto 30px auto;
  max-width: 800px;
  width: 90%;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
`

const NoticeText = styled.p`
  font-size: 16px;
  color: #5d4037;
  line-height: 1.6;
  margin: 0;
  text-align: center;
  font-weight: 500;
`

const QRCodeSection = styled(motion.div)`
  text-align: center;
  margin: 20px auto;
  max-width: 800px;
  width: 90%;
`

const QRCodeButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.95);
  border: none;
  border-radius: 15px;
  padding: 15px 25px;
  font-size: 18px;
  color: #5d4037;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  font-weight: 600;
  font-family: 'KaiTi', 'SimKai', serif;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`

const QRCodeModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
  padding: 20px;
`

const QRCodeContent = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  width: 100%;
`

const QRCodeImage = styled.img`
  width: 100%;
  max-width: 300px;
  height: auto;
  border-radius: 10px;
  margin-bottom: 20px;
`

const QRCodeTitle = styled.h3`
  font-size: 20px;
  color: #5d4037;
  margin-bottom: 10px;
  font-family: 'KaiTi', 'SimKai', serif;
  font-weight: 700;
`

const QRCodeDescription = styled.p`
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  margin: 0;
`

const QRCodeLink = styled.a`
  display: inline-block;
  margin-top: 15px;
  padding: 10px 20px;
  background: linear-gradient(45deg, #87CEEB, #98E4D6);
  color: #2E8B57;
  text-decoration: none;
  border-radius: 25px;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(135, 206, 235, 0.3);
  
  &:hover {
    background: linear-gradient(45deg, #98E4D6, #87CEEB);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(135, 206, 235, 0.4);
    color: #2E8B57;
  }
`



const IslandsContainer = styled.div`
  display: flex;
  gap: 30px;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 1200px;
  width: 95%;
  margin: 0 auto 30px auto;
`

const IslandCard = styled(motion.div)<{ selected: boolean }>`
  background: rgba(255, 255, 255, ${props => props.selected ? '1' : '0.95'});
  border-radius: 20px;
  padding: 30px 20px;
  text-align: center;
  box-shadow: ${props => props.selected ? '0 10px 30px rgba(255, 165, 0, 0.4)' : '0 8px 25px rgba(0, 0, 0, 0.15)'};
  backdrop-filter: blur(20px);
  width: 250px;
  cursor: pointer;
  border: ${props => props.selected ? '3px solid #FFA500' : 'none'};
`

const IslandIcon = styled.div<{ iconSize?: number }>`
  font-size: ${props => props.iconSize || 60}px;
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  img {
    width: ${props => props.iconSize || 60}px;
    height: ${props => props.iconSize || 60}px;
    object-fit: contain;
  }
`

const IslandName = styled.h3`
  font-size: 24px;
  color: #5d4037;
  margin-bottom: 10px;
  font-weight: 700;
`

const IslandDescription = styled.p`
  font-size: 14px;
  color: #666;
  line-height: 1.4;
  margin-bottom: 15px;
`

const ComingSoonBadge = styled.div`
  background: linear-gradient(45deg, #87ceeb, #add8e6);
  color: white;
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: 600;
  display: inline-block;
`

const MapFrame = styled.div`
  width: 95%;
  max-width: 1200px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 30px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  margin: 30px auto;
  display: flex;
  justify-content: center;
  align-items: center;
`

const MapContainer = styled.div`
  width: 100%;
  height: 900px;
  background: #f0f8ff;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
`

const MapImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
`

const MapOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 20px;
`

const LocationIcon = styled(motion.div)<{ x: number; y: number }>`
  position: absolute;
  font-size: 30px;
  cursor: pointer;
  left: ${props => props.x}%;
  top: ${props => props.y}%;
  transform: translate(-50%, -50%);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 30px;
    height: 30px;
    object-fit: contain;
  }
`

// Tooltip 组件
const MapTooltip = styled.div`
  position: absolute;
  left: 50%;
  top: -10px;
  transform: translate(-50%, -100%);
  background: #fff;
  color: #333;
  border-radius: 14px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.18);
  padding: 12px 16px;
  min-width: 180px;
  max-width: 280px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
  opacity: 0.98;
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -14px;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 14px solid transparent;
    border-right: 14px solid transparent;
    border-top: 14px solid #fff;
  }
`

// 鸟白岛专用的小型Tooltip
const TorishimaTooltip = styled.div`
  position: absolute;
  left: 50%;
  top: -10px;
  transform: translate(-50%, -100%);
  background: #fff;
  color: #333;
  border-radius: 10px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
  padding: 8px 12px;
  min-width: 80px;
  max-width: 120px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
  opacity: 0.98;
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -10px;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid #fff;
  }
`



const TooltipTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #5d4037;
  margin-bottom: 4px;
  text-align: center;
`

const TooltipDesc = styled.div`
  font-size: 14px;
  color: #666;
  text-align: center;
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`

const BackButton = styled(motion.button)`
  background: linear-gradient(45deg, #87CEEB, #98E4D6);
  border: none;
  border-radius: 50px;
  padding: 15px 25px;
  font-size: 18px;
  color: #2E8B57;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(135, 206, 235, 0.4);
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  z-index: 100;
  
  &:hover {
    background: linear-gradient(45deg, #98E4D6, #87CEEB);
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(135, 206, 235, 0.5);
  }
`

const OtherPilgrimageButton = styled(motion.button)`
  background: linear-gradient(45deg, #87CEEB, #98E4D6);
  border: none;
  border-radius: 50px;
  padding: 15px 25px;
  font-size: 18px;
  color: #2E8B57;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(135, 206, 235, 0.4);
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  z-index: 100;
  
  &:hover {
    background: linear-gradient(45deg, #98E4D6, #87CEEB);
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(135, 206, 235, 0.5);
  }
`

// 模态框样式组件
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
`

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 30px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  position: relative;
`

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: #f0f0f0;
    color: #333;
  }
`

const ModalImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 15px;
  margin-bottom: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
`

const ModalText = styled.p`
  font-size: 16px;
  color: #5d4037;
  text-align: center;
  margin: 0;
  font-weight: 500;
  line-height: 1.6;
`

interface Island {
  name: string
  icon: string
  iconType?: 'emoji' | 'image'
  iconSize?: number // 新增图标大小参数
  description: string
  position: { x: number; y: number }
  id: string
}

const islands: Island[] = [
  {
    id: 'megijima',
    name: '女木岛',
    icon: '👹',
    description: '以鬼岛传说而闻名的小岛，欧线的重要巡礼点',
    position: { x: 76, y: 70 }
  },
  {
    id: 'ogijima',
    name: '男木岛',
    icon: OSS_CONFIG.getImageUrl('/webps/男木岛/男木岛-灯塔图标.webp'),
    iconType: 'image',
    iconSize: 80, // 设置灯塔图标大小为80px
    description: '宁静的渔村小岛，与主角团相遇的主要地点。',
    position: { x: 75, y: 45 }
  },
  {
    id: 'naoshima',
    name: '直岛',
    icon: '🎨',
    description: '现代艺术的圣地，汇集了众多知名艺术家的作品和美术馆。',
    position: { x: 12, y: 20 }
  }
]

const CheckinPage: React.FC = () => {
  const navigate = useNavigate()
  const [selectedIsland, setSelectedIsland] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isQRModalOpen, setIsQRModalOpen] = useState(false)
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false)
  // tooltip悬停状态
  const [hoveredIcon, setHoveredIcon] = useState<null | {
    x: number;
    y: number;
    title: string;
    desc: string;
  }>(null)

  // 鸟白岛坐标 (页面中心位置)
  const torishimaPosition = { x: 50, y: 50 }

  const handleIslandClick = (island: Island) => {
    setSelectedIsland(island.id)
    console.log('点击了岛屿:', island.name)
    // 跳转到对应的岛屿页面
    navigate(`/${island.id}`)
  }

  const handleTorishimaClick = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const closeScheduleModal = () => {
    setIsScheduleModalOpen(false)
  }

  const handleBack = () => {
    navigate('/contents')
  }

  const handleOtherPilgrimage = () => {
    navigate('/other-pilgrimage')
  }

  const handleQRCodeClick = () => {
    setIsQRModalOpen(true)
  }

  const closeQRModal = () => {
    setIsQRModalOpen(false)
  }

  return (
    <Container>
      <HeaderSection>
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Title>打卡篇</Title>
          <Subtitle>唯有那片炫目，始终无法忘却</Subtitle>
        </motion.div>
      </HeaderSection>

      <NoticeBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <NoticeText>
          <strong style={{ fontSize: '18px', color: '#ff6b35', display: 'block', marginBottom: '8px' }}>
            小建议
          </strong>
          正式打卡前，建议先把打卡点的游戏CG照片洗出来，到地点后一一比对拍照即可。
          <span style={{ display: 'block', marginTop: '8px' }}>
            避免手机频繁切换页面影响体验，让手机专注于拍照。
          </span>
          <span style={{ display: 'block', marginTop: '8px' }}>
            各岛屿页面可右键下载需要的游戏CG。
          </span>
        </NoticeText>
      </NoticeBox>

      <IslandsContainer>
        {islands.map((island, index) => (
          <IslandCard
            key={island.name}
            selected={selectedIsland === island.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleIslandClick(island)}
          >
            <IslandIcon iconSize={island.iconSize}>
              {island.iconType === 'image' ? (
                <img src={island.icon} alt={island.name} />
              ) : (
                island.icon
              )}
            </IslandIcon>
            <IslandName>{island.name}</IslandName>
            <IslandDescription>{island.description}</IslandDescription>
            <ComingSoonBadge>点击前往</ComingSoonBadge>
          </IslandCard>
        ))}
      </IslandsContainer>

      <QRCodeSection
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <QRCodeButton
          onClick={handleQRCodeClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          📱 打卡地点合集
        </QRCodeButton>
      </QRCodeSection>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <MapFrame>
          <MapContainer>
            <MapImage src={OSS_CONFIG.getImageUrl('/webps/打卡篇地图-航线版.webp')} alt="瀬戸内海地图" />
            <MapOverlay>
              {/* 高松港起点 */}
              <LocationIcon
                x={76}
                y={90}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                whileHover={{ scale: 1.2 }}
                onClick={() => setIsScheduleModalOpen(true)}
                onMouseEnter={() => {
                  setHoveredIcon({
                    x: 76,
                    y: 90,
                    title: '高松港',
                    desc: '前往各岛屿的起点港口，点击查看时刻表',
                  });
                }}
                onMouseLeave={() => setHoveredIcon(null)}
              >
                🚢
                                  {/* Tooltip渲染 */}
                  {hoveredIcon && hoveredIcon.title === '高松港' && (
                    <MapTooltip>
                      <TooltipTitle>{hoveredIcon.title}</TooltipTitle>
                      <TooltipDesc>{hoveredIcon.desc}</TooltipDesc>
                    </MapTooltip>
                  )}
              </LocationIcon>

              {/* 鸟白岛图标 */}
              <LocationIcon
                x={91}
                y={60}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                whileHover={{ scale: 1.2 }}
                onClick={handleTorishimaClick}
                title="鸟白岛"
                onMouseEnter={() => {
                  setHoveredIcon({
                    x: 91,
                    y: 60,
                    title: '鸟白岛',
                    desc: '只能在航行过程中拍摄的神秘岛屿',
                  });
                }}
                onMouseLeave={() => setHoveredIcon(null)}
              >
                ❗❗❗
                                  {/* Tooltip渲染 */}
                  {hoveredIcon && hoveredIcon.title === '鸟白岛' && (
                    <TorishimaTooltip>
                      <TooltipTitle>{hoveredIcon.title}</TooltipTitle>
                    </TorishimaTooltip>
                  )}
              </LocationIcon>

              {/* 岛屿位置 */}
              {islands.map((island, index) => (
                <LocationIcon
                  key={island.id}
                  x={island.position.x}
                  y={island.position.y}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.2 + index * 0.2, duration: 0.5 }}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => handleIslandClick(island)}
                  onMouseEnter={() => {
                    setHoveredIcon({
                      x: island.position.x,
                      y: island.position.y,
                      title: island.name,
                      desc: island.description,
                    });
                  }}
                  onMouseLeave={() => setHoveredIcon(null)}
                >
                  {island.iconType === 'image' ? (
                    <img src={island.icon} alt={island.name} />
                  ) : (
                    island.icon
                  )}
                  {/* Tooltip渲染 */}
                  {hoveredIcon && hoveredIcon.title === island.name && (
                    <MapTooltip>
                      <TooltipTitle>{hoveredIcon.title}</TooltipTitle>
                      <TooltipDesc>{hoveredIcon.desc}</TooltipDesc>
                    </MapTooltip>
                  )}
                </LocationIcon>
              ))}
            </MapOverlay>
          </MapContainer>
        </MapFrame>
      </motion.div>

      <ButtonContainer>
        <BackButton
          onClick={handleBack}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
        >
          返回目录
        </BackButton>
        
        <OtherPilgrimageButton
          onClick={handleOtherPilgrimage}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2 }}
        >
          其他巡礼
        </OtherPilgrimageButton>
      </ButtonContainer>

      {/* 鸟白岛模态框 */}
      <AnimatePresence>
        {isModalOpen && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <ModalContent
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ModalImage 
                src={OSS_CONFIG.getImageUrl('/webps/鸟白岛总览.webp')} 
                alt="鸟白岛总览"
                onError={(e) => {
                  console.error('图片加载失败:', e)
                }}
              />
              <ModalText>只能在航行过程中拍摄</ModalText>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>

      {/* 二维码模态框 */}
      <AnimatePresence>
        {isQRModalOpen && (
          <QRCodeModal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeQRModal}
          >
            <QRCodeContent
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <QRCodeImage 
                src={OSS_CONFIG.getImageUrl('/webps/打卡地点合集.webp')} 
                alt="打卡地点合集二维码"
                onError={(e) => {
                  console.error('二维码图片加载失败:', e)
                }}
              />
              <QRCodeTitle>打卡地点合集</QRCodeTitle>
              <QRCodeDescription>
                扫描二维码获取完整的打卡地点图片合集
              </QRCodeDescription>
              <QRCodeLink 
                href="https://pan.baidu.com/s/1BdmKigMJMb4y1q6RNLO2oA?pwd=sprb" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                📥 直接下载打卡地点合集
              </QRCodeLink>
            </QRCodeContent>
          </QRCodeModal>
        )}
      </AnimatePresence>

      {/* 时刻表模态框 */}
      <AnimatePresence>
        {isScheduleModalOpen && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeScheduleModal}
          >
            <ModalContent
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton onClick={closeScheduleModal}>×</CloseButton>
              <ModalImage 
                src={OSS_CONFIG.getImageUrl('/webps/高松发船时刻表.webp')} 
                alt="高松发船时刻表"
                onError={(e) => {
                  console.error('时刻表图片加载失败:', e)
                }}
              />
              <ModalText>高松港发船时刻表</ModalText>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </Container>
  )
}

export default CheckinPage 