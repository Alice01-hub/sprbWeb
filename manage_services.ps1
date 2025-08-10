# 鸟白岛巡礼网站服务管理脚本
# Windows PowerShell版本

param(
    [Parameter(Mandatory=$true)]
    [ValidateSet("start", "stop", "restart", "status", "logs", "monitor")]
    [string]$Action,
    
    [switch]$BackendOnly,
    [switch]$FrontendOnly
)

# 服务配置
$Config = @{
    BackendPort = 8000
    FrontendPort = 3000
    BackendProcessName = "uvicorn"
    FrontendProcessName = "node"
    ProjectRoot = $PSScriptRoot
}

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

# 函数：获取服务进程
function Get-ServiceProcesses {
    $processes = @()
    
    # 获取后端进程
    $backendProcesses = Get-Process | Where-Object {
        $_.ProcessName -like "*python*" -and 
        $_.CommandLine -like "*uvicorn*" -and 
        $_.CommandLine -like "*main:app*"
    }
    $processes += $backendProcesses
    
    # 获取前端进程
    $frontendProcesses = Get-Process | Where-Object {
        $_.ProcessName -like "*node*" -and 
        $_.CommandLine -like "*npm*" -and 
        $_.CommandLine -like "*run dev*"
    }
    $processes += $frontendProcesses
    
    return $processes
}

# 函数：启动服务
function Start-Services {
    Write-Host "🚀 启动服务..." -ForegroundColor Green
    
    $backendStarted = $false
    $frontendStarted = $false
    
    # 启动后端
    if (-not $FrontendOnly) {
        Write-Host "🐍 启动后端服务..." -ForegroundColor Yellow
        
        if (Test-Port $Config.BackendPort) {
            Write-Host "⚠️  端口 $($Config.BackendPort) 已被占用" -ForegroundColor Yellow
        } else {
            try {
                $backendProcess = Start-Process powershell -ArgumentList "-NoExit", "-Command", "conda activate sprb-web; cd backend; uvicorn main:app --host 0.0.0.0 --port $($Config.BackendPort) --reload" -PassThru
                Start-Sleep -Seconds 5
                
                if (Test-Port $Config.BackendPort) {
                    Write-Host "✅ 后端服务启动成功 (PID: $($backendProcess.Id))" -ForegroundColor Green
                    $backendStarted = $true
                } else {
                    Write-Host "❌ 后端服务启动失败" -ForegroundColor Red
                }
            } catch {
                Write-Host "❌ 启动后端服务时出错: $($_.Exception.Message)" -ForegroundColor Red
            }
        }
    }
    
    # 启动前端
    if (-not $BackendOnly) {
        Write-Host "⚛️ 启动前端服务..." -ForegroundColor Yellow
        
        if (Test-Port $Config.FrontendPort) {
            Write-Host "⚠️  端口 $($Config.FrontendPort) 已被占用" -ForegroundColor Yellow
        } else {
            try {
                $frontendProcess = Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev" -PassThru
                Start-Sleep -Seconds 8
                
                if (Test-Port $Config.FrontendPort) {
                    Write-Host "✅ 前端服务启动成功 (PID: $($frontendProcess.Id))" -ForegroundColor Green
                    $frontendStarted = $true
                } else {
                    Write-Host "❌ 前端服务启动失败" -ForegroundColor Red
                }
            } catch {
                Write-Host "❌ 启动前端服务时出错: $($_.Exception.Message)" -ForegroundColor Red
            }
        }
    }
    
    # 显示结果
    if ($backendStarted -or $frontendStarted) {
        Write-Host ""
        Write-Host "📱 服务访问地址:" -ForegroundColor Cyan
        if ($backendStarted) {
            Write-Host "   后端API: http://localhost:$($Config.BackendPort)" -ForegroundColor Yellow
            Write-Host "   API文档: http://localhost:$($Config.BackendPort)/docs" -ForegroundColor Yellow
        }
        if ($frontendStarted) {
            Write-Host "   前端网站: http://localhost:$($Config.FrontendPort)" -ForegroundColor Yellow
        }
    }
}

