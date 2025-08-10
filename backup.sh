#!/usr/bin/env bash
set -euo pipefail

# Summer Pockets 网站自动备份脚本

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKUP_DIR="/backup/sprb"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_NAME="sprb-backup-$DATE"
RETENTION_DAYS=30

echo "🗄️ 开始备份 Summer Pockets 网站"
echo "=================================="

# 创建备份目录
mkdir -p "$BACKUP_DIR"

echo "[1/5] 📁 备份网站文件"
if [ -d "/var/www/sprb.love" ]; then
    tar -czf "$BACKUP_DIR/${BACKUP_NAME}-website.tar.gz" -C /var/www sprb.love
    echo "✅ 网站文件备份完成"
else
    echo "⚠️ 网站文件目录不存在，跳过"
fi

echo "[2/5] 🗃️ 备份数据库"
if [ -d "$PROJECT_ROOT/backend/data" ]; then
    tar -czf "$BACKUP_DIR/${BACKUP_NAME}-database.tar.gz" -C "$PROJECT_ROOT/backend" data
    echo "✅ 数据库备份完成"
else
    echo "⚠️ 数据库目录不存在，跳过"
fi

echo "[3/5] 📸 备份上传文件"
if [ -d "$PROJECT_ROOT/backend/uploads" ]; then
    tar -czf "$BACKUP_DIR/${BACKUP_NAME}-uploads.tar.gz" -C "$PROJECT_ROOT/backend" uploads
    echo "✅ 上传文件备份完成"
else
    echo "⚠️ 上传文件目录不存在，跳过"
fi

echo "[4/5] ⚙️ 备份配置文件"
CONFIG_BACKUP_DIR="$BACKUP_DIR/config-$DATE"
mkdir -p "$CONFIG_BACKUP_DIR"

# 备份 Nginx 配置
if [ -f "/etc/nginx/sites-available/sprb.love" ]; then
    cp "/etc/nginx/sites-available/sprb.love" "$CONFIG_BACKUP_DIR/"
fi

# 备份环境配置
if [ -f "$PROJECT_ROOT/backend/.env.production" ]; then
    cp "$PROJECT_ROOT/backend/.env.production" "$CONFIG_BACKUP_DIR/"
fi

if [ -f "$PROJECT_ROOT/frontend/.env.production" ]; then
    cp "$PROJECT_ROOT/frontend/.env.production" "$CONFIG_BACKUP_DIR/"
fi

# 备份 systemd 服务文件
if [ -f "/etc/systemd/system/sprb-backend.service" ]; then
    cp "/etc/systemd/system/sprb-backend.service" "$CONFIG_BACKUP_DIR/"
fi

tar -czf "$BACKUP_DIR/${BACKUP_NAME}-config.tar.gz" -C "$BACKUP_DIR" "config-$DATE"
rm -rf "$CONFIG_BACKUP_DIR"
echo "✅ 配置文件备份完成"

echo "[5/5] 🧹 清理旧备份"
find "$BACKUP_DIR" -name "sprb-backup-*" -mtime +$RETENTION_DAYS -delete 2>/dev/null || true
echo "✅ 旧备份清理完成 (保留 $RETENTION_DAYS 天)"

# 计算备份大小
BACKUP_SIZE=$(du -sh "$BACKUP_DIR" | cut -f1)

echo ""
echo "✅ 备份完成！"
echo "=================================="
echo "备份位置: $BACKUP_DIR"
echo "备份大小: $BACKUP_SIZE"
echo "备份文件:"
ls -la "$BACKUP_DIR"/*$DATE* 2>/dev/null || echo "无备份文件"
echo ""
echo "📋 恢复命令示例:"
echo "# 恢复网站文件:"
echo "sudo tar -xzf $BACKUP_DIR/${BACKUP_NAME}-website.tar.gz -C /var/www/"
echo ""
echo "# 恢复数据库:"
echo "tar -xzf $BACKUP_DIR/${BACKUP_NAME}-database.tar.gz -C $PROJECT_ROOT/backend/"
echo ""
echo "# 恢复上传文件:"
echo "tar -xzf $BACKUP_DIR/${BACKUP_NAME}-uploads.tar.gz -C $PROJECT_ROOT/backend/"