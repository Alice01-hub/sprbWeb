#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
音频数据迁移脚本 - 将OSS上的音频资源数据导入到Supabase audios表
作者: AI助手
目的: 替换前端代码中的硬编码音频数据，改为从数据库动态获取
"""

import json
import requests
import urllib.parse
from typing import List, Dict

# Supabase配置
SUPABASE_URL = "https://kcqcljzazatopmoifqzt.supabase.co"
SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtjcWNsanphemF0b3Btb2lmcXp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3NTk1NTMsImV4cCI6MjA3MTMzNTU1M30.8_Tdbh3Mfl8j3E2slOJ9gqrvlduGC4X0j8S-EDucIJk"

# OSS配置
# 注意：这里只存储相对路径，不包含域名
# 前端会根据环境配置动态拼接完整URL
OSS_BASE_URL = "https://oss.sprb.love"  # 仅用于参考，实际存储时不使用
OSS_AUDIO_BASE = "/public/audios"
OSS_IMAGE_BASE = "/public/images"

# 音频数据（从MusicContext.tsx中提取）
AUDIO_DATA = [
    {
        "id": 1,
        "title": "Summer Pockets",
        "artist": "水月陵",
        "filename": "1-水月陵 - Summer Pockets.mp3",
        "cover_filename": "1-summerpockets.webp"
    },
    {
        "id": 2,
        "title": "Sea, You & Me",
        "artist": "麻枝准",
        "filename": "2-麻枝准 - Sea, You & Me.mp3",
        "cover_filename": "2-sea-you-me.webp"
    },
    {
        "id": 3,
        "title": "アルカテイル",
        "artist": "鈴木このみ",
        "filename": "3-鈴木このみ,VISUAL ARTS  Key - アルカテイル.mp3",
        "cover_filename": "3-op.webp"
    },
    {
        "id": 4,
        "title": "夜は短く、空は遠くて…",
        "artist": "水月陵",
        "filename": "4-水月陵 - 夜は短く、空は遠くて….mp3",
        "cover_filename": "4-saikai.webp"
    },
    {
        "id": 5,
        "title": "比翼の蝶たち",
        "artist": "高森奈津美",
        "filename": "5-高森奈津美 - 比翼の蝶たち.mp3",
        "cover_filename": "5-空门苍.webp"
    },
    {
        "id": 6,
        "title": "Departure!",
        "artist": "嶺内ともみ",
        "filename": "6-嶺内ともみ - Departure!.mp3",
        "cover_filename": "6-久岛鸥.webp"
    },
    {
        "id": 7,
        "title": "with",
        "artist": "嶺内ともみ",
        "filename": "7-嶺内ともみ - with.mp3",
        "cover_filename": "7-with.webp"
    },
    {
        "id": 8,
        "title": "夏に君を待ちながら",
        "artist": "小原好美",
        "filename": "8-小原好美 - 夏に君を待ちながら.mp3",
        "cover_filename": "8-白羽.webp"
    },
    {
        "id": 9,
        "title": "紬の夏休み",
        "artist": "岩井映美里",
        "filename": "9-岩井映美里,VISUAL ARTS  Key - 紬の夏休み.mp3",
        "cover_filename": "9-紬的暑假.webp"
    },
    {
        "id": 10,
        "title": "Golden Hours",
        "artist": "岩井映美里",
        "filename": "10-岩井映美里 - Golden Hours.mp3",
        "cover_filename": "10-golden-hours.webp"
    },
    {
        "id": 11,
        "title": "魔法の絵日記",
        "artist": "小原好美",
        "filename": "11-鳴瀬しろは(CV.小原好美),加藤うみ(CV.田中あいみ),VISUAL ARTS  Key - 魔法の絵日記.mp3",
        "cover_filename": "11-魔法日记本.webp"
    },
    {
        "id": 12,
        "title": "Don't Cry Red",
        "artist": "Fairouz Ai",
        "filename": "12-神山識(CV.ファイルーズあい),VISUAL ARTS  Key - Don't Cry Red.mp3",
        "cover_filename": "12-神山识.webp"
    },
    {
        "id": 13,
        "title": "柔らかい記憶",
        "artist": "小山さほみ",
        "filename": "13-水織静久(CV.小山さほみ),VISUAL ARTS  Key - 柔らかい記憶.mp3",
        "cover_filename": "13-水织静久.webp"
    },
    {
        "id": 14,
        "title": "しろはの子守歌",
        "artist": "小原好美",
        "filename": "14-小原好美,VISUAL ARTS  Key - しろはの子守歌.mp3",
        "cover_filename": "14-白羽的摇篮曲.webp"
    },
    {
        "id": 15,
        "title": "Dear Familiar",
        "artist": "一宮朔",
        "filename": "15-野村美樹(CV.一宮朔),VISUAL ARTS  Key - Dear Familiar.mp3",
        "cover_filename": "15-野美希.webp"
    },
    {
        "id": 16,
        "title": "フィニステラー",
        "artist": "鈴木このみ",
        "filename": "16-鈴木このみ,VISUAL ARTS  Key - フィニステラー.mp3",
        "cover_filename": "16-加藤羽未.webp"
    }
]

def build_audio_path(filename: str) -> str:
    """构建音频文件的相对路径"""
    # URL编码文件名
    encoded_filename = urllib.parse.quote(filename.encode('utf-8'))
    return f"{OSS_AUDIO_BASE}/{encoded_filename}"

def build_cover_path(filename: str) -> str:
    """构建封面图片的相对路径"""
    return f"{OSS_IMAGE_BASE}/covers/{filename}"

def insert_audio_to_supabase(audio_data: Dict) -> bool:
    """将单个音频数据插入到Supabase"""
    
    # 构建相对路径
    audio_path = build_audio_path(audio_data["filename"])
    cover_path = build_cover_path(audio_data["cover_filename"])
    
    # 准备插入数据
    insert_data = {
        "id": audio_data["id"],
        "title": audio_data["title"],
        "artist": audio_data["artist"],
        "path": audio_path,
        "cover_path": cover_path
    }
    
    # Supabase REST API headers
    headers = {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": f"Bearer {SUPABASE_ANON_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=minimal"
    }
    
    # 发送POST请求
    url = f"{SUPABASE_URL}/rest/v1/audios"
    
    try:
        response = requests.post(url, headers=headers, json=insert_data)
        
        if response.status_code == 201:
            print(f"✅ 成功插入: {audio_data['title']} - {audio_data['artist']}")
            return True
        else:
            print(f"❌ 插入失败: {audio_data['title']}")
            print(f"   状态码: {response.status_code}")
            print(f"   响应: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ 插入出错: {audio_data['title']} - {str(e)}")
        return False

def clear_audios_table() -> bool:
    """清空audios表（可选）"""
    headers = {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": f"Bearer {SUPABASE_ANON_KEY}",
        "Content-Type": "application/json"
    }
    
    # 删除所有记录
    url = f"{SUPABASE_URL}/rest/v1/audios?id=gte.0"
    
    try:
        response = requests.delete(url, headers=headers)
        if response.status_code == 204:
            print("✅ 已清空audios表")
            return True
        else:
            print(f"❌ 清空表失败: {response.status_code} - {response.text}")
            return False
    except Exception as e:
        print(f"❌ 清空表出错: {str(e)}")
        return False

def verify_insertion() -> None:
    """验证数据是否成功插入"""
    headers = {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": f"Bearer {SUPABASE_ANON_KEY}",
        "Content-Type": "application/json"
    }
    
    url = f"{SUPABASE_URL}/rest/v1/audios?select=*"
    
    try:
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            data = response.json()
            print(f"\n📊 数据库中共有 {len(data)} 条音频记录:")
            for audio in data:
                print(f"   {audio['id']}: {audio['title']} - {audio['artist']}")
        else:
            print(f"❌ 验证失败: {response.status_code} - {response.text}")
    except Exception as e:
        print(f"❌ 验证出错: {str(e)}")

def main():
    """主函数"""
    print("🎵 开始迁移音频数据到Supabase...")
    print(f"📂 目标表: audios")
    print(f"📝 待插入记录数: {len(AUDIO_DATA)}")
    print("-" * 50)
    
    # 询问是否清空表
    clear_table = input("❓ 是否要清空现有的audios表? (y/N): ").strip().lower()
    if clear_table == 'y':
        if not clear_audios_table():
            print("❌ 清空表失败，终止操作")
            return
    
    # 插入数据
    success_count = 0
    failed_count = 0
    
    for i, audio in enumerate(AUDIO_DATA, 1):
        print(f"\n[{i}/{len(AUDIO_DATA)}] 正在插入: {audio['title']}")
        
        if insert_audio_to_supabase(audio):
            success_count += 1
        else:
            failed_count += 1
    
    # 输出结果
    print("\n" + "="*50)
    print(f"🎯 迁移完成!")
    print(f"✅ 成功: {success_count} 条")
    print(f"❌ 失败: {failed_count} 条")
    
    if success_count > 0:
        print("\n🔍 验证插入结果...")
        verify_insertion()
        
        print("\n📝 接下来需要修改前端代码:")
        print("   1. 创建API接口从Supabase获取音频数据")
        print("   2. 修改MusicContext.tsx移除硬编码数据")
        print("   3. 测试音频播放功能")
        print("\n💡 设计说明:")
        print("   - 数据库中存储的是相对路径，如: /public/audios/文件名.mp3")
        print("   - 前端会根据OSS_CONFIG动态拼接完整URL")
        print("   - 这样设计便于后续更改OSS域名，无需修改数据库")

if __name__ == "__main__":
    main()
