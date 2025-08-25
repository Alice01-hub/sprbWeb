/**
 * 动画优化工具
 * Animation Optimization Utilities
 * 
 * 提供动画节流、防抖和性能监控功能
 */

import React from 'react';

// 动画帧请求管理器
class AnimationFrameManager {
  private rafId: number | null = null;
  private callbacks: Set<() => void> = new Set();

  /**
   * 添加动画回调
   */
  addCallback(callback: () => void): void {
    this.callbacks.add(callback);
    this.scheduleFrame();
  }

  /**
   * 移除动画回调
   */
  removeCallback(callback: () => void): void {
    this.callbacks.delete(callback);
    if (this.callbacks.size === 0) {
      this.cancelFrame();
    }
  }

  /**
   * 调度动画帧
   */
  private scheduleFrame(): void {
    if (this.rafId === null) {
      this.rafId = requestAnimationFrame(() => {
        this.executeCallbacks();
        this.rafId = null;
        if (this.callbacks.size > 0) {
          this.scheduleFrame();
        }
      });
    }
  }

  /**
   * 取消动画帧
   */
  private cancelFrame(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  /**
   * 执行所有回调
   */
  private executeCallbacks(): void {
    this.callbacks.forEach(callback => {
      try {
        callback();
      } catch (error) {
        console.error('动画回调执行失败:', error);
      }
    });
  }

  /**
   * 清理所有回调
   */
  cleanup(): void {
    this.callbacks.clear();
    this.cancelFrame();
  }
}

// 全局动画帧管理器
export const animationFrameManager = new AnimationFrameManager();

// 动画节流函数
export function throttleAnimation<T extends (...args: any[]) => void>(
  func: T,
  delay: number = 16 // 默认60fps
): T {
  let lastTime = 0;
  let timeoutId: number | null = null;

  return ((...args: Parameters<T>) => {
    const now = performance.now();
    const timeSinceLastCall = now - lastTime;

    if (timeSinceLastCall >= delay) {
      lastTime = now;
      func.apply(this, args);
    } else {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
      timeoutId = window.setTimeout(() => {
        lastTime = performance.now();
        func.apply(this, args);
        timeoutId = null;
      }, delay - timeSinceLastCall);
    }
  }) as T;
}

// 动画防抖函数
export function debounceAnimation<T extends (...args: any[]) => void>(
  func: T,
  delay: number = 100
): T {
  let timeoutId: number | null = null;

  return ((...args: Parameters<T>) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    
    timeoutId = window.setTimeout(() => {
      func.apply(this, args);
      timeoutId = null;
    }, delay);
  }) as T;
}

// 基于requestAnimationFrame的节流
export function rafThrottle<T extends (...args: any[]) => void>(func: T): T {
  let rafId: number | null = null;
  let latestArgs: Parameters<T> | null = null;

  return ((...args: Parameters<T>) => {
    latestArgs = args;
    
    if (rafId === null) {
      rafId = requestAnimationFrame(() => {
        if (latestArgs !== null) {
          func.apply(this, latestArgs);
          latestArgs = null;
        }
        rafId = null;
      });
    }
  }) as T;
}

// 动画性能监控器
export class AnimationPerformanceMonitor {
  private frameCount = 0;
  private lastTime = performance.now();
  private fps = 60;
  private isMonitoring = false;
  private monitoringCallback: ((fps: number) => void) | null = null;

  /**
   * 开始监控FPS
   */
  startMonitoring(callback?: (fps: number) => void): void {
    this.isMonitoring = true;
    this.monitoringCallback = callback || null;
    this.frameCount = 0;
    this.lastTime = performance.now();
    this.monitorFrame();
  }

  /**
   * 停止监控
   */
  stopMonitoring(): void {
    this.isMonitoring = false;
    this.monitoringCallback = null;
  }

  /**
   * 获取当前FPS
   */
  getCurrentFPS(): number {
    return this.fps;
  }

  /**
   * 监控帧率
   */
  private monitorFrame(): void {
    if (!this.isMonitoring) return;

    this.frameCount++;
    const currentTime = performance.now();
    const elapsed = currentTime - this.lastTime;

    if (elapsed >= 1000) { // 每秒计算一次FPS
      this.fps = Math.round((this.frameCount * 1000) / elapsed);
      this.frameCount = 0;
      this.lastTime = currentTime;

      // 调用回调函数
      if (this.monitoringCallback) {
        this.monitoringCallback(this.fps);
      }

      // 性能警告
      if (this.fps < 30) {
        console.warn(`⚠️ 动画性能较低: ${this.fps} FPS`);
      } else if (this.fps < 45) {
        console.info(`ℹ️ 动画性能一般: ${this.fps} FPS`);
      }
    }

    requestAnimationFrame(() => this.monitorFrame());
  }
}

