# 🚀 Summer Pockets 网站部署检查清单

## 📋 部署前准备

### ☑️ 服务器环境检查
- [ ] 服务器系统：Ubuntu 18.04+ 或 CentOS 7+
- [ ] 内存：至少 2GB RAM
- [ ] 磁盘：至少 20GB 可用空间
- [ ] 权限：Root 或 sudo 权限
- [ ] 网络：服务器可访问互联网

### ☑️ 域名配置检查
- [ ] 域名 `sprb.love` A 记录指向服务器 IP
- [ ] 域名 `www.sprb.love` A 记录指向服务器 IP
- [ ] DNS 解析生效（使用 `nslookup sprb.love` 验证）
- [ ] 域名注册商设置正确

### ☑️ 防火墙配置
- [ ] 开放端口 22 (SSH)
- [ ] 开放端口 80 (HTTP)
- [ ] 开放端口 443 (HTTPS)
- [ ] 云服务商安全组配置正确

## 🔧 部署配置

### ☑️ 修改配置文件
- [ ] 编辑 `deploy-production.sh` 中的邮箱地址
- [ ] 检查 `backend/.env.production` 配置
- [ ] 检查 `frontend/.env.production` 配置
- [ ] 更新安全密钥（SECRET_KEY, JWT_SECRET_KEY）

### ☑️ 代码准备
- [ ] 代码已推送到最新版本
- [ ] 前端构建测试通过
- [ ] 后端依赖安装正常
- [ ] 数据库初始化脚本可用

## 🚀 执行部署

### ☑️ 部署步骤
- [ ] 下载代码到服务器
- [ ] 给脚本添加执行权限：`chmod +x *.sh`
- [ ] 执行部署脚本：`sudo ./deploy-production.sh`
- [ ] 等待部署完成（约 5-10 分钟）

### ☑️ 部署过程监控
- [ ] 系统依赖安装成功
- [ ] 前端构建成功
- [ ] 后端服务启动成功
- [ ] Nginx 配置正确
- [ ] SSL 证书申请成功

## ✅ 部署后验证

### ☑️ 基础功能测试
- [ ] 网站首页可正常访问：`https://sprb.love`
- [ ] HTTPS 重定向工作正常
- [ ] API 健康检查：`https://sprb.love/api/health`
- [ ] 静态资源加载正常（图片、音频、CSS、JS）

### ☑️ 核心功能测试
- [ ] 首页日记本界面显示正常
- [ ] 目录页面导航功能正常
- [ ] 交通篇页面和 PDF 下载功能
- [ ] 打卡篇航行动画和岛屿页面
- [ ] 神域页面和七影蝶系统
- [ ] 音乐播放器功能正常

### ☑️ 用户功能测试
- [ ] 用户注册功能
- [ ] 用户登录功能
- [ ] 七影蝶创建和管理
- [ ] 文件上传功能

### ☑️ 性能和安全测试
- [ ] 页面加载速度正常（< 3秒）
- [ ] 移动端响应式设计正常
- [ ] SSL 证书有效且评级良好
- [ ] 安全头配置正确

## 🔍 服务状态检查

### ☑️ 系统服务
- [ ] Nginx 服务运行正常：`systemctl status nginx`
- [ ] 后端 API 服务运行正常：`systemctl status sprb-backend`
- [ ] 证书自动续期设置：`systemctl status certbot.timer`

### ☑️ 端口监听
- [ ] 端口 80 监听正常
- [ ] 端口 443 监听正常
- [ ] 端口 8000 (后端) 监听正常

### ☑️ 日志检查
- [ ] Nginx 访问日志正常：`tail -f /var/log/nginx/access.log`
- [ ] Nginx 错误日志无异常：`tail -f /var/log/nginx/error.log`
- [ ] 后端服务日志正常：`journalctl -u sprb-backend -f`

## 📊 监控和维护设置

### ☑️ 监控脚本
- [ ] 运行监控脚本：`./monitor.sh`
- [ ] 所有检查项显示正常
- [ ] 设置定时监控（可选）

### ☑️ 备份设置
- [ ] 运行备份脚本测试：`./backup.sh`
- [ ] 设置定时备份：`crontab -e`
- [ ] 备份存储位置确认

### ☑️ 自动化任务
- [ ] SSL 证书自动续期设置
- [ ] 系统自动更新配置（可选）
- [ ] 日志轮转配置

## 🔄 更新流程测试

### ☑️ 代码更新测试
- [ ] 修改一个小的前端内容
- [ ] 运行更新脚本：`sudo ./update-production.sh`
- [ ] 验证更新生效
- [ ] 服务正常运行

## 📞 应急联系和文档

### ☑️ 文档准备
- [ ] 部署文档已保存：`DEPLOYMENT.md`
- [ ] 管理员联系方式已记录
- [ ] 域名和服务商信息已记录
- [ ] 服务器登录信息已安全保存

### ☑️ 应急预案
- [ ] 服务故障处理流程
- [ ] 数据恢复流程
- [ ] 证书过期处理流程
- [ ] 域名解析问题处理流程

## 🎉 部署完成确认

### ☑️ 最终确认
- [ ] 所有功能测试通过
- [ ] 性能表现满足要求
- [ ] 安全配置符合标准
- [ ] 监控和备份正常工作
- [ ] 团队成员已通知部署完成

### ☑️ 上线公告
- [ ] 内部团队通知
- [ ] 用户公告准备
- [ ] 社交媒体宣传（可选）
- [ ] 搜索引擎提交（可选）

---

## 📝 部署记录

**部署日期**: ___________  
**部署人员**: ___________  
**服务器IP**: ___________  
**域名状态**: ___________  
**SSL证书**: ___________  
**备注**: ___________

---

## 🆘 常见问题快速解决

### 网站无法访问
```bash
sudo systemctl status nginx
sudo nginx -t
sudo systemctl restart nginx
```

### API 接口异常
```bash
sudo systemctl status sprb-backend
journalctl -u sprb-backend -n 20
sudo systemctl restart sprb-backend
```

### SSL 证书问题
```bash
sudo certbot certificates
sudo certbot renew --dry-run
```

### 监控检查
```bash
./monitor.sh
```