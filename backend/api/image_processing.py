"""
图片处理模块
"""
import os
from PIL import Image
from typing import Optional, Tuple

class ImageProcessor:
    """图片处理器"""
    
    def __init__(self):
        self.max_size = (800, 600)  # 最大尺寸
        self.quality = 85  # JPEG质量
    
    def process_image(self, image_path: str, output_path: Optional[str] = None) -> str:
        """
        处理图片：调整大小、优化质量
        
        Args:
            image_path: 输入图片路径
            output_path: 输出图片路径，如果为None则覆盖原文件
            
        Returns:
            处理后的图片路径
        """
        try:
            with Image.open(image_path) as img:
                # 转换为RGB模式（如果是RGBA）
                if img.mode in ('RGBA', 'LA', 'P'):
                    img = img.convert('RGB')
                
                # 调整大小（保持宽高比）
                img.thumbnail(self.max_size, Image.Resampling.LANCZOS)
                
                # 确定输出路径
                if output_path is None:
                    output_path = image_path
                
                # 保存图片
                img.save(output_path, 'JPEG', quality=self.quality, optimize=True)
                
                return output_path
                
        except Exception as e:
            print(f"图片处理失败: {e}")
            return image_path  # 返回原路径
    
    def get_image_info(self, image_path: str) -> dict:
        """
        获取图片信息
        
        Args:
            image_path: 图片路径
            
        Returns:
            图片信息字典
        """
        try:
            with Image.open(image_path) as img:
                return {
                    'width': img.width,
                    'height': img.height,
                    'format': img.format,
                    'mode': img.mode,
                    'size': os.path.getsize(image_path)
                }
        except Exception as e:
            print(f"获取图片信息失败: {e}")
            return {}
    
    def validate_image(self, image_path: str) -> bool:
        """
        验证图片是否有效
        
        Args:
            image_path: 图片路径
            
        Returns:
            是否为有效图片
        """
        try:
            with Image.open(image_path) as img:
                img.verify()
            return True
        except Exception:
            return False

# 全局实例
image_processor = ImageProcessor()