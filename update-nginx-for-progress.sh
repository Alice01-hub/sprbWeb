#!/bin/bash

# ========== 更新Nginx配置为进度页面 ==========
# 功能：将现有Nginx配置修改为指向进度页面服务
# ===============================================

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

DOMAIN="sprb.love"
PROGRESS_PORT=3002
NGINX_CONFIG="/etc/nginx/sites-available/sprbweb"
BACKUP_CONFIG="/etc/nginx/sites-available/sprbweb.backup.$(date +%Y%m%d_%H%M%S)"

echo -e "${BLUE}🔧 更新Nginx配置为进度页面${NC}"

# 检查权限
if [ "$EUID" -ne 0 ]; then
    echo -e "${RED}❌ 请使用 root 用户运行此脚本${NC}"
    echo "使用命令: sudo $0"
    exit 1
fi

# 1. 备份现有配置
function backup_config() {
    echo -e "${BLUE}💾 备份现有配置...${NC}"
    
    if [ -f "$NGINX_CONFIG" ]; then
        cp "$NGINX_CONFIG" "$BACKUP_CONFIG"
        echo -e "${GREEN}✅ 配置已备份到: $BACKUP_CONFIG${NC}"
    else
        echo -e "${YELLOW}⚠️ 现有配置文件不存在${NC}"
    fi
}

# 2. 检查进度页面服务
function check_progress_service() {
    echo -e "${BLUE}🔍 检查进度页面服务...${NC}"
    
    if netstat -tln | grep -q ":${PROGRESS_PORT} "; then
        echo -e "${GREEN}✅ 进度页面服务正在运行 (端口 ${PROGRESS_PORT})${NC}"
    else
        echo -e "${RED}❌ 进度页面服务未运行${NC}"
        echo -e "${YELLOW}⚠️ 正在启动进度页面服务...${NC}"
        
        # 启动进度页面服务
        cd $(dirname "$0")
        ./quick-deploy-progress.sh
        
        # 再次检查
        sleep 3
        if netstat -tln | grep -q ":${PROGRESS_PORT} "; then
            echo -e "${GREEN}✅ 进度页面服务已启动${NC}"
        else
            echo -e "${RED}❌ 无法启动进度页面服务${NC}"
            exit 1
        fi
    fi
}