# 函数：停止服务
function Stop-Services {
    Write-Host "🛑 停止服务..." -ForegroundColor Red
    
    $processes = Get-ServiceProcesses
    
    if ($processes.Count -eq 0) {
        Write-Host "ℹ️  没有找到运行中的服务" -ForegroundColor Yellow
        return
    }
    
    foreach ($process in $processes) {
        try {
            Write-Host "   停止进程 $($process.ProcessName) (PID: $($process.Id))..." -ForegroundColor White
            Stop-Process -Id $process.Id -Force
            Write-Host "   ✅ 进程已停止" -ForegroundColor Green
        } catch {
            Write-Host "   ❌ 停止进程失败: $($_.Exception.Message)" -ForegroundColor Red
        }
    }
    
    # 等待端口释放
    Start-Sleep -Seconds 3
    
    # 检查端口状态
    if (Test-Port $Config.BackendPort) {
        Write-Host "⚠️  后端端口 $($Config.BackendPort) 仍被占用" -ForegroundColor Yellow
    }
    if (Test-Port $Config.FrontendPort) {
        Write-Host "⚠️  前端端口 $($Config.FrontendPort) 仍被占用" -ForegroundColor Yellow
    }
}

# 函数：重启服务
function Restart-Services {
    Write-Host "🔄 重启服务..." -ForegroundColor Cyan
    
    Stop-Services
    Start-Sleep -Seconds 2
    Start-Services
}

# 函数：显示服务状态
function Show-ServiceStatus {
    Write-Host "📊 服务状态" -ForegroundColor Cyan
    Write-Host "===============================================" -ForegroundColor White
    
    # 检查后端状态
    $backendPort = Test-Port $Config.BackendPort
    $backendProcesses = Get-Process | Where-Object {
        $_.ProcessName -like "*python*" -and 
        $_.CommandLine -like "*uvicorn*" -and 
        $_.CommandLine -like "*main:app*"
    }
    
    Write-Host "🐍 后端服务:" -ForegroundColor Yellow
    if ($backendPort -and $backendProcesses.Count -gt 0) {
        Write-Host "   状态: ✅ 运行中" -ForegroundColor Green
        Write-Host "   端口: $($Config.BackendPort)" -ForegroundColor White
        Write-Host "   进程数: $($backendProcesses.Count)" -ForegroundColor White
        foreach ($proc in $backendProcesses) {
            Write-Host "     PID: $($proc.Id), 内存: $([math]::Round($proc.WorkingSet64/1MB, 2)) MB" -ForegroundColor White
        }
    } else {
        Write-Host "   状态: ❌ 未运行" -ForegroundColor Red
        Write-Host "   端口: $($Config.BackendPort)" -ForegroundColor White
    }
    
    Write-Host ""
    
    # 检查前端状态
    $frontendPort = Test-Port $Config.FrontendPort
    $frontendProcesses = Get-Process | Where-Object {
        $_.ProcessName -like "*node*" -and 
        $_.CommandLine -like "*npm*" -and 
        $_.CommandLine -like "*run dev*"
    }
    
    Write-Host "⚛️ 前端服务:" -ForegroundColor Yellow
    if ($frontendPort -and $frontendProcesses.Count -gt 0) {
        Write-Host "   状态: ✅ 运行中" -ForegroundColor Green
        Write-Host "   端口: $($Config.FrontendPort)" -ForegroundColor White
        Write-Host "   进程数: $($frontendProcesses.Count)" -ForegroundColor White
        foreach ($proc in $frontendProcesses) {
            Write-Host "     PID: $($proc.Id), 内存: $([math]::Round($proc.WorkingSet64/1MB, 2)) MB" -ForegroundColor White
        }
    } else {
        Write-Host "   状态: ❌ 未运行" -ForegroundColor Red
        Write-Host "   端口: $($Config.FrontendPort)" -ForegroundColor White
    }
    
    Write-Host ""
    Write-Host "📱 访问地址:" -ForegroundColor Cyan
    if ($backendPort) {
        Write-Host "   后端API: http://localhost:$($Config.BackendPort)" -ForegroundColor Yellow
        Write-Host "   API文档: http://localhost:$($Config.BackendPort)/docs" -ForegroundColor Yellow
    }
    if ($frontendPort) {
        Write-Host "   前端网站: http://localhost:$($Config.FrontendPort)" -ForegroundColor Yellow
    }
}

