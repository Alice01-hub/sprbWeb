import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

export interface TrafficCard {
  id?: number
  title: string
  icon: string
  content: string
  category: string
  subcategory: string
  order_index: number
}

interface CardEditorProps {
  card?: TrafficCard
  isOpen: boolean
  onClose: () => void
  onSave: (card: TrafficCard) => void
  category: string
  subcategory: string
}

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
`

const EditorContainer = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 30px;
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`

const Title = styled.h2`
  color: #FF6B35;
  font-size: 24px;
  margin: 0;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: #FF6B35;
  }
`

const FormGroup = styled.div`
  margin-bottom: 20px;
`

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
  font-size: 14px;
`

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #FF6B35;
  }
`

const TextArea = styled.textarea`
  width: 100%;
  min-height: 200px;
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  font-family: inherit;
  resize: vertical;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #FF6B35;
  }
`

const IconPreview = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 8px;
`

const IconDisplay = styled.div`
  font-size: 24px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  border-radius: 8px;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 30px;
`

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${props => props.variant === 'primary' ? `
    background: linear-gradient(45deg, #FF6B35, #FFB347);
    color: white;
    
    &:hover {
      background: linear-gradient(45deg, #FFB347, #FF6B35);
      transform: translateY(-2px);
    }
  ` : `
    background: #f5f5f5;
    color: #666;
    
    &:hover {
      background: #e0e0e0;
    }
  `}
`

const CardEditor: React.FC<CardEditorProps> = ({ 
  card, 
  isOpen, 
  onClose, 
  onSave, 
  category, 
  subcategory 
}) => {
  const [formData, setFormData] = useState<TrafficCard>({
    title: '',
    icon: '',
    content: '',
    category: category,
    subcategory: subcategory,
    order_index: 0
  })

  useEffect(() => {
    if (card) {
      setFormData(card)
    } else {
      setFormData({
        title: '',
        icon: '',
        content: '',
        category: category,
        subcategory: subcategory,
        order_index: 0
      })
    }
  }, [card, category, subcategory])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.title.trim() && formData.content.trim()) {
      onSave(formData)
      onClose()
    }
  }

  const handleChange = (field: keyof TrafficCard, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  if (!isOpen) return null

  return (
    <Overlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <EditorContainer
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <Header>
          <Title>{card ? '编辑攻略卡片' : '添加攻略卡片'}</Title>
          <CloseButton onClick={onClose}>×</CloseButton>
        </Header>

        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>标题</Label>
            <Input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="请输入攻略卡片标题"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>图标</Label>
            <Input
              type="text"
              value={formData.icon}
              onChange={(e) => handleChange('icon', e.target.value)}
              placeholder="请输入emoji图标，如：🎯"
            />
            <IconPreview>
              <IconDisplay>{formData.icon}</IconDisplay>
              <span>预览图标</span>
            </IconPreview>
          </FormGroup>

          <FormGroup>
            <Label>内容</Label>
            <TextArea
              value={formData.content}
              onChange={(e) => handleChange('content', e.target.value)}
              placeholder="请输入攻略内容，支持换行。可以使用以下格式：&#10;&#10;标题：&#10;• 列表项1&#10;• 列表项2&#10;&#10;注意事项：&#10;• 重要提醒"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>排序</Label>
            <Input
              type="number"
              value={formData.order_index}
              onChange={(e) => handleChange('order_index', parseInt(e.target.value) || 0)}
              min="0"
              placeholder="数字越小越靠前"
            />
          </FormGroup>

          <ButtonGroup>
            <Button type="button" variant="secondary" onClick={onClose}>
              取消
            </Button>
            <Button type="submit" variant="primary">
              {card ? '更新' : '添加'}
            </Button>
          </ButtonGroup>
        </form>
      </EditorContainer>
    </Overlay>
  )
}

export default CardEditor 