#!/bin/bash

# ========== SPRB 进度页面域名部署脚本 ==========
# 功能：
# 1. 将 ProgressPage.tsx 转换为静态HTML
# 2. 配置 Nginx 反向代理
# 3. 申请 Let's Encrypt SSL 证书
# 4. 绑定域名 sprb.love
# ===============================================

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 配置变量
DOMAIN="sprb.love"
EMAIL="admin@sprb.love"  # 用于SSL证书申请
NGINX_CONFIG="/etc/nginx/sites-available/sprb.love"
NGINX_ENABLED="/etc/nginx/sites-enabled/sprb.love"
PROGRESS_PORT=3002

echo -e "${BLUE}🚀 开始部署 SPRB 进度页面到域名 ${DOMAIN}${NC}"

# 1. 检查系统环境
function check_environment() {
    echo -e "${BLUE}📋 检查系统环境...${NC}"
    
    # 检查是否为root用户
    if [ "$EUID" -ne 0 ]; then
        echo -e "${RED}❌ 请使用 root 用户运行此脚本${NC}"
        echo "使用命令: sudo $0"
        exit 1
    fi
    
    # 检查网络连接
    if ! ping -c 1 google.com &> /dev/null; then
        echo -e "${RED}❌ 网络连接失败，请检查网络设置${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ 系统环境检查通过${NC}"
}

# 2. 安装必要的软件包
function install_dependencies() {
    echo -e "${BLUE}📦 安装必要的软件包...${NC}"
    
    # 更新包管理器
    apt update
    
    # 安装 Nginx
    if ! command -v nginx &> /dev/null; then
        echo "安装 Nginx..."
        apt install -y nginx
    fi
    
    # 安装 Certbot
    if ! command -v certbot &> /dev/null; then
        echo "安装 Certbot..."
        apt install -y certbot python3-certbot-nginx
    fi
    
    # 安装其他工具
    apt install -y curl wget lsof net-tools
    
    echo -e "${GREEN}✅ 软件包安装完成${NC}"
}

# 3. 停止现有服务并释放端口
function cleanup_existing_services() {
    echo -e "${BLUE}🛑 清理现有服务...${NC}"
    
    # 停止可能占用端口的进程
    pids=$(lsof -ti :${PROGRESS_PORT} 2>/dev/null || true)
    if [ -n "$pids" ]; then
        echo "杀死占用端口 ${PROGRESS_PORT} 的进程: $pids"
        kill -9 $pids || true
        sleep 2
    fi
    
    # 停止 Nginx（如果正在运行）
    systemctl stop nginx 2>/dev/null || true
    
    echo -e "${GREEN}✅ 服务清理完成${NC}"
}