# 函数：显示日志
function Show-Logs {
    Write-Host "📝 服务日志" -ForegroundColor Cyan
    Write-Host "===============================================" -ForegroundColor White
    
    $logFiles = @(
        "backend.log",
        "frontend.log",
        "admin_frontend.log",
        "admin_backend.log"
    )
    
    foreach ($logFile in $logFiles) {
        $logPath = Join-Path $Config.ProjectRoot $logFile
        if (Test-Path $logPath) {
            Write-Host "📄 $logFile:" -ForegroundColor Yellow
            try {
                $content = Get-Content $logPath -Tail 10 -ErrorAction SilentlyContinue
                if ($content) {
                    $content | ForEach-Object { Write-Host "   $_" -ForegroundColor White }
                } else {
                    Write-Host "   (日志文件为空)" -ForegroundColor Gray
                }
            } catch {
                Write-Host "   ❌ 读取日志失败: $($_.Exception.Message)" -ForegroundColor Red
            }
            Write-Host ""
        }
    }
}

# 函数：监控服务
function Monitor-Services {
    Write-Host "📡 服务监控 (按 Ctrl+C 停止)" -ForegroundColor Cyan
    Write-Host "===============================================" -ForegroundColor White
    
    try {
        while ($true) {
            Clear-Host
            Write-Host "📡 服务监控 - $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor Green
            Write-Host "===============================================" -ForegroundColor White
            
            Show-ServiceStatus
            
            Write-Host ""
            Write-Host "💡 提示: 按 Ctrl+C 停止监控" -ForegroundColor Cyan
            
            Start-Sleep -Seconds 5
        }
    } catch {
        Write-Host ""
        Write-Host "🛑 监控已停止" -ForegroundColor Yellow
    }
}

# 主程序
Write-Host "🔧 鸟白岛巡礼网站服务管理器" -ForegroundColor Green
Write-Host "===============================================" -ForegroundColor Cyan

# 根据动作执行相应操作
switch ($Action.ToLower()) {
    "start" {
        Start-Services
    }
    "stop" {
        Stop-Services
    }
    "restart" {
        Restart-Services
    }
    "status" {
        Show-ServiceStatus
    }
    "logs" {
        Show-Logs
    }
    "monitor" {
        Monitor-Services
    }
    default {
        Write-Host "❌ 未知操作: $Action" -ForegroundColor Red
        Write-Host "   支持的操作: start, stop, restart, status, logs, monitor" -ForegroundColor Yellow
        exit 1
    }
}

Write-Host ""
Write-Host "💡 使用说明:" -ForegroundColor Cyan
Write-Host "   • 启动服务: .\manage_services.ps1 start" -ForegroundColor White
Write-Host "   • 停止服务: .\manage_services.ps1 stop" -ForegroundColor White
Write-Host "   • 重启服务: .\manage_services.ps1 restart" -ForegroundColor White
Write-Host "   • 查看状态: .\manage_services.ps1 status" -ForegroundColor White
Write-Host "   • 查看日志: .\manage_services.ps1 logs" -ForegroundColor White
Write-Host "   • 实时监控: .\manage_services.ps1 monitor" -ForegroundColor White
Write-Host "   • 仅操作后端: .\manage_services.ps1 start -BackendOnly" -ForegroundColor White
Write-Host "   • 仅操作前端: .\manage_services.ps1 start -FrontendOnly" -ForegroundColor White
