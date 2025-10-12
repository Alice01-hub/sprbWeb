import React, { useState, useEffect, useRef, useCallback } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { getDivineAudios } from '../services/divineAudioService'
import { useAudio } from '../contexts/AudioContext'

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
  min-height: 225px; /* 改为最小高度，允许内容扩展 */
  background-image: url('https://sprbweb-src.oss-cn-guangzhou.aliyuncs.com/public/images/divineRealm/%E7%A5%9E%E5%9F%9F%E9%9F%B3%E9%A2%91%E6%92%AD%E6%94%BE%E5%99%A8%E8%83%8C%E6%99%AF%E5%9B%BE.gif');
  background-size: cover;
  background-position: center top; /* 背景图片定位到顶部，组件下移 */
  background-repeat: no-repeat;
  border-radius: 15px;
  padding: 15px;
  box-shadow: 
    0 15px 40px rgba(0, 0, 0, 0.6),
    0 0 30px rgba(135, 206, 235, 0.2);
  border: 1px solid rgba(135, 206, 235, 0.3);
  position: relative;
  z-index: 5; /* 面板层级低于按钮 */
  overflow: visible; /* 改为visible，确保进度条不被裁剪 */
  
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
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
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
`

const VolumeSlider = styled.input`
  flex: 1;
  height: 6px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
  outline: none;
  
  &::-webkit-slider-thumb {
    appearance: none;
    width: 16px;
    height: 16px;
    background: #ffffff;
    border-radius: 50%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(0, 0, 0, 0.3);
  }
  
  &::-webkit-slider-track {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
  }
`

// 进度条区域样式
const ProgressArea = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
`

// 时间显示样式
const TimeDisplay = styled.span`
  font-size: 11px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  min-width: 35px;
  text-align: center;
`

// 进度条样式
const ProgressSlider = styled.input`
  flex: 1;
  height: 6px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
  outline: none;
  cursor: pointer;
  
  &::-webkit-slider-thumb {
    appearance: none;
    width: 16px;
    height: 16px;
    background: #ffffff;
    border-radius: 50%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(0, 0, 0, 0.3);
    cursor: pointer;
  }
  
  &::-webkit-slider-track {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
  }
`


