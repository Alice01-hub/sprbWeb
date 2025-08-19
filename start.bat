@echo off
chcp 65001 >nul
title Summer Pockets 巡礼网站启动器

echo 🚀 启动 Summer Pockets 巡礼网站...
echo.

REM 启动PowerShell脚本
powershell -ExecutionPolicy Bypass -File "start_services.ps1"

pause
