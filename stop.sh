#!/bin/bash

# Summer Pockets 圣地巡礼网站 - 停止脚本
# 功能：停止所有前后端服务，清理进程

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 项目配置
PROJECT_DIR="/home/devbox/project/sprb-web"
FRONTEND_PORT=3000
BACKEND_PORT=8000

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

# 函数：停止服务进程
stop_service() {
    local service_name=$1
    local pid_file=$2
    
    print_message "正在停止 $service_name 服务..."
    
    if [ -f "$pid_file" ]; then
        local pid=$(cat "$pid_file")
        if ps -p $pid > /dev/null 2>&1; then
            kill -15 $pid 2>/dev/null
            sleep 2
            
            # 检查进程是否已停止
            if ps -p $pid > /dev/null 2>&1; then
                print_warning "$service_name 服务未响应SIGTERM，使用SIGKILL强制停止..."
                kill -9 $pid 2>/dev/null
            fi
            
            # 再次检查
            if ! ps -p $pid > /dev/null 2>&1; then
                print_success "$service_name 服务已停止"
            else
                print_error "$service_name 服务停止失败"
            fi
        else
            print_warning "$service_name 服务进程不存在"
        fi
        
        # 删除PID文件
        rm -f "$pid_file"
    else
        print_warning "$service_name 服务PID文件不存在"
    fi
}

# 函数：强制关闭端口占用进程
kill_port_processes() {
    local port=$1
    local service_name=$2
    
    print_message "正在检查端口 $port ($service_name) 的占用情况..."
    
    # 查找占用端口的进程
    local pids=$(lsof -ti:$port 2>/dev/null || true)
    
    if [ ! -z "$pids" ]; then
        print_warning "发现端口 $port 被占用，正在强制关闭进程..."
        echo "$pids" | xargs kill -9 2>/dev/null || true
        sleep 1
        
        # 再次检查
        local remaining_pids=$(lsof -ti:$port 2>/dev/null || true)
        if [ -z "$remaining_pids" ]; then
            print_success "端口 $port 已成功释放"
        else
            print_error "端口 $port 仍被占用"
        fi
    else
        print_success "端口 $port 未被占用"
    fi
}

# 主函数
main() {
    print_message "🛑 Summer Pockets 圣地巡礼网站 - 停止脚本"
    print_message "============================================="
    
    # 切换到项目目录
    cd "$PROJECT_DIR"
    
    # 停止后端服务
    stop_service "后端" "$PROJECT_DIR/backend.pid"
    
    # 停止前端服务
    stop_service "前端" "$PROJECT_DIR/frontend.pid"
    
    # 强制清理端口占用
    kill_port_processes $BACKEND_PORT "后端"
    kill_port_processes $FRONTEND_PORT "前端"
    
    # 清理其他可能的进程
    print_message "正在清理其他相关进程..."
    
    # 查找并停止所有相关的Python和Node.js进程
    pkill -f "python.*app.py" 2>/dev/null || true
    pkill -f "node.*vite" 2>/dev/null || true
    pkill -f "npm.*run.*dev" 2>/dev/null || true
    
    print_success "进程清理完成"
    
    print_message "============================================="
    print_success "🎉 所有服务已成功停止！"
    print_message "💡 提示：使用 './start.sh' 重新启动所有服务"
}

# 运行主函数
main "$@" 