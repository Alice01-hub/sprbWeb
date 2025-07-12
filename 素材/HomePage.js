import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';


const sparkle = keyframes`
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
`;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 30%, #16213e 60%, #0f3460 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const StarsContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const Star = styled.div`
  position: absolute;
  background: white;
  border-radius: 50%;
  animation: ${sparkle} ${props => props.duration}s infinite;
  
  &:nth-child(odd) {
    animation-delay: ${props => props.delay}s;
  }
`;

const DiaryBook = styled(motion.div)`
  position: relative;
  width: 400px;
  height: 500px;
  perspective: 1000px;
  cursor: pointer;
`;

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
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 120px;
    height: 120px;
    background-image: url('/graphs/日记封面图-水瓶座.jpg');
    background-size: cover;
    background-position: center;
    border-radius: 15px;
    box-shadow: 
      0 0 20px rgba(255, 215, 0, 0.3),
      inset 0 2px 10px rgba(255, 255, 255, 0.2);
    border: 2px solid #FFD700;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 120px;
    height: 120px;
    background: linear-gradient(45deg, 
      transparent 0%, 
      rgba(255, 215, 0, 0.2) 50%, 
      transparent 100%
    );
    border-radius: 15px;
    z-index: 2;
  }
`;

const BookPages = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: #f8f8f8;
  border-radius: 0 15px 15px 0;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.3),
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
    background: #ff69b4;
  }
`;

const Lock = styled(motion.div)`
  position: absolute;
  top: 50%;
  right: -15px;
  transform: translateY(-50%);
  width: 30px;
  height: 40px;
  background: linear-gradient(145deg, #C0C0C0, #808080);
  border-radius: 8px 8px 15px 15px;
  box-shadow: 
    0 4px 8px rgba(0, 0, 0, 0.3),
    inset 0 1px 3px rgba(255, 255, 255, 0.3);
  cursor: pointer;
  z-index: 10;
  
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
  color: #ff4757;
  margin-top: 15px;
  font-size: 14px;
  font-weight: bold;
`;

const Hint = styled.div`
  color: #666;
  font-size: 14px;
  margin-bottom: 10px;
`;

function HomePage({ onUnlock, onPasswordSet }) {
  const navigate = useNavigate();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isOpening, setIsOpening] = useState(false);
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // 生成随机星星
    const generateStars = () => {
      const newStars = [];
      for (let i = 0; i < 100; i++) {
        newStars.push({
          id: i,
          left: Math.random() * 100,
          top: Math.random() * 100,
          size: Math.random() * 3 + 1,
          duration: Math.random() * 3 + 2,
          delay: Math.random() * 2
        });
      }
      setStars(newStars);
    };

    generateStars();
  }, []);

  const handleLockClick = () => {
    setShowPasswordModal(true);
    setError('');
    setPassword('');
  };

  const handlePasswordSubmit = () => {
    if (password.toLowerCase() === 'lxl') {
      setShowPasswordModal(false);
      setIsOpening(true);
      onPasswordSet(password);
      
      // 延迟跳转，让动画播放完成，并添加更自然的过渡
      setTimeout(() => {
        onUnlock();
        navigate('/table-of-contents', { 
          state: { fromDiary: true } // 传递状态以便目录页知道是从日记翻开的
        });
      }, 1800); // 减少延迟时间让过渡更流畅
    } else {
      setError('除了我，只有一个人知道密码，其他人不准偷看哦！');
      setPassword(''); // 清空密码框
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
      <StarsContainer>
        {stars.map(star => (
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
        />
        <Lock
          onClick={handleLockClick}
          whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(255, 215, 0, 0.6)" }}
          whileTap={{ scale: 0.95 }}
        />
      </DiaryBook>

      <AnimatePresence>
        {showPasswordModal && (
          <PasswordModal
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <h2 style={{ color: '#333', marginBottom: '20px' }}>🔐 请输入密码</h2>
            <Hint>名字拼音首字母小写</Hint>
            <PasswordInput
              type="password"
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

export default HomePage; 