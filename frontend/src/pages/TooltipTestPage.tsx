import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import TouchOptimizedTooltip, { TooltipContent } from '../components/TouchOptimizedTooltip'

const Container = styled.div`
  min-height: 100vh;
  padding: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`

const Title = styled.h1`
  color: white;
  font-size: 2.5rem;
  margin-bottom: 20px;
  text-align: center;
`

const TestSection = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  padding: 30px;
  margin: 20px 0;
  max-width: 800px;
  width: 100%;
`

const TestButton = styled.button`
  padding: 12px 24px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  margin: 10px;
  
  &:hover {
    background: #0056b3;
  }
`

const TestIcon = styled.div`
  width: 50px;
  height: 50px;
  background: #28a745;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  cursor: pointer;
  margin: 10px;
`

const Instructions = styled.div`
  background: #f8f9fa;
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0;
  border-left: 4px solid #007bff;
`

const TooltipTestPage: React.FC = () => {
  return (
    <Container>
      <Title>TouchOptimizedTooltip 测试页面</Title>
      
      <TestSection>
        <h2>基本功能测试</h2>
        <Instructions>
          <h3>使用说明：</h3>
          <ul>
            <li><strong>桌面端：</strong>鼠标悬停显示tooltip，移开隐藏</li>
            <li><strong>移动端：</strong>点击显示tooltip，再次点击或点击外部区域隐藏</li>
            <li><strong>位置：</strong>支持 top、bottom、left、right 四个位置</li>
          </ul>
        </Instructions>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
          {/* 简单文本tooltip */}
          <TouchOptimizedTooltip content="这是一个简单的tooltip文本">
            <TestButton>简单Tooltip</TestButton>
          </TouchOptimizedTooltip>

          {/* 带图片的tooltip */}
          <TouchOptimizedTooltip 
            content={
              <TooltipContent
                image="images/webps/直岛/直岛-小卖部.webp"
                title="直岛小卖部"
                description="这里是直岛的小卖部，可以购买各种纪念品和日用品。"
              />
            }
          >
            <TestIcon>🏪</TestIcon>
          </TouchOptimizedTooltip>

          {/* 不同位置的tooltip */}
          <TouchOptimizedTooltip content="显示在右侧" position="right">
            <TestButton>右侧Tooltip</TestButton>
          </TouchOptimizedTooltip>

          <TouchOptimizedTooltip content="显示在左侧" position="left">
            <TestButton>左侧Tooltip</TestButton>
          </TouchOptimizedTooltip>

          <TouchOptimizedTooltip content="显示在下方" position="bottom">
            <TestButton>下方Tooltip</TestButton>
          </TouchOptimizedTooltip>
        </div>
      </TestSection>

      <TestSection>
        <h2>复杂内容测试</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
          {/* 自定义内容的tooltip */}
          <TouchOptimizedTooltip 
            content={
              <div>
                <h4 style={{ margin: '0 0 8px 0', color: '#333' }}>自定义内容</h4>
                <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>
                  你可以在tooltip中放置任何React内容
                </p>
                <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12px', color: '#888' }}>
                  <li>支持HTML标签</li>
                  <li>支持样式定制</li>
                  <li>支持复杂布局</li>
                </ul>
              </div>
            }
          >
            <TestIcon>⚙️</TestIcon>
          </TouchOptimizedTooltip>

          {/* 地图图标样式的tooltip */}
          <TouchOptimizedTooltip 
            content={
              <TooltipContent
                image="images/webps/男木岛/男木岛-灯塔.webp"
                title="男木岛灯塔"
                description="这是男木岛的标志性灯塔，是岛上最重要的地标之一。"
              />
            }
            position="top"
          >
            <TestIcon>🗺️</TestIcon>
          </TouchOptimizedTooltip>
        </div>
      </TestSection>

      <TestSection>
        <h2>响应式测试</h2>
        <p>在不同设备上测试tooltip的响应式行为：</p>
        <ul>
          <li>桌面端：鼠标悬停交互</li>
          <li>移动端：点击交互</li>
          <li>自动位置调整避免溢出</li>
          <li>触摸优化的事件处理</li>
        </ul>
      </TestSection>
    </Container>
  )
}

export default TooltipTestPage 