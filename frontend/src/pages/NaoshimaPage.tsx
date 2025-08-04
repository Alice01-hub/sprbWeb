import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import ImageSlider from '../components/ImageSlider'
import MapDetailViewer from '../components/MapDetailViewer'

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

const ImageGallery = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 20px;
  max-height: 280px;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 10px;
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

// Tab切换组件
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



const NavigationButton = styled(motion.button)<{ direction: 'prev' | 'next' }>`
  position: absolute;
  top: 50%;
  ${props => props.direction === 'prev' ? 'left: -70px;' : 'right: -70px;'}
  transform: translateY(-50%);
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  color: white;
  font-size: 24px;
  cursor: pointer;
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

// Tooltip 组件
const MapTooltip = styled.div`
  position: absolute;
  left: 50%;
  top: -10px;
  transform: translate(-50%, -100%);
  background: #fff;
  color: #333;
  border-radius: 14px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.18);
  padding: 16px 10px 12px 10px; /* 减小左右padding */
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
    bottom: -14px;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 14px solid transparent;
    border-right: 14px solid transparent;
    border-top: 14px solid #fff;
  }
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

// 地标tooltip内容配置
const iconTooltips: Record<string, { image: string; desc: string }> = {
  '小卖部': {
    image: 'images/webps/直岛/直岛-小卖部.webp',
    desc: '苍打工的地点',
  },
  '海狸家': {
    image: 'images/webps/直岛/直岛-海狸家院子.webp',
    desc: '加藤家的住所',
  },
  '白羽钓点': {
    image: 'images/webps/直岛/直岛-白羽钓鱼.webp',
    desc: '白羽钓鱼的地方',
  },
  '蔷薇庄': {
    image: 'images/webps/直岛/直岛-蔷薇庄.webp',
    desc: '静久的饭店',
  },
  '鸣濑神社': {
    image: 'images/webps/直岛/直岛-神社.webp',
    desc: '白羽家的神社',
  },
}

