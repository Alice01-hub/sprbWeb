#!/bin/bash

# ========== Nginx 管理脚本 ==========
# 功能：管理Nginx反向代理服务
# ===================================

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 显示使用方法
show_usage() {
    echo -e "${BLUE}Nginx 管理脚本${NC}"
    echo -e "${BLUE}===============${NC}"
    echo "使用方法: $0 {start|stop|restart|reload|status|test|ssl-status|ssl-renew}"
    echo ""
    echo "命令说明:"
    echo "  start      - 启动Nginx服务"
    echo "  stop       - 停止Nginx服务"
    echo "  restart    - 重启Nginx服务"
    echo "  reload     - 重新加载Nginx配置"
    echo "  status     - 查看Nginx状态"
    echo "  test       - 测试Nginx配置"
    echo "  ssl-status - 查看SSL证书状态"
    echo "  ssl-renew  - 手动续期SSL证书"
}

# 启动Nginx
start_nginx() {
    echo -e "${BLUE}🚀 启动Nginx服务...${NC}"
    systemctl start nginx
    systemctl enable nginx
    echo -e "${GREEN}✅ Nginx服务已启动${NC}"
}

# 停止Nginx
stop_nginx() {
    echo -e "${BLUE}🛑 停止Nginx服务...${NC}"
    systemctl stop nginx
    echo -e "${GREEN}✅ Nginx服务已停止${NC}"
}

# 重启Nginx
restart_nginx() {
    echo -e "${BLUE}🔄 重启Nginx服务...${NC}"
    systemctl restart nginx
    echo -e "${GREEN}✅ Nginx服务已重启${NC}"
}

# 重新加载配置
reload_nginx() {
    echo -e "${BLUE}🔄 重新加载Nginx配置...${NC}"
    nginx -t
    if [ $? -eq 0 ]; then
        systemctl reload nginx
        echo -e "${GREEN}✅ Nginx配置已重新加载${NC}"
    else
        echo -e "${RED}❌ Nginx配置测试失败，未重新加载${NC}"
        exit 1
    fi
}

# 查看状态
status_nginx() {
    echo -e "${BLUE}📋 Nginx服务状态:${NC}"
    systemctl status nginx --no-pager
    
    echo -e "\n${BLUE}📋 端口监听状态:${NC}"
    netstat -tlnp | grep ":80 " || echo "端口80未监听"
    netstat -tlnp | grep ":443 " || echo "端口443未监听"
    
    echo -e "\n${BLUE}📋 测试访问:${NC}"
    echo "HTTPS域名访问测试:"
    curl -I https://sprb.love 2>/dev/null | head -n 3 || echo "无法访问HTTPS域名服务"
    echo "HTTP重定向测试:"
    curl -I http://sprb.love 2>/dev/null | head -n 3 || echo "无法访问HTTP域名服务"
    echo "IP访问测试:"
    curl -I http://8.148.187.117 2>/dev/null | head -n 3 || echo "无法访问IP服务"
}

# 测试配置
test_nginx() {
    echo -e "${BLUE}🧪 测试Nginx配置...${NC}"
    nginx -t
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Nginx配置测试通过${NC}"
    else
        echo -e "${RED}❌ Nginx配置测试失败${NC}"
        exit 1
    fi
}

# 查看SSL证书状态
ssl_status() {
    echo -e "${BLUE}🔒 SSL证书状态:${NC}"
    certbot certificates
    
    echo -e "\n${BLUE}🔒 证书文件检查:${NC}"
    if [ -f "/etc/letsencrypt/live/sprb.love/fullchain.pem" ]; then
        echo -e "${GREEN}✅ 证书文件存在${NC}"
        echo "证书路径: /etc/letsencrypt/live/sprb.love/fullchain.pem"
        echo "私钥路径: /etc/letsencrypt/live/sprb.love/privkey.pem"
    else
        echo -e "${RED}❌ 证书文件不存在${NC}"
    fi
    
    echo -e "\n${BLUE}🔒 HTTPS测试:${NC}"
    curl -I https://sprb.love 2>/dev/null | head -n 1 || echo "HTTPS访问失败"
}

# 续期SSL证书
ssl_renew() {
    echo -e "${BLUE}🔄 续期SSL证书...${NC}"
    certbot renew
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ SSL证书续期成功${NC}"
        systemctl reload nginx
        echo -e "${GREEN}✅ Nginx配置已重新加载${NC}"
    else
        echo -e "${RED}❌ SSL证书续期失败${NC}"
        exit 1
    fi
}

# 主逻辑
case "$1" in
    start)
        start_nginx
        ;;
    stop)
        stop_nginx
        ;;
    restart)
        restart_nginx
        ;;
    reload)
        reload_nginx
        ;;
    status)
        status_nginx
        ;;
    test)
        test_nginx
        ;;
    ssl-status)
        ssl_status
        ;;
    ssl-renew)
        ssl_renew
        ;;
    *)
        show_usage
        exit 1
        ;;
esac

exit 0