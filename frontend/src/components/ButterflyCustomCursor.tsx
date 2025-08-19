import { useState, useEffect, useRef, useCallback } from 'react'; 
import OSS_CONFIG from '../config/ossConfig';  // 添加这行导入


const ButterflyCustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isOnClickable, setIsOnClickable] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const cursorRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const lastCheckTimeRef = useRef(0);
  const imagesPreloadedRef = useRef(false);

  // 蝴蝶翅膀的两个状态图片
  const butterflyFrames = [
    OSS_CONFIG.getImageUrl('/webps/七影蝶-3.webp'),
    OSS_CONFIG.getImageUrl('/webps/七影蝶-4.webp')
  ];

  // 预加载图片
  const preloadImages = useCallback(() => {
    if (imagesPreloadedRef.current) return;
    
    butterflyFrames.forEach(src => {
      const img = new Image();
      img.src = src;
    });
    imagesPreloadedRef.current = true;
  }, [butterflyFrames]);

  // 节流的可点击元素检测（每100ms最多检测一次）
  const checkClickableElement = useCallback((x: number, y: number) => {
    const now = Date.now();
    if (now - lastCheckTimeRef.current < 100) return; // 节流
    lastCheckTimeRef.current = now;

    const elementUnderMouse = document.elementFromPoint(x, y);
    const isClickable = elementUnderMouse && (
      elementUnderMouse.tagName === 'A' ||
      elementUnderMouse.tagName === 'BUTTON' ||
      elementUnderMouse.tagName === 'INPUT' ||
      elementUnderMouse.tagName === 'SELECT' ||
      elementUnderMouse.tagName === 'TEXTAREA' ||
      elementUnderMouse.getAttribute('role') === 'button' ||
      elementUnderMouse.classList.contains('clickable') ||
      (elementUnderMouse instanceof HTMLElement && elementUnderMouse.style.cursor === 'pointer') ||
      // 检查父元素是否可点击
      elementUnderMouse.closest('a, button, [role="button"], .clickable')
    );
    
    setIsOnClickable(!!isClickable);
  }, []);

  // 使用requestAnimationFrame优化鼠标位置更新
  const updateCursorPosition = useCallback((x: number, y: number) => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      setMousePosition({ x, y });
      checkClickableElement(x, y);
    });
  }, [checkClickableElement]);

  // 强制清除元素cursor样式的函数
  const clearElementCursor = useCallback((element: HTMLElement) => {
    if (element.style && element.style.cursor && element.style.cursor !== 'none') {
      // 保存原有的cursor值到data属性中，以防需要恢复
      if (!element.dataset.originalCursor) {
        element.dataset.originalCursor = element.style.cursor;
      }
      element.style.cursor = 'none';
    }
  }, []);

  // 清除所有现有元素的cursor样式
  const clearAllCursorStyles = useCallback(() => {
    const allElements = document.querySelectorAll('*');
    allElements.forEach(element => clearElementCursor(element as HTMLElement));
  }, [clearElementCursor]);

  // 更新鼠标位置
  useEffect(() => {
    preloadImages();

    const handleMouseMove = (e: MouseEvent) => {
      updateCursorPosition(e.clientX, e.clientY);
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    // 初始清除所有cursor样式
    clearAllCursorStyles();
    
    // 使用MutationObserver监听DOM变化
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        // 处理新添加的节点
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as HTMLElement;
            clearElementCursor(element);
            // 也处理子元素
            const children = element.querySelectorAll('*');
            children.forEach(child => clearElementCursor(child as HTMLElement));
          }
        });
        
        // 处理属性变化（包括style变化）
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
          const element = mutation.target as HTMLElement;
          clearElementCursor(element);
        }
      });
    });

    // 开始观察
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [updateCursorPosition, preloadImages, clearAllCursorStyles, clearElementCursor]);

  // 蝴蝶翅膀扇动动画
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame(prev => (prev + 1) % butterflyFrames.length);
    }, isOnClickable ? 200 : 300); // 在可点击区域时扇动更快

    return () => clearInterval(interval);
  }, [isOnClickable, butterflyFrames.length]);

  // 隐藏鼠标离开窗口时的光标
  useEffect(() => {
    const handleMouseLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '0';
      }
    };

    const handleMouseEnter = () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '1';
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`butterfly-cursor ${isOnClickable ? 'on-clickable' : ''}`}
      style={{
        transform: `translate3d(${mousePosition.x - 20}px, ${mousePosition.y - 20}px, 0)`,
        willChange: 'transform', // 提示浏览器启用硬件加速
        pointerEvents: 'none', // 确保不会阻挡点击事件
        border: 'none', // 🦋 确保容器没有边框
        outline: 'none', // 🦋 确保容器没有轮廓
        boxShadow: 'none', // 🦋 确保容器没有阴影
        background: 'transparent', // 🦋 确保容器背景透明
      }}
    >
      <img
        src={butterflyFrames[currentFrame]}
        alt="蝴蝶鼠标"
        className="butterfly-wing"
        draggable={false}
        style={{
          userSelect: 'none',
          transform: isOnClickable ? 'scale(1.1)' : 'scale(1)',
          transition: 'transform 0.2s ease-out',
          willChange: 'transform', // 提示浏览器启用硬件加速
          pointerEvents: 'none', // 确保图片也不会阻挡点击
          border: 'none', // 🦋 确保没有边框
          outline: 'none', // 🦋 确保没有轮廓
          boxShadow: 'none', // 🦋 确保没有阴影
          background: 'transparent', // 🦋 确保背景透明
        }}
      />
    </div>
  );
};

export default ButterflyCustomCursor; 