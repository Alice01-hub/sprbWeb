import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import ImageSlider from '../components/ImageSlider'

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

const MapFrame = styled.div`
  width: fit-content;
  max-width: 95%;
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
  width: fit-content;
  background: #f0f8ff;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
`

const MapImage = styled.img<{ scale: number }>`
  width: ${props => props.scale * 800}px;
  max-width: 100vw;
  height: auto;
  border-radius: 20px;
  display: block;
`

const MapOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  pointer-events: none;
`

const LocationIcon = styled(motion.div)<{ x: number; y: number }>`
  position: absolute;
  font-size: 24px;
  cursor: pointer;
  left: ${props => props.x}%;
  top: ${props => props.y}%;
  transform: translate(-50%, -50%);
  z-index: 10;
  pointer-events: auto;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5));
`

const ImageGallery = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 20px;
  max-height: 280px;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 10px;
  
  /* 自定义滚动条样式 */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 4px;
    
    &:hover {
      background: rgba(255, 255, 255, 0.5);
    }
  }

  /* 响应式设计 */
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    max-height: 600px;
  }
  
  @media (max-width: 1024px) and (min-width: 769px) {
    grid-template-columns: repeat(2, 1fr);
    max-height: 400px;
  }
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



const LocationTitle = styled.h4`
  padding: 15px 15px 5px 15px;
  font-size: 18px;
  color: #5d4037;
  text-align: center;
  margin: 0;
  font-weight: 700;
  font-family: 'KaiTi', 'SimKai', serif;
`

const ImageCaption = styled.p`
  padding: 5px 15px 15px 15px;
  font-size: 14px;
  color: #666;
  text-align: center;
  margin: 0;
  line-height: 1.4;
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

// 图片查看器模态框样式
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`

const ModalContent = styled(motion.div)`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`

const ModalImage = styled.img`
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
`

const ModalInfo = styled.div`
  text-align: center;
  color: white;
`

const ModalTitle = styled.h3`
  font-size: 24px;
  margin: 0 0 10px 0;
  color: #fff;
  font-family: 'KaiTi', 'SimKai', serif;
`

const ModalLabel = styled.p`
  font-size: 18px;
  margin: 0;
  color: #ccc;
`

const CloseButton = styled(motion.button)`
  position: absolute;
  top: -50px;
  right: 0;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  color: white;
  font-size: 20px;
  cursor: none !important; /* 🦋 使用蝴蝶鼠标 */
  display: flex;
  align-items: center;
  justify-content: center;
  transition: none; /* 🔧 移除CSS transition，避免与framer-motion冲突 */
`

const NavigationButton = styled(motion.button)<{ direction: 'prev' | 'next' }>`
  position: absolute;
  top: 50%;
  ${props => props.direction === 'prev' ? 'left: -60px;' : 'right: -60px;'}
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  color: white;
  font-size: 24px;
  cursor: none !important; /* 🦋 使用蝴蝶鼠标 */
  display: flex;
  align-items: center;
  justify-content: center;
  transition: none; /* 🔧 移除CSS transition，避免与framer-motion冲突 */
  
  @media (max-width: 768px) {
    ${props => props.direction === 'prev' ? 'left: 10px;' : 'right: 10px;'}
    top: auto;
    bottom: 20px;
  }
