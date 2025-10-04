# PostgreSQL psql 安装脚本
# 作者: AI助手
# 用途: 自动下载并安装PostgreSQL客户端工具

Write-Host "🚀 开始安装PostgreSQL客户端工具..." -ForegroundColor Green

# 设置变量
$psqlDir = "C:\psql"
$downloadUrl = "https://get.enterprisedb.com/postgresql/postgresql-15.7-1-windows-x64-binaries.zip"
$zipFile = "$psqlDir\postgresql-15.7.zip"
$extractDir = "$psqlDir\postgresql-15.7"

# 创建目录
if (!(Test-Path $psqlDir)) {
    New-Item -ItemType Directory -Path $psqlDir -Force
    Write-Host "✅ 创建目录: $psqlDir" -ForegroundColor Green
}

# 检查是否已安装
if (Test-Path "$psqlDir\pgsql\bin\psql.exe") {
    Write-Host "✅ psql已安装，版本信息:" -ForegroundColor Green
    & "$psqlDir\pgsql\bin\psql.exe" --version
    Write-Host "`n💡 如果psql命令不可用，请将以下路径添加到系统PATH:" -ForegroundColor Yellow
    Write-Host "$psqlDir\pgsql\bin" -ForegroundColor Cyan
    exit 0
}

Write-Host "📥 正在下载PostgreSQL客户端工具..." -ForegroundColor Yellow
Write-Host "下载地址: $downloadUrl" -ForegroundColor Gray

try {
    # 下载文件
    Invoke-WebRequest -Uri $downloadUrl -OutFile $zipFile -UseBasicParsing
    Write-Host "✅ 下载完成" -ForegroundColor Green
} catch {
    Write-Host "❌ 下载失败: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "`n🔧 手动安装步骤:" -ForegroundColor Yellow
    Write-Host "1. 访问: https://www.postgresql.org/download/windows/" -ForegroundColor Cyan
    Write-Host "2. 下载 'Command Line Tools' 版本" -ForegroundColor Cyan
    Write-Host "3. 解压到: $psqlDir" -ForegroundColor Cyan
    Write-Host "4. 将 $psqlDir\pgsql\bin 添加到系统PATH" -ForegroundColor Cyan
    exit 1
}

Write-Host "📦 正在解压文件..." -ForegroundColor Yellow
try {
    # 解压文件
    Expand-Archive -Path $zipFile -DestinationPath $psqlDir -Force
    Write-Host "✅ 解压完成" -ForegroundColor Green
} catch {
    Write-Host "❌ 解压失败: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# 清理zip文件
Remove-Item $zipFile -Force

Write-Host "🔧 配置环境变量..." -ForegroundColor Yellow

# 获取当前PATH
$currentPath = [Environment]::GetEnvironmentVariable("PATH", "User")
$psqlBinPath = "$psqlDir\pgsql\bin"

# 检查是否已在PATH中
if ($currentPath -notlike "*$psqlBinPath*") {
    # 添加到用户PATH
    $newPath = if ($currentPath) { "$currentPath;$psqlBinPath" } else { $psqlBinPath }
    [Environment]::SetEnvironmentVariable("PATH", $newPath, "User")
    Write-Host "✅ 已添加到用户PATH" -ForegroundColor Green
} else {
    Write-Host "✅ 已在PATH中" -ForegroundColor Green
}

# 验证安装
Write-Host "`n🧪 验证安装..." -ForegroundColor Yellow
if (Test-Path "$psqlBinPath\psql.exe") {
    Write-Host "✅ psql安装成功!" -ForegroundColor Green
    Write-Host "版本信息:" -ForegroundColor Cyan
    & "$psqlBinPath\psql.exe" --version
    
    Write-Host "`n💡 使用说明:" -ForegroundColor Yellow
    Write-Host "连接Supabase数据库:" -ForegroundColor Cyan
    Write-Host "psql -h db.kcqcljzazatopmoifqzt.supabase.co -p 5432 -d postgres -U postgres" -ForegroundColor Gray
    
    Write-Host "`n⚠️ 注意: 如果psql命令不可用，请重启PowerShell或重新打开命令提示符" -ForegroundColor Yellow
} else {
    Write-Host "❌ psql安装失败" -ForegroundColor Red
}

Write-Host "`n🎯 安装完成!" -ForegroundColor Green
