#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
图片路径更新脚本 v2
更新所有页面中的图片路径，适配新的分类结构
"""

import os
import re
import logging
from pathlib import Path

# 配置日志
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('image_path_update_v2.log'),
        logging.StreamHandler()
    ]
)

class ImagePathUpdater:
    def __init__(self, project_root):
        """
        初始化图片路径更新器
        
        Args:
            project_root (str): 项目根目录路径
        """
        self.project_root = Path(project_root)
        self.frontend_dir = self.project_root / "frontend"
        
        # 支持的图片格式
        self.image_extensions = {'.bmp', '.png', '.jpg', '.jpeg', '.webp'}
        
        # 统计信息
        self.stats = {
            'total_files': 0,
            'updated_files': 0,
            'total_replacements': 0,
            'error_files': 0
        }
    
    def get_island_from_filename(self, filename):
        """从文件名中提取岛屿信息"""
        # 移除文件扩展名
        name_without_ext = Path(filename).stem
        
        # 岛屿列表
        islands = ["男木岛", "女木岛", "直岛"]
        
        # 检查是否包含岛屿名称
        for island in islands:
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
    
    def update_image_path(self, image_path):
        """更新单个图片路径"""
        # 移除开头的斜杠
        if image_path.startswith('/'):
            image_path = image_path[1:]
        
        # 检查是否是图片文件
        path_obj = Path(image_path)
        if path_obj.suffix.lower() not in self.image_extensions:
            return image_path
        
        # 获取文件名
        filename = path_obj.name
        
        # 获取岛屿信息
        island = self.get_island_from_filename(filename)
        
        if island:
            # 构建新的路径
            if path_obj.suffix.lower() == '.webp':
                # WebP文件放在webps目录下
                new_path = f"images/webps/{island}/{filename}"
            else:
                # 原图文件放在origin_pictures目录下
                new_path = f"images/origin_pictures/{island}/{filename}"
            
            logging.info(f"更新路径: {image_path} -> {new_path}")
            return new_path
        
        return image_path
    
    def update_file_content(self, file_path):
        """更新文件内容中的图片路径"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            
            # 匹配图片路径的正则表达式
            # 匹配 src="..." 中的图片路径
            src_pattern = r'src=["\']([^"\']*\.(?:bmp|png|jpg|jpeg|webp))["\']'
            
            # 匹配 background-image: url(...) 中的图片路径
            bg_pattern = r'background-image:\s*url\(["\']?([^"\')\s]*\.(?:bmp|png|jpg|jpeg|webp))["\']?\)'
            
            # 匹配 import 语句中的图片路径
            import_pattern = r'import\s+["\']([^"\']*\.(?:bmp|png|jpg|jpeg|webp))["\']'
            
            # 匹配 require 语句中的图片路径
            require_pattern = r'require\(["\']([^"\']*\.(?:bmp|png|jpg|jpeg|webp))["\']\)'
            
            replacements = 0
            
            # 更新 src 属性
            def update_src(match):
                nonlocal replacements
                old_path = match.group(1)
                new_path = self.update_image_path(old_path)
                replacements += 1
                return f'src="{new_path}"'
            
            content = re.sub(src_pattern, update_src, content)
            
            # 更新 background-image
            def update_bg(match):
                nonlocal replacements
                old_path = match.group(1)
                new_path = self.update_image_path(old_path)
                replacements += 1
                return f'background-image: url("{new_path}")'
            
            content = re.sub(bg_pattern, update_bg, content)
            
            # 更新 import 语句
            def update_import(match):
                nonlocal replacements
                old_path = match.group(1)
                new_path = self.update_image_path(old_path)
                replacements += 1
                return f'import "{new_path}"'
            
            content = re.sub(import_pattern, update_import, content)
            
            # 更新 require 语句
            def update_require(match):
                nonlocal replacements
                old_path = match.group(1)
                new_path = self.update_image_path(old_path)
                replacements += 1
                return f'require("{new_path}")'
            
            content = re.sub(require_pattern, update_require, content)
            
            # 如果内容有变化，写回文件
            if content != original_content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                
                self.stats['updated_files'] += 1
                self.stats['total_replacements'] += replacements
                logging.info(f"✅ 更新文件: {file_path} ({replacements} 处替换)")
            
            return True
            
        except Exception as e:
            logging.error(f"❌ 更新文件失败 {file_path}: {str(e)}")
            self.stats['error_files'] += 1
            return False
    
    def find_code_files(self):
        """查找需要更新的代码文件"""
        code_files = []
        
        # 查找的文件类型
        code_extensions = {'.js', '.jsx', '.ts', '.tsx', '.html', '.css', '.scss', '.sass'}
        
        # 排除的目录
        exclude_dirs = {'node_modules', '.git', 'dist', 'build', '.next'}
        
        for root, dirs, files in os.walk(self.frontend_dir):
            # 排除不需要的目录
            dirs[:] = [d for d in dirs if d not in exclude_dirs]
            
            for file in files:
                if Path(file).suffix.lower() in code_extensions:
                    file_path = Path(root) / file
                    code_files.append(file_path)
        
        return code_files
    
    def update_all_files(self):
        """更新所有文件中的图片路径"""
        code_files = self.find_code_files()
        self.stats['total_files'] = len(code_files)
        
        logging.info(f"找到 {len(code_files)} 个代码文件")
        
        for i, file_path in enumerate(code_files, 1):
            logging.info(f"处理进度: {i}/{len(code_files)} - {file_path.name}")
            self.update_file_content(file_path)
        
        return True
    
    def print_summary(self):
        """打印统计摘要"""
        logging.info("\n" + "="*50)
        logging.info("图片路径更新完成！")
        logging.info("="*50)
        logging.info(f"总文件数: {self.stats['total_files']}")
        logging.info(f"更新文件: {self.stats['updated_files']}")
        logging.info(f"总替换数: {self.stats['total_replacements']}")
        logging.info(f"错误文件: {self.stats['error_files']}")
        logging.info("="*50)

def main():
    # 设置项目根目录
    project_root = Path(__file__).parent
    
    # 创建更新器
    updater = ImagePathUpdater(project_root)
    
    # 执行更新
    if updater.update_all_files():
        updater.print_summary()
        logging.info("🎉 图片路径更新完成！")
    else:
        logging.error("❌ 图片路径更新失败！")

if __name__ == '__main__':
    main() 