import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { AnimationOptimizer } from '../animationOptimizer'

describe('AnimationOptimizer', () => {
  let optimizer: AnimationOptimizer
  let mockElement: HTMLElement

  beforeEach(() => {
    optimizer = new AnimationOptimizer()
    mockElement = document.createElement('div')
    document.body.appendChild(mockElement)
    
    // Mock requestAnimationFrame
    global.requestAnimationFrame = vi.fn((cb) => {
      setTimeout(cb, 16)
      return 1
    })
    
    global.cancelAnimationFrame = vi.fn()
  })

  afterEach(() => {
    document.body.removeChild(mockElement)
    vi.restoreAllMocks()
  })

  describe('optimizeForPerformance', () => {
    it('should add will-change property to element', () => {
      optimizer.optimizeForPerformance(mockElement, ['transform', 'opacity'])
      
      expect(mockElement.style.willChange).toBe('transform, opacity')
    })

    it('should enable GPU acceleration with transform3d', () => {
      optimizer.optimizeForPerformance(mockElement, ['transform'])
      
      expect(mockElement.style.transform).toContain('translateZ(0)')
    })

    it('should handle multiple properties', () => {
      optimizer.optimizeForPerformance(mockElement, ['transform', 'opacity', 'filter'])
      
      expect(mockElement.style.willChange).toBe('transform, opacity, filter')
    })
  })

  describe('cleanupOptimization', () => {
    it('should remove will-change property', () => {
      mockElement.style.willChange = 'transform, opacity'
      
      optimizer.cleanupOptimization(mockElement)
      
      expect(mockElement.style.willChange).toBe('')
    })

    it('should remove GPU acceleration transform', () => {
      mockElement.style.transform = 'translateZ(0) scale(1.1)'
      
      optimizer.cleanupOptimization(mockElement)
      
      expect(mockElement.style.transform).toBe('scale(1.1)')
    })
  })

  describe('throttleAnimation', () => {
    it('should throttle animation calls', async () => {
      const mockCallback = vi.fn()
      const throttledFn = optimizer.throttleAnimation(mockCallback, 100)
      
      throttledFn()
      throttledFn()
      throttledFn()
      
      expect(mockCallback).toHaveBeenCalledTimes(1)
      
      await new Promise(resolve => setTimeout(resolve, 150))
      
      throttledFn()
      expect(mockCallback).toHaveBeenCalledTimes(2)
    })

    it('should preserve function context', async () => {
      const context = { value: 'test' }
      const mockCallback = vi.fn(function(this: any) {
        return this.value
      })
      
      const throttledFn = optimizer.throttleAnimation(mockCallback.bind(context), 50)
      throttledFn()
      
      await new Promise(resolve => setTimeout(resolve, 60))
      
      expect(mockCallback).toHaveBeenCalledTimes(1)
    })
  })

  describe('debounceAnimation', () => {
    it('should debounce animation calls', async () => {
      const mockCallback = vi.fn()
      const debouncedFn = optimizer.debounceAnimation(mockCallback, 100)
      
      debouncedFn()
      debouncedFn()
      debouncedFn()
      
      expect(mockCallback).not.toHaveBeenCalled()
      
      await new Promise(resolve => setTimeout(resolve, 150))
      
      expect(mockCallback).toHaveBeenCalledTimes(1)
    })

    it('should reset debounce timer on subsequent calls', async () => {
      const mockCallback = vi.fn()
      const debouncedFn = optimizer.debounceAnimation(mockCallback, 100)
      
      debouncedFn()
      
      await new Promise(resolve => setTimeout(resolve, 50))
      
      debouncedFn() // This should reset the timer
      
      await new Promise(resolve => setTimeout(resolve, 60))
      
      expect(mockCallback).not.toHaveBeenCalled()
      
      await new Promise(resolve => setTimeout(resolve, 50))
      
      expect(mockCallback).toHaveBeenCalledTimes(1)
    })
  })

  describe('createOptimizedAnimation', () => {
    it('should create animation with performance optimizations', () => {
      const animation = optimizer.createOptimizedAnimation(mockElement, {
        transform: 'translateY(0px)',
        opacity: '1'
      }, {
        duration: 300,
        easing: 'ease-out'
      })
      
      expect(animation).toBeDefined()
      expect(mockElement.style.willChange).toContain('transform')
      expect(mockElement.style.willChange).toContain('opacity')
    })

    it('should cleanup optimizations when animation finishes', async () => {
      const animation = optimizer.createOptimizedAnimation(mockElement, {
        transform: 'translateY(100px)'
      }, {
        duration: 100
      })
      
      expect(mockElement.style.willChange).toContain('transform')
      
      // Wait for animation to complete
      await new Promise(resolve => setTimeout(resolve, 150))
      
      // Cleanup should have been called
      expect(mockElement.style.willChange).toBe('')
    })
  })

  describe('isReducedMotionPreferred', () => {
    it('should detect reduced motion preference', () => {
      // Mock matchMedia for reduced motion
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation(query => ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      })
      
      expect(optimizer.isReducedMotionPreferred()).toBe(true)
    })

    it('should return false when reduced motion is not preferred', () => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation(query => ({
          matches: false,
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      })
      
      expect(optimizer.isReducedMotionPreferred()).toBe(false)
    })
  })

  describe('measurePerformance', () => {
    it('should measure animation performance', async () => {
      const mockAnimation = vi.fn().mockResolvedValue(undefined)
      
      const metrics = await optimizer.measurePerformance('test-animation', mockAnimation)
      
      expect(metrics.name).toBe('test-animation')
      expect(metrics.duration).toBeGreaterThan(0)
      expect(mockAnimation).toHaveBeenCalledTimes(1)
    })

    it('should handle animation errors', async () => {
      const mockAnimation = vi.fn().mockRejectedValue(new Error('Animation failed'))
      
      const metrics = await optimizer.measurePerformance('test-animation', mockAnimation)
      
      expect(metrics.name).toBe('test-animation')
      expect(metrics.error).toBe('Animation failed')
    })
  })

  describe('batchAnimations', () => {
    it('should batch multiple animations together', async () => {
      const element1 = document.createElement('div')
      const element2 = document.createElement('div')
      
      const animations = [
        () => optimizer.createOptimizedAnimation(element1, { opacity: '0.5' }, { duration: 100 }),
        () => optimizer.createOptimizedAnimation(element2, { transform: 'scale(1.1)' }, { duration: 100 })
      ]
      
      await optimizer.batchAnimations(animations)
      
      // Both animations should have been executed
      expect(element1.style.willChange).toBe('')
      expect(element2.style.willChange).toBe('')
    })

    it('should handle animation failures in batch', async () => {
      const element1 = document.createElement('div')
      
      const animations = [
        () => optimizer.createOptimizedAnimation(element1, { opacity: '0.5' }, { duration: 100 }),
        () => { throw new Error('Animation failed') },
        () => optimizer.createOptimizedAnimation(element1, { transform: 'scale(1.1)' }, { duration: 100 })
      ]
      
      await expect(optimizer.batchAnimations(animations)).resolves.not.toThrow()
    })
  })
})