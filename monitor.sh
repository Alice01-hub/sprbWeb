#!/usr/bin/env bash

# Summer Pockets 网站监控脚本
# 检查服务状态和网站可用性

DOMAIN="sprb.love"
BACKEND_PORT=8000

echo "🔍 Summer Pockets 网站监控报告"
echo "=================================="
echo "时间: $(date '+%Y-%m-%d %H:%M:%S')"
echo ""

# 检查系统服务状态
echo "📊 系统服务状态:"
echo "- Nginx: $(systemctl is-active nginx 2>/dev/null || echo '未安装')"
echo "- 后端API: $(systemctl is-active sprb-backend 2>/dev/null || echo '未安装')"
echo "- Certbot Timer: $(systemctl is-active certbot.timer 2>/dev/null || echo '未安装')"
echo ""

# 检查端口监听
echo "🔌 端口监听状态:"
if netstat -tln 2>/dev/null | grep -q ":80 "; then
    echo "- HTTP (80): ✅ 监听中"
else
    echo "- HTTP (80): ❌ 未监听"
fi

if netstat -tln 2>/dev/null | grep -q ":443 "; then
    echo "- HTTPS (443): ✅ 监听中"
else
    echo "- HTTPS (443): ❌ 未监听"
fi

if netstat -tln 2>/dev/null | grep -q ":$BACKEND_PORT "; then
    echo "- 后端API ($BACKEND_PORT): ✅ 监听中"
else
    echo "- 后端API ($BACKEND_PORT): ❌ 未监听"
fi
echo ""

# 检查网站可用性
echo "🌐 网站可用性检查:"

# 检查 HTTP
if curl -s -o /dev/null -w "%{http_code}" "http://$DOMAIN" | grep -q "200\|301\|302"; then
    echo "- HTTP 访问: ✅ 正常"
else
    echo "- HTTP 访问: ❌ 异常"
fi

# 检查 HTTPS
if curl -s -o /dev/null -w "%{http_code}" "https://$DOMAIN" | grep -q "200"; then
    echo "- HTTPS 访问: ✅ 正常"
else
    echo "- HTTPS 访问: ❌ 异常"
fi

# 检查 API
if curl -s "http://127.0.0.1:$BACKEND_PORT/api/health" | grep -q "healthy"; then
    echo "- API 健康检查: ✅ 正常"
else
    echo "- API 健康检查: ❌ 异常"
fi
echo ""

# 检查 SSL 证书
echo "🔒 SSL 证书状态:"
if command -v openssl >/dev/null 2>&1; then
    cert_info=$(echo | openssl s_client -servername "$DOMAIN" -connect "$DOMAIN:443" 2>/dev/null | openssl x509 -noout -dates 2>/dev/null)
    if [ $? -eq 0 ]; then
        echo "- 证书状态: ✅ 有效"
        echo "$cert_info" | sed 's/^/  /'
    else
        echo "- 证书状态: ❌ 无效或不存在"
    fi
else
    echo "- 证书状态: ⚠️ 无法检查 (openssl 未安装)"
fi
echo ""

# 检查磁盘空间
echo "💾 磁盘空间:"
df -h / | tail -1 | awk '{print "- 根分区: " $3 " 已用 / " $2 " 总计 (" $5 " 使用率)"}'
echo ""

# 检查内存使用
echo "🧠 内存使用:"
free -h | grep "Mem:" | awk '{print "- 内存: " $3 " 已用 / " $2 " 总计"}'
echo ""

# 检查最近的错误日志
echo "📝 最近的错误日志:"
if [ -f /var/log/nginx/error.log ]; then
    echo "- Nginx 错误 (最近5条):"
    tail -5 /var/log/nginx/error.log 2>/dev/null | sed 's/^/  /' || echo "  无错误日志"
else
    echo "- Nginx 错误日志: 文件不存在"
fi

if systemctl is-active --quiet sprb-backend; then
    echo "- 后端服务错误 (最近5条):"
    journalctl -u sprb-backend --no-pager -n 5 --since "1 hour ago" | grep -i error | sed 's/^/  /' || echo "  无错误日志"
else
    echo "- 后端服务: 未运行"
fi
echo ""

echo "=================================="
echo "监控完成 - $(date '+%Y-%m-%d %H:%M:%S')"