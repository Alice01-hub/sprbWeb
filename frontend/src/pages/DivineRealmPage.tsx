import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { supabase } from '../config/supabaseClient'
import MemoryButterfly, { ButterflyMemory } from '../components/MemoryButterfly'
import MemoryCard from '../components/MemoryCard'
import ErrorBoundary from '../components/ErrorBoundary'
import { getPublishedMemories, getRandomMemories, assignRandomPositions } from '../services/memoryService'

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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  /* 添加星空背景效果 */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      radial-gradient(2px 2px at 20px 30px, rgba(255, 255, 255, 0.3), transparent),
      radial-gradient(2px 2px at 40px 70px, rgba(135, 206, 235, 0.4), transparent),
      radial-gradient(1px 1px at 90px 40px, rgba(255, 255, 255, 0.2), transparent),
      radial-gradient(1px 1px at 130px 80px, rgba(135, 206, 235, 0.3), transparent),
      radial-gradient(2px 2px at 160px 30px, rgba(255, 255, 255, 0.2), transparent);
    background-repeat: repeat;
    background-size: 200px 100px;
    animation: twinkle 4s ease-in-out infinite alternate;
    pointer-events: none;
  }
  
  @keyframes twinkle {
    0% { opacity: 0.3; }
    100% { opacity: 0.8; }
  }
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
  margin-bottom: 40px;
  font-weight: 700;
  font-family: '华文行楷', 'STXingkai', 'KaiTi', 'SimKai', cursive;
  text-shadow: 3px 3px 12px rgba(0,0,0,0.45);
  text-align: center;
`

// 图片容器样式 - 直接放在页面中央，作为蝴蝶的定位参考
const ImageContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
`

// 蝴蝶容器 - 覆盖在图片上方
const ButterfliesContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;  /* 默认不阻止下方元素点击 */
  
  /* 让蝴蝶本身可以点击 */
  & > * {
    pointer-events: auto;
  }
`

const SceneImage = styled(motion.img)`
  width: 100%;
  max-width: 1000px;
  height: auto;
  max-height: 70vh;
  border-radius: 15px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    0 0 20px rgba(135, 206, 235, 0.2);
  object-fit: contain;
  border: 2px solid rgba(135, 206, 235, 0.3);
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
`

const SceneName = styled(motion.h3)`
  color: rgba(255, 255, 255, 0.9);
  font-size: 28px;
  font-weight: 700;
  margin: 0;
  font-family: '华文行楷', 'STXingkai', 'KaiTi', 'SimKai', cursive;
  text-shadow: 
    2px 2px 8px rgba(0, 0, 0, 0.7),
    0 0 20px rgba(135, 206, 235, 0.3);
  background: linear-gradient(45deg, #87CEEB, #98E4D6, #533483, #7209b7);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 200%;
  animation: gradientShift 3s ease-in-out infinite alternate;
  
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    100% { background-position: 100% 50%; }
  }
