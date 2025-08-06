"""
七影蝶标题服务模块
"""
import random
from typing import List

class ButterflyTitleService:
    """七影蝶标题生成服务"""
    
    def __init__(self):
        # 预设的七影蝶标题列表
        self.default_titles = [
            "夏日的回忆",
            "海风中的蝴蝶",
            "岛屿的秘密",
            "黄昏时分",
            "星空下的约定",
            "温柔的夏夜",
            "蔚蓝的梦境",
            "时光的碎片",
            "永恒的夏天",
            "心中的小岛",
            "微风轻抚",
            "波光粼粼",
            "夕阳西下",
            "月光如水",
            "花香阵阵"
        ]
    
    def get_random_title(self) -> str:
        """
        获取随机标题
        
        Returns:
            随机选择的标题
        """
        return random.choice(self.default_titles)
    
    def get_all_titles(self) -> List[str]:
        """
        获取所有预设标题
        
        Returns:
            所有标题列表
        """
        return self.default_titles.copy()
    
    def validate_title(self, title: str) -> bool:
        """
        验证标题是否有效
        
        Args:
            title: 要验证的标题
            
        Returns:
            是否为有效标题
        """
        if not title or not isinstance(title, str):
            return False
        
        # 检查长度
        if len(title.strip()) == 0 or len(title) > 200:
            return False
        
        # 检查是否包含敏感词（这里可以扩展）
        forbidden_words = ['测试', 'test', '垃圾', '废物']
        title_lower = title.lower()
        
        for word in forbidden_words:
            if word in title_lower:
                return False
        
        return True
    
    def suggest_titles(self, keyword: str = "") -> List[str]:
        """
        根据关键词建议标题
        
        Args:
            keyword: 关键词
            
        Returns:
            建议的标题列表
        """
        if not keyword:
            return random.sample(self.default_titles, min(5, len(self.default_titles)))
        
        # 简单的关键词匹配
        keyword_lower = keyword.lower()
        matched_titles = []
        
        for title in self.default_titles:
            if keyword_lower in title.lower():
                matched_titles.append(title)
        
        # 如果没有匹配的，返回随机标题
        if not matched_titles:
            matched_titles = random.sample(self.default_titles, min(3, len(self.default_titles)))
        
        return matched_titles

# 全局实例
butterfly_title_service = ButterflyTitleService()