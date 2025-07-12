import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

interface TrafficCard {
  id: number
  title: string
  icon: string
  content: string
  category: string
  subcategory?: string
  order_index: number
}

interface TrafficInfoGridProps {
  cards: TrafficCard[]
  title?: string
}

const Container = styled.div`
  background: #ffffff;
  padding: 40px 20px;
  border-radius: 20px;
  margin: 20px 0;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  border: 1px solid #e0e0e0;
`

const GridTitle = styled.h2`
  text-align: center;
  font-size: 28px;
  color: #333;
  margin-bottom: 30px;
  font-weight: 700;
  position: relative;
  z-index: 1;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 25px;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`

const Card = styled(motion.div)`
  background: #ffffff;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #FF6B35, #FFB347);
  }
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
`

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  gap: 12px;
`

const CardIcon = styled.div`
  font-size: 24px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(45deg, #FF6B35, #FFB347);
  border-radius: 50%;
  color: white;
  box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
`

const CardTitle = styled.h3`
  font-size: 20px;
  color: #333;
  margin: 0;
  font-weight: 600;
  flex: 1;
`

const CardContent = styled.div`
  color: #333;
  line-height: 1.6;
  font-size: 14px;
  white-space: pre-line;
  
  ul {
    margin: 10px 0;
    padding-left: 20px;
  }
  
  li {
    margin: 5px 0;
    color: #333;
  }
  
  strong {
    color: #FF6B35;
    font-weight: 600;
  }
`

const TrafficInfoGrid: React.FC<TrafficInfoGridProps> = ({ cards, title = "交通攻略指南" }) => {
  // 格式化卡片内容，将带有 • 的行转换为列表
  const formatContent = (content: string) => {
    const lines = content.split('\n')
    let formattedContent = ''
    let inList = false
    
    for (const line of lines) {
      if (line.trim().startsWith('•')) {
        if (!inList) {
          formattedContent += '\n'
          inList = true
        }
        formattedContent += line + '\n'
      } else {
        if (inList) {
          formattedContent += '\n'
          inList = false
        }
        formattedContent += line + '\n'
      }
    }
    
    return formattedContent.trim()
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  }

  return (
    <Container>
      <GridTitle>{title}</GridTitle>
      <Grid>
        {cards.map((card, index) => (
          <Card
            key={card.id}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <CardHeader>
              <CardIcon>{card.icon}</CardIcon>
              <CardTitle>{card.title}</CardTitle>
            </CardHeader>
            <CardContent>
              {formatContent(card.content)}
            </CardContent>
          </Card>
        ))}
      </Grid>
    </Container>
  )
}

export default TrafficInfoGrid 