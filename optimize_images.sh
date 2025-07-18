#!/bin/bash

# 图片优化脚本
# 安装依赖、激活虚拟环境并运行图片格式转换

set -e  # 遇到错误时退出

echo "🚀 开始图片优化流程..."

# 检查是否在正确的目录
if [ ! -d "frontend/public/images" ]; then
    echo "❌ 错误：请在sprb-web目录下运行此脚本"
    exit 1
fi

# 检查conda是否安装
if ! command -v conda &> /dev/null; then
    echo "❌ 错误：未找到conda，请先安装conda"
    exit 1
fi

echo "📦 检查并激活conda虚拟环境..."

# 检查虚拟环境是否存在
if conda env list | grep -q "sprb-web"; then
    echo "✅ 找到虚拟环境 sprb-web"
else
    echo "📦 创建虚拟环境 sprb-web..."
    conda create -n sprb-web python=3.9 -y
fi

# 激活虚拟环境
echo "🔧 激活虚拟环境 sprb-web..."
source $(conda info --base)/etc/profile.d/conda.sh
conda activate sprb-web

echo "📦 安装必要的Python依赖..."

# 安装Pillow库
pip install Pillow

# 检查安装是否成功
python -c "from PIL import Image; print('✅ Pillow库安装成功')" || {
    echo "❌ Pillow库安装失败"
    exit 1
}

echo "🖼️ 开始图片格式转换..."

# 进入图片目录
cd frontend/public/images

# 创建备份目录
echo "📁 创建备份目录..."
mkdir -p backup_original_images

# 备份原图片
echo "💾 备份原始图片..."
for file in $(find . -name "*.bmp" -o -name "*.png" -o -name "*.jpg" -o -name "*.jpeg"); do
    if [ -f "$file" ]; then
        backup_path="backup_original_images/$(dirname "$file")"
        mkdir -p "$backup_path"
        cp "$file" "$backup_path/"
        echo "   备份: $file"
    fi
done

echo "🔄 开始转换为WebP格式..."

# 运行Python优化脚本
python optimize_images.py \
    --input-dir . \
    --quality 85 \
    --max-width 1920 \
    --max-height 1080

echo "✅ 图片优化完成！"

# 显示统计信息
echo ""
echo "📊 优化结果统计："
echo "=================="

# 统计原文件大小
original_size=$(du -sh backup_original_images 2>/dev/null | cut -f1 || echo "未知")
echo "原始文件大小: $original_size"

# 统计WebP文件大小
webp_size=$(find . -name "*.webp" -exec du -ch {} + 2>/dev/null | tail -1 | cut -f1 || echo "未知")
echo "WebP文件大小: $webp_size"

# 统计文件数量
original_count=$(find . -name "*.bmp" -o -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" | wc -l)
webp_count=$(find . -name "*.webp" | wc -l)

echo "原始图片数量: $original_count"
echo "WebP图片数量: $webp_count"

echo ""
echo "🎉 图片优化流程完成！"
echo "📁 原始图片已备份到: backup_original_images/"
echo "🖼️ WebP图片已生成在当前目录"
echo ""
echo "💡 下一步操作："
echo "1. 检查WebP图片质量是否符合要求"
echo "2. 更新代码中的图片路径（.bmp -> .webp）"
echo "3. 测试网站加载性能"
echo "4. 如果满意，可以删除备份目录"

# 返回原目录
cd ../../..

echo "✅ 脚本执行完成！" 