const NaoshimaPage: React.FC = () => {
  const navigate = useNavigate()
  // Tab切换
  const [activeTab, setActiveTab] = useState<'intro' | 'guide'>('intro')
  // 图片查看器状态
  const [imageViewer, setImageViewer] = useState({
    isOpen: false,
    images: [] as Array<{ src: string; label: string }>,
    currentIndex: 0,
    title: ''
  })
  // tooltip悬停状态
  const [hoveredIcon, setHoveredIcon] = useState<null | {
    x: number;
    y: number;
    title: string;
    image: string;
    desc: string;
  }>(null)
  
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
  
  // 地图缩放比例
  const mapScale = 1.5
  // 四个角落的地图标志
  const checkInIcons: CheckInIcon[] = [
    { x: 18, y: 54, emoji: '🗺️', title: '小卖部', iconType: 'emoji', size: 30 },
    { x: 58, y: 50, emoji: '🗺️', title: '海狸家', iconType: 'emoji', size: 30 },
    { x: 75, y: 64, emoji: '🗺️', title: '白羽钓点', iconType: 'emoji', size: 30 },
    { x: 67, y: 88, emoji: '🗺️', title: '蔷薇庄', iconType: 'emoji', size: 30 },
    { x: 21, y: 32, emoji: '⛩️', title: '鸣濑神社', iconType: 'emoji', size: 25 },
  ]
  
  // 地图详情数据
  const mapDetails = {
    '小卖部': {
      mapImage: "images/webps/直岛/直岛地图-小卖部-路线版.webp",
      description: '苍打工的零食店，已歇业。',
      iconPositions: [
        { x: 24, y: 0, emoji: '🍧', size: 30 },
        { x: 28, y: 69, emoji: '🚲', size: 30 },
        { x: 10, y: 0, icon: 'images/webps/直岛/直岛-小卖部.webp', size: 200 },
        { x: 20, y: 50, icon: 'images/webps/直岛/直岛-sprb租车店.webp', size: 200 },
      ]
    },
    '海狸家': {
      mapImage: "images/webps/直岛/直岛地图-水塘海狸家-路线版.webp",
      description: '加藤家的住所，休憩之地。',
      iconPositions: [
        { x: 11, y: 72, icon: 'images/webps/直岛/直岛-灵弹.webp', size: 200 },
        { x: 80, y: 3, icon: 'images/webps/直岛/直岛-海狸家院子.webp', size: 150 },
        { x: 74, y: 40, icon: 'images/webps/直岛/直岛-八幡神社石阶.webp', size: 200 },
      ]
    },
    '白羽钓点': {
      mapImage: "images/webps/直岛/直岛地图-白羽钓点-路线版.webp",
      description: '白羽钓鱼的地方，海风徐徐。',
      iconPositions: [
        { x: 5, y: 75, icon: 'images/webps/直岛/直岛-积浦海岸.webp', size: 200 },
        { x: 82, y: 35, icon: 'images/webps/直岛/直岛-白羽钓鱼.webp', size: 200 },
        { x: 57, y: 0, icon: 'images/webps/直岛/直岛-白羽钓点.webp', size: 200 },
      ]
    },
    '蔷薇庄': {
      mapImage: "images/webps/直岛/直岛地图-蔷薇庄-路线版.webp",
      description: '充满回忆的住宿地，温馨舒适。',
      iconPositions: [
        { x: 92, y: 58, icon: 'images/webps/直岛/直岛-蔷薇庄图标.webp', size: 50 },
        { x: 71, y: 53, icon: 'images/webps/直岛/直岛-惠美须神社鸟居.webp', size: 100 },
        { x: 85, y: 74, icon: 'images/webps/直岛/直岛-海水浴场.webp', size: 150 },
        { x: 12, y: -2, icon: 'images/webps/直岛/直岛-游戏主界面图标.webp', size: 400 },
      ]
    },
    '鸣濑神社': {
      mapImage: "images/webps/直岛/直岛-神社.webp",
      description: '白羽出嫁的地点。',
      iconPositions: []
    }
  }
  // 打卡点图片与描述
  const checkInLocations = [
    {
      title: '港口',
      description: '直岛的主要交通枢纽，旅程的起点。',
      images: [
        { src: "images/webps/直岛/直岛-港口-无船.webp", label: '白天-无船' },
        { src: "images/webps/直岛/直岛-港口-无船-黄昏.webp", label: '黄昏-无船' },
        { src: "images/webps/直岛/直岛-港口-无船-夜晚.webp", label: '夜晚-无船' },
        { src: "images/webps/直岛/直岛-港口-有船.webp", label: '白天-有船' },
        { src: "images/webps/直岛/直岛-港口-有船-黄昏.webp", label: '黄昏-有船' },
        { src: "images/webps/直岛/直岛-港口-有船-夜晚.webp", label: '夜晚-有船' },
        { src: "images/webps/直岛/直岛-港口-下雨.webp", label: '下雨' },
      ]
    },
    {
      title: '小卖部',
      description: '苍打工的零食店。',
      images: [
        { src: "images/webps/直岛/直岛-小卖部.webp", label: '白天' },
        { src: "images/webps/直岛/直岛-小卖部-黄昏.webp", label: '黄昏' },
        { src: "images/webps/直岛/直岛-小卖部-夜晚.webp", label: '夜晚' },
      ]
    },
    {
      title: '鸣濑神社',
      description: '白羽出嫁的地点。',
      images: [
        { src: "images/webps/直岛/直岛-神社.webp", label: '白天' },
        { src: "images/webps/直岛/直岛-神社-黄昏.webp", label: '黄昏' },
        { src: "images/webps/直岛/直岛-神社-夜晚.webp", label: '夜晚' },
      ]
    },
    {
      title: '灵弹',
      description: '灵弹~灵弹~。',
      images: [
        { src: "images/webps/直岛/直岛-灵弹.webp", label: '白天' },
        { src: "images/webps/直岛/直岛-灵弹-黄昏.webp", label: '黄昏' },
        { src: "images/webps/直岛/直岛-灵弹-夜晚.webp", label: '夜晚' },
      ]
    },
    {
      title: '海狸家门前',
      description: '加藤家门口。',
      images: [
        { src: "images/webps/直岛/直岛-海狸家门前.webp", label: '白天' },
        { src: "images/webps/直岛/直岛-海狸家门前-黄昏.webp", label: '黄昏' },
        { src: "images/webps/直岛/直岛-海狸家门前-夜晚.webp", label: '夜晚' },
      ]
    },
    {
      title: '海狸家院子',
      description: '加藤家院子。',
      images: [
        { src: "images/webps/直岛/直岛-海狸家院子.webp", label: '白天' },
        { src: "images/webps/直岛/直岛-海狸家院子-黄昏.webp", label: '黄昏' },
        { src: "images/webps/直岛/直岛-海狸家院子-夜晚.webp", label: '夜晚' },
      ]
    },
    {
      title: '海狸家客厅',
      description: '加藤家客厅。',
      images: [
        { src: "images/webps/直岛/直岛-海狸家客厅.webp", label: '白天' },
        { src: "images/webps/直岛/直岛-海狸家客厅-黄昏.webp", label: '黄昏' },
        { src: "images/webps/直岛/直岛-海狸家客厅-夜晚.webp", label: '夜晚' },
      ]
    },
    {
      title: '海狸家厨房',
      description: '加藤家厨房。',
      images: [
        { src: "images/webps/直岛/直岛-海狸家厨房.webp", label: '白天' },
        { src: "images/webps/直岛/直岛-海狸家厨房-中午.webp", label: '中午' },
        { src: "images/webps/直岛/直岛-海狸家厨房-夜晚.webp", label: '夜晚' },
      ]
    },
    {
      title: '海狸家卧室',
      description: '加藤家卧室。',
      images: [
        { src: "images/webps/直岛/直岛-海狸家卧室-无床.webp", label: '白天-无床' },
        { src: "images/webps/直岛/直岛-海狸家卧室-无床-黄昏.webp", label: '黄昏-无床' },
        { src: "images/webps/直岛/直岛-海狸家卧室-无床-开灯-夜晚.webp", label: '夜晚-无床-开灯' },
        { src: "images/webps/直岛/直岛-海狸家卧室-无床-关灯-夜晚.webp", label: '夜晚-无床-关灯' },
        { src: "images/webps/直岛/直岛-海狸家卧室-有床.webp", label: '白天-有床' },
        { src: "images/webps/直岛/直岛-海狸家卧室-有床-黄昏.webp", label: '黄昏-有床' },
        { src: "images/webps/直岛/直岛-海狸家卧室-有床-开灯-夜晚.webp", label: '夜晚-有床-开灯' },
        { src: "images/webps/直岛/直岛-海狸家卧室-有床-关灯-夜晚.webp", label: '夜晚-有床-关灯' },
      ]
    },
    {
      title: '食堂',
      description: '白羽家的食堂。',
      images: [
        { src: "images/webps/直岛/直岛-食堂.webp", label: '白天' },
        { src: "images/webps/直岛/直岛-食堂-黄昏.webp", label: '黄昏' },
        { src: "images/webps/直岛/直岛-食堂-夜晚.webp", label: '夜晚' },
      ]
    },
    {
      title: '役场通路',
      description: '通往鸟白岛役场',
      images: [
        { src: "images/webps/直岛/直岛-役场通路.webp", label: '役场通路' },
      ]
    },
    {
      title: '八幡神社石阶',
      description: '美希穿和服。',
      images: [
        { src: "images/webps/直岛/直岛-八幡神社石阶.webp", label: '八幡神社石阶' },
      ]
    },
    {
      title: '积浦海岸',
      description: '羽未的日出打卡点',
      images: [
        { src: "images/webps/直岛/直岛-积浦海岸.webp", label: '积浦海岸' },
      ]
    },
    {
      title: '白羽钓鱼点',
      description: '白羽钓鱼的地方',
      images: [
        { src: "images/webps/直岛/直岛-白羽钓鱼.webp", label: '白天' },
        { src: "images/webps/直岛/直岛-白羽钓点.webp", label: '白天' },
        { src: "images/webps/直岛/直岛-白羽钓点-黄昏.webp", label: '黄昏' },
        { src: "images/webps/直岛/直岛-白羽钓点-夜晚.webp", label: '夜晚' },
      ]
    },
    {
      title: '惠美须神社鸟居',
      description: '独特的鸟居景观。',
      images: [
        { src: "images/webps/直岛/直岛-惠美须神社鸟居.webp", label: '惠美须神社鸟居' },
      ]
    },
    {
      title: '蔷薇庄',
      description: '静久加饭的地方。',
      images: [
        { src: "images/webps/直岛/直岛-蔷薇庄.webp", label: '蔷薇庄' },
      ]
    },
    {
      title: '海水浴场',
      description: '良一脱衣服的地方。',
      images: [
        { src: "images/webps/直岛/直岛-海水浴场.webp", label: '白天' },
        { src: "images/webps/直岛/直岛-海水浴场-夜晚.webp", label: '夜晚' },
        { src: "images/webps/直岛/直岛-海水浴场-黄昏.webp", label: '黄昏' },
      ]
    },
    {
      title: '游戏主界面',
      description: '全部女主的合照',
      images: [
        { src: "images/webps/直岛/直岛-游戏主界面.webp", label: '游戏主界面' },
      ]
    },
  ]
  // 打开图片查看器
  const openImageViewer = (images: Array<{ src: string; label: string }>, currentIndex: number, title: string) => {
    setImageViewer({
      isOpen: true,
      images,
      currentIndex,
      title
    })
  }
  // 关闭图片查看器
  const closeImageViewer = () => {
    setImageViewer(prev => ({ ...prev, isOpen: false }))
  }
  // 切换到上一张图片
  const goToPreviousImage = () => {
    setImageViewer(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex - 1 + prev.images.length) % prev.images.length
    }))
  }
  // 切换到下一张图片
  const goToNextImage = () => {
    setImageViewer(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % prev.images.length
    }))
  }
  
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
                    直岛是瀬户内海中著名的艺术岛屿，拥有丰富的自然与人文景观，是现代艺术与传统生活完美融合的代表。
                  </Description>
                  <Description>
                    岛上巡礼点较为分散，建议租自行车前往。
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
                    直岛的建议巡礼方式为自行车，上岛后可以在Summer Pocket租车店租一辆胡子🐱自行车。
                  </Description>
                  <Description>
                    直岛巡礼主要分为4个区域，点击地图上的🗺️图标可查看详情。<br />
                  </Description>
                  <Description>
                    直岛共有15个打卡点，具体如下：<br />
                    <div style={{ textIndent: '2em' }}>港口往北：苍打工的小卖部 → 鸣濑神社</div>
                    <div style={{ textIndent: '2em' }}>正东方：小水塘 → 海狸家 → 八幡神社</div>
                    <div style={{ textIndent: '2em' }}>八幡神社往南：羽未日出点 → 白羽钓鱼点</div>
                    <div style={{ textIndent: '2em' }}>羽未日出点往南：</div>
                    <div style={{ textIndent: '4em' }}>惠美须神社鸟居 → 往东，蔷薇庄，海水浴场</div>
                    <div style={{ textIndent: '4em' }}>惠美须神社鸟居 → 往西，游戏主界面拍摄点</div>
                  </Description>
                  <Description>
                    其他说明：<br />
                    <div style={{ textIndent: '2em' }}>1. 小卖部和食堂已停业，只能在门口拍照；</div>
                    <div style={{ textIndent: '2em' }}>2. 海狸家附近点位较多；</div>
                    <div style={{ textIndent: '2em' }}>3. 海狸家客厅和卧室需要预定石井商店民宿才可拍照；</div>
                    <div style={{ textIndent: '2em' }}>4. 白羽钓鱼点涨潮时无法到达；</div>
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
              <MapImage scale={mapScale} src="images/webps/直岛/直岛地图-路线版.webp" alt="直岛地图" />
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
                      // 所有图标都显示地图详情
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
                      <img src={icon.icon} alt={icon.title} />
                    )}
                    {/* Tooltip渲染 */}
                    {hoveredIcon && hoveredIcon.title === icon.title && (
                      <MapTooltip>
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

// 图片查看器组件
const ImageViewer: React.FC<ImageViewerProps> = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  onPrevious,
  onNext,
  title
}) => {
  if (!isOpen || images.length === 0) return null
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
                style={{ transformOrigin: 'center' }}
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
                style={{ transformOrigin: 'center' }}
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
  )
}

export default NaoshimaPage 