#!/usr/bin/env bash
set -euo pipefail

# Summer Pockets 生产环境快速更新脚本
# 用于代码更新后的快速部署

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FRONTEND_DIR="$PROJECT_ROOT/frontend"
BACKEND_DIR="$PROJECT_ROOT/backend"
DIST_DIR="$FRONTEND_DIR/dist"
DEPLOY_ROOT="/var/www/sprb.love"

echo "🔄 开始更新 Summer Pockets 网站"
echo "=================================="

# 检查是否为 root 用户
if [[ $EUID -ne 0 ]]; then
   echo "❌ 此脚本需要 root 权限运行"
   echo "请使用: sudo $0"
   exit 1
fi

echo "[1/4] 🏗️ 重新构建前端"
cd "$FRONTEND_DIR"
npm run build >/dev/null 2>&1

if [ ! -d "$DIST_DIR" ] || [ ! -f "$DIST_DIR/index.html" ]; then
    echo "❌ 前端构建失败"
    exit 1
fi

echo "[2/4] 📁 更新静态文件"
rsync -a --delete "$DIST_DIR"/ "$DEPLOY_ROOT"/
chown -R www-data:www-data "$DEPLOY_ROOT"

echo "[3/4] 🔄 重启后端服务"
cd "$BACKEND_DIR"
source venv/bin/activate
pip install -r requirements.txt >/dev/null 2>&1
systemctl restart sprb-backend

# 等待服务启动
sleep 3

# 检查服务状态
if ! curl -s http://127.0.0.1:8000/api/health >/dev/null; then
    echo "❌ 后端服务重启失败"
    systemctl status sprb-backend
    exit 1
fi

echo "[4/4] 🌐 重载 Nginx"
nginx -t && systemctl reload nginx

echo ""
echo "✅ 更新完成！"
echo "网站地址: https://sprb.love"
echo ""
echo "📊 服务状态:"
echo "- Nginx: $(systemctl is-active nginx)"
echo "- 后端API: $(systemctl is-active sprb-backend)"