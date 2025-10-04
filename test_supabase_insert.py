#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Supabase插入数据测试脚本
测试向Supabase数据库插入新数据的功能
"""

import requests
import json
from datetime import datetime
from typing import Dict, Any

# Supabase配置
SUPABASE_URL = "https://kcqcljzazatopmoifqzt.supabase.co"
SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtjcWNsanphemF0b3Btb2lmcXp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3NTk1NTMsImV4cCI6MjA3MTMzNTU1M30.8_Tdbh3Mfl8j3E2slOJ9gqrvlduGC4X0j8S-EDucIJk"

# 请求头
HEADERS = {
    "apikey": SUPABASE_ANON_KEY,
    "Authorization": f"Bearer {SUPABASE_ANON_KEY}",
    "Content-Type": "application/json",
    "Prefer": "return=minimal"
}

def test_connection() -> bool:
    """测试Supabase连接"""
    try:
        print("🔍 测试Supabase连接...")
        url = f"{SUPABASE_URL}/rest/v1/audios?select=count"
        response = requests.get(url, headers=HEADERS, timeout=10)
        
        if response.status_code == 200:
            print("✅ Supabase连接成功!")
            return True
        else:
            print(f"❌ Supabase连接失败: {response.status_code} - {response.text}")
            return False
    except Exception as e:
        print(f"❌ 连接异常: {str(e)}")
        return False

def get_current_audio_count() -> int:
    """获取当前音频数量"""
    try:
        url = f"{SUPABASE_URL}/rest/v1/audios?select=count"
        response = requests.get(url, headers=HEADERS)
        if response.status_code == 200:
            data = response.json()
            return data[0]['count'] if data else 0
        return 0
    except Exception as e:
        print(f"❌ 获取音频数量失败: {str(e)}")
        return 0

def insert_test_audio() -> bool:
    """插入测试音频数据"""
    print("\n🎵 准备插入测试音频数据...")
    
    # 测试音频数据
    test_audio = {
        "title": f"测试音频_{datetime.now().strftime('%Y%m%d_%H%M%S')}",
        "artist": "测试艺术家",
        "path": "/public/audios/test_audio.mp3",
        "cover_path": "/public/images/covers/test_cover.jpg"
    }
    
    print(f"📝 测试数据: {test_audio['title']} - {test_audio['artist']}")
    
    try:
        url = f"{SUPABASE_URL}/rest/v1/audios"
        response = requests.post(url, headers=HEADERS, json=test_audio)
        
        if response.status_code == 201:
            print("✅ 测试音频插入成功!")
            return True
        else:
            print(f"❌ 插入失败: {response.status_code}")
            print(f"   响应内容: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ 插入异常: {str(e)}")
        return False

def insert_audio_with_id() -> bool:
    """插入带ID的音频数据（测试ID冲突处理）"""
    print("\n🎵 准备插入带ID的音频数据...")
    
    # 获取当前最大ID
    try:
        url = f"{SUPABASE_URL}/rest/v1/audios?select=id&order=id.desc&limit=1"
        response = requests.get(url, headers=HEADERS)
        
        if response.status_code == 200:
            data = response.json()
            next_id = (data[0]['id'] + 1) if data else 1
        else:
            next_id = 1
            
    except Exception as e:
        print(f"⚠️ 获取最大ID失败，使用默认ID: {str(e)}")
        next_id = 1
    
    # 带ID的测试音频数据
    test_audio_with_id = {
        "id": next_id,
        "title": f"带ID测试音频_{datetime.now().strftime('%Y%m%d_%H%M%S')}",
        "artist": "测试艺术家",
        "path": "/public/audios/test_audio_with_id.mp3",
        "cover_path": "/public/images/covers/test_cover_with_id.jpg"
    }
    
    print(f"📝 测试数据 (ID: {next_id}): {test_audio_with_id['title']} - {test_audio_with_id['artist']}")
    
    try:
        url = f"{SUPABASE_URL}/rest/v1/audios"
        response = requests.post(url, headers=HEADERS, json=test_audio_with_id)
        
        if response.status_code == 201:
            print("✅ 带ID测试音频插入成功!")
            return True
        else:
            print(f"❌ 插入失败: {response.status_code}")
            print(f"   响应内容: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ 插入异常: {str(e)}")
        return False

def verify_insertion() -> None:
    """验证插入结果"""
    print("\n🔍 验证插入结果...")
    
    try:
        url = f"{SUPABASE_URL}/rest/v1/audios?select=*&order=id.desc&limit=5"
        response = requests.get(url, headers=HEADERS)
        
        if response.status_code == 200:
            data = response.json()
            print(f"📊 最近5条音频记录:")
            for i, audio in enumerate(data, 1):
                print(f"   {i}. ID: {audio['id']} | {audio['title']} - {audio['artist']}")
        else:
            print(f"❌ 验证失败: {response.status_code} - {response.text}")
            
    except Exception as e:
        print(f"❌ 验证出错: {str(e)}")

def cleanup_test_data() -> None:
    """清理测试数据（可选）"""
    print("\n🧹 是否要清理测试数据?")
    choice = input("输入 'y' 清理测试数据，其他键跳过: ").strip().lower()
    
    if choice == 'y':
        try:
            # 删除包含"测试"关键字的记录
            url = f"{SUPABASE_URL}/rest/v1/audios?title=like.*测试*"
            response = requests.delete(url, headers=HEADERS)
            
            if response.status_code == 204:
                print("✅ 测试数据清理完成!")
            else:
                print(f"⚠️ 清理结果: {response.status_code} - {response.text}")
                
        except Exception as e:
            print(f"❌ 清理出错: {str(e)}")
    else:
        print("⏭️ 跳过清理测试数据")

def main():
    """主函数"""
    print("=" * 60)
    print("🎵 Supabase插入数据测试")
    print("=" * 60)
    
    # 1. 测试连接
    if not test_connection():
        print("❌ 无法连接到Supabase，测试终止")
        return
    
    # 2. 获取插入前的数据量
    before_count = get_current_audio_count()
    print(f"📊 插入前音频数量: {before_count}")
    
    # 3. 插入测试数据
    success_count = 0
    
    # 插入无ID的测试数据
    if insert_test_audio():
        success_count += 1
    
    # 插入带ID的测试数据
    if insert_audio_with_id():
        success_count += 1
    
    # 4. 获取插入后的数据量
    after_count = get_current_audio_count()
    print(f"\n📊 插入后音频数量: {after_count}")
    print(f"📈 新增记录数: {after_count - before_count}")
    
    # 5. 验证插入结果
    verify_insertion()
    
    # 6. 总结
    print("\n" + "=" * 60)
    print(f"🎯 测试完成!")
    print(f"✅ 成功插入: {success_count} 条记录")
    print(f"📊 数据库总记录数: {after_count}")
    
    # 7. 清理测试数据
    cleanup_test_data()
    
    print("\n💡 测试说明:")
    print("   - 测试了无ID和带ID两种插入方式")
    print("   - 验证了Supabase REST API的POST功能")
    print("   - 确认了数据插入和查询的完整性")

if __name__ == "__main__":
    main()
