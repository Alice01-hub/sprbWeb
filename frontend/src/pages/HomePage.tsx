import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import OSS_CONFIG from '../config/ossConfig';

const sparkle = keyframes`
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
`

const Container = styled.div`
  height: 100vh;
  width: 100vw;
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

const StarsContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`

interface StarProps {
  duration: number;
  delay: number;
}

const Star = styled.div<StarProps>`
  position: absolute;
  background: white;
  border-radius: 50%;
  animation: ${sparkle} ${props => props.duration}s infinite;
  
  &:nth-child(odd) {
    animation-delay: ${props => props.delay}s;
  }
`

const DiaryBookContainer = styled.div`
  position: relative;
  width: 600px;
  height: 800px;
  perspective: 1000px;
`

const DiaryBook = styled(motion.div)`
  width: 600px;
  height: 800px;
  position: relative;
  cursor: pointer;
`

const BookPages = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: #f8f8f8;
  border-radius: 0 15px 15px 0;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.6),
    inset -5px 0 10px rgba(0, 0, 0, 0.1);
  border: 3px solid #ddd;
  border-left: none;
  
  &::before {
    content: '';
    position: absolute;
    left: 20px;
    top: 20px;
    bottom: 20px;
    width: 2px;
    background: linear-gradient(
      to bottom, 
      #FFB347 0%,
      #FF8C00 50%,
      #FFB347 100%
    );
  }
`

const BookCover = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #8B4513, #A0522D, #CD853F);
  border-radius: 15px;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.6),
    inset 0 2px 10px rgba(255, 255, 255, 0.2),
    inset 0 -2px 10px rgba(0, 0, 0, 0.3);
  transform-origin: left center;
  border: 3px solid #654321;
  z-index: 2;
`

const DiaryFront = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 60px 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Title = styled.h1`
  font-size: 34px;
  color: #2C3E50;
  margin-bottom: 40px;
  text-align: center;
  font-weight: 400;
  text-shadow: 
    2px 2px 4px rgba(255, 255, 255, 0.8),
    0 0 10px rgba(255, 165, 0, 0.3);
  font-family: 'Ma Shan Zheng', '华文行楷', 'STXingkai', 'KaiTi', 'SimKai', cursive;
  letter-spacing: 2px;
  transform: rotate(-1deg);
  position: relative;
  
  &::before {
    content: '📔 ';
    font-size: 0.8em;
  }
  
  &::after {
    content: ' ✍️';
    font-size: 0.8em;
  }
`

const CoverImageContainer = styled.div`
  position: relative;
  margin-bottom: 30px;
`

const CoverImage = styled.img`
  width: 400px;
  height: 500px;
  object-fit: cover;
  border-radius: 15px;
  box-shadow: 
    0 0 20px rgba(255, 215, 0, 0.3),
    inset 0 2px 10px rgba(255, 255, 255, 0.2);
  border: 2px solid #FFD700;
  cursor: pointer; /* 新增：可点击 */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, 
      transparent 0%, 
      rgba(255, 215, 0, 0.2) 50%, 
      transparent 100%
    );
    border-radius: 15px;
    pointer-events: none;
  }
`

// 新增：大图预览模态框
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.7);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ModalImage = styled.img`
  max-width: 90vw;
  max-height: 90vh;
  border-radius: 18px;
  box-shadow: 0 0 40px rgba(0,0,0,0.7);
  border: 3px solid #FFD700;
  background: #fff;
`

const CloseButton = styled.button`
  position: absolute;
  top: 30px;
  right: 40px;
  background: rgba(0,0,0,0.5);
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 201;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  &:hover {
    background: rgba(0,0,0,0.8);
  }
`

const Lock = styled(motion.div)`
  position: absolute;
  top: 50%;
  
  /* 🦋 ====== 蝴蝶水平位置控制区域 ====== */
  right: -70px; /* 
    🔧 蝴蝶图标水平位置调整参数
    
    📏 调整说明：
    - 负值(-15px)：蝴蝶向右移动，超出书本边缘
    - 正值(15px)：蝴蝶向左移动，靠近书本内部
    - 0px：蝴蝶位于书本右边缘
    
    💡 推荐调整范围：
    - 向右移动更多：-20px ~ -30px
    - 向左移动到书本内：0px ~ 20px
    - 贴近书本边缘：-5px ~ 5px
    
    🎯 当前值 -15px = 蝴蝶图标向右突出书本边缘15像素
  */
  /* ======================================= */
  
  /* 🔧 移除CSS transform，完全由Framer Motion管理 */
  transform-origin: center center; /* 🔧 保持中心点为变换原点 */
  width: 100px; /* 图片容器宽度 */
  height: 100px; /* 图片容器高度 */
  cursor: pointer;
  z-index: 10;
  
  /* 🔧 确保悬停时位置稳定 */
  will-change: transform, filter;
`

const LockImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain; /* 🔧 保持图片完整性，不裁剪 */
  object-position: center center; /* 🔧 图片居中对齐 */
  transition: none; /* 🔧 移除过渡效果，图片直接切换 */
  display: block;
`

const FadeOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: black;
  z-index: 100;
  pointer-events: none;
`



const HomePage: React.FC = () => {
  const navigate = useNavigate()
  const [isOpening, setIsOpening] = useState(false)
  const [isLockHovered, setIsLockHovered] = useState(false) // 🔧 添加悬停状态管理
  const [stars, setStars] = useState<Array<{
    id: number;
    left: number;
    top: number;
    size: number;
    duration: number;
    delay: number;
  }>>([])
  const [isModalOpen, setIsModalOpen] = useState(false) // 新增：大图预览状态

  useEffect(() => {
    // 生成随机星星
    const generateStars = () => {
      const newStars = []
      for (let i = 0; i < 100; i++) {
        newStars.push({
          id: i,
          left: Math.random() * 100,
          top: Math.random() * 100,
          size: Math.random() * 3 + 1,
          duration: Math.random() * 3 + 2,
          delay: Math.random() * 2
        })
      }
      setStars(newStars)
    }

    generateStars()
  }, [])

  const handleLockClick = () => {
    setIsOpening(true)
  }

  const handleAnimationComplete = () => {
    if (isOpening) {
      navigate('/contents')
    }
  }

  return (
    <Container>
      <StarsContainer>
        {stars.map((star: any) => (
          <Star
            key={star.id}
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`
            }}
            duration={star.duration}
            delay={star.delay}
          />
        ))}
      </StarsContainer>

      <DiaryBookContainer>
        <DiaryBook
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <BookPages />
          <BookCover
            animate={isOpening ? { rotateY: -180 } : { rotateY: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            style={{ transformStyle: "preserve-3d" }}
            onAnimationComplete={handleAnimationComplete}
          >
            <DiaryFront>
              <Title>Summer Pockets巡礼日记</Title>
              <CoverImageContainer>
                <CoverImage 
                  src={OSS_CONFIG.getImageUrl('/webps/sprb封面图.webp')}
                  alt="Summer Pockets 封面"
                  onClick={() => setIsModalOpen(true)} // 新增：点击弹出大图
                />
              </CoverImageContainer>
            </DiaryFront>
          </BookCover>
          
          {/* 🔓 锁图标 - 蝴蝶特效 */}
          <Lock
            onClick={handleLockClick}
            onMouseEnter={() => setIsLockHovered(true)}
            onMouseLeave={() => setIsLockHovered(false)}
            initial={{ y: "-50%" }} // 🔧 初始状态设置垂直居中
            whileHover={{ 
              scale: 1.1,
              y: "-50%", // 🔧 悬停时保持垂直居中
              filter: "brightness(1.1) drop-shadow(0 0 10px rgba(255, 215, 0, 0.6))"
            }}
            whileTap={{ 
              scale: 0.95,
              y: "-50%" // 🔧 点击时也保持垂直居中
            }}
            animate={isOpening ? { opacity: 0, y: "-50%" } : { opacity: 1, y: "-50%" }} // 🔧 所有状态都保持垂直居中
            transition={{ duration: 0.2 }}
          >
            {/* 🔧 根据悬停状态切换图片 */}
            <LockImage
              src={isLockHovered ? OSS_CONFIG.getImageUrl('/webps/七影蝶-3.webp') : OSS_CONFIG.getImageUrl('/webps/七影蝶-4.webp')}
              alt="蝴蝶锁图标"
            />
          </Lock>
        </DiaryBook>
      </DiaryBookContainer>

      {/* 新增：大图预览模态框 */}
      <AnimatePresence>
        {isModalOpen && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <CloseButton onClick={e => { e.stopPropagation(); setIsModalOpen(false); }} title="关闭">×</CloseButton>
            <ModalImage 
              src={OSS_CONFIG.getImageUrl('/webps/sprb封面图.webp')}
              alt="Summer Pockets 封面大图"
              onClick={e => e.stopPropagation()} // 阻止冒泡，点击图片不关闭
            />
          </ModalOverlay>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpening && (
          <FadeOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.8,
              delay: 1.2
            }}
          />
        )}
      </AnimatePresence>

    </Container>
  )
}

export default HomePage 