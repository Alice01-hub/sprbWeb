#!/bin/bash

# Summer Pockets 巡礼网站 - 开发环境启动脚本
# 适用于快速开发和测试

set -e

echo "🚀 启动 Summer Pockets 巡礼网站开发环境..."

# 检查Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 未安装"
    exit 1
fi

# 检查Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装"
    exit 1
fi

# 创建必要目录
mkdir -p logs data uploads

# 启动后端服务
echo "📡 启动后端服务..."
cd backend
python3 -m uvicorn app:app --host 127.0.0.1 --port 8000 --reload &
BACKEND_PID=$!
cd ..

# 等待后端启动
echo "⏳ 等待后端服务启动..."
sleep 3

# 启动前端服务
echo "🌐 启动前端服务..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo "✅ 开发环境启动完成！"
echo "📍 后端: http://127.0.0.1:8000"
echo "📍 前端: http://localhost:3000"
echo "📚 API文档: http://127.0.0.1:8000/docs"
echo ""
echo "按 Ctrl+C 停止服务"

# 等待用户中断
trap "echo '停止服务...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT
wait
