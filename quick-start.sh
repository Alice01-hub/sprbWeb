#!/bin/bash

echo "🌟 启动 Summer Pockets 巡礼网站..."

# 强制清理端口
echo "🔥 清理端口..."
pkill -f "uvicorn" 2>/dev/null || true
pkill -f "vite" 2>/dev/null || true
pkill -f "npm.*dev" 2>/dev/null || true
sleep 2

# 启动后端
echo "🚀 启动后端服务..."
cd backend
nohup python3 -m uvicorn app_simple:app --host 0.0.0.0 --port 8000 > ../logs/backend.log 2>&1 &
BACKEND_PID=$!
echo "后端服务已启动，PID: $BACKEND_PID"

# 启动前端
echo "🚀 启动前端服务..."
cd ../frontend
nohup npm run dev > ../logs/frontend.log 2>&1 &
FRONTEND_PID=$!
echo "前端服务已启动，PID: $FRONTEND_PID"

# 保存PID
cd ..
mkdir -p logs
echo "$BACKEND_PID" > logs/backend.pid
echo "$FRONTEND_PID" > logs/frontend.pid

echo ""
echo "🎉 启动完成！"
echo "🌐 前端地址: http://localhost:3000"
echo "🔧 后端API: http://localhost:8000"
echo ""
echo "🎵 音乐播放器已优化："
echo "  ✅ 修复了音量调节重新播放的问题"
echo "  ✅ 优化了BGM和标题匹配"
echo "  ✅ 改善了播放体验"
echo ""
echo "�� 使用 ./stop.sh 停止服务" 