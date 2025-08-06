import { useRef, useEffect, useState, RefObject } from 'react';

interface TouchPoint {
  x: number;
  y: number;
}

interface GestureState {
  scale: number;
  lastTouchDistance: number;
  isGesturing: boolean;
  swipeStartPoint: TouchPoint | null;
}

interface GestureHandlers {
  onPinch?: (scale: number, delta: number) => void;
  onSwipe?: (direction: 'left' | 'right' | 'up' | 'down', distance: number) => void;
  onGestureStart?: () => void;
  onGestureEnd?: () => void;
}

interface GestureOptions {
  swipeThreshold?: number;
  minScale?: number;
  maxScale?: number;
  disabled?: boolean;
}

export const useMobileGestures = (
  elementRef: RefObject<HTMLElement>,
  handlers: GestureHandlers,
  options: GestureOptions = {}
) => {
  const {
    swipeThreshold = 50,
    minScale = 0.5,
    maxScale = 3,
    disabled = false
  } = options;

  const [gestureState, setGestureState] = useState<GestureState>({
    scale: 1,
    lastTouchDistance: 0,
    isGesturing: false,
    swipeStartPoint: null
  });

  const getTouchDistance = (touch1: Touch, touch2: Touch): number => {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const touchToPoint = (touch: Touch): TouchPoint => ({
    x: touch.clientX,
    y: touch.clientY
  });

  const getSwipeDirection = (
    start: TouchPoint, 
    end: TouchPoint
  ): { direction: 'left' | 'right' | 'up' | 'down' | null; distance: number } => {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < swipeThreshold) {
      return { direction: null, distance: 0 };
    }

    const direction = absDx > absDy 
      ? (dx > 0 ? 'right' : 'left')
      : (dy > 0 ? 'down' : 'up');

    return { direction, distance };
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
          isGesturing: true
        }));
        handlers.onGestureStart?.();
      } else if (touches.length === 1 && handlers.onSwipe) {
        // Swipe gesture start
        setGestureState(prev => ({
          ...prev,
          swipeStartPoint: touchToPoint(touches[0])
        }));
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touches = Array.from(e.touches);

      if (touches.length === 2 && gestureState.isGesturing && handlers.onPinch) {
        e.preventDefault();
        const distance = getTouchDistance(touches[0], touches[1]);
        const delta = distance / gestureState.lastTouchDistance;
        const newScale = Math.max(minScale, Math.min(maxScale, gestureState.scale * delta));
        
        setGestureState(prev => ({
          ...prev,
          scale: newScale,
          lastTouchDistance: distance
        }));

        handlers.onPinch(newScale, delta);
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
        handlers.onGestureEnd?.();
      }

      if (touches.length === 0 && gestureState.swipeStartPoint && handlers.onSwipe) {
        // Handle swipe gesture end
        const changedTouches = Array.from(e.changedTouches);
        if (changedTouches.length > 0) {
          const endPoint = touchToPoint(changedTouches[0]);
          const { direction, distance } = getSwipeDirection(gestureState.swipeStartPoint, endPoint);
          
          if (direction) {
            handlers.onSwipe(direction, distance);
          }
        }

        setGestureState(prev => ({
          ...prev,
          swipeStartPoint: null
        }));
      }
    };

    const handleTouchCancel = () => {
      setGestureState(prev => ({
        ...prev,
        isGesturing: false,
        lastTouchDistance: 0,
        swipeStartPoint: null
      }));
      handlers.onGestureEnd?.();
    };

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
  }, [
    gestureState.isGesturing, 
    gestureState.lastTouchDistance, 
    gestureState.scale, 
    gestureState.swipeStartPoint,
    handlers,
    disabled,
    swipeThreshold,
    minScale,
    maxScale
  ]);

  return {
    gestureState,
    resetGestures: () => setGestureState({
      scale: 1,
      lastTouchDistance: 0,
      isGesturing: false,
      swipeStartPoint: null
    })
  };
};

export default useMobileGestures;