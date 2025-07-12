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
    content: '🦋 ';
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

const ComingSoonTitle = styled.h2`
  font-size: 36px;
  color: #FF6B35;
  margin-bottom: 20px;
  font-weight: 700;
`

const ComingSoonText = styled.p`
  font-size: 20px;
  color: #666;
  line-height: 1.8;
  margin-bottom: 30px;
`

const FeatureList = styled.div`
  background: rgba(255, 179, 71, 0.1);
  border-radius: 15px;
  padding: 30px;
  margin-top: 30px;
  text-align: left;
`

const FeatureListTitle = styled.h3`
  font-size: 24px;
  color: #FF6B35;
  margin-bottom: 20px;
  text-align: center;
`

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
  font-size: 18px;
  color: #555;
`

const FeatureIcon = styled.div`
  font-size: 24px;
  width: 40px;
  height: 40px;
  background: linear-gradient(45deg, #FF6B35, #FFB347);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
`

const FloatingElement = styled(motion.div)`
  position: absolute;
  font-size: 60px;
  opacity: 0.1;
  pointer-events: none;
`

const DivineRealmPage: React.FC = () => {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate('/contents')
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
        🏮
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
        ⛩️
      </FloatingElement>
      
      <FloatingElement
        style={{ bottom: '15%', left: '20%' }}
        animate={{ 
          y: [0, -20, 0], 
          rotate: [0, 8, -8, 0]
        }}
        transition={{ duration: 7, repeat: Infinity }}
      >
        🎋
      </FloatingElement>

      <BackButton
        onClick={handleBack}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        🏠 返回目录
      </BackButton>

      <Header>
        <Title>神域</Title>
      </Header>

      <ContentCard
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <ComingSoonIcon>🚧</ComingSoonIcon>
        <ComingSoonTitle>神域正在建设中...</ComingSoonTitle>
        <ComingSoonText>
          神域是一个神秘而特殊的地方，我们正在精心设计这个充满魔法的空间。
          <br />
          在这里，你将能够体验到前所未有的互动功能和独特的内容。
        </ComingSoonText>
        
        <FeatureList>
          <FeatureListTitle>🌟 即将推出的功能</FeatureListTitle>
          
          <FeatureItem>
            <FeatureIcon>💾</FeatureIcon>
            <span>七影碟寄存系统 - 安全保管你的珍贵回忆</span>
          </FeatureItem>
          
          <FeatureItem>
            <FeatureIcon>🎁</FeatureIcon>
            <span>专属礼品领取 - 为巡礼者准备的特殊奖励</span>
          </FeatureItem>
          
          <FeatureItem>
            <FeatureIcon>🌸</FeatureIcon>
            <span>互动留言板 - 与其他巡礼者分享心得</span>
          </FeatureItem>
          
          <FeatureItem>
            <FeatureIcon>📚</FeatureIcon>
            <span>特殊收藏馆 - 珍贵的游戏资料和设定</span>
          </FeatureItem>
          
          <FeatureItem>
            <FeatureIcon>🎵</FeatureIcon>
            <span>音乐盒功能 - 收藏和播放经典BGM</span>
          </FeatureItem>
          
          <FeatureItem>
            <FeatureIcon>🌟</FeatureIcon>
            <span>成就系统 - 记录你的巡礼足迹</span>
          </FeatureItem>
        </FeatureList>
        
        <ComingSoonText style={{ marginTop: '30px', fontSize: '16px', color: '#888' }}>
          敬请期待这个充满惊喜的神域开放！
        </ComingSoonText>
      </ContentCard>
    </Container>
  )
}

export default DivineRealmPage 