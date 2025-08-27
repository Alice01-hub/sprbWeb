#!/usr/bin/env python3
"""
测试API连接的简单脚本
"""

import requests
import time

def test_api():
    """测试API连接"""
    base_url = "http://127.0.0.1:8000"
    
    print("🔍 测试API连接...")
    
    # 测试健康检查
    try:
        response = requests.get(f"{base_url}/health", timeout=5)
        print(f"✅ 健康检查: {response.status_code}")
        print(f"   响应: {response.json()}")
    except Exception as e:
        print(f"❌ 健康检查失败: {e}")
    
    # 测试音频API
    try:
        response = requests.get(f"{base_url}/api/audios", timeout=5)
        print(f"✅ 音频API: {response.status_code}")
        print(f"   响应: {response.json()}")
    except Exception as e:
        print(f"❌ 音频API失败: {e}")
    
    # 测试根路径
    try:
        response = requests.get(f"{base_url}/", timeout=5)
        print(f"✅ 根路径: {response.status_code}")
    except Exception as e:
        print(f"❌ 根路径失败: {e}")

if __name__ == "__main__":
    test_api()
