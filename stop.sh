#!/bin/bash

# ========== Summer Pockets 一键停止脚本 ==========
# 功能：
# 1. 强制关闭所有相关端口及端口转发
# 2. 清理所有相关进程
# ===============================================

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 强制关闭所有相关端口及端口转发
function kill_ports() {
    echo -e "${BLUE}🛑 正在停止所有服务...${NC}"
    
    # 停止端口 3000, 3001, 8000, 8001 的进程
    for port in 3000 3001 8000 8001; do
        pids=$(lsof -ti :$port 2>/dev/null || true)
        if [ -n "$pids" ]; then
            echo -e "${YELLOW}🔪 停止占用 $port 的进程: $pids${NC}"
            kill -9 $pids || true
        else
            echo -e "${GREEN}✅ 端口 $port 无进程占用${NC}"
        fi
    done
    
    # 停止所有相关的Python进程
    echo -e "${YELLOW}🔪 停止所有Python进程...${NC}"
    pkill -f "uvicorn" || true
    pkill -f "python.*admin_api" || true
    pkill -f "python.*app" || true
    
    # 停止所有相关的Node进程
    echo -e "${YELLOW}🔪 停止所有Node进程...${NC}"
    pkill -f "node.*vite" || true
    pkill -f "npm.*dev" || true
    
    echo -e "${GREEN}✅ 所有服务已停止${NC}"
}

# 清理临时文件
function cleanup() {
    echo -e "${BLUE}🧹 清理临时文件...${NC}"
    
    # 删除PID文件
    rm -f *.pid 2>/dev/null || true
    
    # 清理日志文件（可选）
    # rm -f *.log 2>/dev/null || true
    
    echo -e "${GREEN}✅ 临时文件清理完成${NC}"
}

# 主流程
echo -e "${BLUE}🎯 开始停止 Summer Pockets 巡礼网站...${NC}"
echo -e "${BLUE}===============================================${NC}"

kill_ports
cleanup

echo -e "\n${GREEN}🎉 所有服务已成功停止！${NC}"
echo -e "${BLUE}===============================================${NC}"
echo -e "${YELLOW}💡 如需重新启动，请运行: ./start.sh${NC}" 