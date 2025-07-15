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

const NaoshimaPage: React.FC = () => {
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
            <Icon>🎨</Icon>
            直岛
            <Icon>🎨</Icon>
          </Title>
          <Subtitle>现代艺术的圣地</Subtitle>
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
            直岛是瀬戸内海中最著名的艺术岛屿，被誉为"现代艺术的圣地"。这里汇集了众多世界知名艺术家的作品，包括安藤忠雄、草间弥生、詹姆斯·特瑞尔等大师的杰作。
          </Description>
          <Description>
            岛上的地中美术馆、李禹焕美术馆、黄南瓜等著名艺术装置已成为朝圣之地。艺术与自然的完美融合，让直岛成为了一座独特的"艺术岛"，吸引着来自世界各地的艺术爱好者。
          </Description>
        </InfoCard>

        <InfoCard
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <SectionTitle>艺术景点</SectionTitle>
          <ImageGallery>
            <ImageCard
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <ImagePlaceholder>
                地中美术馆
              </ImagePlaceholder>
              <ImageCaption>安藤忠雄设计的地下美术馆</ImageCaption>
            </ImageCard>
            <ImageCard
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <ImagePlaceholder>
                黄南瓜
              </ImagePlaceholder>
              <ImageCaption>草间弥生的经典作品</ImageCaption>
            </ImageCard>
            <ImageCard
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <ImagePlaceholder>
                李禹焕美术馆
              </ImagePlaceholder>
              <ImageCaption>极简主义艺术的代表</ImageCaption>
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

export default NaoshimaPage 