#!/bin/bash

echo "🧹 开始清理未使用的静态资源..."

# 进入前端目录
cd "$(dirname "$0")"

echo "📁 删除public目录下的静态资源..."
rm -rf public/images/*
rm -rf public/audio/*
rm -rf public/files/*

echo "📁 删除dist目录下的静态资源..."
rm -rf dist/images/*
rm -rf dist/audio/*
rm -rf dist/files/*

echo "📁 重新创建必要的目录结构..."
mkdir -p public/images
mkdir -p public/audio
mkdir -p public/files
mkdir -p public/trafficdata/webps
mkdir -p public/trafficdata/covers

echo "📝 添加.gitkeep文件保持目录结构..."
touch public/images/.gitkeep
touch public/audio/.gitkeep
touch public/files/.gitkeep
touch public/trafficdata/.gitkeep
touch public/trafficdata/webps/.gitkeep
touch public/trafficdata/covers/.gitkeep

echo "✅ 清理完成！"
echo "📊 清理后的目录大小："
du -sh public/ dist/ 2>/dev/null || echo "某些目录可能不存在"

echo ""
echo "💡 提示："
echo "1. 所有静态资源现在都从OSS仓库加载"
echo "2. 本地只保留了必要的目录结构"
echo "3. 如果需要添加新的静态资源，请上传到OSS仓库"
