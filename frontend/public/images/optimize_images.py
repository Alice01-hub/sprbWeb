#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
图片格式优化脚本
将目录下的所有图片转换为WebP格式，减少网站压力
"""

import os
import sys
import subprocess
import argparse
from pathlib import Path
from PIL import Image
import logging

# 配置日志
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('image_optimization.log'),
        logging.StreamHandler()
    ]
)

class ImageOptimizer:
    def __init__(self, input_dir, output_dir=None, quality=85, max_size=None, organize_by_island=True):
        """
        初始化图片优化器
        
        Args:
            input_dir (str): 输入目录路径
            output_dir (str): 输出目录路径，如果为None则覆盖原文件
            quality (int): WebP质量参数 (1-100)
            max_size (tuple): 最大尺寸 (width, height)，如果为None则保持原尺寸
            organize_by_island (bool): 是否按岛屿分类存放
        """
        self.input_dir = Path(input_dir)
        self.output_dir = Path(output_dir) if output_dir else self.input_dir
        self.quality = quality
        self.max_size = max_size
        self.organize_by_island = organize_by_island
        
        # 支持的图片格式
        self.supported_formats = {'.bmp', '.png', '.jpg', '.jpeg', '.tiff', '.tif'}
        
        # 岛屿目录
        self.islands = ["男木岛", "女木岛", "直岛"]
        
        # 统计信息
        self.stats = {
            'total_files': 0,
            'converted_files': 0,
            'skipped_files': 0,
            'error_files': 0,
            'total_size_before': 0,
            'total_size_after': 0
        }
    
    def check_dependencies(self):
        """检查依赖是否安装"""
        try:
            from PIL import Image
            logging.info("✅ Pillow库已安装")
        except ImportError:
            logging.error("❌ Pillow库未安装，请运行: pip install Pillow")
            return False
        
        return True
    
    def get_image_files(self):
        """获取所有支持的图片文件"""
        image_files = []
        
        for file_path in self.input_dir.rglob('*'):
            if file_path.is_file() and file_path.suffix.lower() in self.supported_formats:
                image_files.append(file_path)
        
        return image_files
    
    def get_island_from_filename(self, filename):
        """从文件名中提取岛屿信息"""
        # 移除文件扩展名
        name_without_ext = Path(filename).stem
        
        # 检查是否包含岛屿名称
        for island in self.islands:
            if island in name_without_ext:
                return island
        
        # 特殊处理一些文件
        if "鸟白岛" in name_without_ext:
            return "男木岛"  # 鸟白岛相关文件归入男木岛
        elif "神域" in name_without_ext:
            return "直岛"  # 神域相关文件归入直岛
        elif "打卡篇" in name_without_ext:
            return "女木岛"  # 打卡篇相关文件归入女木岛
        elif "七影碟" in name_without_ext:
            return "直岛"  # 七影碟相关文件归入直岛
        
        return None
    
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
    
    def convert_to_webp(self, input_path, output_path):
        """转换单个图片为WebP格式"""
        try:
            # 打开图片
            with Image.open(input_path) as img:
                # 转换为RGB模式（WebP不支持某些模式）
                if img.mode in ('RGBA', 'LA', 'P'):
                    img = img.convert('RGBA')
                elif img.mode != 'RGB':
                    img = img.convert('RGB')
                
                # 调整尺寸
                img = self.resize_image(img, self.max_size)
                
                # 确保输出目录存在
                output_path.parent.mkdir(parents=True, exist_ok=True)
                
                # 保存为WebP格式
                img.save(
                    output_path,
                    'WEBP',
                    quality=self.quality,
                    method=6,  # 压缩方法 (0-6, 6为最高质量)
                    lossless=False  # 有损压缩
                )
                
                return True
                
        except Exception as e:
            logging.error(f"转换失败 {input_path}: {str(e)}")
            return False
    
    def get_file_size(self, file_path):
        """获取文件大小（字节）"""
        try:
            return file_path.stat().st_size
        except:
            return 0
    
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
    
    def optimize_images(self):
        """优化所有图片"""
        if not self.check_dependencies():
            return False
        
        # 获取所有图片文件
        image_files = self.get_image_files()
        self.stats['total_files'] = len(image_files)
        
        if not image_files:
            logging.warning(f"在目录 {self.input_dir} 中未找到支持的图片文件")
            return True
        
        logging.info(f"找到 {len(image_files)} 个图片文件")
        
        # 处理每个图片文件
        for i, input_path in enumerate(image_files, 1):
            logging.info(f"处理进度: {i}/{len(image_files)} - {input_path.name}")
            
            # 计算输出路径
            if self.organize_by_island:
                # 按岛屿分类存放
                island = self.get_island_from_filename(input_path.name)
                if island:
                    output_path = self.output_dir / island / input_path.with_suffix('.webp').name
                else:
                    # 如果无法确定岛屿，放在根目录
                    output_path = self.output_dir / input_path.with_suffix('.webp').name
            else:
                # 保持原有目录结构
                if self.output_dir == self.input_dir:
                    # 覆盖原文件
                    output_path = input_path.with_suffix('.webp')
                else:
                    # 保持目录结构
                    relative_path = input_path.relative_to(self.input_dir)
                    output_path = self.output_dir / relative_path.with_suffix('.webp')
            
            # 确保输出目录存在
            output_path.parent.mkdir(parents=True, exist_ok=True)
            
            # 检查是否已存在WebP文件
            if output_path.exists():
                logging.info(f"跳过已存在的文件: {output_path.name}")
                self.stats['skipped_files'] += 1
                continue
            
            # 获取原文件大小
            original_size = self.get_file_size(input_path)
            self.stats['total_size_before'] += original_size
            
            # 转换图片
            if self.convert_to_webp(input_path, output_path):
                # 获取转换后文件大小
                converted_size = self.get_file_size(output_path)
                self.stats['total_size_after'] += converted_size
                
                # 计算压缩率
                compression_ratio = (1 - converted_size / original_size) * 100 if original_size > 0 else 0
                
                logging.info(f"✅ 转换成功: {input_path.name} -> {output_path.name}")
                logging.info(f"   原始大小: {self.format_size(original_size)}")
                logging.info(f"   转换后大小: {self.format_size(converted_size)}")
                logging.info(f"   压缩率: {compression_ratio:.1f}%")
                
                self.stats['converted_files'] += 1
            else:
                self.stats['error_files'] += 1
        
        return True
    
    def print_summary(self):
        """打印统计摘要"""
        logging.info("\n" + "="*50)
        logging.info("图片优化完成！")
        logging.info("="*50)
        logging.info(f"总文件数: {self.stats['total_files']}")
        logging.info(f"成功转换: {self.stats['converted_files']}")
        logging.info(f"跳过文件: {self.stats['skipped_files']}")
        logging.info(f"错误文件: {self.stats['error_files']}")
        
        if self.stats['total_size_before'] > 0:
            total_saved = self.stats['total_size_before'] - self.stats['total_size_after']
            total_compression = (1 - self.stats['total_size_after'] / self.stats['total_size_before']) * 100
            
            logging.info(f"原始总大小: {self.format_size(self.stats['total_size_before'])}")
            logging.info(f"转换后总大小: {self.format_size(self.stats['total_size_after'])}")
            logging.info(f"节省空间: {self.format_size(total_saved)}")
            logging.info(f"总体压缩率: {total_compression:.1f}%")
        
        logging.info("="*50)

def main():
    parser = argparse.ArgumentParser(description='图片格式优化脚本')
    parser.add_argument('--input-dir', default='.', help='输入目录路径')
    parser.add_argument('--output-dir', help='输出目录路径（可选）')
    parser.add_argument('--quality', type=int, default=85, help='WebP质量参数 (1-100)')
    parser.add_argument('--max-width', type=int, help='最大宽度')
    parser.add_argument('--max-height', type=int, help='最大高度')
    parser.add_argument('--overwrite', action='store_true', help='覆盖原文件')
    parser.add_argument('--organize-by-island', action='store_true', default=True, help='按岛屿分类存放')
    
    args = parser.parse_args()
    
    # 设置最大尺寸
    max_size = None
    if args.max_width or args.max_height:
        max_size = (args.max_width or 9999, args.max_height or 9999)
    
    # 创建优化器
    optimizer = ImageOptimizer(
        input_dir=args.input_dir,
        output_dir=args.output_dir,
        quality=args.quality,
        max_size=max_size,
        organize_by_island=args.organize_by_island
    )
    
    # 执行优化
    if optimizer.optimize_images():
        optimizer.print_summary()
        logging.info("🎉 图片优化完成！")
    else:
        logging.error("❌ 图片优化失败！")
        sys.exit(1)

if __name__ == '__main__':
    main() 