const DivineMusicPlayer: React.FC<DivineMusicPlayerProps> = ({ isVisible }) => {
  const [audios, setAudios] = useState<DivineAudio[]>([])
  const [currentIndex, setCurrentIndex] = useState(() => {
    // 从localStorage读取用户上次播放的歌曲索引
    const savedIndex = localStorage.getItem('divine-bgm-current-index')
    return savedIndex ? parseInt(savedIndex) : 0
  })
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [volume, setVolume] = useState(() => {
    // 从localStorage读取用户上次的音量设置
    const savedVolume = localStorage.getItem('divine-music-volume')
    return savedVolume ? parseFloat(savedVolume) : 0.7
  })
  const [isLoading, setIsLoading] = useState(false)
  const [hasAutoPlayed, setHasAutoPlayed] = useState(false) // 跟踪是否已经自动播放过
  const [playedSongs, setPlayedSongs] = useState<Set<number>>(new Set()) // 记录已播放的歌曲ID
  const [remainingSongs, setRemainingSongs] = useState<number[]>([]) // 剩余未播放的歌曲索引
  
  // 播放进度相关状态
  const [currentTime, setCurrentTime] = useState(() => {
    // 从localStorage读取保存的播放位置
    const savedTime = localStorage.getItem('divine-bgm-current-time')
    return savedTime ? parseFloat(savedTime) : 0
  })
  const [duration, setDuration] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  
  // 添加初始化状态管理，参考普通播放器
  const isInitializedRef = useRef(false)
  const shouldAutoPlayRef = useRef(false)
  
  // 自定义的当前索引设置函数，同时保存到本地存储
  const setCurrentIndexWithCache = useCallback((index: number) => {
    setCurrentIndex(index)
    // 保存到localStorage
    localStorage.setItem('divine-bgm-current-index', index.toString())
  }, [])

  // 清理神域播放器播放偏好缓存
  const clearDivinePlaybackPreferences = useCallback(() => {
    localStorage.removeItem('divine-bgm-current-index')
    localStorage.removeItem('divine-music-volume')
    localStorage.removeItem('divine-bgm-current-time')
    // 重置为默认值
    setCurrentIndex(0)
    setVolume(0.7)
    setCurrentTime(0)
    console.log('🎵 神域播放器播放偏好已重置')
  }, [])
  
  const panelRef = useRef<HTMLDivElement>(null)
  
  // 使用音频管理上下文
  const { 
    divineAudioRef, 
    isDivinePlaying, 
    pauseDivineAudio, 
    resumeDivineAudio,
    updateDivineCurrentTime,
    resetDivineCurrentTime
  } = useAudio()

  // 时间格式化函数
  const formatTime = (time: number): string => {
    if (isNaN(time) || !isFinite(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  // 进度条变化处理
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value)
    setCurrentTime(newTime)
    
    if (divineAudioRef.current) {
      divineAudioRef.current.currentTime = newTime
      updateDivineCurrentTime(newTime)
      console.log('🎵 进度条拖拽到:', newTime, '秒')
    }
  }

  // 进度条拖拽开始
  const handleProgressMouseDown = () => {
    setIsDragging(true)
  }

  // 进度条拖拽结束
  const handleProgressMouseUp = () => {
    setIsDragging(false)
    // 拖拽结束后，确保播放位置同步
    if (divineAudioRef.current) {
      const currentAudioTime = divineAudioRef.current.currentTime
      setCurrentTime(currentAudioTime)
      updateDivineCurrentTime(currentAudioTime)
      console.log('🎵 进度条拖拽结束，最终位置:', currentAudioTime, '秒')
    }
  }

  // 获取神域BGM数据
  const loadDivineAudios = async () => {
    try {
      setIsLoading(true)
      console.log('🦋 加载神域BGM数据...')
      
      const audios = await getDivineAudios()
      setAudios(audios)
      
      // 初始化随机播放状态
      if (audios.length > 0) {
        const allSongs = Array.from({ length: audios.length }, (_, i) => i)
        setRemainingSongs(allSongs)
        setPlayedSongs(new Set())
      }
      
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

  // 获取随机播放的下一首歌曲 - 参考普通播放器的实现
  const getRandomNextSong = useCallback((): number => {
    if (audios.length === 0) return 0
    
    if (remainingSongs.length === 0) {
      // 如果所有歌曲都播放过了，重新开始随机播放
      const allSongs = Array.from({ length: audios.length }, (_, i) => i)
      setRemainingSongs(allSongs)
      setPlayedSongs(new Set())
      return allSongs[Math.floor(Math.random() * allSongs.length)]
    }
    
    // 从剩余歌曲中随机选择
    const randomIndex = Math.floor(Math.random() * remainingSongs.length)
    const nextIndex = remainingSongs[randomIndex]
    
    // 更新剩余歌曲列表
    const newRemainingSongs = remainingSongs.filter((_, index) => index !== randomIndex)
    setRemainingSongs(newRemainingSongs)
    
    // 添加到已播放列表
    setPlayedSongs(prev => new Set([...prev, audios[nextIndex].id]))
    
    console.log('🎵 随机选择下一首歌曲:', audios[nextIndex].title)
    return nextIndex
  }, [audios, remainingSongs])


  // 播放/暂停 - 简化逻辑，参考普通播放器
  const togglePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!divineAudioRef.current) return
    
    if (isDivinePlaying) {
      pauseDivineAudio()
    } else {
      // AudioContext会自动处理冲突检测和恢复播放
      resumeDivineAudio()
    }
  }



  // 音量控制
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (divineAudioRef.current) {
      divineAudioRef.current.volume = newVolume
    }
    // 保存音量到localStorage
    localStorage.setItem('divine-music-volume', newVolume.toString())
  }

  // 音频事件处理
  useEffect(() => {
    const audio = divineAudioRef.current
    if (!audio) return

    const handleEnded = () => {
      console.log('🎵 BGM播放结束，自动播放下一首歌曲')
      
      // 随机选择下一首歌曲
      const nextIndex = getRandomNextSong()
      setCurrentIndexWithCache(nextIndex)
      
      // 重置播放位置，因为要播放新歌曲
      resetDivineCurrentTime()
      
      // 设置自动播放标志，让初始化逻辑处理播放
      shouldAutoPlayRef.current = true
      isInitializedRef.current = false // 重置初始化标志
      
      console.log('🎵 准备播放下一首:', audios[nextIndex]?.title)
    }
    
    const handleLoadStart = () => setIsLoading(true)
    const handleCanPlay = () => setIsLoading(false)
    
    // 音频元数据加载完成
    const handleLoadedMetadata = () => {
      const audioDuration = audio.duration || 0
      setDuration(audioDuration)
      console.log('🎵 音频元数据加载完成，时长:', audioDuration, '秒')
    }
    
    // 播放位置跟踪 - 参考普通播放器的实现
    const handleTimeUpdate = () => {
      const currentAudioTime = audio.currentTime || 0
      setCurrentTime(currentAudioTime)
      
      // 每5秒保存一次播放位置，避免频繁写入localStorage
      if (Math.floor(currentAudioTime) % 5 === 0) {
        updateDivineCurrentTime(currentAudioTime)
      }
    }

    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('loadstart', handleLoadStart)
    audio.addEventListener('canplay', handleCanPlay)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('timeupdate', handleTimeUpdate)

    return () => {
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('loadstart', handleLoadStart)
      audio.removeEventListener('canplay', handleCanPlay)
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [currentIndex, audios, updateDivineCurrentTime, resetDivineCurrentTime, isDragging, getRandomNextSong, setCurrentIndexWithCache])

  // 设置音量
  useEffect(() => {
    if (divineAudioRef.current) {
      divineAudioRef.current.volume = volume
    }
  }, [volume])

  // 同步AudioContext中的播放位置到组件状态 - 简化逻辑
  useEffect(() => {
    const audio = divineAudioRef.current
    if (audio && !isDragging) {
      // 当音频元素存在且不在拖拽状态时，同步播放位置
      const savedTime = localStorage.getItem('divine-bgm-current-time')
      if (savedTime) {
        const time = parseFloat(savedTime)
        setCurrentTime(time)
        // 如果音频已加载且不在播放状态，设置播放位置
        if (audio.readyState >= 2 && audio.paused) {
          audio.currentTime = time
        }
      }
    }
  }, [isDragging, divineAudioRef])

  // 初始化音频源 - 参考普通播放器的实现
  useEffect(() => {
    const audio = divineAudioRef.current
    const currentAudio = audios[currentIndex]
    if (!audio || !currentAudio) return

    // 只有在音频源不同或未初始化时才重新加载
    if (!isInitializedRef.current || audio.src !== currentAudio.url) {
      audio.src = currentAudio.url
      audio.volume = volume
      audio.load()
      isInitializedRef.current = true
      console.log('🎵 神域BGM初始化完成:', currentAudio.title)
      
      // 如果是从缓存恢复的播放位置，设置音频时间
      const savedTime = localStorage.getItem('divine-bgm-current-time')
      if (savedTime) {
        const time = parseFloat(savedTime)
        // 延迟设置，确保音频已加载
        setTimeout(() => {
          if (audio.readyState >= 2) { // HAVE_CURRENT_DATA
            audio.currentTime = time
            console.log('🎵 从缓存恢复神域BGM播放位置:', time)
          }
        }, 100)
      }
    }
  }, [audios, currentIndex, volume])

  // 处理自动播放逻辑 - 参考普通播放器
  useEffect(() => {
    if (shouldAutoPlayRef.current && audios.length > 0 && isInitializedRef.current) {
      shouldAutoPlayRef.current = false
      // 延迟播放确保音频完全加载
      setTimeout(() => {
        resumeDivineAudio()
      }, 100)
    }
  }, [audios.length, currentIndex, resumeDivineAudio])

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

  // 当播放器可见且有音频数据时，随机选择并自动开始播放（仅一次）
  useEffect(() => {
    if (isVisible && audios.length > 0 && !isDivinePlaying && !hasAutoPlayed) {
      // 随机选择第一首歌曲
      const randomIndex = getRandomNextSong()
      setCurrentIndexWithCache(randomIndex)
      console.log('🎵 准备自动播放神域BGM:', audios[randomIndex]?.title)
      
      // 标记已经触发自动播放逻辑
      setHasAutoPlayed(true)
      
      // 设置自动播放标志，让初始化逻辑处理播放
      shouldAutoPlayRef.current = true
    }
  }, [isVisible, audios.length, isDivinePlaying, hasAutoPlayed])

  const currentAudio = audios[currentIndex]
  
  // 优化调试信息 - 只在重要状态变化时打印
  const prevStateRef = useRef<{isDivinePlaying: boolean, currentAudio: string | undefined, duration: number, currentTime: number}>({
    isDivinePlaying: false,
    currentAudio: undefined,
    duration: 0,
    currentTime: 0
  })
  
  const currentState = {
    isDivinePlaying,
    currentAudio: currentAudio?.title,
    duration,
    currentTime
  }
  
  // 只在重要状态变化时才打印日志（减少频繁打印）
  if (prevStateRef.current.isDivinePlaying !== currentState.isDivinePlaying || 
      prevStateRef.current.currentAudio !== currentState.currentAudio ||
      prevStateRef.current.duration !== currentState.duration ||
      Math.floor(prevStateRef.current.currentTime / 5) !== Math.floor(currentState.currentTime / 5)) { // 每5秒打印一次时间变化
    console.log('🎵 播放状态变化:', currentState)
    prevStateRef.current = currentState
  }

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
                {isDivinePlaying ? '⏸' : '▶'}
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

            {/* 播放进度控制 */}
            <ProgressArea>
              <TimeDisplay>{formatTime(currentTime)}</TimeDisplay>
              <ProgressSlider
                type="range"
                min="0"
                max={duration || 100}
                step="1"
                value={currentTime}
                onChange={handleProgressChange}
                onMouseDown={handleProgressMouseDown}
                onMouseUp={handleProgressMouseUp}
                style={{ 
                  opacity: 1,
                  cursor: 'pointer'
                }}
                title={`进度条: ${currentTime}/${duration}`}
              />
              <TimeDisplay>{formatTime(duration)}</TimeDisplay>
            </ProgressArea>

          </PlayerPanel>
        )}
      </AnimatePresence>
      
        {/* 音频元素 - 移到面板外部，确保面板关闭时音频继续播放 */}
        <audio
          ref={divineAudioRef}
          preload="metadata"
          style={{ display: 'none' }}
        />
      </PlayerContainer>
      
      {/* 圆形播放按钮 - 独立于PlayerContainer，固定在右下角 */}
      <PlayButton
        isPlaying={isDivinePlaying}
        onClick={() => setIsPanelOpen(!isPanelOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 1.05 }}
        data-divine-player-button
      />
    </>
  )
}

export default DivineMusicPlayer