#!/bin/bash

# Summer Pockets 巡礼网站 - PM2管理脚本
# 简化版本 - 专注于PM2进程管理

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 项目信息
PROJECT_NAME="Summer Pockets 巡礼网站"
PROJECT_DIR=$(pwd)

echo -e "${BLUE}🏝️  $PROJECT_NAME - PM2管理脚本${NC}"
echo "=================================="

# 检查PM2是否安装
check_pm2() {
    if ! command -v pm2 &> /dev/null; then
        echo -e "${YELLOW}⚠️  PM2未安装，正在安装...${NC}"
        npm install -g pm2
        echo -e "${GREEN}✅ PM2安装完成${NC}"
    else
        echo -e "${GREEN}✅ PM2已安装${NC}"
    fi
}

# 创建必要目录
create_directories() {
    echo -e "${BLUE}📁 创建必要目录...${NC}"
    mkdir -p logs data uploads
    echo -e "${GREEN}✅ 目录创建完成${NC}"
}

# 创建环境变量文件
create_env_file() {
    echo -e "${BLUE}📝 创建环境变量文件...${NC}"
    cat > .env << 'EOF'
# Summer Pockets 巡礼网站 - 环境变量配置

# Supabase配置
SUPABASE_URL=https://kcqcljzazatopmoifqzt.supabase.co
SUPABASE_PUBLIC_KEY=sb_publishable_VCpD0kHRMM18T7WMnrUmIA_hNoDZ229
SUPABASE_SECRET_KEY=sb_secret_R48SqAB3HuyR-nq2QLq6Ag_NRPTIX_V

# 应用配置
NODE_ENV=production
ENVIRONMENT=production
DEBUG=false
LOG_LEVEL=WARNING

# 服务器配置
HOST=0.0.0.0
PORT=8000
RELOAD=false
WORKERS=4
EOF
    echo -e "${GREEN}✅ 环境变量文件创建完成${NC}"
}

# 安装依赖
install_dependencies() {
    echo -e "${BLUE}📦 安装项目依赖...${NC}"
    
    # 检查环境变量文件
    if [ ! -f ".env" ]; then
        echo -e "${YELLOW}⚠️  .env 文件不存在，创建默认环境变量文件...${NC}"
        create_env_file
    fi
    
    # 安装后端依赖
    echo "安装后端依赖..."
    cd backend
    pip install -r requirements.txt
    cd ..
    
    # 安装前端依赖
    echo "安装前端依赖..."
    cd frontend
    npm install
    cd ..
    
    echo -e "${GREEN}✅ 依赖安装完成${NC}"
}

# 构建前端
build_frontend() {
    echo -e "${BLUE}🔨 构建前端...${NC}"
    cd frontend
    npm run build:production
    cd ..
    echo -e "${GREEN}✅ 前端构建完成${NC}"
}

# 启动服务
start_services() {
    local env=${1:-production}
    
    echo -e "${BLUE}🚀 启动服务 (环境: $env)...${NC}"
    
    # 检查环境变量文件
    if [ ! -f ".env" ]; then
        echo -e "${YELLOW}⚠️  .env 文件不存在，创建默认环境变量文件...${NC}"
        create_env_file
    fi
    
    # 加载环境变量
    if [ -f ".env" ]; then
        echo -e "${BLUE}📋 加载环境变量...${NC}"
        export $(cat .env | grep -v '^#' | xargs)
    fi
    
    if [ "$env" = "development" ]; then
        pm2 start ecosystem.config.js --env development
    else
        pm2 start ecosystem.config.js --env production
    fi
    
    echo -e "${GREEN}✅ 服务启动完成${NC}"
    pm2 status
}

# 停止服务
stop_services() {
    echo -e "${YELLOW}🛑 停止服务...${NC}"
    pm2 stop ecosystem.config.js
    echo -e "${GREEN}✅ 服务已停止${NC}"
}

# 重启服务
restart_services() {
    echo -e "${BLUE}🔄 重启服务...${NC}"
    pm2 restart ecosystem.config.js
    echo -e "${GREEN}✅ 服务重启完成${NC}"
}

# 重载服务
reload_services() {
    echo -e "${BLUE}🔄 重载服务...${NC}"
    pm2 reload ecosystem.config.js
    echo -e "${GREEN}✅ 服务重载完成${NC}"
}

# 查看日志
show_logs() {
    local service=${1:-all}
    
    if [ "$service" = "backend" ]; then
        echo -e "${BLUE}📋 后端日志:${NC}"
        pm2 logs sprb-backend --lines 50
    elif [ "$service" = "frontend" ]; then
        echo -e "${BLUE}📋 前端日志:${NC}"
        pm2 logs sprb-frontend --lines 50
    else
        echo -e "${BLUE}📋 所有服务日志:${NC}"
        pm2 logs --lines 50
    fi
}

# 监控服务
monitor_services() {
    echo -e "${BLUE}📊 启动监控面板...${NC}"
    pm2 monit
}

# 清理服务
clean_services() {
    echo -e "${YELLOW}🧹 清理服务...${NC}"
    pm2 delete ecosystem.config.js
    pm2 save
    echo -e "${GREEN}✅ 服务清理完成${NC}"
}

# 显示帮助信息
show_help() {
    echo -e "${BLUE}📖 使用说明:${NC}"
    echo "  $0 [命令] [参数]"
    echo ""
    echo -e "${BLUE}可用命令:${NC}"
    echo "  setup           - 初始设置 (安装PM2、创建目录、安装依赖)"
    echo "  start [env]     - 启动服务 (env: production/development, 默认production)"
    echo "  stop            - 停止服务"
    echo "  restart         - 重启服务"
    echo "  reload          - 重载服务"
    echo "  status          - 查看服务状态"
    echo "  logs [service]  - 查看日志 (service: backend/frontend/all, 默认all)"
    echo "  monit           - 启动监控面板"
    echo "  build           - 构建前端"
    echo "  clean           - 清理服务"
    echo "  help            - 显示此帮助信息"
    echo ""
    echo -e "${BLUE}示例:${NC}"
    echo "  $0 setup                    # 初始设置"
    echo "  $0 start                    # 启动生产环境"
    echo "  $0 start development        # 启动开发环境"
    echo "  $0 logs backend             # 查看后端日志"
    echo "  $0 monit                    # 启动监控"
}

# 主函数
main() {
    case "${1:-help}" in
        "setup")
            check_pm2
            create_directories
            install_dependencies
            build_frontend
            echo -e "${GREEN}🎉 初始设置完成！${NC}"
            echo -e "${BLUE}下一步: 运行 '$0 start' 启动服务${NC}"
            ;;
        "start")
            start_services "$2"
            ;;
        "stop")
            stop_services
            ;;
        "restart")
            restart_services
            ;;
        "reload")
            reload_services
            ;;
        "status")
            pm2 status
            ;;
        "logs")
            show_logs "$2"
            ;;
        "monit")
            monitor_services
            ;;
        "build")
            build_frontend
            ;;
        "clean")
            clean_services
            ;;
        "help"|*)
            show_help
            ;;
    esac
}

# 执行主函数
main "$@"
