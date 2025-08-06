/**
 * 设备检测验证脚本
 * 用于验证设备检测逻辑的正确性
 */

// 模拟设备检测逻辑
function detectDevice(userAgent, screenWidth, hasTouch) {
  // 平板检测：iPad或Android平板，且屏幕尺寸在平板范围内
  const isTablet = (/ipad|android/i.test(userAgent) && hasTouch && screenWidth >= 768 && screenWidth < 1024)
  
  // 移动设备检测：用户代理字符串（排除平板）+ 触摸支持 + 屏幕尺寸
  const isMobile = (!isTablet && /android|webos|iphone|ipod|blackberry|iemobile|opera mini/i.test(userAgent)) 
    || (hasTouch && screenWidth < 768)
  
  const isDesktop = !isMobile && !isTablet
  
  return { isMobile, isTablet, isDesktop }
}

// 测试用例
const testCases = [
  {
    name: 'iPhone 12',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)',
    screenWidth: 390,
    hasTouch: true,
    expected: { isMobile: true, isTablet: false, isDesktop: false }
  },
  {
    name: 'iPad',
    userAgent: 'Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X)',
    screenWidth: 820,
    hasTouch: true,
    expected: { isMobile: false, isTablet: true, isDesktop: false }
  },
  {
    name: 'Android Phone',
    userAgent: 'Mozilla/5.0 (Linux; Android 10; SM-G975F)',
    screenWidth: 412,
    hasTouch: true,
    expected: { isMobile: true, isTablet: false, isDesktop: false }
  },
  {
    name: 'Desktop Chrome',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    screenWidth: 1920,
    hasTouch: false,
    expected: { isMobile: false, isTablet: false, isDesktop: true }
  },
  {
    name: 'Small Touch Screen (Mobile)',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    screenWidth: 600,
    hasTouch: true,
    expected: { isMobile: true, isTablet: false, isDesktop: false }
  }
]

// 运行测试
console.log('🧪 设备检测逻辑验证开始...\n')

let passedTests = 0
let totalTests = testCases.length

testCases.forEach((testCase) => {
  const result = detectDevice(testCase.userAgent, testCase.screenWidth, testCase.hasTouch)
  const passed = 
    result.isMobile === testCase.expected.isMobile &&
    result.isTablet === testCase.expected.isTablet &&
    result.isDesktop === testCase.expected.isDesktop
  
  if (passed) {
    passedTests++
    console.log(`✅ ${testCase.name}: 通过`)
  } else {
    console.log(`❌ ${testCase.name}: 失败`)
    console.log(`   期望: mobile=${testCase.expected.isMobile}, tablet=${testCase.expected.isTablet}, desktop=${testCase.expected.isDesktop}`)
    console.log(`   实际: mobile=${result.isMobile}, tablet=${result.isTablet}, desktop=${result.isDesktop}`)
  }
})

console.log(`\n📊 测试结果: ${passedTests}/${totalTests} 通过`)

if (passedTests === totalTests) {
  console.log('🎉 所有测试通过！设备检测逻辑工作正常。')
} else {
  console.log('⚠️ 部分测试失败，需要检查设备检测逻辑。')
  process.exit(1)
}