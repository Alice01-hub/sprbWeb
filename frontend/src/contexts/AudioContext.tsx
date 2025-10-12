import React, { createContext, useContext, useRef, useState, useCallback } from 'react'

// 音频管理上下文接口
interface AudioContextType {
  // 神域BGM控制
  divineAudioRef: React.RefObject<HTMLAudioElement>
  isDivinePlaying: boolean
  pauseDivineAudio: () => void
  resumeDivineAudio: () => void
  
  // 七影蝶音频控制
  memoryAudioRef: React.RefObject<HTMLAudioElement>
  isMemoryPlaying: boolean
  playMemoryAudio: (audioUrl: string) => void
  pauseMemoryAudio: () => void
  stopMemoryAudio: () => void
  
  // 音频协调状态
  isAnyAudioPlaying: boolean
  currentPlayingType: 'divine' | 'memory' | null
  
  // 音频状态管理
  isMemoryCardOpen: boolean
  setMemoryCardOpen: (isOpen: boolean) => void
  
  // 播放位置管理
  updateDivineCurrentTime: (currentTime: number) => void
  resetDivineCurrentTime: () => void
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

// 音频管理提供者组件
export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 音频元素引用
  const divineAudioRef = useRef<HTMLAudioElement>(null)
  const memoryAudioRef = useRef<HTMLAudioElement>(null)
  
  // 播放状态
  const [isDivinePlaying, setIsDivinePlaying] = useState(false)
  const [isMemoryPlaying, setIsMemoryPlaying] = useState(false)
  const [currentPlayingType, setCurrentPlayingType] = useState<'divine' | 'memory' | null>(null)
  const [isMemoryCardOpen, setIsMemoryCardOpen] = useState(false)
  
  // 播放位置存储
  const [divineCurrentTime, setDivineCurrentTime] = useState(() => {
    const savedTime = localStorage.getItem('divine-bgm-current-time')
    return savedTime ? parseFloat(savedTime) : 0
  })
  
  // 计算是否有任何音频在播放
  const isAnyAudioPlaying = isDivinePlaying || isMemoryPlaying
  
  // 更新神域BGM播放位置
  const updateDivineCurrentTime = useCallback((currentTime: number) => {
    setDivineCurrentTime(currentTime)
    localStorage.setItem('divine-bgm-current-time', currentTime.toString())
  }, [])
  
  // 重置神域BGM播放位置
  const resetDivineCurrentTime = useCallback(() => {
    setDivineCurrentTime(0)
    localStorage.removeItem('divine-bgm-current-time')
  }, [])
  
  // 暂停神域BGM
  const pauseDivineAudio = useCallback(() => {
    if (divineAudioRef.current && !divineAudioRef.current.paused) {
      // 保存当前播放位置
      const currentTime = divineAudioRef.current.currentTime
      setDivineCurrentTime(currentTime)
      localStorage.setItem('divine-bgm-current-time', currentTime.toString())
      
      divineAudioRef.current.pause()
      setIsDivinePlaying(false)
      if (currentPlayingType === 'divine') {
        setCurrentPlayingType(null)
      }
      console.log('🎵 神域BGM已暂停，播放位置已保存:', currentTime)
    }
  }, [currentPlayingType])
  
  // 恢复神域BGM播放
  const resumeDivineAudio = useCallback(() => {
    if (divineAudioRef.current) {
      const audio = divineAudioRef.current
      
      // 如果七影蝶音频正在播放，先停止它
      if (isMemoryPlaying) {
        if (memoryAudioRef.current) {
          memoryAudioRef.current.pause()
          memoryAudioRef.current.currentTime = 0
          setIsMemoryPlaying(false)
          setCurrentPlayingType(null)
          console.log('🦋 七影蝶音频已停止')
        }
      }
      
      // 先暂停音频，确保可以设置播放位置
      const wasPlaying = !audio.paused
      if (wasPlaying) {
        audio.pause()
      }
      
      // 设置播放位置到保存的位置
      console.log('🎵 设置播放位置到:', divineCurrentTime, '秒')
      audio.currentTime = divineCurrentTime
      
      // 延迟一点时间确保播放位置设置成功，然后开始播放
      setTimeout(() => {
        // 再次确认播放位置
        if (Math.abs(audio.currentTime - divineCurrentTime) > 0.5) {
          console.log('🎵 播放位置不准确，重新设置:', divineCurrentTime)
          audio.currentTime = divineCurrentTime
        }
        
        // 播放神域BGM
        audio.play().then(() => {
          setIsDivinePlaying(true)
          setCurrentPlayingType('divine')
          console.log('🎵 神域BGM已恢复播放，从位置:', audio.currentTime, '秒')
        }).catch((error) => {
          if (error.name === 'NotAllowedError') {
            console.log('🎵 浏览器阻止自动播放，等待用户交互')
            // 尝试通过用户交互触发播放
            const tryPlayOnInteraction = () => {
              if (divineAudioRef.current) {
                divineAudioRef.current.currentTime = divineCurrentTime
                divineAudioRef.current.play().then(() => {
                  setIsDivinePlaying(true)
                  setCurrentPlayingType('divine')
                  console.log('🎵 用户交互后神域BGM开始播放，位置:', divineAudioRef.current?.currentTime)
                  document.removeEventListener('click', tryPlayOnInteraction)
                  document.removeEventListener('keydown', tryPlayOnInteraction)
                }).catch(() => {
                  // 忽略错误，继续等待用户交互
                })
              }
            }
            document.addEventListener('click', tryPlayOnInteraction)
            document.addEventListener('keydown', tryPlayOnInteraction)
          } else {
            console.error('🎵 恢复神域BGM播放失败:', error)
          }
        })
      }, 100) // 延迟100ms确保播放位置设置成功
    }
  }, [isMemoryPlaying, divineCurrentTime])
  