// 全局性能监控器
export const animationPerformanceMonitor = new AnimationPerformanceMonitor();

// 动画优化配置
interface AnimationOptimizationConfig {
  enableHardwareAcceleration: boolean;
  maxConcurrentAnimations: number;
  lowPerformanceThreshold: number;
  enablePerformanceMonitoring: boolean;
  adaptiveQuality: boolean;
}

// 默认配置
const defaultConfig: AnimationOptimizationConfig = {
  enableHardwareAcceleration: true,
  maxConcurrentAnimations: 10,
  lowPerformanceThreshold: 30,
  enablePerformanceMonitoring: true,
  adaptiveQuality: true
};

// 动画优化器类
export class AnimationOptimizer {
  private config: AnimationOptimizationConfig;
  private activeAnimations: Set<string> = new Set();
  private performanceLevel: 'high' | 'medium' | 'low' = 'high';

  constructor(config: Partial<AnimationOptimizationConfig> = {}) {
    this.config = { ...defaultConfig, ...config };
    this.initializeOptimizer();
  }

  /**
   * 初始化优化器
   */
  private initializeOptimizer(): void {
    if (this.config.enablePerformanceMonitoring) {
      animationPerformanceMonitor.startMonitoring((fps) => {
        this.updatePerformanceLevel(fps);
      });
    }

    // 检测设备性能
    this.detectDevicePerformance();
  }

  /**
   * 检测设备性能
   */
  private detectDevicePerformance(): void {
    // 检测硬件并发数
    const hardwareConcurrency = navigator.hardwareConcurrency || 4;
    
    // 检测内存信息
    const memory = (navigator as any).deviceMemory || 4;
    
    // 检测连接类型
    const connection = (navigator as any).connection;
    const effectiveType = connection?.effectiveType || '4g';

    // 根据设备信息调整性能等级
    if (hardwareConcurrency <= 2 || memory <= 2 || effectiveType === '2g') {
      this.performanceLevel = 'low';
    } else if (hardwareConcurrency <= 4 || memory <= 4 || effectiveType === '3g') {
      this.performanceLevel = 'medium';
    } else {
      this.performanceLevel = 'high';
    }

    console.log(`🎯 设备性能等级: ${this.performanceLevel}`);
  }

  /**
   * 更新性能等级
   */
  private updatePerformanceLevel(fps: number): void {
    if (fps < this.config.lowPerformanceThreshold) {
      this.performanceLevel = 'low';
    } else if (fps < 45) {
      this.performanceLevel = 'medium';
    } else {
      this.performanceLevel = 'high';
    }

    if (this.config.adaptiveQuality) {
      this.applyPerformanceOptimizations();
    }
  }

  /**
   * 应用性能优化
   */
  private applyPerformanceOptimizations(): void {
    const body = document.body;
    
    // 移除之前的性能类
    body.classList.remove('perf-high', 'perf-medium', 'perf-low');
    
    // 添加当前性能类
    body.classList.add(`perf-${this.performanceLevel}`);

    // 根据性能等级调整动画
    switch (this.performanceLevel) {
      case 'low':
        this.applyLowPerformanceOptimizations();
        break;
      case 'medium':
        this.applyMediumPerformanceOptimizations();
        break;
      case 'high':
        this.applyHighPerformanceOptimizations();
        break;
    }
  }

  /**
   * 低性能优化
   */
  private applyLowPerformanceOptimizations(): void {
    const style = document.createElement('style');
    style.id = 'low-perf-optimizations';
    style.textContent = `
      .hanging-wooden-sign {
        animation-duration: 10s !important;
      }
      .rope-connector__line {
        animation: none !important;
      }
      .hanging-wooden-sign__new-dot {
        animation-duration: 3s !important;
      }

    `;
    
    // 移除旧的样式
    const oldStyle = document.getElementById('low-perf-optimizations');
    if (oldStyle) {
      oldStyle.remove();
    }
    
    document.head.appendChild(style);
  }

