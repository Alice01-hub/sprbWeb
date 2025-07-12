#!/bin/bash

# Summer Pockets 巡礼网站停止脚本
echo "🛑 停止 Summer Pockets 巡礼网站服务..."

# 1. 根据PID文件停止服务
if [ -f "logs/backend.pid" ]; then
    BACKEND_PID=$(cat logs/backend.pid)
    if kill -0 $BACKEND_PID 2>/dev/null; then
        echo "🔄 停止后端服务 (PID: $BACKEND_PID)..."
        kill $BACKEND_PID
        sleep 2
        # 强制终止如果还在运行
        kill -9 $BACKEND_PID 2>/dev/null || true
        echo "✅ 后端服务已停止"
    else
        echo "⚠️  后端服务进程不存在"
    fi
    rm -f logs/backend.pid
fi

if [ -f "logs/frontend.pid" ]; then
    FRONTEND_PID=$(cat logs/frontend.pid)
    if kill -0 $FRONTEND_PID 2>/dev/null; then
        echo "🔄 停止前端服务 (PID: $FRONTEND_PID)..."
        kill $FRONTEND_PID
        sleep 2
        # 强制终止如果还在运行
        kill -9 $FRONTEND_PID 2>/dev/null || true
        echo "✅ 前端服务已停止"
    else
        echo "⚠️  前端服务进程不存在"
    fi
    rm -f logs/frontend.pid
fi

# 2. 强制清理端口
echo "🔄 清理端口..."
fuser -k 3000/tcp 2>/dev/null || true
fuser -k 8000/tcp 2>/dev/null || true

# 3. 清理项目相关进程
pkill -f "sprb-web" 2>/dev/null || true
pkill -f "uvicorn.*app:app" 2>/dev/null || true
pkill -f "vite.*3000" 2>/dev/null || true

echo "✅ 所有服务已停止"
echo "🌟 感谢使用 Summer Pockets 巡礼网站！" 