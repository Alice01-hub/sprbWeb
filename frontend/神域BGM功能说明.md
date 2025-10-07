# 🎵 神域BGM功能说明

## 🌟 功能概述

神域篇拥有专属的BGM播放器，与普通页面的BGM播放器完全独立，提供沉浸式的夜晚主题音乐体验。

## 🎯 核心特性

### 1. 独立BGM系统
- **专属音乐库**：使用 `audios2` 表存储神域BGM数据
- **无封面设计**：简洁的夜晚主题，专注于音乐本身
- **自动切换**：进入神域自动暂停普通BGM，退出时恢复

### 2. 夜晚主题设计
- **深蓝渐变背景**：模拟夜空效果
- **星光闪烁**：动态光效增强氛围
- **发光文字**：标题和按钮带有发光效果
- **毛玻璃效果**：backdrop-filter 营造梦幻感

### 3. 完整播放功能
- **播放控制**：播放/暂停、上一首/下一首
- **进度控制**：点击进度条跳转、时间显示
- **播放模式**：列表循环、单曲循环、随机播放
- **音量控制**：滑块调节音量

## 🗄️ 数据库设计

### audios2 表结构

| 字段名 | 类型 | 说明 | 备注 |
|--------|------|------|------|
| `id` | SERIAL | 自增主键 | 唯一标识 |
| `title` | TEXT | 歌曲标题 | 必填 |
| `artist` | TEXT | 艺术家名称 | 必填 |
| `url` | TEXT | 音频文件URL | 必填，支持OSS/CDN |
| `is_published` | BOOLEAN | 是否发布 | 默认false，true时显示 |

### 建表SQL
```sql
CREATE TABLE audios2 (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  artist TEXT NOT NULL,
  url TEXT NOT NULL,
  is_published BOOLEAN DEFAULT false
);
```

## 🎨 视觉设计

### 颜色方案
- **主背景**：深蓝夜空渐变 `rgba(15, 25, 50, 0.95)`
- **强调色**：天蓝色 `rgba(135, 206, 235, 0.8)`
- **辅助色**：青绿色 `rgba(152, 228, 214, 0.8)`
- **文字色**：白色 `rgba(255, 255, 255, 0.95)`

### 视觉效果
- **渐变背景**：4层深蓝渐变营造深度
- **内发光**：顶部光晕模拟月光
- **外阴影**：多层阴影增强立体感
- **边框光晕**：半透明边框增加层次
- **毛玻璃**：backdrop-filter 模糊效果

### 动画效果
- **进入动画**：从下方滑入 + 缩放
- **悬停效果**：按钮放大 + 发光增强
- **点击反馈**：轻微缩放
- **文字闪烁**：标题渐变动画

## 🔧 技术实现

### 组件架构
```
DivineMusicPlayer
├── 播放器容器 (PlayerContainer)
├── 头部区域 (PlayerHeader)
│   ├── 标题 (PlayerTitle)
│   └── 关闭按钮 (CloseButton)
├── 歌曲信息 (SongInfo)
│   ├── 歌曲标题 (SongTitle)
│   └── 艺术家 (SongArtist)
├── 进度控制 (ProgressArea)
│   ├── 进度条 (ProgressBar)
│   └── 时间显示 (TimeDisplay)
├── 控制按钮 (ControlsArea)
│   ├── 播放模式 (ControlButton)
│   ├── 上一首 (ControlButton)
│   ├── 播放/暂停 (PlayPauseButton)
│   └── 下一首 (ControlButton)
└── 音量控制 (VolumeArea)
    ├── 音量图标 (VolumeIcon)
    └── 音量滑块 (VolumeSlider)
```

### 状态管理
- **播放状态**：isPlaying, currentTime, duration
- **播放列表**：audios[], currentIndex
- **播放模式**：playMode ('list' | 'single' | 'random')
- **音量控制**：volume
- **加载状态**：isLoading

