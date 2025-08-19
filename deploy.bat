@echo off
chcp 65001 >nul
title Summer Pockets 巡礼网站部署脚本

echo 🚀 开始部署 Summer Pockets 巡礼网站...
echo.

REM 检查环境
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python 未安装
    pause
    exit /b 1
)

node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js 未安装
    pause
    exit /b 1
)

npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ npm 未安装
    pause
    exit /b 1
)

echo ✅ 环境检查通过
echo.

REM 安装后端依赖
echo 📦 安装后端依赖...
cd backend
pip install -r requirements.txt
if errorlevel 1 (
    echo ❌ 后端依赖安装失败
    pause
    exit /b 1
)
cd ..

REM 安装前端依赖
echo 📦 安装前端依赖...
cd frontend
npm install
if errorlevel 1 (
    echo ❌ 前端依赖安装失败
    pause
    exit /b 1
)
cd ..

REM 构建前端
echo 🔨 构建前端...
cd frontend
npm run build:production
if errorlevel 1 (
    echo ❌ 前端构建失败
    pause
    exit /b 1
)
cd ..

echo.
echo ✅ 部署完成！
echo.
echo 🚀 启动服务...
echo 后端: http://localhost:8000
echo 前端: http://localhost:3000
echo.

REM 启动服务
start "后端服务" powershell -NoExit -Command "cd backend; python -m uvicorn app:app --host 127.0.0.1 --port 8000"
timeout /t 3 /nobreak >nul

start "前端服务" powershell -NoExit -Command "cd frontend; npm run preview:production"

echo 服务已启动，按任意键退出...
pause
