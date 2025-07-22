#!/bin/bash

# Summer Pockets 圣地巡礼网站 - 一键启动脚本
# 功能：强制清理端口、激活虚拟环境、检查依赖、启动前后端服务

set -e  # 遇到错误时立即退出

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 项目配置
PROJECT_DIR="/home/devbox/project/sprb-web"
VENV_NAME="sprb-web"
FRONTEND_PORT=3000
BACKEND_PORT=8000

# 日志文件
LOG_DIR="$PROJECT_DIR/logs"
BACKEND_LOG="$LOG_DIR/backend.log"
FRONTEND_LOG="$LOG_DIR/frontend.log"

# 创建日志目录
mkdir -p "$LOG_DIR"

# 函数：打印带颜色的消息
print_message() {
    echo -e "${BLUE}[$(date '+%Y-%m-%d %H:%M:%S')] $1${NC}"
}

print_success() {
    echo -e "${GREEN}[$(date '+%Y-%m-%d %H:%M:%S')] ✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}[$(date '+%Y-%m-%d %H:%M:%S')] ⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}[$(date '+%Y-%m-%d %H:%M:%S')] ❌ $1${NC}"
}

# 函数：强制关闭端口占用进程
kill_port_processes() {
    local port=$1
    print_message "正在检查端口 $port 的占用情况..."
    
    # 查找占用端口的进程
    local pids=$(lsof -ti:$port 2>/dev/null || true)
    
    if [ ! -z "$pids" ]; then
        print_warning "发现端口 $port 被占用，正在强制关闭进程..."
        echo "$pids" | xargs kill -9 2>/dev/null || true
        sleep 2
        
        # 再次检查
        local remaining_pids=$(lsof -ti:$port 2>/dev/null || true)
        if [ -z "$remaining_pids" ]; then
            print_success "端口 $port 已成功释放"
        else
            print_error "端口 $port 仍被占用，请手动处理"
        fi
    else
        print_success "端口 $port 未被占用"
    fi
}

# 函数：激活虚拟环境
activate_venv() {
    print_message "正在激活虚拟环境 $VENV_NAME..."
    
    # 检查conda是否存在
    if ! command -v conda &> /dev/null; then
        print_error "conda 未安装，请先安装 Anaconda 或 Miniconda"
        exit 1
    fi
    
    # 初始化conda
    eval "$(conda shell.bash hook)"
    
    # 检查虚拟环境是否存在
    if conda env list | grep -q "$VENV_NAME"; then
        print_success "虚拟环境 $VENV_NAME 已存在"
    else
        print_message "创建虚拟环境 $VENV_NAME..."
        conda create -n "$VENV_NAME" python=3.9 -y
        print_success "虚拟环境 $VENV_NAME 创建成功"
    fi
    
    # 激活虚拟环境
    conda activate "$VENV_NAME"
    print_success "虚拟环境 $VENV_NAME 已激活"
}

# 函数：检查并安装后端依赖
check_backend_dependencies() {
    print_message "正在检查后端依赖..."
    
    cd "$PROJECT_DIR/backend"
    
    # 检查requirements.txt是否存在
    if [ ! -f "requirements.txt" ]; then
        print_error "requirements.txt 文件不存在"
        exit 1
    fi
    
    # 安装依赖
    print_message "正在安装后端依赖..."
    pip install -r requirements.txt
    print_success "后端依赖安装完成"
}

# 函数：检查并安装前端依赖
check_frontend_dependencies() {
    print_message "正在检查前端依赖..."
    
    cd "$PROJECT_DIR/frontend"
    
    # 检查package.json是否存在
    if [ ! -f "package.json" ]; then
        print_error "package.json 文件不存在"
        exit 1
    fi
    
    # 检查node_modules是否存在
    if [ ! -d "node_modules" ]; then
        print_message "正在安装前端依赖..."
        npm install
        print_success "前端依赖安装完成"
    else
        print_message "检查依赖更新..."
        npm ci
        print_success "前端依赖检查完成"
    fi
}

