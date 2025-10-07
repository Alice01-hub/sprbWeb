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

### 🌟 神域篇互动蝴蝶系统
- **动态蝴蝶展示**: 每次切换场景随机显示3-5只蝴蝶
- **智能分布算法**: 蝴蝶自动避免重叠，确保美观和可点击性
- **权重尺寸系统**: 根据蝴蝶权重(1-5)动态调整尺寸
- **飞舞动画效果**: 两张图片交替播放+上下浮动，模拟真实飞舞
- **悬停加速特效**: 鼠标悬停时翅膀扇动速度加快（400ms→200ms）
- **互动内容卡片**: 点击蝴蝶查看详细内容，支持文字、图片、音频和链接
- **智能内容展示**: 根据实际内容自动适配展示项，空内容自动隐藏
- **图片放大查看**: 点击图片全屏查看，点击外部关闭，无需关闭按钮
- **链接安全验证**: 跳转前验证URL格式，错误时提示用户
- **夜晚宁静主题**: 星空背景、渐变光晕、发光文字，营造梦幻回忆氛围
- **数据库管理**: 通过Supabase的memories表管理所有蝴蝶内容

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

### 🔧 环境变量配置

项目已更新为使用 API-key 方式，所有部署脚本都会自动创建和配置环境变量文件。

### 📋 自动配置

所有启动脚本都会自动检查并创建 `.env` 文件：

- **Windows**: `start_full_project.bat` 会自动创建环境变量文件
- **Linux开发**: `start-dev.sh` 会自动创建环境变量文件  
- **Linux生产**: `pm2-manager.sh setup` 会自动创建环境变量文件

### 🔑 Supabase API-key 配置

环境变量文件包含以下 Supabase 配置：

```bash
# Supabase配置
SUPABASE_URL=https://kcqcljzazatopmoifqzt.supabase.co
SUPABASE_PUBLIC_KEY=sb_publishable_VCpD0kHRMM18T7WMnrUmIA_hNoDZ229
SUPABASE_SECRET_KEY=sb_secret_R48SqAB3HuyR-nq2QLq6Ag_NRPTIX_V
```

### 📝 自定义配置

如需自定义配置，请编辑项目根目录的 `.env` 文件：

1. **开发环境**: 修改 `.env` 文件中的配置
2. **生产环境**: 使用 `env.production.template` 作为模板创建 `.env` 文件

详细配置说明请参考：[环境变量配置说明.md](ENV_CONFIG.md)
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

# 初始设置 (安装依赖、创建目录、构建前端、创建环境变量文件)
./pm2-manager.sh setup

# 启动生产环境服务
./pm2-manager.sh start

# 查看服务状态
./pm2-manager.sh status
```

**注意**: 脚本会自动创建 `.env` 文件，包含 Supabase API-key 配置。如需自定义配置，请编辑 `.env` 文件。

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

#### 手动启动
```bash
# 启动后端服务
cd backend
start_backend.bat

# 启动前端服务 (新终端)
cd frontend
start_frontend.bat
```

应用将在 http://localhost:3000 启动

**注意**: 脚本会自动创建 `.env` 文件，包含 Supabase API-key 配置。

### 🐧 Linux开发环境

#### 快速启动
```bash
# 给脚本执行权限
chmod +x start-dev.sh

