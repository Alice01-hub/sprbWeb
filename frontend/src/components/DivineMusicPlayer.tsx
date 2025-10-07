import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { getDivineAudios } from '../services/divineAudioService'

// 神域BGM数据类型
export interface DivineAudio {
  id: number
  title: string
  artist: string
  url: string
  is_published: boolean
}

interface DivineMusicPlayerProps {
  isVisible: boolean
}

// 主容器 - 仅用于面板定位
const PlayerContainer = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
`

// 圆形播放按钮 - 夜色主题，独立固定定位
const PlayButton = styled(motion.button)<{ isPlaying: boolean }>`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: none;
  /* 夜空渐变：从深蓝到紫色 */
  background: linear-gradient(135deg, #1a237e 0%, #283593 50%, #3949ab 100%);
  box-shadow: 
    0 8px 25px rgba(26, 35, 126, 0.4),
    0 0 0 3px rgba(135, 206, 235, 0.2),
    inset 0 -2px 10px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed; /* 使用固定定位，独立于容器 */
  bottom: 30px; /* 距离底部30px */
  right: 30px; /* 距离右侧30px */
  z-index: 1001; /* 确保按钮在所有内容之上 */
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  
  /* 音乐图标 */
  &::after {
    content: '🎵';
    font-size: 32px;
    color: white;
    text-shadow: 0 0 10px rgba(135, 206, 235, 0.8);
  }
  
  &:hover {
    transform: scale(1.1) translateY(-3px);
    box-shadow: 
      0 15px 35px rgba(26, 35, 126, 0.6),
      0 0 0 5px rgba(135, 206, 235, 0.4),
      inset 0 -2px 15px rgba(0, 0, 0, 0.4);
    background: linear-gradient(135deg, #283593 0%, #3949ab 50%, #5c6bc0 100%);
  }
  
  &:active {
    transform: scale(1.05) translateY(-1px);
  }
`

// 展开的播放器面板 - 使用GIF背景图片，16:9比例
const PlayerPanel = styled(motion.div)`
  position: absolute;
  bottom: 90px; /* 调整位置，确保不遮挡按钮 */
  right: 0;
  width: 400px;
  height: 225px; /* 16:9比例 (400 * 9 / 16) */
  background-image: url('https://sprbweb-src.oss-cn-guangzhou.aliyuncs.com/public/images/%E7%A5%9E%E5%9F%9F%E9%9F%B3%E9%A2%91%E6%92%AD%E6%94%BE%E5%99%A8%E8%83%8C%E6%99%AF%E5%9B%BE.gif');
  background-size: cover;
  background-position: center top; /* 背景图片定位到顶部，组件下移 */
  background-repeat: no-repeat;
  border-radius: 15px;
  padding: 15px;
  box-shadow: 
    0 15px 40px rgba(0, 0, 0, 0.6),
    0 0 30px rgba(135, 206, 235, 0.2);
  border: 1px solid rgba(135, 206, 235, 0.3);
  backdrop-filter: blur(5px);
  position: relative;
  z-index: 5; /* 面板层级低于按钮 */
  overflow: hidden;
  
  /* 添加半透明遮罩层，确保文字清晰可见 */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 15px;
    pointer-events: none;
  }
  
  /* 确保所有内容在遮罩层之上 */
  & > * {
    position: relative;
    z-index: 1;
  }
`

// 头部 - 左上角按钮布局，下移显示
const PlayerHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 80px; /* 增加上边距，将组件下移 */
  margin-bottom: 15px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`

// 音乐图标 - 居中显示，无封面设计
const MusicIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1a237e, #3949ab);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  margin-bottom: 10px;
  box-shadow: 0 4px 15px rgba(26, 35, 126, 0.5);
`

// 歌曲信息 - 居中布局
const TrackInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

const TrackTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 6px;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  background: rgba(0, 0, 0, 0.4);
  padding: 6px 12px;
  border-radius: 8px;
  backdrop-filter: blur(10px);
  max-width: 100%;
  word-wrap: break-word;
`

const ArtistName = styled.div`
  font-size: 14px;
  color: #e0e0e0;
  text-align: center;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  background: rgba(0, 0, 0, 0.3);
  padding: 4px 8px;
  border-radius: 6px;
  backdrop-filter: blur(5px);
  max-width: 100%;
  word-wrap: break-word;
`


// 控制按钮区域 - 居中显示单个播放按钮
const ControlsArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
`

const ControlButton = styled(motion.button)`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.6);
  background: rgba(0, 0, 0, 0.6);
  color: #ffffff;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
  
  &:hover {
    background: rgba(0, 0, 0, 0.8);
    border-color: rgba(255, 255, 255, 0.9);
    transform: scale(1.1);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  }
