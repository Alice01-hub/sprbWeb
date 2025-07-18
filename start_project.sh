#!/bin/bash

# SPRB项目一键启动脚本
# 功能：强制关闭占用端口、安装依赖、重启前后端服务

set -e  # 遇到错误立即退出

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

# 检查命令是否存在
check_command() {
    if ! command -v $1 &> /dev/null; then
        log_error "$1 命令未找到，请先安装"
        exit 1
    fi
}

# 强制关闭占用端口的进程
kill_port_processes() {
    log_info "正在检查并关闭占用端口的进程..."
    
    # 常见的开发端口
    ports=(3000 3001 5173 8080 8000 5000 4000)
    
    for port in "${ports[@]}"; do
        # 查找占用端口的进程
        pid=$(lsof -ti:$port 2>/dev/null || true)
        
        if [ ! -z "$pid" ]; then
            log_warning "发现端口 $port 被进程 $pid 占用，正在关闭..."
            kill -9 $pid 2>/dev/null || true
            log_success "端口 $port 已释放"
        else
            log_info "端口 $port 未被占用"
        fi
    done
    
    log_success "端口检查完成"
}

# 激活conda环境
activate_conda_env() {
    log_info "正在激活conda环境..."
    
    # 检查conda是否安装
    if ! command -v conda &> /dev/null; then
        log_error "conda未安装，请先安装Anaconda或Miniconda"
        exit 1
    fi
    
    # 检查环境是否存在
    if conda env list | grep -q "sprb-web"; then
        log_info "找到sprb-web环境，正在激活..."
        source $(conda info --base)/etc/profile.d/conda.sh
        conda activate sprb-web
        log_success "conda环境激活成功"
    else
        log_warning "sprb-web环境不存在，正在创建..."
        source $(conda info --base)/etc/profile.d/conda.sh
        conda create -n sprb-web python=3.11 -y
        conda activate sprb-web
        log_success "conda环境创建并激活成功"
    fi
}

# 安装前端依赖
install_frontend_deps() {
    log_info "正在安装前端依赖..."
    
    cd frontend
    
    # 检查node_modules是否存在
    if [ -d "node_modules" ]; then
        log_info "node_modules已存在，跳过安装"
    else
        log_info "正在安装npm依赖..."
        npm install
        log_success "前端依赖安装完成"
    fi
    
    cd ..
}

# 安装Python依赖
install_python_deps() {
    log_info "正在安装Python依赖..."
    
    # 检查requirements.txt是否存在
    if [ -f "requirements.txt" ]; then
        log_info "发现requirements.txt，正在安装依赖..."
        pip install -r requirements.txt
        log_success "Python依赖安装完成"
    else
        log_warning "未找到requirements.txt，跳过Python依赖安装"
    fi
}

# 启动前端服务
start_frontend() {
    log_info "正在启动前端服务..."
    
    cd frontend
    
    # 检查是否已经在运行
    if lsof -ti:5173 &> /dev/null; then
        log_warning "前端服务已在运行，正在重启..."
        pkill -f "vite" || true
        sleep 2
    fi
    
    # 启动开发服务器
    nohup npm run dev > ../frontend.log 2>&1 &
    frontend_pid=$!
    echo $frontend_pid > ../frontend.pid
    
    log_success "前端服务已启动 (PID: $frontend_pid)"
    log_info "前端服务地址: http://localhost:5173"
    
    cd ..
}

# 启动后端服务
start_backend() {
    log_info "正在启动后端服务..."
    
    # 检查后端目录是否存在
    if [ -d "backend" ]; then
        cd backend
        
        # 检查是否已经在运行
        if lsof -ti:8000 &> /dev/null; then
            log_warning "后端服务已在运行，正在重启..."
            pkill -f "python.*app.py" || true
            sleep 2
        fi
        
        # 启动后端服务
        nohup python app.py > ../backend.log 2>&1 &
        backend_pid=$!
        echo $backend_pid > ../backend.pid
        
        log_success "后端服务已启动 (PID: $backend_pid)"
        log_info "后端服务地址: http://localhost:8000"
        
        cd ..
    else
        log_warning "未找到backend目录，跳过后端服务启动"
    fi
}

