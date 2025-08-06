#!/bin/bash

# ========== SPRB 独立进度页面停止脚本 ==========
# 功能：停止独立进度页面服务器
# ===============================================

set -e

echo "🛑 正在停止SPRB独立进度页面服务器..."

# 查找并杀死相关进程
pids=$(lsof -ti :3002 2>/dev/null || true)
if [ -n "$pids" ]; then
    echo "🔪 杀死占用 3002 的进程: $pids"
    kill -9 $pids || true
    echo "✅ 进程已停止"
else
    echo "ℹ️  没有找到运行在3002端口的进程"
fi

# 检查端口状态
sleep 2
if netstat -tln | grep -q ":3002 "; then
    echo "❌ 端口 3002 仍在监听"
else
    echo "✅ 端口 3002 已释放"
fi

echo "🎉 独立进度页面服务器已停止" 