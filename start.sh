#!/bin/bash

# ========== Summer Pockets 一键启动脚本 ==========
# 功能：
# 1. 强制关闭所有相关端口及端口转发
# 2. 激活 conda 虚拟环境
# 3. 启动主后端、主前端、后台管理API、后台管理前端
# ===============================================

set -e

# 1. 强制关闭所有相关端口及端口转发
function kill_ports() {
    echo "🛑 正在释放端口 3000, 3001, 8000, 8001..."
    for port in 3000 3001 8000 8001; do
        pids=$(lsof -ti :$port)
        if [ -n "$pids" ]; then
            echo "🔪 杀死占用 $port 的进程: $pids"
            kill -9 $pids || true
        fi
    done
    echo "✅ 端口已全部释放"
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

# 3. 启动主后端
function start_backend() {
    echo "🚀 启动主后端..."
    cd $(dirname "$0")/backend
    pip install --upgrade pip
    pip install -r requirements.txt || true
    nohup uvicorn app:app --host 0.0.0.0 --port 8000 --reload > ../backend.log 2>&1 &
    cd ..
    echo "✅ 主后端已启动 (8000)"
}

# 4. 启动主前端
function start_frontend() {
    echo "🚀 启动主前端..."
    cd $(dirname "$0")/frontend
    if [ ! -d "node_modules" ]; then
      npm install --silent || true
    fi
    nohup npm run dev -- --host 0.0.0.0 --port 3000 > ../frontend.log 2>&1 &
    cd ..
    echo "✅ 主前端已启动 (3000)"
}

# 5. 启动后台管理API
function start_admin_api() {
    echo "🚀 启动后台管理API..."
    cd $(dirname "$0")/admin/backend
    # 若有 requirements.txt 可加上 pip install -r requirements.txt
    nohup python admin_api.py > ../../admin_backend.log 2>&1 &
    cd ../..
    echo "✅ 后台管理API已启动 (8001)"
}

# 6. 启动后台管理前端
function start_admin_frontend() {
    echo "🚀 启动后台管理前端..."
    cd $(dirname "$0")/admin/frontend
    if [ ! -d "node_modules" ]; then
      npm install --silent || true
    fi
    nohup npm run dev -- --host 0.0.0.0 --port 3001 > ../../admin_frontend.log 2>&1 &
    cd ../..
    echo "✅ 后台管理前端已启动 (3001)"
}

# 主流程
kill_ports
activate_conda
start_backend
start_frontend
start_admin_api
start_admin_frontend

sleep 5

# 检查服务状态
function check_status() {
    echo -e "\n📋 服务状态检查："
    for port in 8000 8001 3000 3001; do
        if netstat -tln | grep -q ":$port "; then
            echo "✅ 端口 $port 正常监听"
        else
            echo "❌ 端口 $port 未监听"
        fi
    done
}
check_status

echo -e "\n🎉 所有服务已启动！"
echo "主前端: http://localhost:3000"
echo "主后端: http://localhost:8000"
echo "后台管理前端: http://localhost:3001"
echo "后台管理API: http://localhost:8001"
echo -e "\n日志查看: tail -f backend.log frontend.log admin_backend.log admin_frontend.log" 