import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import ImageSlider from '../components/ImageSlider'

// 地图图标接口定义
interface CheckInIcon {
  x: number
  y: number
  emoji?: string
  icon?: string
  title: string
  iconType: 'emoji' | 'image'
  size: number
}

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
  display: inline-flex;
  align-items: center;
  
  img {
    width: 60px;
    height: 60px;
    object-fit: contain;
  }
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
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, 
      rgba(255, 107, 53, 0.05) 0%,
      rgba(135, 206, 235, 0.05) 50%,
      rgba(152, 228, 214, 0.05) 100%
    );
    z-index: -1;
    opacity: 0;
    transition: opacity 0.6s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
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
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 3px;
    height: 100%;
    background: linear-gradient(180deg, #ff6b35, #ffa500);
    border-radius: 2px;
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
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

const LocationIcon = styled(motion.div)<{ x: number; y: number; iconSize: number }>`
  position: absolute;
  font-size: ${props => props.iconSize}px;
  cursor: pointer;
  left: ${props => props.x}%;
  top: ${props => props.y}%;
  transform: translate(-50%, -50%);
  z-index: 10;
  pointer-events: auto;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5));
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: ${props => props.iconSize}px;
    height: ${props => props.iconSize}px;
    object-fit: contain;
  }
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

// 标签切换组件样式
const TabContainer = styled.div`
  display: flex;
  margin-bottom: 30px;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.2);
  padding: 5px;
  backdrop-filter: blur(10px);
`

const TabButton = styled(motion.button)<{ active: boolean; tabType: 'intro' | 'guide' }>`
  flex: 1;
  padding: 15px 20px;
  border: none;
  border-radius: 10px;
  background: ${props => {
    if (props.active) {
      return props.tabType === 'intro' 
        ? 'linear-gradient(135deg, #ff6b35, #ffa500)'
        : 'linear-gradient(135deg, #87ceeb, #98e4d6)';
    }
    return 'transparent';
  }};
  color: ${props => {
    if (props.active) {
      return props.tabType === 'intro' ? 'white' : '#2e8b57';
    }
    return '#8d6e63';
  }};
  font-size: 18px;
  font-weight: 600;
  font-family: 'KaiTi', 'SimKai', serif;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  box-shadow: ${props => props.active 
    ? (props.tabType === 'intro' 
      ? '0 6px 20px rgba(255, 107, 53, 0.3)' 
      : '0 6px 20px rgba(135, 206, 235, 0.3)')
    : 'none'};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(255, 255, 255, 0.3), 
      transparent
    );
    transition: left 0.8s ease;
    z-index: 1;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => 
      props.tabType === 'intro' 
        ? 'linear-gradient(135deg, #ff8a50, #ffb347)'
        : 'linear-gradient(135deg, #98d8eb, #a8e6d2)'};
    opacity: 0;
    transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 10px;
    z-index: -1;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => 
      props.tabType === 'intro' 
        ? '0 8px 25px rgba(255, 107, 53, 0.4)'
        : '0 8px 25px rgba(135, 206, 235, 0.4)'};
    
    &::before {
      left: 100%;
    }
    
    &::after {
      opacity: ${props => props.active ? 0 : 0.6};
    }
  }
  
  &:active {
    transform: translateY(0);
    transition: transform 0.1s ease;
  }
`

const ContentSection = styled(motion.div)`
  width: 100%;
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

// Tooltip 组件
const MapTooltip = styled.div<{ direction: 'top' | 'bottom' }>`
  position: absolute;
  left: 50%;
  ${props => props.direction === 'top' ? 'top: -10px; transform: translate(-50%, -100%);' : 'bottom: -10px; transform: translate(-50%, 100%);'}
  background: #fff;
  color: #333;
  border-radius: 14px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.18);
  padding: 16px 10px 12px 10px;
  min-width: 220px;
  max-width: 320px;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
  opacity: 0.98;
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    ${props => props.direction === 'top' ? 'bottom: -10px;' : 'top: -10px;'}
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    ${props => props.direction === 'top' ? 'border-top: 10px solid #fff;' : 'border-bottom: 10px solid #fff;'}
    box-shadow: 0 4px 24px rgba(0,0,0,0.10);
  }
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    ${props => props.direction === 'top' ? 'bottom: -11px;' : 'top: -11px;'}
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 11px solid transparent;
    border-right: 11px solid transparent;
    ${props => props.direction === 'top' ? 'border-top: 1px solid #ececec;' : 'border-bottom: 1px solid #ececec;'}
  }
`;
const TooltipImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 10px;
  margin: 0 0 8px 0;
  display: block;
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);
`;
const TooltipTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #5d4037;
  margin-bottom: 4px;
  text-align: center;
`;
const TooltipDesc = styled.div`
  font-size: 14px;
  color: #666;
  text-align: center;
`;

