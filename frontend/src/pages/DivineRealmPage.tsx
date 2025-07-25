import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import axios from 'axios'
import AuthModal from '../components/AuthModal'
import ButterflyManagementModal from '../components/ButterflyManagementModal'
import UserProfile from '../components/UserProfile'
import ButterflyDisplay from '../components/ButterflyDisplay'
import StarryBackground from '../components/StarryBackground'
import { 
  generateNonOverlappingPositions, 
  selectRandomButterflies, 
  getContainerDimensions,
  ButterflyData,
  Position,
  Size
} from '../utils/butterflyPositioning'

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    160deg,
    #223a5c 0%,         /* 深蓝 */
    #0a192f 40%,        /* 黑蓝 */
    #0c1446 70%,        /* 藏青 */
    #050a1f 100%        /* 纯黑蓝 */
  );
  padding: 20px;
  position: relative;
  overflow-x: hidden;
`



const BackButton = styled(motion.button)`
  position: fixed;
  top: 30px;
  left: 30px;
  background: linear-gradient(45deg, #87CEEB, #98E4D6);
  border: none;
  border-radius: 50px;
  padding: 15px 25px;
  font-size: 18px;
  color: #2E8B57;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(135, 206, 235, 0.4);
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  z-index: 100;
  
  &:hover {
    background: linear-gradient(45deg, #98E4D6, #87CEEB);
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(135, 206, 235, 0.5);
  }
`

const Title = styled.h1`
  font-size: 48px;
  color: #fff;
  margin-bottom: 20px;
  font-weight: 700;
  font-family: '华文行楷', 'STXingkai', 'KaiTi', 'SimKai', cursive;
  text-shadow: 3px 3px 12px rgba(0,0,0,0.45);
  text-align: center;
`

interface UserButterfly {
  id: number
  user_id: number
  label: string
  hoverImg?: string
  modalImg?: string
  link?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

interface ButterflyDisplayData extends ButterflyData {
  position: Position
  size: Size
}

const DivineRealmPage: React.FC = () => {
  const navigate = useNavigate()
  const imageContainerRef = useRef<HTMLDivElement>(null)
  
  // 夜晚图片数组
  const nightImages = useMemo(() => [
    '/images/webps/男木岛/男木岛-鸟白岛役场-夜晚.webp',
    '/images/webps/男木岛/男木岛-灯塔-夜晚-熄灯.webp',
    '/images/webps/男木岛/男木岛-鸥相遇小道-夜晚.webp',
    '/images/webps/男木岛/男木岛-泳池-夜晚.webp',
    '/images/webps/男木岛/男木岛-灯塔-夜晚-亮灯.webp',
    '/images/webps/男木岛/男木岛-苍睡觉小道-夜晚.webp',
    '/images/webps/直岛/直岛-港口-有船-夜晚.webp',
    '/images/webps/直岛/直岛-海水浴场-夜晚.webp',
    '/images/webps/直岛/直岛-港口-无船-夜晚.webp',
    '/images/webps/直岛/直岛-海狸家卧室-无床-关灯-夜晚.webp',
    '/images/webps/直岛/直岛-海狸家院子-夜晚.webp',
    '/images/webps/直岛/直岛-小卖部-夜晚.webp',
    '/images/webps/直岛/直岛-白羽钓点-夜晚.webp',
    '/images/webps/直岛/直岛-通往役场道路-夜晚.webp',
    '/images/webps/直岛/直岛-神社-夜晚.webp',
    '/images/webps/直岛/直岛-海狸家门前-夜晚.webp',
    '/images/webps/直岛/直岛-海狸家卧室-有床-关灯-夜晚.webp',
    '/images/webps/直岛/直岛-灵弹-夜晚.webp',
    '/images/webps/女木岛/女木岛-秘密基地山路-夜晚.webp',
    '/images/webps/女木岛/女木岛-采石场入口-夜晚.webp',
    '/images/webps/女木岛/女木岛-山道-夜晚.webp'
  ], [])

  // 核心状态
  const [token, setToken] = useState<string | null>(null)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [userButterfly, setUserButterfly] = useState<UserButterfly | null>(null)
  const [showAuth, setShowAuth] = useState(false)
  const [showUserButterflyModal, setShowUserButterflyModal] = useState(false)
  const [showButterflyModal, setShowButterflyModal] = useState<ButterflyDisplayData | null>(null)
  
  // 夜晚场景和蝴蝶显示状态
  const [currentNightImage, setCurrentNightImage] = useState(() => {
    return nightImages[Math.floor(Math.random() * nightImages.length)]
  })
  
  // 新的七影蝶显示系统状态
  const [displayButterflies, setDisplayButterflies] = useState<ButterflyDisplayData[]>([])
  const [isLoadingButterflies, setIsLoadingButterflies] = useState(false)

  // 获取用户七影蝶
  const fetchUserButterfly = async () => {
    if (!token) return
    try {
      const res = await axios.get('/api/butterfly/my-butterfly', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUserButterfly(res.data)
    } catch (err: any) {
      if (err.response?.status !== 404) {
        console.error('获取用户七影蝶失败:', err)
        // 只在非404错误时显示错误提示
        if (err.response?.status === 401) {
          showErrorToast('登录已过期，请重新登录')
          handleLogout()
        } else {
          showErrorToast('获取七影蝶失败，请稍后重试')
        }
      }
    }
  }

  // 获取随机七影蝶用于显示
  const fetchRandomButterflies = async () => {
    setIsLoadingButterflies(true)
    try {
      const res = await axios.get('/api/butterfly/random-display')
      const butterflies: ButterflyData[] = res.data.map((item: any) => ({
        id: item.id,
        label: item.label,
        hover_img: item.hover_img,
        modal_img: item.modal_img,
        link: item.link,
        butterfly_type: item.butterfly_type
      }))
      
      // 生成随机位置
      generateButterflyPositions(butterflies)
    } catch (err: any) {
      console.error('获取随机七影蝶失败:', err)
      
      // 显示用户友好的错误提示
      showErrorToast('获取七影蝶失败，使用本地配置')
      
      // 回退到本地配置
      const fallbackButterflies: ButterflyData[] = [
        {
          label: 'anitabi巡礼网站',
          modal_img: undefined,
          hover_img: undefined,
          link: 'https://anitabi.cn/map',
          butterfly_type: 'official'
        },
        {
          label: '空门苍睡觉的小道',
          modal_img: '/images/webps/男木岛/男木岛-苍睡觉小道.webp',
          hover_img: '/images/webps/男木岛/男木岛-苍睡觉小道.webp',
          link: undefined,
          butterfly_type: 'official'
        },
        {
          label: '小紬的灯塔',
          modal_img: '/images/webps/男木岛/男木岛-紬的灯塔.webp',
          hover_img: '/images/webps/男木岛/男木岛-紬的灯塔.webp',
          link: undefined,
          butterfly_type: 'official'
        }
      ]
      generateButterflyPositions(fallbackButterflies)
    } finally {
      setIsLoadingButterflies(false)
    }
  }

  // 生成七影蝶位置
  const generateButterflyPositions = useCallback((butterflies: ButterflyData[]) => {
    // 获取容器尺寸
    const containerDimensions = getContainerDimensions(imageContainerRef.current)
    
    // 随机选择最多5只七影蝶
    const selectedButterflies = selectRandomButterflies(butterflies, 5)
    
    // 生成防重叠的位置
    const positionedButterflies = generateNonOverlappingPositions(
      selectedButterflies,
      containerDimensions.width,
      containerDimensions.height
    )
    
    // 组合数据
    const displayData: ButterflyDisplayData[] = selectedButterflies.map((butterfly, index) => ({
      ...butterfly,
      position: positionedButterflies[index]?.position || { left: 0.5, top: 0.5 },
      size: positionedButterflies[index]?.size || { w: 48, h: 48 }
    }))
    
    setDisplayButterflies(displayData)
  }, [])

  // 刷新夜晚图片和蝴蝶位置/展示
  // 需求 7.2: 当点击刷新按钮时，系统应随机重新定位和重新选择七影蝶
  const refreshNightImage = useCallback(() => {
    const newImage = nightImages[Math.floor(Math.random() * nightImages.length)]
    setCurrentNightImage(newImage)
    
    // 重新获取随机七影蝶和位置
    fetchRandomButterflies()
  }, [nightImages])

  // 登录后获取用户信息
  const fetchUserInfo = async (tk: string) => {
    try {
      const res = await axios.get('/api/auth/me', {
        headers: { Authorization: `Bearer ${tk}` }
      })
      setAvatarUrl(res.data.avatar_url || null)
    } catch (err: any) {
      console.error('获取用户信息失败:', err)
      if (err.response?.status === 401) {
        // Token无效，清除本地存储
        handleLogout()
      }
    }
  }

  // 处理认证成功
  const handleAuthSuccess = (newToken: string) => {
    setToken(newToken)
    fetchUserInfo(newToken)
  }

  // 处理头像更新
  const handleAvatarUpdate = (url: string | null) => {
    setAvatarUrl(url)
  }

  // 退出登录
  const handleLogout = () => {
    setToken(null)
    setAvatarUrl(null)
    setUserButterfly(null)
    localStorage.removeItem('token')
  }

  // 处理蝴蝶点击
  const handleButterflyClick = useCallback((butterfly: ButterflyDisplayData) => {
    if (butterfly.link) {
      // 有链接的七影蝶在新标签页打开链接
      window.open(butterfly.link, '_blank')
    } else {
      // 没有链接的七影蝶打开模态框
      if (butterfly.butterfly_type === 'user') {
        setShowUserButterflyModal(true)
      } else {
        setShowButterflyModal(butterfly)
      }
    }
  }, [])

  // 显示成功提示
  const showSuccessToast = (message: string) => {
    const toast = document.createElement('div')
    toast.style.cssText = `
      position: fixed;
      top: 100px;
      right: 30px;
      background: linear-gradient(45deg, #2E8B57, #3CB371);
      color: white;
      padding: 16px 24px;
      border-radius: 12px;
      font-size: 16px;
      font-weight: 600;
      box-shadow: 0 4px 16px rgba(46,139,87,0.3);
      z-index: 1000;
      animation: slideInRight 0.3s ease-out;
      pointer-events: none;
    `
    toast.textContent = message
    
    // 添加动画样式
    const style = document.createElement('style')
    style.textContent = `
      @keyframes slideInRight {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      @keyframes slideOutRight {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(100%);
          opacity: 0;
        }
      }
    `
    
    document.head.appendChild(style)
    document.body.appendChild(toast)
    
    // 3秒后移除提示
    setTimeout(() => {
      toast.style.animation = 'slideOutRight 0.3s ease-in'
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast)
        }
        if (document.head.contains(style)) {
          document.head.removeChild(style)
        }
      }, 300)
    }, 3000)
  }

  // 显示错误提示
  const showErrorToast = (message: string) => {
    const toast = document.createElement('div')
    toast.style.cssText = `
      position: fixed;
      top: 100px;
      right: 30px;
      background: linear-gradient(45deg, #FF6B35, #FF4757);
      color: white;
      padding: 16px 24px;
      border-radius: 12px;
      font-size: 16px;
      font-weight: 600;
      box-shadow: 0 4px 16px rgba(255,107,53,0.3);
      z-index: 1000;
      animation: slideInRight 0.3s ease-out;
      pointer-events: none;
    `
    toast.textContent = `⚠️ ${message}`
    
    // 添加动画样式（如果不存在）
    if (!document.getElementById('toast-styles')) {
      const style = document.createElement('style')
      style.id = 'toast-styles'
      style.textContent = `
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slideOutRight {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }
      `
      document.head.appendChild(style)
    }
    
    document.body.appendChild(toast)
    
    // 4秒后移除提示（错误提示显示时间稍长）
    setTimeout(() => {
      toast.style.animation = 'slideOutRight 0.3s ease-in'
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast)
        }
      }, 300)
    }, 4000)
  }

  // 处理蝴蝶更新
  const handleButterflyUpdate = (butterfly: UserButterfly | null) => {
    setUserButterfly(butterfly)
    
    // 显示相应的提示
    if (butterfly) {
      showSuccessToast('🦋 七影蝶已更新，即将在神域中显示')
    }
  }

  // 首次加载随机化
  // 需求 7.1: 当页面加载或改变夜晚场景时，系统应随机选择并显示最多5只七影蝶
  useEffect(() => {
    const newImage = nightImages[Math.floor(Math.random() * nightImages.length)]
    setCurrentNightImage(newImage)
    fetchRandomButterflies()
  }, [])

  // 自动记住token和头像，下次登录自动显示
  useEffect(() => {
    const tk = localStorage.getItem('token')
    if (tk) {
      setToken(tk)
      fetchUserInfo(tk)
    }
  }, [])

  useEffect(() => {
    if (token) localStorage.setItem('token', token)
  }, [token])

  // 当token变化时获取用户七影蝶并刷新显示
  useEffect(() => {
    if (token) {
      fetchUserButterfly()
      // 用户登录后重新获取七影蝶显示（可能包含用户的七影蝶）
      fetchRandomButterflies()
    }
  }, [token])

  // 当用户七影蝶变化时刷新显示
  useEffect(() => {
    fetchRandomButterflies()
  }, [userButterfly])

  const handleBack = () => {
    navigate('/contents')
  }

  return (
    <Container>
      {/* 星空背景 */}
      <StarryBackground />
      
      {/* 用户资料组件 */}
      <UserProfile
        token={token}
        avatarUrl={avatarUrl}
        onAvatarUpdate={handleAvatarUpdate}
        onLogout={handleLogout}
        onShowAuth={() => setShowAuth(true)}
      />
      {/* 夜晚场景图主展示 */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 80 }}>
        <Title>神域</Title>
        {/* 夜晚图片和蝴蝶包裹在一起 */}
        <div ref={imageContainerRef} style={{ position: 'relative', display: 'inline-block' }}>
          <img 
            src={currentNightImage} 
            alt="夜晚场景" 
            style={{ 
              maxWidth: '90vw', 
              maxHeight: '60vh', 
              borderRadius: 24, 
              boxShadow: '0 8px 32px rgba(123,9,183,0.3)',
              border: '2px solid rgba(255,255,255,0.1)',
              display: 'block'
            }} 
          />
          {/* 新的蝴蝶显示系统 */}
          {!isLoadingButterflies && displayButterflies.map((butterfly, index) => (
            <ButterflyDisplay
              key={`${butterfly.butterfly_type}-${butterfly.id || index}-${butterfly.label}`}
              butterfly={butterfly}
              onButterflyClick={handleButterflyClick}
            />
          ))}
          {isLoadingButterflies && (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: '#fff',
              fontSize: 16,
              fontWeight: 600,
              textShadow: '0 2px 4px rgba(0,0,0,0.5)'
            }}>
              加载七影蝶中...
            </div>
          )}
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
          <button
            onClick={refreshNightImage}
            disabled={isLoadingButterflies}
            style={{
              background: 'linear-gradient(45deg, #533483, #7209b7)',
              color: '#fff',
              border: 'none',
              borderRadius: 12,
              padding: '12px 28px',
              fontSize: 16,
              fontWeight: 600,
              cursor: isLoadingButterflies ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 16px rgba(123,9,183,0.3)',
              transition: 'all 0.2s',
              opacity: isLoadingButterflies ? 0.7 : 1
            }}
            onMouseEnter={e => {
              if (!isLoadingButterflies) {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(123,9,183,0.4)'
              }
            }}
            onMouseLeave={e => {
              if (!isLoadingButterflies) {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(123,9,183,0.3)'
              }
            }}
          >
            🌙 {isLoadingButterflies ? '刷新中...' : '刷新夜景'}
          </button>
          <button
            onClick={fetchRandomButterflies}
            disabled={isLoadingButterflies}
            style={{
              background: 'linear-gradient(45deg, #4A90E2, #357ABD)',
              color: '#fff',
              border: 'none',
              borderRadius: 12,
              padding: '12px 28px',
              fontSize: 16,
              fontWeight: 600,
              cursor: isLoadingButterflies ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 16px rgba(74,144,226,0.3)',
              transition: 'all 0.2s',
              opacity: isLoadingButterflies ? 0.7 : 1
            }}
            onMouseEnter={e => {
              if (!isLoadingButterflies) {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(74,144,226,0.4)'
              }
            }}
            onMouseLeave={e => {
              if (!isLoadingButterflies) {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(74,144,226,0.3)'
              }
            }}
          >
            🦋 {isLoadingButterflies ? '刷新中...' : '刷新七影蝶'}
          </button>
          {token && (
            <button
              onClick={() => setShowUserButterflyModal(true)}
              style={{
                background: 'linear-gradient(45deg, #FFB347, #FF6B35)',
                color: '#fff',
                border: 'none',
                borderRadius: 12,
                padding: '12px 28px',
                fontSize: 16,
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(255,179,71,0.3)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(255,179,71,0.4)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(255,179,71,0.3)'
              }}
            >
              👤 {userButterfly ? '我的七影蝶' : '创建我的七影蝶'}
            </button>
          )}
        </div>
      </div>
      {/* 蝴蝶弹窗 */}
      {showButterflyModal && (
        <div 
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            width: '100vw', 
            height: '100vh', 
            background: 'rgba(0,0,0,0.25)', 
            zIndex: 999, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }} 
          onClick={() => setShowButterflyModal(null)}
        >
          <div 
            style={{ 
              background: '#fff', 
              borderRadius: 18, 
              padding: '36px 48px', 
              minWidth: 260, 
              fontSize: 22, 
              color: '#533483', 
              fontWeight: 700, 
              boxShadow: '0 8px 32px rgba(123,9,183,0.18)', 
              position: 'relative', 
              textAlign: 'center' 
            }} 
            onClick={e => e.stopPropagation()}
          >
            {showButterflyModal.modal_img && (
              <img 
                src={showButterflyModal.modal_img} 
                alt="butterfly" 
                style={{ 
                  width: 220, 
                  borderRadius: 12, 
                  marginBottom: 18, 
                  display: 'block', 
                  marginLeft: 'auto', 
                  marginRight: 'auto' 
                }} 
              />
            )}
            {showButterflyModal.label}
            <button 
              onClick={() => setShowButterflyModal(null)} 
              style={{ 
                position: 'absolute', 
                top: 12, 
                right: 18, 
                background: 'none', 
                border: 'none', 
                fontSize: 22, 
                color: '#7209b7', 
                cursor: 'pointer' 
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* 认证模态框 */}
      <AuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        onAuthSuccess={handleAuthSuccess}
        token={token}
        avatarUrl={avatarUrl}
        onAvatarUpdate={handleAvatarUpdate}
        onLogout={handleLogout}
      />

      {/* 蝴蝶管理模态框 */}
      <ButterflyManagementModal
        isOpen={showUserButterflyModal}
        onClose={() => setShowUserButterflyModal(false)}
        token={token}
        userButterfly={userButterfly}
        onButterflyUpdate={handleButterflyUpdate}
      />

      <BackButton
        onClick={handleBack}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        🏠 返回目录
      </BackButton>
    </Container>
  )
}

export default DivineRealmPage 