# 启动开发环境
./start-dev.sh
```

**注意**: 脚本会自动创建 `.env` 文件，包含 Supabase API-key 配置。

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
│   │   ├── audio_service.py     # 音频服务 (Supabase)
│   │   └── divine_realm_service.py # 神域服务 (Supabase)
│   ├── uploads/             # 文件上传目录
│   ├── app.py               # 主应用文件
│   ├── requirements.txt     # Python依赖
│   └── env.*                # 环境配置文件
├── frontend/                 # 前端应用
│   ├── src/
│   │   ├── components/      # React组件
│   │   │   ├── MemoryButterfly.tsx  # 蝴蝶组件
│   │   │   ├── MemoryCard.tsx       # 蝴蝶详情卡片
│   │   │   └── ...          # 其他组件
│   │   ├── services/        # 服务层
│   │   │   ├── memoryService.ts     # 蝴蝶记忆服务
│   │   │   └── ...          # 其他服务
│   │   └── pages/           # 页面组件
│   │       ├── DivineRealmPage.tsx  # 神域页面
│   │       └── ...          # 其他页面
├── logs/                     # PM2日志目录
├── ecosystem.config.js       # PM2配置文件
├── pm2-manager.sh           # PM2管理脚本
├── nginx.conf               # Nginx配置模板
├── sprb-web.service         # systemd服务文件
├── package.json              # 根目录依赖配置
├── config.json              # 项目配置文件
└── README.md                # 项目说明文档
```

## 🗄️ 数据库架构

### 📊 数据库使用情况

本项目采用**云端数据库架构**，所有数据都通过Supabase进行管理：

#### ☁️ **Supabase (云端数据库)**
- **用途**: 音频数据和神域场景数据
- **优势**: 云端托管、高可用性、实时同步、REST API
- **数据表**:
  - `audios` - 音频文件信息 (音乐播放器)
  - `DivineRealmPage_graph` - 神域场景数据 (神域页面)
  - `memories` - 蝴蝶记忆数据 (神域互动蝴蝶系统)

### 🔄 数据流向

```
前端应用
├── 音频数据 → Supabase API (/api/audios)
├── 神域数据 → Supabase API (/api/divine-realm/*)
└── 蝴蝶记忆 → Supabase 直连 (memoryService.ts)

后端服务
├── audio_service.py → Supabase REST API
└── divine_realm_service.py → Supabase REST API
```

### 🎯 设计理念

**为什么选择Supabase？**

1. **音频数据** → Supabase
   - 需要CDN加速分发
   - 支持云端管理
   - 便于扩展和维护

2. **神域数据** → Supabase
   - 需要实时更新
   - 支持多用户访问
   - 云端备份安全

### 🚀 数据库连接配置

#### Supabase配置
```python
# 在 audio_service.py 和 divine_realm_service.py 中
# Supabase配置 - 请从环境变量读取
SUPABASE_URL = os.getenv("SUPABASE_URL", "https://kcqcljzazatopmoifqzt.supabase.co")
SUPABASE_ANON_KEY = os.getenv("SUPABASE_SECRET_KEY", "your_secret_key_here")
```

### 📈 性能优化

- **API缓存**: Supabase API支持缓存策略
- **错误处理**: 完善的错误处理和重试机制
- **异步处理**: FastAPI异步处理提高并发性能
- **CDN加速**: 音频文件通过CDN全球分发

## 🔌 API接口说明

### 🎵 音频相关API
- `GET /api/audios` - 获取所有音频列表
- `GET /api/audios/{id}` - 获取指定音频信息
- `POST /api/music/play-stats` - 记录播放统计

### 🦋 神域相关API
- `GET /api/divine-realm/scenes` - 获取所有神域场景
- `GET /api/divine-realm/random-scene` - 获取随机神域场景
- `GET /api/divine-realm/scenes/{id}` - 获取指定神域场景

### 🌟 蝴蝶记忆系统 (Supabase直连)
神域蝴蝶功能通过前端直接连接Supabase数据库，无需后端API中转：
- **数据表**: `memories`
- **连接方式**: 前端通过`memoryService.ts`直接调用Supabase API
- **功能模块**: 
  - `getPublishedMemories()` - 获取所有已发布的蝴蝶记忆
  - `getRandomMemories()` - 从记忆池随机抽取3-5只蝴蝶
  - `assignRandomPositions()` - 智能分配蝴蝶位置，避免重叠

### 📄 其他API
- `GET /health` - 健康检查
- `GET /api/test-db` - 数据库连接测试
- `GET /api/download-checklist` - 下载巡礼任务清单PDF
- `GET /` - API信息概览

