#!/bin/bash

# 一键启动图片优化脚本
# 功能：激活虚拟环境并运行图片优化程序

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 脚本信息
echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}    SPRB图片优化一键启动脚本${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# 获取脚本所在目录的绝对路径
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
echo -e "${YELLOW}📁 脚本目录: ${SCRIPT_DIR}${NC}"

# 检查是否在正确的目录
if [[ ! -d "$SCRIPT_DIR" ]]; then
    echo -e "${RED}❌ 错误：无法确定脚本目录${NC}"
    exit 1
fi

# 检查Python文件是否存在
PYTHON_SCRIPT="$SCRIPT_DIR/optimize_images.py"
if [[ ! -f "$PYTHON_SCRIPT" ]]; then
    echo -e "${RED}❌ 错误：找不到 optimize_images.py 文件${NC}"
    echo -e "${YELLOW}   期望路径: $PYTHON_SCRIPT${NC}"
    exit 1
fi

echo -e "${GREEN}✅ 找到优化脚本: $PYTHON_SCRIPT${NC}"

# 检查输入目录是否存在
INPUT_DIR="/home/devbox/project/sprb-web/素材/graphs/originGraphs"
if [[ ! -d "$INPUT_DIR" ]]; then
    echo -e "${RED}❌ 错误：输入目录不存在${NC}"
    echo -e "${YELLOW}   期望路径: $INPUT_DIR${NC}"
    echo -e "${YELLOW}   请确保 originGraphs 目录存在并包含图片文件${NC}"
    exit 1
fi

echo -e "${GREEN}✅ 输入目录存在: $INPUT_DIR${NC}"

# 检查输入目录中是否有图片文件
IMAGE_COUNT=$(find "$INPUT_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.bmp" -o -iname "*.tiff" -o -iname "*.tif" \) | wc -l)

if [[ $IMAGE_COUNT -eq 0 ]]; then
    echo -e "${YELLOW}⚠️  警告：输入目录中没有找到图片文件${NC}"
    echo -e "${YELLOW}   支持的格式: JPG, JPEG, PNG, BMP, TIFF${NC}"
    echo -e "${YELLOW}   是否继续？(y/N)${NC}"
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        echo -e "${YELLOW}   操作已取消${NC}"
        exit 0
    fi
else
    echo -e "${GREEN}✅ 找到 $IMAGE_COUNT 个图片文件${NC}"
fi

# 设置输出目录
OUTPUT_DIR="/home/devbox/project/sprb-web/素材/graphs/webpGraphs"

# 检查conda是否可用
if command -v conda &> /dev/null; then
    echo -e "${GREEN}✅ 检测到 conda 环境${NC}"
    
    # 检查sprb-web虚拟环境是否存在
    if conda env list | grep -q "sprb-web"; then
        echo -e "${GREEN}✅ 找到 sprb-web 虚拟环境${NC}"
        
        # 激活虚拟环境
        echo -e "${BLUE}🔄 激活 sprb-web 虚拟环境...${NC}"
        source ~/miniconda3/etc/profile.d/conda.sh
        conda activate sprb-web
        
        if [[ $? -eq 0 ]]; then
            echo -e "${GREEN}✅ 虚拟环境激活成功${NC}"
        else
            echo -e "${RED}❌ 虚拟环境激活失败${NC}"
            exit 1
        fi
    else
        echo -e "${YELLOW}⚠️  未找到 sprb-web 虚拟环境${NC}"
        echo -e "${YELLOW}   尝试使用系统Python...${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  未检测到 conda，使用系统Python${NC}"
fi

# 检查Python是否可用
if command -v python &> /dev/null; then
    PYTHON_CMD="python"
elif command -v python3 &> /dev/null; then
    PYTHON_CMD="python3"
else
    echo -e "${RED}❌ 错误：未找到Python解释器${NC}"
    exit 1
fi

echo -e "${GREEN}✅ 使用Python解释器: $(which $PYTHON_CMD)${NC}"

# 检查Pillow库是否安装
echo -e "${BLUE}🔍 检查依赖库...${NC}"
if $PYTHON_CMD -c "import PIL" 2>/dev/null; then
    echo -e "${GREEN}✅ Pillow库已安装${NC}"
else
    echo -e "${RED}❌ 错误：Pillow库未安装${NC}"
    echo -e "${YELLOW}   正在尝试安装Pillow...${NC}"
    pip install Pillow
    
    if [[ $? -eq 0 ]]; then
        echo -e "${GREEN}✅ Pillow安装成功${NC}"
    else
        echo -e "${RED}❌ Pillow安装失败${NC}"
        echo -e "${YELLOW}   请手动安装: pip install Pillow${NC}"
        exit 1
    fi
fi

# 显示配置信息
echo ""
echo -e "${BLUE}📋 配置信息:${NC}"
echo -e "${YELLOW}   输入目录: $INPUT_DIR${NC}"
echo -e "${YELLOW}   输出目录: $OUTPUT_DIR${NC}"
echo -e "${YELLOW}   Python脚本: $PYTHON_SCRIPT${NC}"
echo -e "${YELLOW}   Python解释器: $PYTHON_CMD${NC}"
echo ""

# 确认开始处理
echo -e "${BLUE}🚀 准备开始图片优化...${NC}"
echo -e "${YELLOW}   按 Enter 键开始，或按 Ctrl+C 取消${NC}"
read -r

# 切换到脚本目录
cd "$SCRIPT_DIR"

# 运行Python脚本
echo -e "${BLUE}🔄 开始执行图片优化...${NC}"
echo ""

$PYTHON_CMD "$PYTHON_SCRIPT"

# 检查执行结果
if [[ $? -eq 0 ]]; then
    echo ""
    echo -e "${GREEN}🎉 图片优化完成！${NC}"
    echo -e "${BLUE}📁 输出目录: $OUTPUT_DIR${NC}"
    
    # 显示输出目录中的文件数量
    if [[ -d "$OUTPUT_DIR" ]]; then
        WEBP_COUNT=$(find "$OUTPUT_DIR" -type f -name "*.webp" | wc -l)
        echo -e "${GREEN}✅ 生成了 $WEBP_COUNT 个WebP文件${NC}"
    fi
else
    echo ""
    echo -e "${RED}❌ 图片优化失败！${NC}"
    echo -e "${YELLOW}   请检查错误信息并重试${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}    脚本执行完成${NC}"
echo -e "${BLUE}========================================${NC}" 