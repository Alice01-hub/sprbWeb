import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import TrafficInfoGrid from '../components/TrafficInfoGrid'
import axios from 'axios'
import OSS_CONFIG from '../config/ossConfig';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    135deg, 
    #87CEEB 0%,    /* 天蓝色 */
    #98E4D6 20%,   /* 薄荷绿 */
    #F4E285 40%,   /* 浅黄色 */
    #FFB347 60%,   /* 金橙色 */
    #FF8C69 80%,   /* 珊瑚色 */
    #FFA07A 100%   /* 浅橙色 */
  );
  position: relative;
  overflow-x: hidden;
`

const Header = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`

const BackButton = styled(motion.button)`
  position: absolute;
  top: 10px;
  left: 20px;
  background: linear-gradient(45deg, #87CEEB, #98E4D6);
  border: none;
  border-radius: 30px;
  padding: 12px 20px;
  font-size: 16px;
  color: #2E8B57;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(135, 206, 235, 0.4);
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  z-index: 1000;
  
  &:hover {
    background: linear-gradient(45deg, #98E4D6, #87CEEB);
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(135, 206, 235, 0.5);
  }
`

const Title = styled.h1`
  text-align: center;
  font-size: 36px;
  color: #FF6B35;
  margin: 20px 0;
  font-family: '华文行楷', 'STXingkai', 'KaiTi', 'SimKai', cursive;
  text-shadow: 2px 2px 4px rgba(255, 107, 53, 0.3);
  
  &::before {
    content: '🚌 ';
  }
  
  &::after {
    content: ' ✈️';
  }
`

const MainNavigation = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 0;
  border-bottom: 2px solid #e0e0e0;
`

const MainNavItem = styled(motion.button)<{ active: boolean }>`
  background: ${props => props.active ? '#FF6B35' : 'transparent'};
  color: ${props => props.active ? 'white' : '#FF6B35'};
  border: none;
  padding: 15px 30px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 25px 25px 0 0;
  transition: all 0.3s ease;
  position: relative;
  margin: 0 5px;
  
  &:hover {
    background: ${props => props.active ? '#FF6B35' : 'rgba(255, 107, 53, 0.1)'};
    transform: translateY(-2px);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 2px;
    background: ${props => props.active ? '#FF6B35' : 'transparent'};
  }
`

const SubNavigation = styled.div`
  display: flex;
  justify-content: center;
  background: #f8f9fa;
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;
`

const SubNavItem = styled(motion.button)<{ active: boolean }>`
  background: ${props => props.active ? '#FFB347' : 'transparent'};
  color: ${props => props.active ? 'white' : '#666'};
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 20px;
  margin: 0 5px;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? '#FFB347' : 'rgba(255, 179, 71, 0.2)'};
  }
`

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`

const ContentSection = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 40px;
  margin-bottom: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`

const SectionTitle = styled.h2`
  color: #FF6B35;
  font-size: 28px;
  margin-bottom: 20px;
  border-bottom: 3px solid #FFB347;
  padding-bottom: 10px;
  display: inline-block;
`

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 30px;
`

const ContentCard = styled(motion.div)`
  background: #f8f9fa;
  border-radius: 15px;
  padding: 25px;
  border-left: 5px solid #FFB347;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }
`

const CardTitle = styled.h3`
  color: #FF6B35;
  font-size: 22px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
`

const CardContent = styled.div`
  color: #666;
  line-height: 1.6;
  font-size: 16px;
`

const DownloadButton = styled(motion.button)`
  background: linear-gradient(45deg, #FF6B35, #FFB347);
  color: white;
  border: none;
  border-radius: 30px;
  padding: 15px 30px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(255, 107, 53, 0.3);
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 20px auto;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 107, 53, 0.4);
  }
`

const ComingSoonBadge = styled.div`
  background: #FFB347;
  color: white;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  display: inline-block;
  margin-left: 10px;
`

const ChecklistContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 30px;
`

const ChecklistSection = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(255, 165, 0, 0.2);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 165, 0, 0.1);
`

const ChecklistSectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #FFB347;
`

const ChecklistSectionIcon = styled.div`
  font-size: 24px;
`

const ChecklistSectionTitle = styled.h2`
  font-size: 22px;
  color: #FF6B35;
  margin: 0;
  font-weight: 700;
