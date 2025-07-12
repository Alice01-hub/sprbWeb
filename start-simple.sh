#!/bin/bash

# Summer Pockets 巡礼网站简化启动脚本
echo "🌟 启动 Summer Pockets 巡礼网站..."

# 1. 强制清理所有相关端口和进程
echo "🔥 强制清理所有相关端口和进程..."
PORTS_TO_CLEAN=(3000 8000 5000 5173 5174 5175 5176 5177)

for port in "${PORTS_TO_CLEAN[@]}"; do
    echo "🔍 清理端口 $port..."
    
    # 使用netstat查找进程
    pids=$(netstat -tulpn 2>/dev/null | grep ":$port " | awk '{print $7}' | cut -d'/' -f1 | grep -v '-' | sort -u 2>/dev/null || true)
    
    if [ ! -z "$pids" ]; then
        echo "⚠️  端口 $port 被以下进程占用: $pids"
        for pid in $pids; do
            if [ ! -z "$pid" ] && [ "$pid" != "-" ]; then
                echo "🔥 终止进程 $pid..."
                kill -9 $pid 2>/dev/null || true
            fi
        done
    fi
    
    # 使用fuser作为备选方法
    fuser -k $port/tcp 2>/dev/null || true
    
    echo "✅ 端口 $port 已清理"
done

# 额外清理可能的项目相关进程
echo "🧹 清理项目相关进程..."
pkill -f "sprb-web" 2>/dev/null || true
pkill -f "vite.*3000" 2>/dev/null || true
pkill -f "node.*vite" 2>/dev/null || true
pkill -f "uvicorn.*app:app" 2>/dev/null || true
pkill -f "npm.*run.*dev" 2>/dev/null || true

# 清理旧的PID文件
rm -f logs/backend.pid logs/frontend.pid 2>/dev/null || true

echo "✅ 端口和进程清理完成"

# 等待进程完全关闭
sleep 3

# 2. 检查Python环境
echo "🐍 检查Python环境..."
if ! command -v python3 >/dev/null 2>&1; then
    echo "❌ Python3 未安装"
    exit 1
fi

if ! command -v pip >/dev/null 2>&1; then
    echo "❌ pip 未安装"
    exit 1
fi

if ! command -v node >/dev/null 2>&1; then
    echo "❌ Node.js 未安装"
    exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
    echo "❌ npm 未安装"
    exit 1
fi

echo "✅ 环境检查通过"

# 3. 安装后端依赖
echo "📦 检查并安装后端依赖..."
cd backend
if [ ! -f "requirements.txt" ]; then
    echo "错误: requirements.txt 不存在"
    exit 1
fi

# 检查是否已安装依赖
if ! pip list | grep -q "fastapi"; then
    echo "安装后端依赖..."
    pip install -r requirements.txt
else
    echo "后端依赖已安装，跳过..."
fi

# 4. 启动后端服务
echo "🚀 启动后端服务..."
# 确保日志目录存在
mkdir -p ../logs
nohup python3 -m uvicorn app:app --host 0.0.0.0 --port 8000 > ../logs/backend.log 2>&1 &
BACKEND_PID=$!
echo "后端服务已启动，PID: $BACKEND_PID"

# 5. 安装前端依赖
echo "📦 检查并安装前端依赖..."
cd ../frontend

# 检查是否已安装依赖
if [ ! -d "node_modules" ]; then
    echo "安装前端依赖..."
    npm install
else
    echo "前端依赖已安装，跳过..."
fi

# 6. 启动前端服务
echo "🚀 启动前端服务..."
nohup npm run dev > ../logs/frontend.log 2>&1 &
FRONTEND_PID=$!
echo "前端服务已启动，PID: $FRONTEND_PID"

# 创建PID文件用于后续关闭
cd ..
echo "$BACKEND_PID" > logs/backend.pid
echo "$FRONTEND_PID" > logs/frontend.pid

# 7. 等待服务启动完成
echo "⏳ 等待服务启动完成..."
sleep 8

# 8. 检查服务状态
echo "🔍 检查服务状态..."

# 检查后端服务
BACKEND_OK=false
for i in {1..10}; do
    if curl -s "http://localhost:8000/api/health" >/dev/null 2>&1; then
        echo "✅ 后端服务正常运行: http://localhost:8000"
        BACKEND_OK=true
        break
    else
        echo "⏳ 等待后端服务响应... ($i/10)"
        sleep 2
    fi
done

if [ "$BACKEND_OK" = false ]; then
    echo "❌ 后端服务启动失败"
    echo "📋 后端日志:"
    tail -20 logs/backend.log
    exit 1
fi

# 检查前端服务
FRONTEND_OK=false
for i in {1..10}; do
    if curl -s "http://localhost:3000" >/dev/null 2>&1; then
        echo "✅ 前端服务正常运行: http://localhost:3000"
        FRONTEND_OK=true
        break
    else
        echo "⏳ 等待前端服务响应... ($i/10)"
        sleep 2
    fi
done

if [ "$FRONTEND_OK" = false ]; then
    echo "⚠️  前端服务可能还在启动中，请稍后访问 http://localhost:3000"
fi

# 9. 输出服务信息
echo ""
echo "🎉 Summer Pockets 巡礼网站启动完成！"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🌐 前端地址: http://localhost:3000"
echo "🔧 后端API: http://localhost:8000"
echo "📊 API文档: http://localhost:8000/docs"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🛠️  管理命令:"
echo "  查看日志: tail -f logs/backend.log 或 tail -f logs/frontend.log"
echo "  停止服务: ./stop.sh"
echo "  重启服务: ./restart.sh"
echo ""
echo "🎵 音乐播放器已优化："
echo "  ✅ 修复了音量调节重新播放的问题"
echo "  ✅ 优化了BGM和标题匹配"
echo "  ✅ 改善了播放体验"
echo ""
echo "💡 提示:"
echo "  - 服务在后台运行，关闭终端不会影响服务"
echo "  - 如需查看实时日志，请使用: tail -f logs/backend.log logs/frontend.log"
echo "  - 如遇问题，请检查日志文件或重启服务"
echo ""
echo "按 Ctrl+C 退出日志查看，服务会在后台继续运行..."

# 10. 实时显示日志
trap 'echo ""; echo "退出日志查看，服务继续在后台运行..."; echo "访问 http://localhost:3000 使用网站"; exit 0' INT
tail -f logs/backend.log logs/frontend.log 