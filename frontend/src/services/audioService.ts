// 音频服务 - 从后端API获取音频数据
import { supabase } from '../config/supabaseClient';

export interface AudioData {
  id: number;
  title: string;
  artist: string;
  src: string;
  cover: string;
  duration: number;
}

export interface AudioApiResponse {
  success: boolean;
  data: AudioData[];
  count: number;
}

export interface SingleAudioResponse {
  success: boolean;
  data: AudioData;
}

/**
 * 从后端API获取所有音频数据
 */
export const fetchAudiosFromAPI = async (): Promise<AudioData[]> => {
  try {
    console.log('🎵 尝试从后端API获取音频数据...');
    const response = await fetch('/api/audios');
    
    if (!response.ok) {
      // 静默处理HTTP错误，不抛出异常
      console.log('📡 API服务不可用，将使用Supabase作为备用数据源');
      return [];
    }
    
    const result: AudioApiResponse = await response.json();
    console.log('📡 API响应:', result);
    
    if (result.success) {
      console.log(`✅ 从API成功获取 ${result.data.length} 首音频`);
      // 验证数据完整性
      result.data.forEach((audio, index) => {
        console.log(`   ${index + 1}. ID: ${audio.id}, Title: "${audio.title}", Artist: "${audio.artist}"`);
        if (!audio.title || audio.title === 'Unknown Title') {
          console.warn(`   ⚠️  音频 ${audio.id} 的title字段异常: "${audio.title}"`);
        }
      });
      return result.data;
    } else {
      console.log('📡 API返回失败状态，将使用Supabase作为备用数据源');
      return [];
    }
  } catch (error) {
    // 静默处理API失败，不显示错误日志，因为已经有降级机制
    console.log('📡 API服务不可用，将使用Supabase作为备用数据源');
    return [];
  }
};

/**
 * 直接从Supabase获取音频数据（备用方案）
 */
export const fetchAudiosFromSupabase = async (): Promise<AudioData[]> => {
  try {
    console.log('🎵 尝试直接从Supabase获取音频数据...');
    const { data, error } = await supabase
      .from('audios')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      throw error;
    }

    console.log('📡 Supabase原始数据:', data);

    // 转换数据格式以匹配前端期望的格式
    // 注意：数据库中存储的是相对路径，需要拼接完整URL
    const ossBaseUrl = 'https://oss.sprb.love';
    
    const convertedData = data.map(audio => {
      const converted = {
        id: audio.id,
        title: audio.title || 'Unknown Title',  // 确保title字段有值
        artist: audio.artist || 'Unknown Artist',  // 确保artist字段有值
        src: `${ossBaseUrl}${audio.path}`,  // 拼接完整音频URL
        cover: `${ossBaseUrl}${audio.cover_path}`,  // 拼接完整封面URL
        duration: 0 // 前端会动态获取
      };
      
      console.log(`   ID ${audio.id}: Title="${converted.title}", Artist="${converted.artist}"`);
      return converted;
    });
    
    console.log(`✅ 从Supabase成功获取 ${convertedData.length} 首音频`);
    return convertedData;
  } catch (error) {
    console.error('❌ 从Supabase获取音频数据失败:', error);
    return [];
  }
};

/**
 * 获取音频数据（优先使用API，失败时使用Supabase）
 */
export const fetchAudios = async (): Promise<AudioData[]> => {
  // 首先尝试从API获取
  let audios = await fetchAudiosFromAPI();
  
  // 如果API失败，尝试直接从Supabase获取
  if (audios.length === 0) {
    console.log('API获取失败，尝试直接从Supabase获取音频数据...');
    audios = await fetchAudiosFromSupabase();
  }
  
  return audios;
};

/**
 * 根据ID获取单个音频数据
 */
export const fetchAudioById = async (id: number): Promise<AudioData | null> => {
  try {
    const response = await fetch(`/api/audios/${id}`);
    
    if (!response.ok) {
      console.log(`📡 API服务不可用，无法获取音频ID ${id}`);
      return null;
    }
    
    const result: SingleAudioResponse = await response.json();
    
    if (result.success) {
      return result.data;
    } else {
      console.log(`📡 API返回失败状态，无法获取音频ID ${id}`);
      return null;
    }
  } catch (error) {
    console.log(`📡 API服务不可用，无法获取音频ID ${id}`);
    return null;
  }
};

/**
 * 验证音频URL是否可用
 */
export const validateAudioUrl = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    console.error(`验证音频URL失败: ${url}`, error);
    return false;
  }
};

/**
 * 批量验证音频URL
 */
export const validateAllAudioUrls = async (audios: AudioData[]): Promise<void> => {
  console.log('🔍 开始验证音频URL...');
  
  const results = await Promise.all(
    audios.map(async (audio) => {
      const srcValid = await validateAudioUrl(audio.src);
      const coverValid = await validateAudioUrl(audio.cover);
      
      return {
        id: audio.id,
        title: audio.title,
        srcValid,
        coverValid
      };
    })
  );
  
  console.log('📊 音频URL验证结果:');
  results.forEach(({ id, title, srcValid, coverValid }) => {
    console.log(`${id}. ${title}:`);
    console.log(`   音频: ${srcValid ? '✅' : '❌'}`);
    console.log(`   封面: ${coverValid ? '✅' : '❌'}`);
  });
};
