import React from 'react'
import { useDeviceDetection } from '../hooks/useDeviceDetection'
import '../utils/deviceDetectionTest' // 导入测试工具，使其在开发环境中可用

/**
 * 设备信息显示组件 - 用于开发和调试
 * 在开发环境中显示当前设备检测信息
 */
const DeviceInfoDisplay: React.FC = () => {
  const { 
    isMobile, 
    isTablet, 
    isDesktop, 
    deviceInfo, 
    isTouch, 
    isPortrait, 
    isSmallScreen,
    getDebugInfo 
  } = useDeviceDetection()
  
  const debugInfo = getDebugInfo()
  
  // 只在开发环境显示
  if (import.meta.env.DEV !== true) {
    return null
  }
  
  return (
    <div
      style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        background: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        fontSize: '12px',
        fontFamily: 'monospace',
        zIndex: 9999,
        maxWidth: '200px'
      }}
    >
      <div><strong>设备检测信息</strong></div>
      <div>检测为: {debugInfo.detectedAs}</div>
      <div>移动端: {isMobile ? '✓' : '✗'}</div>
      <div>平板: {isTablet ? '✓' : '✗'}</div>
      <div>桌面端: {isDesktop ? '✓' : '✗'}</div>
      <div>屏幕: {debugInfo.screenSize}</div>
      <div>触摸: {isTouch ? '✓' : '✗'}</div>
      <div>方向: {isPortrait ? '竖屏' : '横屏'}</div>
      <div>小屏: {isSmallScreen ? '✓' : '✗'}</div>
      <div>像素比: {deviceInfo.pixelRatio}</div>
    </div>
  )
}

export default DeviceInfoDisplay