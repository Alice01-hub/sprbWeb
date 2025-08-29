# 清理未使用的静态资源脚本 (Windows PowerShell版本)

Write-Host "🧹 开始清理未使用的静态资源..." -ForegroundColor Green

# 进入前端目录
Set-Location $PSScriptRoot

Write-Host "📁 删除public目录下的静态资源..." -ForegroundColor Yellow
if (Test-Path "public\images") { Remove-Item "public\images\*" -Recurse -Force }
if (Test-Path "public\audio") { Remove-Item "public\audio\*" -Recurse -Force }
if (Test-Path "public\files") { Remove-Item "public\files\*" -Recurse -Force }

Write-Host "📁 删除dist目录下的静态资源..." -ForegroundColor Yellow
if (Test-Path "dist\images") { Remove-Item "dist\images\*" -Recurse -Force }
if (Test-Path "dist\audio") { Remove-Item "dist\audio\*" -Recurse -Force }
if (Test-Path "dist\files") { Remove-Item "dist\files\*" -Recurse -Force }

Write-Host "📁 重新创建必要的目录结构..." -ForegroundColor Yellow
New-Item -ItemType Directory -Force -Path "public\images" | Out-Null
New-Item -ItemType Directory -Force -Path "public\audio" | Out-Null
New-Item -ItemType Directory -Force -Path "public\files" | Out-Null
New-Item -ItemType Directory -Force -Path "public\trafficdata\webps" | Out-Null
New-Item -ItemType Directory -Force -Path "public\trafficdata\covers" | Out-Null

Write-Host "📝 添加.gitkeep文件保持目录结构..." -ForegroundColor Yellow
New-Item -ItemType File -Force -Path "public\images\.gitkeep" | Out-Null
New-Item -ItemType File -Force -Path "public\audio\.gitkeep" | Out-Null
New-Item -ItemType File -Force -Path "public\files\.gitkeep" | Out-Null
New-Item -ItemType File -Force -Path "public\trafficdata\.gitkeep" | Out-Null
New-Item -ItemType File -Force -Path "public\trafficdata\webps\.gitkeep" | Out-Null
New-Item -ItemType File -Force -Path "public\trafficdata\covers\.gitkeep" | Out-Null

Write-Host "✅ 清理完成！" -ForegroundColor Green

Write-Host "📊 清理后的目录大小：" -ForegroundColor Cyan
if (Test-Path "public") { 
    $size = (Get-ChildItem "public" -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB
    Write-Host "public目录: $([math]::Round($size, 2)) MB" -ForegroundColor White
}
if (Test-Path "dist") { 
    $size = (Get-ChildItem "dist" -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB
    Write-Host "dist目录: $([math]::Round($size, 2)) MB" -ForegroundColor White
}

Write-Host ""
Write-Host "💡 提示：" -ForegroundColor Cyan
Write-Host "1. 所有静态资源现在都从OSS仓库加载" -ForegroundColor White
Write-Host "2. 本地只保留了必要的目录结构" -ForegroundColor White
Write-Host "3. 如果需要添加新的静态资源，请上传到OSS仓库" -ForegroundColor White