`

const ChecklistItem = styled.div<{ checked: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 10px;
  background: ${props => props.checked ? 'rgba(255, 179, 71, 0.1)' : 'transparent'};
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 179, 71, 0.1);
  }
`

const CheckBox = styled.div<{ checked: boolean }>`
  width: 20px;
  height: 20px;
  border: 2px solid #FFB347;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: ${props => props.checked ? '#FFB347' : 'white'};
  color: white;
  font-size: 12px;
  font-weight: bold;
  transition: all 0.3s ease;
  flex-shrink: 0;
  margin-top: 2px;
  
  &:hover {
    background: ${props => props.checked ? '#FF6B35' : '#FFB347'};
    transform: scale(1.1);
  }
`

const ItemText = styled.div<{ checked: boolean }>`
  font-size: 16px;
  color: ${props => props.checked ? '#999' : '#555'};
  text-decoration: ${props => props.checked ? 'line-through' : 'none'};
  line-height: 1.5;
  transition: all 0.3s ease;
`

const ProgressBar = styled.div`
  background: rgba(255, 255, 255, 0.8);
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 30px;
  text-align: center;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 25px rgba(255, 165, 0, 0.2);
`

const ProgressText = styled.div`
  font-size: 18px;
  color: #FF6B35;
  font-weight: 600;
  margin-bottom: 10px;
`

const ProgressTrack = styled.div`
  background: #e0e0e0;
  border-radius: 10px;
  height: 20px;
  overflow: hidden;
  position: relative;
`

const ProgressFill = styled.div<{ percentage: number }>`
  background: linear-gradient(45deg, #FF6B35, #FFB347);
  height: 100%;
  width: ${props => props.percentage}%;
  transition: width 0.5s ease;
  border-radius: 10px;
`

interface TrafficCard {
  id: number
  title: string
  icon: string
  content: string
  category: string
  subcategory?: string
  order_index: number
  created_at: string
  updated_at: string
}

// 巡礼清单数据
const checklistData = [
  {
    id: 'pre-departure',
    title: '出行前准备',
    icon: '✈️',
    items: [
      '护照/签证办理',
      '机票预订',
      '住宿预订',
      '旅行保险购买',
      '日元兑换/银行卡准备',
      '手机卡/随身WiFi准备',
      '行李打包（衣物、药品、充电器等）',
      '重要文件复印/电子备份'
    ]
  },
  {
    id: 'flight-transport',
    title: '机票与交通',
    icon: '🚌',
    items: [
      '选择出发城市及航班',
      '机票购买平台比价',
      '了解行李托运规定',
      '熟悉值机与登机流程',
      '了解日本入境流程',
      '准备交通卡购买',
      '查询机场换乘信息'
    ]
  },
  {
    id: 'japan-itinerary',
    title: '日本国内行程',
    icon: '🎌',
    items: [
      '确定机场到高松的交通方式',
      '查询详细换乘流程',
      '学习购票机使用方法',
      '规划景点交通路线',
      '准备各种路线方案',
      '下载相关交通APP',
      '收藏实用网站链接'
    ]
  },
  {
    id: 'schedule-budget',
    title: '行程安排与预算',
    icon: '📅',
    items: [
      '制定每日行程计划',
      '预算分配（交通、住宿、餐饮等）',
      '预订热门景点门票',
      '安排购物时间和地点',
      '制定应急预案',
      '准备离境相关安排'
    ]
  },
  {
    id: 'useful-tools',
    title: '实用工具推荐',
    icon: '🛠️',
    items: [
      'Google Maps （路线规划）',
      'Yahoo!乘换案内 （换乘查询）',
      'Google Translate （语言翻译）',
      '日本旅游APP下载',
      '天气预报查询',
      '汇率查询工具',
      '紧急联系方式记录'
    ]
  },
  {
    id: 'pilgrimage-specific',
    title: '圣地巡礼专项',
    icon: '🌟',
    items: [
      '女木岛交通及景点信息',
      '男木岛交通及景点信息',
      '直岛交通及景点信息',
      '拍照地点标记',
      '开放时间确认',
      '门票或预约信息',
      '特殊交通工具安排'
    ]
  }
]

