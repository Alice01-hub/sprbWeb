import React, { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import MemoryCard from '../components/MemoryCard'
import { getTestMemories } from '../services/memoryService'
import { ButterflyMemory } from '../components/MemoryButterfly'

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
  margin-bottom: 40px;
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

const MemoryButton = styled(motion.button)`
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

const MemoryList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
`

const MemoryItem = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 20px;
  border: 1px solid rgba(135, 206, 235, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(135, 206, 235, 0.5);
    transform: translateY(-5px);
  }
`

const MemoryName = styled.h3`
  color: #87CEEB;
  margin-bottom: 10px;
  font-size: 18px;
`

const MemoryContent = styled.p`
  color: #E0F7FA;
  margin-bottom: 15px;
  font-size: 14px;
  line-height: 1.5;
`

const ImageCount = styled.div`
  color: #98E4D6;
  font-size: 12px;
  font-weight: 600;
  background: rgba(152, 228, 214, 0.2);
  padding: 4px 8px;
  border-radius: 10px;
  display: inline-block;
`

const MemoryTestPage: React.FC = () => {
  const [selectedMemory, setSelectedMemory] = useState<ButterflyMemory | null>(null)
  const testMemories = getTestMemories()

  const getImageCount = (memory: ButterflyMemory): number => {
    if (!memory.image_url || !memory.image_url.trim()) {
      return 0
    }
    
    // 按逗号分隔图片URL，并过滤空字符串
    const images = memory.image_url
      .split(',')
      .map(url => url.trim())
      .filter(url => url.length > 0)
    
    return images.length
  }

  const getImageCountText = (memory: ButterflyMemory): string => {
    const count = getImageCount(memory)
    if (count === 0) return '无图片'
    if (count === 1) return '1张图片'
    if (count <= 9) return `${count}张图片`
    return `${count}张图片（随机选择9张）`
  }

  return (
    <TestContainer>
      <TestTitle>🦋 七影蝶记忆卡片测试</TestTitle>
      
      <TestSection>
        <SectionTitle>测试说明</SectionTitle>
        <div style={{ lineHeight: '1.8', color: '#E0F7FA' }}>
          <p>✅ <strong>单张图片</strong>：使用原有的单张图片展示方式</p>
          <p>✅ <strong>多张图片</strong>：使用九宫格布局，最多显示9张图片</p>
          <p>✅ <strong>随机选择</strong>：当图片超过9张时，随机选择9张展示</p>
          <p>✅ <strong>向后兼容</strong>：同时支持image_url和images字段</p>
          <p>✅ <strong>点击测试</strong>：点击下方的记忆卡片查看图片展示效果</p>
        </div>
      </TestSection>

      <TestSection>
        <SectionTitle>测试数据</SectionTitle>
        <MemoryList>
          {testMemories.map((memory) => (
            <MemoryItem
              key={memory.id}
              onClick={() => setSelectedMemory(memory)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <MemoryName>{memory.user_name}</MemoryName>
              <MemoryContent>{memory.content}</MemoryContent>
              <ImageCount>{getImageCountText(memory)}</ImageCount>
            </MemoryItem>
          ))}
        </MemoryList>
      </TestSection>

      {/* 记忆卡片 */}
      {selectedMemory && (
        <MemoryCard
          memory={selectedMemory}
          onClose={() => setSelectedMemory(null)}
        />
      )}
    </TestContainer>
  )
}

export default MemoryTestPage
