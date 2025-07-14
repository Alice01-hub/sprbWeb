import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'

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

const IslandIcon = styled.div`
  font-size: 60px;
  margin-bottom: 15px;
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
`

const Ship = styled(motion.div)<{ x: number; y: number; rotation: number }>`
  position: absolute;
  font-size: 25px;
  left: ${props => props.x}%;
  top: ${props => props.y}%;
  transform: translate(-50%, -50%) rotate(${props => props.rotation}deg);
  z-index: 20;
`

const DialogBox = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  text-align: center;
  z-index: 1000;
  min-width: 300px;
`

const DialogOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`

const DialogTitle = styled.h3`
  font-size: 24px;
  color: #5d4037;
  margin-bottom: 15px;
`

const DialogText = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
`

const DialogButton = styled.button`
  background: linear-gradient(45deg, #87CEEB, #98E4D6);
  border: none;
  border-radius: 25px;
  padding: 12px 24px;
  font-size: 16px;
  color: #2E8B57;
  cursor: pointer;
  font-weight: 600;
  
  &:hover {
    background: linear-gradient(45deg, #98E4D6, #87CEEB);
  }
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

interface Island {
  name: string
  icon: string
  description: string
  position: { x: number; y: number }
  id: string
}

interface Position {
  x: number
  y: number
}

const islands: Island[] = [
  {
    id: 'megijima',
    name: '女木岛',
    icon: '🏝️',
    description: '以鬼岛传说而闻名的小岛，拥有美丽的海滩和独特的艺术装置。',
    position: { x: 75, y: 45 } // 高松港上方一点
  },
  {
    id: 'ogijima',
    name: '男木岛',
    icon: '🌊',
    description: '宁静的渔村小岛，保持着传统的日本乡村风貌和温馨的人情味。',
    position: { x: 70, y: 30 } // 女木岛再上方一点
  },
  {
    id: 'naoshima',
    name: '直岛',
    icon: '🎨',
    description: '现代艺术的圣地，汇集了众多知名艺术家的作品和美术馆。',
    position: { x: 25, y: 20 } // 左上角
  }
]

const takamatsuPort: Position = { x: 85, y: 70 } // 右下角

const CheckinPage: React.FC = () => {
  const navigate = useNavigate()
  const [selectedIsland, setSelectedIsland] = useState<string | null>(null)
  const [shipPosition, setShipPosition] = useState<Position>(takamatsuPort)
  const [shipRotation, setShipRotation] = useState<number>(0)
  const [isNavigating, setIsNavigating] = useState<boolean>(false)
  const [showDialog, setShowDialog] = useState<boolean>(false)
  const [arrivedIsland, setArrivedIsland] = useState<string>('')

  const calculateRotation = (from: Position, to: Position): number => {
    const dx = to.x - from.x
    const dy = to.y - from.y
    return Math.atan2(dy, dx) * (180 / Math.PI)
  }

  const animateShip = async (targetIsland: Island) => {
    setIsNavigating(true)
    setSelectedIsland(targetIsland.id)

    const route: Position[] = []
    
    // 如果目标是男木岛，需要先经停女木岛
    if (targetIsland.id === 'ogijima') {
      const megijima = islands.find(island => island.id === 'megijima')!
      route.push(megijima.position)
    }
    
    route.push(targetIsland.position)

    for (let i = 0; i < route.length; i++) {
      const destination = route[i]
      const currentPos = i === 0 ? takamatsuPort : route[i - 1]
      
      // 计算旋转角度
      const rotation = calculateRotation(currentPos, destination)
      setShipRotation(rotation)

      // 航行动画
      await new Promise<void>((resolve) => {
        setShipPosition(destination)
        // 使用setTimeout模拟动画完成
        setTimeout(() => {
          if (i === 0 && targetIsland.id === 'ogijima') {
            // 在女木岛停靠
            setTimeout(resolve, 1000) // 停靠1秒
          } else {
            resolve()
          }
        }, 2000) // 航行2秒
      })
    }

    // 到达目的地
    setIsNavigating(false)
    setArrivedIsland(targetIsland.name)
    setShowDialog(true)
  }

  const handleIslandClick = (island: Island) => {
    if (!isNavigating) {
      animateShip(island)
    }
  }

  const handleDialogClose = () => {
    setShowDialog(false)
    // 这里可以跳转到对应的岛屿页面
    // navigate(`/island/${arrivedIsland}`)
    
    // 重置船只位置
    setTimeout(() => {
      setShipPosition(takamatsuPort)
      setSelectedIsland(null)
      setArrivedIsland('')
    }, 500)
  }

  const handleBack = () => {
    navigate('/contents')
  }

  const handleOtherPilgrimage = () => {
    navigate('/other-pilgrimage')
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
          <Subtitle>探索三岛的夏日时光</Subtitle>
        </motion.div>
      </HeaderSection>

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
            <IslandIcon>{island.icon}</IslandIcon>
            <IslandName>{island.name}</IslandName>
            <IslandDescription>{island.description}</IslandDescription>
            <ComingSoonBadge>点击前往</ComingSoonBadge>
          </IslandCard>
        ))}
      </IslandsContainer>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <MapFrame>
          <MapContainer>
            <MapImage src="/images/打卡篇地图.png" alt="瀬戸内海地图" />
            <MapOverlay>
              {/* 高松港起点 */}
              <LocationIcon
                x={takamatsuPort.x}
                y={takamatsuPort.y}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                🚀
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
                >
                  {island.icon}
                </LocationIcon>
              ))}

              {/* 小船 */}
              <Ship
                x={shipPosition.x}
                y={shipPosition.y}
                rotation={shipRotation}
                initial={{ scale: 0 }}
                animate={{ 
                  scale: 1,
                  x: shipPosition.x,
                  y: shipPosition.y,
                  rotate: shipRotation
                }}
                transition={{ 
                  scale: { delay: 1.5, duration: 0.5 },
                  x: { duration: 2, ease: "easeInOut" },
                  y: { duration: 2, ease: "easeInOut" },
                  rotate: { duration: 0.5 }
                }}
              >
                🚢
              </Ship>
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

      {/* 到达对话框 */}
      <AnimatePresence>
        {showDialog && (
          <>
            <DialogOverlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleDialogClose}
            />
            <DialogBox
              initial={{ opacity: 0, scale: 0.8, y: -50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <DialogTitle>🎉 航行完成！</DialogTitle>
              <DialogText>{arrivedIsland}到了，请下船</DialogText>
              <DialogButton onClick={handleDialogClose}>
                确认下船
              </DialogButton>
            </DialogBox>
          </>
        )}
      </AnimatePresence>
    </Container>
  )
}

export default CheckinPage 