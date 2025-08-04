import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    160deg,
    #223a5c 0%,         /* 深蓝 */
    #0a192f 40%,        /* 黑蓝 */
    #0c1446 70%,        /* 藏青 */
    #050a1f 100%        /* 纯黑蓝 */
  );
  padding: 20px;
  position: relative;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const BackButton = styled(motion.button)`
  position: fixed;
  top: 30px;
  left: 30px;
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

const Title = styled.h1`
  font-size: 48px;
  color: #fff;
  margin-bottom: 40px;
  font-weight: 700;
  font-family: '华文行楷', 'STXingkai', 'KaiTi', 'SimKai', cursive;
  text-shadow: 3px 3px 12px rgba(0,0,0,0.45);
  text-align: center;
`

const PlaceholderContent = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border: 2px dashed rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  padding: 60px 40px;
  text-align: center;
  max-width: 600px;
  backdrop-filter: blur(10px);
`

const PlaceholderText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 18px;
  line-height: 1.6;
  margin: 0 0 20px 0;
`

const ComingSoonBadge = styled.div`
  background: linear-gradient(45deg, #533483, #7209b7);
  color: #fff;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  display: inline-block;
  box-shadow: 0 4px 16px rgba(123, 9, 183, 0.3);
  margin-top: 20px;
`

const DivineRealmPage: React.FC = () => {
  const navigate = useNavigate()

  // 返回按钮处理
  const handleBack = () => {
    navigate('/contents')
  }

  return (
    <Container>
      <Title>神域</Title>

      <PlaceholderContent>
        <PlaceholderText>
          🌙 神域功能正在开发中...
        </PlaceholderText>
        <PlaceholderText>
          这里将是一个神秘的夜晚世界，充满了七影蝶的魔法与奇迹。
        </PlaceholderText>
        <PlaceholderText>
          敬请期待即将到来的神域体验！
        </PlaceholderText>
        <ComingSoonBadge>
          ✨ Coming Soon ✨
        </ComingSoonBadge>
      </PlaceholderContent>

      <BackButton
        onClick={handleBack}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        🏠 返回目录
      </BackButton>
    </Container>
  )
}

export default DivineRealmPage 