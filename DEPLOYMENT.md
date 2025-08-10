# Summer Pockets 网站部署指南

## 🚀 生产环境部署到 sprb.love

### 前置要求

1. **服务器要求**
   - Ubuntu 18.04+ 或 CentOS 7+
   - 至少 2GB RAM
   - 至少 20GB 磁盘空间
   - Root 权限

2. **域名配置**
   - 确保域名 `sprb.love` 和 `www.sprb.love` 的 A 记录指向服务器 IP
   - DNS 解析生效（可用 `nslookup sprb.love` 检查）

3. **防火墙设置**
   ```bash
   # 开放必要端口
   ufw allow 22    # SSH
   ufw allow 80    # HTTP
   ufw allow 443   # HTTPS
   ufw enable
   ```

### 📦 一键部署

1. **下载代码**
   ```bash
   git clone <repository-url>
   cd sprbWeb
   ```

2. **修改配置**
   编辑 `deploy-production.sh` 中的邮箱地址：
   ```bash
   EMAIL="your-email@example.com"  # 替换为你的邮箱
   ```

3. **执行部署**
   ```bash
   sudo ./deploy-production.sh
   ```

   部署脚本会自动完成：
   - ✅ 安装系统依赖 (Nginx, Certbot, Node.js, Python)
   - ✅ 构建前端生产版本
   - ✅ 配置 Nginx 反向代理
   - ✅ 启动后端 API 服务
   - ✅ 申请 Let's Encrypt SSL 证书
   - ✅ 配置 HTTPS 重定向
   - ✅ 设置服务自启动

4. **验证部署**
   ```bash
   # 检查服务状态
   ./monitor.sh
   
   # 或手动检查
   curl -I https://sprb.love
   curl https://sprb.love/api/health
   ```

### 🔄 代码更新

当代码有更新时，使用快速更新脚本：

```bash
# 拉取最新代码
git pull

# 快速更新部署
sudo ./update-production.sh
```

### 📊 监控和维护

1. **服务状态监控**
   ```bash
   ./monitor.sh
   ```

2. **查看日志**
   ```bash
   # 后端服务日志
   journalctl -u sprb-backend -f
   
   # Nginx 访问日志
   tail -f /var/log/nginx/access.log
   
   # Nginx 错误日志
   tail -f /var/log/nginx/error.log
   ```

3. **重启服务**
   ```bash
   # 重启后端
   sudo systemctl restart sprb-backend
   
   # 重启 Nginx
   sudo systemctl restart nginx
   ```

4. **SSL 证书管理**
   ```bash
   # 检查证书状态
   sudo certbot certificates
   
   # 手动续期
   sudo certbot renew
   
   # 测试续期
   sudo certbot renew --dry-run
   ```

### 🔧 配置文件位置

- **Nginx 配置**: `/etc/nginx/sites-available/sprb.love`
- **网站文件**: `/var/www/sprb.love`
- **后端代码**: `./backend/`
- **服务配置**: `/etc/systemd/system/sprb-backend.service`
- **SSL 证书**: `/etc/letsencrypt/live/sprb.love/`

### 🛠️ 故障排除

#### 1. 网站无法访问
```bash
# 检查 Nginx 状态
sudo systemctl status nginx

# 检查 Nginx 配置
sudo nginx -t

# 重启 Nginx
sudo systemctl restart nginx
```

#### 2. API 接口报错
```bash
# 检查后端服务
sudo systemctl status sprb-backend

# 查看后端日志
journalctl -u sprb-backend -n 50

# 重启后端服务
sudo systemctl restart sprb-backend
```

#### 3. SSL 证书问题
```bash
# 检查证书状态
sudo certbot certificates

# 重新申请证书
sudo certbot --nginx -d sprb.love -d www.sprb.love --force-renewal
```

#### 4. 域名解析问题
```bash
# 检查 DNS 解析
nslookup sprb.love
dig sprb.love

# 检查从外部的访问
curl -I http://sprb.love
```

### 📈 性能优化

1. **启用 Gzip 压缩**
   ```bash
   # 编辑 Nginx 配置
   sudo nano /etc/nginx/nginx.conf
   
   # 确保启用 gzip
   gzip on;
   gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
   ```

2. **配置缓存**
   ```bash
   # 静态资源缓存已在 Nginx 配置中设置
   # 可根据需要调整缓存时间
   ```

3. **数据库优化**
   ```bash
   # 定期清理日志
   find ./backend/logs -name "*.log" -mtime +30 -delete
   
   # 数据库备份
   cp ./backend/data/shenyu.db ./backend/data/shenyu.db.backup.$(date +%Y%m%d)
   ```

### 🔐 安全建议

1. **更新系统密钥**
   - 修改 `backend/.env.production` 中的 `SECRET_KEY` 和 `JWT_SECRET_KEY`
   - 使用强密码生成器生成复杂密钥

2. **定期更新**
   ```bash
   # 更新系统包
   sudo apt update && sudo apt upgrade
   
   # 更新 Node.js 依赖
   cd frontend && npm audit fix
   
   # 更新 Python 依赖
   cd backend && pip list --outdated
   ```

3. **备份策略**
   ```bash
   # 创建备份脚本
   #!/bin/bash
   DATE=$(date +%Y%m%d_%H%M%S)
   tar -czf /backup/sprb-backup-$DATE.tar.gz \
       /var/www/sprb.love \
       ./backend/data \
       ./backend/uploads \
       /etc/nginx/sites-available/sprb.love
   ```

### 📞 技术支持

如果遇到问题，请检查：
1. 服务器日志文件
2. 域名 DNS 设置
3. 防火墙配置
4. SSL 证书状态

或运行监控脚本获取详细状态信息：
```bash
./monitor.sh
```