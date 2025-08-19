#!/bin/bash

# Summer Pockets 巡礼网站 - Linux部署脚本
# 简化版本 - 专注于核心功能部署

set -e

echo "🚀 开始部署 Summer Pockets 巡礼网站..."

# 检查环境
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 未安装"
    exit 1
fi

if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm 未安装"
    exit 1
fi

# 创建虚拟环境
echo "🐍 创建Python虚拟环境..."
python3 -m venv venv
source venv/bin/activate

# 安装后端依赖
echo "📦 安装后端依赖..."
cd backend
pip install -r requirements.txt
cd ..

# 安装前端依赖
echo "📦 安装前端依赖..."
cd frontend
npm install
cd ..

# 构建前端
echo "🔨 构建前端..."
cd frontend
npm run build:production
cd ..

# 启动服务
echo "🚀 启动服务..."
echo "后端: http://localhost:8000"
echo "前端: http://localhost:3000"

# 启动后端
cd backend
python -m uvicorn app:app --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!
cd ..

# 启动前端
cd frontend
npm run preview:production &
FRONTEND_PID=$!
cd ..

echo "✅ 部署完成！"
echo "后端PID: $BACKEND_PID"
echo "前端PID: $FRONTEND_PID"

# 等待用户中断
trap "echo '停止服务...'; kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait
