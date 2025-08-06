import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'

export interface DeviceInfo {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  screenWidth: number
  screenHeight: number
  hasTouch: boolean
  orientation: 'portrait' | 'landscape'
  pixelRatio: number
}

interface DeviceContextType {
  deviceInfo: DeviceInfo
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  updateDeviceInfo: () => void
}

const DeviceContext = createContext<DeviceContextType | undefined>(undefined)

export const useDevice = () => {
  const context = useContext(DeviceContext)
  if (context === undefined) {
    throw new Error('useDevice must be used within a DeviceProvider')
  }
  return context
}

interface DeviceProviderProps {
  children: ReactNode
}

// 设备检测逻辑
const detectDevice = (): DeviceInfo => {
  const userAgent = navigator.userAgent.toLowerCase()
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  const screenWidth = window.innerWidth
  const screenHeight = window.innerHeight
  
  // 平板检测：iPad或Android平板，且屏幕尺寸在平板范围内
  const isTablet = (/ipad|android/i.test(userAgent) && hasTouch && screenWidth >= 768 && screenWidth < 1024)
  
  // 移动设备检测：用户代理字符串（排除平板）+ 触摸支持 + 屏幕尺寸
  const isMobile = (!isTablet && /android|webos|iphone|ipod|blackberry|iemobile|opera mini/i.test(userAgent)) 
    || (hasTouch && screenWidth < 768)
  
  // 桌面检测：既不是移动端也不是平板
  const isDesktop = !isMobile && !isTablet
  
  return {
    isMobile,
    isTablet,
    isDesktop,
    screenWidth,
    screenHeight,
    hasTouch,
    orientation: screenWidth > screenHeight ? 'landscape' : 'portrait',
    pixelRatio: window.devicePixelRatio || 1
  }
}

export const DeviceProvider: React.FC<DeviceProviderProps> = ({ children }) => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>(() => detectDevice())
  
  // 更新设备信息的方法
  const updateDeviceInfo = useCallback(() => {
    const newDeviceInfo = detectDevice()
    setDeviceInfo(newDeviceInfo)
    console.log('设备信息已更新:', newDeviceInfo)
  }, [])
  
  // 监听窗口大小变化
  useEffect(() => {
    const handleResize = () => {
      updateDeviceInfo()
    }
    
    // 防抖处理，避免频繁更新
    let timeoutId: number
    const debouncedHandleResize = () => {
      clearTimeout(timeoutId)
      timeoutId = window.setTimeout(handleResize, 150)
    }
    
    window.addEventListener('resize', debouncedHandleResize)
    window.addEventListener('orientationchange', debouncedHandleResize)
    
    return () => {
      window.removeEventListener('resize', debouncedHandleResize)
      window.removeEventListener('orientationchange', debouncedHandleResize)
      clearTimeout(timeoutId)
    }
  }, [updateDeviceInfo])
  
  // 初始化时记录设备信息
  useEffect(() => {
    console.log('设备检测初始化:', deviceInfo)
  }, [])
  
  const value = {
    deviceInfo,
    isMobile: deviceInfo.isMobile,
    isTablet: deviceInfo.isTablet,
    isDesktop: deviceInfo.isDesktop,
    updateDeviceInfo
  }
  
  return (
    <DeviceContext.Provider value={value}>
      {children}
    </DeviceContext.Provider>
  )
}