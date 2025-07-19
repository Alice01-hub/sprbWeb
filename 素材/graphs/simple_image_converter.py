#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
简单图片转换脚本
将图片转换为WebP格式，支持单个文件或批量转换
"""

import os
import sys
from pathlib import Path
from PIL import Image
import argparse

class SimpleImageConverter:
    def __init__(self, quality=85, max_size=None):
        """
        初始化转换器
        
        Args:
            quality (int): WebP质量参数 (1-100)
            max_size (tuple): 最大尺寸 (width, height)
        """
        self.quality = quality
        self.max_size = max_size
        
        # 支持的图片格式
        self.supported_formats = {'.bmp', '.png', '.jpg', '.jpeg', '.tiff', '.tif'}
    
    def check_dependencies(self):
        """检查依赖是否安装"""
        try:
            from PIL import Image
            print("✅ Pillow库已安装")
            return True
        except ImportError:
            print("❌ Pillow库未安装，请运行: pip install Pillow")
            return False
    
    def resize_image(self, image, max_size):
        """调整图片尺寸"""
        if not max_size:
            return image
        
        width, height = image.size
        max_width, max_height = max_size
        
        # 计算缩放比例
        scale = min(max_width / width, max_height / height)
        
        if scale < 1:
            new_width = int(width * scale)
            new_height = int(height * scale)
            return image.resize((new_width, new_height), Image.Resampling.LANCZOS)
        
        return image
    
    def convert_single_file(self, input_path, output_path):
        """转换单个文件"""
        try:
            input_file = Path(input_path)
            output_file = Path(output_path)
            
            # 检查输入文件是否存在
            if not input_file.exists():
                print(f"❌ 输入文件不存在: {input_path}")
                return False
            
            # 检查输入文件格式
            if input_file.suffix.lower() not in self.supported_formats:
                print(f"❌ 不支持的图片格式: {input_file.suffix}")
                return False
            
            # 确保输出目录存在
            output_file.parent.mkdir(parents=True, exist_ok=True)
            
            # 打开并转换图片
            with Image.open(input_file) as img:
                # 转换为RGB模式（WebP不支持某些模式）
                if img.mode in ('RGBA', 'LA', 'P'):
                    img = img.convert('RGBA')
                elif img.mode != 'RGB':
                    img = img.convert('RGB')
                
                # 调整尺寸
                img = self.resize_image(img, self.max_size)
                
                # 保存为WebP格式
                img.save(
                    output_file,
                    'WEBP',
                    quality=self.quality,
                    method=6,
                    lossless=False
                )
            
            # 获取文件大小信息
            original_size = input_file.stat().st_size
            converted_size = output_file.stat().st_size
            compression_ratio = (1 - converted_size / original_size) * 100
            
            print(f"✅ 转换成功: {input_file.name} -> {output_file.name}")
            print(f"   原始大小: {self.format_size(original_size)}")
            print(f"   转换后大小: {self.format_size(converted_size)}")
            print(f"   压缩率: {compression_ratio:.1f}%")
            
            return True
            
        except Exception as e:
            print(f"❌ 转换失败: {str(e)}")
            return False
    
    def convert_directory(self, input_dir, output_dir):
        """批量转换目录"""
        input_path = Path(input_dir)
        output_path = Path(output_dir)
        
        if not input_path.exists():
            print(f"❌ 输入目录不存在: {input_dir}")
            return False
        
        # 获取所有支持的图片文件
        image_files = []
        for file_path in input_path.rglob('*'):
            if file_path.is_file() and file_path.suffix.lower() in self.supported_formats:
                image_files.append(file_path)
        
        if not image_files:
            print(f"❌ 在目录 {input_dir} 中未找到支持的图片文件")
            return False
        
        print(f"找到 {len(image_files)} 个图片文件")
        
        success_count = 0
        total_original_size = 0
        total_converted_size = 0
        
        for i, input_file in enumerate(image_files, 1):
            print(f"\n处理进度: {i}/{len(image_files)} - {input_file.name}")
            
            # 计算输出路径
            relative_path = input_file.relative_to(input_path)
            output_file = output_path / relative_path.with_suffix('.webp')
            
            # 确保输出目录存在
            output_file.parent.mkdir(parents=True, exist_ok=True)
            
            # 转换文件
            if self.convert_single_file(input_file, output_file):
                success_count += 1
                total_original_size += input_file.stat().st_size
                total_converted_size += output_file.stat().st_size
        
        # 打印统计信息
        print(f"\n📊 转换完成!")
        print(f"成功转换: {success_count}/{len(image_files)} 个文件")
        if total_original_size > 0:
            total_compression = (1 - total_converted_size / total_original_size) * 100
            print(f"原始总大小: {self.format_size(total_original_size)}")
            print(f"转换后总大小: {self.format_size(total_converted_size)}")
            print(f"总体压缩率: {total_compression:.1f}%")
        
        return success_count > 0
    
    def format_size(self, size_bytes):
        """格式化文件大小显示"""
        if size_bytes == 0:
            return "0B"
        
        size_names = ["B", "KB", "MB", "GB"]
        i = 0
        while size_bytes >= 1024 and i < len(size_names) - 1:
            size_bytes /= 1024.0
            i += 1
        
        return f"{size_bytes:.1f}{size_names[i]}"

def main():
    parser = argparse.ArgumentParser(description='简单图片转换脚本')
    parser.add_argument('input', help='输入文件或目录路径')
    parser.add_argument('output', help='输出文件或目录路径')
    parser.add_argument('--quality', type=int, default=85, help='WebP质量参数 (1-100)')
    parser.add_argument('--max-width', type=int, help='最大宽度')
    parser.add_argument('--max-height', type=int, help='最大高度')
    parser.add_argument('--batch', action='store_true', help='批量处理目录')
    
    args = parser.parse_args()
    
    # 检查依赖
    converter = SimpleImageConverter(quality=args.quality)
    if not converter.check_dependencies():
        sys.exit(1)
    
    # 设置最大尺寸
    max_size = None
    if args.max_width or args.max_height:
        max_size = (args.max_width or 9999, args.max_height or 9999)
        converter.max_size = max_size
    
    # 检查输入路径
    input_path = Path(args.input)
    if not input_path.exists():
        print(f"❌ 输入路径不存在: {args.input}")
        sys.exit(1)
    
    # 执行转换
    if args.batch or input_path.is_dir():
        # 批量转换目录
        print(f"🔄 开始批量转换目录: {args.input} -> {args.output}")
        success = converter.convert_directory(args.input, args.output)
    else:
        # 转换单个文件
        print(f"🔄 开始转换单个文件: {args.input} -> {args.output}")
        success = converter.convert_single_file(args.input, args.output)
    
    if success:
        print("🎉 转换完成！")
    else:
        print("❌ 转换失败！")
        sys.exit(1)

if __name__ == '__main__':
    main() 