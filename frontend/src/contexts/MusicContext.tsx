import React, { createContext, useContext, useState, useRef, useEffect, ReactNode, useCallback } from 'react'
import { fetchAudios, AudioData } from '../services/audioService';

export interface Track {
  id: number
  title: string
  artist: string
  src: string
  duration?: number
  album?: string
  cover?: string
}

export type PlayMode = 'list' | 'single' | 'random'

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

// 将AudioData转换为Track格式
const convertAudioDataToTrack = (audioData: AudioData): Track => ({
  id: audioData.id,
  title: audioData.title,
  artist: audioData.artist,
  src: audioData.src,
  cover: audioData.cover,
  duration: audioData.duration
});

export const MusicProvider: React.FC<MusicProviderProps> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const playModeRef = useRef<PlayMode>('list')
  const isInitializedRef = useRef(false)
  const shouldAutoPlayRef = useRef(false) // 添加自动播放标志
  
  // 基本状态
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [currentTime, setCurrentTime] = useState(() => {
    // 从localStorage读取用户上次的播放位置
    const savedTime = localStorage.getItem('sprb_current_time')
    return savedTime ? parseFloat(savedTime) : 0
  })
  const [duration, setDuration] = useState(0)
  const [volume, setVolumeState] = useState(() => {
    // 从localStorage读取用户上次的音量设置
    const savedVolume = localStorage.getItem('sprb_volume')
    return savedVolume ? parseFloat(savedVolume) : 0.7
  })
  
  // 播放列表状态
  const [playlist, setPlaylist] = useState<Track[]>([])
  const [currentIndex, setCurrentIndex] = useState(() => {
    // 从localStorage读取用户上次播放的歌曲索引
    const savedIndex = localStorage.getItem('sprb_current_index')
    return savedIndex ? parseInt(savedIndex) : 0
  })
  const [playMode, setPlayMode] = useState<PlayMode>(() => {
    // 从localStorage读取用户上次的播放模式偏好
    const savedPlayMode = localStorage.getItem('sprb_play_mode') as PlayMode
    return savedPlayMode && ['list', 'single', 'random'].includes(savedPlayMode) 
      ? savedPlayMode 
      : 'list'
  })
  
  // 随机播放相关状态
  const [playedTracks, setPlayedTracks] = useState<Set<number>>(new Set())
  const [remainingTracks, setRemainingTracks] = useState<number[]>([])
  
  // 界面状态
  const [isPlayerOpen, setPlayerOpen] = useState(false)
  
  const currentTrack = playlist[currentIndex] || null



  // 自定义的播放模式设置函数，同时保存到本地存储
  const setPlayModeWithCache = useCallback((mode: PlayMode) => {
    setPlayMode(mode)
    // 保存到localStorage
    localStorage.setItem('sprb_play_mode', mode)
  }, [])

  // 自定义的当前索引设置函数，同时保存到本地存储
  const setCurrentIndexWithCache = useCallback((index: number) => {
    setCurrentIndex(index)
    // 保存到localStorage
    localStorage.setItem('sprb_current_index', index.toString())
  }, [])

  // 清理用户播放偏好缓存
  const clearPlaybackPreferences = useCallback(() => {
    localStorage.removeItem('sprb_play_mode')
    localStorage.removeItem('sprb_volume')
    localStorage.removeItem('sprb_current_index')
    localStorage.removeItem('sprb_current_time')
    // 重置为默认值
    setPlayMode('list')
    setVolumeState(0.7)
    setCurrentIndex(0)
    setCurrentTime(0)
  }, [])

  // 同步playMode到ref
  useEffect(() => {
    playModeRef.current = playMode
    
    // 当切换到随机播放模式时，初始化随机播放状态
    if (playMode === 'random') {
      const allTracks = Array.from({ length: playlist.length }, (_, i) => i)
      setRemainingTracks(allTracks)
      setPlayedTracks(new Set())
    }
  }, [playMode, playlist.length])

  // 加载音频数据
  useEffect(() => {
    const loadAudioData = async () => {
      console.log('🎵 开始加载音频数据...');
      
      try {
        const audioData = await fetchAudios();
        
        if (audioData.length > 0) {
          const tracks = audioData.map(convertAudioDataToTrack);
          setPlaylist(tracks);
          
          // 初始化随机播放状态
          if (playMode === 'random') {
            const allTracks = Array.from({ length: tracks.length }, (_, i) => i)
            setRemainingTracks(allTracks)
            setPlayedTracks(new Set())
          }
          
          console.log(`✅ 成功加载 ${tracks.length} 首音频`);
        } else {
          console.warn('⚠️ 未获取到音频数据');
        }
      } catch (error) {
        console.error('❌ 加载音频数据失败:', error);
      }
    };

    // 只在playlist为空时加载数据
    if (playlist.length === 0) {
      loadAudioData();
    }
  }, [playlist.length]);

  // 初始化音频
  const checkAudioSupport = (filename: string) => {
    const extension = filename.split('.').pop()?.toLowerCase();
    const supportedFormats = ['mp3', 'wav', 'ogg', 'flac', 'm4a'];
    
    if (!extension || !supportedFormats.includes(extension)) {
      console.warn(`音频格式可能不支持: ${filename}`);
      return false;
    }
    return true;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    // 检查音频格式支持
    if (!checkAudioSupport(currentTrack.src)) {
      console.warn('音频格式可能不被浏览器支持');
    }

    // 只有在音频源不同或未初始化时才重新加载
    if (!isInitializedRef.current || audio.src !== currentTrack.src) {
      audio.src = currentTrack.src;
      audio.volume = volume;
      audio.load();
      isInitializedRef.current = true;
      console.log('音频初始化完成:', currentTrack.title);
      
      // 如果是从缓存恢复的播放位置，设置音频时间
      if (currentTime > 0) {
        // 延迟设置，确保音频已加载
        setTimeout(() => {
          if (audio.readyState >= 2) { // HAVE_CURRENT_DATA
            audio.currentTime = currentTime;
            console.log('从缓存恢复播放位置:', currentTime);
          }
        }, 100);
      }
    }
  }, [currentTrack, currentTime]); // 添加currentTime依赖

  // 单独处理音量设置
  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      audio.volume = volume
    }
  }, [volume])

  // 播放控制函数
  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    try {
      // 检查音频是否已加载
      if (audio.readyState < 2) { // HAVE_CURRENT_DATA
        console.log('音频未完全加载，等待加载完成...');
        await new Promise((resolve, reject) => {
          const handleCanPlay = () => {
            audio.removeEventListener('canplay', handleCanPlay);
            audio.removeEventListener('error', handleError);
            resolve(undefined);
          };
          
          const handleError = (e: any) => {
            audio.removeEventListener('canplay', handleCanPlay);
            audio.removeEventListener('error', handleError);
            reject(new Error('音频加载失败'));
          };
          
          audio.addEventListener('canplay', handleCanPlay);
          audio.addEventListener('error', handleError);
          
          // 设置超时
          setTimeout(() => {
            audio.removeEventListener('canplay', handleCanPlay);
            audio.removeEventListener('error', handleError);
            reject(new Error('音频加载超时'));
          }, 10000);
        });
      }
      
      await audio.play();
      setIsPlaying(true);
      setIsPaused(false);
      console.log('开始播放:', currentTrack.title, '从位置:', audio.currentTime);
    } catch (error: any) {
      console.error('播放失败:', error.message);
      if (error.name === 'NotAllowedError') {
        console.log('浏览器阻止自动播放，需要用户交互');
      } else {
        console.error('其他播放错误:', error);
        setIsPlaying(false);
        setIsPaused(true);
      }
    }
  }, [currentTrack]);

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
          console.error('继续播放失败:', err.message)
          if (err.name === 'NotAllowedError') {
            console.log('浏览器阻止自动播放，需要用户交互')
            // 不尝试重新播放，等待用户再次点击
          } else {
            // 其他错误，尝试重新加载
            play()
          }
        })
      } else {
        // 其他情况（首次播放或已切换歌曲）
        play()
      }
    }
  }, [isPlaying, isPaused, pause, play, currentTrack])

  // 获取随机播放的下一首歌曲
  const getRandomNextIndex = useCallback(() => {
    if (remainingTracks.length === 0) {
      // 如果所有歌曲都播放过了，重新开始随机播放
      const allTracks = Array.from({ length: playlist.length }, (_, i) => i)
      setRemainingTracks(allTracks)
      setPlayedTracks(new Set())
      return allTracks[Math.floor(Math.random() * allTracks.length)]
    }
    
    // 从剩余歌曲中随机选择
    const randomIndex = Math.floor(Math.random() * remainingTracks.length)
    const nextIndex = remainingTracks[randomIndex]
    
    // 更新剩余歌曲列表
    const newRemainingTracks = remainingTracks.filter((_, index) => index !== randomIndex)
    setRemainingTracks(newRemainingTracks)
    
    // 添加到已播放列表
    setPlayedTracks(prev => new Set([...prev, nextIndex]))
    
    return nextIndex
  }, [remainingTracks, playlist.length])

  // 切换到下一首
  const next = useCallback(() => {
    let nextIndex: number
    
    if (playMode === 'single') {
      nextIndex = currentIndex // 单曲循环
    } else if (playMode === 'random') {
      nextIndex = getRandomNextIndex()
    } else {
      // 列表循环
      nextIndex = (currentIndex + 1) % playlist.length
    }
    
    console.log('切换到下一首:', nextIndex, playlist[nextIndex]?.title)
    setCurrentIndexWithCache(nextIndex)
    isInitializedRef.current = false // 重置初始化标志
    shouldAutoPlayRef.current = true // 设置自动播放标志
  }, [currentIndex, playlist.length, playMode, getRandomNextIndex, setCurrentIndexWithCache])

  // 切换到上一首
  const prev = useCallback(() => {
    let prevIndex: number
    
    if (playMode === 'single') {
      prevIndex = currentIndex // 单曲循环
    } else if (playMode === 'random') {
      // 随机播放模式下，上一首也是随机的
      prevIndex = getRandomNextIndex()
    } else {
      // 列表循环
      prevIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1
    }
    
    console.log('切换到上一首:', prevIndex, playlist[prevIndex]?.title)
    setCurrentIndexWithCache(prevIndex)
    isInitializedRef.current = false // 重置初始化标志
    shouldAutoPlayRef.current = true // 设置自动播放标志
  }, [currentIndex, playlist.length, playMode, getRandomNextIndex, setCurrentIndexWithCache])

  // 进度跳转
  const seek = useCallback((time: number) => {
    const audio = audioRef.current
    if (!audio) return

    audio.currentTime = time
    setCurrentTime(time)
    // 保存播放位置到localStorage
    localStorage.setItem('sprb_current_time', time.toString())
  }, [])

  // 音量控制
  const setVolume = useCallback((newVolume: number) => {
    setVolumeState(newVolume)
    // 保存到localStorage
    localStorage.setItem('sprb_volume', newVolume.toString())
    const audio = audioRef.current
    if (audio) {
      audio.volume = newVolume
    }
  }, [])

  // 选择歌曲
  const selectTrack = useCallback((index: number) => {
    if (index >= 0 && index < playlist.length && index !== currentIndex) {
      console.log('选择歌曲:', index, playlist[index]?.title)
      setCurrentIndexWithCache(index)
      
      // 如果是随机播放模式，需要更新随机播放状态
      if (playMode === 'random') {
        setPlayedTracks(prev => new Set([...prev, index]))
        setRemainingTracks(prev => prev.filter(i => i !== index))
      }
      
      isInitializedRef.current = false // 重置初始化标志
      shouldAutoPlayRef.current = true // 设置自动播放标志
    }
  }, [playlist.length, currentIndex, playMode, setCurrentIndexWithCache])

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
      const currentAudioTime = audio.currentTime || 0
      setCurrentTime(currentAudioTime)
      
      // 每5秒保存一次播放位置，避免频繁写入localStorage
      if (Math.floor(currentAudioTime) % 5 === 0) {
        localStorage.setItem('sprb_current_time', currentAudioTime.toString())
      }
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
      } else if (currentPlayMode === 'random') {
        // 随机播放 - 播放下一首随机歌曲
        next()
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
      const audio = e.target;
      const error = audio.error;
      
      console.error('音频加载错误:', {
        error: error,
        errorCode: error ? error.code : 'unknown',
        errorMessage: error ? error.message : 'unknown',
        src: audio.src,
        currentTrack: currentTrack?.title,
        networkState: audio.networkState,
        readyState: audio.readyState
      });
      
      // 根据错误类型提供具体的错误信息
      let errorMessage = '音频加载失败';
      if (error) {
        switch (error.code) {
          case MediaError.MEDIA_ERR_ABORTED:
            errorMessage = '音频加载被用户中止';
            break;
          case MediaError.MEDIA_ERR_NETWORK:
            errorMessage = '网络错误，无法加载音频';
            break;
          case MediaError.MEDIA_ERR_DECODE:
            errorMessage = '音频解码失败，格式可能不支持';
            break;
          case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
            errorMessage = '音频格式不支持或文件不存在';
            break;
          default:
            errorMessage = `音频加载错误: ${error.message}`;
        }
      }
      
      console.error(errorMessage);
      
      // 尝试重新加载音频
      if (currentTrack && audio.src !== currentTrack.src) {
        console.log('尝试重新加载音频:', currentTrack.src);
        audio.src = currentTrack.src;
        audio.load();
      }
      
      setIsPlaying(false);
      setIsPaused(true);
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
  }, [play, next, currentTrack])





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
    setPlayMode: setPlayModeWithCache,
    setCurrentIndex: setCurrentIndexWithCache,
    clearPlaybackPreferences,
    
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
        crossOrigin="anonymous"
        onError={(e) => console.error('Audio element error:', e)}
      />
    </MusicContext.Provider>
  )
} 