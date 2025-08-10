import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { MapIcon as MapIconType, calculateIconPosition } from '../utils/mapConfig';

interface MapIconProps {
  icon: MapIconType;
  imageLayout: { width: number; height: number; offsetLeft: number; offsetTop: number };
  scale: number;
  onMouseEnter: (icon: MapIconType) => void;
  onMouseLeave: () => void;
  onClick: (icon: MapIconType) => void;
  zIndex?: number;
}

const IconContainer = styled(motion.div)<{ 
  left: number; 
  top: number; 
  size: number;
  zIndex: number;
}>`
  position: absolute;
  left: ${props => props.left}px;
  top: ${props => props.top}px;
  transform: translate(-50%, -50%);
  z-index: ${props => props.zIndex};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5));
  pointer-events: auto;
`;

const IconImage = styled.img<{ size: number }>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 50%;
  object-fit: cover;
  transition: all 0.3s ease;
`;

const IconEmoji = styled.span<{ size: number }>`
  font-size: ${props => props.size}px;
  transition: all 0.3s ease;
`;

const MapIconComponent: React.FC<MapIconProps> = ({
  icon,
  imageLayout,
  scale,
  onMouseEnter,
  onMouseLeave,
  onClick,
  zIndex = 10
}) => {
  const position = calculateIconPosition(icon, imageLayout, scale);

  return (
    <IconContainer
      left={position.left}
      top={position.top}
      size={position.size}
      zIndex={zIndex}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      whileHover={{ scale: 1.2 }}
      onMouseEnter={() => onMouseEnter(icon)}
      onMouseLeave={onMouseLeave}
      onClick={() => onClick(icon)}
    >
      {icon.iconType === 'image' && icon.icon ? (
        <IconImage 
          src={icon.icon} 
          alt={icon.title}
          size={position.size}
        />
      ) : (
        <IconEmoji size={position.size}>
          {icon.emoji}
        </IconEmoji>
      )}
    </IconContainer>
  );
};

export default MapIconComponent;