# 4. 更新进度页面内容
function update_progress_page() {
    echo -e "${BLUE}📝 更新进度页面内容...${NC}"
    
    # 确保 progress-site 目录存在
    mkdir -p $(dirname "$0")/progress-site
    
    # 创建更新的 HTML 页面（基于 ProgressPage.tsx 的设计）
    cat > $(dirname "$0")/progress-site/index.html << 'EOF'
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SPRB 网站开发进度</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Arial', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            padding: 20px;
        }

        .container {
            text-align: center;
            max-width: 600px;
            background: rgba(255, 255, 255, 0.1);
            padding: 40px;
            border-radius: 20px;
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }

        .title {
            font-size: 2.5rem;
            margin-bottom: 20px;
            color: #ffffff;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        .subtitle {
            font-size: 1.2rem;
            margin-bottom: 30px;
            color: #f0f0f0;
            line-height: 1.6;
        }

        .progress-container {
            width: 100%;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 25px;
            padding: 3px;
            margin: 20px 0;
            box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .progress-bar {
            height: 30px;
            background: linear-gradient(90deg, #4CAF50, #45a049);
            border-radius: 25px;
            width: 0%;
            transition: width 1s ease-in-out;
            position: relative;
            overflow: hidden;
        }

        .progress-bar::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
            animation: shimmer 2s infinite;
        }

        @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }

        .progress-text {
            font-size: 1.1rem;
            margin-top: 15px;
            color: #ffffff;
            font-weight: bold;
        }

        .status-text {
            font-size: 1rem;
            margin-top: 20px;
            color: #e0e0e0;
            line-height: 1.5;
        }

        .domain-info {
            margin-top: 30px;
            padding: 20px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 10px;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .domain-info h3 {
            color: #ffffff;
            margin-bottom: 10px;
        }

        .domain-info p {
            color: #e0e0e0;
            font-size: 0.9rem;
        }

        @media (max-width: 768px) {
            .container {
                margin: 20px;
                padding: 30px;
            }
            
            .title {
                font-size: 2rem;
            }
            
            .subtitle {
                font-size: 1rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="title">SPRB 网站开发进度</h1>
        <p class="subtitle">
            感谢您的关注！我们正在努力开发SPRB网站，为您提供更好的服务体验。
        </p>
        
        <div class="progress-container">
            <div class="progress-bar" id="progressBar"></div>
        </div>
        
        <div class="progress-text" id="progressText">0% 完成</div>
        
        <p class="status-text">
            目前我们正在开发核心功能模块，包括用户界面优化、后端服务集成等。
            <br />
            预计将在不久的将来完成全部开发工作，敬请期待！
        </p>

        <div class="domain-info">
            <h3>🌐 域名信息</h3>
            <p>当前域名: sprb.love</p>
            <p>SSL证书: Let's Encrypt (自动续期)</p>
            <p>部署时间: $(date '+%Y-%m-%d %H:%M:%S')</p>
        </div>
    </div>

    <script>
        // 进度条动画
        function animateProgress() {
            const progressBar = document.getElementById('progressBar');
            const progressText = document.getElementById('progressText');
            let progress = 0;
            const targetProgress = 50;
            
            const interval = setInterval(() => {
                progress += 1;
                progressBar.style.width = progress + '%';
                progressText.textContent = progress + '% 完成';
                
                if (progress >= targetProgress) {
                    clearInterval(interval);
                }
            }, 50);
        }
        
        // 页面加载完成后开始动画
        window.addEventListener('load', () => {
            setTimeout(animateProgress, 500);
        });
    </script>
</body>
</html>
EOF
    
    echo -e "${GREEN}✅ 进度页面内容已更新${NC}"
}

# 5. 启动进度页面服务
function start_progress_service() {
    echo -e "${BLUE}🚀 启动进度页面服务...${NC}"
    
    cd $(dirname "$0")/progress-site
    
    # 确保 Python 脚本有执行权限
    chmod +x server.py
    
    # 启动服务器
    nohup python3 server.py > ../progress-domain.log 2>&1 &
    
    cd ..
    
    # 等待服务启动
    sleep 3
    
    # 检查服务状态
    if netstat -tln | grep -q ":${PROGRESS_PORT} "; then
        echo -e "${GREEN}✅ 进度页面服务已启动 (端口 ${PROGRESS_PORT})${NC}"
    else
        echo -e "${RED}❌ 进度页面服务启动失败${NC}"
        exit 1
    fi
}

# 6. 配置 Nginx
function configure_nginx() {
    echo -e "${BLUE}⚙️ 配置 Nginx...${NC}"
    
    # 创建 Nginx 配置文件
    cat > ${NGINX_CONFIG} << EOF
server {
    listen 80;
    server_name ${DOMAIN} www.${DOMAIN};
    
    # 临时允许访问，用于 SSL 证书验证
    location /.well-known/acme-challenge/ {
        root /var/www/html;
    }
    
    # 其他请求重定向到 HTTPS
    location / {
        return 301 https://\$server_name\$request_uri;
    }
}

server {
    listen 443 ssl http2;
    server_name ${DOMAIN} www.${DOMAIN};
    
    # SSL 配置（证书路径将在获取证书后自动更新）
    ssl_certificate /etc/letsencrypt/live/${DOMAIN}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/${DOMAIN}/privkey.pem;
    
    # SSL 安全配置
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    
    # 安全头
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options DENY always;
    add_header X-Content-Type-Options nosniff always;
    add_header X-XSS-Protection "1; mode=block" always;
    
    # 反向代理到进度页面服务
    location / {
        proxy_pass http://127.0.0.1:${PROGRESS_PORT};
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        
        # 缓存配置
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
    }
    
    # 静态文件缓存
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
        proxy_pass http://127.0.0.1:${PROGRESS_PORT};
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF
    
    # 启用站点
    ln -sf ${NGINX_CONFIG} ${NGINX_ENABLED}
    
    # 测试 Nginx 配置
    nginx -t
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Nginx 配置测试失败${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ Nginx 配置完成${NC}"
}

# 7. 申请 SSL 证书
function obtain_ssl_certificate() {
    echo -e "${BLUE}🔒 申请 SSL 证书...${NC}"
    
    # 启动 Nginx（用于证书验证）
    systemctl start nginx
    systemctl enable nginx
    
    # 创建 webroot 目录
    mkdir -p /var/www/html
    
    # 申请证书
    certbot certonly \
        --webroot \
        --webroot-path=/var/www/html \
        --email ${EMAIL} \
        --agree-tos \
        --no-eff-email \
        --domains ${DOMAIN},www.${DOMAIN}
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ SSL 证书申请成功${NC}"
        
        # 设置自动续期
        (crontab -l 2>/dev/null; echo "0 12 * * * /usr/bin/certbot renew --quiet") | crontab -
        
        echo -e "${GREEN}✅ SSL 证书自动续期已配置${NC}"
    else
        echo -e "${RED}❌ SSL 证书申请失败${NC}"
        echo -e "${YELLOW}⚠️ 请检查域名 DNS 解析是否正确指向此服务器${NC}"
        exit 1
    fi
}

# 8. 重启服务
function restart_services() {
    echo -e "${BLUE}🔄 重启服务...${NC}"
    
    # 重新加载 Nginx 配置
    systemctl reload nginx
    
    # 检查服务状态
    if systemctl is-active --quiet nginx; then
        echo -e "${GREEN}✅ Nginx 服务运行正常${NC}"
    else
        echo -e "${RED}❌ Nginx 服务启动失败${NC}"
        systemctl status nginx
        exit 1
    fi
}

# 9. 验证部署
function verify_deployment() {
    echo -e "${BLUE}🧪 验证部署...${NC}"
    
    # 等待服务完全启动
    sleep 5
    
    # 测试 HTTP 重定向
    echo "测试 HTTP 重定向..."
    http_status=$(curl -s -o /dev/null -w "%{http_code}" http://${DOMAIN} || echo "000")
    if [ "$http_status" = "301" ] || [ "$http_status" = "302" ]; then
        echo -e "${GREEN}✅ HTTP 重定向正常${NC}"
    else
        echo -e "${YELLOW}⚠️ HTTP 重定向状态码: $http_status${NC}"
    fi
    
    # 测试 HTTPS 访问
    echo "测试 HTTPS 访问..."
    https_status=$(curl -s -o /dev/null -w "%{http_code}" https://${DOMAIN} || echo "000")
    if [ "$https_status" = "200" ]; then
        echo -e "${GREEN}✅ HTTPS 访问正常${NC}"
    else
        echo -e "${YELLOW}⚠️ HTTPS 访问状态码: $https_status${NC}"
    fi
    
    # 测试本地服务
    echo "测试本地进度页面服务..."
    local_status=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:${PROGRESS_PORT} || echo "000")
    if [ "$local_status" = "200" ]; then
        echo -e "${GREEN}✅ 本地进度页面服务正常${NC}"
    else
        echo -e "${RED}❌ 本地进度页面服务异常，状态码: $local_status${NC}"
    fi
}

# 10. 显示部署结果
function show_deployment_result() {
    echo -e "\n${GREEN}🎉 SPRB 进度页面部署完成！${NC}"
    echo "=========================================="
    echo -e "${BLUE}🌐 访问地址:${NC}"
    echo "   https://${DOMAIN}"
    echo "   https://www.${DOMAIN}"
    echo ""
    echo -e "${BLUE}🔒 SSL 证书:${NC}"
    echo "   提供商: Let's Encrypt"
    echo "   自动续期: 已配置"
    echo ""
    echo -e "${BLUE}📋 服务状态:${NC}"
    echo "   进度页面服务: 端口 ${PROGRESS_PORT}"
    echo "   Nginx 反向代理: 端口 80/443"
    echo ""
    echo -e "${BLUE}📝 日志文件:${NC}"
    echo "   进度页面: progress-domain.log"
    echo "   Nginx: /var/log/nginx/access.log"
    echo "   SSL: /var/log/letsencrypt/letsencrypt.log"
    echo ""
    echo -e "${BLUE}🛠️ 管理命令:${NC}"
    echo "   查看服务状态: ./nginx-manage.sh status"
    echo "   重启 Nginx: ./nginx-manage.sh restart"
    echo "   续期证书: ./nginx-manage.sh ssl-renew"
    echo "   停止进度页面: ./stop-progress-standalone.sh"
    echo ""
    echo -e "${YELLOW}📌 注意事项:${NC}"
    echo "   - 确保域名 DNS 解析正确指向此服务器"
    echo "   - SSL 证书将自动续期"
    echo "   - 如有问题，请检查相关日志文件"
}

# 主执行流程
main() {
    check_environment
    install_dependencies
    cleanup_existing_services
    update_progress_page
    start_progress_service
    configure_nginx
    obtain_ssl_certificate
    restart_services
    verify_deployment
    show_deployment_result
}

# 执行主函数
main "$@"