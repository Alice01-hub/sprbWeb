#!/bin/bash

# Summer Pockets 圣地巡礼网站一键启动脚本
echo "🌅 启动 Summer Pockets 圣地巡礼网站..."
echo "================================================"

# 设置颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 获取脚本所在目录
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

# 切换到项目目录
echo -e "${BLUE}📁 切换到项目目录: $SCRIPT_DIR${NC}"
cd "$SCRIPT_DIR"

# 验证我们在正确的目录下
if [ ! -f "frontend/package.json" ]; then
    echo -e "${RED}❌ 错误：未找到frontend/package.json文件，请确保在正确的项目目录下运行此脚本${NC}"
    exit 1
fi

echo -e "${GREEN}✅ 已在正确的项目目录下${NC}"
echo ""

# 1. 强制清理所有相关端口
echo -e "${BLUE}🔥 强制清理所有相关端口...${NC}"
PORTS_TO_CLEAN=(3000 5000 5173 5174 5175 5176 5177)

for port in "${PORTS_TO_CLEAN[@]}"; do
    echo -e "${YELLOW}🔍 清理端口 $port...${NC}"
    
    # 使用netstat查找进程
    pids=$(netstat -tulpn 2>/dev/null | grep ":$port " | awk '{print $7}' | cut -d'/' -f1 | grep -v '-' | sort -u 2>/dev/null || true)
    
    if [ ! -z "$pids" ]; then
        echo -e "${YELLOW}⚠️  端口 $port 被以下进程占用: $pids${NC}"
        for pid in $pids; do
            if [ ! -z "$pid" ] && [ "$pid" != "-" ]; then
                echo -e "${YELLOW}🔥 终止进程 $pid...${NC}"
                kill -9 $pid 2>/dev/null || true
            fi
        done
        sleep 1
    fi
    
    # 使用fuser作为备选方法
    fuser -k $port/tcp 2>/dev/null || true
    
    echo -e "${GREEN}✅ 端口 $port 已清理${NC}"
done

# 额外清理可能的项目相关进程
echo -e "${BLUE}🧹 清理项目相关进程...${NC}"
pkill -f "sprb-web" 2>/dev/null || true
pkill -f "vite.*3000" 2>/dev/null || true
pkill -f "node.*vite" 2>/dev/null || true

echo -e "${GREEN}✅ 端口清理完成${NC}"
echo ""

