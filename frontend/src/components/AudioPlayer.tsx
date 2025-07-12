import React, { useState } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { useAudio, PlayMode } from '../contexts/AudioContext'

const AudioPlayerContainer = styled(motion.div)<{ expanded: boolean }>`
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: ${props => props.expanded ? '20px' : '50px'};
  padding: ${props => props.expanded ? '20px' : '15px 20px'};
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 25px rgba(255, 165, 0, 0.4);
  display: flex;
  flex-direction: ${props => props.expanded ? 'column' : 'row'};
  align-items: center;
  gap: 15px;
  z-index: 1000;
  min-width: ${props => props.expanded ? '320px' : 'auto'};
  max-height: ${props => props.expanded ? '400px' : 'auto'};
  overflow: hidden;
  transition: all 0.3s ease;
`

const PlayerControls = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  width: 100%;
  justify-content: space-between;
`

const ControlButton = styled.button<{ active?: boolean }>`
  background: ${props => props.active ? 'linear-gradient(45deg, #FF6B35, #FFB347)' : 'transparent'};
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${props => props.active ? 'white' : '#FF6B35'};
  font-size: 16px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
    color: ${props => props.active ? 'white' : '#FFB347'};
    background: ${props => props.active ? 'linear-gradient(45deg, #FFB347, #FF6B35)' : 'rgba(255, 107, 53, 0.1)'};
    text-shadow: ${props => props.active ? 'none' : '0 0 10px rgba(255, 107, 53, 0.5)'};
  }
`

const MainPlayButton = styled(ControlButton)`
  width: 50px;
  height: 50px;
  font-size: 20px;
  background: linear-gradient(45deg, #FF6B35, #FFB347);
  color: white;
  
  &:hover {
    background: linear-gradient(45deg, #FFB347, #FF6B35);
  }
`

const VolumeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const VolumeSlider = styled.input`
  width: 80px;
  height: 4px;
  background: #ddd;
  border-radius: 2px;
  outline: none;
  
  &::-webkit-slider-thumb {
    appearance: none;
    width: 12px;
    height: 12px;
    background: #FF6B35;
    border-radius: 50%;
    cursor: pointer;
  }
`

const TrackInfo = styled.div`
  text-align: center;
  margin-bottom: 15px;
  width: 100%;
`

const TrackName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #FF6B35;
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const TrackIndex = styled.div`
  font-size: 12px;
  color: #666;
`

const PlaylistContainer = styled(motion.div)`
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  border-top: 1px solid #eee;
  padding-top: 15px;
  margin-top: 15px;
`

const PlaylistItem = styled(motion.div)<{ active: boolean }>`
  padding: 8px 12px;
  background: ${props => props.active ? 'linear-gradient(45deg, rgba(255, 107, 53, 0.1), rgba(255, 179, 71, 0.1))' : 'transparent'};
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 5px;
  border: 2px solid ${props => props.active ? '#FFB347' : 'transparent'};
  transition: all 0.2s ease;
  
  &:hover {
    background: linear-gradient(45deg, rgba(255, 107, 53, 0.1), rgba(255, 179, 71, 0.1));
  }
`

const PlaylistItemName = styled.div<{ active: boolean }>`
  font-size: 14px;
  color: ${props => props.active ? '#FF6B35' : '#666'};
  font-weight: ${props => props.active ? '600' : '400'};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const ModeButton = styled(ControlButton)`
  font-size: 14px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: -5px;
    right: -5px;
    width: 8px;
    height: 8px;
    background: ${props => props.active ? '#FF6B35' : 'transparent'};
    border-radius: 50%;
  }
`

const ExpandButton = styled(ControlButton)`
  font-size: 12px;
`

const getModeIcon = (mode: PlayMode): string => {
  switch (mode) {
    case 'sequence':
      return '🔁'
    case 'random':
      return '🔀'
    case 'single-loop':
      return '🔂'
    default:
      return '🔁'
  }
}

const getModeText = (mode: PlayMode): string => {
  switch (mode) {
    case 'sequence':
      return '顺序播放'
    case 'random':
      return '随机播放'
    case 'single-loop':
      return '单曲循环'
    default:
      return '顺序播放'
  }
}

const AudioPlayer: React.FC = () => {
  const {
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
    refreshPlaylist
  } = useAudio()

  const [expanded, setExpanded] = useState(false)

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value))
  }

  const handleModeToggle = () => {
    const modes: PlayMode[] = ['sequence', 'random', 'single-loop']
    const currentIndex = modes.indexOf(playMode)
    const nextIndex = (currentIndex + 1) % modes.length
    setPlayMode(modes[nextIndex])
  }

  const handleExpand = () => {
    setExpanded(!expanded)
  }

  const handleRefreshPlaylist = () => {
    refreshPlaylist()
  }

  return (
    <AudioPlayerContainer
      expanded={expanded}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* 当前播放信息 */}
      {expanded && currentTrack && (
        <TrackInfo>
          <TrackName>{currentTrack.name}</TrackName>
          <TrackIndex>{currentTrackIndex + 1} / {playlist.length}</TrackIndex>
        </TrackInfo>
      )}

      {/* 播放控制 */}
      <PlayerControls>
        <ControlButton onClick={previousTrack} title="上一首">
          ⏮️
        </ControlButton>
        
        <MainPlayButton onClick={togglePlay} title={isPlaying ? "暂停" : "播放"}>
          {isPlaying ? '⏸️' : '▶️'}
        </MainPlayButton>
        
        <ControlButton onClick={nextTrack} title="下一首">
          ⏭️
        </ControlButton>

        <ModeButton 
          active={playMode !== 'sequence'} 
          onClick={handleModeToggle}
          title={getModeText(playMode)}
        >
          {getModeIcon(playMode)}
        </ModeButton>

        <VolumeContainer>
          <ControlButton title="音量">
            🔊
          </ControlButton>
          <VolumeSlider
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
          />
        </VolumeContainer>

        <ControlButton onClick={handleRefreshPlaylist} title="刷新播放列表">
          🔄
        </ControlButton>

        <ExpandButton onClick={handleExpand} title={expanded ? "收起播放列表" : "展开播放列表"}>
          {expanded ? '🔽' : '🔼'}
        </ExpandButton>
      </PlayerControls>

      {/* 播放列表 */}
      <AnimatePresence>
        {expanded && (
          <PlaylistContainer
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {playlist.map((track, index) => (
              <PlaylistItem
                key={track.id}
                active={index === currentTrackIndex}
                onClick={() => selectTrack(index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <PlaylistItemName active={index === currentTrackIndex}>
                  {index + 1}. {track.name}
                </PlaylistItemName>
              </PlaylistItem>
            ))}
          </PlaylistContainer>
        )}
      </AnimatePresence>
    </AudioPlayerContainer>
  )
}

export default AudioPlayer 