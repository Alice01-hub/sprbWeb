import { supabase } from '../config/supabaseClient'
import { DivineAudio } from '../components/DivineMusicPlayer'

/**
 * 从Supabase获取神域BGM数据
 * @returns 神域BGM数组
 */
export const getDivineAudios = async (): Promise<DivineAudio[]> => {
  try {
    console.log('🦋 从Supabase获取神域BGM数据...')
    
    const { data, error } = await supabase
      .from('audios2')
      .select('*')
      .eq('is_published', true)
      .order('id', { ascending: true })

    if (error) {
      console.error('❌ 获取神域BGM失败:', error)
      throw error
    }

    console.log('✅ 成功获取神域BGM数据:', data?.length || 0, '首')
    
    // 调试：检查数据格式
    if (data && data.length > 0) {
      console.log('🦋 第一条BGM数据示例:', data[0])
      console.log('🦋 字段检查:', {
        id: typeof data[0].id,
        title: typeof data[0].title,
        artist: typeof data[0].artist,
        url: typeof data[0].url,
        is_published: typeof data[0].is_published
      })
    }
    
    return data || []
  } catch (err) {
    console.error('❌ 获取神域BGM过程中发生错误:', err)
    throw err
  }
}

/**
 * 根据ID获取单个神域BGM
 * @param id BGM ID
 * @returns 神域BGM数据
 */
export const getDivineAudioById = async (id: number): Promise<DivineAudio | null> => {
  try {
    console.log('🦋 获取神域BGM详情:', id)
    
    const { data, error } = await supabase
      .from('audios2')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('❌ 获取神域BGM详情失败:', error)
      throw error
    }

    console.log('✅ 成功获取神域BGM详情')
    return data
  } catch (err) {
    console.error('❌ 获取神域BGM详情过程中发生错误:', err)
    return null
  }
}

/**
 * 验证神域BGM数据格式
 * @param audio 神域BGM数据
 * @returns 是否有效
 */
export const validateDivineAudio = (audio: any): audio is DivineAudio => {
  return (
    audio &&
    typeof audio.id === 'number' &&
    typeof audio.title === 'string' &&
    typeof audio.artist === 'string' &&
    typeof audio.url === 'string' &&
    typeof audio.is_published === 'boolean'
  )
}

/**
 * 过滤有效的神域BGM数据
 * @param audios 原始数据数组
 * @returns 有效的BGM数组
 */
export const filterValidDivineAudios = (audios: any[]): DivineAudio[] => {
  return audios.filter(validateDivineAudio)
}
