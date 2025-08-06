#!/bin/bash

# ========== SPRB 占位网站公网部署脚本 ==========
# 功能：
# 1. 检查并启动占位网站服务
# 2. 确保服务监听所有接口
# 3. 显示公网访问信息
# ===============================================

set -e

# 获取公网IP
PUBLIC_IP=$(curl -s ifconfig.me)
LOCAL_IP=$(ip addr show eth0 | grep "inet " | awk '{print $2}' | cut -d'/' -f1)

echo "🌐 公网IP: $PUBLIC_IP"
echo "🏠 内网IP: $LOCAL_IP"

# 1. 停止可能占用3002端口的进程
function kill_existing_processes() {
    echo "🛑 检查并释放3002端口..."
    pids=$(lsof -ti :3002 2>/dev/null || true)
    if [ -n "$pids" ]; then
        echo "🔪 杀死占用 3002 的进程: $pids"
        kill -9 $pids || true
        sleep 2
    fi
    echo "✅ 端口3002已释放"
}

# 2. 启动占位网站服务器
function start_progress_server() {
    echo "🚀 启动占位网站服务器..."
    cd $(dirname "$0")/progress-site
    
    # 确保Python脚本有执行权限
    chmod +x server.py
    
    # 启动服务器（监听所有接口）
    nohup python3 server.py > ../progress-public.log 2>&1 &
    
    cd ..
    echo "✅ 占位网站服务器已启动"
}

# 3. 检查服务状态
function check_service_status() {
    echo "📋 检查服务状态..."
    sleep 3
    
    if netstat -tln | grep -q ":3002 "; then
        echo "✅ 端口 3002 正常监听"
    else
        echo "❌ 端口 3002 未监听"
        return 1
    fi
    
    # 测试本地访问
    if curl -s http://localhost:3002 > /dev/null 2>&1; then
        echo "✅ 本地访问正常"
    else
        echo "❌ 本地访问失败"
        return 1
    fi
}

# 4. 显示访问信息
function show_access_info() {
    echo -e "\n🎉 占位网站已成功部署到公网！"
    echo "=========================================="
    echo "🌐 公网访问地址:"
    echo "   http://$PUBLIC_IP:3002"
    echo ""
    echo "🏠 内网访问地址:"
    echo "   http://$LOCAL_IP:3002"
    echo "   http://localhost:3002"
    echo ""
    echo "📝 注意事项:"
    echo "   - 确保云服务器安全组已开放3002端口"
    echo "   - 如果无法访问，请检查防火墙设置"
    echo "   - 日志文件: progress-public.log"
    echo ""
    echo "🛑 停止服务: ./stop-progress-standalone.sh"
}

# 主流程
kill_existing_processes
start_progress_server
check_service_status

if [ $? -eq 0 ]; then
    show_access_info
else
    echo "❌ 服务启动失败，请检查日志文件"
    exit 1
fi 