const iconTooltips: Record<string, { image: string; desc: string }> = {
  '泳池': {
    image: 'images/webps/男木岛/男木岛-泳池.webp',
    desc: '与白羽相遇的地方',
  },
  '鸥相遇小道': {
    image: 'images/webps/男木岛/男木岛-鸥相遇小道.webp',
    desc: '与鸥相遇的美丽小径',
  },
  '鸟白岛役场': {
    image: 'images/webps/男木岛/男木岛-鸟白岛役场.webp',
    desc: '岛上重要的行政场所',
  },
  '秘密基地': {
    image: 'images/webps/男木岛/男木岛-秘密基地.webp',
    desc: '与天善打乒乓球的地方',
  },
  '灯塔': {
    image: 'images/webps/男木岛/男木岛-灯塔.webp',
    desc: '与小紬相遇的地方',
  },
  '苍睡觉小道': {
    image: 'images/webps/男木岛/男木岛-苍睡觉小道.webp',
    desc: '与苍相遇的地方',
  },
  '静久神社': {
    image: 'images/webps/男木岛/男木岛-静久神社图.webp',
    desc: '与静久路过的鸟居',
  },
  '鬼姬神山识之墓': {
    image: 'images/webps/男木岛/男木岛-鬼姬神山识之墓.webp',
    desc: '与。。。',
  },
  '放送塔': {
    image: 'images/webps/男木岛/男木岛-放送塔.webp',
    desc: '美希等爸爸妈妈的地点',
  },
  '防波堤': {
    image: 'images/webps/男木岛/男木岛-防波堤.webp',
    desc: '白羽主视觉',
  },
};

