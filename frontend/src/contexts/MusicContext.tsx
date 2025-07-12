import React, { createContext, useContext, useState, useRef, useEffect, ReactNode, useCallback } from 'react'

export interface Track {
  id: string
  name: string
  artist: string
  src: string
  duration?: number
  album?: string
  cover?: string
}

export type PlayMode = 'list' | 'single'

interface MusicContextType {
  // 播放状态
  isPlaying: boolean
  isPaused: boolean
  currentTime: number
  duration: number
  volume: number
  
  // 播放列表和当前歌曲
  playlist: Track[]
  currentTrack: Track | null
  currentIndex: number
  playMode: PlayMode
  
  // 控制方法
  play: () => void
  pause: () => void
  togglePlay: () => void
  next: () => void
  prev: () => void
  seek: (time: number) => void
  setVolume: (volume: number) => void
  selectTrack: (index: number) => void
  setPlayMode: (mode: PlayMode) => void
  
  // 播放器引用
  audioRef: React.RefObject<HTMLAudioElement>
  
  // 界面状态
  isPlayerOpen: boolean
  setPlayerOpen: (open: boolean) => void
}

const MusicContext = createContext<MusicContextType | undefined>(undefined)

export const useMusic = () => {
  const context = useContext(MusicContext)
  if (context === undefined) {
    throw new Error('useMusic must be used within a MusicProvider')
  }
  return context
}

interface MusicProviderProps {
  children: ReactNode
}

// 默认播放列表
const defaultPlaylist: Track[] = [
  {
    id: 'summer-pockets',
    name: 'Summer Pockets',
    artist: '水月陵',
    src: '/audio/水月陵 - Summer Pockets.mp3',
    album: 'Summer Pockets OST'
  },
  {
    id: 'sea-you-me',
    name: 'Sea, You & Me',
    artist: '麻枝准',
    src: '/audio/麻枝准 - Sea, You & Me.mp3',
    album: 'Summer Pockets OST'
  },
  {
    id: 'alcatale',
    name: 'アルカテイル',
    artist: '鈴木このみ',
    src: '/audio/鈴木このみ,VISUAL ARTS  Key - アルカテイル.mp3',
    album: 'Summer Pockets OST'
  },
  {
    id: 'yoru-wa-mijikaku',
    name: '夜は短く、空は遠くて…',
    artist: '水月陵',
    src: '/audio/水月陵 - 夜は短く、空は遠くて….wav',
    album: 'Summer Pockets OST'
  }
]

