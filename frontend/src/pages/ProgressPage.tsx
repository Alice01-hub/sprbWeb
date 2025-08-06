import React from 'react';
import styled from 'styled-components';

const ProgressContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-family: 'Arial', sans-serif;
  padding: 20px;
`;

const Content = styled.div`
  text-align: center;
  max-width: 600px;
  background: rgba(255, 255, 255, 0.1);
  padding: 40px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #ffffff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 30px;
  color: #f0f0f0;
  line-height: 1.6;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 25px;
  padding: 3px;
  margin: 20px 0;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ProgressBar = styled.div<{ progress: number }>`
  height: 30px;
  background: linear-gradient(90deg, #4CAF50, #45a049);
  border-radius: 25px;
  width: ${props => props.progress}%;
  transition: width 1s ease-in-out;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    animation: shimmer 2s infinite;
  }
  
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;

const ProgressText = styled.div`
  font-size: 1.1rem;
  margin-top: 15px;
  color: #ffffff;
  font-weight: bold;
`;

const StatusText = styled.p`
  font-size: 1rem;
  margin-top: 20px;
  color: #e0e0e0;
  line-height: 1.5;
`;

const ProgressPage: React.FC = () => {
  const progress = 50; // 当前开发进度50%

  return (
    <ProgressContainer>
      <Content>
        <Title>SPRB 网站开发进度</Title>
        <Subtitle>
          感谢您的关注！我们正在努力开发SPRB网站，为您提供更好的服务体验。
        </Subtitle>
        
        <ProgressBarContainer>
          <ProgressBar progress={progress} />
        </ProgressBarContainer>
        
        <ProgressText>{progress}% 完成</ProgressText>
        
        <StatusText>
          目前我们正在开发核心功能模块，包括用户界面优化、后端服务集成等。
          <br />
          预计将在不久的将来完成全部开发工作，敬请期待！
        </StatusText>
      </Content>
    </ProgressContainer>
  );
};

export default ProgressPage; 