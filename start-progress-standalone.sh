#!/bin/bash

# ========== SPRB 独立进度页面启动脚本 ==========
# 功能：
# 1. 强制关闭3002端口
# 2. 启动独立的进度页面服务器
# ===============================================

set -e

# 1. 强制关闭3002端口
function kill_progress_port() {
    echo "🛑 正在释放端口 3002..."
    pids=$(lsof -ti :3002 2>/dev/null || true)
    if [ -n "$pids" ]; then
        echo "🔪 杀死占用 3002 的进程: $pids"
        kill -9 $pids || true
    fi
    echo "✅ 端口3002已释放"
}

# 2. 启动独立进度页面服务器
function start_progress_server() {
    echo "🚀 启动独立进度页面服务器..."
    cd $(dirname "$0")/progress-site
    
    # 确保Python脚本有执行权限
    chmod +x server.py
    
    # 启动服务器
    nohup python3 server.py > ../progress-standalone.log 2>&1 &
    
    cd ..
    echo "✅ 独立进度页面服务器已启动 (3002)"
}

# 主流程
kill_progress_port
start_progress_server

sleep 3

# 检查服务状态
function check_status() {
    echo -e "\n📋 服务状态检查："
    if netstat -tln | grep -q ":3002 "; then
        echo "✅ 端口 3002 正常监听"
    else
        echo "❌ 端口 3002 未监听"
    fi
}
check_status

echo -e "\n🎉 独立进度页面已启动！"
echo "🌐 访问地址: http://localhost:3002"
echo "🌐 访问地址: http://0.0.0.0:3002"
echo -e "\n📝 这是一个完全独立的进度页面，与主网站无任何关联"
echo -e "\n日志查看: tail -f progress-standalone.log" 