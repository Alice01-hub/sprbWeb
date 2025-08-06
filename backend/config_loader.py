"""
配置加载器模块
"""
import os
import json
from typing import Dict, Any, Optional

class ConfigLoader:
    """配置加载器"""
    
    _config = None
    
    @classmethod
    def load(cls, config_path: Optional[str] = None) -> Dict[str, Any]:
        """
        加载配置文件
        
        Args:
            config_path: 配置文件路径，如果为None则使用默认配置
            
        Returns:
            配置字典
        """
        if cls._config is not None:
            return cls._config
        
        # 默认配置
        default_config = {
            "environment": os.getenv("ENVIRONMENT", "development"),
            "debug": os.getenv("DEBUG", "true").lower() == "true",
            "database": {
                "path": os.getenv("DATABASE_PATH", "data/shenyu.db"),
                "echo": os.getenv("DATABASE_ECHO", "false").lower() == "true"
            },
            "logging": {
                "level": os.getenv("LOG_LEVEL", "INFO"),
                "format": "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
            },
            "security": {
                "secret_key": os.getenv("SECRET_KEY", "your-secret-key-here"),
                "algorithm": "HS256",
                "access_token_expire_minutes": 30
            },
            "upload": {
                "max_file_size": 10 * 1024 * 1024,  # 10MB
                "allowed_extensions": [".jpg", ".jpeg", ".png", ".gif", ".webp"],
                "upload_path": "uploads"
            },
            "performance": {
                "max_history_size": 1000,
                "monitoring_enabled": True
            }
        }
        
        # 如果指定了配置文件路径，尝试加载
        if config_path and os.path.exists(config_path):
            try:
                with open(config_path, 'r', encoding='utf-8') as f:
                    file_config = json.load(f)
                    # 合并配置
                    cls._merge_config(default_config, file_config)
            except Exception as e:
                print(f"Warning: Failed to load config file {config_path}: {e}")
        
        cls._config = default_config
        return cls._config
    
    @classmethod
    def _merge_config(cls, base: Dict[str, Any], override: Dict[str, Any]) -> None:
        """
        递归合并配置字典
        
        Args:
            base: 基础配置字典
            override: 覆盖配置字典
        """
        for key, value in override.items():
            if key in base and isinstance(base[key], dict) and isinstance(value, dict):
                cls._merge_config(base[key], value)
            else:
                base[key] = value
    
    @classmethod
    def get(cls, key: str, default: Any = None) -> Any:
        """
        获取配置值
        
        Args:
            key: 配置键，支持点号分隔的嵌套键
            default: 默认值
            
        Returns:
            配置值
        """
        config = cls.load()
        
        # 支持点号分隔的嵌套键
        keys = key.split('.')
        value = config
        
        for k in keys:
            if isinstance(value, dict) and k in value:
                value = value[k]
            else:
                return default
        
        return value
    
    @classmethod
    def reload(cls) -> Dict[str, Any]:
        """
        重新加载配置
        
        Returns:
            新的配置字典
        """
        cls._config = None
        return cls.load()