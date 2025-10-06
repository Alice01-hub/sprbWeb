#!/usr/bin/env python3
"""
环境变量加载器
用于加载 .env 文件中的环境变量
"""

import os
from pathlib import Path
from typing import Optional

def load_env_file(env_file_path: Optional[str] = None) -> bool:
    """
    加载 .env 文件中的环境变量
    
    Args:
        env_file_path: .env 文件路径，如果为 None 则自动查找
        
    Returns:
        bool: 是否成功加载
    """
    if env_file_path is None:
        # 自动查找 .env 文件
        current_dir = Path(__file__).parent.parent  # 回到项目根目录
        env_file_path = current_dir / '.env'
    
    env_file = Path(env_file_path)
    
    if not env_file.exists():
        print(f"⚠️  .env 文件不存在: {env_file}")
        return False
    
    try:
        with open(env_file, 'r', encoding='utf-8') as f:
            for line_num, line in enumerate(f, 1):
                line = line.strip()
                
                # 跳过空行和注释
                if not line or line.startswith('#'):
                    continue
                
                # 解析键值对
                if '=' in line:
                    key, value = line.split('=', 1)
                    key = key.strip()
                    value = value.strip()
                    
                    # 移除引号
                    if value.startswith('"') and value.endswith('"'):
                        value = value[1:-1]
                    elif value.startswith("'") and value.endswith("'"):
                        value = value[1:-1]
                    
                    # 设置环境变量（如果尚未设置）
                    if key not in os.environ:
                        os.environ[key] = value
                        print(f"✅ 加载环境变量: {key}")
                    else:
                        print(f"ℹ️  环境变量已存在，跳过: {key}")
                else:
                    print(f"⚠️  第 {line_num} 行格式错误: {line}")
        
        print(f"🎉 成功加载 .env 文件: {env_file}")
        return True
        
    except Exception as e:
        print(f"❌ 加载 .env 文件失败: {e}")
        return False

def get_supabase_config():
    """
    获取 Supabase 配置
    
    Returns:
        dict: Supabase 配置字典
    """
    return {
        'url': os.getenv('SUPABASE_URL', 'https://kcqcljzazatopmoifqzt.supabase.co'),
        'public_key': os.getenv('SUPABASE_PUBLIC_KEY', 'sb_publishable_VCpD0kHRMM18T7WMnrUmIA_hNoDZ229'),
        'secret_key': os.getenv('SUPABASE_SECRET_KEY', 'sb_secret_R48SqAB3HuyR-nq2QLq6Ag_NRPTIX_V')
    }

if __name__ == "__main__":
    # 测试环境变量加载
    print("🔍 测试环境变量加载...")
    success = load_env_file()
    
    if success:
        print("\n📋 当前 Supabase 配置:")
        config = get_supabase_config()
        for key, value in config.items():
            if 'key' in key:
                print(f"  {key}: {value[:20]}...")
            else:
                print(f"  {key}: {value}")
    else:
        print("❌ 环境变量加载失败")