  /**
   * 中等性能优化
   */
  private applyMediumPerformanceOptimizations(): void {
    const style = document.createElement('style');
    style.id = 'medium-perf-optimizations';
    style.textContent = `
      .hanging-wooden-sign {
        animation-duration: 8s !important;
      }
      .rope-connector__line {
        animation-duration: 6s !important;
      }

    `;
    
    const oldStyle = document.getElementById('medium-perf-optimizations');
    if (oldStyle) {
      oldStyle.remove();
    }
    
    document.head.appendChild(style);
  }

  /**
   * 高性能优化
   */
  private applyHighPerformanceOptimizations(): void {
    // 移除性能限制样式
    const lowPerfStyle = document.getElementById('low-perf-optimizations');
    const mediumPerfStyle = document.getElementById('medium-perf-optimizations');
    
    if (lowPerfStyle) lowPerfStyle.remove();
    if (mediumPerfStyle) mediumPerfStyle.remove();
  }

  /**
   * 注册动画
   */
  registerAnimation(animationId: string): boolean {
    if (this.activeAnimations.size >= this.config.maxConcurrentAnimations) {
      console.warn(`⚠️ 达到最大并发动画数量限制: ${this.config.maxConcurrentAnimations}`);
      return false;
    }

    this.activeAnimations.add(animationId);
    return true;
  }

  /**
   * 注销动画
   */
  unregisterAnimation(animationId: string): void {
    this.activeAnimations.delete(animationId);
  }

  /**
   * 获取当前性能等级
   */
  getPerformanceLevel(): 'high' | 'medium' | 'low' {
    return this.performanceLevel;
  }

  /**
   * 获取活跃动画数量
   */
  getActiveAnimationCount(): number {
    return this.activeAnimations.size;
  }

  /**
   * 清理优化器
   */
  cleanup(): void {
    animationPerformanceMonitor.stopMonitoring();
    this.activeAnimations.clear();
    
    // 移除性能优化样式
    const styles = ['low-perf-optimizations', 'medium-perf-optimizations'];
    styles.forEach(id => {
      const style = document.getElementById(id);
      if (style) style.remove();
    });
  }
}

// 全局动画优化器
export const animationOptimizer = new AnimationOptimizer();

// React Hook for animation optimization
export function useAnimationOptimization(animationId: string) {
  React.useEffect(() => {
    const registered = animationOptimizer.registerAnimation(animationId);
    
    return () => {
      if (registered) {
        animationOptimizer.unregisterAnimation(animationId);
      }
    };
  }, [animationId]);

  return {
    performanceLevel: animationOptimizer.getPerformanceLevel(),
    activeAnimationCount: animationOptimizer.getActiveAnimationCount(),
    shouldReduceMotion: animationOptimizer.getPerformanceLevel() === 'low'
  };
}

// 智能动画调度器
export class SmartAnimationScheduler {
  private animationQueue: Array<{
    id: string;
    callback: () => void;
    priority: number;
    delay?: number;
  }> = [];
  private isProcessing = false;

  /**
   * 添加动画到队列
   */
  scheduleAnimation(
    id: string,
    callback: () => void,
    priority: number = 1,
    delay?: number
  ): void {
    this.animationQueue.push({ id, callback, priority, delay });
    this.animationQueue.sort((a, b) => b.priority - a.priority);
    
    if (!this.isProcessing) {
      this.processQueue();
    }
  }

  /**
   * 处理动画队列
   */
  private async processQueue(): Promise<void> {
    if (this.animationQueue.length === 0) {
      this.isProcessing = false;
      return;
    }

    this.isProcessing = true;
    const animation = this.animationQueue.shift();
    
    if (animation) {
      try {
        if (animation.delay) {
          await new Promise(resolve => setTimeout(resolve, animation.delay));
        }
        
        animation.callback();
      } catch (error) {
        console.error(`动画执行失败 (${animation.id}):`, error);
      }
    }

    // 继续处理下一个动画
    requestAnimationFrame(() => this.processQueue());
  }

  /**
   * 清空队列
   */
  clearQueue(): void {
    this.animationQueue = [];
    this.isProcessing = false;
  }

  /**
   * 获取队列长度
   */
  getQueueLength(): number {
    return this.animationQueue.length;
  }
}

// 全局动画调度器
export const smartAnimationScheduler = new SmartAnimationScheduler();

export default {
  animationFrameManager,
  throttleAnimation,
  debounceAnimation,
  rafThrottle,
  animationPerformanceMonitor,
  animationOptimizer,
  smartAnimationScheduler,
  useAnimationOptimization
};