export const MusicProvider: React.FC<MusicProviderProps> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const playModeRef = useRef<PlayMode>('list')
  const isInitializedRef = useRef(false)
  const shouldAutoPlayRef = useRef(false) // 添加自动播放标志
  
  // 基本状态
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolumeState] = useState(0.7)
  
  // 播放列表状态
  const [playlist, setPlaylist] = useState<Track[]>(defaultPlaylist)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [playMode, setPlayMode] = useState<PlayMode>('list')
  
  // 界面状态
  const [isPlayerOpen, setPlayerOpen] = useState(false)
  
  const currentTrack = playlist[currentIndex] || null

  // 从后端加载播放列表
  const loadPlaylistFromAPI = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:8000/api/music/playlist')
      if (response.ok) {
        const data = await response.json()
        if (data.tracks && data.tracks.length > 0) {
          setPlaylist(data.tracks)
          console.log('从API加载播放列表成功:', data.tracks)
        } else {
          console.log('API返回空播放列表，使用默认播放列表')
        }
      } else {
        console.log('API请求失败，使用默认播放列表')
      }
    } catch (error) {
      console.error('加载播放列表失败:', error)
      console.log('使用默认播放列表')
    }
  }, [])

  // 同步playMode到ref
  useEffect(() => {
    playModeRef.current = playMode
  }, [playMode])

  // 初始化音频
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !currentTrack) return

    // 只有在音频源不同或未初始化时才重新加载
    if (!isInitializedRef.current || audio.src !== location.origin + currentTrack.src) {
      audio.src = currentTrack.src
      audio.volume = volume
      audio.load()
      isInitializedRef.current = true
      console.log('音频初始化完成:', currentTrack.name)
    }
  }, [currentTrack])  // 移除play依赖

  // 单独处理音量设置
  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      audio.volume = volume
    }
  }, [volume])

  // 播放控制函数
  const play = useCallback(async () => {
    const audio = audioRef.current
    if (!audio || !currentTrack) return

    try {
      // 仅在真正切换歌曲时才重新加载，避免因 URL 编码差异导致每次播放都重新加载
      const normalizedAudioSrc = decodeURI(audio.src)
      const expectedSrc = location.origin + currentTrack.src

      if (!normalizedAudioSrc.endsWith(currentTrack.src)) {
        // 实际源与期望源不一致，说明切换了歌曲
        audio.src = currentTrack.src
        audio.load()
        console.log('加载新音频:', currentTrack.name)
        
        // 等待音频加载完成
        await new Promise((resolve) => {
          const handleCanPlay = () => {
            audio.removeEventListener('canplay', handleCanPlay)
            resolve(undefined)
          }
          audio.addEventListener('canplay', handleCanPlay)
        })
      }
      
      await audio.play()
      setIsPlaying(true)
      setIsPaused(false)
      console.log('开始播放:', currentTrack.name, '从位置:', audio.currentTime)
    } catch (error) {
      console.error('播放失败:', error)
      setIsPlaying(false)
      setIsPaused(true)
    }
  }, [currentTrack])

  const pause = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.pause()
    setIsPlaying(false)
    setIsPaused(true)
    console.log('暂停播放')
  }, [])

  const togglePlay = useCallback(() => {
    console.log('togglePlay 被调用，当前状态:', { isPlaying, isPaused })

    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      // 正在播放 -> 暂停
      pause()
    } else {
      // 未播放
      if (isPaused && decodeURI(audio.src).endsWith(currentTrack?.src ?? '')) {
        // 处于暂停状态并且歌曲未切换，直接继续播放
        audio.play().then(() => {
          setIsPlaying(true)
          setIsPaused(false)
          console.log('从暂停位置继续播放:', audio.currentTime)
        }).catch(err => {
          console.error('继续播放失败，尝试重新加载:', err)
          play()
        })
      } else {
        // 其他情况（首次播放或已切换歌曲）
        play()
      }
    }
  }, [isPlaying, isPaused, pause, play, currentTrack])

  // 切换到下一首
  const next = useCallback(() => {
    let nextIndex: number
    
    if (playMode === 'single') {
      nextIndex = currentIndex // 单曲循环
    } else {
      // 列表循环
      nextIndex = (currentIndex + 1) % playlist.length
    }
    
    console.log('切换到下一首:', nextIndex, playlist[nextIndex]?.name)
    setCurrentIndex(nextIndex)
    isInitializedRef.current = false // 重置初始化标志
    shouldAutoPlayRef.current = true // 设置自动播放标志
  }, [currentIndex, playlist.length, playMode])

  // 切换到上一首
  const prev = useCallback(() => {
    let prevIndex: number
    
    if (playMode === 'single') {
      prevIndex = currentIndex // 单曲循环
    } else {
      // 列表循环
      prevIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1
    }
    
    console.log('切换到上一首:', prevIndex, playlist[prevIndex]?.name)
    setCurrentIndex(prevIndex)
    isInitializedRef.current = false // 重置初始化标志
    shouldAutoPlayRef.current = true // 设置自动播放标志
  }, [currentIndex, playlist.length, playMode])

  // 进度跳转
  const seek = useCallback((time: number) => {
    const audio = audioRef.current
    if (!audio) return

    audio.currentTime = time
    setCurrentTime(time)
  }, [])

  // 音量控制
  const setVolume = useCallback((newVolume: number) => {
    setVolumeState(newVolume)
    const audio = audioRef.current
    if (audio) {
      audio.volume = newVolume
    }
  }, [])

  // 选择歌曲
  const selectTrack = useCallback((index: number) => {
    if (index >= 0 && index < playlist.length && index !== currentIndex) {
      console.log('选择歌曲:', index, playlist[index]?.name)
      setCurrentIndex(index)
      isInitializedRef.current = false // 重置初始化标志
      shouldAutoPlayRef.current = true // 设置自动播放标志
    }
  }, [playlist.length, currentIndex])

  // 处理自动播放逻辑
  useEffect(() => {
    if (shouldAutoPlayRef.current && currentTrack && isInitializedRef.current) {
      shouldAutoPlayRef.current = false
      // 延迟播放确保音频完全加载
      setTimeout(() => {
        play()
      }, 100)
    }
  }, [currentTrack, play])

  // 音频事件处理
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0)
    }

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime || 0)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setIsPaused(false)
      
      // 根据播放模式决定下一步操作
      const currentPlayMode = playModeRef.current
      if (currentPlayMode === 'single') {
        // 单曲循环 - 重新播放当前歌曲
        audio.currentTime = 0
        play()
      } else {
        // 列表循环 - 播放下一首
        next()
      }
    }

    const handlePlay = () => {
      setIsPlaying(true)
      setIsPaused(false)
    }

    const handlePause = () => {
      setIsPlaying(false)
      setIsPaused(true)
    }

    const handleError = (e: any) => {
      console.error('音频加载错误:', e)
      setIsPlaying(false)
      setIsPaused(true)
    }

    // 添加事件监听
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('error', handleError)

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('error', handleError)
    }
  }, [play, next])

  // 组件初始化时加载播放列表
  useEffect(() => {
    loadPlaylistFromAPI()
  }, [loadPlaylistFromAPI])

  // 自动播放BGM（延迟启动，避免浏览器阻止）
  useEffect(() => {
    if (playlist.length > 0 && currentTrack && !isPlaying && !isPaused) {
      const timer = setTimeout(() => {
        // 尝试自动播放，如果失败则等待用户交互
        play().catch(() => {
          console.log('自动播放被阻止，等待用户交互')
        })
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [playlist, currentTrack, isPlaying, isPaused, play])

  // 监听用户交互，如果自动播放失败则在用户交互时开始播放
  useEffect(() => {
    const handleUserInteraction = () => {
      if (!isPlaying && !isPaused && currentTrack) {
        play()
        // 移除监听器
        document.removeEventListener('click', handleUserInteraction)
        document.removeEventListener('keydown', handleUserInteraction)
        document.removeEventListener('touchstart', handleUserInteraction)
      }
    }

    if (!isPlaying && !isPaused && currentTrack) {
      document.addEventListener('click', handleUserInteraction)
      document.addEventListener('keydown', handleUserInteraction)
      document.addEventListener('touchstart', handleUserInteraction)
    }

    return () => {
      document.removeEventListener('click', handleUserInteraction)
      document.removeEventListener('keydown', handleUserInteraction)
      document.removeEventListener('touchstart', handleUserInteraction)
    }
  }, [isPlaying, isPaused, currentTrack, play])

  const value = {
    // 播放状态
    isPlaying,
    isPaused,
    currentTime,
    duration,
    volume,
    
    // 播放列表和当前歌曲
    playlist,
    currentTrack,
    currentIndex,
    playMode,
    
    // 控制方法
    play,
    pause,
    togglePlay,
    next,
    prev,
    seek,
    setVolume,
    selectTrack,
    setPlayMode,
    
    // 播放器引用
    audioRef,
    
    // 界面状态
    isPlayerOpen,
    setPlayerOpen
  }

  return (
    <MusicContext.Provider value={value}>
      {children}
      <audio
        ref={audioRef}
        style={{ display: 'none' }}
        preload="metadata"
      />
    </MusicContext.Provider>
  )
} 