`

const PlayPauseButton = styled(ControlButton)`
  width: 50px;
  height: 50px;
  font-size: 20px;
  background: rgba(0, 0, 0, 0.7);
  border-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
  
  &:hover {
    background: rgba(0, 0, 0, 0.9);
    border-color: #ffffff;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.6);
  }
`

// 音量控制 - 头部下方布局
const VolumeArea = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px; /* 与头部保持适当距离 */
  margin-bottom: 15px;
  padding: 8px 0;
`

const VolumeIcon = styled.span`
  font-size: 12px;
  color: #ffffff;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  background: rgba(0, 0, 0, 0.3);
  padding: 2px 4px;
  border-radius: 3px;
  backdrop-filter: blur(5px);
`

const VolumeSlider = styled.input`
  flex: 1;
  height: 6px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
  outline: none;
  cursor: pointer;
  backdrop-filter: blur(5px);
  
  &::-webkit-slider-thumb {
    appearance: none;
    width: 16px;
    height: 16px;
    background: #ffffff;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(0, 0, 0, 0.3);
  }
  
  &::-webkit-slider-track {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
  }
`


const DivineMusicPlayer: React.FC<DivineMusicPlayerProps> = ({ isVisible }) => {
  const [audios, setAudios] = useState<DivineAudio[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [volume, setVolume] = useState(0.7)
  const [isLoading, setIsLoading] = useState(false)
  const [hasAutoPlayed, setHasAutoPlayed] = useState(false) // 跟踪是否已经自动播放过
  
  const audioRef = useRef<HTMLAudioElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // 获取神域BGM数据
  const loadDivineAudios = async () => {
    try {
      setIsLoading(true)
      console.log('🦋 加载神域BGM数据...')
      
      const audios = await getDivineAudios()
      setAudios(audios)
      console.log('✅ 神域BGM数据加载完成:', audios.length, '首')
    } catch (error) {
      console.error('❌ 加载神域BGM失败:', error)
      // 如果加载失败，使用模拟数据作为备用
      const mockAudios: DivineAudio[] = [
        {
          id: 1,
          title: '神域序曲',
          artist: '水月陵',
          url: 'https://sprbweb-src.oss-cn-guangzhou.aliyuncs.com/public/audios/1-%E6%B0%B4%E6%9C%88%E9%99%B5%20-%20Summer%20Pockets.mp3',
          is_published: true
        }
      ]
      setAudios(mockAudios)
    } finally {
      setIsLoading(false)
    }
  }


  // 播放/暂停
  const togglePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!audioRef.current) return
    
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }



  // 音量控制
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
    // 保存音量到localStorage
    localStorage.setItem('divine-music-volume', newVolume.toString())
  }

  // 音频事件处理
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleEnded = () => {
      console.log('🎵 BGM播放结束，开始循环播放')
      // BGM播放结束后自动重新播放
      audio.currentTime = 0
      audio.play().then(() => {
        console.log('🎵 循环播放成功')
        setIsPlaying(true)
      }).catch((error) => {
        console.error('循环播放失败:', error)
        setIsPlaying(false)
      })
    }
    const handleLoadStart = () => setIsLoading(true)
    const handleCanPlay = () => setIsLoading(false)

    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('loadstart', handleLoadStart)
    audio.addEventListener('canplay', handleCanPlay)

    return () => {
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('loadstart', handleLoadStart)
      audio.removeEventListener('canplay', handleCanPlay)
    }
  }, [currentIndex])

  // 加载保存的音量设置
  useEffect(() => {
    const savedVolume = localStorage.getItem('divine-music-volume')
    if (savedVolume) {
      const volumeValue = parseFloat(savedVolume)
      if (volumeValue >= 0 && volumeValue <= 1) {
        setVolume(volumeValue)
      }
    }
  }, [])

  // 设置音量
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  // 当音频源改变时，确保音频继续播放（如果之前正在播放）
  useEffect(() => {
    const audio = audioRef.current
    const currentAudio = audios[currentIndex]
    if (!audio || !currentAudio) return

    const wasPlaying = isPlaying
    audio.src = currentAudio.url
    audio.load() // 重新加载音频源
    
    if (wasPlaying) {
      audio.play().catch(console.error)
    }
  }, [audios, currentIndex, isPlaying])

  // 初始化音频源
  useEffect(() => {
    const audio = audioRef.current
    const currentAudio = audios[currentIndex]
    if (!audio || !currentAudio) return

    audio.src = currentAudio.url
    audio.load()
  }, [audios, currentIndex])

  // 点击外部关闭面板
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node) && 
          !(event.target as Element).closest('[data-divine-player-button]')) {
        setIsPanelOpen(false)
      }
    }

    if (isPanelOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isPanelOpen])

  // 组件挂载时加载数据
  useEffect(() => {
    if (isVisible) {
      loadDivineAudios()
    }
  }, [isVisible])

  // 当播放器可见且有音频数据时，自动开始播放（仅一次）
  useEffect(() => {
    if (isVisible && audios.length > 0 && !isPlaying && !hasAutoPlayed) {
      // 延迟一点时间确保音频元素已准备好
      const timer = setTimeout(() => {
        if (audioRef.current) {
          console.log('🎵 神域BGM自动播放开始')
          audioRef.current.play().catch(console.error)
          setIsPlaying(true)
          setHasAutoPlayed(true) // 标记已经自动播放过
        }
      }, 500)
      
      return () => clearTimeout(timer)
    }
  }, [isVisible, audios.length, isPlaying, hasAutoPlayed])

  const currentAudio = audios[currentIndex]
  
  // 调试信息
  console.log('🎵 播放状态:', { 
    isPlaying, 
    currentAudio: currentAudio?.title 
  })

  if (!isVisible) return null

  return (
    <>
      <PlayerContainer>
        {/* 展开的播放器面板 */}
        <AnimatePresence>
          {isPanelOpen && currentAudio && (
            <PlayerPanel
              ref={panelRef}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
            {/* 头部 - 播放按钮在左上角 */}
            <PlayerHeader>
              <PlayPauseButton
                onClick={togglePlayPause}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {isPlaying ? '⏸' : '▶'}
              </PlayPauseButton>
            </PlayerHeader>



            {/* 音量控制 */}
            <VolumeArea>
              <VolumeIcon>🔊</VolumeIcon>
              <VolumeSlider
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
              />
            </VolumeArea>

          </PlayerPanel>
        )}
      </AnimatePresence>
      
        {/* 音频元素 - 移到面板外部，确保面板关闭时音频继续播放 */}
        <audio
          ref={audioRef}
          preload="metadata"
          loop
          style={{ display: 'none' }}
        />
      </PlayerContainer>
      
      {/* 圆形播放按钮 - 独立于PlayerContainer，固定在右下角 */}
      <PlayButton
        isPlaying={isPlaying}
        onClick={() => setIsPanelOpen(!isPanelOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 1.05 }}
        data-divine-player-button
      />
    </>
  )
}

export default DivineMusicPlayer