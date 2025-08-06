#!/bin/bash

# ========== SPRB 进度页面快速部署脚本 ==========
# 功能：快速更新和部署进度页面到已配置的域名
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

echo -e "${BLUE}🚀 快速部署 SPRB 进度页面${NC}"

# 1. 停止现有进度页面服务
function stop_existing_service() {
    echo -e "${BLUE}🛑 停止现有服务...${NC}"
    pids=$(lsof -ti :${PROGRESS_PORT} 2>/dev/null || true)
    if [ -n "$pids" ]; then
        echo "停止占用端口 ${PROGRESS_PORT} 的进程: $pids"
        kill -9 $pids || true
        sleep 2
    fi
    echo -e "${GREEN}✅ 现有服务已停止${NC}"
}

# 2. 更新进度页面内容（基于 ProgressPage.tsx）
function update_progress_content() {
    echo -e "${BLUE}📝 更新进度页面内容...${NC}"
    
    # 确保目录存在
    mkdir -p $(dirname "$0")/progress-site
    
    # 创建基于 ProgressPage.tsx 设计的 HTML
    cat > $(dirname "$0")/progress-site/index.html << 'EOF'
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SPRB 网站开发进度</title>
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌊</text></svg>">
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
            flex-direction: column;
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

        .info-section {
            margin-top: 30px;
            padding: 20px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 15px;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .info-section h3 {
            color: #ffffff;
            margin-bottom: 10px;
            font-size: 1.1rem;
        }

        .info-section p {
            color: #e0e0e0;
            font-size: 0.9rem;
            margin-bottom: 5px;
        }

        .deployment-time {
            margin-top: 20px;
            font-size: 0.8rem;
            color: #cccccc;
            opacity: 0.8;
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

        /* 加载动画 */
        .loading {
            opacity: 0;
            animation: fadeIn 0.5s ease-in-out forwards;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    </style>
</head>
<body>
    <div class="container loading">
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

        <div class="info-section">
            <h3>🌐 域名信息</h3>
            <p>域名: sprb.love</p>
            <p>SSL证书: Let's Encrypt (自动续期)</p>
            <p>服务状态: 正常运行</p>
        </div>

        <div class="deployment-time">
            最后更新: <span id="deployTime"></span>
        </div>
    </div>

    <script>
        // 设置部署时间
        document.getElementById('deployTime').textContent = new Date().toLocaleString('zh-CN');

        // 进度条动画
        function animateProgress() {
            const progressBar = document.getElementById('progressBar');
            const progressText = document.getElementById('progressText');
            let progress = 0;
            const targetProgress = 50; // 当前开发进度50%
            
            const interval = setInterval(() => {
                progress += 1;
                progressBar.style.width = progress + '%';
                progressText.textContent = progress + '% 完成';
                
                if (progress >= targetProgress) {
                    clearInterval(interval);
                }
            }, 30);
        }
        
        // 页面加载完成后开始动画
        window.addEventListener('load', () => {
            setTimeout(animateProgress, 800);
        });

        // 添加一些交互效果
        document.addEventListener('DOMContentLoaded', () => {
            const container = document.querySelector('.container');
            container.addEventListener('mouseenter', () => {
                container.style.transform = 'scale(1.02)';
                container.style.transition = 'transform 0.3s ease';
            });
            
            container.addEventListener('mouseleave', () => {
                container.style.transform = 'scale(1)';
            });
        });
    </script>
</body>
</html>
EOF
    
    echo -e "${GREEN}✅ 进度页面内容已更新${NC}"
}

# 3. 启动进度页面服务
function start_progress_service() {
    echo -e "${BLUE}🚀 启动进度页面服务...${NC}"
    
    cd $(dirname "$0")/progress-site
    
    # 启动服务器
    nohup python3 server.py > ../progress-quick.log 2>&1 &
    
    cd ..
    
    # 等待服务启动
    sleep 3
    
    # 检查服务状态
    if netstat -tln | grep -q ":${PROGRESS_PORT} "; then
        echo -e "${GREEN}✅ 进度页面服务已启动 (端口 ${PROGRESS_PORT})${NC}"
    else
        echo -e "${RED}❌ 进度页面服务启动失败${NC}"
        echo "查看日志: tail -f progress-quick.log"
        exit 1
    fi
}

# 4. 测试服务
function test_service() {
    echo -e "${BLUE}🧪 测试服务...${NC}"
    
    # 测试本地访问
    local_status=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:${PROGRESS_PORT} || echo "000")
    if [ "$local_status" = "200" ]; then
        echo -e "${GREEN}✅ 本地服务测试通过${NC}"
    else
        echo -e "${RED}❌ 本地服务测试失败，状态码: $local_status${NC}"
    fi
    
    # 测试域名访问（如果已配置）
    if command -v nginx &> /dev/null && systemctl is-active --quiet nginx; then
        echo "测试域名访问..."
        domain_status=$(curl -s -o /dev/null -w "%{http_code}" https://${DOMAIN} || echo "000")
        if [ "$domain_status" = "200" ]; then
            echo -e "${GREEN}✅ 域名访问测试通过${NC}"
        else
            echo -e "${YELLOW}⚠️ 域名访问状态码: $domain_status${NC}"
        fi
    fi
}

# 5. 显示结果
function show_result() {
    echo -e "\n${GREEN}🎉 SPRB 进度页面快速部署完成！${NC}"
    echo "=========================================="
    echo -e "${BLUE}🌐 访问地址:${NC}"
    echo "   本地: http://localhost:${PROGRESS_PORT}"
    
    if command -v nginx &> /dev/null && systemctl is-active --quiet nginx; then
        echo "   域名: https://${DOMAIN}"
    fi
    
    echo ""
    echo -e "${BLUE}📝 日志文件:${NC}"
    echo "   progress-quick.log"
    echo ""
    echo -e "${BLUE}🛠️ 管理命令:${NC}"
    echo "   查看日志: tail -f progress-quick.log"
    echo "   停止服务: ./stop-progress-standalone.sh"
    echo "   重新部署: $0"
}

# 主执行流程
main() {
    stop_existing_service
    update_progress_content
    start_progress_service
    test_service
    show_result
}

# 执行主函数
main "$@"