### 数据流
```
Supabase audios2表
    ↓
divineAudioService.getDivineAudios()
    ↓
DivineMusicPlayer 组件
    ↓
HTML5 Audio API
    ↓
用户界面更新
```

## 🎮 用户交互

### 进入神域
1. 用户访问神域页面
2. 自动调用 `enterDivineMode()`
3. 暂停当前播放的普通BGM
4. 显示神域BGM按钮

### 打开播放器
1. 点击"🎵 神域BGM"按钮
2. 播放器从右下角滑入
3. 自动加载神域BGM列表
4. 显示第一首歌曲信息

### 播放控制
- **播放/暂停**：点击播放按钮
- **上一首/下一首**：点击方向按钮
- **进度跳转**：点击进度条
- **音量调节**：拖动音量滑块
- **播放模式**：点击模式按钮切换

### 退出神域
1. 点击"返回目录"按钮
2. 自动调用 `exitDivineMode()`
3. 关闭神域BGM播放器
4. 恢复普通BGM控制

## 📱 响应式设计

### 桌面端
- 播放器位置：右下角固定
- 尺寸：350px 宽度
- 动画：流畅的滑入滑出

### 移动端（待实现）
- 播放器位置：底部全宽
- 尺寸：自适应屏幕宽度
- 触控优化：增大点击区域

## 🔄 与普通BGM的切换

### MusicContext 扩展
```typescript
interface MusicContextType {
  // 原有功能...
  
  // 神域BGM相关
  isDivineMode: boolean
  enterDivineMode: () => void
  exitDivineMode: () => void
  isDivinePlayerOpen: boolean
  setDivinePlayerOpen: (open: boolean) => void
}
```

### 切换逻辑
1. **进入神域**：
   - 设置 `isDivineMode = true`
   - 暂停普通BGM播放
   - 保持普通BGM状态不变

2. **退出神域**：
   - 设置 `isDivineMode = false`
   - 关闭神域BGM播放器
   - 不自动恢复普通BGM播放

## 🎵 音频资源

### 推荐音乐类型
- **环境音乐**：营造神秘氛围
- **钢琴曲**：温柔舒缓的旋律
- **弦乐**：增加情感深度
- **自然音效**：风声、水声等

### 音频格式支持
- **主要格式**：MP3, WAV, OGG
- **推荐质量**：320kbps MP3
- **文件大小**：建议 < 10MB
- **存储方式**：OSS对象存储

## 🚀 部署说明

### 1. 创建数据库表
```sql
-- 在Supabase SQL Editor中执行
-- 参考 backend/create_audios2_table.sql
```

### 2. 添加音频资源
1. 上传音频文件到OSS
2. 在Supabase中插入记录
3. 设置 `is_published = true`

### 3. 测试功能
1. 访问神域页面
2. 点击"🎵 神域BGM"按钮
3. 测试播放控制功能
4. 验证数据加载

## 🐛 常见问题

### Q: 神域BGM无法播放？
A: 检查：
1. audios2表是否有数据
2. url字段是否有效
3. 音频文件是否可访问
4. 浏览器控制台错误信息

### Q: 播放器样式异常？
A: 检查：
1. 浏览器是否支持backdrop-filter
2. CSS变量是否正确加载
3. 是否有样式冲突

### Q: 数据加载失败？
A: 检查：
1. Supabase连接是否正常
2. RLS策略是否正确配置
3. API权限是否足够

## 💡 扩展功能（未来）

- [ ] 播放历史记录
- [ ] 收藏功能
- [ ] 播放列表管理
- [ ] 歌词显示
- [ ] 均衡器设置
- [ ] 睡眠定时器
- [ ] 音乐推荐

---

**神域BGM系统为神域篇提供了独特的音乐体验，让用户在探索蝴蝶记忆的同时享受沉浸式的夜晚氛围音乐。** 🦋🎵✨
