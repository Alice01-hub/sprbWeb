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
  position: relative;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Header = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
`

const BackButton = styled(motion.button)`
  position: absolute;
  top: 10px;
  left: 20px;
  background: linear-gradient(45deg, #87CEEB, #98E4D6);
  border: none;
  border-radius: 30px;
  padding: 12px 20px;
  font-size: 16px;
  color: #2E8B57;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(135, 206, 235, 0.4);
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  z-index: 1000;
  
  &:hover {
    background: linear-gradient(45deg, #98E4D6, #87CEEB);
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(135, 206, 235, 0.5);
  }
`

const Title = styled.h1`
  text-align: center;
  font-size: 36px;
  color: #FF6B35;
  margin: 20px 0;
  font-family: '华文行楷', 'STXingkai', 'KaiTi', 'SimKai', cursive;
  text-shadow: 2px 2px 4px rgba(255, 107, 53, 0.3);
  
  &::before {
    content: '🚌 ';
  }
  
  &::after {
    content: ' ✈️';
  }
`

const DevelopmentContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 30px;
  padding: 60px 40px;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 2px solid #e0e0e0;
  max-width: 600px;
  margin: 40px 20px;
`

const DevelopmentIcon = styled.div`
  font-size: 80px;
  margin-bottom: 30px;
  animation: float 3s ease-in-out infinite;
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
`

const DevelopmentTitle = styled.h2`
  font-size: 32px;
  color: #333;
  margin-bottom: 20px;
  font-weight: 700;
`

const DevelopmentText = styled.p`
  font-size: 18px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 30px;
`

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  margin: 20px 0;
`

const ProgressFill = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, #FF6B35, #FFB347);
  border-radius: 4px;
`

const ProgressText = styled.div`
  font-size: 14px;
  color: #888;
  margin-top: 10px;
`

const FeaturesList = styled.div`
  text-align: left;
  margin: 30px 0;
  padding: 20px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 15px;
`

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  margin: 15px 0;
  font-size: 16px;
  color: #555;
  
  &::before {
    content: '🔧';
    margin-right: 10px;
    font-size: 18px;
  }
`

const TrafficPage: React.FC = () => {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate('/contents')
  }

  return (
    <Container>
      <Header>
        <BackButton
          onClick={handleBack}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ← 返回目录
        </BackButton>
        <Title>交通篇</Title>
      </Header>

      <DevelopmentContainer
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <DevelopmentIcon>🚧</DevelopmentIcon>
        <DevelopmentTitle>正在开发中</DevelopmentTitle>
        <DevelopmentText>
          交通篇正在重新设计和开发中，我们将为您提供更完善、更实用的交通攻略指南！
        </DevelopmentText>
        
        <ProgressBar>
          <ProgressFill
            initial={{ width: 0 }}
            animate={{ width: "35%" }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
        </ProgressBar>
        <ProgressText>开发进度：35%</ProgressText>
        
        <FeaturesList>
          <FeatureItem>重新设计交通路线规划</FeatureItem>
          <FeatureItem>优化渡轮时刻表显示</FeatureItem>
          <FeatureItem>增加实时交通信息</FeatureItem>
          <FeatureItem>完善地图导航功能</FeatureItem>
          <FeatureItem>添加交通费用计算器</FeatureItem>
        </FeaturesList>
        
        <DevelopmentText>
          敬请期待！新的交通篇将为您带来更好的使用体验。
        </DevelopmentText>
      </DevelopmentContainer>
    </Container>
  )
}

export default TrafficPage 