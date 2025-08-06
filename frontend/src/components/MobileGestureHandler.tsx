import React, { useRef, useEffect, useState, ReactNode } from 'react';

interface MobileGestureHandlerProps {
  onPinch?: (scale: number) => void;
  onSwipe?: (direction: 'left' | 'right' | 'up' | 'down') => void;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}

interface TouchPoint {
  x: number;
  y: number;
}

interface GestureState {
  scale: number;
  lastTouchDistance: number;
  isGesturing: boolean;
  startTouches: TouchPoint[];
  swipeStartPoint: TouchPoint | null;
  swipeThreshold: number;
}

const MobileGestureHandler: React.FC<MobileGestureHandlerProps> = ({
  onPinch,
  onSwipe,
  children,
  className = '',
  disabled = false
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [gestureState, setGestureState] = useState<GestureState>({
    scale: 1,
    lastTouchDistance: 0,
    isGesturing: false,
    startTouches: [],
    swipeStartPoint: null,
    swipeThreshold: 50 // minimum distance for swipe detection
  });

  // Calculate distance between two touch points
  const getTouchDistance = (touch1: Touch, touch2: Touch): number => {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Convert Touch to TouchPoint
  const touchToPoint = (touch: Touch): TouchPoint => ({
    x: touch.clientX,
    y: touch.clientY
  });

  // Calculate swipe direction
  const getSwipeDirection = (start: TouchPoint, end: TouchPoint): 'left' | 'right' | 'up' | 'down' | null => {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    // Check if movement is significant enough
    if (Math.max(absDx, absDy) < gestureState.swipeThreshold) {
      return null;
    }

    // Determine primary direction
    if (absDx > absDy) {
      return dx > 0 ? 'right' : 'left';
    } else {
      return dy > 0 ? 'down' : 'up';
    }
  };

  useEffect(() => {
    const element = elementRef.current;
    if (!element || disabled) return;

    const handleTouchStart = (e: TouchEvent) => {
      const touches = Array.from(e.touches);
      
      if (touches.length === 2) {
        // Pinch gesture start
        const distance = getTouchDistance(touches[0], touches[1]);
        setGestureState(prev => ({
          ...prev,
          lastTouchDistance: distance,
          isGesturing: true,
          startTouches: touches.map(touchToPoint)
        }));
      } else if (touches.length === 1 && onSwipe) {
        // Swipe gesture start
        setGestureState(prev => ({
          ...prev,
          swipeStartPoint: touchToPoint(touches[0])
        }));
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touches = Array.from(e.touches);

      if (touches.length === 2 && gestureState.isGesturing && onPinch) {
        // Handle pinch gesture
        e.preventDefault();
        const distance = getTouchDistance(touches[0], touches[1]);
        const scaleChange = distance / gestureState.lastTouchDistance;
        const newScale = Math.max(0.5, Math.min(3, gestureState.scale * scaleChange));
        
        setGestureState(prev => ({
          ...prev,
          scale: newScale,
          lastTouchDistance: distance
        }));

        onPinch(newScale);
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touches = Array.from(e.touches);

      if (touches.length < 2 && gestureState.isGesturing) {
        // End pinch gesture
        setGestureState(prev => ({
          ...prev,
          isGesturing: false,
          lastTouchDistance: 0
        }));
      }

      if (touches.length === 0 && gestureState.swipeStartPoint && onSwipe) {
        // Handle swipe gesture end
        const changedTouches = Array.from(e.changedTouches);
        if (changedTouches.length > 0) {
          const endPoint = touchToPoint(changedTouches[0]);
          const direction = getSwipeDirection(gestureState.swipeStartPoint, endPoint);
          
          if (direction) {
            onSwipe(direction);
          }
        }

        setGestureState(prev => ({
          ...prev,
          swipeStartPoint: null
        }));
      }
    };

    const handleTouchCancel = () => {
      // Reset all gesture states on cancel
      setGestureState(prev => ({
        ...prev,
        isGesturing: false,
        lastTouchDistance: 0,
        swipeStartPoint: null
      }));
    };

    // Add event listeners with passive: false to allow preventDefault
    element.addEventListener('touchstart', handleTouchStart, { passive: false });
    element.addEventListener('touchmove', handleTouchMove, { passive: false });
    element.addEventListener('touchend', handleTouchEnd, { passive: false });
    element.addEventListener('touchcancel', handleTouchCancel, { passive: false });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
      element.removeEventListener('touchcancel', handleTouchCancel);
    };
  }, [gestureState.isGesturing, gestureState.lastTouchDistance, gestureState.scale, gestureState.swipeStartPoint, onPinch, onSwipe, disabled]);

  return (
    <div 
      ref={elementRef} 
      className={`mobile-gesture-handler ${className}`}
      style={{
        touchAction: disabled ? 'auto' : 'none', // Prevent default touch behaviors when enabled
        userSelect: 'none', // Prevent text selection during gestures
        WebkitUserSelect: 'none'
      }}
    >
      {children}
    </div>
  );
};

export default MobileGestureHandler;