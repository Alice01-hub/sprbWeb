// OSS路径测试脚本
import OSS_CONFIG from '../config/ossConfig';

// 测试所有OSS路径配置
export const testOssPaths = () => {
  console.log('🔍 测试OSS路径配置...');
  
  // 测试图片路径
  console.log('📸 图片路径测试:');
  console.log('封面图:', OSS_CONFIG.getImageUrl('/webps/sprb封面图.webp'));
  console.log('交通篇:', OSS_CONFIG.getImageUrl('/webps/交通篇摘要图.webp'));
  console.log('打卡篇:', OSS_CONFIG.getImageUrl('/webps/打卡篇摘要图.webp'));
  console.log('神域篇:', OSS_CONFIG.getImageUrl('/webps/神域摘要图.webp'));
  
  // 测试音频路径
  console.log('🎵 音频路径测试:');
  console.log('Summer Pockets:', OSS_CONFIG.getAudioUrl('/1-水月陵 - Summer Pockets.mp3'));
  console.log('Sea You Me:', OSS_CONFIG.getAudioUrl('/2-麻枝准 - Sea, You & Me.mp3'));
  
  // 测试文件路径
  console.log('📁 文件路径测试:');
  console.log('巡礼清单:', OSS_CONFIG.getFileUrl('/鸟白岛巡礼list.pdf'));
  
  // 测试交通数据路径
  console.log('🚌 交通数据路径测试:');
  console.log('交通卡片:', OSS_CONFIG.getFullUrl('/trafficdata/InDeparture/traffic_cards.json'));
  
  console.log('✅ OSS路径测试完成');
};

// 验证特定资源是否存在
export const validateResource = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    console.error(`❌ 资源验证失败: ${url}`, error);
    return false;
  }
};

// 批量验证资源
export const validateAllResources = async () => {
  console.log('🔍 开始验证所有OSS资源...');
  
  const resources = [
    OSS_CONFIG.getImageUrl('/webps/sprb封面图.webp'),
    OSS_CONFIG.getAudioUrl('/1-水月陵 - Summer Pockets.mp3'),
    OSS_CONFIG.getFileUrl('/鸟白岛巡礼list.pdf'),
    OSS_CONFIG.getImageUrl('/webps/交通篇摘要图.webp'),
    OSS_CONFIG.getImageUrl('/webps/打卡篇摘要图.webp'),
    OSS_CONFIG.getImageUrl('/webps/神域摘要图.webp')
  ];
  
  const results = await Promise.all(
    resources.map(async (url) => {
      const exists = await validateResource(url);
      return { url, exists };
    })
  );
  
  console.log('📊 资源验证结果:');
  results.forEach(({ url, exists }) => {
    console.log(`${exists ? '✅' : '❌'} ${url}`);
  });
  
  return results;
};

export default { testOssPaths, validateResource, validateAllResources };
