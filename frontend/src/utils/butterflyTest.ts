// 七影蝶测试工具
import { ButterflyMemory, calculateFieldCount, calculateButterflySize } from '../components/MemoryButterfly'

/**
 * 测试七影蝶字段统计和尺寸计算
 */
export const testButterflyCalculations = () => {
  console.log('🦋 开始测试七影蝶计算逻辑...')
  
  // 测试用例1：无字段
  const emptyMemory: ButterflyMemory = {
    id: 1,
    created_at: '2025-01-07T00:00:00Z',
    user_name: '测试用户',
    content: '',
    image_url: null,
    audio_url: null,
    web_url: null,
    is_published: true
  }
  
  const emptyFieldCount = calculateFieldCount(emptyMemory)
  const emptySize = calculateButterflySize(emptyFieldCount)
  console.log('📊 无字段测试:', { fieldCount: emptyFieldCount, size: emptySize, expected: 25 })
  
  // 测试用例2：仅文字内容
  const textOnlyMemory: ButterflyMemory = {
    id: 2,
    created_at: '2025-01-07T00:00:00Z',
    user_name: '测试用户',
    content: '这是文字内容',
    image_url: null,
    audio_url: null,
    web_url: null,
    is_published: true
  }
  
  const textFieldCount = calculateFieldCount(textOnlyMemory)
  const textSize = calculateButterflySize(textFieldCount)
  console.log('📊 仅文字测试:', { fieldCount: textFieldCount, size: textSize, expected: 50 })
  
  // 测试用例3：文字+图片
  const textImageMemory: ButterflyMemory = {
    id: 3,
    created_at: '2025-01-07T00:00:00Z',
    user_name: '测试用户',
    content: '这是文字内容',
    image_url: 'https://example.com/image.jpg',
    audio_url: null,
    web_url: null,
    is_published: true
  }
  
  const textImageFieldCount = calculateFieldCount(textImageMemory)
  const textImageSize = calculateButterflySize(textImageFieldCount)
  console.log('📊 文字+图片测试:', { fieldCount: textImageFieldCount, size: textImageSize, expected: 75 })
  
  // 测试用例4：全部字段
  const fullMemory: ButterflyMemory = {
    id: 4,
    created_at: '2025-01-07T00:00:00Z',
    user_name: '测试用户',
    content: '这是文字内容',
    image_url: 'https://example.com/image.jpg',
    audio_url: 'https://example.com/audio.mp3',
    web_url: 'https://example.com/link',
    is_published: true
  }
  
  const fullFieldCount = calculateFieldCount(fullMemory)
  const fullSize = calculateButterflySize(fullFieldCount)
  console.log('📊 全部字段测试:', { fieldCount: fullFieldCount, size: fullSize, expected: 125 })
  
  console.log('✅ 七影蝶计算测试完成')
  
  return {
    empty: { fieldCount: emptyFieldCount, size: emptySize },
    textOnly: { fieldCount: textFieldCount, size: textSize },
    textImage: { fieldCount: textImageFieldCount, size: textImageSize },
    full: { fieldCount: fullFieldCount, size: fullSize }
  }
}

/**
 * 测试七影蝶边界检查
 */
export const testButterflyBoundaries = () => {
  console.log('🦋 开始测试七影蝶边界检查...')
  
  // 创建测试数据
  const testMemories: ButterflyMemory[] = [
    {
      id: 1,
      created_at: '2025-01-07T00:00:00Z',
      user_name: '测试用户1',
      content: '',
      image_url: null,
      audio_url: null,
      web_url: null,
      is_published: true
    },
    {
      id: 2,
      created_at: '2025-01-07T00:00:00Z',
      user_name: '测试用户2',
      content: '文字内容',
      image_url: 'https://example.com/image.jpg',
      audio_url: 'https://example.com/audio.mp3',
      web_url: 'https://example.com/link',
      is_published: true
    }
  ]
  
  // 测试边界计算
  const fieldCount1 = calculateFieldCount(testMemories[0])
  const size1 = calculateButterflySize(fieldCount1)
  const fieldCount2 = calculateFieldCount(testMemories[1])
  const size2 = calculateButterflySize(fieldCount2)
  
  console.log('📊 蝴蝶1 (无字段):', { fieldCount: fieldCount1, size: size1 })
  console.log('📊 蝴蝶2 (4字段):', { fieldCount: fieldCount2, size: size2 })
  
  // 计算边界范围
  const containerWidth = 100
  const containerHeight = 100
  const containerWidthPx = 800
  const containerHeightPx = 600
  const margin = 5
  
  // 蝴蝶1的边界范围
  const sizePercentX1 = (size1 / containerWidthPx) * 100
  const sizePercentY1 = (size1 / containerHeightPx) * 100
  const minX1 = margin + (sizePercentX1 / 2)
  const maxX1 = containerWidth - margin - (sizePercentX1 / 2)
  const minY1 = margin + (sizePercentY1 / 2)
  const maxY1 = containerHeight - margin - (sizePercentY1 / 2)
  
  // 蝴蝶2的边界范围
  const sizePercentX2 = (size2 / containerWidthPx) * 100
  const sizePercentY2 = (size2 / containerHeightPx) * 100
  const minX2 = margin + (sizePercentX2 / 2)
  const maxX2 = containerWidth - margin - (sizePercentX2 / 2)
  const minY2 = margin + (sizePercentY2 / 2)
  const maxY2 = containerHeight - margin - (sizePercentY2 / 2)
  
  console.log('📊 蝴蝶1边界范围:', { 
    size: size1, 
    sizePercent: { x: sizePercentX1, y: sizePercentY1 },
    bounds: { minX: minX1, maxX: maxX1, minY: minY1, maxY: maxY1 } 
  })
  console.log('📊 蝴蝶2边界范围:', { 
    size: size2, 
    sizePercent: { x: sizePercentX2, y: sizePercentY2 },
    bounds: { minX: minX2, maxX: maxX2, minY: minY2, maxY: maxY2 } 
  })
  
  console.log('✅ 七影蝶边界检查测试完成')
  
  return {
    butterfly1: { fieldCount: fieldCount1, size: size1, bounds: { minX: minX1, maxX: maxX1, minY: minY1, maxY: maxY1 } },
    butterfly2: { fieldCount: fieldCount2, size: size2, bounds: { minX: minX2, maxX: maxX2, minY: minY2, maxY: maxY2 } }
  }
}

/**
 * 在浏览器控制台中运行测试
 */
if (typeof window !== 'undefined') {
  (window as any).testButterflyCalculations = testButterflyCalculations
  (window as any).testButterflyBoundaries = testButterflyBoundaries
  console.log('🦋 七影蝶测试工具已加载，在控制台运行以下命令进行测试：')
  console.log('  - testButterflyCalculations() - 测试尺寸计算')
  console.log('  - testButterflyBoundaries() - 测试边界检查')
}
