import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 50%, #2c3e50 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const BookContainer = styled.div`
  width: 900px;
  height: 600px;
  background: #f8f8f8;
  border-radius: 15px;
  box-shadow: 
    0 30px 60px rgba(0, 0, 0, 0.4),
    inset 0 0 20px rgba(0, 0, 0, 0.1);
  display: flex;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 4px;
    background: linear-gradient(to bottom, #ddd, #999, #ddd);
    transform: translateX(-50%);
    z-index: 10;
  }
`;

const LeftPage = styled.div`
  width: 40%;
  padding: 40px;
  background: #fff;
  border-radius: 15px 0 0 15px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: #ff69b4;
  }
`;

const RightPage = styled.div`
  width: 60%;
  padding: 40px;
  background: #fff;
  border-radius: 0 15px 15px 0;
  position: relative;
`;

const PageTitle = styled.h1`
  color: #2c3e50;
  font-size: 32px;
  text-align: center;
  margin-bottom: 40px;
  font-family: '华文行楷', 'STXingkai', cursive;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

const ChapterList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const ChapterItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    background: ${props => props.isLocked ? 'transparent' : 'rgba(255, 105, 180, 0.1)'};
    transform: ${props => props.isLocked ? 'none' : 'translateX(10px)'};
  }
`;

const ChapterIcon = styled.div`
  font-size: 24px;
  color: ${props => props.isLocked ? '#ccc' : '#ff69b4'};
  transition: all 0.3s ease;
`;

const ChapterTitle = styled.h3`
  color: ${props => props.isLocked ? '#ccc' : '#2c3e50'};
  font-size: 20px;
  margin: 0;
  flex: 1;
  transition: all 0.3s ease;
`;

const SummaryArea = styled(motion.div)`
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #666;
`;

const SummaryImage = styled.img`
  width: 200px;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  margin-top: ${props => props.isMonologue ? '-40px' : '0'};
`;

const SummaryText = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #555;
  max-width: 280px;
  font-style: italic;
`;

const PasswordModal = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.95);
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  text-align: center;
  z-index: 1000;
  backdrop-filter: blur(10px);
`;

const PasswordInput = styled.input`
  width: 100%;
  padding: 15px;
  font-size: 18px;
  border: 2px solid #ddd;
  border-radius: 10px;
  margin: 20px 0;
  text-align: center;
  outline: none;
  font-family: inherit;
  
  &:focus {
    border-color: #ff69b4;
    box-shadow: 0 0 10px rgba(255, 105, 180, 0.3);
  }
`;

const Button = styled.button`
  background: linear-gradient(45deg, #ff69b4, #ff1493);
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
  font-family: inherit;
  margin: 0 10px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 105, 180, 0.4);
  }
`;

const ErrorMessage = styled(motion.div)`
  color: #e74c3c;
  font-size: 14px;
  margin-top: 10px;
  font-weight: bold;
`;

const Hint = styled.div`
  color: #666;
  font-size: 16px;
  margin-bottom: 25px;
  font-weight: bold;
