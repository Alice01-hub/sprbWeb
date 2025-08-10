#!/usr/bin/env bash
set -euo pipefail

# Summer Pockets 网站生产环境部署脚本
# 功能：
# 1. 构建前端生产版本
# 2. 配置 Nginx 反向代理
# 3. 申请 Let's Encrypt SSL 证书
# 4. 启动后端服务
# 5. 配置域名 sprb.love

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FRONTEND_DIR="$PROJECT_ROOT/frontend"
BACKEND_DIR="$PROJECT_ROOT/backend"
DIST_DIR="$FRONTEND_DIR/dist"
DEPLOY_ROOT="/var/www/sprb.love"
NGINX_CONF="/etc/nginx/sites-available/sprb.love"
DOMAIN="sprb.love"
EMAIL="admin@sprb.love"

echo "🚀 开始部署 Summer Pockets 网站到 $DOMAIN"
echo "=================================================="

# 检查是否为 root 用户
if [[ $EUID -ne 0 ]]; then
   echo "❌ 此脚本需要 root 权限运行"
   echo "请使用: sudo $0"
   exit 1
fi

echo "[1/8] 🛑 停止现有服务"
# 停止可能运行的服务
systemctl stop nginx || true
pkill -f "uvicorn.*app:app" || true
pkill -f "node.*vite" || true

echo "[2/8] 📦 安装系统依赖"
export DEBIAN_FRONTEND=noninteractive
apt-get update -y >/dev/null
apt-get install -y nginx certbot python3-certbot-nginx curl software-properties-common >/dev/null

# 安装 Node.js (如果未安装)
if ! command -v node >/dev/null 2>&1; then
    echo "📦 安装 Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - >/dev/null
    apt-get install -y nodejs >/dev/null
fi

# 安装 Python 依赖 (如果未安装)
if ! command -v python3 >/dev/null 2>&1; then
    echo "📦 安装 Python..."
    apt-get install -y python3 python3-pip python3-venv >/dev/null
fi

echo "[3/8] 🏗️ 构建前端生产版本"
cd "$FRONTEND_DIR"
if [ ! -d "node_modules" ]; then
    echo "📦 安装前端依赖..."
    npm install --legacy-peer-deps >/dev/null 2>&1
fi

echo "🔨 构建生产版本..."
npm run build >/dev/null 2>&1

# 检查构建是否成功
if [ ! -d "$DIST_DIR" ] || [ ! -f "$DIST_DIR/index.html" ]; then
    echo "❌ 前端构建失败"
    exit 1
fi

echo "[4/8] 📁 部署静态文件"
mkdir -p "$DEPLOY_ROOT"
rsync -a --delete "$DIST_DIR"/ "$DEPLOY_ROOT"/
chown -R www-data:www-data "$DEPLOY_ROOT"
chmod -R 755 "$DEPLOY_ROOT"

echo "[5/8] ⚙️ 配置 Nginx"
cat > "$NGINX_CONF" << EOF
# Summer Pockets 网站配置
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;
    
    # 临时重定向到 HTTPS (证书申请后会更新)
    location / {
        root $DEPLOY_ROOT;
        try_files \$uri \$uri/ /index.html;
        index index.html;
    }
    
    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|webp|svg|ico|woff2?|ttf|eot)$ {
        root $DEPLOY_ROOT;
        expires 30d;
        access_log off;
        add_header Cache-Control "public, max-age=2592000";
        add_header Vary Accept-Encoding;
        gzip_static on;
    }
    
    # API 代理到后端
    location /api/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_connect_timeout 30s;
        proxy_send_timeout 30s;
        proxy_read_timeout 30s;
    }
    
    # 音频文件代理
    location /audio/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
    
    # 上传文件代理
    location /uploads/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
    
    # 安全头
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
}
EOF

# 启用站点
ln -sf "$NGINX_CONF" /etc/nginx/sites-enabled/sprb.love
rm -f /etc/nginx/sites-enabled/default || true

