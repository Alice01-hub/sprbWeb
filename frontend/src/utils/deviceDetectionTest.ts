/**
 * 设备检测测试工具
 * 用于手动测试设备检测逻辑的准确性
 */

interface TestCase {
  name: string
  userAgent: string
  screenWidth: number
  screenHeight: number
  hasTouch: boolean
  expected: {
    isMobile: boolean
    isTablet: boolean
    isDesktop: boolean
  }
}

const testCases: TestCase[] = [
  {
    name: 'iPhone 12',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15',
    screenWidth: 390,
    screenHeight: 844,
    hasTouch: true,
    expected: { isMobile: true, isTablet: false, isDesktop: false }
  },
  {
    name: 'iPad',
    userAgent: 'Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X) AppleWebKit/605.1.15',
    screenWidth: 820,
    screenHeight: 1180,
    hasTouch: true,
    expected: { isMobile: false, isTablet: true, isDesktop: false }
  },
  {
    name: 'Android Phone',
    userAgent: 'Mozilla/5.0 (Linux; Android 10; SM-G975F) AppleWebKit/537.36',
    screenWidth: 412,
    screenHeight: 869,
    hasTouch: true,
    expected: { isMobile: true, isTablet: false, isDesktop: false }
  },
  {
    name: 'Android Tablet',
    userAgent: 'Mozilla/5.0 (Linux; Android 10; SM-T510) AppleWebKit/537.36',
    screenWidth: 800,
    screenHeight: 1280,
    hasTouch: true,
    expected: { isMobile: false, isTablet: true, isDesktop: false }
  },
  {
    name: 'Desktop Chrome',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    screenWidth: 1920,
    screenHeight: 1080,
    hasTouch: false,
    expected: { isMobile: false, isTablet: false, isDesktop: true }
  },
  {
    name: 'Small Desktop (Touch)',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    screenWidth: 600,
    screenHeight: 800,
    hasTouch: true,
    expected: { isMobile: true, isTablet: false, isDesktop: false }
  }
]

/**
 * 模拟设备检测逻辑（与DeviceContext中的逻辑保持一致）
 */
const simulateDeviceDetection = (testCase: TestCase) => {
  const { userAgent, screenWidth, hasTouch } = testCase
  
  // 平板检测：iPad或Android平板，且屏幕尺寸在平板范围内
  const isTablet = (/ipad|android/i.test(userAgent) && hasTouch && screenWidth >= 768 && screenWidth < 1024)
  
  // 移动设备检测：用户代理字符串（排除平板）+ 触摸支持 + 屏幕尺寸
  const isMobile = (!isTablet && /android|webos|iphone|ipod|blackberry|iemobile|opera mini/i.test(userAgent)) 
    || (hasTouch && screenWidth < 768)
  
  const isDesktop = !isMobile && !isTablet
  
  return { isMobile, isTablet, isDesktop }
}

/**
 * 运行设备检测测试
 */
export const runDeviceDetectionTests = () => {
  console.log('🧪 开始设备检测测试...')
  
  let passedTests = 0
  let totalTests = testCases.length
  
  testCases.forEach((testCase, index) => {
    const result = simulateDeviceDetection(testCase)
    const passed = 
      result.isMobile === testCase.expected.isMobile &&
      result.isTablet === testCase.expected.isTablet &&
      result.isDesktop === testCase.expected.isDesktop
    
    if (passed) {
      passedTests++
      console.log(`✅ ${testCase.name}: 通过`)
    } else {
      console.log(`❌ ${testCase.name}: 失败`)
      console.log(`   期望: ${JSON.stringify(testCase.expected)}`)
      console.log(`   实际: ${JSON.stringify(result)}`)
    }
  })
  
  console.log(`\n📊 测试结果: ${passedTests}/${totalTests} 通过`)
  
  if (passedTests === totalTests) {
    console.log('🎉 所有测试通过！设备检测逻辑正常工作。')
  } else {
    console.log('⚠️ 部分测试失败，需要检查设备检测逻辑。')
  }
  
  return { passed: passedTests, total: totalTests, success: passedTests === totalTests }
}

/**
 * 在浏览器控制台中运行测试
 * 使用方法: 在浏览器控制台中输入 window.runDeviceTests()
 */
if (typeof window !== 'undefined') {
  (window as any).runDeviceTests = runDeviceDetectionTests
}