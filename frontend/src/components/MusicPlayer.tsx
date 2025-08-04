import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { useMusic, PlayMode } from '../contexts/MusicContext'

// 主容器
const PlayerContainer = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
`



// 圆形播放按钮 - 参考网易云音乐
const PlayButton = styled(motion.button)<{ isPlaying: boolean }>`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #ff4757 0%, #ff6b7a 50%, #ff4757 100%);
  box-shadow: 
    0 8px 25px rgba(255, 71, 87, 0.4),
    0 0 0 3px rgba(255, 255, 255, 0.2),
    inset 0 -2px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  
  /* 音乐图标 */
  &::after {
    content: '🎵';
    font-size: 32px;
    color: white;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }
  
  &:hover {
    transform: scale(1.1) translateY(-3px);
    box-shadow: 
      0 15px 35px rgba(255, 71, 87, 0.6),
      0 0 0 5px rgba(255, 255, 255, 0.3),
      inset 0 -2px 15px rgba(0, 0, 0, 0.3);
    background: linear-gradient(135deg, #ff6b7a 0%, #ff4757 50%, #ff6b7a 100%);
  }
  
  &:active {
    transform: scale(1.05) translateY(-1px);
  }
`

// 展开的播放器面板 - 参考网易云音乐布局
const PlayerPanel = styled(motion.div)`
  position: absolute;
  bottom: 90px;
  right: 0;
  width: 400px;
  background: #ffffff; /* 纯白背景，移除毛玻璃效果 */
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.05);
`

// 头部 - 当前播放信息
const PlayerHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`

