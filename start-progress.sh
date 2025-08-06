#!/bin/bash

# ========== SPRB 进度页面启动脚本 ==========
# 功能：
# 1. 强制关闭3002端口
# 2. 激活 conda 虚拟环境
# 3. 启动进度页面前端服务
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

# 2. 激活 conda 虚拟环境
function activate_conda() {
    echo "📋 检查并激活conda环境..."
    if ! conda env list | grep -q "sprb-web"; then
        echo "🔧 创建sprb-web conda环境..."
        conda create -n sprb-web python=3.9 -y
    fi
    source $(conda info --base)/etc/profile.d/conda.sh
    conda activate sprb-web
    echo "✅ conda环境已激活"
}

# 3. 启动进度页面前端
function start_progress_frontend() {
    echo "🚀 启动进度页面前端..."
    cd $(dirname "$0")/frontend
    if [ ! -d "node_modules" ]; then
      npm install --silent || true
    fi
    nohup npm run dev:progress > ../progress-frontend.log 2>&1 &
    cd ..
    echo "✅ 进度页面前端已启动 (3002)"
}

# 主流程
kill_progress_port
activate_conda
start_progress_frontend

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

echo -e "\n🎉 进度页面已启动！"
echo "进度页面: http://localhost:3002"
echo "进度页面: http://localhost:3002/progress"
echo -e "\n日志查看: tail -f progress-frontend.log" 