@echo off
chcp 65001 >nul
echo 🌐 启动 Summer Pockets 巡礼网站前端服务...
echo ================================================

cd /d "%~dp0"

echo 📋 检查环境...
node --version
if %errorlevel% neq 0 (
    echo ❌ Node.js 未安装或未添加到PATH
    pause
    exit /b 1
)

npm --version
if %errorlevel% neq 0 (
    echo ❌ npm 未安装或未添加到PATH
    pause
    exit /b 1
)

echo.
echo 📦 检查依赖...
if not exist "node_modules" (
    echo 📥 安装依赖...
    npm install
    if %errorlevel% neq 0 (
        echo ❌ 依赖安装失败
        pause
        exit /b 1
    )
)

echo.
echo 🔍 检查环境变量...
if not exist "..\.env" (
    echo ⚠️  .env 文件不存在，创建默认环境变量文件...
    (
        echo # Summer Pockets 巡礼网站 - 前端环境变量配置
        echo.
        echo # Supabase配置
        echo SUPABASE_URL=https://kcqcljzazatopmoifqzt.supabase.co
        echo SUPABASE_PUBLIC_KEY=sb_publishable_VCpD0kHRMM18T7WMnrUmIA_hNoDZ229
        echo SUPABASE_SECRET_KEY=sb_secret_R48SqAB3HuyR-nq2QLq6Ag_NRPTIX_V
        echo.
        echo # 应用配置
        echo NODE_ENV=development
        echo ENVIRONMENT=development
        echo DEBUG=true
        echo LOG_LEVEL=DEBUG
        echo.
        echo # 服务器配置
        echo HOST=127.0.0.1
        echo PORT=8000
        echo RELOAD=true
        echo WORKERS=1
    ) > ..\.env
    echo ✅ .env 文件创建完成
)

echo.
echo 🌐 启动前端服务...
echo 按 Ctrl+C 停止服务
echo ================================================
echo.

npm run dev

echo.
echo 服务已停止
pause