`;

function TableOfContents({ unlockedChapters, onUnlock, onPasswordSet }) {
  const navigate = useNavigate();
  const [hoveredChapter, setHoveredChapter] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [tooltip, setTooltip] = useState({ show: false, text: '', chapter: null });
  const [currentPasswordHint, setCurrentPasswordHint] = useState('');
  const [requiredPassword, setRequiredPassword] = useState('');
  const [currentChapterId, setCurrentChapterId] = useState('');
  const [errorCount, setErrorCount] = useState(0);

  const chapters = [
    {
      id: 'memory',
      title: '回忆篇',
      icon: '📖',
      isLocked: false,
      summary: {
        image: '/graphs/huiyi0.jpg',
        text: '回看多年前的思维导图，突然想起了一些往事。'
      },
      requiredPassword: null,
      hint: null
    },
    {
      id: 'monologue',
      title: '独白篇',
      icon: unlockedChapters.monologue ? '📖' : '🔒',
      isLocked: !unlockedChapters.monologue,
      summary: {
        image: '/graphs/dubai0.jpg',
        text: '我喜欢妳很久了，晓岚'
      },
      requiredPassword: 'vae12',
      hint: '请输入密码解锁独白篇'
    },
    {
      id: 'promise',
      title: '承诺篇',
      icon: unlockedChapters.promise ? '📖' : '🔒',
      isLocked: !unlockedChapters.promise,
      summary: {
        image: '/graphs/chengnuo0.jpg',
        text: '有一封属于妳的情书💌，请查收！💖'
      },
      requiredPassword: '520131',
      hint: '先完成独白篇'
    }
  ];

  const handleChapterClick = (chapter) => {
    if (chapter.isLocked && chapter.requiredPassword) {
      setCurrentPasswordHint(chapter.hint);
      setRequiredPassword(chapter.requiredPassword);
      setCurrentChapterId(chapter.id);
      setShowPasswordModal(true);
      setPassword('');
      setError('');
      setErrorCount(0);
    } else {
      navigate(`/${chapter.id}`);
    }
  };

  const handleChapterHover = (chapter) => {
    if (chapter.isLocked) {
      setTooltip({
        show: true,
        text: chapter.hint,
        chapter: chapter.id
      });
    } else {
      setHoveredChapter(chapter);
      setTooltip({ show: false, text: '', chapter: null });
    }
  };

  const handleChapterLeave = () => {
    setHoveredChapter(null);
    setTooltip({ show: false, text: '', chapter: null });
  };

  const handlePasswordSubmit = () => {
    if (password === requiredPassword) {
      setShowPasswordModal(false);
      onUnlock(currentChapterId);
      setPassword('');
      setError('');
    } else {
      setErrorCount(prev => prev + 1);
      if (errorCount >= 2) {
        setError(`输错3次了，密码是：${requiredPassword}`);
        setPassword(requiredPassword);
      } else {
        setError(`密码错误！${currentPasswordHint}`);
        setPassword('');
      }
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handlePasswordSubmit();
    }
  };

  return (
    <Container>
      <BookContainer>
        <LeftPage>
          <PageTitle>目录</PageTitle>
          <ChapterList>
            {chapters.map((chapter) => (
              <ChapterItem
                key={chapter.id}
                onClick={() => handleChapterClick(chapter)}
                onMouseEnter={() => handleChapterHover(chapter)}
                onMouseLeave={handleChapterLeave}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ position: 'relative' }}
                isLocked={chapter.isLocked}
              >
                <ChapterIcon isLocked={chapter.isLocked}>
                  {chapter.icon}
                </ChapterIcon>
                <ChapterTitle isLocked={chapter.isLocked}>
                  {chapter.title}
                </ChapterTitle>
              </ChapterItem>
            ))}
          </ChapterList>
        </LeftPage>

        <RightPage>
          <AnimatePresence mode="wait">
            {tooltip.show ? (
              <SummaryArea
                key="tooltip"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>🔒</div>
                <SummaryText style={{ color: '#ff6b6b', fontSize: '18px', fontWeight: 'bold' }}>
                  {tooltip.text}
                </SummaryText>
              </SummaryArea>
            ) : hoveredChapter ? (
              <SummaryArea
                key={hoveredChapter.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <SummaryImage 
                  src={hoveredChapter.summary.image} 
                  alt={hoveredChapter.title}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                  isMonologue={hoveredChapter.id === 'monologue'}
                />
                <SummaryText>{hoveredChapter.summary.text}</SummaryText>
              </SummaryArea>
            ) : (
              <SummaryArea
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>📚</div>
                <p style={{ color: '#999', fontSize: '18px' }}>
                  将鼠标悬停在左侧章节上查看详情
                </p>
              </SummaryArea>
            )}
          </AnimatePresence>
        </RightPage>
      </BookContainer>

      <AnimatePresence>
        {showPasswordModal && (
          <PasswordModal
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <h2 style={{ color: '#333', marginBottom: '25px' }}>🔐 请输入密码</h2>
            <Hint>{currentPasswordHint}</Hint>
            <PasswordInput
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="请输入密码..."
              autoFocus
            />
            <div>
              <Button onClick={handlePasswordSubmit}>确认</Button>
              <Button 
                onClick={() => setShowPasswordModal(false)}
                style={{ background: 'linear-gradient(45deg, #666, #999)' }}
              >
                取消
              </Button>
            </div>
            <AnimatePresence>
              {error && (
                <ErrorMessage
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {error}
                </ErrorMessage>
              )}
            </AnimatePresence>
          </PasswordModal>
        )}
      </AnimatePresence>
    </Container>
  );
}

export default TableOfContents; 