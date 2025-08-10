# 鸟白岛巡礼网站启动脚本
# Windows PowerShell版本

param(
    [switch]$CheckOnly,
    [switch]$BackendOnly,
    [switch]$FrontendOnly
)

Write-Host "🚀 鸟白岛巡礼网站服务启动器" -ForegroundColor Green
Write-Host "===============================================" -ForegroundColor Cyan

# 函数：检查端口占用
function Test-Port {
    param([int]$Port)
    try {
        $connection = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue
        return $connection -ne $null
    } catch {
        return $false
    }
}

# 函数：检查conda环境
function Test-CondaEnvironment {
    try {
        $envs = conda info --envs 2>$null
        if ($envs -match "sprb-web") {
            return $true
        }
        return $false
    } catch {
        return $false
    }
}

# 函数：检查依赖
function Test-Dependencies {
    Write-Host "📋 检查系统依赖..." -ForegroundColor Yellow
    
    # 检查conda
    if (-not (Get-Command conda -ErrorAction SilentlyContinue)) {
        Write-Host "❌ conda未安装或不在PATH中" -ForegroundColor Red
        return $false
    }
    
    # 检查conda环境
    if (-not (Test-CondaEnvironment)) {
        Write-Host "❌ 未找到sprb-web环境" -ForegroundColor Red
        Write-Host "   请先运行: conda create -n sprb-web python=3.9 -y" -ForegroundColor Yellow
        return $false
    }
    
    # 检查Node.js
    if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
        Write-Host "❌ Node.js未安装或不在PATH中" -ForegroundColor Red
        return $false
    }
    
    # 检查npm
    if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
        Write-Host "❌ npm未安装或不在PATH中" -ForegroundColor Red
        return $false
    }
    
    Write-Host "✅ 系统依赖检查通过" -ForegroundColor Green
    return $true
}

# 函数：启动后端服务
function Start-BackendService {
    Write-Host "🐍 启动后端API服务..." -ForegroundColor Yellow
    
    # 检查端口占用
    if (Test-Port 8000) {
        Write-Host "⚠️  端口8000已被占用，尝试停止现有服务..." -ForegroundColor Yellow
        try {
            Get-Process | Where-Object {$_.ProcessName -like "*python*" -and $_.CommandLine -like "*uvicorn*"} | Stop-Process -Force
            Start-Sleep -Seconds 2
        } catch {
            Write-Host "❌ 无法停止现有服务，请手动检查" -ForegroundColor Red
            return $false
        }
    }
    
    # 启动后端服务
    try {
        $backendProcess = Start-Process powershell -ArgumentList "-NoExit", "-Command", "conda activate sprb-web; cd backend; uvicorn main:app --host 0.0.0.0 --port 8000 --reload" -PassThru
        Start-Sleep -Seconds 5
        
        # 检查服务是否启动成功
        if (Test-Port 8000) {
            Write-Host "✅ 后端服务启动成功 (PID: $($backendProcess.Id))" -ForegroundColor Green
            return $true
        } else {
            Write-Host "❌ 后端服务启动失败" -ForegroundColor Red
            return $false
        }
    } catch {
        Write-Host "❌ 启动后端服务时出错: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# 函数：启动前端服务
function Start-FrontendService {
    Write-Host "⚛️ 启动前端服务..." -ForegroundColor Yellow
    
    # 检查端口占用
    if (Test-Port 3000) {
        Write-Host "⚠️  端口3000已被占用，尝试停止现有服务..." -ForegroundColor Yellow
        try {
            Get-Process | Where-Object {$_.ProcessName -like "*node*" -and $_.CommandLine -like "*npm*"} | Stop-Process -Force
            Start-Sleep -Seconds 2
        } catch {
            Write-Host "❌ 无法停止现有服务，请手动检查" -ForegroundColor Red
            return $false
        }
    }
    
    # 启动前端服务
    try {
        $frontendProcess = Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev" -PassThru
        Start-Sleep -Seconds 8
        
        # 检查服务是否启动成功
        if (Test-Port 3000) {
            Write-Host "✅ 前端服务启动成功 (PID: $($frontendProcess.Id))" -ForegroundColor Green
            return $true
        } else {
            Write-Host "❌ 前端服务启动失败" -ForegroundColor Red
            return $false
        }
    } catch {
        Write-Host "❌ 启动前端服务时出错: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# 主程序
if ($CheckOnly) {
    Write-Host "🔍 仅执行依赖检查..." -ForegroundColor Cyan
    Test-Dependencies
    exit
}

# 检查依赖
if (-not (Test-Dependencies)) {
    Write-Host "❌ 依赖检查失败，请解决上述问题后重试" -ForegroundColor Red
    exit 1
}

# 根据参数启动服务
$backendSuccess = $false
$frontendSuccess = $false

if ($BackendOnly -or (-not $FrontendOnly)) {
    $backendSuccess = Start-BackendService
}

if ($FrontendOnly -or (-not $BackendOnly)) {
    Start-Sleep -Seconds 3
    $frontendSuccess = Start-FrontendService
}

# 显示结果
Write-Host ""
Write-Host "🎉 服务启动完成！" -ForegroundColor Green
Write-Host "===============================================" -ForegroundColor Cyan

if ($backendSuccess -or (-not $BackendOnly)) {
    Write-Host "📱 访问地址:" -ForegroundColor Cyan
    Write-Host "   主网站: http://localhost:3000" -ForegroundColor Yellow
    Write-Host "   后端API: http://localhost:8000" -ForegroundColor Yellow
    Write-Host "   API文档: http://localhost:8000/docs" -ForegroundColor Yellow
    Write-Host "   后台管理: http://localhost:3001" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "💡 提示:" -ForegroundColor Cyan
Write-Host "   • 服务已在后台运行，可以关闭此窗口" -ForegroundColor White
Write-Host "   • 如需停止服务，请关闭对应的PowerShell窗口" -ForegroundColor White
Write-Host "   • 使用 -CheckOnly 参数仅检查依赖" -ForegroundColor White
Write-Host "   • 使用 -BackendOnly 参数仅启动后端" -ForegroundColor White
Write-Host "   • 使用 -FrontendOnly 参数仅启动前端" -ForegroundColor White

Write-Host ""
Write-Host "🔧 管理命令:" -ForegroundColor Cyan
Write-Host "   • 检查端口占用: netstat -ano | findstr :8000" -ForegroundColor White
Write-Host "   • 查看进程: Get-Process | Where-Object {$_.ProcessName -like '*python*'}" -ForegroundColor White
Write-Host "   • 停止服务: 关闭对应的PowerShell窗口" -ForegroundColor White
