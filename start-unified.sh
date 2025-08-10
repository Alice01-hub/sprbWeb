#!/bin/bash

# Summer Pockets 巡礼网站 - 统一启动脚本
# 功能：强制关闭端口、安装依赖、重启前后端服务

set -e

echo "🚀 启动 Summer Pockets 巡礼网站..."

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 项目配置
PROJECT_NAME="sprbWeb"
FRONTEND_PORT=3000
BACKEND_PORT=5000
ADMIN_FRONTEND_PORT=3001
ADMIN_BACKEND_PORT=5001

# 日志函数
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 1. 强制关闭所有占用端口
log_info "步骤 1: 强制关闭占用端口..."

kill_port() {
    local port=$1
    local pids=$(lsof -ti:$port 2>/dev/null || true)
    
    if [ ! -z "$pids" ]; then
        log_warning "发现端口 $port 被占用，正在强制关闭..."
        echo "$pids" | xargs kill -9 2>/dev/null || true
        sleep 1
        log_success "端口 $port 已关闭"
    else
        log_info "端口 $port 未被占用"
    fi
}

# 关闭所有相关端口
kill_port $FRONTEND_PORT
kill_port $BACKEND_PORT
kill_port $ADMIN_FRONTEND_PORT
kill_port $ADMIN_BACKEND_PORT

# 2. 检查并创建conda环境
log_info "步骤 2: 检查conda环境..."

# 检查conda是否安装
if ! command -v conda &> /dev/null; then
    log_error "conda未安装，请先安装conda"
    exit 1
fi

# 检查项目环境是否存在
if conda env list | grep -q "^$PROJECT_NAME "; then
    log_info "发现现有环境 $PROJECT_NAME，正在激活..."
    eval "$(conda shell.bash hook)"
    conda activate $PROJECT_NAME
else
    log_info "创建新的conda环境: $PROJECT_NAME"
    eval "$(conda shell.bash hook)"
    conda create -n $PROJECT_NAME python=3.9 -y
    conda activate $PROJECT_NAME
fi

log_success "conda环境已准备就绪"

# 3. 安装前端依赖
log_info "步骤 3: 安装前端依赖..."

cd frontend

# 检查node_modules是否存在
if [ ! -d "node_modules" ]; then
    log_info "安装前端依赖..."
    npm install
    log_success "前端依赖安装完成"
else
    log_info "前端依赖已存在，跳过安装"
fi

cd ..

# 4. 安装后端依赖
log_info "步骤 4: 安装后端依赖..."

cd backend

# 检查requirements.txt是否存在
if [ -f "requirements.txt" ]; then
    log_info "安装后端依赖..."
    pip install -r requirements.txt
    log_success "后端依赖安装完成"
else
    log_warning "未找到requirements.txt，跳过后端依赖安装"
fi

cd ..

# 5. 启动后端服务
log_info "步骤 5: 启动后端服务..."

cd backend

# 检查是否有启动脚本
if [ -f "app.py" ]; then
    log_info "启动后端服务 (端口: $BACKEND_PORT)..."
    nohup python app.py > ../backend.log 2>&1 &
    BACKEND_PID=$!
    echo $BACKEND_PID > ../backend.pid
    sleep 3
    
    # 检查后端是否启动成功
    if curl -s http://localhost:$BACKEND_PORT > /dev/null 2>&1; then
        log_success "后端服务启动成功"
    else
        log_warning "后端服务可能未完全启动，请检查日志"
    fi
else
    log_warning "未找到后端启动文件app.py"
fi

cd ..

# 6. 启动前端服务
log_info "步骤 6: 启动前端服务..."

cd frontend

log_info "启动前端服务 (端口: $FRONTEND_PORT)..."
nohup npm run dev > ../frontend.log 2>&1 &
FRONTEND_PID=$!
echo $FRONTEND_PID > ../frontend.pid

sleep 5

# 检查前端是否启动成功
if curl -s http://localhost:$FRONTEND_PORT > /dev/null 2>&1; then
    log_success "前端服务启动成功"
else
    log_warning "前端服务可能未完全启动，请检查日志"
fi

cd ..

# 7. 显示服务状态
log_info "步骤 7: 显示服务状态..."

echo ""
echo "=========================================="
echo "🎉 Summer Pockets 巡礼网站启动完成！"
echo "=========================================="
echo ""
echo "📱 前端服务: http://localhost:$FRONTEND_PORT"
echo "🔧 后端服务: http://localhost:$BACKEND_PORT"
echo ""
echo "📋 服务状态:"
echo "   - 前端PID: $(cat frontend.pid 2>/dev/null || echo '未找到')"
echo "   - 后端PID: $(cat backend.pid 2>/dev/null || echo '未找到')"
echo ""
echo "📝 日志文件:"
echo "   - 前端日志: frontend.log"
echo "   - 后端日志: backend.log"
echo ""
echo "🛑 停止服务: ./stop.sh"
echo "🔄 重启服务: ./start-unified.sh"
echo ""

# 8. 打开浏览器
log_info "正在打开浏览器..."
if command -v xdg-open &> /dev/null; then
    xdg-open http://localhost:$FRONTEND_PORT &
elif command -v open &> /dev/null; then
    open http://localhost:$FRONTEND_PORT &
else
    log_info "请手动打开浏览器访问: http://localhost:$FRONTEND_PORT"
fi

log_success "启动脚本执行完成！"
