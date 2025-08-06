#!/bin/bash

# ========== 域名配置检查脚本 ==========
# 功能：检查域名解析和服务器配置
# ====================================

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

DOMAIN="sprb.love"

echo -e "${BLUE}🔍 检查域名 ${DOMAIN} 的配置状态${NC}"
echo "=========================================="

# 1. 获取服务器公网IP
function get_server_ip() {
    echo -e "${BLUE}📡 获取服务器信息...${NC}"
    
    PUBLIC_IP=$(curl -s ifconfig.me 2>/dev/null || curl -s ipinfo.io/ip 2>/dev/null || echo "无法获取")
    LOCAL_IP=$(ip addr show eth0 2>/dev/null | grep "inet " | awk '{print $2}' | cut -d'/' -f1 || echo "无法获取")
    
    echo "服务器公网IP: $PUBLIC_IP"
    echo "服务器内网IP: $LOCAL_IP"
    echo ""
}

# 2. 检查域名DNS解析
function check_dns_resolution() {
    echo -e "${BLUE}🌐 检查DNS解析...${NC}"
    
    # 检查A记录
    DOMAIN_IP=$(dig +short ${DOMAIN} 2>/dev/null || nslookup ${DOMAIN} 2>/dev/null | grep "Address:" | tail -n1 | awk '{print $2}' || echo "解析失败")
    echo "域名 ${DOMAIN} 解析到: $DOMAIN_IP"
    
    # 检查www子域名
    WWW_IP=$(dig +short www.${DOMAIN} 2>/dev/null || echo "解析失败")
    echo "域名 www.${DOMAIN} 解析到: $WWW_IP"
    
    # 比较IP是否匹配
    if [ "$DOMAIN_IP" = "$PUBLIC_IP" ]; then
        echo -e "${GREEN}✅ 域名解析正确${NC}"
    else
        echo -e "${RED}❌ 域名解析不匹配服务器IP${NC}"
        echo -e "${YELLOW}⚠️ 请检查域名DNS设置，确保A记录指向: $PUBLIC_IP${NC}"
    fi
    echo ""
}

# 3. 检查端口开放状态
function check_ports() {
    echo -e "${BLUE}🔌 检查端口状态...${NC}"
    
    # 检查HTTP端口80
    if netstat -tln | grep -q ":80 "; then
        echo -e "${GREEN}✅ 端口80 (HTTP) 正在监听${NC}"
    else
        echo -e "${RED}❌ 端口80 (HTTP) 未监听${NC}"
    fi
    
    # 检查HTTPS端口443
    if netstat -tln | grep -q ":443 "; then
        echo -e "${GREEN}✅ 端口443 (HTTPS) 正在监听${NC}"
    else
        echo -e "${RED}❌ 端口443 (HTTPS) 未监听${NC}"
    fi
    
    # 检查进度页面端口3002
    if netstat -tln | grep -q ":3002 "; then
        echo -e "${GREEN}✅ 端口3002 (进度页面) 正在监听${NC}"
    else
        echo -e "${RED}❌ 端口3002 (进度页面) 未监听${NC}"
    fi
    echo ""
}

# 4. 检查Nginx状态
function check_nginx() {
    echo -e "${BLUE}⚙️ 检查Nginx状态...${NC}"
    
    if command -v nginx &> /dev/null; then
        echo -e "${GREEN}✅ Nginx 已安装${NC}"
        
        if systemctl is-active --quiet nginx; then
            echo -e "${GREEN}✅ Nginx 服务正在运行${NC}"
        else
            echo -e "${RED}❌ Nginx 服务未运行${NC}"
        fi
        
        # 检查配置文件
        if [ -f "/etc/nginx/sites-available/${DOMAIN}" ]; then
            echo -e "${GREEN}✅ Nginx 配置文件存在${NC}"
        else
            echo -e "${RED}❌ Nginx 配置文件不存在${NC}"
        fi
        
        # 测试配置
        if nginx -t &>/dev/null; then
            echo -e "${GREEN}✅ Nginx 配置语法正确${NC}"
        else
            echo -e "${RED}❌ Nginx 配置语法错误${NC}"
        fi
    else
        echo -e "${RED}❌ Nginx 未安装${NC}"
    fi
    echo ""
}

# 5. 检查SSL证书
function check_ssl() {
    echo -e "${BLUE}🔒 检查SSL证书...${NC}"
    
    if command -v certbot &> /dev/null; then
        echo -e "${GREEN}✅ Certbot 已安装${NC}"
        
        # 检查证书文件
        if [ -f "/etc/letsencrypt/live/${DOMAIN}/fullchain.pem" ]; then
            echo -e "${GREEN}✅ SSL证书文件存在${NC}"
            
            # 检查证书有效期
            CERT_EXPIRY=$(openssl x509 -enddate -noout -in /etc/letsencrypt/live/${DOMAIN}/fullchain.pem 2>/dev/null | cut -d= -f2 || echo "无法获取")
            echo "证书到期时间: $CERT_EXPIRY"
        else
            echo -e "${RED}❌ SSL证书文件不存在${NC}"
        fi
    else
        echo -e "${RED}❌ Certbot 未安装${NC}"
    fi
    echo ""
}