const TrafficPage: React.FC = () => {
  const navigate = useNavigate()
  const [activeMainTab, setActiveMainTab] = useState<'international' | 'domestic' | 'checklist'>('international')
  const [activeSubTab, setActiveSubTab] = useState<'guangzhou' | 'other'>('guangzhou')
  const [activeDomesticTab, setActiveDomesticTab] = useState<'kansai-takamatsu' | 'other'>('kansai-takamatsu')
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())
  const [isDownloading, setIsDownloading] = useState(false)
  // 交通卡片数据
  const [trafficCardsData, setTrafficCardsData] = useState<TrafficCard[]>([])
  useEffect(() => {
    fetch('/trafficdata/InDeparture/traffic_cards.json')
      .then(res => res.json())
      .then(data => setTrafficCardsData(data))
      .catch(() => setTrafficCardsData([]))
  }, [])

  const handleBack = () => {
    navigate('/contents')
  }

  const handleItemCheck = (sectionId: string, itemIndex: number) => {
    const itemId = `${sectionId}-${itemIndex}`
    setCheckedItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(itemId)) {
        newSet.delete(itemId)
      } else {
        newSet.add(itemId)
      }
      return newSet
    })
  }

  const handleDownloadPDF = async () => {
    setIsDownloading(true)
    try {
      // 直接下载public/files目录下的PDF文件
      const response = await fetch(OSS_CONFIG.getFileUrl('/鸟白岛巡礼list.pdf'))
      
      if (!response.ok) {
        throw new Error('下载失败')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      a.download = '鸟白岛巡礼list.pdf'
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('下载失败:', error)
      alert('下载失败，请稍后再试')
    } finally {
      setIsDownloading(false)
    }
  }

  const getTotalItems = () => {
    return checklistData.reduce((total, section) => total + section.items.length, 0)
  }

  const getCheckedCount = () => {
    return checkedItems.size
  }

  const getProgress = () => {
    const total = getTotalItems()
    const checked = getCheckedCount()
    return total > 0 ? (checked / total) * 100 : 0
  }



  const renderInternationalContent = () => {
    const internationalCards = activeSubTab === 'guangzhou'
      ? trafficCardsData.filter(card => card.category === 'international' && card.subcategory === 'guangzhou')
      : []

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="international"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <SubNavigation>
            <SubNavItem 
              active={activeSubTab === 'guangzhou'} 
              onClick={() => setActiveSubTab('guangzhou')}
            >
              广州-春秋航空
            </SubNavItem>
            <SubNavItem 
              active={activeSubTab === 'other'} 
              onClick={() => setActiveSubTab('other')}
            >
              其他城市
              <ComingSoonBadge>即将开放</ComingSoonBadge>
            </SubNavItem>
          </SubNavigation>
          
          <Content>
            {activeSubTab === 'guangzhou' && internationalCards.length > 0 ? (
              <TrafficInfoGrid 
                cards={internationalCards} 
                title="国际出行攻略 - 广州春秋航空"
              />
            ) : activeSubTab === 'guangzhou' && (
              <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                暂无攻略数据
              </div>
            )}
            
            {activeSubTab === 'other' && (
              <ContentSection>
                <SectionTitle>其他城市攻略</SectionTitle>
                <div style={{ textAlign: 'center', padding: '60px 0' }}>
                  <div style={{ fontSize: '48px', marginBottom: '20px' }}>🚧</div>
                  <h3 style={{ color: '#FF6B35', marginBottom: '15px' }}>内容准备中</h3>
                  <p style={{ color: '#666', fontSize: '18px' }}>
                    我们正在整理更多城市的交通攻略，包括：
                    <br />
                    北京、上海、深圳、成都、杭州等主要城市
                  </p>
                </div>
              </ContentSection>
            )}
          </Content>
        </motion.div>
      </AnimatePresence>
    )
  }

  const renderDomesticContent = () => {
    const domesticCards = trafficCardsData.filter(card => card.category === 'domestic' && card.subcategory === 'kansai-takamatsu')
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="domestic"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <SubNavigation>
            <SubNavItem 
              active={activeDomesticTab === 'kansai-takamatsu'} 
              onClick={() => setActiveDomesticTab('kansai-takamatsu')}
            >
              关西机场→高松（电车）
            </SubNavItem>
            <SubNavItem 
              active={activeDomesticTab === 'other'} 
              onClick={() => setActiveDomesticTab('other')}
            >
              其他路线
              <ComingSoonBadge>即将开放</ComingSoonBadge>
            </SubNavItem>
          </SubNavigation>
          <Content>
            {activeDomesticTab === 'kansai-takamatsu' && (
              <ContentGrid>
                {domesticCards.sort((a, b) => a.order_index - b.order_index).map(card => (
                  <ContentCard
                    key={card.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * card.order_index }}
                  >
                    <CardTitle>
                      <span>{card.icon}</span>
                      {card.title}
                    </CardTitle>
                    <CardContent>
                      {card.content.split('\n').map((line, idx) => <div key={idx}>{line}</div>)}
                    </CardContent>
                  </ContentCard>
                ))}
              </ContentGrid>
            )}
            {activeDomesticTab === 'other' && (
              <ContentSection>
                <SectionTitle>其他路线攻略</SectionTitle>
                <div style={{ textAlign: 'center', padding: '60px 0' }}>
                  <div style={{ fontSize: '48px', marginBottom: '20px' }}>🚧</div>
                  <h3 style={{ color: '#FF6B35', marginBottom: '15px' }}>内容准备中</h3>
                  <p style={{ color: '#666', fontSize: '18px' }}>
                    我们正在整理更多交通方式，包括：<br />
                    大巴路线、轮船路线、租车自驾等
                  </p>
                </div>
              </ContentSection>
            )}
          </Content>
        </motion.div>
      </AnimatePresence>
    )
  }

  const renderChecklistContent = () => {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="checklist"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Content>
            <ContentSection>
              <SectionTitle>巡礼任务清单</SectionTitle>
              <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <p style={{ fontSize: '18px', color: '#666', marginBottom: '30px' }}>
                  为帮助零经验网友顺利完成圣地巡礼计划，我们特别制作了详细的任务清单。
                  <br />
                  建议下载PDF版本并打印，逐项打勾确保每一步都不遗漏。
                </p>
                <DownloadButton
                  onClick={handleDownloadPDF}
                  disabled={isDownloading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isDownloading ? '📄 下载中...' : '📄 下载巡礼清单'}
                </DownloadButton>
              </div>

              <ProgressBar>
                <ProgressText>
                  完成进度：{getCheckedCount()} / {getTotalItems()} 项 ({Math.round(getProgress())}%)
                </ProgressText>
                <ProgressTrack>
                  <ProgressFill percentage={getProgress()} />
                </ProgressTrack>
              </ProgressBar>

              <ChecklistContainer>
                {checklistData.map((section) => (
                  <ChecklistSection
                    key={section.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <ChecklistSectionHeader>
                      <ChecklistSectionIcon>{section.icon}</ChecklistSectionIcon>
                      <ChecklistSectionTitle>{section.title}</ChecklistSectionTitle>
                    </ChecklistSectionHeader>
                    
                    {section.items.map((item, index) => {
                      const itemId = `${section.id}-${index}`
                      const isChecked = checkedItems.has(itemId)
                      
                      return (
                        <ChecklistItem key={index} checked={isChecked}>
                          <CheckBox 
                            checked={isChecked}
                            onClick={() => handleItemCheck(section.id, index)}
                          >
                            {isChecked && '✓'}
                          </CheckBox>
                          <ItemText checked={isChecked}>
                            {item}
                          </ItemText>
                        </ChecklistItem>
                      )
                    })}
                  </ChecklistSection>
                ))}
              </ChecklistContainer>
            </ContentSection>
          </Content>
        </motion.div>
      </AnimatePresence>
    )
  }

  return (
    <Container>
      <Header>
        <div style={{ position: 'relative' }}>
          <BackButton
            onClick={handleBack}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🏠 返回目录
          </BackButton>
          <Title>Summer Pockets 交通攻略</Title>
        </div>
        <MainNavigation>
          <MainNavItem 
            active={activeMainTab === 'international'} 
            onClick={() => setActiveMainTab('international')}
          >
            国际出发
          </MainNavItem>
          <MainNavItem 
            active={activeMainTab === 'domestic'} 
            onClick={() => setActiveMainTab('domestic')}
          >
            日本国内出发
          </MainNavItem>
          <MainNavItem 
            active={activeMainTab === 'checklist'} 
            onClick={() => setActiveMainTab('checklist')}
          >
            巡礼任务清单
          </MainNavItem>
        </MainNavigation>
      </Header>

      {activeMainTab === 'international' && renderInternationalContent()}
      {activeMainTab === 'domestic' && renderDomesticContent()}
      {activeMainTab === 'checklist' && renderChecklistContent()}

    </Container>
  )
}

export default TrafficPage 