`

const SwitchButton = styled(motion.button)`
  background: linear-gradient(45deg, #533483, #7209b7, #87CEEB, #98E4D6);
  background-size: 300% 300%;
  border: none;
  border-radius: 25px;
  padding: 15px 30px;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  margin-top: 25px;
  box-shadow: 
    0 4px 15px rgba(123, 9, 183, 0.3),
    0 0 20px rgba(135, 206, 235, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  animation: gradientFlow 4s ease-in-out infinite;
  
  @keyframes gradientFlow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(255, 255, 255, 0.3), 
      transparent);
    transition: left 0.6s ease;
  }
  
  &::after {
    content: '🦋';
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translateY(-50%);
    font-size: 16px;
    opacity: 0.8;
  }
  
  &:hover::before {
    left: 100%;
  }
  
  &:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 
      0 8px 25px rgba(123, 9, 183, 0.5),
      0 0 40px rgba(135, 206, 235, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }
  
  &:active {
    transform: translateY(-1px) scale(0.98);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`

const LoadingSpinner = styled(motion.div)`
  width: 40px;
  height: 40px;
  border: 3px solid rgba(135, 206, 235, 0.3);
  border-top: 3px solid #87CEEB;
  border-radius: 50%;
  margin: 20px auto;
`

const ErrorMessage = styled(motion.div)`
  color: #ff6b6b;
  font-size: 16px;
  margin: 20px 0;
  padding: 15px;
  background: rgba(255, 107, 107, 0.1);
  border: 1px solid rgba(255, 107, 107, 0.3);
  border-radius: 10px;
`

// 外部控制区域样式
const ControlArea = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
  z-index: 10;
  position: relative;
`

// 场景名称外部样式
const ExternalSceneName = styled(motion.h3)`
  color: rgba(255, 255, 255, 0.9);
  font-size: 32px;
  font-weight: 700;
  margin: 0;
  font-family: '华文行楷', 'STXingkai', 'KaiTi', 'SimKai', cursive;
  text-shadow: 
    2px 2px 8px rgba(0, 0, 0, 0.7),
    0 0 20px rgba(135, 206, 235, 0.3);
  background: linear-gradient(45deg, #87CEEB, #98E4D6, #533483, #7209b7);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 200%;
  animation: gradientShift 3s ease-in-out infinite alternate;
  
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    100% { background-position: 100% 50%; }
  }
`

// 外部切换按钮样式
const ExternalSwitchButton = styled(motion.button)`
  background: linear-gradient(45deg, #533483, #7209b7, #87CEEB, #98E4D6);
  background-size: 300% 300%;
  border: none;
  border-radius: 25px;
  padding: 15px 30px;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  box-shadow: 
    0 4px 15px rgba(123, 9, 183, 0.3),
    0 0 20px rgba(135, 206, 235, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  animation: gradientFlow 4s ease-in-out infinite;
  
  @keyframes gradientFlow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(255, 255, 255, 0.3), 
      transparent);
    transition: left 0.6s ease;
  }
  
  &::after {
    content: '🦋';
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translateY(-50%);
    font-size: 16px;
    opacity: 0.8;
  }
  
  &:hover::before {
    left: 100%;
  }
  
  &:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 
      0 8px 25px rgba(123, 9, 183, 0.5),
      0 0 40px rgba(135, 206, 235, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }
  
  &:active {
    transform: translateY(-1px) scale(0.98);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`

// 神域场景数据类型
interface DivineScene {
  id: number
  graph_url: string
  graph_name: string
  is_published: boolean
  created_at: string
}

const DivineRealmPage: React.FC = () => {
  const navigate = useNavigate()
  
  // 状态管理
  const [currentScene, setCurrentScene] = useState<DivineScene | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [allScenes, setAllScenes] = useState<DivineScene[]>([])
  
  // 蝴蝶相关状态
  const [allMemories, setAllMemories] = useState<ButterflyMemory[]>([])  // 所有已发布的蝴蝶记忆池
  const [displayedButterflies, setDisplayedButterflies] = useState<ButterflyMemory[]>([])  // 当前显示的蝴蝶
  const [selectedMemory, setSelectedMemory] = useState<ButterflyMemory | null>(null)  // 被点击的蝴蝶
  
  // 图片尺寸配置 - 你可以在这里调整图片大小
  const imageConfig = {
    maxWidth: '1000px',    // 图片最大宽度
    maxHeight: '70vh'      // 图片最大高度
  }

  // 返回按钮处理
  const handleBack = () => {
    navigate('/contents')
  }

  // 获取随机场景
  const getRandomScene = () => {
    if (allScenes.length === 0) return null
    const publishedScenes = allScenes.filter(scene => scene.is_published)
    if (publishedScenes.length === 0) return null
    const randomIndex = Math.floor(Math.random() * publishedScenes.length)
    return publishedScenes[randomIndex]
  }

  // 切换场景 - 从本地数据中随机选择，并随机显示蝴蝶
  const handleSwitchScene = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      console.log('🔄 切换神域场景...')
      
      // 从本地数据中随机选择场景
      const randomScene = getRandomScene()
      if (randomScene) {
        setCurrentScene(randomScene)
        console.log('🎯 切换到场景:', randomScene.graph_name)
        
        // 随机显示3-5只蝴蝶
        refreshButterflies()
      } else {
        setError('没有可用的场景')
        console.log('❌ 没有可用的场景')
      }
    } catch (err) {
      console.error('❌ 切换场景失败:', err)
      setError('切换场景失败')
    } finally {
      setIsLoading(false)
    }
  }
  
  // 刷新蝴蝶显示
  const refreshButterflies = () => {
    if (allMemories.length === 0) {
      console.log('⚠️ 蝴蝶记忆池为空')
      setDisplayedButterflies([])
      return
    }
    
    // 随机选择3-5只蝴蝶
    const randomButterflies = getRandomMemories(allMemories)
    console.log('🦋 随机选择了', randomButterflies.length, '只蝴蝶')
    
    // 为蝴蝶分配随机位置
    const positionedButterflies = assignRandomPositions(randomButterflies)
    setDisplayedButterflies(positionedButterflies)
  }
  
  // 点击蝴蝶处理
  const handleButterflyClick = (memory: ButterflyMemory) => {
    console.log('🦋 点击蝴蝶:', memory.title)
    setSelectedMemory(memory)
  }
  
  // 关闭蝴蝶详情卡片
  const handleCloseMemoryCard = () => {
    setSelectedMemory(null)
  }

  // 加载场景数据 - 直接从Supabase读取，类似公告栏
  const loadScenes = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      console.log('🦋 从Supabase获取神域场景数据...')
      
      const { data, error } = await supabase
        .from('DivineRealmPage_graph')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('❌ 获取神域场景失败:', error)
        setError(error.message)
        
        // 如果Supabase失败，使用模拟数据作为备用
        const mockScenes: DivineScene[] = [
          {
            id: 1,
            graph_url: 'https://oss.sprb.love/webps/神域摘要图.webp',
            graph_name: '神秘夜空',
            is_published: true,
            created_at: new Date().toISOString()
          },
          {
            id: 2,
            graph_url: 'https://oss.sprb.love/webps/神域摘要图.webp',
            graph_name: '七影蝶之舞',
            is_published: true,
            created_at: new Date().toISOString()
          },
          {
            id: 3,
            graph_url: 'https://oss.sprb.love/webps/神域摘要图.webp',
            graph_name: '星海梦境',
            is_published: true,
            created_at: new Date().toISOString()
          }
        ]
        
        setAllScenes(mockScenes)
        setCurrentScene(mockScenes[0])
        return
      }

      console.log('✅ 成功获取神域场景数据:', data)
      setAllScenes(data || [])
      
      if (data && data.length > 0) {
        // 随机选择一个场景作为初始显示
        const randomScene = getRandomSceneFromList(data)
        if (randomScene) {
          setCurrentScene(randomScene)
          console.log('🎯 选择初始场景:', randomScene.graph_name)
        }
      } else {
        setError('没有可用的神域场景')
      }
      
    } catch (err: any) {
      console.error('❌ 获取神域场景过程中发生错误:', err)
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  // 从场景列表中随机选择一个场景
  const getRandomSceneFromList = (scenes: DivineScene[]) => {
    if (scenes.length === 0) return null
    const publishedScenes = scenes.filter(scene => scene.is_published)
    if (publishedScenes.length === 0) return null
    const randomIndex = Math.floor(Math.random() * publishedScenes.length)
    return publishedScenes[randomIndex]
  }

  // 加载蝴蝶记忆数据
  const loadMemories = async () => {
    try {
      console.log('🦋 加载蝴蝶记忆数据...')
      const memories = await getPublishedMemories()
      setAllMemories(memories)
      console.log('✅ 蝴蝶记忆池加载完成，共', memories.length, '只蝴蝶')
    } catch (err) {
      console.error('❌ 加载蝴蝶记忆失败:', err)
      // 即使蝴蝶加载失败，页面其他功能仍可正常使用
    }
  }

  // 组件挂载时加载数据
  useEffect(() => {
    loadScenes()
    loadMemories()
  }, [])
  
  // 当场景和蝴蝶记忆都加载完成后，显示初始蝴蝶
  useEffect(() => {
    if (currentScene && allMemories.length > 0 && displayedButterflies.length === 0) {
      refreshButterflies()
    }
  }, [currentScene, allMemories])

  return (
    <Container>
      <Title>神域</Title>

      {/* 图片展示区域 - 直接放在页面中央 */}
      <ImageContainer
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {isLoading ? (
          <LoadingSpinner
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        ) : error ? (
          <ErrorMessage
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </ErrorMessage>
        ) : currentScene ? (
          <>
            <SceneImage
              src={currentScene.graph_url}
              alt={currentScene.graph_name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            />
            
            {/* 蝴蝶容器 - 覆盖在图片上方 */}
            <ButterfliesContainer>
              {displayedButterflies.map((memory) => (
                <MemoryButterfly
                  key={memory.id}
                  memory={memory}
                  onClick={() => handleButterflyClick(memory)}
                />
              ))}
            </ButterfliesContainer>
          </>
        ) : (
          <ErrorMessage>
            暂无可用场景
          </ErrorMessage>
        )}
      </ImageContainer>
      
      {/* 蝴蝶详情卡片 */}
      {selectedMemory && (
        <ErrorBoundary>
          <MemoryCard
            memory={selectedMemory}
            onClose={handleCloseMemoryCard}
          />
        </ErrorBoundary>
      )}

      {/* 控制区域 - 场景名称和切换按钮 */}
      <ControlArea
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {currentScene && (
          <ExternalSceneName
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {currentScene.graph_name}
          </ExternalSceneName>
        )}
        
        <ExternalSwitchButton
          onClick={handleSwitchScene}
          disabled={isLoading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          切换场景
        </ExternalSwitchButton>
      </ControlArea>

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