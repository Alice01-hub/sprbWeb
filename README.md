# 🏝️ 鸟白岛巡礼网站 (Summer Pockets 圣地巡礼网站)

一个专为《Summer Pockets》游戏粉丝打造的圣地巡礼网站，帮助玩家规划前往鸟白岛的旅行路线。

## ✨ 主要功能

### 🗺️ 地图导航
- **直岛地图**: 详细的直岛巡礼点标注
- **女木岛地图**: 女木岛巡礼点信息
- **男木岛地图**: 男木岛巡礼点指南
- **总览地图**: 三岛整体布局和航线信息

### 🚌 交通信息
- 🚧 **正在重新开发中** - 交通篇将提供更完善的交通攻略指南
- 包括：交通路线规划、渡轮时刻表、实时交通信息、地图导航等

### 📍 打卡系统
- 巡礼点打卡记录
- 打卡进度追踪
- 打卡点照片展示

### 🎵 音乐播放器
- 游戏原声音乐播放
- 背景音乐控制
- 音乐列表管理
- 多种播放模式：列表循环、单曲循环、随机播放
- 用户偏好缓存：自动保存播放模式、音量设置和播放位置
- 断点续播：记住上次播放的BGM，从上次位置继续播放
- 点击外部区域关闭：点击播放器以外的区域自动关闭播放器面板

### 🦋 特效系统
- 蝴蝶扇动翅膀自定义鼠标特效
- 流畅的动画过渡效果

### 📢 公告栏系统
- 实时公告发布和展示
- 优先级分类（紧急、重要、一般）
- 支持图片附件和富文本内容
- 点击外部区域自动关闭：点击公告栏以外的区域自动收起公告列表
- 键盘导航支持（方向键、Tab、Enter、Esc）
- **Markdown格式支持**：支持加粗、斜体、代码、链接等格式
- **智能缩进识别**：自动识别多级缩进，支持2、4、6等空格缩进
- **增强的视觉效果**：加粗文字使用渐变色，缩进内容带有左边框和背景色


## 🚀 快速开始

### 环境要求
- **Linux系统**: Ubuntu 18.04+ / CentOS 7+ / Debian 9+
- **Python**: 3.9+
- **Node.js**: 16.0+ 
- **npm**: 8.0+
- **PM2**: 5.0+ (进程管理器)

### 🐧 Linux部署 (推荐)

#### 1. 系统环境准备
```bash
# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装Python和Node.js
sudo apt install python3 python3-pip python3-venv -y
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install nodejs -y

# 安装PM2
sudo npm install -g pm2
```

#### 2. 一键部署
```bash
# 给管理脚本执行权限
chmod +x pm2-manager.sh

# 初始设置 (安装依赖、创建目录、构建前端)
./pm2-manager.sh setup

# 启动生产环境服务
./pm2-manager.sh start

# 查看服务状态
./pm2-manager.sh status
```

#### 3. PM2管理命令
```bash
# 启动服务
./pm2-manager.sh start

# 停止服务  
./pm2-manager.sh stop

# 重启服务
./pm2-manager.sh restart

# 查看日志
./pm2-manager.sh logs

# 监控面板
./pm2-manager.sh monit
```

### 🪟 Windows开发环境

#### 安装依赖
```bash
cd frontend
npm install
```

#### 启动开发服务器
```bash
npm run dev
```

应用将在 http://localhost:3000 启动

### 🐧 Linux开发环境

#### 快速启动
```bash
# 给脚本执行权限
chmod +x start-dev.sh

# 启动开发环境
./start-dev.sh
```

#### 手动启动
```bash
# 启动后端
cd backend && python3 -m uvicorn app:app --host 127.0.0.1 --port 8000 --reload

# 启动前端 (新终端)
cd frontend && npm run dev
```



## 🏗️ 项目结构