### 🚫 已移除的API
- ~~`GET /api/traffic-cards`~~ - 交通攻略卡片 (已移除)
- ~~`POST /api/traffic-cards`~~ - 创建交通攻略卡片 (已移除)
- ~~`PUT /api/traffic-cards/{id}`~~ - 更新交通攻略卡片 (已移除)
- ~~`DELETE /api/traffic-cards/{id}`~~ - 删除交通攻略卡片 (已移除)

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

**注意**: systemd 服务会自动加载 `.env` 文件中的环境变量。

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

## 🔍 部署检查

在部署前，建议运行检查脚本验证配置：

### Linux 检查
```bash
# 给脚本执行权限
chmod +x check_deployment.sh

# 运行部署检查脚本
./check_deployment.sh
```

检查脚本会验证：
- 环境变量配置是否正确
- 项目文件是否完整
- 依赖是否已安装
- 部署脚本是否存在

## 📚 相关文档

请参考项目中的其他文档了解具体功能使用方法。

## 🦋 神域蝴蝶数据库结构

### memories 表字段说明

| 字段名 | 类型 | 说明 | 备注 |
|--------|------|------|------|
| `id` | integer | 蝴蝶编号 | 主键，自增 |
| `created_at` | timestamp | 创建时间 | 自动生成 |
| `user_name` | text | 作者名称 | 蝴蝶记忆的创作者 |
| `title` | text | 标题 | 记忆标题 |
| `content` | text | 文字内容 | 记忆的详细文字描述 |
| `image_url` | text | 图片链接 | 可选，附带的图片URL |
| `audio_url` | text | 音频链接 | 可选，附带的音频URL |
| `web_url` | text | 跳转链接 | 可选，相关的外部链接 |
| `weight` | integer | 权重 | 1-5，决定蝴蝶尺寸(weight=1为20px，weight=5为84px) |
| `is_published` | boolean | 是否发布 | true时加入蝴蝶池，false时隐藏 |

### 蝴蝶尺寸计算规则

蝴蝶尺寸 = 基础尺寸(80px) × 缩放系数
- weight=1: 80 × 0.25 = 20px
- weight=2: 80 × 0.45 = 36px
- weight=3: 80 × 0.65 = 52px
- weight=4: 80 × 0.85 = 68px
- weight=5: 80 × 1.05 = 84px

### 蝴蝶位置分布算法

- **随机数量**: 每次切换场景随机显示3-5只蝴蝶
- **边缘留白**: 距离容器边缘保持10%的安全距离
- **防重叠**: 蝴蝶之间保持至少15%的间距
- **重试机制**: 最多尝试50次寻找合适位置

## 📝 更新日志

### 2025年10月7日 - 神域篇互动蝴蝶系统上线 🦋

#### 🎯 主要更新内容
- **神域蝴蝶系统**: 在神域页面添加可交互的飞舞蝴蝶
- **智能分布算法**: 实现蝴蝶随机位置分布，自动避免重叠
- **动态内容展示**: 点击蝴蝶展开详情卡片，支持多媒体内容
- **数据库设计**: 创建memories表，完整的蝴蝶记忆数据结构

#### 🔧 技术实现
- **新增组件**:
  - `MemoryButterfly.tsx` - 蝴蝶组件，支持飞舞动画和权重尺寸
  - `MemoryCard.tsx` - 详情卡片组件，展示文字、图片、音频和链接
- **新增服务**:
  - `memoryService.ts` - 蝴蝶数据服务，包含获取、随机选择和位置分配
- **页面集成**:
  - 更新 `DivineRealmPage.tsx` 集成蝴蝶功能
  - 每次切换场景自动刷新蝴蝶显示

#### 🦋 功能特性
- **双图飞舞**: 使用七影蝶-3和七影蝶-4两张图片交替(400ms)模拟翅膀扇动
- **浮动效果**: 蝴蝶自带轻微上下浮动动画，更加生动
- **权重系统**: 根据weight(1-5)动态调整蝴蝶尺寸，视觉层次分明
- **智能交互**: 点击蝴蝶弹出详情卡片，支持ESC键和点击遮罩关闭
- **多媒体支持**: 详情卡片支持图片展示、音频播放和外部链接跳转