# 2. 检查开发环境
echo -e "${BLUE}🔧 检查开发环境...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js 未安装，请先安装 Node.js${NC}"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm 未安装，请先安装 npm${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js $(node --version) 已安装${NC}"
echo -e "${GREEN}✅ npm $(npm --version) 已安装${NC}"
echo ""

# 3. 检查和安装前端依赖
echo -e "${BLUE}📦 检查前端依赖...${NC}"
cd frontend
if [ ! -d "node_modules" ] || [ ! -f "node_modules/.package-lock.json" ]; then
    echo -e "${YELLOW}📥 正在安装前端依赖...${NC}"
    npm install
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ 前端依赖安装成功${NC}"
    else
        echo -e "${RED}❌ 前端依赖安装失败${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✅ 前端依赖已存在${NC}"
fi
cd ..
echo ""

# 4. 检查素材文件
echo -e "${BLUE}🎨 检查素材文件...${NC}"
required_files=(
    "frontend/public/images/sprb封面图.png"
    "frontend/public/images/交通篇摘要图.png"
    "frontend/public/images/打卡篇摘要图.png"
    "frontend/public/audio/水月陵 - Summer Pockets.mp3"
)

missing_files=0
for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        echo -e "${RED}❌ 缺少文件: $file${NC}"
        missing_files=$((missing_files + 1))
    fi
done

if [ $missing_files -eq 0 ]; then
    echo -e "${GREEN}✅ 所有素材文件就绪${NC}"
else
    echo -e "${YELLOW}⚠️  检测到 $missing_files 个文件缺失，网站仍可运行但可能显示异常${NC}"
fi
echo ""

# 创建日志目录
mkdir -p logs

# 检查是否有命令行参数
if [ "$1" = "stop" ]; then
    echo -e "${YELLOW}🛑 停止模式，所有服务已清理完成${NC}"
    echo -e "${GREEN}👋 感谢使用 Summer Pockets 圣地巡礼网站！${NC}"
    exit 0
fi

# 5. 检查Python环境并启动后端
echo -e "${BLUE}🐍 检查Python后端环境...${NC}"
if command -v conda &> /dev/null; then
    # 激活conda环境
    source $(conda info --base)/etc/profile.d/conda.sh
    
    # 检查是否存在项目环境
    if ! conda env list | grep -q "sprb-web"; then
        echo -e "${YELLOW}⚠️  sprb-web环境不存在，正在创建...${NC}"
        conda create -n sprb-web python=3.9 -y
    fi
    
    conda activate sprb-web
    
    # 安装Python依赖
    if [ -f "backend/requirements.txt" ]; then
        echo -e "${BLUE}📦 安装Python依赖...${NC}"
        pip install -r backend/requirements.txt > /dev/null 2>&1
        echo -e "${GREEN}✅ Python依赖安装完成${NC}"
    fi
    
    # 启动后端服务器
    echo -e "${BLUE}🔧 启动Python后端服务器...${NC}"
    cd backend
    nohup python app.py > ../logs/backend.log 2>&1 &
    BACKEND_PID=$!
    echo $BACKEND_PID > ../backend.pid
    cd ..
    echo -e "${GREEN}✅ 后端服务器已启动 (PID: $BACKEND_PID)${NC}"
    echo -e "${BLUE}📊 后端服务器运行在: http://localhost:5000${NC}"
    
    # 等待后端启动并进行健康检查
    echo -e "${YELLOW}⏳ 等待后端服务器启动...${NC}"
    sleep 3
    
    # 健康检查
    for i in {1..5}; do
        if curl -s http://localhost:5000/api/health > /dev/null 2>&1; then
            echo -e "${GREEN}✅ 后端健康检查通过${NC}"
            break
        else
            if [ $i -eq 5 ]; then
                echo -e "${RED}❌ 后端健康检查失败，请检查日志${NC}"
                exit 1
            fi
            echo -e "${YELLOW}⏳ 等待后端响应... ($i/5)${NC}"
            sleep 2
        fi
    done
else
    echo -e "${YELLOW}⚠️  未找到conda，跳过Python环境检查${NC}"
fi
echo ""

# 6. 启动前端服务器
echo -e "${BLUE}🌐 启动前端开发服务器...${NC}"
cd frontend

# 确保使用正确的端口配置
export PORT=3000
nohup npm run dev > ../logs/frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

# 将进程ID保存到文件
echo $FRONTEND_PID > server.pid

# 等待前端服务器启动
echo -e "${YELLOW}⏳ 等待前端服务器启动...${NC}"
sleep 5

# 检查前端服务器是否启动成功
if kill -0 $FRONTEND_PID 2>/dev/null; then
    echo -e "${GREEN}✅ 前端服务器启动成功！${NC}"
    echo -e "${BLUE}🌍 前端服务器运行在: http://localhost:3000${NC}"
else
    echo -e "${RED}❌ 前端服务器启动失败${NC}"
    echo -e "${YELLOW}📝 请检查日志文件: logs/frontend.log${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}🎉 所有服务器已成功启动！${NC}"
echo "================================================"
echo -e "${BLUE}📱 前端地址: http://localhost:3000${NC}"
echo -e "${BLUE}🔧 后端地址: http://localhost:5000${NC}"
echo ""
echo -e "${YELLOW}📝 查看日志:${NC}"
echo -e "   前端: tail -f logs/frontend.log"
echo -e "   后端: tail -f logs/backend.log"
echo ""
echo -e "${YELLOW}🛑 停止服务器: ./start.sh stop${NC}"
echo ""
echo -e "${GREEN}🌟 祝您圣地巡礼愉快！${NC}"
echo "================================================" 