import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import AudioPlayer from '../components/AudioPlayer'

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
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
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

const ComingSoonCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 30px;
  padding: 80px 60px;
  text-align: center;
  box-shadow: 0 20px 40px rgba(255, 165, 0, 0.3);
  backdrop-filter: blur(20px);
  max-width: 700px;
  width: 90%;
  border: 3px solid rgba(255, 165, 0, 0.2);
`

const Icon = styled.div`
  font-size: 80px;
  margin-bottom: 30px;
  opacity: 0.8;
`

const Title = styled.h1`
  font-size: 48px;
  color: #FF6B35;
  margin-bottom: 30px;
  font-weight: 700;
  font-family: '华文行楷', 'STXingkai', 'KaiTi', 'SimKai', cursive;
  text-shadow: 3px 3px 6px rgba(255, 107, 53, 0.3);
  
  &::before {
    content: '🌟 ';
  }
  
  &::after {
    content: ' 🌟';
  }
`

const Subtitle = styled.h2`
  font-size: 32px;
  color: #FFB347;
  margin-bottom: 40px;
  font-weight: 600;
`

const Description = styled.div`
  font-size: 20px;
  color: #666;
  line-height: 1.8;
  margin-bottom: 50px;
  
  p {
    margin-bottom: 20px;
  }
  
  .highlight {
    color: #FF6B35;
    font-weight: 600;
    font-size: 22px;
  }
`

const FeatureList = styled.ul`
  text-align: left;
  display: inline-block;
  margin: 30px 0;
  
  li {
    margin-bottom: 15px;
    font-size: 18px;
    color: #555;
    
    &::before {
      content: '✨ ';
      color: #FFB347;
      margin-right: 8px;
    }
  }
`

const FloatingElement = styled(motion.div)`
  position: absolute;
  font-size: 60px;
  opacity: 0.1;
  pointer-events: none;
`

const OtherPilgrimagePage: React.FC = () => {
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
      
      <FloatingElement
        style={{ bottom: '25%', right: '10%' }}
        animate={{ 
          y: [0, 18, 0], 
          rotate: [0, -12, 12, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        🌸
      </FloatingElement>

      <ComingSoonCard
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Icon>🌳</Icon>
        <Title>其他巡礼</Title>
        <Subtitle>神域回忆正在筹备中</Subtitle>
        <Description>
          <p className="highlight">
            在这里，你将能够寄存和领取属于自己的七影碟
          </p>
          <p>
            我们正在精心打造一个特殊的空间，让每一位巡礼者都能留下独属于那个夏天的美好时光。
          </p>
          
          <FeatureList>
            <li>回忆寄存系统 - 保存你的巡礼感悟</li>
            <li>照片分享功能 - 展示圣地巡礼照片</li>
            <li>互动留言板 - 与其他巡礼者交流</li>
            <li>成就徽章系统 - 记录巡礼里程碑</li>
            <li>个人巡礼档案 - 专属的数字纪念册</li>
            <li>季节限定活动 - 夏日特别企划</li>
          </FeatureList>
          
          <p>
            <span style={{ color: '#FFB347', fontWeight: '600' }}>
              敬请期待这个充满温暖回忆的神域空间！
            </span>
          </p>
        </Description>
        
        <BackButton
          onClick={handleBack}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🏠 返回目录
        </BackButton>
      </ComingSoonCard>

      <AudioPlayer />
    </Container>
  )
}

export default OtherPilgrimagePage 