`

// 图片查看器组件
interface ImageViewerProps {
  isOpen: boolean;
  onClose: () => void;
  images: Array<{ src: string; label: string }>;
  currentIndex: number;
  onPrevious: () => void;
  onNext: () => void;
  title: string;
}

const ImageViewer: React.FC<ImageViewerProps> = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  onPrevious,
  onNext,
  title
}) => {
  if (!isOpen || images.length === 0) return null;

  return (
    <AnimatePresence>
      <ModalOverlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <ModalContent
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <CloseButton
            onClick={onClose}
            whileHover={{ 
              scale: 1.05,
              background: "rgba(255, 255, 255, 0.2)",
              borderColor: "rgba(255, 255, 255, 0.5)"
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ 
              type: "spring",
              stiffness: 400,
              damping: 25,
              duration: 0.15
            }}
          >
            ✕
          </CloseButton>
          
          {images.length > 1 && (
            <>
              <NavigationButton
                direction="prev"
                onClick={onPrevious}
                whileHover={{ 
                  scale: 1.05,
                  background: "rgba(255, 255, 255, 0.2)",
                  borderColor: "rgba(255, 255, 255, 0.5)"
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ 
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                  duration: 0.15
                }}
              >
                ‹
              </NavigationButton>
              
              <NavigationButton
                direction="next"
                onClick={onNext}
                whileHover={{ 
                  scale: 1.05,
                  background: "rgba(255, 255, 255, 0.2)",
                  borderColor: "rgba(255, 255, 255, 0.5)"
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ 
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                  duration: 0.15
                }}
              >
                ›
              </NavigationButton>
            </>
          )}
          
          <ModalImage
            src={images[currentIndex]?.src}
            alt={`${title} - ${images[currentIndex]?.label}`}
          />
          
          <ModalInfo>
            <ModalTitle>{title}</ModalTitle>
            <ModalLabel>{images[currentIndex]?.label}</ModalLabel>
          </ModalInfo>
        </ModalContent>
      </ModalOverlay>
    </AnimatePresence>
  );
};

const MegijimaPage: React.FC = () => {
  const navigate = useNavigate()
  
  // 图片查看器状态
  const [imageViewer, setImageViewer] = useState({
    isOpen: false,
    images: [] as Array<{ src: string; label: string }>,
    currentIndex: 0,
    title: ''
  });
  
  // 地图缩放比例参数
  // 调整此值来控制地图大小：
  // 0.5 = 50% 大小 (400px 宽)
  // 1.0 = 100% 大小 (800px 宽)  
  // 1.5 = 150% 大小 (1200px 宽)
  const mapScale = 0.6

  // 地图图标坐标参数 (0-100的百分比)
  // 可以手动调节这些数值来移动图标位置
  const pinIcon = { x: 67, y: 35 }      // 📍 景点标记
  const busIcon = { x: 73, y: 66 }      // 🚌 公交/渡轮站

  // 打卡地点图片数据
  const checkInLocations = [
    {
      title: "窄路",
      description: "岛上狭窄的山间小径，光影变化奇妙",
      images: [
        { src: "/images/女木岛/女木岛-窄路-有光.bmp", label: "有光" },
        { src: "/images/女木岛/女木岛-窄路-无光.bmp", label: "无光" }
      ]
    },
    {
      title: "山道",
      description: "蜿蜒的山间道路，不同时分展现不同美景",
      images: [
        { src: "/images/女木岛/女木岛-山道.bmp", label: "白天" },
        { src: "/images/女木岛/女木岛-山道-黄昏.bmp", label: "黄昏" },
        { src: "/images/女木岛/女木岛-山道-夜晚.bmp", label: "夜晚" },
        { src: "/images/女木岛/女木岛-山道-深夜.bmp", label: "深夜" }
      ]
    },
    {
      title: "秘密基地山路",
      description: "通往神秘地点的隐秘山路，四季景色各异",
      images: [
        { src: "/images/女木岛/女木岛-秘密基地山路.bmp", label: "白天" },
        { src: "/images/女木岛/女木岛-秘密基地山路-黄昏.bmp", label: "黄昏" },
        { src: "/images/女木岛/女木岛-秘密基地山路-夜晚.bmp", label: "夜晚" },
        { src: "/images/女木岛/女木岛-秘密基地山路-深夜.bmp", label: "深夜" }
      ]
    },
    {
      title: "采石场入口",
      description: "古老采石场的入口，见证了岛屿的历史变迁",
      images: [
        { src: "/images/女木岛/女木岛-采石场入口.bmp", label: "白天" },
        { src: "/images/女木岛/女木岛-采石场入口-黄昏.bmp", label: "黄昏" },
        { src: "/images/女木岛/女木岛-采石场入口-夜晚.bmp", label: "夜晚" }
      ]
    },
    {
      title: "采石场分岔路",
      description: "采石场内的重要分岔点，选择不同的道路",
      images: [
        { src: "/images/女木岛/女木岛-采石场-分岔路-有光.bmp", label: "有光" },
        { src: "/images/女木岛/女木岛-采石场-分岔路-无光.bmp", label: "无光" }
      ]
    }
  ]

  const handleBack = () => {
    navigate('/checkin')
  }

  // 打开图片查看器
  const openImageViewer = (images: Array<{ src: string; label: string }>, currentIndex: number, title: string) => {
    setImageViewer({
      isOpen: true,
      images,
      currentIndex,
      title
    });
  };

  // 关闭图片查看器
  const closeImageViewer = () => {
    setImageViewer(prev => ({ ...prev, isOpen: false }));
  };

  // 切换到上一张图片
  const goToPreviousImage = () => {
    setImageViewer(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex - 1 + prev.images.length) % prev.images.length
    }));
  };

  // 切换到下一张图片
  const goToNextImage = () => {
    setImageViewer(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % prev.images.length
    }));
  };

  return (
    <Container>
      <HeaderSection>
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Title>
            <Icon>👹</Icon>
            女木岛
            <Icon>👹</Icon>
          </Title>
          <Subtitle>鬼岛传说的神秘小岛</Subtitle>
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
            女木岛是瀬戸内海中的一个小岛，以鬼岛传说而闻名。传说中，这里曾是恶鬼的栖息地，但如今已成为一个宁静美丽的观光胜地。岛上拥有壮观的海滩、神秘的洞穴和独特的艺术装置。
          </Description>
          <Description>
            女木岛的海岸线曲折多变，形成了众多天然的海湾和奇特的岩石景观。岛上植被茂密，春夏季节满目翠绿，秋季则层林尽染，四季景色各有特色。
          </Description>
        </InfoCard>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <MapFrame>
            <MapContainer>
              <MapImage scale={mapScale} src="/images/女木岛/女木岛地图-线路版.png" alt="女木岛地图" />
              <MapOverlay>
                {/* 景点标记 */}
                <LocationIcon
                  x={pinIcon.x}
                  y={pinIcon.y}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  whileHover={{ scale: 1.2 }}
                  title="景点标记"
                >
                  📍
                </LocationIcon>

                {/* 公交/渡轮站 */}
                <LocationIcon
                  x={busIcon.x}
                  y={busIcon.y}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  whileHover={{ scale: 1.2 }}
                  title="公交/渡轮站"
                >
                  🚌
                </LocationIcon>
              </MapOverlay>
            </MapContainer>
          </MapFrame>
        </motion.div>

        <InfoCard
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <SectionTitle>打卡地点</SectionTitle>
          <ImageGallery>
            {checkInLocations.map((location) => (
              <ImageCard
                key={location.title}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => openImageViewer(location.images, 0, location.title)}
                style={{ cursor: 'pointer' }}
              >
                <ImageSlider
                  images={location.images}
                  title={location.title}
                  autoPlay={true}
                  interval={4000}
                  onImageClick={(imageIndex) => openImageViewer(location.images, imageIndex, location.title)}
                />
                <LocationTitle>{location.title}</LocationTitle>
                <ImageCaption>{location.description}</ImageCaption>
              </ImageCard>
            ))}
          </ImageGallery>
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

      {/* 图片查看器模态框 */}
      <ImageViewer
        isOpen={imageViewer.isOpen}
        onClose={closeImageViewer}
        images={imageViewer.images}
        currentIndex={imageViewer.currentIndex}
        onPrevious={goToPreviousImage}
        onNext={goToNextImage}
        title={imageViewer.title}
      />
    </Container>
  )
}

export default MegijimaPage 