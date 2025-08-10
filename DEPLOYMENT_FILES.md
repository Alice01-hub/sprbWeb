# 📁 部署文件说明

## 🚀 部署脚本文件

### 1. `deploy-production.sh` - 生产环境一键部署脚本
**功能**: 完整的生产环境部署，包括：
- 安装系统依赖 (Nginx, Certbot, Node.js, Python)
- 构建前端生产版本
- 配置 Nginx 反向代理
- 启动后端 API 服务
- 申请 Let's Encrypt SSL 证书
- 配置 HTTPS 重定向和自启动

**使用方法**:
```bash
sudo ./deploy-production.sh
```

### 2. `update-production.sh` - 快速更新脚本
**功能**: 代码更新后的快速部署
- 重新构建前端
- 更新静态文件
- 重启后端服务
- 重载 Nginx 配置

**使用方法**:
```bash
sudo ./update-production.sh
```

### 3. `monitor.sh` - 系统监控脚本
**功能**: 检查网站和服务状态
- 系统服务状态检查
- 端口监听状态
- 网站可用性测试
- SSL 证书状态
- 系统资源使用情况
- 错误日志查看

**使用方法**:
```bash
./monitor.sh
```

### 4. `backup.sh` - 自动备份脚本
**功能**: 备份网站数据和配置
- 备份网站文件
- 备份数据库
- 备份上传文件
- 备份配置文件
- 自动清理旧备份

**使用方法**:
```bash
./backup.sh
```

### 5. `renew-ssl.sh` - SSL 证书续期脚本
**功能**: SSL 证书续期和验证
- 检查证书状态
- 执行证书续期
- 重载 Nginx 配置
- 验证证书有效性

**使用方法**:
```bash
sudo ./renew-ssl.sh
```

## ⚙️ 配置文件

### 1. `backend/.env.production` - 后端生产环境配置
**内容**:
- 环境变量设置
- 数据库配置
- 安全密钥配置
- CORS 设置
- 性能参数

### 2. `frontend/.env.production` - 前端生产环境配置
**内容**:
- API 地址配置
- 应用信息设置
- 功能开关
- 性能优化参数

## 📚 文档文件

### 1. `DEPLOYMENT.md` - 详细部署指南
**内容**:
- 前置要求说明
- 详细部署步骤
- 监控和维护指南
- 故障排除方法
- 性能优化建议
- 安全配置建议

### 2. `DEPLOYMENT_CHECKLIST.md` - 部署检查清单
**内容**:
- 部署前准备检查
- 部署过程监控
- 部署后验证
- 服务状态检查
- 监控和维护设置
- 应急预案

### 3. `DEPLOYMENT_FILES.md` - 本文件
**内容**:
- 所有部署文件的说明
- 使用方法和注意事项

## 🔄 部署流程

### 首次部署
1. 准备服务器环境
2. 配置域名 DNS
3. 修改配置文件中的邮箱地址
4. 执行 `sudo ./deploy-production.sh`
5. 使用 `./monitor.sh` 验证部署

### 代码更新
1. 拉取最新代码 `git pull`
2. 执行 `sudo ./update-production.sh`
3. 验证更新效果

### 日常维护
1. 定期运行 `./monitor.sh` 检查状态
2. 定期运行 `./backup.sh` 备份数据
3. 证书自动续期（已配置 crontab）

## 📋 定时任务建议

添加到 crontab (`sudo crontab -e`):

```bash
# SSL 证书自动续期 (每天中午12点检查)
0 12 * * * /path/to/sprb/renew-ssl.sh

# 自动备份 (每天凌晨2点)
0 2 * * * /path/to/sprb/backup.sh

# 系统监控 (每小时检查一次，可选)
0 * * * * /path/to/sprb/monitor.sh >> /var/log/sprb-monitor.log
```

## 🔐 安全注意事项

1. **修改默认密钥**: 
   - 更新 `backend/.env.production` 中的 `SECRET_KEY` 和 `JWT_SECRET_KEY`

2. **文件权限**:
   - 脚本文件: `chmod +x *.sh`
   - 配置文件: `chmod 600 .env.production`

3. **防火墙配置**:
   - 只开放必要端口 (22, 80, 443)
   - 配置云服务商安全组

4. **定期更新**:
   - 系统包更新
   - 依赖包更新
   - 安全补丁

## 🆘 紧急联系

如果部署过程中遇到问题：

1. 查看脚本执行日志
2. 运行 `./monitor.sh` 获取详细状态
3. 检查系统日志 `journalctl -xe`
4. 查看服务状态 `systemctl status nginx sprb-backend`

## 📞 技术支持

- 部署文档: `DEPLOYMENT.md`
- 检查清单: `DEPLOYMENT_CHECKLIST.md`
- 监控脚本: `./monitor.sh`
- 项目文档: `README.md`