# 3. 创建新的Nginx配置
function create_new_config() {
    echo -e "${BLUE}📝 创建新的Nginx配置...${NC}"
    
    cat > ${NGINX_CONFIG} << EOF
# SPRB 进度页面配置
server {
    listen 80;
    server_name ${DOMAIN} www.${DOMAIN};
    
    # HTTP重定向到HTTPS
    return 301 https://\$server_name\$request_uri;
}

server {
    listen 443 ssl http2;
    server_name ${DOMAIN} www.${DOMAIN};
    
    # SSL证书配置 (由Certbot管理)
    ssl_certificate /etc/letsencrypt/live/${DOMAIN}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/${DOMAIN}/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
    
    # 安全头部
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options DENY always;
    add_header X-Content-Type-Options nosniff always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    
    # 主要位置 - 进度页面
    location / {
        proxy_pass http://127.0.0.1:${PROGRESS_PORT};
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_cache_bypass \$http_upgrade;
        
        # 超时设置
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
    
    # 静态文件缓存
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        proxy_pass http://127.0.0.1:${PROGRESS_PORT};
        expires 1y;
        add_header Cache-Control "public, immutable";
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
    
    # 健康检查
    location /health {
        proxy_pass http://127.0.0.1:${PROGRESS_PORT};
        access_log off;
    }
    
    # 错误页面
    error_page 404 /404.html;
    error_page 500 502 503 504 /50x.html;
    
    # 日志配置
    access_log /var/log/nginx/${DOMAIN}_access.log;
    error_log /var/log/nginx/${DOMAIN}_error.log;
}

# 备用配置 - 如果需要恢复完整网站，可以取消注释以下部分
# server {
#     listen 443 ssl http2;
#     server_name ${DOMAIN} www.${DOMAIN};
#     
#     # SSL配置...
#     
#     # 主前端
#     location / {
#         proxy_pass http://127.0.0.1:3000;
#         # ... 其他配置
#     }
#     
#     # API路由
#     location /api/ {
#         proxy_pass http://127.0.0.1:8000;
#         # ... 其他配置
#     }
#     
#     # 管理后台
#     location /admin/ {
#         proxy_pass http://127.0.0.1:3001/;
#         # ... 其他配置
#     }
# }
EOF
    
    echo -e "${GREEN}✅ 新的Nginx配置已创建${NC}"
}

# 4. 测试配置
function test_config() {
    echo -e "${BLUE}🧪 测试Nginx配置...${NC}"
    
    if nginx -t; then
        echo -e "${GREEN}✅ Nginx配置测试通过${NC}"
    else
        echo -e "${RED}❌ Nginx配置测试失败${NC}"
        echo -e "${YELLOW}⚠️ 正在恢复备份配置...${NC}"
        
        if [ -f "$BACKUP_CONFIG" ]; then
            cp "$BACKUP_CONFIG" "$NGINX_CONFIG"
            echo -e "${GREEN}✅ 配置已恢复${NC}"
        fi
        exit 1
    fi
}

# 5. 重新加载Nginx
function reload_nginx() {
    echo -e "${BLUE}🔄 重新加载Nginx...${NC}"
    
    systemctl reload nginx
    
    if systemctl is-active --quiet nginx; then
        echo -e "${GREEN}✅ Nginx重新加载成功${NC}"
    else
        echo -e "${RED}❌ Nginx重新加载失败${NC}"
        systemctl status nginx
        exit 1
    fi
}

# 6. 验证更新
function verify_update() {
    echo -e "${BLUE}🔍 验证更新...${NC}"
    
    # 等待服务稳定
    sleep 5
    
    # 测试HTTPS访问
    echo "测试HTTPS访问..."
    https_status=$(curl -s -o /dev/null -w "%{http_code}" https://${DOMAIN} || echo "000")
    if [ "$https_status" = "200" ]; then
        echo -e "${GREEN}✅ HTTPS访问正常 (状态码: $https_status)${NC}"
    else
        echo -e "${RED}❌ HTTPS访问失败 (状态码: $https_status)${NC}"
    fi
    
    # 测试HTTP重定向
    echo "测试HTTP重定向..."
    http_status=$(curl -s -o /dev/null -w "%{http_code}" http://${DOMAIN} || echo "000")
    if [ "$http_status" = "301" ] || [ "$http_status" = "302" ]; then
        echo -e "${GREEN}✅ HTTP重定向正常 (状态码: $http_status)${NC}"
    else
        echo -e "${YELLOW}⚠️ HTTP重定向状态码: $http_status${NC}"
    fi
}

# 7. 显示结果
function show_result() {
    echo -e "\n${GREEN}🎉 Nginx配置更新完成！${NC}"
    echo "=========================================="
    echo -e "${BLUE}🌐 访问地址:${NC}"
    echo "   https://${DOMAIN}"
    echo "   https://www.${DOMAIN}"
    echo ""
    echo -e "${BLUE}📋 配置信息:${NC}"
    echo "   当前配置: $NGINX_CONFIG"
    echo "   备份配置: $BACKUP_CONFIG"
    echo "   进度页面端口: $PROGRESS_PORT"
    echo ""
    echo -e "${BLUE}🛠️ 管理命令:${NC}"
    echo "   查看Nginx状态: systemctl status nginx"
    echo "   查看访问日志: tail -f /var/log/nginx/${DOMAIN}_access.log"
    echo "   查看错误日志: tail -f /var/log/nginx/${DOMAIN}_error.log"
    echo "   恢复备份配置: cp $BACKUP_CONFIG $NGINX_CONFIG && systemctl reload nginx"
    echo ""
    echo -e "${YELLOW}📌 注意:${NC}"
    echo "   - 如需恢复完整网站，请启动相应服务后恢复备份配置"
    echo "   - 进度页面服务需要保持运行状态"
}

# 主执行流程
main() {
    backup_config
    check_progress_service
    create_new_config
    test_config
    reload_nginx
    verify_update
    show_result
}

# 执行主函数
main "$@"