const AlbumCover = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 10px;
  background: linear-gradient(135deg, #ff4757, #ff6b7a);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  margin-right: 15px;
  box-shadow: 0 4px 15px rgba(255, 71, 87, 0.3);
`

const TrackInfo = styled.div`
  flex: 1;
`

const TrackName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const ArtistName = styled.div`
  font-size: 14px;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  color: #999;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  transition: all 0.2s;
  
  &:hover {
    background: rgba(0, 0, 0, 0.1);
    color: #666;
  }
`

// 进度条
const ProgressContainer = styled.div`
  margin-bottom: 20px;
`

const ProgressInfo = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #999;
  margin-bottom: 8px;
`

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: #e9e9e9;
  border-radius: 2px;
  cursor: pointer;
  position: relative;
`

const ProgressFill = styled(motion.div)<{ progress: number }>`
  height: 100%;
  background: linear-gradient(90deg, #ff4757, #ff6b7a);
  border-radius: 2px;
  width: ${props => props.progress}%;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    right: -6px;
    top: 50%;
    transform: translateY(-50%);
    width: 12px;
    height: 12px;
    background: #ff4757;
    border-radius: 50%;
    box-shadow: 0 2px 8px rgba(255, 71, 87, 0.4);
  }
`

// 控制按钮组
const Controls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px; /* 增大间距，使播放按钮居中明显 */
  margin-bottom: 20px;
`

const ControlButton = styled(motion.button)`
  background: none;
  border: none;
  font-size: 20px;
  color: #666;
  cursor: pointer;
  padding: 10px;
  border-radius: 50%;
  transition: all 0.2s;
  
  &:hover {
    background: rgba(255, 71, 87, 0.1);
    color: #ff4757;
  }
`

const PlayControlButton = styled(ControlButton)`
  font-size: 24px;
  background: linear-gradient(135deg, #ff4757, #ff6b7a);
  color: white;
  box-shadow: 0 4px 15px rgba(255, 71, 87, 0.3);
  
  &:hover {
    background: linear-gradient(135deg, #ff6b7a, #ff4757);
    transform: scale(1.05);
  }
`

// 音量控制
const VolumeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
`

const VolumeIcon = styled.div`
  font-size: 16px;
  color: #666;
  min-width: 20px;
`

const VolumeSlider = styled.input`
  flex: 1;
  height: 4px;
  background: #e9e9e9;
  border-radius: 2px;
  outline: none;
  appearance: none;
  
  &::-webkit-slider-thumb {
    appearance: none;
    width: 12px;
    height: 12px;
    background: #ff4757;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(255, 71, 87, 0.4);
  }
`

// 播放模式和播放列表
const PlaylistHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`



const PlaylistContainer = styled.div`
  max-height: 200px; /* 固定高度，显示约4首歌曲 */
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 5px;
  position: relative;
  
  /* 自定义滚动条样式 */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 71, 87, 0.3);
    border-radius: 3px;
    
    &:hover {
      background: rgba(255, 71, 87, 0.5);
    }
  }
  
  /* Firefox 滚动条样式 */
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 71, 87, 0.3) rgba(0, 0, 0, 0.05);
`

const PlaylistItem = styled(motion.div)<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  background: ${props => props.isActive ? 'rgba(255, 71, 87, 0.1)' : 'transparent'};
  
  &:hover {
    background: rgba(255, 71, 87, 0.05);
  }
`

const PlaylistIndex = styled.div<{ isActive: boolean }>`
  width: 30px;
  font-size: 12px;
  color: ${props => props.isActive ? '#ff4757' : '#999'};
  font-weight: ${props => props.isActive ? '600' : '400'};
`

const PlaylistTrackInfo = styled.div`
  flex: 1;
`

const PlaylistTrackName = styled.div<{ isActive: boolean }>`
  font-size: 14px;
  color: ${props => props.isActive ? '#ff4757' : '#333'};
  font-weight: ${props => props.isActive ? '600' : '400'};
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const PlaylistArtistName = styled.div`
  font-size: 12px;
  color: #999;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

// 滚动指示器
const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 20px;
  background: linear-gradient(transparent, rgba(255, 255, 255, 0.8));
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: #999;
`

// 工具函数
const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

const MusicPlayer: React.FC = () => {
  const {
    isPlaying,
    currentTime,
    duration,
    volume,
    playlist,
    currentTrack,
    currentIndex,
    playMode,
    togglePlay,
    next,
    prev,
    seek,
    setVolume,
    selectTrack,
    setPlayMode,
    isPlayerOpen,
    setPlayerOpen
  } = useMusic()

  // 播放列表容器的引用
  const playlistContainerRef = useRef<HTMLDivElement>(null)
  
  // 滚动状态
  const [isScrolled, setIsScrolled] = useState(false)



  // 进度条点击
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const percent = (e.clientX - rect.left) / rect.width
    const newTime = percent * duration
    seek(newTime)
  }

  // 播放模式显示和切换
  const getPlayModeIcon = () => {
    switch (playMode) {
      case 'single': return '🔂'
      case 'list': return '🔁'
      default: return '🔁'
    }
  }
  
  const getPlayModeText = () => {
    switch (playMode) {
      case 'single': return '单曲循环'
      case 'list': return '列表循环'
      default: return '列表循环'
    }
  }
  
  const togglePlayMode = () => {
    const modes: PlayMode[] = ['list', 'single']
    const currentModeIndex = modes.indexOf(playMode)
    const nextModeIndex = (currentModeIndex + 1) % modes.length
    setPlayMode(modes[nextModeIndex])
  }

  // 计算进度百分比
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  // 滚动到当前播放的歌曲
  useEffect(() => {
    if (playlistContainerRef.current && currentIndex >= 0) {
      const container = playlistContainerRef.current
      const items = container.children
      const currentItem = items[currentIndex] as HTMLElement
      
      if (currentItem) {
        const containerRect = container.getBoundingClientRect()
        const itemRect = currentItem.getBoundingClientRect()
        
        // 检查当前歌曲是否在可视区域内
        const isVisible = 
          itemRect.top >= containerRect.top && 
          itemRect.bottom <= containerRect.bottom
        
        if (!isVisible) {
          // 滚动到当前歌曲
          currentItem.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
          })
        }
      }
    }
  }, [currentIndex])

  // 监听滚动事件
  useEffect(() => {
    const container = playlistContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const { scrollTop } = container
      setIsScrolled(scrollTop > 10)
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <PlayerContainer data-music-player="true">
      {/* 音乐播放器菜单按钮 */}
      <PlayButton
        isPlaying={isPlaying}
        onClick={() => setPlayerOpen(!isPlayerOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        data-music-player="true"
      />

      {/* 展开的播放器面板 */}
      <AnimatePresence>
        {isPlayerOpen && (
          <PlayerPanel
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* 头部信息 */}
            <PlayerHeader>
              <AlbumCover>🎵</AlbumCover>
              <TrackInfo>
                <TrackName>{currentTrack?.name || '暂无歌曲'}</TrackName>
                <ArtistName>{currentTrack?.artist || '未知艺术家'}</ArtistName>
              </TrackInfo>
              <CloseButton onClick={() => setPlayerOpen(false)}>
                ✕
              </CloseButton>
            </PlayerHeader>

            {/* 进度条 */}
            {currentTrack && (
              <ProgressContainer>
                <ProgressInfo>
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </ProgressInfo>
                <ProgressBar onClick={handleProgressClick}>
                  <ProgressFill progress={progress} />
                </ProgressBar>
              </ProgressContainer>
            )}

            {/* 控制按钮 */}
            <Controls>
              <ControlButton
                onClick={prev}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ⏮️
              </ControlButton>
              <PlayControlButton
                onClick={togglePlay}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-music-player="true"
              >
                {isPlaying ? '⏸️' : '▶️'}
              </PlayControlButton>
              <ControlButton
                onClick={next}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ⏭️
              </ControlButton>
            </Controls>

            {/* 音量控制 */}
            <VolumeContainer>
              <VolumeIcon>🔊</VolumeIcon>
              <VolumeSlider
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
              />
            </VolumeContainer>

            {/* 播放列表 */}
            <PlaylistHeader>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>
                  播放列表 ({playlist.length})
                </span>
                {playlist.length > 4 && (
                  <span style={{ fontSize: '11px', color: '#999' }}>
                    显示前4首，滚动查看更多
                  </span>
                )}
              </div>
              <motion.button
                onClick={togglePlayMode}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '12px',
                  color: '#ff4757',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  transition: 'all 0.2s'
                }}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 71, 87, 0.1)' }}
                whileTap={{ scale: 0.95 }}
              >
                {getPlayModeIcon()} {getPlayModeText()}
              </motion.button>
            </PlaylistHeader>

            <PlaylistContainer ref={playlistContainerRef}>
              {playlist.map((track, index) => (
                <PlaylistItem
                  key={track.id}
                  isActive={index === currentIndex}
                  onClick={() => selectTrack(index)}
                  whileHover={{ x: 5 }}
                >
                  <PlaylistIndex isActive={index === currentIndex}>
                    {index === currentIndex && isPlaying ? '🎵' : index + 1}
                  </PlaylistIndex>
                  <PlaylistTrackInfo>
                    <PlaylistTrackName isActive={index === currentIndex}>
                      {track.name}
                    </PlaylistTrackName>
                    <PlaylistArtistName>{track.artist}</PlaylistArtistName>
                  </PlaylistTrackInfo>
                </PlaylistItem>
              ))}
              {playlist.length > 4 && !isScrolled && (
                <ScrollIndicator>
                  ↓ 滚动查看更多
                </ScrollIndicator>
              )}
            </PlaylistContainer>
          </PlayerPanel>
        )}
      </AnimatePresence>
    </PlayerContainer>
  )
}

export default MusicPlayer 