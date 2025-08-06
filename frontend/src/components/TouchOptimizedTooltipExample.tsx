import React from 'react'
import styled from 'styled-components'
import TouchOptimizedTooltip, { TooltipContent } from './TouchOptimizedTooltip'

const ExampleContainer = styled.div`
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
`

const ExampleButton = styled.button`
  padding: 12px 24px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  
  &:hover {
    background: #0056b3;
  }
`

const ExampleIcon = styled.div`
  width: 40px;
  height: 40px;
  background: #28a745;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  cursor: pointer;
`

const ExampleSection = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
`

/**
 * 演示TouchOptimizedTooltip组件的使用方法
 * 
 * 这个组件展示了如何在不同场景下使用TouchOptimizedTooltip：
 * 1. 简单文本tooltip
 * 2. 带图片的tooltip内容
 * 3. 不同位置的tooltip
 * 4. 自定义内容的tooltip
 */
const TouchOptimizedTooltipExample: React.FC = () => {
  return (
    <ExampleContainer>
      <h2>TouchOptimizedTooltip 使用示例</h2>
      <p>在桌面端悬停查看tooltip，在移动端点击查看</p>
      
      <ExampleSection>
        {/* 简单文本tooltip */}
        <TouchOptimizedTooltip content="这是一个简单的tooltip文本">
          <ExampleButton>简单Tooltip</ExampleButton>
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
          <ExampleIcon>🏪</ExampleIcon>
        </TouchOptimizedTooltip>

        {/* 不同位置的tooltip */}
        <TouchOptimizedTooltip content="显示在右侧" position="right">
          <ExampleButton>右侧Tooltip</ExampleButton>
        </TouchOptimizedTooltip>

        <TouchOptimizedTooltip content="显示在左侧" position="left">
          <ExampleButton>左侧Tooltip</ExampleButton>
        </TouchOptimizedTooltip>

        <TouchOptimizedTooltip content="显示在下方" position="bottom">
          <ExampleButton>下方Tooltip</ExampleButton>
        </TouchOptimizedTooltip>
      </ExampleSection>

      <ExampleSection>
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
          <ExampleIcon>⚙️</ExampleIcon>
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
          <ExampleIcon>🗺️</ExampleIcon>
        </TouchOptimizedTooltip>
      </ExampleSection>

      <div style={{ marginTop: '20px', padding: '16px', background: '#f8f9fa', borderRadius: '8px', maxWidth: '600px' }}>
        <h4>使用说明：</h4>
        <ul style={{ textAlign: 'left', fontSize: '14px', lineHeight: '1.6' }}>
          <li><strong>桌面端：</strong>鼠标悬停显示tooltip，移开隐藏</li>
          <li><strong>移动端：</strong>点击显示tooltip，再次点击或点击外部区域隐藏</li>
          <li><strong>位置：</strong>支持 top、bottom、left、right 四个位置</li>
          <li><strong>内容：</strong>支持文本、HTML、React组件等任意内容</li>
          <li><strong>响应式：</strong>在移动端自动调整位置避免溢出屏幕</li>
        </ul>
      </div>
    </ExampleContainer>
  )
}

export default TouchOptimizedTooltipExample