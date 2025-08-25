import React, { useState, useCallback, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import ImageSlider from '../components/ImageSlider'
import GalleryViewer from '../components/GalleryViewer'
import MapDetailViewer from '../components/MapDetailViewer'
import OSS_CONFIG from '../config/ossConfig';

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
`

// Tooltip 组件 - 智能定位版本
const MapTooltip = styled.div<{ position: 'top' | 'bottom' | 'left' | 'right' }>`
  position: absolute;
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
  
  ${props => {
    switch (props.position) {
      case 'top':
        return `
          left: 50%;
          top: -10px;
          transform: translate(-50%, -100%);
  &::after {
    content: '';
    position: absolute;
            left: 50%;
            bottom: -14px;
    transform: translateX(-50%);
    width: 0;
    height: 0;
            border-left: 14px solid transparent;
            border-right: 14px solid transparent;
            border-top: 14px solid #fff;
          }
        `;
      case 'bottom':
        return `
          left: 50%;
          bottom: -10px;
          transform: translate(-50%, 100%);
          &::after {
            content: '';
            position: absolute;
            left: 50%;
            top: -14px;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: 14px solid transparent;
            border-right: 14px solid transparent;
            border-bottom: 14px solid #fff;
          }
        `;
      case 'left':
        return `
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          &::after {
            content: '';
            position: absolute;
            right: -14px;
            top: 50%;
            transform: translateY(-50%);
            width: 0;
            height: 0;
            border-top: 14px solid transparent;
            border-bottom: 14px solid transparent;
            border-left: 14px solid #fff;
          }
        `;
      case 'right':
        return `
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
          &::after {
            content: '';
            position: absolute;
            left: -14px;
            top: 50%;
            transform: translateY(-50%);
            width: 0;
            height: 0;
            border-top: 14px solid transparent;
            border-bottom: 14px solid transparent;
            border-right: 14px solid #fff;
          }
        `;
      default:
        return '';
    }
  }}
`;

const TooltipImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
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

const PlayPauseButton = styled(motion.button)`
  background: linear-gradient(45deg, #87CEEB, #98E4D6);
  border: none;
  border-radius: 50px;
  padding: 12px 20px;
  font-size: 16px;
  color: #2E8B57;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(135, 206, 235, 0.4);
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  z-index: 100;
  
  &:hover {
    background: linear-gradient(45deg, #98E4D6, #87CEEB);
    transform: translateY(-2px);
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
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
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
  color: #333;
`

const ModalTitle = styled.h3`
  font-size: 24px;
  margin: 0 0 10px 0;
  color: #5d4037;
  font-family: 'KaiTi', 'SimKai', serif;
  font-weight: 700;
`

const ModalLabel = styled.p`
  font-size: 18px;
  margin: 0;
  color: #666;
  font-weight: 500;
`



// 移除重复的NavigationButton定义，使用下面定义的版本

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

// 左右切换按钮样式暂时移除

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
  
  // tooltip悬停状态
  const [hoveredIcon, setHoveredIcon] = useState<null | {
    x: number;
    y: number;
    title: string;
    image: string;
    desc: string;
  }>(null);
  
  // 地图详情查看器状态
  const [mapDetailViewer, setMapDetailViewer] = useState({
    isOpen: false,
    mapImage: '',
    title: '',
    description: '',
    iconPositions: [] as { x: number; y: number; emoji?: string }[],
  })
  
  // 统一的轮播播放状态
  const [isPlaying, setIsPlaying] = useState(true);

  // 地图缩放比例参数
  const mapScale = 1.0

  // 地标大小调整参数
  const iconSize = 30

  // 地标大小配置 - 可以为不同地标设置不同大小
  // 修改这些值来调整各个地标的大小
  const iconSizeConfig: Record<string, number> = {
    '紬的灯塔': 30,
    '苍睡觉的小道': 30,
    '白羽主视角': 30,
    '鸥相遇小道': 50,
  }

  // 地图地标数据
  const checkInIcons: CheckInIcon[] = [
    { x: 61, y: 2, emoji: '🗺️', title: '紬的灯塔', iconType: 'emoji', size: iconSizeConfig['紬的灯塔'] || iconSize },
    { x: 28, y: 53, emoji: '🗺️', title: '苍睡觉的小道', iconType: 'emoji', size: iconSizeConfig['苍睡觉的小道'] || iconSize },
    { x: 23, y: 74, emoji: '🗺️', title: '白羽主视角', iconType: 'emoji', size: iconSizeConfig['白羽主视角'] || iconSize },
    { x: 49, y: 78, icon: OSS_CONFIG.getImageUrl('/webps/男木岛/男木岛-鸥相遇小道图标.webp'), title: '鸥相遇小道', iconType: 'image', size: iconSizeConfig['鸥相遇小道'] || iconSize },
  ]

  // 地标tooltip内容配置
  const iconTooltips: Record<string, { image: string; desc: string }> = {
    '紬的灯塔': {
      image: OSS_CONFIG.getImageUrl('/webps/男木岛/男木岛-灯塔.webp'),
      desc: '与小紬相遇的地点',
    },
    '苍睡觉的小道': {
      image: OSS_CONFIG.getImageUrl('/webps/男木岛/男木岛-苍睡觉小道.webp'),
      desc: '与苍相遇的地点',
    },
    '白羽主视角': {
      image: OSS_CONFIG.getImageUrl('/webps/男木岛/男木岛-防波堤.webp'),
      desc: '第一次见白羽的地点',
    },
    '鸥相遇小道': {
      image: OSS_CONFIG.getImageUrl('/webps/男木岛/男木岛-鸥相遇小道.webp'),
      desc: '与鸥相遇的地点',
    },
  }

  // 地图详情数据
  const mapDetails = {
    '紬的灯塔': {
      mapImage: OSS_CONFIG.getImageUrl("/webps/男木岛/男木岛-灯塔地图-线路版.webp"),
      description: '我正在找东西，找自己想要做的事情',
      iconPositions: [
        { x: 21, y: 37, icon: OSS_CONFIG.getImageUrl('/webps/男木岛/男木岛-鬼姬神山识之墓.webp'), size: 200 },
        { x: 74, y: 35, icon: OSS_CONFIG.getImageUrl('/webps/男木岛/男木岛-紬的灯塔.webp'), size: 200 },
      ]
    },
    '苍睡觉的小道': {
      mapImage: OSS_CONFIG.getImageUrl("/webps/男木岛/男木岛-苍睡觉小道地图-线路版.webp"),
      description: '总之，就算我在睡觉也不必管啦',
      iconPositions: [
        { x: 38, y: 82, icon: OSS_CONFIG.getImageUrl('/webps/男木岛/男木岛-放送塔.webp'), size: 150 },
        { x: 63, y: 22, icon: OSS_CONFIG.getImageUrl('/webps/男木岛/男木岛-苍睡觉小道.webp'), size: 200 },
        { x: 76, y: 62, icon: OSS_CONFIG.getImageUrl('/webps/男木岛/男木岛-静久神社.webp'), size: 200 },
      ]
    },
    '白羽主视角': {
      mapImage: OSS_CONFIG.getImageUrl("/webps/男木岛/男木岛-鸟白岛役场地图-线路版.webp"),
      description: '不用在意我就好',
      iconPositions: [
        { x: 33, y: 2, icon: OSS_CONFIG.getImageUrl('/webps/男木岛/男木岛-放送塔.webp'), size: 150 },
        { x: 5, y: 55, icon: OSS_CONFIG.getImageUrl('/webps/男木岛/男木岛-防波堤.webp'), size: 180 },
        { x: 42, y: 64, icon: OSS_CONFIG.getImageUrl('/webps/男木岛/男木岛-鸟白岛役场.webp'), size: 150 },
        { x: 65, y: 70, icon: OSS_CONFIG.getImageUrl('/webps/男木岛/男木岛-秘密基地.webp'), size: 100 },
        { x: 65, y: 76, icon: OSS_CONFIG.getImageUrl('/webps/男木岛/男木岛-泳池.webp'), size: 100 },
      ]
    },
    '鸥相遇小道': {
      mapImage: OSS_CONFIG.getImageUrl("/webps/男木岛/男木岛-鸥相遇小道.webp"),
      description: '出发吧~再一次，向着那有海盗船的地方',
      iconPositions: []
    }
  }

  // 打卡地点图片数据
  const checkInLocations = [
    {
      title: "放送塔",
      description: "美希等爸爸妈妈的地点",
      images: [
        { src: OSS_CONFIG.getImageUrl("/webps/男木岛/男木岛-放送塔.webp"), label: "放送塔" }
      ]
    },
    {
      title: "苍睡觉的小道",
      description: "与苍相遇的地点",
      images: [
        { src: OSS_CONFIG.getImageUrl("/webps/男木岛/男木岛-苍睡觉小道.webp"), label: "白天" },
        { src: OSS_CONFIG.getImageUrl("/webps/男木岛/男木岛-苍睡觉小道-黄昏.webp"), label: "黄昏" },
        { src: OSS_CONFIG.getImageUrl("/webps/男木岛/男木岛-苍睡觉小道-夜晚.webp"), label: "夜晚" }
      ]
    },
    {
      title: "鬼姬神山识之墓",
      description: "与小识。。。",
      images: [
        { src: OSS_CONFIG.getImageUrl("/webps/男木岛/男木岛-鬼姬神山识之墓.webp"), label: "鬼姬神山识之墓" }
      ]
    },
    {
      title: "紬的灯塔",
      description: "与小紬相遇的地点",
      images: [
        { src: OSS_CONFIG.getImageUrl("/webps/男木岛/男木岛-灯塔.webp"), label: "白天" },
        { src: OSS_CONFIG.getImageUrl("/webps/男木岛/男木岛-灯塔-黄昏.webp"), label: "黄昏" },
        { src: OSS_CONFIG.getImageUrl("/webps/男木岛/男木岛-灯塔-夜晚-亮灯.webp"), label: "夜晚-亮灯" },
        { src: OSS_CONFIG.getImageUrl("/webps/男木岛/男木岛-灯塔-夜晚-熄灯.webp"), label: "夜晚-熄灯" }
      ]
    },
    {
      title: "静久神社",
      description: "与静久路过的鸟居",
      images: [
        { src: OSS_CONFIG.getImageUrl("/webps/男木岛/男木岛-静久神社.webp"), label: "静久神社" }
      ]
    },
    {
      title: "鸟白岛役场",
      description: "岛上重要的行政场所",
      images: [
        { src: OSS_CONFIG.getImageUrl("/webps/男木岛/男木岛-鸟白岛役场.webp"), label: "白天" },
        { src: OSS_CONFIG.getImageUrl("/webps/男木岛/男木岛-鸟白岛役场-黄昏.webp"), label: "黄昏" },
        { src: OSS_CONFIG.getImageUrl("/webps/男木岛/男木岛-鸟白岛役场-夜晚.webp"), label: "夜晚" }
      ]
    },
    {
      title: "防波堤",
      description: "白羽主视觉",
      images: [
        { src: OSS_CONFIG.getImageUrl("/webps/男木岛/男木岛-防波堤.webp"), label: "防波堤" }
      ]
    },
    {
      title: "秘密基地",
      description: "与天善打乒乓球的地点",
      images: [
        { src: OSS_CONFIG.getImageUrl("/webps/男木岛/男木岛-秘密基地.webp"), label: "白天" },
        { src: OSS_CONFIG.getImageUrl("/webps/男木岛/男木岛-秘密基地-黄昏.webp"), label: "黄昏" },
        { src: OSS_CONFIG.getImageUrl("/webps/男木岛/男木岛-秘密基地-夜晚.webp"), label: "夜晚" }
      ]
    },
    {
      title: "泳池",
      description: "与白羽相遇的地点",
      images: [
        { src: OSS_CONFIG.getImageUrl("/webps/男木岛/男木岛-泳池.webp"), label: "白天" },
        { src: OSS_CONFIG.getImageUrl("/webps/男木岛/男木岛-泳池-黄昏.webp"), label: "黄昏" },
        { src: OSS_CONFIG.getImageUrl("/webps/男木岛/男木岛-泳池-夜晚.webp"), label: "夜晚" }
      ]
    },
    {
      title: "缺口栏杆",
      description: "与鸥相遇的地点",
      images: [
        { src: OSS_CONFIG.getImageUrl("/webps/男木岛/男木岛-鸥相遇小道.webp"), label: "白天" },
        { src: OSS_CONFIG.getImageUrl("/webps/男木岛/男木岛-鸥相遇小道-黄昏.webp"), label: "黄昏" },
        { src: OSS_CONFIG.getImageUrl("/webps/男木岛/男木岛-鸥相遇小道-夜晚.webp"), label: "夜晚" }
      ]
    },
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

  // 打开地图详情查看器
  const openMapDetailViewer = (title: string, mapImage: string, description: string, iconPositions: { x: number; y: number; emoji?: string }[]) => {
    setMapDetailViewer({
      isOpen: true,
      mapImage,
      title,
      description,
      iconPositions,
    })
  }
  
  // 关闭地图详情查看器
  const closeMapDetailViewer = () => {
    setMapDetailViewer(prev => ({ ...prev, isOpen: false }))
  }

  // 计算tooltip最佳显示位置
  const getTooltipPosition = (x: number, y: number): 'top' | 'bottom' | 'left' | 'right' => {
    // 根据地图边缘位置智能选择显示方向
    if (y < 20) {
      // 靠近顶部，显示在下方
      return 'bottom';
    } else if (y > 80) {
      // 靠近底部，显示在上方
      return 'top';
    } else if (x < 20) {
      // 靠近左侧，显示在右侧
      return 'right';
    } else if (x > 80) {
      // 靠近右侧，显示在左侧
      return 'left';
    } else {
      // 默认显示在上方
      return 'top';
    }
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
            <Icon><img src={OSS_CONFIG.getImageUrl('/webps/男木岛/男木岛-灯塔图标.webp')} alt="灯塔" /></Icon>
            男木岛
            <Icon><img src={OSS_CONFIG.getImageUrl('/webps/男木岛/男木岛-灯塔图标.webp')} alt="灯塔" /></Icon>
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
                    男木岛是一个在斜坡上有梯田村庄和历史灯塔的岛屿。
                  </Description>
                  <Description>
                    男木岛的猫咪特别多，被称为"猫岛"，巡礼之余可以去撸一下猫猫。
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
                    男木岛的巡礼路线主要分为南北两个方向，北边最远的位置是灯塔，南边最远的位置是和鸥相遇的海岸小路。
                  </Description>
                  <Description>
                    男木岛共有10个巡礼点，巡礼推荐路线如下，点击🗺️可查看详情：
                  </Description>
                  <Description>
                    北边：放送塔 → 苍睡觉的小道 → 鬼姬神山识之墓 → 小紬的灯塔
                  </Description>
                  <Description>
                    中部：放送塔 → 静久神社
                  </Description>
                  <Description>
                    南边：放送塔 → 鸟白岛役场 →  防波堤 → 秘密基地（泳池） → 鸥相遇的小路
                  </Description>
                  <Description>
                    其他说明：
                    <div style={{ textIndent: '2em' }}>
                        1. 男木岛的巡礼方式为步行，灯塔距离较远，请安排好时间。
                      </div>
                      <div style={{ textIndent: '2em' }}>
                        2. 放送塔上岛即可看见，适合作为男木岛巡礼的起点。
                      </div>
                      <div style={{ textIndent: '2em' }}>
                        3. 秘密基地由丰爷自建，泳池有人时不要拍照。
                      </div>
                      <div style={{ textIndent: '2em' }}>
                        4. 有时间可以和丰爷聊天，丰爷人很好，一来就给你放bgm。
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
              <MapImage scale={mapScale} src={OSS_CONFIG.getImageUrl('/webps/男木岛/男木岛地图-线路版.webp')} alt="男木岛地图" />
              <MapOverlay>
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
                                      onClick={() => {
                      const detail = mapDetails[icon.title as keyof typeof mapDetails]
                      if (detail) {
                        openMapDetailViewer(icon.title, detail.mapImage, detail.description, detail.iconPositions || [])
                      }
                    }}
                    onMouseEnter={() => {
                      const tip = iconTooltips[icon.title];
                      if (tip) {
                        setHoveredIcon({
                          x: icon.x,
                          y: icon.y,
                          title: icon.title,
                          image: tip.image,
                          desc: tip.desc,
                        });
                      }
                    }}
                    onMouseLeave={() => setHoveredIcon(null)}
                  >
                    {icon.iconType === 'emoji' ? (
                      <span style={{ fontSize: `${icon.size}px` }}>{icon.emoji}</span>
                    ) : (
                      <img 
                        src={icon.icon} 
                        alt={icon.title}
                        style={{ 
                          width: `${icon.size}px`, 
                          height: `${icon.size}px`,
                          borderRadius: '50%',
                          objectFit: 'cover'
                        }} 
                      />
                    )}
                  {/* Tooltip渲染 */}
                    {hoveredIcon && hoveredIcon.title === icon.title && (
                      <MapTooltip position={getTooltipPosition(icon.x, icon.y)}>
                      <TooltipImage src={hoveredIcon.image} alt={hoveredIcon.title} />
                      <TooltipTitle>{hoveredIcon.title}</TooltipTitle>
                      <TooltipDesc>{hoveredIcon.desc}</TooltipDesc>
                    </MapTooltip>
                  )}
                </LocationIcon>
                ))}
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
                  isPlaying={isPlaying}
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
        <PlayPauseButton
          onClick={() => setIsPlaying(!isPlaying)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {isPlaying ? '⏸ 停止轮播' : '▶ 开始轮播'}
        </PlayPauseButton>
        
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

      {/* 统一样式的图片查看器 */}
      <GalleryViewer
        isOpen={imageViewer.isOpen}
        onClose={closeImageViewer}
        images={imageViewer.images}
        currentIndex={imageViewer.currentIndex}
        title={imageViewer.title}
        onPrevious={goToPreviousImage}
        onNext={goToNextImage}
        onIndexChange={(index) => setImageViewer(prev => ({ ...prev, currentIndex: index }))}
      />
      
      {/* 地图详情查看器模态框 */}
      <MapDetailViewer
        isOpen={mapDetailViewer.isOpen}
        onClose={closeMapDetailViewer}
        mapImage={mapDetailViewer.mapImage}
        title={mapDetailViewer.title}
        description={mapDetailViewer.description}
        iconPositions={mapDetailViewer.iconPositions}
        mode="full"
      />

    </Container>
  )
}

export default OgijimaPage 