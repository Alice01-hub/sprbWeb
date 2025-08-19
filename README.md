# 🏝️ Summer Pockets 巡礼网站

> 一个专注于 Summer Pockets 圣地巡礼的现代化网站，提供交通指南、打卡攻略和神域探索功能。

## 🚀 项目概述

本项目是一个基于 React + TypeScript + FastAPI 的现代化网站，专门为 Summer Pockets 圣地巡礼爱好者设计。网站集成了音乐播放器、地图导航、打卡系统等核心功能，并采用 OSS 云存储来管理静态资源。

## ✨ 主要功能

### 🎵 音乐播放器
- 支持多种音频格式（MP3、FLAC、WAV）
- 16首 Summer Pockets 原声带
- 循环播放、随机播放、单曲循环
- 响应式设计，支持移动端操作

### 🗺️ 地图导航
- 瀬戸内海地区详细地图
- 女木岛、男木岛、直岛打卡点标注
- 交通路线规划
- 实时位置显示

### 📸 打卡系统
- 详细的打卡点信息
- 时间、天气、光线条件记录
- 照片对比功能
- 打卡进度追踪

### 🎨 图片画廊
- 高质量巡礼照片展示
- 分类浏览（女木岛、男木岛、直岛）
- 响应式图片加载
- 支持多种图片格式

## 🏗️ 技术架构

### 前端技术栈
- **框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式**: Styled Components
- **动画**: Framer Motion
- **路由**: React Router DOM
- **状态管理**: React Context + Hooks

### 后端技术栈
- **框架**: FastAPI (Python) - 简化版本
- **数据库**: SQLite
- **API文档**: OpenAPI/Swagger

### 云服务
- **静态资源**: 阿里云 OSS
- **CDN**: 阿里云 CDN
- **域名**: sprb.love

## 📁 项目结构

```
sprbWeb/
├── frontend/                 # 前端代码
│   ├── src/
│   │   ├── components/      # 组件
│   │   ├── pages/          # 页面
│   │   ├── contexts/       # 上下文
│   │   ├── hooks/          # 自定义钩子
│   │   ├── utils/          # 工具函数
│   │   └── config/         # 配置文件
│   ├── public/             # 静态资源
│   └── package.json        # 前端依赖
├── backend/                 # 后端代码（简化版本）
│   ├── api/                # API模块
│   ├── data/               # 数据库文件
│   ├── app.py              # 主应用
│   ├── run.py              # 启动脚本
│   └── requirements.txt    # Python依赖
└── README.md               # 项目说明
```

## 🔧 后端服务（简化版本）

### 核心API
- **健康检查**: `/health` - 服务状态检查
- **音乐服务**: `/api/music/*` - 音乐播放列表
- **交通攻略**: `/api/traffic-cards/*` - 交通信息管理
- **PDF下载**: `/api/download-checklist` - 巡礼清单下载

### 静态资源配置
- **OSS基础URL**: https://oss.sprb.love
- **图片路径**: `/public/images/webps/` 和 `/public/images/covers/`
- **音频路径**: `/public/audio/`
- **文件路径**: `/public/files/`
- **交通数据**: `/public/trafficdata/`

**注意**: 已修复静态资源路径配置问题，确保所有图片、音频等资源能正确加载。

### 已移除功能
- ❌ 用户认证系统
- ❌ 七影蝶系统
- ❌ 复杂监控系统
- ❌ 文件上传管理

### 保留功能
- ✅ 音乐播放服务
- ✅ 交通攻略数据
- ✅ PDF生成服务
- ✅ 基础健康检查

## 🚀 快速开始

### 环境要求
- **Python**: 3.11+
- **Node.js**: 18+
- **conda** (推荐)

### 安装步骤

1. **克隆项目**
```bash
git clone <repository-url>
cd sprbWeb
```

2. **创建conda环境**
```bash
conda create -n sprb-web python=3.11
conda activate sprb-web
```

3. **安装后端依赖**
```bash
cd backend
pip install -r requirements.txt
cd ..
```

4. **安装前端依赖**
```bash
cd frontend
npm install
cd ..
```

5. **启动服务**
```bash
# Windows
.\start.bat

# 或手动启动 (已修复编码问题)
.\start_services.ps1
```

## 🌐 访问地址

- **前端**: http://localhost:3000
- **后端**: http://localhost:8000
- **API文档**: http://localhost:8000/docs

## 📝 开发说明

### 后端开发
- 使用 `python run.py` 启动后端服务
- 支持热重载开发模式
- 自动生成API文档

### 前端开发
- 使用 `npm run dev` 启动开发服务器
- 支持热重载和快速刷新
- TypeScript类型检查

## 🔄 部署说明

### 开发环境 (Windows)
- 本地开发，热重载
- SQLite数据库
- 调试模式

### 生产环境 (Linux)
- 云服务器部署
- 性能优化
- 生产配置

## 📚 相关资源

- [Summer Pockets 官网](https://key.visualarts.gr.jp/summerpockets/)
- [FastAPI 文档](https://fastapi.tiangolo.com/)
- [React 文档](https://react.dev/)

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

本项目仅供学习和个人使用。

---

**注意**: 这是一个简化版本的后端服务，专注于核心功能。如需完整功能，请参考原始版本或联系开发者。