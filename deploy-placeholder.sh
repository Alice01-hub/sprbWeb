#!/usr/bin/env bash
set -euo pipefail

# SPRB 占位网站部署脚本
# 功能：将 ProgressPage 作为占位网站部署到本机 IP

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PLACEHOLDER_DIR="$PROJECT_ROOT/placeholder-site"
DEPLOY_ROOT="/var/www/sprb-placeholder"
NGINX_CONF="/etc/nginx/sites-available/sprb-placeholder"

echo "🚀 开始部署 SPRB 占位网站到本机 IP"
echo "=================================="

# 检查是否为 root 用户
if [[ $EUID -ne 0 ]]; then
   echo "❌ 此脚本需要 root 权限运行"
   echo "请使用: sudo $0"
   exit 1
fi

# 获取本机 IP 地址
SERVER_IP=$(hostname -I | awk '{print $1}')
echo "📍 服务器 IP: $SERVER_IP"

echo "[1/5] 🛑 停止现有服务"
systemctl stop nginx || true
pkill -f "uvicorn.*app:app" || true
pkill -f "node.*vite" || true

echo "[2/5] 📦 安装系统依赖"
export DEBIAN_FRONTEND=noninteractive
apt-get update -y >/dev/null
apt-get install -y nginx curl >/dev/null

echo "[3/5] 🏗️ 创建占位网站"
mkdir -p "$PLACEHOLDER_DIR"

# 创建独立的 HTML 文件
cat > "$PLACEHOLDER_DIR/index.html" << 'EOF'
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SPRB 网站开发中</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            font-family: 'Arial', 'Microsoft YaHei', sans-serif;
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
            animation: fadeIn 1s ease-in-out;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
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
            transition: width 2s ease-in-out;
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

        .features {
            margin-top: 30px;
            text-align: left;
        }

        .features h3 {
            color: #ffffff;
            margin-bottom: 15px;
            text-align: center;
        }

        .features ul {
            list-style: none;
            padding: 0;
        }

        .features li {
            padding: 8px 0;
            color: #e0e0e0;
            position: relative;
            padding-left: 25px;
        }

        .features li::before {
            content: '✨';
            position: absolute;
            left: 0;
            top: 8px;
        }

        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid rgba(255, 255, 255, 0.2);
            color: #d0d0d0;
            font-size: 0.9rem;
        }

        @media (max-width: 768px) {
            .title {
                font-size: 2rem;
            }
            
            .subtitle {
                font-size: 1rem;
            }
            
            .container {
                padding: 30px 20px;
                margin: 10px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="title">🌅 Summer Pockets 巡礼网站</h1>
        <p class="subtitle">
            重回那个夏天，探索三岛的美好时光<br>
            网站正在开发中，敬请期待！
        </p>
        
        <div class="progress-container">
            <div class="progress-bar" id="progressBar"></div>
        </div>
        
        <div class="progress-text" id="progressText">0% 完成</div>
        
        <div class="status-text">
            我们正在努力开发这个特别的网站，为您带来完整的 Summer Pockets 圣地巡礼体验。
        </div>

        <div class="features">
            <h3>🎯 即将推出的功能</h3>
            <ul>
                <li>完整的三岛巡礼指南（女木岛、男木岛、直岛）</li>
                <li>交互式地图和航行动画</li>
                <li>Summer Pockets BGM 音乐播放器</li>
                <li>神域七影蝶系统</li>
                <li>用户打卡和分享功能</li>
                <li>详细的交通攻略和 PDF 下载</li>
            </ul>
        </div>

        <div class="footer">
            <p>Summer Pockets 圣地巡礼网站 v2.3</p>
            <p>开发进行中... 🚧</p>
        </div>
    </div>

    <script>
        // 动画效果
        window.addEventListener('load', function() {
            const progressBar = document.getElementById('progressBar');
            const progressText = document.getElementById('progressText');
            let progress = 0;
            const targetProgress = 65; // 目标进度

            const interval = setInterval(() => {
                if (progress < targetProgress) {
                    progress += 1;
                    progressBar.style.width = progress + '%';
                    progressText.textContent = progress + '% 完成';
                } else {
                    clearInterval(interval);
                }
            }, 30);
        });

        // 添加一些交互效果
        document.addEventListener('mousemove', function(e) {
            const container = document.querySelector('.container');
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
                const xPercent = (x / rect.width - 0.5) * 10;
                const yPercent = (y / rect.height - 0.5) * 10;
                container.style.transform = `perspective(1000px) rotateY(${xPercent}deg) rotateX(${-yPercent}deg)`;
            } else {
                container.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
            }
        });
    </script>
</body>
</html>
EOF

echo "[4/5] 📁 部署占位网站"
mkdir -p "$DEPLOY_ROOT"
cp "$PLACEHOLDER_DIR/index.html" "$DEPLOY_ROOT/"
chown -R www-data:www-data "$DEPLOY_ROOT"
chmod -R 755 "$DEPLOY_ROOT"

echo "[5/5] ⚙️ 配置 Nginx"
cat > "$NGINX_CONF" << EOF
# SPRB 占位网站配置
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;
    
    root $DEPLOY_ROOT;
    index index.html;
    
    # 基本配置
    location / {
        try_files \$uri \$uri/ /index.html;
    }
    
    # 静态资源缓存
    location ~* \.(css|js|png|jpg|jpeg|gif|webp|svg|ico|woff2?|ttf|eot)$ {
        expires 7d;
        access_log off;
        add_header Cache-Control "public, max-age=604800";
    }
    
    # 安全头
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    
    # Gzip 压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
EOF

# 移除默认站点并启用占位站点
rm -f /etc/nginx/sites-enabled/default
rm -f /etc/nginx/sites-enabled/sprb.love
ln -sf "$NGINX_CONF" /etc/nginx/sites-enabled/sprb-placeholder

# 测试 Nginx 配置
nginx -t
if [ $? -ne 0 ]; then
    echo "❌ Nginx 配置错误"
    exit 1
fi

# 启动 Nginx
systemctl enable nginx
systemctl start nginx

# 检查 Nginx 是否启动成功
if ! systemctl is-active --quiet nginx; then
    echo "❌ Nginx 启动失败"
    systemctl status nginx
    exit 1
fi

echo ""
echo "🎉 占位网站部署完成！"
echo "=================================="
echo "访问地址: http://$SERVER_IP"
echo "本地访问: http://localhost"
echo ""
echo "📊 服务状态:"
echo "- Nginx: $(systemctl is-active nginx)"
echo "- 网站文件: $DEPLOY_ROOT"
echo "- Nginx 配置: $NGINX_CONF"
echo ""
echo "🔧 管理命令:"
echo "- 重启 Nginx: systemctl restart nginx"
echo "- 查看日志: tail -f /var/log/nginx/access.log"
echo "- 编辑网站: nano $DEPLOY_ROOT/index.html"
echo ""
echo "📝 注意事项:"
echo "- 此配置会替换所有现有的 Nginx 站点"
echo "- 网站通过 HTTP 访问，未配置 HTTPS"
echo "- 如需恢复正式网站，请重新运行 deploy-production.sh"