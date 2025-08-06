import { useDevice } from '../contexts/DeviceContext'

/**
 * 设备检测Hook - 提供便捷的设备类型检测
 * 
 * @returns 设备检测相关的状态和方法
 */
export const useDeviceDetection = () => {
  const { deviceInfo, isMobile, isTablet, isDesktop, updateDeviceInfo } = useDevice()
  
  return {
    // 设备类型
    isMobile,
    isTablet,
    isDesktop,
    
    // 设备信息
    deviceInfo,
    
    // 便捷方法
    isTouch: deviceInfo.hasTouch,
    isPortrait: deviceInfo.orientation === 'portrait',
    isLandscape: deviceInfo.orientation === 'landscape',
    isSmallScreen: deviceInfo.screenWidth < 768,
    isMediumScreen: deviceInfo.screenWidth >= 768 && deviceInfo.screenWidth < 1024,
    isLargeScreen: deviceInfo.screenWidth >= 1024,
    
    // 更新方法
    updateDeviceInfo,
    
    // 调试信息
    getDebugInfo: () => ({
      userAgent: navigator.userAgent,
      screenSize: `${deviceInfo.screenWidth}x${deviceInfo.screenHeight}`,
      pixelRatio: deviceInfo.pixelRatio,
      hasTouch: deviceInfo.hasTouch,
      orientation: deviceInfo.orientation,
      detectedAs: isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop'
    })
  }
}