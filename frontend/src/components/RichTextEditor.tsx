import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

// 暂时使用简单的文本编辑器，后续可以替换为更复杂的富文本编辑器
const EditorContainer = styled.div`
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  background: white;
  
  &:focus-within {
    border-color: #FF6B35;
  }
`

const Toolbar = styled.div`
  background: #f5f5f5;
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`

const ToolButton = styled.button<{ active?: boolean }>`
  background: ${props => props.active ? '#FF6B35' : 'white'};
  color: ${props => props.active ? 'white' : '#333'};
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.active ? '#FFB347' : '#f0f0f0'};
  }
`

const TextArea = styled.textarea`
  width: 100%;
  min-height: 200px;
  border: none;
  padding: 15px;
  font-family: inherit;
  font-size: 14px;
  line-height: 1.6;
  resize: vertical;
  outline: none;
  
  &::placeholder {
    color: #999;
  }
`

const PreviewContainer = styled.div`
  padding: 15px;
  min-height: 200px;
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  
  h1, h2, h3 {
    color: #FF6B35;
    margin-top: 0;
    margin-bottom: 10px;
  }
  
  ul, ol {
    margin: 10px 0;
    padding-left: 25px;
  }
  
  li {
    margin-bottom: 5px;
  }
  
  p {
    margin: 10px 0;
    line-height: 1.6;
  }
  
  strong {
    font-weight: 600;
    color: #333;
  }
`

const EditorTabs = styled.div`
  display: flex;
  border-bottom: 1px solid #e0e0e0;
`

const Tab = styled.button<{ active: boolean }>`
  background: ${props => props.active ? 'white' : '#f5f5f5'};
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-bottom: 2px solid ${props => props.active ? '#FF6B35' : 'transparent'};
  font-weight: ${props => props.active ? '600' : '400'};
  color: ${props => props.active ? '#FF6B35' : '#666'};
  
  &:hover {
    background: ${props => props.active ? 'white' : '#f0f0f0'};
  }
`

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  height?: string
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = "请输入内容...",
  height = "200px"
}) => {
  const [mode, setMode] = useState<'edit' | 'preview'>('edit')
  const [content, setContent] = useState(value)

  useEffect(() => {
    setContent(value)
  }, [value])

  const handleContentChange = (newContent: string) => {
    setContent(newContent)
    onChange(newContent)
  }

  const formatMarkdown = (text: string) => {
    // 简单的Markdown渲染
    return text
      .replace(/### (.*)/g, '<h3>$1</h3>')
      .replace(/## (.*)/g, '<h2>$1</h2>')
      .replace(/# (.*)/g, '<h1>$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^\* (.*)$/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
      .replace(/^\d+\. (.*)$/gm, '<li>$1</li>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/^/, '<p>')
      .replace(/$/, '</p>')
  }

  const insertFormat = (format: string) => {
    const textArea = document.querySelector('textarea') as HTMLTextAreaElement
    if (!textArea) return

    const start = textArea.selectionStart
    const end = textArea.selectionEnd
    const selectedText = content.substring(start, end)
    
    let newText = content
    
    switch (format) {
      case 'bold':
        newText = content.substring(0, start) + `**${selectedText}**` + content.substring(end)
        break
      case 'italic':
        newText = content.substring(0, start) + `*${selectedText}*` + content.substring(end)
        break
      case 'heading':
        newText = content.substring(0, start) + `## ${selectedText}` + content.substring(end)
        break
      case 'list':
        newText = content.substring(0, start) + `* ${selectedText}` + content.substring(end)
        break
    }
    
    handleContentChange(newText)
  }

  return (
    <EditorContainer>
      <EditorTabs>
        <Tab active={mode === 'edit'} onClick={() => setMode('edit')}>
          编辑
        </Tab>
        <Tab active={mode === 'preview'} onClick={() => setMode('preview')}>
          预览
        </Tab>
      </EditorTabs>
      
      {mode === 'edit' ? (
        <>
          <Toolbar>
            <ToolButton onClick={() => insertFormat('bold')}>
              <strong>B</strong>
            </ToolButton>
            <ToolButton onClick={() => insertFormat('italic')}>
              <em>I</em>
            </ToolButton>
            <ToolButton onClick={() => insertFormat('heading')}>
              H2
            </ToolButton>
            <ToolButton onClick={() => insertFormat('list')}>
              • 列表
            </ToolButton>
          </Toolbar>
          <TextArea
            value={content}
            onChange={(e) => handleContentChange(e.target.value)}
            placeholder={placeholder}
            style={{ minHeight: height }}
          />
        </>
      ) : (
        <PreviewContainer
          style={{ minHeight: height }}
          dangerouslySetInnerHTML={{ __html: formatMarkdown(content) }}
        />
      )}
    </EditorContainer>
  )
}

export default RichTextEditor 