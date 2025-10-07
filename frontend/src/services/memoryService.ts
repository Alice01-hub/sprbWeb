import { supabase } from '../config/supabaseClient'
import { ButterflyMemory } from '../components/MemoryButterfly'

/**
 * 从Supabase获取所有已发布的蝴蝶记忆数据
 * @returns 已发布的蝴蝶记忆数组
 */
export const getPublishedMemories = async (): Promise<ButterflyMemory[]> => {
  try {
    console.log('🦋 从Supabase获取蝴蝶记忆数据...')
    
    const { data, error } = await supabase
      .from('memories')
      .select('*')
      .eq('is_published', true)
      .order('weight', { ascending: false })  // 按权重降序排列
      .order('created_at', { ascending: false })  // 然后按创建时间排序

    if (error) {
      console.error('❌ 获取蝴蝶记忆失败:', error)
      throw error
    }

    console.log('✅ 成功获取蝴蝶记忆数据:', data?.length || 0, '条')
    
    // 调试：检查数据格式
    if (data && data.length > 0) {
      console.log('🦋 第一条数据示例:', data[0])
      console.log('🦋 created_at字段类型:', typeof data[0].created_at)
      console.log('🦋 created_at字段值:', data[0].created_at)
    }
    
    return data || []
  } catch (err) {
    console.error('❌ 获取蝴蝶记忆过程中发生错误:', err)
    throw err
  }
}

/**
 * 根据ID获取单个蝴蝶记忆数据
 * @param id 蝴蝶记忆ID
 * @returns 蝴蝶记忆数据
 */
export const getMemoryById = async (id: number): Promise<ButterflyMemory | null> => {
  try {
    console.log('🦋 获取蝴蝶记忆详情:', id)
    
    const { data, error } = await supabase
      .from('memories')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('❌ 获取蝴蝶记忆详情失败:', error)
      throw error
    }

    console.log('✅ 成功获取蝴蝶记忆详情')
    return data
  } catch (err) {
    console.error('❌ 获取蝴蝶记忆详情过程中发生错误:', err)
    return null
  }
}

/**
 * 从蝴蝶池中随机抽取指定数量的蝴蝶
 * @param memories 蝴蝶记忆池
 * @param count 抽取数量（默认随机3-5只）
 * @returns 随机抽取的蝴蝶数组
 */
export const getRandomMemories = (
  memories: ButterflyMemory[], 
  count?: number
): ButterflyMemory[] => {
  if (memories.length === 0) return []
  
  // 如果没有指定数量，则随机选择3-5只
  const actualCount = count || (Math.floor(Math.random() * 3) + 3)  // 3-5之间的随机数
  
  // 如果池子里的蝴蝶数量不足，则返回全部
  if (memories.length <= actualCount) {
    return [...memories]
  }
  
  // 随机打乱数组并取前actualCount个
  const shuffled = [...memories].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, actualCount)
}

/**
 * 为蝴蝶分配随机位置，确保不重叠且在边界内
 * @param memories 蝴蝶数组
 * @param containerWidth 容器宽度百分比
 * @param containerHeight 容器高度百分比
 * @returns 带有位置信息的蝴蝶数组
 */
export const assignRandomPositions = (
  memories: ButterflyMemory[],
  containerWidth: number = 100,
  containerHeight: number = 100
): ButterflyMemory[] => {
  const positionedMemories: ButterflyMemory[] = []
  const minDistance = 15  // 最小间距（百分比）
  const margin = 10  // 边缘留白（百分比）
  
  for (const memory of memories) {
    let attempts = 0
    let position = { x: 0, y: 0 }
    let isValid = false
    
    // 最多尝试50次找到合适的位置
    while (!isValid && attempts < 50) {
      // 生成随机位置（考虑边缘留白）
      position = {
        x: Math.random() * (containerWidth - 2 * margin) + margin,
        y: Math.random() * (containerHeight - 2 * margin) + margin
      }
      
      // 检查是否与已有蝴蝶重叠
      isValid = positionedMemories.every(positioned => {
        if (!positioned.position) return true
        
        const dx = position.x - positioned.position.x
        const dy = position.y - positioned.position.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        return distance >= minDistance
      })
      
      attempts++
    }
    
    // 添加到已定位蝴蝶列表
    positionedMemories.push({
      ...memory,
      position
    })
  }
  
  return positionedMemories
}

