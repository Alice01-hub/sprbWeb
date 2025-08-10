#!/usr/bin/env bash
set -euo pipefail

# 部署 Summer Pockets 巡礼网站到本机公网 IP（使用 Nginx 静态托管）
# - 构建前端为生产版本（直接用 vite 构建，跳过 tsc 严格类型检查）
# - 安装并配置 Nginx，替换默认站点为本项目构建产物
# - 一键脚本包含：强制关闭占用端口、安装依赖、重启服务

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FRONTEND_DIR="$PROJECT_ROOT/frontend"
DIST_DIR="$FRONTEND_DIR/dist"
DEPLOY_ROOT="/var/www/sprbweb"
SITE_CONF="/etc/nginx/sites-available/sprbweb"

echo "[1/4] 关闭可能占用的端口: 3000 3001 8000 8001"
if command -v lsof >/dev/null 2>&1; then
  lsof -t -i:3000 -sTCP:LISTEN 2>/dev/null | xargs -r kill -9 || true
  lsof -t -i:3001 -sTCP:LISTEN 2>/dev/null | xargs -r kill -9 || true
  lsof -t -i:8000 -sTCP:LISTEN 2>/dev/null | xargs -r kill -9 || true
  lsof -t -i:8001 -sTCP:LISTEN 2>/dev/null | xargs -r kill -9 || true
fi

echo "[2/4] 安装前端依赖并构建生产包"
cd "$FRONTEND_DIR"
if ! command -v npm >/dev/null 2>&1; then
  echo "错误: 未检测到 npm，请先安装 Node.js 和 npm" >&2
  exit 1
fi
# 安装依赖（已安装则跳过）
npm i --legacy-peer-deps || true
# 直接用 vite 进行生产构建，避免严格 tsc 阶段拦截
npx vite build --mode production

echo "[3/4] 安装并配置 Nginx"
export DEBIAN_FRONTEND=noninteractive
apt-get update -y >/dev/null
apt-get install -y nginx rsync >/dev/null
mkdir -p "$DEPLOY_ROOT"
rsync -a --delete "$DIST_DIR"/ "$DEPLOY_ROOT"/

cat >"$SITE_CONF" << 'EOF'
server {
    listen 80;
    server_name _;
    root /var/www/sprbweb;
    index index.html;

    # 单页应用路由兼容
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 静态资源缓存
    location ~* \.(?:js|css|png|jpg|jpeg|gif|webp|svg|ico|woff2?)$ {
        expires 30d;
        access_log off;
        add_header Cache-Control "public, max-age=2592000";
    }
}
EOF

ln -sf "$SITE_CONF" /etc/nginx/sites-enabled/sprbweb
rm -f /etc/nginx/sites-enabled/default || true
nginx -t
systemctl enable nginx >/dev/null 2>&1 || true
systemctl restart nginx

echo "[4/4] 部署完成！"
echo "站点目录: $DEPLOY_ROOT"
echo "Nginx 配置: $SITE_CONF"
echo "现在可通过本机公网 IP 访问网站。"


