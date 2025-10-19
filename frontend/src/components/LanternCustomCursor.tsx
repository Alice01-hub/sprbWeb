import { useState, useEffect, useRef, useCallback } from 'react'; 
import { useLocation } from 'react-router-dom';
import OSS_CONFIG from '../config/ossConfig';

const LanternCustomCursor = () => {
  const location = useLocation();
  
  // 仅在神域页面显示灯笼鼠标
  if (location.pathname !== '/divine-realm') {
    return null;
  }
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isOnClickable, setIsOnClickable] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const lastCheckTimeRef = useRef(0);
  const imagesPreloadedRef = useRef(false);

  // 灯笼图片地址 - 双图片系统
  const lanternImages = {
    off: 'https://sprbweb-src.oss-cn-guangzhou.aliyuncs.com/public/images/divineRealm/%E7%A5%9E%E5%9F%9F%E7%81%AF%E7%AC%BC-%E7%86%84%E7%81%AD.webp',
    on: 'https://sprbweb-src.oss-cn-guangzhou.aliyuncs.com/public/images/divineRealm/%E7%A5%9E%E5%9F%9F%E7%81%AF%E7%AC%BC-%E4%BA%AE%E5%85%89.webp'
  };

  // 预加载图片
  const preloadImages = useCallback(() => {
    if (imagesPreloadedRef.current) return;
    
    // 预加载两张灯笼图片
    Object.values(lanternImages).forEach(src => {
      const img = new Image();
      img.src = src;
    });
    imagesPreloadedRef.current = true;
  }, [lanternImages]);

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
      elementUnderMouse.tagName === 'IMG' || // 检测所有图片元素
      elementUnderMouse.getAttribute('role') === 'button' ||
      elementUnderMouse.classList.contains('clickable') ||
      elementUnderMouse.classList.contains('memory-butterfly') || // 检测七影蝶
      elementUnderMouse.classList.contains('divine-clickable') || // 检测神域页面按钮
      elementUnderMouse.classList.contains('memory-card-image') || // 检测七影蝶信息页面图片
      elementUnderMouse.classList.contains('memory-card-audio') || // 检测七影蝶信息页面音频
      elementUnderMouse.classList.contains('grid-image') || // 检测九宫格图片
      elementUnderMouse.classList.contains('grid-image-item') || // 检测九宫格图片容器
      elementUnderMouse.hasAttribute('data-divine-player-button') || // 检测神域音乐播放器
      (elementUnderMouse instanceof HTMLElement && elementUnderMouse.style.cursor === 'pointer') ||
      // 检查父元素是否可点击
      elementUnderMouse.closest('a, button, [role="button"], .clickable, .memory-butterfly, .divine-clickable, .memory-card-image, .memory-card-audio, .grid-image-item, [data-divine-player-button]')
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
      className={`lantern-cursor ${isOnClickable ? 'on-clickable' : ''}`}
      style={{
        transform: `translate3d(${mousePosition.x - 25}px, ${mousePosition.y - 25}px, 0)`,
        willChange: 'transform', // 提示浏览器启用硬件加速
        pointerEvents: 'none', // 确保不会阻挡点击事件
        border: 'none',
        outline: 'none',
        boxShadow: 'none',
        background: 'transparent',
      }}
    >
      <img
        src={isOnClickable ? lanternImages.on : lanternImages.off}
        alt="神域灯笼鼠标"
        className="lantern-image"
        draggable={false}
        style={{
          userSelect: 'none',
          transform: isOnClickable ? 'scale(1.15)' : 'scale(1)',
          transition: 'transform 0.3s ease-out',
          willChange: 'transform',
          pointerEvents: 'none',
          border: 'none',
          outline: 'none',
          boxShadow: 'none',
          background: 'transparent',
          filter: 'none',
        }}
      />
    </div>
  );
};

export default LanternCustomCursor;