# 函数：启动后端服务
start_backend() {
    print_message "正在启动后端服务..."
    
    cd "$PROJECT_DIR/backend"
    
    # 启动后端服务（后台运行）
    nohup python app.py > "$BACKEND_LOG" 2>&1 &
    local backend_pid=$!
    
    # 保存PID到文件
    echo $backend_pid > "$PROJECT_DIR/backend.pid"
    
    print_success "后端服务已启动，PID: $backend_pid"
    print_message "后端日志文件: $BACKEND_LOG"
    
    # 等待后端服务启动
    sleep 3
    
    # 检查服务是否正常运行
    if curl -s http://localhost:$BACKEND_PORT/api/health > /dev/null; then
        print_success "后端服务运行正常 (http://localhost:$BACKEND_PORT)"
    else
        print_warning "后端服务可能启动失败，请检查日志"
    fi
}

# 函数：启动前端服务
start_frontend() {
    print_message "正在启动前端服务..."
    
    cd "$PROJECT_DIR/frontend"
    
    # 启动前端服务（后台运行）
    nohup npm run dev > "$FRONTEND_LOG" 2>&1 &
    local frontend_pid=$!
    
    # 保存PID到文件
    echo $frontend_pid > "$PROJECT_DIR/frontend.pid"
    
    print_success "前端服务已启动，PID: $frontend_pid"
    print_message "前端日志文件: $FRONTEND_LOG"
    
    # 等待前端服务启动
    sleep 5
    
    print_success "前端服务运行正常 (http://localhost:$FRONTEND_PORT)"
}

# 函数：检查服务状态
check_services() {
    print_message "正在检查服务状态..."
    
    # 检查后端服务
    if curl -s http://localhost:$BACKEND_PORT/api/health > /dev/null; then
        print_success "后端服务运行正常 ✅"
    else
        print_error "后端服务异常 ❌"
    fi
    
    # 检查前端服务
    if curl -s http://localhost:$FRONTEND_PORT > /dev/null; then
        print_success "前端服务运行正常 ✅"
    else
        print_error "前端服务异常 ❌"
    fi
}

# 主函数
main() {
    print_message "🚀 Summer Pockets 圣地巡礼网站 - 一键启动脚本"
    print_message "=================================================="
    
    # 切换到项目目录
    cd "$PROJECT_DIR"
    
    # 1. 强制关闭占用端口的进程
    print_message "📋 步骤 1: 清理端口占用"
    kill_port_processes $FRONTEND_PORT
    kill_port_processes $BACKEND_PORT
    sleep 2
    # 再次确认端口已释放
    if lsof -ti:$FRONTEND_PORT || lsof -ti:$BACKEND_PORT; then
        print_error "端口仍被占用，无法启动服务，请手动处理！"
        exit 1
    fi
    
    # 2. 激活虚拟环境
    print_message "📋 步骤 2: 激活虚拟环境"
    activate_venv
    
    # 3. 检查并安装依赖
    print_message "📋 步骤 3: 检查依赖"
    check_backend_dependencies
    check_frontend_dependencies
    
    # 4. 启动后端服务
    print_message "📋 步骤 4: 启动后端服务"
    start_backend
    
    # 5. 启动前端服务
    print_message "📋 步骤 5: 启动前端服务"
    start_frontend
    
    # 6. 检查服务状态
    print_message "📋 步骤 6: 检查服务状态"
    check_services
    
    print_message "=================================================="
    print_success "🎉 所有服务已成功启动！"
    print_message "🌐 前端访问地址: http://localhost:$FRONTEND_PORT"
    print_message "🔧 后端API地址: http://localhost:$BACKEND_PORT"
    print_message "📚 API文档地址: http://localhost:$BACKEND_PORT/docs"
    print_message "=================================================="
    
    # 显示进程信息
    print_message "📊 运行中的服务进程："
    if [ -f "$PROJECT_DIR/backend.pid" ]; then
        local backend_pid=$(cat "$PROJECT_DIR/backend.pid")
        print_message "   后端进程 PID: $backend_pid"
    fi
    if [ -f "$PROJECT_DIR/frontend.pid" ]; then
        local frontend_pid=$(cat "$PROJECT_DIR/frontend.pid")
        print_message "   前端进程 PID: $frontend_pid"
    fi
    
    print_message "💡 提示：使用 'ps aux | grep -E \"(python|node)\"' 查看运行状态"
    print_message "💡 提示：使用 './stop.sh' 停止所有服务"
    print_message "💡 提示：日志文件位于 $LOG_DIR 目录"
}

# 运行主函数
main "$@" 