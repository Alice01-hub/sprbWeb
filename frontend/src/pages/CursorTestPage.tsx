import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useDevice } from '../contexts/DeviceContext'

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

const DeviceInfo = styled.div`
  background: #f8f9fa;
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0;
  border-left: 4px solid #007bff;
`

const CursorTestPage: React.FC = () => {
  const { isMobile, isDesktop, deviceInfo } = useDevice()

  return (
    <Container>
      <Title>七影蝶鼠标测试页面</Title>
      
      <TestSection>
        <h2>设备信息</h2>
        <DeviceInfo>
          <h3>当前设备状态：</h3>
          <ul>
            <li><strong>设备类型：</strong> {isMobile ? '移动端' : isDesktop ? '桌面端' : '平板'}</li>
            <li><strong>屏幕尺寸：</strong> {deviceInfo.screenWidth} x {deviceInfo.screenHeight}</li>
            <li><strong>触摸支持：</strong> {deviceInfo.hasTouch ? '是' : '否'}</li>
            <li><strong>像素比：</strong> {deviceInfo.pixelRatio}</li>
            <li><strong>方向：</strong> {deviceInfo.orientation}</li>
          </ul>
        </DeviceInfo>
      </TestSection>

      <TestSection>
        <h2>七影蝶鼠标行为测试</h2>
        <DeviceInfo>
          <h3>预期行为：</h3>
          <ul>
            <li><strong>桌面端：</strong>显示七影蝶鼠标，跟随鼠标移动，在可点击元素上扇动更快</li>
            <li><strong>移动端：</strong>完全隐藏七影蝶鼠标，不显示任何自定义光标</li>
            <li><strong>平板：</strong>根据设备类型自动判断是否显示</li>
          </ul>
        </DeviceInfo>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
          <TestButton>可点击按钮 1</TestButton>
          <TestButton>可点击按钮 2</TestButton>
          <TestButton>可点击按钮 3</TestButton>
        </div>
        
        <p style={{ marginTop: '20px', textAlign: 'center', color: '#666' }}>
          在桌面端，您应该能看到七影蝶鼠标跟随鼠标移动，在按钮上悬停时扇动更快。
          <br />
          在移动端，您不应该看到任何自定义鼠标光标。
        </p>
      </TestSection>

      <TestSection>
        <h2>测试说明</h2>
        <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
          <h3>桌面端测试：</h3>
          <ul>
            <li>移动鼠标，观察七影蝶是否跟随</li>
            <li>将鼠标悬停在按钮上，观察扇动速度变化</li>
            <li>点击按钮，确认功能正常</li>
          </ul>
          
          <h3>移动端测试：</h3>
          <ul>
            <li>确认没有显示七影蝶鼠标</li>
            <li>触摸按钮，确认功能正常</li>
            <li>检查是否有任何视觉干扰</li>
          </ul>
          
          <h3>性能测试：</h3>
          <ul>
            <li>桌面端：检查鼠标移动是否流畅</li>
            <li>移动端：确认没有不必要的性能消耗</li>
          </ul>
        </div>
      </TestSection>
    </Container>
  )
}

export default CursorTestPage 