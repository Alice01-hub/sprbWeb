import { supabase } from '../config/supabaseClient'
import { ButterflyMemory, calculateFieldCount, calculateButterflySize } from '../components/MemoryButterfly'

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
      .order('created_at', { ascending: false })  // 按创建时间排序

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
 * 位置坐标表示蝴蝶中心，两边留白5%
 * @param memories 蝴蝶数组
 * @param containerWidth 容器宽度百分比
 * @param containerHeight 容器高度百分比
 * @param containerWidthPx 容器实际宽度（像素）
 * @param containerHeightPx 容器实际高度（像素）
 * @returns 带有位置信息的蝴蝶数组
 */
export const assignRandomPositions = (
  memories: ButterflyMemory[],
  containerWidth: number = 100,
  containerHeight: number = 100,
  containerWidthPx: number = 800,
  containerHeightPx: number = 600
): ButterflyMemory[] => {
  const positionedMemories: ButterflyMemory[] = []
  const margin = 8  // 边缘留白（百分比）
  
  console.log('🦋 开始分配蝴蝶位置:', {
    memoriesCount: memories.length,
    containerSize: { containerWidthPx, containerHeightPx },
    containerPercent: { containerWidth, containerHeight }
  })
  
  // 按蝴蝶尺寸从大到小排序，优先放置大蝴蝶
  const sortedMemories = [...memories].sort((a, b) => {
    const sizeA = calculateButterflySize(calculateFieldCount(a))
    const sizeB = calculateButterflySize(calculateFieldCount(b))
    return sizeB - sizeA
  })
  
  for (const memory of sortedMemories) {
    let attempts = 0
    let position = { x: 0, y: 0 }
    let isValid = false
    
    // 计算当前蝴蝶的尺寸（像素）
    const fieldCount = calculateFieldCount(memory)
    const butterflySize = calculateButterflySize(fieldCount)
    
    // 将像素尺寸转换为百分比
    const sizePercentX = (butterflySize / containerWidthPx) * 100
    const sizePercentY = (butterflySize / containerHeightPx) * 100
    
    // 计算最小间距（基于蝴蝶尺寸动态调整）
    const minDistance = Math.max(12, sizePercentX * 0.8)  // 至少12%，或蝴蝶宽度的80%
    
    // 计算有效位置范围（考虑蝴蝶尺寸和留白）
    const minX = margin + (sizePercentX / 2)
    const maxX = containerWidth - margin - (sizePercentX / 2)
    const minY = margin + (sizePercentY / 2)
    const maxY = containerHeight - margin - (sizePercentY / 2)
    
    console.log(`🦋 处理蝴蝶 ${memory.user_name}:`, {
      fieldCount,
      butterflySize,
      sizePercent: { sizePercentX, sizePercentY },
      validRange: { minX, maxX, minY, maxY },
      minDistance
    })
    
    // 确保有效范围不为负数
    if (minX >= maxX || minY >= maxY) {
      console.warn(`🦋 蝴蝶尺寸过大，无法在容器内放置:`, {
        butterflySize,
        sizePercentX,
        sizePercentY,
        minX,
        maxX,
        minY,
        maxY
      })
      // 使用中心位置作为备选
      position = { x: containerWidth / 2, y: containerHeight / 2 }
    } else {
      // 最多尝试100次找到合适的位置
      while (!isValid && attempts < 100) {
        // 生成随机位置（考虑蝴蝶尺寸和边缘留白）
        position = {
          x: Math.random() * (maxX - minX) + minX,
          y: Math.random() * (maxY - minY) + minY
        }
        
        // 检查是否与已有蝴蝶重叠
        isValid = positionedMemories.every(positioned => {
          if (!positioned.position) return true
          
          // 计算已放置蝴蝶的尺寸
          const positionedFieldCount = calculateFieldCount(positioned)
          const positionedSize = calculateButterflySize(positionedFieldCount)
          const positionedSizePercentX = (positionedSize / containerWidthPx) * 100
          const positionedSizePercentY = (positionedSize / containerHeightPx) * 100
          
          // 计算两个蝴蝶中心之间的距离
          const dx = position.x - positioned.position.x
          const dy = position.y - positioned.position.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          // 计算两个蝴蝶的最小安全距离（两个半径之和加上间距）
          const requiredDistance = (sizePercentX + positionedSizePercentX) / 2 + Math.min(sizePercentX, positionedSizePercentX) * 0.3
          
          return distance >= requiredDistance
        })
        
        attempts++
      }
      
      // 如果尝试100次后仍然找不到合适位置，使用网格布局作为备选
      if (!isValid) {
        console.warn(`🦋 无法为蝴蝶 ${memory.user_name} 找到合适位置，使用网格布局`)
        const gridSize = Math.ceil(Math.sqrt(memories.length))
        const gridIndex = positionedMemories.length
        const gridX = (gridIndex % gridSize) / (gridSize - 1)
        const gridY = Math.floor(gridIndex / gridSize) / (gridSize - 1)
        
        position = {
          x: minX + gridX * (maxX - minX),
          y: minY + gridY * (maxY - minY)
        }
      }
    }
    
    console.log(`🦋 蝴蝶 ${memory.user_name} 最终位置:`, position)
    
    // 添加到已定位蝴蝶列表
    positionedMemories.push({
      ...memory,
      position
    })
  }
  
  console.log('🦋 蝴蝶位置分配完成:', positionedMemories.map(m => ({
    name: m.user_name,
    position: m.position,
    size: calculateButterflySize(calculateFieldCount(m))
  })))
  
  return positionedMemories
}

