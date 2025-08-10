#!/usr/bin/env bash
set -euo pipefail

# Summer Pockets SSL 证书续期脚本

DOMAIN="sprb.love"
LOG_FILE="/var/log/ssl-renewal.log"

echo "🔒 开始 SSL 证书续期检查"
echo "=========================="
echo "域名: $DOMAIN"
echo "时间: $(date)"
echo ""

# 记录到日志文件
exec > >(tee -a "$LOG_FILE")
exec 2>&1

echo "[1/4] 📋 检查当前证书状态"
if certbot certificates | grep -q "$DOMAIN"; then
    echo "✅ 找到域名 $DOMAIN 的证书"
    certbot certificates | grep -A 10 "$DOMAIN"
else
    echo "❌ 未找到域名 $DOMAIN 的证书"
    exit 1
fi

echo ""
echo "[2/4] 🔄 执行证书续期"
if certbot renew --quiet; then
    echo "✅ 证书续期检查完成"
else
    echo "❌ 证书续期失败"
    exit 1
fi

echo ""
echo "[3/4] 🌐 重载 Nginx 配置"
if nginx -t; then
    systemctl reload nginx
    echo "✅ Nginx 配置重载成功"
else
    echo "❌ Nginx 配置测试失败"
    exit 1
fi

echo ""
echo "[4/4] ✅ 验证证书有效性"
if echo | openssl s_client -servername "$DOMAIN" -connect "$DOMAIN:443" 2>/dev/null | openssl x509 -noout -dates; then
    echo "✅ 证书验证成功"
else
    echo "❌ 证书验证失败"
    exit 1
fi

echo ""
echo "🎉 SSL 证书续期完成！"
echo "=========================="
echo "时间: $(date)"

# 发送通知（可选，需要配置邮件服务）
# echo "SSL certificate renewal completed for $DOMAIN" | mail -s "SSL Renewal Success" admin@example.com