#### 📊 数据库设计
```sql
CREATE TABLE memories (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP DEFAULT NOW(),
  user_name TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  image_url TEXT,
  audio_url TEXT,
  web_url TEXT,
  weight INTEGER CHECK (weight >= 1 AND weight <= 5),
  is_published BOOLEAN DEFAULT false
);
```

### 2025年1月27日 - API-key 配置优化与部署脚本更新 🔧

#### 🎯 主要更新内容
- **API-key 配置**: 项目全面更新为使用环境变量管理 Supabase API-key
- **自动配置**: 所有部署脚本都会自动创建和配置环境变量文件
- **跨平台支持**: Windows 和 Linux 系统都有对应的自动配置脚本
- **部署检查**: 新增部署检查脚本，帮助验证配置是否正确

#### 🔧 技术改进
- **环境变量管理**:
  - 更新 `ecosystem.config.js` 添加 Supabase 环境变量配置
  - 更新 `pm2-manager.sh` 支持自动创建和加载环境变量
  - 更新所有启动脚本支持环境变量自动配置
- **部署脚本优化**:
  - `start_full_project.bat` - Windows 一键启动脚本
  - `start-dev.sh` - Linux 开发环境启动脚本
  - `pm2-manager.sh` - Linux 生产环境管理脚本
- **配置模板**:
  - 创建 `env.production.template` 生产环境配置模板
  - 更新 `sprb-web.service` systemd 服务配置
- **检查工具**:
  - 新增 `check_deployment.bat` Windows 部署检查脚本
  - 新增 `check_deployment.sh` Linux 部署检查脚本

#### 📊 配置结构
```
环境变量配置:
├── .env - 自动创建的环境变量文件
├── env.production.template - 生产环境配置模板
├── frontend/env.production - 前端生产环境配置
└── 各启动脚本自动创建和加载环境变量
```

#### 🚀 部署流程优化
1. **开发环境**: 运行启动脚本自动创建环境变量
2. **生产环境**: 使用 PM2 管理脚本自动配置
3. **配置检查**: 运行检查脚本验证配置正确性
4. **零配置**: 无需手动创建环境变量文件

### 2025年8月27日 - 数据库架构优化与僵尸代码清理 🧹

#### 🎯 主要更新内容
- **数据库架构优化**: 清理未使用的SQLite交通攻略相关代码
- **代码结构简化**: 移除僵尸API和未使用的数据模型
- **配置清理**: 删除交通攻略相关的环境变量和配置
- **文档更新**: 完善数据库使用说明和架构文档

#### 🔧 技术改进
- **移除内容**:
  - 删除 `TrafficCard` 数据模型
  - 移除交通攻略相关API端点 (GET/POST/PUT/DELETE /api/traffic-cards)
  - 清理 `init_database()` 函数和SQLite初始化代码
  - 删除 `data/traffic_cards.db` 和 `data/traffic_guides.json` 文件
- **保留功能**:
  - Supabase音频数据服务 (完全正常)
  - Supabase神域数据服务 (完全正常)
  - SQLite神域本地数据 (通过ORM管理)
- **配置优化**:
  - 简化环境变量配置
  - 更新健康检查端点
  - 优化API路由信息

#### 📊 当前数据库架构
```
实际使用:
└── Supabase (云端)
    ├── audios 表 - 音频数据
    └── DivineRealmPage_graph 表 - 神域场景

已清理:
├── traffic_cards.db - 交通攻略数据库 ❌
├── shenyu.db - 神域本地数据库 ❌
├── traffic_guides.json - 交通攻略JSON ❌
├── database.py - SQLite配置文件 ❌
└── 相关API和代码 - 僵尸代码 ❌
```

#### 🎵 音频系统重构与数据管理优化 🎵

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