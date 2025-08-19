import React, { createContext, useContext, useState, useRef, useEffect, ReactNode, useCallback } from 'react'
import OSS_CONFIG from '../config/ossConfig';

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

// 音乐数据
const musicData = [
  {
    id: 1,
    title: 'Summer Pockets',
    artist: '水月陵',
    src: OSS_CONFIG.getAudioUrl('/1-水月陵 - Summer Pockets.mp3'),
    cover: OSS_CONFIG.getImageUrl('/covers/1-summerpockets.webp'),
    duration: 0
  },
  {
    id: 2,
    title: 'Sea, You & Me',
    artist: '麻枝准',
    src: OSS_CONFIG.getAudioUrl('/2-麻枝准 - Sea, You & Me.mp3'),
    cover: OSS_CONFIG.getImageUrl('/covers/2-sea-you-me.webp'),
    duration: 0
  },
  {
    id: 3,
    title: 'アルカテイル',
    artist: '鈴木このみ',
    src: OSS_CONFIG.getAudioUrl('/3-鈴木このみ,VISUAL ARTS  Key - アルカテイル.mp3'),
    cover: OSS_CONFIG.getImageUrl('/covers/3-op.webp'),
    duration: 0
  },
  {
    id: 4,
    title: '夜は短く、空は遠くて…',
    artist: '水月陵',
    src: OSS_CONFIG.getAudioUrl('/4-水月陵 - 夜は短く、空は遠くて….mp3'),
    cover: OSS_CONFIG.getImageUrl('/covers/4-saikai.webp'),
    duration: 0
  },
  {
    id: 5,
    title: '比翼の蝶たち',
    artist: '高森奈津美',
    src: OSS_CONFIG.getAudioUrl('/5-高森奈津美 - 比翼の蝶たち.mp3'),
    cover: OSS_CONFIG.getImageUrl('/covers/5-空门苍.webp'),
    duration: 0
  },
  {
    id: 6,
    title: 'Departure!',
    artist: '嶺内ともみ',
    src: OSS_CONFIG.getAudioUrl('/6-嶺内ともみ - Departure!.mp3'),
    cover: OSS_CONFIG.getImageUrl('/covers/6-久岛鸥.webp'),
    duration: 0
  },
  {
    id: 7,
    title: 'with',
    artist: '嶺内ともみ',
    src: OSS_CONFIG.getAudioUrl('/7-嶺内ともみ - with.mp3'),
    cover: OSS_CONFIG.getImageUrl('/covers/7-with.webp'),
    duration: 0
  },
  {
    id: 8,
    title: '夏に君を待ちながら',
    artist: '小原好美',
    src: OSS_CONFIG.getAudioUrl('/8-小原好美 - 夏に君を待ちながら.mp3'),
    cover: OSS_CONFIG.getImageUrl('/covers/8-白羽.webp'),
    duration: 0
  },
  {
    id: 9,
    title: '紬の夏休み',
    artist: '岩井映美里',
    src: OSS_CONFIG.getAudioUrl('/9-岩井映美里,VISUAL ARTS  Key - 紬の夏休み.mp3'),
    cover: OSS_CONFIG.getImageUrl('/covers/9-紬的暑假.webp'),
    duration: 0
  },
  {
    id: 10,
    title: 'Golden Hours',
    artist: '岩井映美里',
    src: OSS_CONFIG.getAudioUrl('/10-岩井映美里 - Golden Hours.mp3'),
    cover: OSS_CONFIG.getImageUrl('/covers/10-golden-hours.webp'),
    duration: 0
  },
  {
    id: 11,
    title: '魔法の絵日記',
    artist: '小原好美',
    src: OSS_CONFIG.getAudioUrl('/11-鳴瀬しろは(CV.小原好美),加藤うみ(CV.田中あいみ),VISUAL ARTS  Key - 魔法の絵日記.mp3'),
    cover: OSS_CONFIG.getImageUrl('/covers/11-魔法日记本.webp'),
    duration: 0
  },
  {
    id: 12,
    title: 'Don\'t Cry Red',
    artist: 'Fairouz Ai',
    src: OSS_CONFIG.getAudioUrl('/12-神山識(CV.ファイルーズあい),VISUAL ARTS  Key - Don\'t Cry Red.mp3'),
    cover: OSS_CONFIG.getImageUrl('/covers/12-神山识.webp'),
    duration: 0
  },
  {
    id: 13,
    title: '柔らかい記憶',
    artist: '小山さほみ',
    src: OSS_CONFIG.getAudioUrl('/13-水織静久(CV.小山さほみ),VISUAL ARTS  Key - 柔らかい記憶.mp3'),
    cover: OSS_CONFIG.getImageUrl('/covers/13-水织静久.webp'),
    duration: 0
  },
  {
    id: 14,
    title: 'しろはの子守歌',
    artist: '小原好美',
    src: OSS_CONFIG.getAudioUrl('/14-小原好美,VISUAL ARTS  Key - しろはの子守歌.mp3'),
    cover: OSS_CONFIG.getImageUrl('/covers/14-白羽的摇篮曲.webp'),
    duration: 0
  },
  {
    id: 15,
    title: 'Dear Familiar',
    artist: '一宮朔',
    src: OSS_CONFIG.getAudioUrl('/15-野村美樹(CV.一宮朔),VISUAL ARTS  Key - Dear Familiar.mp3'),
    cover: OSS_CONFIG.getImageUrl('/covers/15-野美希.webp'),
    duration: 0
  },
  {
    id: 16,
    title: 'フィニステラー',
    artist: '鈴木このみ',
    src: OSS_CONFIG.getAudioUrl('/16-鈴木このみ,VISUAL ARTS  Key - フィニステラー.mp3'),
    cover: OSS_CONFIG.getImageUrl('/covers/16-加藤羽未.webp'),
    duration: 0
  }
];

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
  const [playlist, setPlaylist] = useState<Track[]>(musicData.map(item => ({
    id: item.id.toString(),
    name: item.title,
    artist: item.artist,
    src: item.src,
    duration: item.duration,
    album: 'Summer Pockets OST', // 专辑名称
    cover: item.cover
  })))
  const [currentIndex, setCurrentIndex] = useState(0)
  const [playMode, setPlayMode] = useState<PlayMode>('list')
  
  // 界面状态
  const [isPlayerOpen, setPlayerOpen] = useState(false)
  
  const currentTrack = playlist[currentIndex] || null



  // 同步playMode到ref
  useEffect(() => {
    playModeRef.current = playMode
  }, [playMode])

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
      console.log('音频初始化完成:', currentTrack.name);
    }
  }, [currentTrack]);

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
      console.log('开始播放:', currentTrack.name, '从位置:', audio.currentTime);
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
      const audio = e.target;
      const error = audio.error;
      
      console.error('音频加载错误:', {
        error: error,
        errorCode: error ? error.code : 'unknown',
        errorMessage: error ? error.message : 'unknown',
        src: audio.src,
        currentTrack: currentTrack?.name,
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
        crossOrigin="anonymous"
        onError={(e) => console.error('Audio element error:', e)}
      />
    </MusicContext.Provider>
  )
} 