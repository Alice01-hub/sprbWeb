#!/usr/bin/env bash
set -euo pipefail

# SPRB 网站切换脚本
# 功能：在占位网站和正式网站之间切换

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "🔄 SPRB 网站切换工具"
echo "==================="

# 检查是否为 root 用户
if [[ $EUID -ne 0 ]]; then
   echo "❌ 此脚本需要 root 权限运行"
   echo "请使用: sudo $0"
   exit 1
fi

# 检查当前状态
if [ -L "/etc/nginx/sites-enabled/sprb-placeholder" ]; then
    CURRENT_SITE="placeholder"
    echo "📍 当前状态: 占位网站"
elif [ -L "/etc/nginx/sites-enabled/sprb.love" ]; then
    CURRENT_SITE="production"
    echo "📍 当前状态: 正式网站"
else
    CURRENT_SITE="none"
    echo "📍 当前状态: 无网站配置"
fi

echo ""
echo "请选择要切换到的网站:"
echo "1) 占位网站 (开发进度页面)"
echo "2) 正式网站 (完整功能)"
echo "3) 查看状态"
echo "4) 退出"
echo ""

read -p "请输入选择 (1-4): " choice

case $choice in
    1)
        echo ""
        echo "🔄 切换到占位网站..."
        
        # 停止后端服务
        systemctl stop sprb-backend 2>/dev/null || true
        
        # 切换 Nginx 配置
        rm -f /etc/nginx/sites-enabled/*
        
        if [ -f "/etc/nginx/sites-available/sprb-placeholder" ]; then
            ln -sf /etc/nginx/sites-available/sprb-placeholder /etc/nginx/sites-enabled/
        else
            echo "❌ 占位网站配置不存在，请先运行: sudo ./deploy-placeholder.sh"
            exit 1
        fi
        
        # 重载 Nginx
        nginx -t && systemctl reload nginx
        
        SERVER_IP=$(hostname -I | awk '{print $1}')
        echo "✅ 已切换到占位网站"
        echo "访问地址: http://$SERVER_IP"
        ;;
        
    2)
        echo ""
        echo "🔄 切换到正式网站..."
        
        # 切换 Nginx 配置
        rm -f /etc/nginx/sites-enabled/*
        
        if [ -f "/etc/nginx/sites-available/sprb.love" ]; then
            ln -sf /etc/nginx/sites-available/sprb.love /etc/nginx/sites-enabled/
        else
            echo "❌ 正式网站配置不存在，请先运行: sudo ./deploy-production.sh"
            exit 1
        fi
        
        # 启动后端服务
        systemctl start sprb-backend 2>/dev/null || true
        
        # 重载 Nginx
        nginx -t && systemctl reload nginx
        
        echo "✅ 已切换到正式网站"
        echo "访问地址: https://sprb.love (如果配置了域名)"
        echo "本地访问: http://localhost"
        ;;
        
    3)
        echo ""
        echo "📊 系统状态:"
        echo "- Nginx: $(systemctl is-active nginx)"
        echo "- 后端服务: $(systemctl is-active sprb-backend 2>/dev/null || echo 'inactive')"
        echo ""
        echo "📁 启用的站点:"
        ls -la /etc/nginx/sites-enabled/ 2>/dev/null || echo "无启用站点"
        echo ""
        echo "🌐 可用配置:"
        ls -la /etc/nginx/sites-available/ | grep -E "(sprb|default)" || echo "无相关配置"
        ;;
        
    4)
        echo "👋 退出"
        exit 0
        ;;
        
    *)
        echo "❌ 无效选择"
        exit 1
        ;;
esac

echo ""
echo "🔧 管理命令:"
echo "- 查看 Nginx 状态: systemctl status nginx"
echo "- 查看访问日志: tail -f /var/log/nginx/access.log"
echo "- 重新运行切换: sudo ./switch-site.sh"