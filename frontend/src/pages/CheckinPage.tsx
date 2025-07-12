import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #87ceeb, #b0e0e6, #add8e6);
  position: relative;
  overflow: hidden;
  padding: 40px;
`

const Title = styled.h1`
  font-size: 48px;
  color: #5d4037;
  margin-bottom: 20px;
  font-weight: 700;
  font-family: 'KaiTi', 'SimKai', serif;
  text-align: center;
`

const Subtitle = styled.h2`
  font-size: 24px;
  color: #ff6b35;
  margin-bottom: 60px;
  font-weight: 600;
  text-align: center;
`

const IslandsContainer = styled.div`
  display: flex;
  gap: 40px;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 1200px;
  margin-bottom: 50px;
`

const IslandCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 25px;
  padding: 40px 30px;
  text-align: center;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(20px);
  width: 300px;
  cursor: pointer;
`

const IslandIcon = styled.div`
  font-size: 80px;
  margin-bottom: 20px;
`

const IslandName = styled.h3`
  font-size: 28px;
  color: #5d4037;
  margin-bottom: 15px;
  font-weight: 700;
`

const IslandDescription = styled.p`
  font-size: 16px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
`

const ComingSoonBadge = styled.div`
  background: linear-gradient(45deg, #87ceeb, #add8e6);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  display: inline-block;
`

const BackButton = styled(motion.button)`
  background: linear-gradient(45deg, #87ceeb, #add8e6);
  border: none;
  border-radius: 50px;
  padding: 15px 30px;
  font-size: 18px;
  color: white;
  cursor: pointer;
  font-weight: 600;
  box-shadow: 0 8px 25px rgba(135, 206, 235, 0.4);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 35px rgba(135, 206, 235, 0.5);
  }
`

const islands = [
  {
    name: '女木岛',
    icon: '🏝️',
    description: '以鬼岛传说而闻名的小岛，拥有美丽的海滩和独特的艺术装置。'
  },
  {
    name: '男木岛',
    icon: '🌊',
    description: '宁静的渔村小岛，保持着传统的日本乡村风貌和温馨的人情味。'
  },
  {
    name: '直岛',
    icon: '🎨',
    description: '现代艺术的圣地，汇集了众多知名艺术家的作品和美术馆。'
  }
]

const CheckinPage: React.FC = () => {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate('/contents')
  }

  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Title>打卡篇</Title>
        <Subtitle>探索三岛的夏日时光</Subtitle>
      </motion.div>

      <IslandsContainer>
        {islands.map((island, index) => (
          <IslandCard
            key={island.name}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            whileHover={{ scale: 1.05, y: -10 }}
            whileTap={{ scale: 0.95 }}
          >
            <IslandIcon>{island.icon}</IslandIcon>
            <IslandName>{island.name}</IslandName>
            <IslandDescription>{island.description}</IslandDescription>
            <ComingSoonBadge>即将开放</ComingSoonBadge>
          </IslandCard>
        ))}
      </IslandsContainer>

      <BackButton
        onClick={handleBack}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        返回目录
      </BackButton>
    </Container>
  )
}

export default CheckinPage 