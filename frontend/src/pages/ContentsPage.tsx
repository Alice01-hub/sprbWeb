import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import AudioPlayer from '../components/AudioPlayer'

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

const SummerBook = styled(motion.div)`
  width: 1200px;
  height: 800px;
  background: linear-gradient(
    to right,
    #FFF8DC 0%,    /* 米色 */
    #FFFAF0 50%,   /* 花白色 */
    #FFF8DC 100%   /* 米色 */
  );
  border-radius: 20px;
  box-shadow: 
    0 20px 60px rgba(255, 165, 0, 0.3),
    inset 0 0 30px rgba(255, 215, 0, 0.1);
  display: flex;
  position: relative;
  z-index: 2;
  
  /* 日记本中间的装订线 */
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 60px;
    bottom: 60px;
    width: 6px;
    background: linear-gradient(
      to bottom, 
      #FFB347 0%,
      #FF8C00 50%,
      #FFB347 100%
    );
    transform: translateX(-50%);
    z-index: 10;
    border-radius: 3px;
  }
  
  /* 装订孔 */
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 2px;
    background: repeating-linear-gradient(
      to bottom,
      transparent 0px,
      transparent 15px,
      #DDD 15px,
      #DDD 17px
    );
    transform: translateX(-50%);
    z-index: 11;
  }
`

const LeftPage = styled.div`
  width: 50%;
  padding: 60px 40px;
  background: #FFFEF7;
  border-radius: 20px 0 0 20px;
  position: relative;
  
  /* 页面边距线 */
  &::before {
    content: '';
    position: absolute;
    left: 80px;
    top: 60px;
    bottom: 60px;
    width: 2px;
    background: #FFB6C1;
    opacity: 0.5;
  }
`

const RightPage = styled.div`
  width: 50%;
  padding: 60px 40px;
  background: #FFFEF7;
  border-radius: 0 20px 20px 0;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const DiaryTitle = styled.h1`
  color: #FF6B35;
  font-size: 42px;
  text-align: center;
  margin-bottom: 20px;
  font-family: '华文行楷', 'STXingkai', 'KaiTi', 'SimKai', cursive;
  text-shadow: 3px 3px 6px rgba(255, 165, 0, 0.3);
  font-weight: 700;
  
  &::before {
    content: '🌻 ';
  }
  
  &::after {
    content: ' 🌻';
  }
`

const DiarySubtitle = styled.p`
  color: #FF8C00;
  font-size: 18px;
  text-align: center;
  margin-bottom: 50px;
  font-style: italic;
  font-family: 'KaiTi', 'SimKai', serif;
`

const ChapterList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-top: 20px;
`

const ChapterItem = styled(motion.div)<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  border-radius: 15px;
  cursor: pointer;
  position: relative;
  background: ${props => props.isActive 
    ? 'linear-gradient(45deg, rgba(255, 182, 193, 0.3), rgba(255, 165, 0, 0.2))'
    : 'transparent'
  };
  transition: all 0.4s ease;
  
  &:hover {
    background: linear-gradient(45deg, rgba(255, 182, 193, 0.3), rgba(255, 165, 0, 0.2));
    transform: translateX(15px) scale(1.02);
    box-shadow: 0 8px 25px rgba(255, 165, 0, 0.3);
  }
  
  /* 手写下划线效果 */
  &::after {
    content: '';
    position: absolute;
    bottom: 5px;
    left: 20px;
    right: 20px;
    height: 2px;
    background: ${props => props.isActive 
      ? 'linear-gradient(to right, #FF6B35, #FFB347, #FF6B35)'
      : 'transparent'
    };
    transform: scaleX(${props => props.isActive ? 1 : 0});
    transition: transform 0.3s ease;
  }
`

const ChapterIcon = styled.div`
  font-size: 36px;
  width: 60px;
  height: 60px;
  background: linear-gradient(45deg, #FF6B35, #FFB347);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 
    0 6px 20px rgba(255, 107, 53, 0.4),
    inset 0 2px 5px rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    transform: rotateY(15deg) rotateX(5deg);
    box-shadow: 
      0 8px 25px rgba(255, 107, 53, 0.5),
      inset 0 2px 5px rgba(255, 255, 255, 0.4);
  }
`

const ChapterTitle = styled.h3<{ isActive: boolean }>`
  color: ${props => props.isActive ? '#FF6B35' : '#2E8B57'};
  font-size: 32px;
  margin: 0;
  flex: 1;
  font-weight: 700;
  font-family: '华文行楷', 'STXingkai', 'KaiTi', 'SimKai', cursive;
  transition: all 0.3s ease;
  text-shadow: ${props => props.isActive 
    ? '2px 2px 4px rgba(255, 107, 53, 0.3)'
    : '1px 1px 2px rgba(46, 139, 87, 0.2)'
  };
`

const SummaryArea = styled(motion.div)`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const SummaryCard = styled(motion.div)`
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.9) 0%,
    rgba(255, 248, 220, 0.9) 100%
  );
  border-radius: 25px;
  padding: 40px;
  text-align: center;
  box-shadow: 
    0 15px 40px rgba(255, 165, 0, 0.3),
    inset 0 0 20px rgba(255, 215, 0, 0.1);
  max-width: 400px;
  width: 100%;
  border: 3px solid rgba(255, 182, 193, 0.3);
`

const SummaryImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 20px;
  margin-bottom: 25px;
  box-shadow: 0 10px 30px rgba(255, 107, 53, 0.3);
  border: 3px solid #FFB6C1;
`

const SummaryText = styled.p`
  font-size: 20px;
  color: #FF6B35;
  font-weight: 600;
  line-height: 1.6;
  font-family: 'KaiTi', 'SimKai', serif;
  text-shadow: 1px 1px 2px rgba(255, 107, 53, 0.2);
`

const HintText = styled(motion.div)`
  color: #2E8B57;
  font-size: 20px;
  text-align: center;
  font-style: italic;
  line-height: 1.8;
  font-family: 'KaiTi', 'SimKai', serif;
  background: rgba(255, 255, 255, 0.7);
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(46, 139, 87, 0.2);
  
  &::before {
    content: '🌞';
    display: block;
    font-size: 48px;
    margin-bottom: 15px;
  }
`

const BackButton = styled(motion.button)`
  position: fixed;
  top: 40px;
  left: 40px;
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



type ChapterType = 'traffic' | 'checkin' | 'other' | null

interface SummaryData {
  image: string
  text: string
}

const summaryData: Record<Exclude<ChapterType, null>, SummaryData> = {
  traffic: {
    image: '/images/交通篇摘要图.png',
    text: '🚌 国内各地到高松的完整交通攻略'
  },
  checkin: {
    image: '/images/打卡篇摘要图.png',
    text: '📍 女木岛、男木岛、直岛圣地巡礼'
  },
  other: {
    image: '/images/其他巡礼摘要图.jpg',
    text: '记得来神域寄存和领取自己的七影碟哦！🦋'
  }
}

const ContentsPage: React.FC = () => {
  const navigate = useNavigate()
  const [activeChapter, setActiveChapter] = useState<ChapterType>(null)

  const handleChapterClick = (chapter: ChapterType) => {
    if (chapter === 'traffic') {
      navigate('/traffic')
    } else if (chapter === 'checkin') {
      navigate('/checkin')
    } else if (chapter === 'other') {
      navigate('/other-pilgrimage')
    }
  }

  const handleBack = () => {
    navigate('/')
  }

  return (
    <Container>
      <SummerBook
        initial={{ scale: 0.7, opacity: 0, rotateY: -15 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <LeftPage>
          <DiaryTitle>夏日口袋目录</DiaryTitle>
          <DiarySubtitle>Summer Pockets 圣地巡礼日记</DiarySubtitle>
          
          <ChapterList>
            <ChapterItem
              isActive={activeChapter === 'traffic'}
              onMouseEnter={() => setActiveChapter('traffic')}
              onMouseLeave={() => setActiveChapter(null)}
              onClick={() => handleChapterClick('traffic')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ChapterIcon>🚌</ChapterIcon>
              <ChapterTitle isActive={activeChapter === 'traffic'}>
                交通篇
              </ChapterTitle>
            </ChapterItem>

            <ChapterItem
              isActive={activeChapter === 'checkin'}
              onMouseEnter={() => setActiveChapter('checkin')}
              onMouseLeave={() => setActiveChapter(null)}
              onClick={() => handleChapterClick('checkin')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ChapterIcon>📍</ChapterIcon>
              <ChapterTitle isActive={activeChapter === 'checkin'}>
                打卡篇
              </ChapterTitle>
            </ChapterItem>

            <ChapterItem
              isActive={activeChapter === 'other'}
              onMouseEnter={() => setActiveChapter('other')}
              onMouseLeave={() => setActiveChapter(null)}
              onClick={() => handleChapterClick('other')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ChapterIcon>🦋</ChapterIcon>
              <ChapterTitle isActive={activeChapter === 'other'}>
                神域
              </ChapterTitle>
            </ChapterItem>
          </ChapterList>
        </LeftPage>

        <RightPage>
          <AnimatePresence mode="wait">
            {activeChapter && activeChapter !== null ? (
              <SummaryArea
                key={activeChapter}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.9 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <SummaryCard
                  initial={{ opacity: 0, rotateX: -20 }}
                  animate={{ opacity: 1, rotateX: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <SummaryImage 
                    src={summaryData[activeChapter].image}
                    alt={`${activeChapter} 摘要图`}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none'
                    }}
                  />
                  <SummaryText>
                    {summaryData[activeChapter].text}
                  </SummaryText>
                </SummaryCard>
              </SummaryArea>
            ) : (
              <SummaryArea
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <HintText
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  悬停章节标题查看摘要信息
                  <br />
                  <span style={{ color: '#FF6B35', fontWeight: 'bold' }}>
                    让我们一起重回那个夏天吧！
                  </span>
                </HintText>
              </SummaryArea>
            )}
          </AnimatePresence>
        </RightPage>
      </SummerBook>

      <BackButton
        onClick={handleBack}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        🏠 返回首页
      </BackButton>

      <AudioPlayer />
    </Container>
  )
}

export default ContentsPage 