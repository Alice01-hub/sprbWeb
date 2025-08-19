# 🪟 Windows 使用说明

> Summer Pockets 巡礼网站 Windows 环境使用指南

## 🚀 快速启动

### 方法一：一键启动（推荐）
```bash
# 双击运行
start.bat
```

### 方法二：PowerShell 启动
```bash
# 以管理员身份运行 PowerShell
.\start_services.ps1
```

## 📋 环境要求

- **Windows 10/11** (64位)
- **Python 3.11+**
- **Node.js 18+**
- **conda** (推荐) 或 pip

## 🔧 环境准备

### 1. 安装 conda
```bash
# 下载并安装 Miniconda
# https://docs.conda.io/en/latest/miniconda.html
```

### 2. 创建虚拟环境
```bash
# 打开 Anaconda Prompt
conda create -n sprb-web python=3.11
conda activate sprb-web
```

### 3. 安装依赖
```bash
# 后端依赖
cd backend
pip install -r requirements.txt
cd ..

# 前端依赖
cd frontend
npm install
cd ..
```

## 🎯 启动流程

### 自动启动流程
1. **环境检查** - 自动检查 conda 环境
2. **后端启动** - 启动 FastAPI 服务 (端口 8000)
3. **前端启动** - 启动 React 开发服务器 (端口 3000)
4. **服务就绪** - 显示访问地址

### 手动启动流程
```bash
# 终端 1：启动后端
cd backend
conda activate sprb-web
uvicorn app:app --host 127.0.0.1 --port 8000 --reload

# 终端 2：启动前端
cd frontend
npm run dev
```

## 🌐 访问地址

启动成功后，在浏览器中访问：

- **主网站**: http://localhost:3000
- **后端API**: http://localhost:8000
- **API文档**: http://localhost:8000/docs

## 🔍 故障排除

### 端口被占用
```bash
# 查看端口占用
netstat -ano | findstr :8000
netstat -ano | findstr :3000

# 结束进程
taskkill /PID <进程ID> /F
```

### conda 环境问题
```bash
# 重新创建环境
conda remove -n sprb-web --all
conda create -n sprb-web python=3.11
conda activate sprb-web
```

### 依赖安装失败
```bash
# 更新 conda
conda update conda

# 清理缓存
conda clean --all

# 重新安装
pip install -r requirements.txt
```

## 📁 项目结构

```
sprbWeb/
├── frontend/                 # 前端代码
│   ├── src/                 # 源代码
│   ├── public/              # 静态资源
│   └── package.json         # 依赖配置
├── backend/                  # 后端代码
│   ├── api/                 # API接口
│   ├── data/                # 数据库
│   └── requirements.txt     # Python依赖
├── start.bat                # 快速启动
├── start_services.ps1       # 详细启动脚本 (已修复)
└── config.json              # 项目配置
```

## 🎵 功能特性

- **音乐播放器** - 16首 Summer Pockets 原声带
- **地图导航** - 瀬戸内海地区详细地图
- **打卡系统** - 完整的巡礼打卡指南
- **图片画廊** - 高质量巡礼照片展示
- **响应式设计** - 支持各种屏幕尺寸

## 🔒 安全说明

- 开发环境使用本地地址 (127.0.0.1)
- 生产环境使用公网地址 (0.0.0.0)
- JWT 认证保护敏感接口
- CORS 跨域保护

## 📱 移动端支持

- 响应式设计，支持触摸操作
- 移动端优化的 UI 组件
- 支持 PWA 特性

## 🚀 部署到生产环境

### 构建生产版本
```bash
# 构建前端
cd frontend
npm run build:production
cd ..

# 启动生产服务
cd frontend
npm run preview:production
```

### 使用部署脚本
```bash
# 运行部署脚本
deploy.bat
```

## 📞 技术支持

如果遇到问题，请检查：

1. **环境变量** - 确保 PATH 包含 Python 和 Node.js
2. **端口占用** - 确保 3000 和 8000 端口未被占用
3. **权限问题** - 以管理员身份运行 PowerShell
4. **防火墙设置** - 允许 Python 和 Node.js 通过防火墙

## 📝 更新日志

- **v2.0.0** (2025-08-19) - 项目重构，移除后台管理，优化架构
- **v1.0.0** (2025-08-11) - 初始版本发布

---

**最后更新**: 2025年8月19日  
**版本**: v2.0.0 (重构版本)
