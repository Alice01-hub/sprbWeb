import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { useDevice } from '../contexts/DeviceContext';
import { MapConfig, calculateResponsiveScale } from '../utils/mapConfig';
import MapIconComponent from './MapIcon';
import { MapIcon } from '../utils/mapConfig';

interface ZoomableMapContainerProps {
  config: MapConfig;
  mapImage: string;
  mapAlt: string;
  onIconClick: (icon: MapIcon) => void;
  onIconHover: (icon: MapIcon) => void;
  onIconLeave: () => void;
  children?: React.ReactNode;
  // 移动端特定配置
  enableZoom?: boolean;
  enablePan?: boolean;
  minScale?: number;
  maxScale?: number;
  initialScale?: number;
}

const MapFrame = styled.div`
  width: fit-content;
  max-width: 95%;
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

const MapContainerWrapper = styled.div<{ isMobile: boolean }>`
  width: fit-content;
  background: #f0f8ff;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  
  /* 移动端优化 */
  ${props => props.isMobile && `
    max-width: 100vw;
    max-height: 70vh;
    touch-action: none;
  `}
`;

const MapImage = styled.img<{ scale: number; isMobile: boolean }>`
  width: ${props => props.scale * (props.isMobile ? 600 : 800)}px;
  max-width: ${props => props.isMobile ? '100vw' : '100vw'};
  height: auto;
  border-radius: 20px;
  display: block;
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

const ZoomableMapContainer: React.FC<ZoomableMapContainerProps> = ({
  config,
  mapImage,
  mapAlt,
  onIconClick,
  onIconHover,
  onIconLeave,
  children,
  enableZoom = true,
  enablePan = true,
  minScale = 0.5,
  maxScale = 3,
  initialScale = 1
}) => {
  const { isMobile, isTablet } = useDevice();
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapImageRef = useRef<HTMLImageElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [imageLayout, setImageLayout] = useState<{ 
    width: number; 
    height: number; 
    offsetLeft: number; 
    offsetTop: number 
  }>({ width: 0, height: 0, offsetLeft: 0, offsetTop: 0 });
  const [showHint, setShowHint] = useState(false);

  // 监听容器尺寸变化
  useEffect(() => {
    const container = mapContainerRef.current;
    if (!container) return;

    const update = () => {
      setContainerWidth(container.getBoundingClientRect().width);
      const img = mapImageRef.current;
      if (img) {
        const cRect = container.getBoundingClientRect();
        const iRect = img.getBoundingClientRect();
        setImageLayout({
          width: iRect.width,
          height: iRect.height,
          offsetLeft: iRect.left - cRect.left,
          offsetTop: iRect.top - cRect.top
        });
      }
    };

    update();
    const ro = new ResizeObserver(() => update());
    ro.observe(container);
    if (mapImageRef.current) ro.observe(mapImageRef.current);
    
    return () => ro.disconnect();
  }, []);

  // 移动端提示显示逻辑
  useEffect(() => {
    if (isMobile || isTablet) {
      setShowHint(true);
      const timer = setTimeout(() => setShowHint(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isMobile, isTablet]);

  // 计算响应式缩放比例
  const baseWidth = config.scale * config.baseWidth;
  const scale = calculateResponsiveScale(containerWidth, baseWidth, config);

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
    <MapContainerWrapper ref={mapContainerRef} isMobile={isMobile || isTablet}>
      <MapImage 
        ref={mapImageRef} 
        scale={config.scale} 
        src={mapImage} 
        alt={mapAlt}
        isMobile={isMobile || isTablet}
      />
      <MapOverlay>
        {/* 渲染所有地标 */}
        {Object.values(config.icons).map((icon, index) => (
          <MapIconComponent
            key={icon.id}
            icon={icon}
            imageLayout={imageLayout}
            scale={scale}
            onMouseEnter={onIconHover}
            onMouseLeave={onIconLeave}
            onClick={onIconClick}
            zIndex={10 + index}
          />
        ))}
        {children}
      </MapOverlay>
    </MapContainerWrapper>
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
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
                  双指缩放 · 单指拖拽
                </MobileHint>
              )}
            </AnimatePresence>

            <TransformWrapper
              {...transformConfig}
              onZoomStart={() => {
                // 缩放开始时的回调
                console.log('开始缩放');
              }}
              onZoom={(ref) => {
                // 缩放过程中的回调
                console.log('缩放比例:', ref.state.scale);
              }}
              onPanningStart={() => {
                // 拖拽开始时的回调
                console.log('开始拖拽');
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

export default ZoomableMapContainer;