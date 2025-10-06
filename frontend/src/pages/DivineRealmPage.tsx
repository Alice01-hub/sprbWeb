import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { supabase } from '../config/supabaseClient'

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

// 神域场景展示模态框样式
const SceneModal = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(135, 206, 235, 0.3);
  border-radius: 20px;
  padding: 30px;
  max-width: 600px;
  width: 90%;
  backdrop-filter: blur(15px);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, 
      rgba(135, 206, 235, 0.1) 0%, 
      rgba(98, 228, 214, 0.1) 50%, 
      rgba(83, 52, 131, 0.1) 100%);
    border-radius: 18px;
    z-index: -1;
  }
`

const SceneImage = styled(motion.img)`
  width: 100%;
  max-width: 500px;
  height: auto;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  margin-bottom: 20px;
  object-fit: cover;
  border: 2px solid rgba(135, 206, 235, 0.2);
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

// 神域场景数据类型
interface DivineScene {
  id: number
  graph_path: string
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

  // 切换场景 - 从本地数据中随机选择
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
            graph_path: 'https://oss.sprb.love/webps/神域摘要图.webp',
            graph_name: '神秘夜空',
            is_published: true,
            created_at: new Date().toISOString()
          },
          {
            id: 2,
            graph_path: 'https://oss.sprb.love/webps/神域摘要图.webp',
            graph_name: '七影蝶之舞',
            is_published: true,
            created_at: new Date().toISOString()
          },
          {
            id: 3,
            graph_path: 'https://oss.sprb.love/webps/神域摘要图.webp',
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

  // 组件挂载时加载数据
  useEffect(() => {
    loadScenes()
  }, [])

  return (
    <Container>
      <Title>神域</Title>

      {/* 神域场景展示区域 */}
      <SceneModal
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
              src={currentScene.graph_path}
              alt={currentScene.graph_name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            />
            <SceneName
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {currentScene.graph_name}
            </SceneName>
            <SwitchButton
              onClick={handleSwitchScene}
              disabled={isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              切换场景
            </SwitchButton>
          </>
        ) : (
          <ErrorMessage>
            暂无可用场景
          </ErrorMessage>
        )}
      </SceneModal>

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