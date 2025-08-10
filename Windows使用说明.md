# 鸟白岛巡礼网站 - Windows使用说明

## 🚀 快速开始

### 1. 环境准备
确保已安装以下工具：
- Git
- conda (Miniconda或Anaconda)
- Node.js
- npm

### 2. 克隆项目
```bash
git clone https://github.com/Alice01-hub/sprbWeb.git
cd sprbWeb
```

### 3. 环境初始化
```bash
# 运行环境初始化脚本
.\setup_environment.ps1
```

### 4. 启动服务
```bash
# 方式1：使用批处理文件（推荐新手）
.\start.bat

# 方式2：使用PowerShell脚本
.\start_services.ps1

# 方式3：使用服务管理器
.\manage_services.ps1 start
```

## 📁 脚本说明

### `start.bat` - 简单启动脚本
- **用途**: 一键启动所有服务
- **特点**: 简单易用，适合新手
- **运行**: 双击运行或在命令行执行 `.\start.bat`

### `start_services.ps1` - 完整启动脚本
- **用途**: 智能启动服务，包含依赖检查
- **特点**: 功能完整，错误处理完善
- **参数**:
  - `-CheckOnly`: 仅检查依赖
  - `-BackendOnly`: 仅启动后端
  - `-FrontendOnly`: 仅启动前端

### `setup_environment.ps1` - 环境初始化脚本
- **用途**: 创建conda环境，安装依赖
- **特点**: 自动化环境配置
- **运行**: `.\setup_environment.ps1`

### `manage_services.ps1` - 服务管理脚本
- **用途**: 启动、停止、重启、监控服务
- **特点**: 完整的服务管理功能
- **操作**:
  - `.\manage_services.ps1 start` - 启动服务
  - `.\manage_services.ps1 stop` - 停止服务
  - `.\manage_services.ps1 restart` - 重启服务
  - `.\manage_services.ps1 status` - 查看状态
  - `.\manage_services.ps1 logs` - 查看日志
  - `.\manage_services.ps1 monitor` - 实时监控

## 🔧 常用操作

### 启动服务
```bash
# 启动所有服务
.\start.bat

# 或使用PowerShell
.\start_services.ps1
```

### 查看服务状态
```bash
.\manage_services.ps1 status
```

### 停止服务
```bash
.\manage_services.ps1 stop
```

### 重启服务
```bash
.\manage_services.ps1 restart
```

### 实时监控
```bash
.\manage_services.ps1 monitor
```

### 查看日志
```bash
.\manage_services.ps1 logs
```

## 📱 访问地址

启动成功后，可以访问：

- **主网站**: http://localhost:3000
- **后端API**: http://localhost:8000
- **API文档**: http://localhost:8000/docs
- **后台管理**: http://localhost:3001

## 🚨 故障排除

### 端口被占用
```bash
# 检查端口占用
netstat -ano | findstr :8000
netstat -ano | findstr :3000

# 停止占用端口的进程
.\manage_services.ps1 stop
```

### 依赖问题
```bash
# 重新初始化环境
.\setup_environment.ps1
```

### 权限问题
- 以管理员身份运行PowerShell
- 检查执行策略：`Get-ExecutionPolicy`
- 设置执行策略：`Set-ExecutionPolicy RemoteSigned -Scope CurrentUser`

### 服务启动失败
```bash
# 检查环境
.\start_services.ps1 -CheckOnly

# 查看详细日志
.\manage_services.ps1 logs
```

## 💡 使用技巧

1. **首次使用**: 先运行 `.\setup_environment.ps1` 初始化环境
2. **日常启动**: 使用 `.\start.bat` 快速启动
3. **问题诊断**: 使用 `.\manage_services.ps1 status` 查看状态
4. **实时监控**: 使用 `.\manage_services.ps1 monitor` 监控服务
5. **日志查看**: 使用 `.\manage_services.ps1 logs` 查看日志

## 🔄 更新项目

```bash
# 拉取最新代码
git pull origin main

# 重新安装依赖（如果需要）
.\setup_environment.ps1

# 重启服务
.\manage_services.ps1 restart
```

## 📞 技术支持

如果遇到问题：
1. 检查错误信息
2. 查看服务状态：`.\manage_services.ps1 status`
3. 查看日志：`.\manage_services.ps1 logs`
4. 重新初始化环境：`.\setup_environment.ps1`

---

**祝您使用愉快！** 🌅
