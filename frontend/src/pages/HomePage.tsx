import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import AudioPlayer from '../components/AudioPlayer'

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

const Lock = styled(motion.div)`
  position: absolute;
  top: 50%;
  right: -15px;
  transform: translateY(-50%);
  transform-origin: center center;
  width: 30px;
  height: 40px;
  background: linear-gradient(145deg, #C0C0C0, #808080);
  border-radius: 8px 8px 15px 15px;
  box-shadow: 
    0 4px 8px rgba(0, 0, 0, 0.3),
    inset 0 1px 3px rgba(255, 255, 255, 0.3);
  cursor: pointer;
  z-index: 10;
  transition: all 0.2s ease-in-out;
  
  &::before {
    content: '';
    position: absolute;
    top: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 15px;
    border: 3px solid #808080;
    border-bottom: none;
    border-radius: 10px 10px 0 0;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 6px;
    height: 6px;
    background: #333;
    border-radius: 50%;
  }
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
  const [stars, setStars] = useState<Array<{
    id: number;
    left: number;
    top: number;
    size: number;
    duration: number;
    delay: number;
  }>>([])

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
              <Title>Summer Pockets巡礼指南</Title>
              <CoverImageContainer>
                <CoverImage 
                  src="/images/sprb封面图.png" 
                  alt="Summer Pockets 封面"
                />
              </CoverImageContainer>
            </DiaryFront>
          </BookCover>
          
          <Lock
            onClick={handleLockClick}
            whileHover={{ 
              boxShadow: "0 0 20px rgba(255, 215, 0, 0.8), 0 0 40px rgba(255, 215, 0, 0.4)",
              filter: "brightness(1.2)"
            }}
            whileTap={{ scale: 0.95 }}
            animate={isOpening ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
        </DiaryBook>
      </DiaryBookContainer>

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

      <AudioPlayer />
    </Container>
  )
}

export default HomePage 