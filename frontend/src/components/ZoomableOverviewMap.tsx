import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { useDevice } from '../contexts/DeviceContext';

interface MapIcon {
  x: number;
  y: number;
  emoji?: string;
  icon?: string;
  title: string;
  description?: string;
  iconType?: 'emoji' | 'image';
  iconSize?: number;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

interface ZoomableOverviewMapProps {
  mapImage: string;
  mapAlt: string;
  mapIcons: MapIcon[];
  children?: React.ReactNode;
  // 移动端配置
  enableZoom?: boolean;
  enablePan?: boolean;
  minScale?: number;
  maxScale?: number;
  initialScale?: number;
}

const MapFrame = styled.div`
  width: 95%;
  max-width: 1200px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 30px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  margin: 30px auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MapContainer = styled.div<{ isMobile: boolean }>`
  width: 100%;
  height: ${props => props.isMobile ? '60vh' : '900px'};
  background: #f0f8ff;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  
  ${props => props.isMobile && `
    touch-action: none;
  `}
`;

const MapImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
  user-select: none;
  -webkit-user-select: none;
`;

const MapOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  pointer-events: none;
`;

const LocationIcon = styled(motion.div)<{ 
  x: number; 
  y: number; 
  iconSize: number;
  isMobile: boolean;
}>`
  position: absolute;
  font-size: ${props => props.iconSize}px;
  cursor: pointer;
  left: ${props => props.x}%;
  top: ${props => props.y}%;
  transform: translate(-50%, -50%);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
  
  /* 移动端增大点击区域 */
  ${props => props.isMobile && `
    padding: 10px;
    min-width: 44px;
    min-height: 44px;
  `}
  
  img {
    width: ${props => props.iconSize}px;
    height: ${props => props.iconSize}px;
    object-fit: contain;
  }
`;

const MobileHint = styled(motion.div)`
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 12px;
  z-index: 1000;
  pointer-events: none;
  backdrop-filter: blur(10px);
`;

const ZoomControls = styled.div<{ isMobile: boolean }>`
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1000;
  
  ${props => props.isMobile && `
    bottom: 10px;
    right: 10px;
  `}
`;

const ZoomButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: scale(1.1);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const ZoomableOverviewMap: React.FC<ZoomableOverviewMapProps> = ({
  mapImage,
  mapAlt,
  mapIcons,
  children,
  enableZoom = true,
  enablePan = true,
  minScale = 0.5,
  maxScale = 3,
  initialScale = 1
}) => {
  const { isMobile, isTablet } = useDevice();
  const [showHint, setShowHint] = useState(false);

  // 移动端提示显示逻辑
  useEffect(() => {
    if (isMobile || isTablet) {
      setShowHint(true);
      const timer = setTimeout(() => setShowHint(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isMobile, isTablet]);

  // 移动端和桌面端的不同配置
  const transformConfig = {
    minScale: isMobile || isTablet ? 0.8 : minScale,
    maxScale: isMobile || isTablet ? 4 : maxScale,
    initialScale: isMobile || isTablet ? 0.9 : initialScale,
    wheel: {
      disabled: isMobile || isTablet // 移动端禁用滚轮缩放
    },
    pinch: {
      disabled: false // 启用双指缩放
    },
    pan: {
      disabled: false // 启用拖拽
    },
    doubleClick: {
      disabled: false,
      mode: 'zoomIn' as const,
      step: 0.7
    }
  };

  const MapContent = () => (
    <MapContainer isMobile={isMobile || isTablet}>
      <MapImage src={mapImage} alt={mapAlt} />
      <MapOverlay>
        {mapIcons.map((icon, index) => (
          <LocationIcon
            key={`${icon.title}-${index}`}
            x={icon.x}
            y={icon.y}
            iconSize={icon.iconSize || 30}
            isMobile={isMobile || isTablet}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1 + index * 0.2, duration: 0.5 }}
            whileHover={{ scale: isMobile || isTablet ? 1.1 : 1.2 }}
            whileTap={{ scale: 0.9 }}
            title={icon.title}
            onClick={icon.onClick}
            onMouseEnter={icon.onMouseEnter}
            onMouseLeave={icon.onMouseLeave}
          >
            {icon.iconType === 'image' && icon.icon ? (
              <img src={icon.icon} alt={icon.title} />
            ) : (
              icon.emoji
            )}
          </LocationIcon>
        ))}
        {children}
      </MapOverlay>
    </MapContainer>
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <MapFrame>
        {(isMobile || isTablet) && enableZoom ? (
          <div style={{ position: 'relative' }}>
            {/* 移动端提示 */}
            <AnimatePresence>
              {showHint && (
                <MobileHint
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  双指缩放 · 单指拖拽 · 点击图标查看详情
                </MobileHint>
              )}
            </AnimatePresence>

            <TransformWrapper
              {...transformConfig}
              onZoomStart={() => {
                console.log('开始缩放总览地图');
              }}
              onZoom={(ref) => {
                console.log('总览地图缩放比例:', ref.state.scale);
              }}
              onPanningStart={() => {
                console.log('开始拖拽总览地图');
              }}
            >
              {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                <>
                  <TransformComponent
                    wrapperStyle={{
                      width: '100%',
                      height: '100%',
                    }}
                    contentStyle={{
                      width: '100%',
                      height: '100%',
                    }}
                  >
                    <MapContent />
                  </TransformComponent>
                  
                  {/* 缩放控制按钮 */}
                  <ZoomControls isMobile={isMobile || isTablet}>
                    <ZoomButton onClick={() => zoomIn()} title="放大">
                      +
                    </ZoomButton>
                    <ZoomButton onClick={() => zoomOut()} title="缩小">
                      −
                    </ZoomButton>
                    <ZoomButton onClick={() => resetTransform()} title="重置">
                      ⌂
                    </ZoomButton>
                  </ZoomControls>
                </>
              )}
            </TransformWrapper>
          </div>
        ) : (
          // 桌面端保持原有功能
          <MapContent />
        )}
      </MapFrame>
    </motion.div>
  );
};

export default ZoomableOverviewMap;