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

# 检查环境变量文件
if [ ! -f ".env" ]; then
    echo "⚠️  .env 文件不存在，创建默认环境变量文件..."
    cat > .env << 'EOF'
# Summer Pockets 巡礼网站 - 开发环境变量配置

# Supabase配置
SUPABASE_URL=https://kcqcljzazatopmoifqzt.supabase.co
SUPABASE_PUBLIC_KEY=sb_publishable_VCpD0kHRMM18T7WMnrUmIA_hNoDZ229
SUPABASE_SECRET_KEY=sb_secret_R48SqAB3HuyR-nq2QLq6Ag_NRPTIX_V

# 应用配置
NODE_ENV=development
ENVIRONMENT=development
DEBUG=true
LOG_LEVEL=DEBUG

# 服务器配置
HOST=127.0.0.1
PORT=8000
RELOAD=true
WORKERS=1
EOF
    echo "✅ 环境变量文件创建完成"
fi

# 加载环境变量
echo "📋 加载环境变量..."
export $(cat .env | grep -v '^#' | xargs)

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
