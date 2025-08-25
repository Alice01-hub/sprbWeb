/**
 * 可访问性工具
 * Accessibility Utilities
 */

// 键盘导航键码
export enum KeyCode {
  TAB = 'Tab',
  ENTER = 'Enter',
  SPACE = ' ',
  ESCAPE = 'Escape',
  ARROW_UP = 'ArrowUp',
  ARROW_DOWN = 'ArrowDown',
  ARROW_LEFT = 'ArrowLeft',
  ARROW_RIGHT = 'ArrowRight',
  HOME = 'Home',
  END = 'End'
}

// ARIA 角色
export enum AriaRole {
  BUTTON = 'button',
  DIALOG = 'dialog',
  REGION = 'region',
  LIST = 'list',
  LISTITEM = 'listitem',
  ARTICLE = 'article',
  BANNER = 'banner',
  NAVIGATION = 'navigation',
  MAIN = 'main',
  COMPLEMENTARY = 'complementary',
  ALERT = 'alert',
  STATUS = 'status',
  PROGRESSBAR = 'progressbar'
}

// ARIA 属性接口
export interface AriaAttributes {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-expanded'?: boolean;
  'aria-hidden'?: boolean;
  'aria-live'?: 'off' | 'polite' | 'assertive';
  'aria-atomic'?: boolean;
  'aria-busy'?: boolean;
  'aria-disabled'?: boolean;
  'aria-pressed'?: boolean;
  'aria-selected'?: boolean;
  'aria-current'?: boolean | 'page' | 'step' | 'location' | 'date' | 'time';
  'aria-level'?: number;
  'aria-setsize'?: number;
  'aria-posinset'?: number;
  'aria-controls'?: string;
  'aria-owns'?: string;
  'aria-activedescendant'?: string;
}

/**
 * 可访问性管理器类
 */
export class AccessibilityManager {
  private focusableElements: string[] = [
    'button',
    'input',
    'select',
    'textarea',
    'a[href]',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]'
  ];

  private trapFocusElements: HTMLElement[] = [];
  private lastFocusedElement: HTMLElement | null = null;

  /**
   * 设置焦点陷阱
   */
  trapFocus(container: HTMLElement): void {
    this.lastFocusedElement = document.activeElement as HTMLElement;
    
    const focusableElements = this.getFocusableElements(container);
    this.trapFocusElements = focusableElements;

    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }

    container.addEventListener('keydown', this.handleTrapFocusKeydown);
  }

  /**
   * 释放焦点陷阱
   */
  releaseFocus(container: HTMLElement | null): void {
    if (container) {
      container.removeEventListener('keydown', this.handleTrapFocusKeydown);
    }
    
    if (this.lastFocusedElement) {
      try {
        this.lastFocusedElement.focus();
      } catch (error) {
        console.warn('无法恢复焦点:', error);
      }
      this.lastFocusedElement = null;
    }
    
    this.trapFocusElements = [];
  }

  /**
   * 处理焦点陷阱键盘事件
   */
  private handleTrapFocusKeydown = (event: KeyboardEvent): void => {
    if (event.key !== KeyCode.TAB || this.trapFocusElements.length === 0) {
      return;
    }

    const firstElement = this.trapFocusElements[0];
    const lastElement = this.trapFocusElements[this.trapFocusElements.length - 1];

    if (event.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  };

  /**
   * 获取容器内可聚焦的元素
   */
  getFocusableElements(container: HTMLElement): HTMLElement[] {
    const selector = this.focusableElements.join(', ');
    const elements = Array.from(container.querySelectorAll(selector)) as HTMLElement[];
    
    return elements.filter(element => {
      return this.isElementVisible(element) && !element.disabled;
    });
  }

  /**
   * 检查元素是否可见
   */
  private isElementVisible(element: HTMLElement): boolean {
    const style = window.getComputedStyle(element);
    return (
      style.display !== 'none' &&
      style.visibility !== 'hidden' &&
      style.opacity !== '0' &&
      element.offsetWidth > 0 &&
      element.offsetHeight > 0
    );
  }

  /**
   * 创建唯一ID
   */
  generateId(prefix: string = 'accessibility'): string {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * 设置ARIA属性
   */
  setAriaAttributes(element: HTMLElement, attributes: AriaAttributes): void {
    Object.entries(attributes).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        element.setAttribute(key, String(value));
      }
    });
  }

  /**
   * 移除ARIA属性
   */
  removeAriaAttributes(element: HTMLElement, attributes: string[]): void {
    attributes.forEach(attr => {
      element.removeAttribute(attr);
    });
  }

  /**
   * 宣布消息给屏幕阅读器
   */
  announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', priority);
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.textContent = message;

    document.body.appendChild(announcer);

    // 短暂延迟后移除元素
    setTimeout(() => {
      document.body.removeChild(announcer);
    }, 1000);
  }

  /**
   * 检查是否启用了减少动画
   */
  prefersReducedMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /**
   * 检查是否启用了高对比度
   */
  prefersHighContrast(): boolean {
    return window.matchMedia('(prefers-contrast: high)').matches;
  }

  /**
   * 检查颜色对比度是否符合WCAG标准
   */
  checkColorContrast(foreground: string, background: string): {
    ratio: number;
    passAA: boolean;
    passAAA: boolean;
  } {
    const fgLuminance = this.getLuminance(foreground);
    const bgLuminance = this.getLuminance(background);
    
    const ratio = (Math.max(fgLuminance, bgLuminance) + 0.05) / 
                  (Math.min(fgLuminance, bgLuminance) + 0.05);

    return {
      ratio: Math.round(ratio * 100) / 100,
      passAA: ratio >= 4.5,
      passAAA: ratio >= 7
    };
  }

  /**
   * 计算颜色的相对亮度
   */
  private getLuminance(color: string): number {
    // 简化的亮度计算，实际应用中可能需要更复杂的实现
    const rgb = this.hexToRgb(color);
    if (!rgb) return 0;

    const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  /**
   * 将十六进制颜色转换为RGB
   */
  private hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  /**
   * 创建键盘导航处理器
   */
  createKeyboardNavigationHandler(
    elements: HTMLElement[],
    options: {
      loop?: boolean;
      orientation?: 'horizontal' | 'vertical';
      onActivate?: (element: HTMLElement, index: number) => void;
    } = {}
  ): (event: KeyboardEvent) => void {
    const { loop = true, orientation = 'vertical', onActivate } = options;

    return (event: KeyboardEvent) => {
      const currentIndex = elements.findIndex(el => el === document.activeElement);
      if (currentIndex === -1) return;

      let nextIndex = currentIndex;

      switch (event.key) {
        case orientation === 'vertical' ? KeyCode.ARROW_DOWN : KeyCode.ARROW_RIGHT:
          event.preventDefault();
          nextIndex = currentIndex + 1;
          if (nextIndex >= elements.length) {
            nextIndex = loop ? 0 : elements.length - 1;
          }
          break;

        case orientation === 'vertical' ? KeyCode.ARROW_UP : KeyCode.ARROW_LEFT:
          event.preventDefault();
          nextIndex = currentIndex - 1;
          if (nextIndex < 0) {
            nextIndex = loop ? elements.length - 1 : 0;
          }
          break;

        case KeyCode.HOME:
          event.preventDefault();
          nextIndex = 0;
          break;

        case KeyCode.END:
          event.preventDefault();
          nextIndex = elements.length - 1;
          break;

        case KeyCode.ENTER:
        case KeyCode.SPACE:
          event.preventDefault();
          onActivate?.(elements[currentIndex], currentIndex);
          return;
      }

      if (nextIndex !== currentIndex) {
        elements[nextIndex].focus();
      }
    };
  }
}

// 导出默认实例
export const accessibilityManager = new AccessibilityManager();

// 屏幕阅读器专用样式类
export const SR_ONLY_CLASS = 'sr-only';

// 常用的可访问性工具函数
export const a11yUtils = {
  /**
   * 为元素添加屏幕阅读器专用文本
   */
  addScreenReaderText(element: HTMLElement, text: string): void {
    const srText = document.createElement('span');
    srText.className = SR_ONLY_CLASS;
    srText.textContent = text;
    element.appendChild(srText);
  },

  /**
   * 创建描述性文本元素
   */
  createDescription(id: string, text: string): HTMLElement {
    const description = document.createElement('div');
    description.id = id;
    description.className = SR_ONLY_CLASS;
    description.textContent = text;
    return description;
  },

  /**
   * 格式化日期为可访问的格式
   */
  formatDateForScreenReader(date: Date): string {
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  },

  /**
   * 获取公告优先级的可访问描述
   */
  getPriorityDescription(priority: string): string {
    const descriptions = {
      urgent: '紧急通知',
      important: '重要通知',
      normal: '一般通知',
      info: '提示信息'
    };
    return descriptions[priority as keyof typeof descriptions] || '通知';
  }
};

export default accessibilityManager;