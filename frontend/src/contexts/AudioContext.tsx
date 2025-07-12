import React, { createContext, useContext, useState, useRef, useEffect, ReactNode, useCallback } from 'react'

export interface Track {
  id: string
  name: string
  src: string
}

export type PlayMode = 'sequence' | 'random' | 'single-loop'

interface AudioContextType {
  isPlaying: boolean
  volume: number
  currentTrack: Track | null
  currentTrackIndex: number
  playlist: Track[]
  playMode: PlayMode
  togglePlay: () => void
  setVolume: (volume: number) => void
  nextTrack: () => void
  previousTrack: () => void
  selectTrack: (trackIndex: number) => void
  setPlayMode: (mode: PlayMode) => void
  audioRef: React.RefObject<HTMLAudioElement>
  refreshPlaylist: () => void
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export const useAudio = () => {
  const context = useContext(AudioContext)
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider')
  }
  return context
}

interface AudioProviderProps {
  children: ReactNode
}

// 默认播放列表（作为备选）
const defaultPlaylist: Track[] = [
  {
    id: 'summer-pockets',
    name: 'Summer Pockets - 水月陵',
    src: '/audio/水月陵 - Summer Pockets.mp3'
  },
  {
    id: 'sea-you-me',
    name: 'Sea, You & Me - 麻枝准',
    src: '/audio/麻枝准 - Sea, You & Me.mp3'
  },
  {
    id: 'alcatale',
    name: 'アルカテイル - 鈴木このみ',
    src: '/audio/鈴木このみ,VISUAL ARTS  Key - アルカテイル.mp3'
  },
  {
    id: 'yoru-wa-mijikaku',
    name: '夜は短く、空は遠くて… - 水月陵',
    src: '/audio/水月陵 - 夜は短く、空は遠くて….wav'
  }
]