# 显示服务状态
show_status() {
    log_info "服务状态检查..."
    
    echo -e "\n${BLUE}=== 服务状态 ===${NC}"
    
    # 检查前端服务
    if [ -f "frontend.pid" ]; then
        frontend_pid=$(cat frontend.pid)
        if ps -p $frontend_pid > /dev/null; then
            echo -e "${GREEN}✓ 前端服务运行中 (PID: $frontend_pid)${NC}"
        else
            echo -e "${RED}✗ 前端服务未运行${NC}"
        fi
    else
        echo -e "${YELLOW}? 前端服务状态未知${NC}"
    fi
    
    # 检查后端服务
    if [ -f "backend.pid" ]; then
        backend_pid=$(cat backend.pid)
        if ps -p $backend_pid > /dev/null; then
            echo -e "${GREEN}✓ 后端服务运行中 (PID: $backend_pid)${NC}"
        else
            echo -e "${RED}✗ 后端服务未运行${NC}"
        fi
    else
        echo -e "${YELLOW}? 后端服务状态未知${NC}"
    fi
    
    # 检查端口占用
    echo -e "\n${BLUE}=== 端口占用情况 ===${NC}"
    for port in 3000 3001 5173 8080 8000 5000 4000; do
        if lsof -ti:$port &> /dev/null; then
            pid=$(lsof -ti:$port)
            echo -e "${YELLOW}端口 $port 被进程 $pid 占用${NC}"
        else
            echo -e "${GREEN}端口 $port 未被占用${NC}"
        fi
    done
}

# 停止所有服务
stop_services() {
    log_info "正在停止所有服务..."
    
    # 停止前端服务
    if [ -f "frontend.pid" ]; then
        frontend_pid=$(cat frontend.pid)
        if ps -p $frontend_pid > /dev/null; then
            kill $frontend_pid
            log_success "前端服务已停止"
        fi
        rm -f frontend.pid
    fi
    
    # 停止后端服务
    if [ -f "backend.pid" ]; then
        backend_pid=$(cat backend.pid)
        if ps -p $backend_pid > /dev/null; then
            kill $backend_pid
            log_success "后端服务已停止"
        fi
        rm -f backend.pid
    fi
    
    # 强制关闭相关进程
    pkill -f "vite" || true
    pkill -f "python.*app.py" || true
    
    log_success "所有服务已停止"
}

# 清理日志文件
clean_logs() {
    log_info "正在清理日志文件..."
    rm -f frontend.log backend.log
    log_success "日志文件已清理"
}

# 主函数
main() {
    echo -e "${BLUE}================================${NC}"
    echo -e "${BLUE}    SPRB项目一键启动脚本${NC}"
    echo -e "${BLUE}================================${NC}"
    
    # 检查必要的命令
    check_command "conda"
    check_command "npm"
    check_command "python"
    
    # 根据参数执行不同操作
    case "${1:-start}" in
        "start")
            log_info "开始启动项目..."
            kill_port_processes
            activate_conda_env
            install_frontend_deps
            install_python_deps
            start_frontend
            start_backend
            show_status
            log_success "项目启动完成！"
            ;;
        "stop")
            log_info "开始停止项目..."
            stop_services
            log_success "项目已停止！"
            ;;
        "restart")
            log_info "开始重启项目..."
            stop_services
            sleep 2
            kill_port_processes
            activate_conda_env
            install_frontend_deps
            install_python_deps
            start_frontend
            start_backend
            show_status
            log_success "项目重启完成！"
            ;;
        "status")
            show_status
            ;;
        "clean")
            log_info "开始清理..."
            stop_services
            clean_logs
            log_success "清理完成！"
            ;;
        "help")
            echo -e "${BLUE}使用方法:${NC}"
            echo -e "  $0 start    - 启动项目"
            echo -e "  $0 stop     - 停止项目"
            echo -e "  $0 restart  - 重启项目"
            echo -e "  $0 status   - 查看状态"
            echo -e "  $0 clean    - 清理日志"
            echo -e "  $0 help     - 显示帮助"
            ;;
        *)
            log_error "未知参数: $1"
            echo -e "使用 '$0 help' 查看帮助"
            exit 1
            ;;
    esac
}

# 脚本入口
main "$@" 