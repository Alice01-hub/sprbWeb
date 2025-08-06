# Device Detection System

## 概述

设备检测系统为Summer Pockets巡礼网站提供了准确的设备类型识别功能，支持移动端、平板和桌面端的自动检测。

## 核心组件

### DeviceContext
- **位置**: `src/contexts/DeviceContext.tsx`
- **功能**: 提供全局设备状态管理
- **特性**:
  - 自动检测设备类型（移动端/平板/桌面端）
  - 监听窗口大小变化并更新设备信息
  - 防抖处理避免频繁更新
  - 提供设备信息的React Context

### useDeviceDetection Hook
- **位置**: `src/hooks/useDeviceDetection.ts`
- **功能**: 便捷的设备检测Hook
- **特性**:
  - 提供设备类型判断
  - 屏幕尺寸分类
  - 方向检测
  - 调试信息获取

### DeviceInfoDisplay 组件
- **位置**: `src/components/DeviceInfoDisplay.tsx`
- **功能**: 开发环境下的设备信息显示
- **特性**:
  - 仅在开发环境显示
  - 实时显示设备检测结果
  - 便于开发和调试

## 检测逻辑

### 设备分类标准

1. **移动端 (Mobile)**:
   - 用户代理包含移动设备标识符
   - 或者有触摸支持且屏幕宽度 < 768px

2. **平板 (Tablet)**:
   - 用户代理包含iPad或Android
   - 有触摸支持
   - 屏幕宽度在 768px - 1024px 之间

3. **桌面端 (Desktop)**:
   - 既不是移动端也不是平板

### 检测参数

- **用户代理字符串**: 识别设备类型
- **屏幕尺寸**: 窗口内部宽度和高度
- **触摸支持**: 检测是否支持触摸事件
- **设备像素比**: 高分辨率屏幕检测
- **屏幕方向**: 横屏或竖屏

## 使用方法

### 基本使用

```tsx
import { useDevice } from '../contexts/DeviceContext'

function MyComponent() {
  const { isMobile, isTablet, isDesktop, deviceInfo } = useDevice()
  
  return (
    <div>
      {isMobile && <MobileView />}
      {isTablet && <TabletView />}
      {isDesktop && <DesktopView />}
    </div>
  )
}
```

### 使用便捷Hook

```tsx
import { useDeviceDetection } from '../hooks/useDeviceDetection'

function MyComponent() {
  const { 
    isMobile, 
    isTouch, 
    isPortrait, 
    isSmallScreen 
  } = useDeviceDetection()
  
  // 使用检测结果...
}
```

### 在App中集成

```tsx
import { DeviceProvider } from './contexts/DeviceContext'

function App() {
  return (
    <DeviceProvider>
      {/* 你的应用组件 */}
    </DeviceProvider>
  )
}
```

## 测试和验证

### 自动化测试
- **位置**: `src/utils/deviceDetectionTest.ts`
- **功能**: 提供设备检测逻辑的单元测试
- **使用**: 在浏览器控制台运行 `window.runDeviceTests()`

### 验证脚本
- **位置**: `src/utils/verifyDeviceDetection.js`
- **功能**: Node.js环境下的逻辑验证
- **使用**: `node src/utils/verifyDeviceDetection.js`

## 性能优化

1. **防抖处理**: 窗口大小变化事件使用150ms防抖
2. **事件清理**: 组件卸载时自动清理事件监听器
3. **初始化优化**: 只在必要时重新检测设备信息

## 浏览器兼容性

- **现代浏览器**: Chrome, Firefox, Safari, Edge
- **移动浏览器**: iOS Safari, Chrome Mobile, Firefox Mobile
- **API支持**: 
  - `navigator.userAgent`
  - `navigator.maxTouchPoints`
  - `window.innerWidth/innerHeight`
  - `window.devicePixelRatio`

## 开发调试

在开发环境中，DeviceInfoDisplay组件会在页面右上角显示当前设备检测信息，包括：
- 设备类型
- 屏幕尺寸
- 触摸支持
- 屏幕方向
- 像素比

这有助于开发者验证设备检测的准确性。