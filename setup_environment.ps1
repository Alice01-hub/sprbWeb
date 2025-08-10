# 鸟白岛巡礼网站环境初始化脚本
# Windows PowerShell版本

Write-Host "🔧 鸟白岛巡礼网站环境初始化" -ForegroundColor Green
Write-Host "===============================================" -ForegroundColor Cyan

# 函数：检查conda是否可用
function Test-CondaAvailable {
    try {
        $condaVersion = conda --version 2>$null
        if ($condaVersion) {
            Write-Host "✅ conda已安装: $condaVersion" -ForegroundColor Green
            return $true
        }
        return $false
    } catch {
        return $false
    }
}

# 函数：创建conda环境
function New-CondaEnvironment {
    Write-Host "🐍 创建conda虚拟环境..." -ForegroundColor Yellow
    
    try {
        # 检查环境是否已存在
        $envs = conda info --envs 2>$null
        if ($envs -match "sprb-web") {
            Write-Host "⚠️  sprb-web环境已存在，跳过创建" -ForegroundColor Yellow
            return $true
        }
        
        # 创建新环境
        Write-Host "   正在创建sprb-web环境..." -ForegroundColor White
        conda create -n sprb-web python=3.9 -y
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ conda环境创建成功" -ForegroundColor Green
            return $true
        } else {
            Write-Host "❌ conda环境创建失败" -ForegroundColor Red
            return $false
        }
    } catch {
        Write-Host "❌ 创建conda环境时出错: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# 函数：安装Python依赖
function Install-PythonDependencies {
    Write-Host "📦 安装Python依赖..." -ForegroundColor Yellow
    
    try {
        # 激活环境
        conda activate sprb-web
        
        # 安装基础依赖
        $dependencies = @(
            "fastapi",
            "uvicorn[standard]",
            "sqlalchemy",
            "alembic",
            "passlib[bcrypt]",
            "python-jose[cryptography]",
            "email-validator",
            "python-multipart",
            "pydantic"
        )
        
        foreach ($dep in $dependencies) {
            Write-Host "   安装 $dep..." -ForegroundColor White
            pip install $dep
            if ($LASTEXITCODE -ne 0) {
                Write-Host "❌ 安装 $dep 失败" -ForegroundColor Red
                return $false
            }
        }
        
        Write-Host "✅ Python依赖安装完成" -ForegroundColor Green
        return $true
        
    } catch {
        Write-Host "❌ 安装Python依赖时出错: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# 函数：安装前端依赖
function Install-FrontendDependencies {
    Write-Host "⚛️ 安装前端依赖..." -ForegroundColor Yellow
    
    try {
        # 检查Node.js
        if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
            Write-Host "❌ Node.js未安装，请先安装Node.js" -ForegroundColor Red
            return $false
        }
        
        # 检查npm
        if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
            Write-Host "❌ npm未安装，请先安装npm" -ForegroundColor Red
            return $false
        }
        
        Write-Host "   检查前端目录..." -ForegroundColor White
        if (-not (Test-Path "frontend")) {
            Write-Host "❌ 前端目录不存在" -ForegroundColor Red
            return $false
        }
        
        # 进入前端目录安装依赖
        Push-Location frontend
        Write-Host "   安装npm依赖..." -ForegroundColor White
        npm install
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ 前端依赖安装完成" -ForegroundColor Green
            Pop-Location
            return $true
        } else {
            Write-Host "❌ 前端依赖安装失败" -ForegroundColor Red
            Pop-Location
            return $false
        }
        
    } catch {
        Write-Host "❌ 安装前端依赖时出错: $($_.Exception.Message)" -ForegroundColor Red
        Pop-Location
        return $false
    }
}

# 函数：初始化数据库
function Initialize-Database {
    Write-Host "🗄️ 初始化数据库..." -ForegroundColor Yellow
    
    try {
        # 检查后端目录
        if (-not (Test-Path "backend")) {
            Write-Host "❌ 后端目录不存在" -ForegroundColor Red
            return $false
        }
        
        # 检查初始化脚本
        if (-not (Test-Path "backend/init_db.py")) {
            Write-Host "❌ 数据库初始化脚本不存在" -ForegroundColor Red
            return $false
        }
        
        # 激活conda环境并运行初始化
        conda activate sprb-web
        Push-Location backend
        
        Write-Host "   运行数据库初始化..." -ForegroundColor White
        python init_db.py
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ 数据库初始化完成" -ForegroundColor Green
            Pop-Location
            return $true
        } else {
            Write-Host "❌ 数据库初始化失败" -ForegroundColor Red
            Pop-Location
            return $false
        }
        
    } catch {
        Write-Host "❌ 初始化数据库时出错: $($_.Exception.Message)" -ForegroundColor Red
        Pop-Location
        return $false
    }
}

# 主程序
Write-Host "🔍 检查系统环境..." -ForegroundColor Cyan

# 检查conda
if (-not (Test-CondaAvailable)) {
    Write-Host "❌ conda未安装或不在PATH中" -ForegroundColor Red
    Write-Host "   请先安装Miniconda或Anaconda" -ForegroundColor Yellow
    Write-Host "   下载地址: https://docs.conda.io/en/latest/miniconda.html" -ForegroundColor Yellow
    exit 1
}

# 创建conda环境
if (-not (New-CondaEnvironment)) {
    Write-Host "❌ 环境创建失败，请检查错误信息" -ForegroundColor Red
    exit 1
}

# 安装Python依赖
if (-not (Install-PythonDependencies)) {
    Write-Host "❌ Python依赖安装失败" -ForegroundColor Red
    exit 1
}

# 安装前端依赖
if (-not (Install-FrontendDependencies)) {
    Write-Host "❌ 前端依赖安装失败" -ForegroundColor Red
    exit 1
}

# 初始化数据库
if (-not (Initialize-Database)) {
    Write-Host "❌ 数据库初始化失败" -ForegroundColor Red
    exit 1
}

# 完成
Write-Host ""
Write-Host "🎉 环境初始化完成！" -ForegroundColor Green
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 下一步操作:" -ForegroundColor Cyan
Write-Host "   1. 运行启动脚本: .\start_services.ps1" -ForegroundColor White
Write-Host "   2. 或者仅检查环境: .\start_services.ps1 -CheckOnly" -ForegroundColor White
Write-Host "   3. 访问网站: http://localhost:3000" -ForegroundColor White
Write-Host ""
Write-Host "💡 提示:" -ForegroundColor Cyan
Write-Host "   • 如果遇到问题，请检查错误信息" -ForegroundColor White
Write-Host "   • 确保所有依赖都已正确安装" -ForegroundColor White
Write-Host "   • 可以重新运行此脚本修复环境问题" -ForegroundColor White
