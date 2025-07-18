import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";

// 拖尾容器
const ImageCursorContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

// 拖尾内容区域
const ImageCursorInner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
`;

// 拖尾图片元素
const ImageCursorItem = styled(motion.div)`
  position: absolute;
  user-select: none;
  white-space: nowrap;
  width: 40px;
  height: 40px;
`;

// 七影碟图片
const TrailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.6));
`;

interface ImageCursorProps {
  imageSrc?: string;
  delay?: number;
  spacing?: number;
  followMouseDirection?: boolean;
  randomFloat?: boolean;
  exitDuration?: number;
  removalInterval?: number;
  maxPoints?: number;
  imageSize?: number;
}

const ImageCursor = ({
  imageSrc = "images/webps/七影碟.webp",
  delay = 0.01,
  spacing = 80,
  followMouseDirection = true,
  randomFloat = false,
  exitDuration = 0.3,
  removalInterval = 20,
  maxPoints = 10,
  imageSize = 40,
}) => {
  const [trail, setTrail] = useState<Array<{
    id: number;
    x: number;
    y: number;
    angle: number;
    randomX?: number;
    randomY?: number;
    randomRotate?: number;
  }>>([]);
  const lastMoveTimeRef = useRef(Date.now());
  const idCounter = useRef(0);

  const handleMouseMove = (e: MouseEvent) => {
    // 使用全局坐标，直接使用clientX和clientY
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    setTrail((prev) => {
      let newTrail = [...prev];
      if (newTrail.length === 0) {
        newTrail.push({
          id: idCounter.current++,
          x: mouseX,
          y: mouseY,
          angle: 0,
          ...(randomFloat && {
            randomX: Math.random() * 10 - 5,
            randomY: Math.random() * 10 - 5,
            randomRotate: Math.random() * 10 - 5,
          }),
        });
      } else {
        const last = newTrail[newTrail.length - 1];
        const dx = mouseX - last.x;
        const dy = mouseY - last.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance >= spacing) {
          let rawAngle = (Math.atan2(dy, dx) * 180) / Math.PI;
          if (rawAngle > 90) rawAngle -= 180;
          else if (rawAngle < -90) rawAngle += 180;
          const computedAngle = followMouseDirection ? rawAngle : 0;
          const steps = Math.floor(distance / spacing);
          for (let i = 1; i <= steps; i++) {
            const t = (spacing * i) / distance;
            const newX = last.x + dx * t;
            const newY = last.y + dy * t;
            newTrail.push({
              id: idCounter.current++,
              x: newX,
              y: newY,
              angle: computedAngle,
              ...(randomFloat && {
                randomX: Math.random() * 10 - 5,
                randomY: Math.random() * 10 - 5,
                randomRotate: Math.random() * 10 - 5,
              }),
            });
          }
        }
      }
      if (newTrail.length > maxPoints) {
        newTrail = newTrail.slice(newTrail.length - maxPoints);
      }
      return newTrail;
    });
    lastMoveTimeRef.current = Date.now();
  };

  useEffect(() => {
    // 将鼠标移动监听器绑定到全局document，而不是容器
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() - lastMoveTimeRef.current > 100) {
        setTrail((prev) => (prev.length > 0 ? prev.slice(1) : prev));
      }
    }, removalInterval);
    return () => clearInterval(interval);
  }, [removalInterval]);

  return (
    <ImageCursorContainer>
      <ImageCursorInner>
        <AnimatePresence>
          {trail.map((item) => (
            <ImageCursorItem
              key={item.id}
              initial={{ opacity: 0, scale: 1, rotate: item.angle }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: item.angle,
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{
                opacity: { duration: exitDuration, ease: "easeOut", delay },
              }}
              style={{ 
                left: item.x - imageSize / 2, 
                top: item.y - imageSize / 2,
                width: imageSize,
                height: imageSize
              }}
            >
              <TrailImage 
                src={imageSrc} 
                alt="七影碟拖尾"
                style={{
                  filter: `drop-shadow(0 0 8px rgba(255, 215, 0, 0.6))`
                }}
              />
            </ImageCursorItem>
          ))}
        </AnimatePresence>
      </ImageCursorInner>
    </ImageCursorContainer>
  );
};

export default ImageCursor; 