export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolumeState] = useState(0.7)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [playlist, setPlaylist] = useState<Track[]>(defaultPlaylist)
  const [playMode, setPlayMode] = useState<PlayMode>('sequence')
  const [playedIndices, setPlayedIndices] = useState<number[]>([])

  const currentTrack = playlist[currentTrackIndex] || null

  // 动态加载播放列表
  const loadPlaylist = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/api/audio-files')
      if (response.ok) {
        const audioFiles = await response.json()
        if (audioFiles.length > 0) {
          setPlaylist(audioFiles)
          console.log('动态播放列表已加载:', audioFiles)
        } else {
          console.log('使用默认播放列表')
        }
      } else {
        console.log('无法获取音频文件，使用默认播放列表')
      }
    } catch (error) {
      console.error('加载播放列表失败:', error)
      console.log('使用默认播放列表')
    }
  }, [])

  // 刷新播放列表
  const refreshPlaylist = useCallback(() => {
    loadPlaylist()
  }, [loadPlaylist])

  // 初始化播放列表
  useEffect(() => {
    loadPlaylist()
  }, [loadPlaylist])

  // 获取下一首歌的索引
  const getNextTrackIndex = useCallback(() => {
    if (playMode === 'single-loop') {
      return currentTrackIndex
    } else if (playMode === 'random') {
      // 随机播放模式
      const availableIndices = playlist
        .map((_, index) => index)
        .filter(index => !playedIndices.includes(index))
      
      if (availableIndices.length === 0) {
        // 所有歌曲都播放过了，重置已播放列表
        setPlayedIndices([])
        return Math.floor(Math.random() * playlist.length)
      }
      
      const randomIndex = Math.floor(Math.random() * availableIndices.length)
      return availableIndices[randomIndex]
    } else {
      // 顺序播放模式
      return (currentTrackIndex + 1) % playlist.length
    }
  }, [currentTrackIndex, playMode, playlist.length, playedIndices])

  // 获取上一首歌的索引
  const getPreviousTrackIndex = useCallback(() => {
    if (playMode === 'single-loop') {
      return currentTrackIndex
    } else if (playMode === 'random') {
      // 随机模式下的上一首：从已播放列表中获取
      if (playedIndices.length > 1) {
        return playedIndices[playedIndices.length - 2]
      }
      return Math.floor(Math.random() * playlist.length)
    } else {
      // 顺序播放模式
      return currentTrackIndex === 0 ? playlist.length - 1 : currentTrackIndex - 1
    }
  }, [currentTrackIndex, playMode, playlist.length, playedIndices])

  // 切换到下一首
  const nextTrack = useCallback(() => {
    if (playlist.length === 0) return
    
    const nextIndex = getNextTrackIndex()
    setCurrentTrackIndex(nextIndex)
    if (playMode === 'random') {
      setPlayedIndices(prev => [...prev, nextIndex])
    }
    
    // 确保在切换歌曲后继续播放
    setTimeout(() => {
      if (audioRef.current && isPlaying) {
        audioRef.current.play().catch(console.error)
      }
    }, 100)
  }, [getNextTrackIndex, playMode, isPlaying, playlist.length])

  // 切换到上一首
  const previousTrack = useCallback(() => {
    if (playlist.length === 0) return
    
    const prevIndex = getPreviousTrackIndex()
    setCurrentTrackIndex(prevIndex)
    
    // 确保在切换歌曲后继续播放
    setTimeout(() => {
      if (audioRef.current && isPlaying) {
        audioRef.current.play().catch(console.error)
      }
    }, 100)
  }, [getPreviousTrackIndex, isPlaying, playlist.length])

  // 选择特定曲目
  const selectTrack = useCallback((trackIndex: number) => {
    if (trackIndex >= 0 && trackIndex < playlist.length) {
      setCurrentTrackIndex(trackIndex)
      if (playMode === 'random') {
        setPlayedIndices(prev => [...prev, trackIndex])
      }
      
      // 选择歌曲后自动播放
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play().then(() => {
            setIsPlaying(true)
          }).catch(console.error)
        }
      }, 100)
    }
  }, [playlist.length, playMode])

  // 音频播放控制
  useEffect(() => {
    if (audioRef.current && currentTrack) {
      const audio = audioRef.current
      
      // 更新音频源
      if (audio.src !== location.origin + currentTrack.src) {
        audio.src = currentTrack.src
      }
      
      audio.volume = volume
      
      // 根据播放模式设置循环
      audio.loop = playMode === 'single-loop'
      
      // 如果正在播放状态，则播放新歌曲
      if (isPlaying) {
        audio.play().catch(error => {
          console.error('播放失败:', error)
          setIsPlaying(false)
        })
      }
    }
  }, [currentTrack, volume, playMode])

  // 处理音频结束事件
  const handleAudioEnded = useCallback(() => {
    console.log('音频播放结束，当前播放模式:', playMode)
    
    if (playMode === 'single-loop') {
      // 单曲循环模式下，音频会自动重播（因为设置了loop=true）
      console.log('单曲循环模式，自动重播')
      return
    }
    
    // 其他模式下，切换到下一首
    console.log('切换到下一首')
    nextTrack()
  }, [playMode, nextTrack])

  // 处理播放/暂停
  const togglePlay = useCallback(() => {
    if (audioRef.current && currentTrack) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true)
        }).catch((error) => {
          console.error('播放失败:', error)
        })
      }
    }
  }, [isPlaying, currentTrack])

  // 设置音量
  const setVolume = useCallback((newVolume: number) => {
    setVolumeState(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }, [])

  const handlePlay = () => setIsPlaying(true)
  const handlePause = () => setIsPlaying(false)
  const handleLoadStart = () => console.log('开始加载音频:', currentTrack?.name)
  const handleLoadedData = () => console.log('音频数据加载完成:', currentTrack?.name)
  const handleError = (error: any) => {
    console.error('音频加载错误:', error)
    setIsPlaying(false)
  }

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        volume,
        currentTrack,
        currentTrackIndex,
        playlist,
        playMode,
        togglePlay,
        setVolume,
        nextTrack,
        previousTrack,
        selectTrack,
        setPlayMode,
        audioRef,
        refreshPlaylist
      }}
    >
      {children}
      <audio
        ref={audioRef}
        onPlay={handlePlay}
        onPause={handlePause}
        onEnded={handleAudioEnded}
        onLoadStart={handleLoadStart}
        onLoadedData={handleLoadedData}
        onError={handleError}
        style={{ display: 'none' }}
        preload="metadata"
      />
    </AudioContext.Provider>
  )
} 