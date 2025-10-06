# 🚀 部署相关文件

这个文件夹包含了生产环境部署所需的所有文件。

## 📁 文件说明

### PM2 进程管理
- `ecosystem.config.js` - PM2 配置文件
- `pm2-manager.sh` - PM2 管理脚本
- `sprb-web.service` - systemd 服务文件

### Web 服务器
- `nginx.conf` - Nginx 配置文件

### 部署脚本
- `check_deployment.sh` - 部署检查脚本
- `start-dev.sh` - Linux 开发环境启动脚本

### 环境配置
- `env.production.template` - 生产环境配置模板
- `frontend/env.production` - 前端生产环境配置

## 🚀 使用方法

### Linux 生产环境部署
```bash
# 将文件复制到项目根目录
cp deploy/* ./

# 运行 PM2 管理脚本
chmod +x pm2-manager.sh
./pm2-manager.sh setup
./pm2-manager.sh start
```

### 开发环境
这些文件在开发时不需要，可以忽略。
