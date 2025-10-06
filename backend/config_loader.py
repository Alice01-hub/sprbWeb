#!/usr/bin/env python3
"""
Summer Pockets 巡礼网站 - 简化配置加载器
"""

import os
from pathlib import Path
from typing import Dict, Any

class ConfigLoader:
    """简化的配置加载器"""
    
    @staticmethod
    def load() -> Dict[str, Any]:
        """加载基础配置"""
        config = {
            "environment": os.getenv("ENVIRONMENT", "development"),
            "debug": os.getenv("DEBUG", "true").lower() == "true",
            "log_level": os.getenv("LOG_LEVEL", "INFO"),
            "server": {
                "host": os.getenv("HOST", "127.0.0.1"),
                "port": int(os.getenv("PORT", "8000")),
                "reload": os.getenv("RELOAD", "true").lower() == "true"
            }
        }
        
        return config
    
    
    @staticmethod
    def get_server_config() -> Dict[str, Any]:
        """获取服务器配置"""
        return {
            "host": os.getenv("HOST", "127.0.0.1"),
            "port": int(os.getenv("PORT", "8000")),
            "reload": os.getenv("RELOAD", "true").lower() == "true"
        }