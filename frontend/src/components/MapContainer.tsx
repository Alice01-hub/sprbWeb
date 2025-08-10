import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { MapConfig, calculateResponsiveScale, getDeviceType } from '../utils/mapConfig';
import MapIconComponent from './MapIcon';
import { MapIcon } from '../utils/mapConfig';

interface MapContainerProps {
  config: MapConfig;
  mapImage: string;
  mapAlt: string;
  onIconClick: (icon: MapIcon) => void;
  onIconHover: (icon: MapIcon) => void;
  onIconLeave: () => void;
  children?: React.ReactNode;
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

const MapContainerWrapper = styled.div`
  width: fit-content;
  background: #f0f8ff;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MapImage = styled.img<{ scale: number }>`
  width: ${props => props.scale * 800}px;
  max-width: 100vw;
  height: auto;
  border-radius: 20px;
  display: block;
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

const MapContainerComponent: React.FC<MapContainerProps> = ({
  config,
  mapImage,
  mapAlt,
  onIconClick,
  onIconHover,
  onIconLeave,
  children
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapImageRef = useRef<HTMLImageElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [imageLayout, setImageLayout] = useState<{ 
    width: number; 
    height: number; 
    offsetLeft: number; 
    offsetTop: number 
  }>({ width: 0, height: 0, offsetLeft: 0, offsetTop: 0 });

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

  // 计算响应式缩放比例
  const baseWidth = config.scale * config.baseWidth;
  const scale = calculateResponsiveScale(containerWidth, baseWidth, config);

  // 设备类型检测
  const deviceType = getDeviceType();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      <MapFrame>
        <MapContainerWrapper ref={mapContainerRef}>
          <MapImage 
            ref={mapImageRef} 
            scale={config.scale} 
            src={mapImage} 
            alt={mapAlt} 
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
      </MapFrame>
    </motion.div>
  );
};

export default MapContainerComponent;
