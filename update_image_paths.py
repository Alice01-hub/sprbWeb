#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
更新图片路径脚本
将代码中的.bmp路径更新为.webp路径
"""

import os
import re
import argparse
from pathlib import Path
import logging

# 配置日志
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

class ImagePathUpdater:
    def __init__(self, project_dir):
        self.project_dir = Path(project_dir)
        self.stats = {
            'files_processed': 0,
            'paths_updated': 0,
            'files_modified': 0
        }
        
        # 需要处理的文件类型
        self.target_extensions = {'.tsx', '.ts', '.jsx', '.js'}
        
        # 图片路径模式
        self.image_patterns = [
            r'["\'](/images/[^"\']*\.bmp)["\']',  # 匹配 "/images/xxx.bmp"
            r'["\'](\./images/[^"\']*\.bmp)["\']',  # 匹配 "./images/xxx.bmp"
            r'["\'](\.\./images/[^"\']*\.bmp)["\']',  # 匹配 "../images/xxx.bmp"
        ]
    
    def find_code_files(self):
        """查找需要处理的代码文件"""
        code_files = []
        
        for file_path in self.project_dir.rglob('*'):
            if (file_path.is_file() and 
                file_path.suffix in self.target_extensions and
                'node_modules' not in str(file_path) and
                '.git' not in str(file_path)):
                code_files.append(file_path)
        
        return code_files
    
    def update_file_paths(self, file_path):
        """更新单个文件中的图片路径"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            modified = False
            
            # 处理每种图片路径模式
            for pattern in self.image_patterns:
                matches = re.findall(pattern, content)
                for match in matches:
                    # 将.bmp替换为.webp
                    new_path = match.replace('.bmp', '.webp')
                    content = content.replace(match, new_path)
                    self.stats['paths_updated'] += 1
                    logging.info(f"   更新路径: {match} -> {new_path}")
                    modified = True
            
            # 如果有修改，写回文件
            if modified:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                self.stats['files_modified'] += 1
                logging.info(f"✅ 已更新文件: {file_path}")
            
            return modified
            
        except Exception as e:
            logging.error(f"❌ 处理文件失败 {file_path}: {str(e)}")
            return False
    
    def update_paths(self):
        """更新所有代码文件中的图片路径"""
        code_files = self.find_code_files()
        
        if not code_files:
            logging.warning("未找到需要处理的代码文件")
            return True
        
        logging.info(f"找到 {len(code_files)} 个代码文件")
        
        for file_path in code_files:
            logging.info(f"处理文件: {file_path}")
            self.update_file_paths(file_path)
            self.stats['files_processed'] += 1
        
        return True
    
    def print_summary(self):
        """打印统计摘要"""
        logging.info("\n" + "="*50)
        logging.info("图片路径更新完成！")
        logging.info("="*50)
        logging.info(f"处理文件数: {self.stats['files_processed']}")
        logging.info(f"修改文件数: {self.stats['files_modified']}")
        logging.info(f"更新路径数: {self.stats['paths_updated']}")
        logging.info("="*50)

def main():
    parser = argparse.ArgumentParser(description='更新代码中的图片路径')
    parser.add_argument('--project-dir', default='.', help='项目目录路径')
    parser.add_argument('--dry-run', action='store_true', help='试运行，不实际修改文件')
    
    args = parser.parse_args()
    
    updater = ImagePathUpdater(args.project_dir)
    
    if args.dry_run:
        logging.info("🔍 试运行模式 - 不会实际修改文件")
    
    if updater.update_paths():
        updater.print_summary()
        logging.info("🎉 图片路径更新完成！")
    else:
        logging.error("❌ 图片路径更新失败！")
        return 1
    
    return 0

if __name__ == '__main__':
    exit(main()) 