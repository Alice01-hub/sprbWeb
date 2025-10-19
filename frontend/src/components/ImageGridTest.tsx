import React, { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import ImageGrid from './ImageGrid'

// 测试容器
const TestContainer = styled.div`
  padding: 20px;
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  min-height: 100vh;
  color: white;
`

const TestTitle = styled.h1`
  text-align: center;
  margin-bottom: 40px;
  color: #87CEEB;
  font-size: 32px;
`

const TestSection = styled.div`
  margin-bottom: 60px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  border: 1px solid rgba(135, 206, 235, 0.2);
`

const SectionTitle = styled.h2`
  color: #98E4D6;
  margin-bottom: 20px;
  font-size: 24px;
`

const TestButton = styled(motion.button)`
  background: linear-gradient(45deg, #533483, #7209b7);
  border: none;
  border-radius: 25px;
  padding: 12px 24px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(83, 52, 131, 0.4);
  }
`

// 测试用的图片URL数组
const testImages = [
  'https://oss.sprb.love/webps/七影蝶-3.webp',
  'https://oss.sprb.love/webps/七影蝶-4.webp',
  'https://oss.sprb.love/webps/sprb封面图.webp',
  'https://oss.sprb.love/webps/神域摘要图.webp',
  'https://oss.sprb.love/webps/首页图-未选中.png',
  'https://oss.sprb.love/webps/首页图-选中.png',
  'https://oss.sprb.love/webps/岛上cg.png',
  'https://oss.sprb.love/webps/交通篇摘要图.png',
  'https://oss.sprb.love/webps/打卡点合集说明.txt',
  'https://oss.sprb.love/webps/需要准备的打卡图/1女木岛-山道.jpg',
  'https://oss.sprb.love/webps/需要准备的打卡图/2女木岛-秘密基地山路.jpg',
  'https://oss.sprb.love/webps/需要准备的打卡图/3女木岛-采石场入口.jpg'
]

const ImageGridTest: React.FC = () => {
  const [currentTest, setCurrentTest] = useState<string>('single')
  const [currentImages, setCurrentImages] = useState<string[]>([])

  const runTest = (testType: string) => {
    setCurrentTest(testType)
    
    switch (testType) {
      case 'single':
        setCurrentImages([testImages[0]])
        break
      case 'two':
        setCurrentImages(testImages.slice(0, 2))
        break
      case 'three':
        setCurrentImages(testImages.slice(0, 3))
        break
      case 'four':
        setCurrentImages(testImages.slice(0, 4))
        break
      case 'six':
        setCurrentImages(testImages.slice(0, 6))
        break
      case 'nine':
        setCurrentImages(testImages.slice(0, 9))
        break
      case 'many':
        setCurrentImages(testImages) // 12张图片，会随机选择9张
        break
      default:
        setCurrentImages([])
    }
  }

  // 将图片数组转换为逗号分隔的字符串（模拟数据库存储格式）
  const getImageUrlString = (images: string[]): string => {
    return images.join(',')
  }

  const getTestDescription = (testType: string) => {
    switch (testType) {
      case 'single':
        return '单张图片展示（使用单张图片容器）'
      case 'two':
        return '两张图片展示（九宫格布局）'
      case 'three':
        return '三张图片展示（九宫格布局）'
      case 'four':
        return '四张图片展示（九宫格布局）'
      case 'six':
        return '六张图片展示（九宫格布局）'
      case 'nine':
        return '九张图片展示（九宫格布局）'
      case 'many':
        return '多张图片展示（12张图片，随机选择9张）'
      default:
        return ''
    }
  }

  return (
    <TestContainer>
      <TestTitle>🖼️ 图片展示组件测试</TestTitle>
      
      <TestSection>
        <SectionTitle>测试控制</SectionTitle>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          <TestButton onClick={() => runTest('single')}>单张图片</TestButton>
          <TestButton onClick={() => runTest('two')}>两张图片</TestButton>
          <TestButton onClick={() => runTest('three')}>三张图片</TestButton>
          <TestButton onClick={() => runTest('four')}>四张图片</TestButton>
          <TestButton onClick={() => runTest('six')}>六张图片</TestButton>
          <TestButton onClick={() => runTest('nine')}>九张图片</TestButton>
          <TestButton onClick={() => runTest('many')}>多张图片</TestButton>
        </div>
      </TestSection>

      <TestSection>
        <SectionTitle>当前测试：{getTestDescription(currentTest)}</SectionTitle>
        <p style={{ color: '#87CEEB', marginBottom: '10px' }}>
          图片数量：{currentImages.length} 张
          {currentImages.length > 9 && '（随机选择9张展示）'}
        </p>
        <p style={{ color: '#98E4D6', marginBottom: '20px', fontSize: '12px', wordBreak: 'break-all' }}>
          数据库存储格式：{getImageUrlString(currentImages)}
        </p>
        
        {currentImages.length > 0 && (
          <ImageGrid 
            images={currentImages}
            maxImages={9}
            onImageClick={(imageUrl, index) => {
              console.log('点击了图片:', imageUrl, '索引:', index)
            }}
          />
        )}
      </TestSection>

      <TestSection>
        <SectionTitle>功能说明</SectionTitle>
        <div style={{ lineHeight: '1.8', color: '#E0F7FA' }}>
          <p>✅ <strong>智能展示</strong>：单张图片按原图尺寸展示，多张图片使用九宫格</p>
          <p>✅ <strong>九宫格布局</strong>：3×3网格展示多张图片</p>
          <p>✅ <strong>随机选择</strong>：超过9张图片时随机选择9张展示</p>
          <p>✅ <strong>点击放大</strong>：点击任意图片可以全屏查看</p>
          <p>✅ <strong>灯笼悬停</strong>：悬停图片时灯笼鼠标亮灯</p>
          <p>✅ <strong>错误处理</strong>：图片加载失败时显示错误提示</p>
          <p>✅ <strong>响应式设计</strong>：适配不同屏幕尺寸</p>
          <p>✅ <strong>视觉效果</strong>：悬停效果、点击反馈、平滑动画</p>
          <p>✅ <strong>统一风格</strong>：与公告栏保持一致的视觉风格</p>
        </div>
      </TestSection>
    </TestContainer>
  )
}

export default ImageGridTest