  // 停止七影蝶音频
  const stopMemoryAudio = useCallback(() => {
    if (memoryAudioRef.current) {
      memoryAudioRef.current.pause()
      memoryAudioRef.current.currentTime = 0 // 重置播放位置
      setIsMemoryPlaying(false)
      setCurrentPlayingType(null)
      console.log('🦋 七影蝶音频已停止')
      
      // 延迟一点时间后恢复神域BGM
      setTimeout(() => {
        resumeDivineAudio()
      }, 500)
    }
  }, [resumeDivineAudio])
  
  // 设置七影蝶信息框状态
  const setMemoryCardOpen = useCallback((isOpen: boolean) => {
    setIsMemoryCardOpen(isOpen)
    
    // 如果关闭信息框且七影蝶音频正在播放，则停止播放
    if (!isOpen && isMemoryPlaying) {
      if (memoryAudioRef.current) {
        memoryAudioRef.current.pause()
        memoryAudioRef.current.currentTime = 0 // 重置播放位置
        setIsMemoryPlaying(false)
        setCurrentPlayingType(null)
        console.log('🦋 信息框关闭，七影蝶音频已停止')
        
        // 延迟一点时间后恢复神域BGM
        setTimeout(() => {
          resumeDivineAudio()
        }, 500)
      }
    }
  }, [isMemoryPlaying, resumeDivineAudio])
  
  // 播放七影蝶音频
  const playMemoryAudio = useCallback((audioUrl: string) => {
    // 只有在信息框打开时才允许播放
    if (!isMemoryCardOpen) {
      console.log('🦋 信息框未打开，无法播放七影蝶音频')
      return
    }
    
    if (!memoryAudioRef.current) return
    
    // 如果神域BGM正在播放，先暂停它
    if (isDivinePlaying) {
      pauseDivineAudio()
    }
    
    // 只有在音频源不同时才重新设置
    if (memoryAudioRef.current.src !== audioUrl) {
      memoryAudioRef.current.src = audioUrl
      memoryAudioRef.current.load()
    }
    
    // 播放音频
    memoryAudioRef.current.play().then(() => {
      setIsMemoryPlaying(true)
      setCurrentPlayingType('memory')
      console.log('🦋 七影蝶音频开始播放:', audioUrl)
    }).catch((error) => {
      console.error('🦋 七影蝶音频播放失败:', error)
    })
  }, [isDivinePlaying, pauseDivineAudio, isMemoryCardOpen])
  
  // 暂停七影蝶音频（不会自动恢复BGM，保持用户控制）
  const pauseMemoryAudio = useCallback(() => {
    if (memoryAudioRef.current && !memoryAudioRef.current.paused) {
      memoryAudioRef.current.pause()
      setIsMemoryPlaying(false)
      setCurrentPlayingType(null)
      console.log('🦋 七影蝶音频已暂停（保持断点）')
    }
  }, [])
  
  // 监听七影蝶音频播放结束事件
  const handleMemoryAudioEnded = useCallback(() => {
    setIsMemoryPlaying(false)
    setCurrentPlayingType(null)
    console.log('🦋 七影蝶音频播放结束，准备恢复神域BGM')
    
    // 延迟一点时间后恢复神域BGM
    setTimeout(() => {
      resumeDivineAudio()
    }, 500)
  }, [resumeDivineAudio])
  
  // 监听神域BGM播放状态变化
  const handleDivineAudioPlay = useCallback(() => {
    setIsDivinePlaying(true)
    setCurrentPlayingType('divine')
  }, [])
  
  const handleDivineAudioPause = useCallback(() => {
    setIsDivinePlaying(false)
    if (currentPlayingType === 'divine') {
      setCurrentPlayingType(null)
    }
  }, [currentPlayingType])
  
  const contextValue: AudioContextType = {
    divineAudioRef,
    isDivinePlaying,
    pauseDivineAudio,
    resumeDivineAudio,
    memoryAudioRef,
    isMemoryPlaying,
    playMemoryAudio,
    pauseMemoryAudio,
    stopMemoryAudio,
    isAnyAudioPlaying,
    currentPlayingType,
    isMemoryCardOpen,
    setMemoryCardOpen,
    updateDivineCurrentTime,
    resetDivineCurrentTime
  }
  
  return (
    <AudioContext.Provider value={contextValue}>
      {children}
      
      {/* 隐藏的音频元素 */}
      <audio
        ref={memoryAudioRef}
        style={{ display: 'none' }}
        preload="metadata"
        onEnded={handleMemoryAudioEnded}
        onError={(e) => console.error('七影蝶音频播放错误:', e)}
      />
    </AudioContext.Provider>
  )
}

// 使用音频上下文的Hook
export const useAudio = (): AudioContextType => {
  const context = useContext(AudioContext)
  if (context === undefined) {
    throw new Error('useAudio必须在AudioProvider内部使用')
  }
  return context
}

export default AudioContext
