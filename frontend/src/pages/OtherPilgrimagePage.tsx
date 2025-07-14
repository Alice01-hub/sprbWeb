import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    135deg, 
    #87CEEB 0%,    /* 天蓝色 */
    #98E4D6 20%,   /* 薄荷绿 */
    #F4E285 40%,   /* 浅黄色 */
    #FFB347 60%,   /* 金橙色 */
    #FF8C69 80%,   /* 珊瑚色 */
    #FFA07A 100%   /* 浅橙色 */
  );
  padding: 20px;
  position: relative;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
  position: relative;
  z-index: 10;
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
  color: #FF6B35;
  margin-bottom: 20px;
  font-weight: 700;
  font-family: '华文行楷', 'STXingkai', 'KaiTi', 'SimKai', cursive;
  text-shadow: 3px 3px 6px rgba(255, 107, 53, 0.3);
  
  &::before {
    content: '🌸 ';
  }
  
  &::after {
    content: ' 🌸';
  }
`

const ContentCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 60px 40px;
  box-shadow: 0 15px 40px rgba(255, 165, 0, 0.3);
  backdrop-filter: blur(10px);
  border: 3px solid rgba(255, 165, 0, 0.2);
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
`

const ComingSoonIcon = styled.div`
  font-size: 120px;
  margin-bottom: 30px;
  opacity: 0.8;
`

const ComingSoonText = styled.h2`
  font-size: 32px;
  color: #FF6B35;
  margin-bottom: 20px;
  font-weight: 600;
  font-family: 'KaiTi', 'SimKai', serif;
`

const Description = styled.p`
  font-size: 20px;
  color: #666;
  line-height: 1.8;
  font-family: 'KaiTi', 'SimKai', serif;
  margin-bottom: 30px;
`

const FeatureList = styled.div`
  text-align: left;
  max-width: 500px;
  margin: 0 auto;
`

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px 0;
  font-size: 18px;
  color: #555;
  border-bottom: 1px solid rgba(255, 165, 0, 0.2);
`

const FeatureIcon = styled.span`
  font-size: 24px;
  width: 30px;
  text-align: center;
`

const FloatingElement = styled(motion.div)`
  position: absolute;
  font-size: 60px;
  opacity: 0.6;
  z-index: 5;
`

const OtherPilgrimagePage: React.FC = () => {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate('/checkin')
  }

  return (
    <Container>
      <FloatingElement
        style={{ top: '10%', left: '10%' }}
        animate={{ 
          y: [0, -30, 0], 
          rotate: [0, 10, -10, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      >
        🌸
      </FloatingElement>
      
      <FloatingElement
        style={{ top: '20%', right: '15%' }}
        animate={{ 
          y: [0, 25, 0], 
          rotate: [0, -15, 15, 0],
          scale: [1, 0.9, 1]
        }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        🎪
      </FloatingElement>
      
      <FloatingElement
        style={{ bottom: '15%', left: '20%' }}
        animate={{ 
          y: [0, -20, 0], 
          rotate: [0, 8, -8, 0]
        }}
        transition={{ duration: 7, repeat: Infinity }}
      >
        🎭
      </FloatingElement>

      <BackButton
        onClick={handleBack}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        🏠 返回打卡篇
      </BackButton>

      <Header>
        <Title>其他巡礼</Title>
      </Header>

      <ContentCard
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <ComingSoonIcon>🚧</ComingSoonIcon>
        
        <ComingSoonText>页面开发中...</ComingSoonText>
        
        <Description>
          正在为您精心准备更多精彩的圣地巡礼内容！
          <br />
          敬请期待即将到来的全新体验。
        </Description>

        <FeatureList>
          <FeatureItem>
            <FeatureIcon>🏛️</FeatureIcon>
            <span>特色建筑巡礼</span>
          </FeatureItem>
          <FeatureItem>
            <FeatureIcon>🍜</FeatureIcon>
            <span>美食探索地图</span>
          </FeatureItem>
          <FeatureItem>
            <FeatureIcon>🎨</FeatureIcon>
            <span>文化体验活动</span>
          </FeatureItem>
          <FeatureItem>
            <FeatureIcon>📸</FeatureIcon>
            <span>摄影打卡指南</span>
          </FeatureItem>
          <FeatureItem>
            <FeatureIcon>🛍️</FeatureIcon>
            <span>购物推荐清单</span>
          </FeatureItem>
        </FeatureList>
      </ContentCard>
    </Container>
  )
}

export default OtherPilgrimagePage