# 6. 测试网站访问
function test_website_access() {
    echo -e "${BLUE}🧪 测试网站访问...${NC}"
    
    # 测试HTTP访问（应该重定向到HTTPS）
    echo "测试HTTP访问..."
    HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://${DOMAIN} 2>/dev/null || echo "000")
    if [ "$HTTP_STATUS" = "301" ] || [ "$HTTP_STATUS" = "302" ]; then
        echo -e "${GREEN}✅ HTTP重定向正常 (状态码: $HTTP_STATUS)${NC}"
    elif [ "$HTTP_STATUS" = "200" ]; then
        echo -e "${YELLOW}⚠️ HTTP访问成功但未重定向到HTTPS (状态码: $HTTP_STATUS)${NC}"
    else
        echo -e "${RED}❌ HTTP访问失败 (状态码: $HTTP_STATUS)${NC}"
    fi
    
    # 测试HTTPS访问
    echo "测试HTTPS访问..."
    HTTPS_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://${DOMAIN} 2>/dev/null || echo "000")
    if [ "$HTTPS_STATUS" = "200" ]; then
        echo -e "${GREEN}✅ HTTPS访问正常 (状态码: $HTTPS_STATUS)${NC}"
    else
        echo -e "${RED}❌ HTTPS访问失败 (状态码: $HTTPS_STATUS)${NC}"
    fi
    
    # 测试本地进度页面服务
    echo "测试本地进度页面服务..."
    LOCAL_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3002 2>/dev/null || echo "000")
    if [ "$LOCAL_STATUS" = "200" ]; then
        echo -e "${GREEN}✅ 本地进度页面服务正常 (状态码: $LOCAL_STATUS)${NC}"
    else
        echo -e "${RED}❌ 本地进度页面服务异常 (状态码: $LOCAL_STATUS)${NC}"
    fi
    echo ""
}

# 7. 检查防火墙设置
function check_firewall() {
    echo -e "${BLUE}🛡️ 检查防火墙设置...${NC}"
    
    # 检查ufw
    if command -v ufw &> /dev/null; then
        UFW_STATUS=$(ufw status 2>/dev/null | head -n1 || echo "无法获取状态")
        echo "UFW状态: $UFW_STATUS"
    fi
    
    # 检查iptables
    if command -v iptables &> /dev/null; then
        IPTABLES_RULES=$(iptables -L INPUT 2>/dev/null | wc -l || echo "0")
        echo "iptables规则数量: $IPTABLES_RULES"
    fi
    
    echo -e "${YELLOW}⚠️ 请确保云服务器安全组已开放端口 80, 443, 3002${NC}"
    echo ""
}

# 8. 生成诊断报告
function generate_report() {
    echo -e "${BLUE}📋 诊断报告${NC}"
    echo "=========================================="
    
    # 检查关键服务状态
    NGINX_OK=$(systemctl is-active --quiet nginx && echo "✅" || echo "❌")
    CERT_OK=$([ -f "/etc/letsencrypt/live/${DOMAIN}/fullchain.pem" ] && echo "✅" || echo "❌")
    DNS_OK=$([ "$DOMAIN_IP" = "$PUBLIC_IP" ] && echo "✅" || echo "❌")
    PROGRESS_OK=$(netstat -tln | grep -q ":3002 " && echo "✅" || echo "❌")
    
    echo "Nginx服务: $NGINX_OK"
    echo "SSL证书: $CERT_OK"
    echo "DNS解析: $DNS_OK"
    echo "进度页面服务: $PROGRESS_OK"
    echo ""
    
    # 提供建议
    echo -e "${BLUE}💡 建议操作:${NC}"
    
    if [ "$DNS_OK" = "❌" ]; then
        echo "1. 配置域名DNS A记录指向: $PUBLIC_IP"
    fi
    
    if [ "$NGINX_OK" = "❌" ]; then
        echo "2. 安装并启动Nginx: sudo apt install nginx && sudo systemctl start nginx"
    fi
    
    if [ "$CERT_OK" = "❌" ]; then
        echo "3. 申请SSL证书: sudo certbot --nginx -d ${DOMAIN}"
    fi
    
    if [ "$PROGRESS_OK" = "❌" ]; then
        echo "4. 启动进度页面服务: ./quick-deploy-progress.sh"
    fi
    
    echo ""
    echo -e "${BLUE}🚀 完整部署命令:${NC}"
    echo "sudo ./deploy-progress-with-domain.sh"
}

# 主执行流程
main() {
    get_server_ip
    check_dns_resolution
    check_ports
    check_nginx
    check_ssl
    test_website_access
    check_firewall
    generate_report
}

# 执行主函数
main "$@"