const OgijimaPage: React.FC = () => {
  const navigate = useNavigate()
  
  // 图片查看器状态
  const [imageViewer, setImageViewer] = useState({
    isOpen: false,
    images: [] as Array<{ src: string; label: string }>,
    currentIndex: 0,
    title: ''
  });
  
  // 信息卡片切换状态
  const [activeTab, setActiveTab] = useState<'intro' | 'guide'>('intro');

  // 地标悬停状态
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  // 移除 tooltipPos 相关
  
  // 地图缩放比例参数
  // 调整此值来控制地图大小：
  // 0.5 = 50% 大小 (400px 宽)
  // 1.0 = 100% 大小 (800px 宽)  
  // 1.5 = 150% 大小 (1200px 宽)
  const mapScale = 1.0

  // 地图图标坐标参数 (0-100的百分比)
  // 可以手动调节这些数值来移动图标位置
  // size参数控制图标大小，单位为像素 (建议范围: 16-40)
  const checkInIcons: CheckInIcon[] = [
    { x: 28, y: 78, emoji: '🏊', title: '泳池', iconType: 'emoji', size: 24 },
    { x: 51, y: 78, icon: "images/webps/男木岛/男木岛-鸥相遇小道图标.webp", title: '鸥相遇小道', iconType: 'image', size: 50 },
    { x: 23, y: 74, emoji: '🏛️', title: '鸟白岛役场', iconType: 'emoji', size: 24 },
    { x: 28, y: 76, icon: "images/webps/男木岛/男木岛-秘密基地图标.webp", title: '秘密基地', iconType: 'image', size: 35 },
    { x: 60, y: 3, icon: "images/webps/男木岛/男木岛-灯塔图标.webp", title: '灯塔', iconType: 'image', size: 32 },
    { x: 31, y: 52, emoji: '💤', title: '苍睡觉小道', iconType: 'emoji', size: 40 },
    { x: 33, y: 60, emoji: '⛩️', title: '静久神社', iconType: 'emoji', size: 35 },
    { x: 54, y: 5, icon: "images/webps/男木岛/男木岛-鬼姬神山识之墓图标.webp", title: '鬼姬神山识之墓', iconType: 'image', size: 45 },
    { x: 24, y: 65, icon: "images/webps/男木岛/男木岛-放送塔图标.webp", title: '放送塔', iconType: 'image', size: 28 },
    { x: 16, y: 74, emoji: '🌊', title: '防波堤', iconType: 'emoji', size: 24 }
  ];

  // 打卡地点图片数据
  const checkInLocations = [
    {
      title: "泳池",
      description: "与白羽相遇的地方",
      images: [
        { src: "images/webps/男木岛/男木岛-泳池.webp", label: "白天" },
        { src: "images/webps/男木岛/男木岛-泳池-黄昏.webp", label: "黄昏" },
        { src: "images/webps/男木岛/男木岛-泳池-夜晚.webp", label: "夜晚" }
      ]
    },
    {
      title: "鸥相遇小道",
      description: "与鸥相遇的美丽小径",
      images: [
        { src: "images/webps/男木岛/男木岛-鸥相遇小道.webp", label: "白天" },
        { src: "images/webps/男木岛/男木岛-鸥相遇小道-黄昏.webp", label: "黄昏" },
        { src: "images/webps/男木岛/男木岛-鸥相遇小道-夜晚.webp", label: "夜晚" }
      ]
    },
    {
      title: "鸟白岛役场",
      description: "岛上重要的行政场所",
      images: [
        { src: "images/webps/男木岛/男木岛-鸟白岛役场.webp", label: "白天" },
        { src: "images/webps/男木岛/男木岛-鸟白岛役场-黄昏.webp", label: "黄昏" },
        { src: "images/webps/男木岛/男木岛-鸟白岛役场-夜晚.webp", label: "夜晚" }
      ]
    },
    {
      title: "秘密基地",
      description: "与天善打乒乓球的地方",
      images: [
        { src: "images/webps/男木岛/男木岛-秘密基地.webp", label: "白天" },
        { src: "images/webps/男木岛/男木岛-秘密基地-黄昏.webp", label: "黄昏" },
        { src: "images/webps/男木岛/男木岛-秘密基地-夜晚.webp", label: "夜晚" }
      ]
    },
    {
      title: "紬的灯塔",
      description: "与小紬相遇的地方",
      images: [
        { src: "images/webps/男木岛/男木岛-灯塔.webp", label: "白天" },
        { src: "images/webps/男木岛/男木岛-灯塔-黄昏.webp", label: "黄昏" },
        { src: "images/webps/男木岛/男木岛-灯塔-夜晚-亮灯.webp", label: "夜晚-亮灯" },
        { src: "images/webps/男木岛/男木岛-灯塔-夜晚-熄灯.webp", label: "夜晚-熄灯" }
      ]
    },
    {
      title: "苍睡觉小道",
      description: "与苍相遇的地方",
      images: [
        { src: "images/webps/男木岛/男木岛-苍睡觉小道.webp", label: "白天" },
        { src: "images/webps/男木岛/男木岛-苍睡觉小道-黄昏.webp", label: "黄昏" },
        { src: "images/webps/男木岛/男木岛-苍睡觉小道-夜晚.webp", label: "夜晚" }
      ]
    },
    {
      title: "静久神社",
      description: "与静久路过的鸟居",
      images: [
        { src: "images/webps/男木岛/男木岛-静久神社图.webp", label: "静久神社" }
      ]
    },
    {
      title: "鬼姬神山识之墓",
      description: "与。。。",
      images: [
        { src: "images/webps/男木岛/男木岛-鬼姬神山识之墓.webp", label: "鬼姬神山识之墓" }
      ]
    },
    {
      title: "放送塔",
      description: "美希等爸爸妈妈的地点",
      images: [
        { src: "images/webps/男木岛/男木岛-放送塔.webp", label: "放送塔" }
      ]
    },
    {
      title: "防波堤",
      description: "白羽主视觉",
      images: [
        { src: "images/webps/男木岛/男木岛-防波堤.webp", label: "防波堤" }
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
            <Icon><img src="images/webps/男木岛/男木岛-灯塔图标.webp" alt="灯塔" /></Icon>
            男木岛
            <Icon><img src="images/webps/男木岛/男木岛-灯塔图标.webp" alt="灯塔" /></Icon>
          </Title>
          <Subtitle>宁静的猫岛渔村</Subtitle>
        </motion.div>
      </HeaderSection>

      <ContentContainer>
        <InfoCard
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <TabContainer>
            <TabButton
              active={activeTab === 'intro'}
              tabType="intro"
              onClick={() => setActiveTab('intro')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              🏝️ 岛屿介绍
            </TabButton>
            <TabButton
              active={activeTab === 'guide'}
              tabType="guide"
              onClick={() => setActiveTab('guide')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              🗺️ 巡礼说明
            </TabButton>
          </TabContainer>

          <AnimatePresence mode="wait">
            {activeTab === 'intro' ? (
              <ContentSection
                key="intro"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <Description>
                    男木岛是瀬戸内海中的一个宁静小岛，以其传统的渔村风貌而闻名。这里的居民世代以渔业为生，岛上的生活节奏缓慢而悠然。
                  </Description>
                  <Description>
                    男木岛的猫咪特别多，被称为"猫岛"，这些可爱的猫咪是岛上的特色之一。
                  </Description>
                </motion.div>
              </ContentSection>
            ) : (
              <ContentSection
                key="guide"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <Description>
                    男木岛的巡礼路线主要分为南北两个方向，北边最远的位置是灯塔，南边最远的位置是和鸥相遇的缺口栏杆。
                  </Description>
                  <Description>
                    男木岛共有10个巡礼点，其中9个可拍照，8个可还原，巡礼推荐路线如下：
                  </Description>
                  <Description>
                    北边：放送塔 → 苍睡觉小道 → 鬼姬神山识之墓 → 灯塔
                  </Description>
                  <Description>
                    中间：放送塔 → 静久神社
                  </Description>
                  <Description>
                    南边：放送塔 → 鸟白岛役场 →  防波堤 → 秘密基地（泳池） → 鸥相遇小道
                  </Description>
                  <Description>
                    其他说明：
                    <div style={{ textIndent: '2em' }}>
                        1. 男木岛的巡礼方式为步行，灯塔距离较远，请安排好时间。
                      </div>
                      <div style={{ textIndent: '2em' }}>
                        2. 放送塔上岛即可看见，可以作为男木岛巡礼起点。
                      </div>
                      <div style={{ textIndent: '2em' }}>
                        3. 两个点无法还原，秘密基地属于丰爷简单自建，泳池禁止拍照。
                      </div>
                      <div style={{ textIndent: '2em' }}>
                        4. 有时间可以和丰爷聊天，丰爷人很好，也是SP粉。
                      </div>
                  </Description>
                </motion.div>
              </ContentSection>
            )}
          </AnimatePresence>
        </InfoCard>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <MapFrame>
            <MapContainer>
              <MapImage scale={mapScale} src="images/webps/男木岛/男木岛地图-线路版.webp" alt="男木岛地图" />
              <MapOverlay>
                {/* 打卡点标记 */}
                {checkInIcons.map((icon, index) => (
                  <LocationIcon
                    key={icon.title}
                    x={icon.x}
                    y={icon.y}
                    iconSize={icon.size}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.2 }}
                    title={icon.title}
                    onMouseEnter={() => setHoveredIcon(icon.title)}
                    onMouseLeave={() => setHoveredIcon(null)}
                  >
                    {icon.iconType === 'image' ? (
                      <img src={icon.icon} alt={icon.title} />
                    ) : (
                      icon.emoji
                    )}
                    {/* 悬停Tooltip，渲染在地标内部 */}
                    {hoveredIcon === icon.title && iconTooltips[icon.title] && (
                      <MapTooltip direction="top">
                        <TooltipImage src={iconTooltips[icon.title].image} alt={icon.title} />
                        <TooltipTitle>{icon.title}</TooltipTitle>
                        <TooltipDesc>{iconTooltips[icon.title].desc}</TooltipDesc>
                      </MapTooltip>
                    )}
                  </LocationIcon>
                ))}
              </MapOverlay>
              {/* 移除原有的fixed Tooltip渲染 */}
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

export default OgijimaPage 