# 测试 Nginx 配置
nginx -t
if [ $? -ne 0 ]; then
    echo "❌ Nginx 配置错误"
    exit 1
fi

echo "[6/8] 🔧 启动后端服务"
cd "$BACKEND_DIR"

# 创建 Python 虚拟环境 (如果不存在)
if [ ! -d "venv" ]; then
    echo "📦 创建 Python 虚拟环境..."
    python3 -m venv venv
fi

# 激活虚拟环境并安装依赖
source venv/bin/activate
pip install --upgrade pip >/dev/null 2>&1
pip install -r requirements.txt >/dev/null 2>&1

# 初始化数据库
python init_db.py

# 创建 systemd 服务文件
cat > /etc/systemd/system/sprb-backend.service << EOF
[Unit]
Description=Summer Pockets Backend API
After=network.target

[Service]
Type=simple
User=www-data
Group=www-data
WorkingDirectory=$BACKEND_DIR
Environment=PATH=$BACKEND_DIR/venv/bin
Environment=ENVIRONMENT=production
Environment=DEBUG=false
Environment=LOG_LEVEL=INFO
ExecStart=$BACKEND_DIR/venv/bin/uvicorn app:app --host 127.0.0.1 --port 8000 --workers 2
Restart=always
RestartSec=3
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
EOF

# 启动后端服务
systemctl daemon-reload
systemctl enable sprb-backend
systemctl start sprb-backend

# 等待后端启动
echo "⏳ 等待后端服务启动..."
sleep 5

# 检查后端是否启动成功
if ! curl -s http://127.0.0.1:8000/api/health >/dev/null; then
    echo "❌ 后端服务启动失败"
    systemctl status sprb-backend
    exit 1
fi

echo "[7/8] 🌐 启动 Nginx"
systemctl enable nginx
systemctl start nginx

# 检查 Nginx 是否启动成功
if ! systemctl is-active --quiet nginx; then
    echo "❌ Nginx 启动失败"
    systemctl status nginx
    exit 1
fi

echo "[8/8] 🔒 申请 SSL 证书"
echo "正在为域名 $DOMAIN 申请 Let's Encrypt 证书..."

# 申请证书
certbot --nginx -d "$DOMAIN" -d "www.$DOMAIN" \
    --non-interactive \
    --agree-tos \
    --email "$EMAIL" \
    --redirect

if [ $? -eq 0 ]; then
    echo "✅ SSL 证书申请成功"
    
    # 设置自动续期
    (crontab -l 2>/dev/null; echo "0 12 * * * /usr/bin/certbot renew --quiet") | crontab -
    
    echo "✅ 已设置证书自动续期"
else
    echo "⚠️ SSL 证书申请失败，网站仍可通过 HTTP 访问"
    echo "请检查域名 DNS 设置是否正确指向此服务器"
fi

echo ""
echo "🎉 部署完成！"
echo "=================================================="
echo "网站地址: https://$DOMAIN"
echo "备用地址: http://$DOMAIN"
echo "API 文档: https://$DOMAIN/docs"
echo ""
echo "📊 服务状态:"
echo "- Nginx: $(systemctl is-active nginx)"
echo "- 后端API: $(systemctl is-active sprb-backend)"
echo ""
echo "📝 管理命令:"
echo "- 查看后端日志: journalctl -u sprb-backend -f"
echo "- 查看 Nginx 日志: tail -f /var/log/nginx/access.log"
echo "- 重启后端: systemctl restart sprb-backend"
echo "- 重启 Nginx: systemctl restart nginx"
echo "- 续期证书: certbot renew"
echo ""
echo "🔧 配置文件位置:"
echo "- Nginx 配置: $NGINX_CONF"
echo "- 网站文件: $DEPLOY_ROOT"
echo "- 后端代码: $BACKEND_DIR"
echo "- 服务配置: /etc/systemd/system/sprb-backend.service"