#!/bin/bash

# Summer Pockets 巡礼网站 - 部署配置检查脚本

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔍 Summer Pockets 巡礼网站 - 部署配置检查${NC}"
echo "================================================"

echo
echo -e "${BLUE}📋 检查环境变量配置...${NC}"

# 检查.env文件
if [ -f ".env" ]; then
    echo -e "${GREEN}✅ .env 文件存在${NC}"
    echo
    echo -e "${BLUE}📄 当前环境变量配置:${NC}"
    echo "----------------------------------------"
    cat .env
    echo "----------------------------------------"
else
    echo -e "${RED}❌ .env 文件不存在${NC}"
    echo -e "${YELLOW}💡 请运行 ./pm2-manager.sh setup 自动创建环境变量文件${NC}"
    exit 1
fi

echo
echo -e "${BLUE}🔍 检查关键配置项...${NC}"

# 检查Supabase配置
if grep -q "SUPABASE_URL" .env; then
    echo -e "${GREEN}✅ SUPABASE_URL 配置存在${NC}"
else
    echo -e "${RED}❌ SUPABASE_URL 配置缺失${NC}"
fi

if grep -q "SUPABASE_PUBLIC_KEY" .env; then
    echo -e "${GREEN}✅ SUPABASE_PUBLIC_KEY 配置存在${NC}"
else
    echo -e "${RED}❌ SUPABASE_PUBLIC_KEY 配置缺失${NC}"
fi

if grep -q "SUPABASE_SECRET_KEY" .env; then
    echo -e "${GREEN}✅ SUPABASE_SECRET_KEY 配置存在${NC}"
else
    echo -e "${RED}❌ SUPABASE_SECRET_KEY 配置缺失${NC}"
fi

echo
echo -e "${BLUE}🔍 检查项目文件...${NC}"

# 检查前端文件
if [ -f "frontend/package.json" ]; then
    echo -e "${GREEN}✅ 前端项目文件存在${NC}"
else
    echo -e "${RED}❌ 前端项目文件缺失${NC}"
fi

# 检查后端文件
if [ -f "backend/app.py" ]; then
    echo -e "${GREEN}✅ 后端项目文件存在${NC}"
else
    echo -e "${RED}❌ 后端项目文件缺失${NC}"
fi

# 检查部署脚本
if [ -f "pm2-manager.sh" ]; then
    echo -e "${GREEN}✅ PM2管理脚本存在${NC}"
else
    echo -e "${RED}❌ PM2管理脚本缺失${NC}"
fi

if [ -f "ecosystem.config.js" ]; then
    echo -e "${GREEN}✅ PM2配置文件存在${NC}"
else
    echo -e "${RED}❌ PM2配置文件缺失${NC}"
fi

echo
echo -e "${BLUE}🔍 检查依赖...${NC}"

# 检查Python
if command -v python3 &> /dev/null; then
    echo -e "${GREEN}✅ Python3 已安装${NC}"
else
    echo -e "${RED}❌ Python3 未安装${NC}"
fi

# 检查Node.js
if command -v node &> /dev/null; then
    echo -e "${GREEN}✅ Node.js 已安装${NC}"
else
    echo -e "${RED}❌ Node.js 未安装${NC}"
fi

# 检查npm
if command -v npm &> /dev/null; then
    echo -e "${GREEN}✅ npm 已安装${NC}"
else
    echo -e "${RED}❌ npm 未安装${NC}"
fi

# 检查PM2
if command -v pm2 &> /dev/null; then
    echo -e "${GREEN}✅ PM2 已安装${NC}"
else
    echo -e "${YELLOW}⚠️  PM2 未安装 (生产环境需要)${NC}"
fi

echo
echo -e "${BLUE}🎯 部署建议:${NC}"
echo "================================================"
echo "1. 确保所有 ✅ 项目都正常"
echo "2. 如有 ❌ 项目，请先解决相关问题"
echo "3. 运行 ./start-dev.sh 启动开发环境"
echo "4. 或运行 ./pm2-manager.sh setup 配置生产环境"
echo

echo "检查完成！"
