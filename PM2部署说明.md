# 🚀 Summer Pockets 巡礼网站 - PM2部署说明

## 📋 概述

本文档介绍如何使用PM2在Linux系统上部署和管理Summer Pockets巡礼网站。PM2是一个强大的Node.js进程管理器，提供进程守护、负载均衡、日志管理等功能。

## 🎯 优势

- **进程守护**: 自动重启崩溃的应用
- **负载均衡**: 支持多进程集群模式
- **日志管理**: 统一的日志收集和轮转
- **监控面板**: 实时监控应用状态
- **开机自启**: 系统重启后自动启动服务

## 🛠️ 环境要求

- **操作系统**: Ubuntu 18.04+ / CentOS 7+ / Debian 9+
- **Python**: 3.9+
- **Node.js**: 16.0+
- **npm**: 8.0+
- **PM2**: 5.0+

## 📦 安装步骤

### 1. 系统更新
```bash
sudo apt update && sudo apt upgrade -y
```

### 2. 安装Python和Node.js
```bash
# 安装Python
sudo apt install python3 python3-pip python3-venv -y

# 安装Node.js (使用NodeSource)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install nodejs -y

# 验证安装
python3 --version
node --version
npm --version
```

### 3. 安装PM2
```bash
sudo npm install -g pm2
```

### 4. 克隆项目
```bash
cd /var/www
sudo git clone <your-repo-url> sprb-web
sudo chown -R $USER:$USER sprb-web
cd sprb-web
```

## 🚀 快速部署

### 使用管理脚本 (推荐)
```bash
# 给脚本执行权限
chmod +x pm2-manager.sh

# 初始设置 (安装依赖、创建目录、构建前端)
./pm2-manager.sh setup

# 启动生产环境服务
./pm2-manager.sh start

# 查看服务状态
./pm2-manager.sh status
```

### 手动部署
```bash
# 1. 创建必要目录
mkdir -p logs data uploads

# 2. 安装后端依赖
cd backend
pip3 install -r requirements.txt
cd ..

# 3. 安装前端依赖并构建
cd frontend
npm install
npm run build:production
cd ..

# 4. 启动PM2服务
pm2 start ecosystem.config.js --env production
```

## 🔧 PM2管理命令

### 基础命令
```bash
# 启动服务
pm2 start ecosystem.config.js --env production

# 停止服务
pm2 stop ecosystem.config.js

# 重启服务
pm2 restart ecosystem.config.js

# 重载服务 (零停机重启)
pm2 reload ecosystem.config.js

# 删除服务
pm2 delete ecosystem.config.js

# 查看状态
pm2 status

# 查看日志
pm2 logs

# 监控面板
pm2 monit
```

### 高级命令
```bash
# 保存当前进程列表
pm2 save

# 恢复保存的进程列表
pm2 resurrect

# 设置开机自启
pm2 startup

# 更新PM2
pm2 update

# 查看详细信息
pm2 show sprb-backend
pm2 show sprb-frontend
```

## 🌐 配置Nginx反向代理

### 1. 安装Nginx
```bash
sudo apt install nginx -y
```

### 2. 配置网站
```bash
# 复制配置文件
sudo cp nginx.conf /etc/nginx/sites-available/sprb-web

# 创建软链接
sudo ln -s /etc/nginx/sites-available/sprb-web /etc/nginx/sites-enabled/

# 测试配置
sudo nginx -t

# 重启Nginx
sudo systemctl restart nginx
```

### 3. 配置SSL (可选)
```bash
# 安装Certbot
sudo apt install certbot python3-certbot-nginx -y

# 获取SSL证书
sudo certbot --nginx -d your-domain.com

# 自动续期
sudo crontab -e
# 添加: 0 12 * * * /usr/bin/certbot renew --quiet
```

## 🔒 安全配置

### 1. 防火墙设置
```bash
# 安装UFW
sudo apt install ufw -y

# 配置规则
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

### 2. 系统服务配置
```bash
# 复制systemd服务文件
sudo cp sprb-web.service /etc/systemd/system/

# 重新加载systemd
sudo systemctl daemon-reload

# 启用服务
sudo systemctl enable sprb-web

# 启动服务
sudo systemctl start sprb-web
```

## 📊 监控和维护

### 1. 日志管理
```bash
# 查看实时日志
pm2 logs --lines 100

# 查看特定服务日志
pm2 logs sprb-backend --lines 50
pm2 logs sprb-frontend --lines 50

# 日志文件位置
# 后端: ./logs/backend-*.log
# 前端: ./logs/frontend-*.log
```

### 2. 性能监控
```bash
# 启动监控面板
pm2 monit

# 查看资源使用
pm2 show sprb-backend
pm2 show sprb-frontend
```

### 3. 健康检查
```bash
# 检查后端健康状态
curl http://localhost:8000/health

# 检查前端状态
curl http://localhost:3000
```

## 🚨 故障排除

### 常见问题

#### 1. 端口被占用
```bash
# 查看端口占用
sudo netstat -tlnp | grep :8000
sudo netstat -tlnp | grep :3000

# 杀死占用进程
sudo kill -9 <PID>
```

#### 2. 权限问题
```bash
# 修复目录权限
sudo chown -R $USER:$USER /var/www/sprb-web
sudo chmod -R 755 /var/www/sprb-web
```

#### 3. 依赖问题
```bash
# 重新安装依赖
cd backend && pip3 install -r requirements.txt --force-reinstall
cd frontend && npm install --force
```

#### 4. PM2进程异常
```bash
# 清理PM2
pm2 kill
pm2 start ecosystem.config.js --env production
```

## 📈 性能优化

### 1. 进程配置
```javascript
// ecosystem.config.js 中的关键配置
instances: 4,           // 后端进程数 (建议CPU核心数)
exec_mode: 'cluster',   // 集群模式
max_memory_restart: '500M',  // 内存限制
```

### 2. 系统优化
```bash
# 增加文件描述符限制
echo "* soft nofile 65536" | sudo tee -a /etc/security/limits.conf
echo "* hard nofile 65536" | sudo tee -a /etc/security/limits.conf

# 优化内核参数
echo "net.core.somaxconn = 65535" | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

## 🔄 更新部署

### 1. 代码更新
```bash
# 拉取最新代码
git pull origin main

# 重新构建前端
cd frontend && npm run build:production && cd ..

# 重载服务
pm2 reload ecosystem.config.js
```

### 2. 依赖更新
```bash
# 更新后端依赖
cd backend && pip3 install -r requirements.txt --upgrade && cd ..

# 更新前端依赖
cd frontend && npm update && npm run build:production && cd ..

# 重启服务
pm2 restart ecosystem.config.js
```

## 📞 技术支持

如有问题，请检查：
1. PM2状态: `pm2 status`
2. 服务日志: `pm2 logs`
3. 系统日志: `sudo journalctl -u sprb-web`
4. Nginx日志: `sudo tail -f /var/log/nginx/error.log`

---

**🎉 恭喜！你的Summer Pockets巡礼网站已经成功部署并运行在PM2管理下！**
