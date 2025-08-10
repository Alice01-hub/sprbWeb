// 统一的地标配置管理系统
export interface MapIcon {
  id: string;
  x: number; // 百分比坐标 (0-100)
  y: number; // 百分比坐标 (0-100)
  title: string;
  iconType: 'emoji' | 'image';
  emoji?: string;
  icon?: string;
  size: number; // 基础大小
  tooltip?: {
    image: string;
    desc: string;
  };
}

export interface MapConfig {
  scale: number; // 地图缩放比例
  baseWidth: number; // 基准宽度
  icons: Record<string, MapIcon>;
  responsive: {
    minScale: number; // 最小缩放比例
    maxScale: number; // 最大缩放比例
    mobileScale: number; // 移动端缩放比例
  };
}

// 女木岛地图配置
export const megijimaMapConfig: MapConfig = {
  scale: 0.6,
  baseWidth: 800,
  responsive: {
    minScale: 0.5,
    maxScale: 1.2,
    mobileScale: 0.8
  },
  icons: {
    cave: {
      id: 'cave',
      x: 66,
      y: 38,
      title: '山洞',
      iconType: 'image',
      icon: 'images/webps/女木岛/女木岛-山洞.webp',
      size: 30,
      tooltip: {
        image: 'images/webps/女木岛/女木岛-采石场入口.webp',
        desc: '与鸥冒险的采石场入口'
      }
    },
    bus: {
      id: 'bus',
      x: 73,
      y: 66,
      title: '公交/渡轮站',
      iconType: 'emoji',
      emoji: '🚌',
      size: 35,
      tooltip: {
        image: 'images/webps/女木岛/女木岛-公交时间表.webp',
        desc: '前往女木岛的交通枢纽'
      }
    },
    mountainUP: {
      id: 'mountainUP',
      x: 65,
      y: 33,
      title: '秘密基地山路',
      iconType: 'image',
      icon: 'images/webps/女木岛/女木岛-山路地标.webp',
      size: 35,
      tooltip: {
        image: 'images/webps/女木岛/女木岛-秘密基地山路.webp',
        desc: '通往秘密基地的山路'
      }
    },
    mountainDOWN: {
      id: 'mountainDOWN',
      x: 70,
      y: 43,
      title: '山道',
      iconType: 'image',
      icon: 'images/webps/女木岛/女木岛-山路地标.webp',
      size: 35,
      tooltip: {
        image: 'images/webps/女木岛/女木岛-山道.webp',
        desc: '和苍引导七影碟的山道'
      }
    }
  }
};

// 直岛地图配置
export const naoshimaMapConfig: MapConfig = {
  scale: 1.0,
  baseWidth: 800,
  responsive: {
    minScale: 0.5,
    maxScale: 1.2,
    mobileScale: 0.8
  },
  icons: {
    shop: {
      id: 'shop',
      x: 18,
      y: 54,
      title: '小卖部',
      iconType: 'emoji',
      emoji: '🗺️',
      size: 30
    },
    beaver: {
      id: 'beaver',
      x: 58,
      y: 49,
      title: '海狸家',
      iconType: 'emoji',
      emoji: '🗺️',
      size: 30
    },
    fishing: {
      id: 'fishing',
      x: 75,
      y: 64,
      title: '白羽钓点',
      iconType: 'emoji',
      emoji: '🗺️',
      size: 30
    },
    rose: {
      id: 'rose',
      x: 67,
      y: 88,
      title: '蔷薇庄',
      iconType: 'emoji',
      emoji: '🗺️',
      size: 30
    },
    shrine: {
      id: 'shrine',
      x: 21,
      y: 32,
      title: '鸣濑神社',
      iconType: 'emoji',
      emoji: '⛩️',
      size: 25
    }
  }
};

// 小豆岛地图配置
export const ogijimaMapConfig: MapConfig = {
  scale: 1.0,
  baseWidth: 800,
  responsive: {
    minScale: 0.5,
    maxScale: 1.2,
    mobileScale: 0.8
  },
  icons: {
    lighthouse: {
      id: 'lighthouse',
      x: 61,
      y: 2,
      title: '紬的灯塔',
      iconType: 'emoji',
      emoji: '🗺️',
      size: 30,
      tooltip: {
        image: 'images/webps/男木岛/男木岛-灯塔.webp',
        desc: '与小紬相遇的地点'
      }
    },
    sleepPath: {
      id: 'sleepPath',
      x: 28,
      y: 53,
      title: '苍睡觉的小道',
      iconType: 'emoji',
      emoji: '🗺️',
      size: 30,
      tooltip: {
        image: 'images/webps/男木岛/男木岛-苍睡觉小道.webp',
        desc: '与苍相遇的地点'
      }
    },
    whiteFeather: {
      id: 'whiteFeather',
      x: 23,
      y: 74,
      title: '白羽主视角',
      iconType: 'emoji',
      emoji: '🗺️',
      size: 30,
      tooltip: {
        image: 'images/webps/男木岛/男木岛-白羽主视角.webp',
        desc: '白羽的主视角地点'
      }
    },
    seagull: {
      id: 'seagull',
      x: 49,
      y: 78,
      title: '鸥相遇小道',
      iconType: 'image',
      icon: 'images/webps/男木岛/男木岛-鸥相遇小道图标.webp',
      size: 50,
      tooltip: {
        image: 'images/webps/男木岛/男木岛-鸥相遇小道.webp',
        desc: '与鸥相遇的小道'
      }
    }
  }
};

// 统一的响应式计算函数
export const calculateResponsiveScale = (
  containerWidth: number,
  baseWidth: number,
  config: MapConfig
): number => {
  const rawScale = containerWidth / baseWidth;
  const { minScale, maxScale } = config.responsive;
  
  // 移动端特殊处理
  const isMobile = containerWidth < 768;
  if (isMobile) {
    return Math.max(minScale, Math.min(config.responsive.mobileScale, maxScale));
  }
  
  return Math.max(minScale, Math.min(rawScale, maxScale));
};

// 计算地标实际位置
export const calculateIconPosition = (
  icon: MapIcon,
  imageLayout: { width: number; height: number; offsetLeft: number; offsetTop: number },
  scale: number
): { left: number; top: number; size: number } => {
  const left = imageLayout.offsetLeft + (icon.x / 100) * imageLayout.width;
  const top = imageLayout.offsetTop + (icon.y / 100) * imageLayout.height;
  const size = Math.max(18, icon.size * scale);
  
  return { left, top, size };
};

// 设备类型检测
export const getDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};
