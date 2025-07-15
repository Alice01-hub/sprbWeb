import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
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
  margin-bottom: 40px;
`

const Title = styled.h1`
  font-size: 48px;
  color: #5d4037;
  margin-bottom: 10px;
  font-weight: 700;
  font-family: 'KaiTi', 'SimKai', serif;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`

const Icon = styled.span`
  font-size: 60px;
`

const Subtitle = styled.h2`
  font-size: 24px;
  color: #ff6b35;
  margin-bottom: 20px;
  font-weight: 600;
  text-align: center;
`

const ContentContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
`

const InfoCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(20px);
  border: 3px solid rgba(255, 255, 255, 0.3);
`

const SectionTitle = styled.h3`
  font-size: 28px;
  color: #5d4037;
  margin-bottom: 20px;
  font-weight: 700;
  font-family: 'KaiTi', 'SimKai', serif;
  text-align: center;
`

const Description = styled.p`
  font-size: 18px;
  color: #444;
  line-height: 1.8;
  margin-bottom: 20px;
  text-align: left;
  text-indent: 2em;
`

const ImageGallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
`

const ImageCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  }
`

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 200px;
  background: linear-gradient(45deg, #f0f0f0, #e0e0e0);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #666;
  border-bottom: 2px solid rgba(93, 64, 55, 0.1);
`

const ImageCaption = styled.p`
  padding: 15px;
  font-size: 14px;
  color: #666;
  text-align: center;
  margin: 0;
`

const DevelopmentStatus = styled.div`
  background: linear-gradient(45deg, #87ceeb, #add8e6);
  color: white;
  padding: 20px;
  border-radius: 15px;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  margin: 20px 0;
  box-shadow: 0 8px 20px rgba(135, 206, 235, 0.3);
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
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

const OgijimaPage: React.FC = () => {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate('/checkin')
  }

  return (
    <Container>
      <HeaderSection>
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Title>
            <Icon>🌊</Icon>
            男木岛
            <Icon>🌊</Icon>
          </Title>
          <Subtitle>宁静的渔村小岛</Subtitle>
        </motion.div>
      </HeaderSection>

      <ContentContainer>
        <InfoCard
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <SectionTitle>岛屿介绍</SectionTitle>
          <Description>
            男木岛是瀬戸内海中的一个宁静小岛，以其传统的渔村风貌而闻名。这里保持着浓厚的日本乡村气息，居民们世代以渔业为生，岛上的生活节奏缓慢而悠然。
          </Description>
          <Description>
            男木岛的街道狭窄而蜿蜒，传统的木造房屋错落有致地分布在山坡上。岛上的猫咪特别多，被称为"猫岛"，这些可爱的猫咪已经成为了岛上的特色之一。
          </Description>
        </InfoCard>

        <InfoCard
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <SectionTitle>特色景点</SectionTitle>
          <ImageGallery>
            <ImageCard
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <ImagePlaceholder>
                传统渔村
              </ImagePlaceholder>
              <ImageCaption>保持原始风貌的渔村街道</ImageCaption>
            </ImageCard>
            <ImageCard
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <ImagePlaceholder>
                猫咪天堂
              </ImagePlaceholder>
              <ImageCaption>岛上随处可见的可爱猫咪</ImageCaption>
            </ImageCard>
            <ImageCard
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <ImagePlaceholder>
                海港风光
              </ImagePlaceholder>
              <ImageCaption>宁静的小港口和渔船</ImageCaption>
            </ImageCard>
          </ImageGallery>
        </InfoCard>

        <InfoCard
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <SectionTitle>开发状态</SectionTitle>
          <DevelopmentStatus>
            🚧 页面正在开发中 🚧
            <br />
            <br />
            更多精彩内容即将上线，敬请期待！
          </DevelopmentStatus>
        </InfoCard>
      </ContentContainer>

      <ButtonContainer>
        <BackButton
          onClick={handleBack}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          返回打卡篇
        </BackButton>
      </ButtonContainer>
    </Container>
  )
}

export default OgijimaPage 