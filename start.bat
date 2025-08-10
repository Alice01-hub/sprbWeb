@echo off
chcp 65001 >nul
title 鸟白岛巡礼网站启动器

echo.
echo ===============================================
echo           鸟白岛巡礼网站启动器
echo ===============================================
echo.

echo 🚀 正在启动服务...
echo.

echo 🐍 启动后端API服务...
start "后端服务" powershell -NoExit -Command "conda activate sprb-web; cd backend; uvicorn main:app --host 0.0.0.0 --port 8000 --reload"

echo ⏳ 等待后端服务启动...
timeout /t 5 /nobreak >nul

echo ⚛️ 启动前端服务...
start "前端服务" powershell -NoExit -Command "cd frontend; npm run dev"

echo ⏳ 等待前端服务启动...
timeout /t 8 /nobreak >nul

echo.
echo ===============================================
echo 🎉 服务启动完成！
echo ===============================================
echo.
echo 📱 访问地址:
echo    主网站: http://localhost:3000
echo    后端API: http://localhost:8000
echo    API文档: http://localhost:8000/docs
echo    后台管理: http://localhost:3001
echo.
echo 💡 提示:
echo    • 服务已在后台运行，可以关闭此窗口
echo    • 如需停止服务，请关闭对应的PowerShell窗口
echo.
echo 🔧 管理命令:
echo    • 查看状态: .\manage_services.ps1 status
echo    • 停止服务: .\manage_services.ps1 stop
echo    • 重启服务: .\manage_services.ps1 restart
echo.
pause