```
sprbWeb/
├── frontend/                 # 前端应用
│   ├── src/                 # React组件和页面
│   ├── dist/                # 生产构建文件
│   ├── package.json         # 前端依赖配置
│   └── tsconfig.json        # TypeScript配置
├── backend/                  # 后端服务
│   ├── api/                 # API接口模块
│   ├── data/                # 数据库文件
│   ├── uploads/             # 文件上传目录
│   ├── app.py               # 主应用文件
│   ├── requirements.txt     # Python依赖
│   └── env.*                # 环境配置文件
├── logs/                     # PM2日志目录
├── ecosystem.config.js       # PM2配置文件
├── pm2-manager.sh           # PM2管理脚本
├── nginx.conf               # Nginx配置模板
├── sprb-web.service         # systemd服务文件
├── package.json              # 根目录依赖配置
├── config.json              # 项目配置文件
└── README.md                # 项目说明文档
```



## 🎨 自定义配置

可以通过修改相应的样式文件来自定义网站外观和功能。

## 📱 响应式设计

系统支持多种设备尺寸，适配桌面端、平板端和移动端。

## ⌨️ 键盘操作

系统支持键盘导航和快捷键操作。

## 🔧 构建和部署

### 🐧 Linux生产环境 (PM2管理)

#### 构建和部署
```bash
# 构建前端
./pm2-manager.sh build

# 部署服务
./pm2-manager.sh deploy

# 重载服务 (零停机更新)
./pm2-manager.sh reload
```

#### 系统服务配置
```bash
# 配置开机自启
sudo cp sprb-web.service /etc/systemd/system/
sudo systemctl enable sprb-web
sudo systemctl start sprb-web
```

#### Nginx反向代理
```bash
# 配置Nginx
sudo cp nginx.conf /etc/nginx/sites-available/sprb-web
sudo ln -s /etc/nginx/sites-available/sprb-web /etc/nginx/sites-enabled/
sudo systemctl restart nginx
```

### 🪟 Windows开发环境

#### 构建生产版本
```bash
npm run build
```

#### 预览生产版本
```bash
npm run preview
```

#### 类型检查
```bash
npm run type-check
```

## 📚 相关文档

请参考项目中的其他文档了解具体功能使用方法。

## 📝 更新日志

### 2025年8月27日 - 音频系统重构与数据管理优化 🎵

#### 🎯 主要更新内容
- **音频资源数据化**: 将硬编码的音频数据迁移到Supabase数据库管理
- **后端API服务**: 新增音频数据获取接口，支持动态音频列表管理
- **前端服务层**: 重构音频服务，支持API优先、Supabase备用的双重数据源
- **音乐播放器修复**: 修复歌名显示问题，确保正确读取title字段

#### 🔧 技术改进
- **数据库设计**: 创建`audios`表，字段包含id、title、artist、path、cover_path
- **API接口**: 
  - `GET /api/audios` - 获取所有音频列表
  - `GET /api/audios/{id}` - 获取单个音频信息
- **错误处理**: 增强连接测试、超时处理、异常捕获机制
- **日志系统**: 添加详细的音频服务日志记录

#### 📊 数据结构
```json
{
  "id": 1,
  "title": "Summer Pockets",
  "artist": "水月陵",
  "path": "/public/audios/1-水月陵 - Summer Pockets.mp3",
  "cover_path": "/public/images/covers/1-summerpockets.webp"
}
```

#### 🎵 音频资源
- **总数量**: 16首游戏原声音乐
- **存储方式**: OSS对象存储 + Supabase数据库管理
- **格式支持**: MP3、WAV、OGG、FLAC等主流音频格式
- **封面图片**: 每首音乐配备对应的游戏场景封面

#### 🚀 部署说明
1. 运行数据迁移脚本：`python migrate_audios_to_supabase.py`
2. 启动后端服务：`cd backend && python run.py`
3. 启动前端服务：`cd frontend && npm run dev`

#### 💡 设计优势
- **灵活性**: 新增音频只需在数据库中添加记录，无需重新编译
- **可维护性**: 集中化的资源管理，清晰的数据结构
- **扩展性**: 易于添加新字段，支持分类、标签等高级功能
- **容错性**: API失败时自动切换到直连模式，保障用户体验

---

## 🤝 贡献

欢迎提交Issue和Pull Request！

## 📄 许可证

MIT License

---

**让圣地巡礼更加便捷，让回忆更加珍贵** 🏝️✨