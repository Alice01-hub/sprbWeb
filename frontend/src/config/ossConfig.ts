// OSS资源配置
export const OSS_CONFIG = {
  // OSS基础URL
  BASE_URL: import.meta.env.VITE_OSS_BASE_URL || 'https://oss.sprb.love',

  // 图片资源路径
  IMAGES: {
    BASE: import.meta.env.VITE_OSS_IMAGES_PATH || '/public/images',
    COVERS: '/public/images/covers',
    WEBPS: '/public/images/webps',
    TRAFFIC: '/public/trafficdata/webps',
    TRAFFIC_COVERS: '/public/trafficdata/covers'
  },

  // 音频资源路径
  AUDIO: {
    BASE: import.meta.env.VITE_OSS_AUDIO_PATH || '/public/audios'
  },

  // 文件资源路径
  FILES: {
    BASE: import.meta.env.VITE_OSS_FILES_PATH || '/public/files'
  },

  // 获取完整资源URL
  getFullUrl: (path: string): string => {
    return `${OSS_CONFIG.BASE_URL}${path}`;
  },

  // 获取图片URL
  getImageUrl: (path: string): string => {
    return OSS_CONFIG.getFullUrl(`${OSS_CONFIG.IMAGES.BASE}${path}`);
  },

  // 获取音频URL
  getAudioUrl: (path: string): string => {
    return OSS_CONFIG.getFullUrl(`${OSS_CONFIG.AUDIO.BASE}${path}`);
  },

  // 获取文件URL
  getFileUrl: (path: string): string => {
    return OSS_CONFIG.getFullUrl(`${OSS_CONFIG.FILES.BASE}${path}`);
  }
};

export default OSS_CONFIG;
