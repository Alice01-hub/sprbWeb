#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
音频服务模块 - 从Supabase获取音频数据
"""

import os
import requests
import logging
from typing import List, Dict, Optional
from fastapi import HTTPException
from datetime import datetime

# 配置日志
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class AudioService:
    def __init__(self):
        # 从环境变量读取Supabase配置
        self.supabase_url = os.getenv("SUPABASE_URL", "https://kcqcljzazatopmoifqzt.supabase.co")
        self.supabase_anon_key = os.getenv("SUPABASE_PUBLIC_KEY", "sb_publishable_VCpD0kHRMM18T7WMnrUmIA_hNoDZ229")
        
        # 请求头
        self.headers = {
            "apikey": self.supabase_anon_key,
            "Authorization": f"Bearer {self.supabase_anon_key}",
            "Content-Type": "application/json"
        }
        
        # OSS基础URL
        self.oss_base_url = "https://oss.sprb.love"
        
        logger.info(f"AudioService初始化完成 - Supabase URL: {self.supabase_url}")
    
    def test_connection(self) -> bool:
        """测试Supabase连接"""
        try:
            url = f"{self.supabase_url}/rest/v1/audios?select=count"
            response = requests.get(url, headers=self.headers, timeout=10)
            if response.status_code == 200:
                logger.info("Supabase连接测试成功")
                return True
            else:
                logger.error(f"Supabase连接测试失败: {response.status_code} - {response.text}")
                return False
        except Exception as e:
            logger.error(f"Supabase连接测试异常: {str(e)}")
            return False
    
    def get_all_audios(self) -> Optional[List[Dict]]:
        """获取所有音频数据"""
        try:
            logger.info("开始获取所有音频数据...")
            url = f"{self.supabase_url}/rest/v1/audios?select=*&order=id.asc"
            
            response = requests.get(url, headers=self.headers, timeout=15)
            logger.info(f"Supabase响应状态码: {response.status_code}")
            
            if response.status_code == 200:
                audios = response.json()
                logger.info(f"成功获取 {len(audios)} 首音频")
                return audios
            else:
                logger.error(f"获取音频数据失败: {response.status_code} - {response.text}")
                return None
                
        except requests.exceptions.Timeout:
            logger.error("请求超时")
            return None
        except requests.exceptions.ConnectionError:
            logger.error("连接错误")
            return None
        except Exception as e:
            logger.error(f"获取音频数据出错: {str(e)}")
            return None
    
    def get_audio_by_id(self, audio_id: int) -> Optional[Dict]:
        """根据ID获取单个音频数据"""
        try:
            logger.info(f"开始获取音频ID: {audio_id}")
            url = f"{self.supabase_url}/rest/v1/audios?id=eq.{audio_id}&select=*"
            
            response = requests.get(url, headers=self.headers, timeout=10)
            logger.info(f"获取音频ID {audio_id} 响应状态码: {response.status_code}")
            
            if response.status_code == 200:
                data = response.json()
                if data:
                    logger.info(f"成功获取音频ID {audio_id}: {data[0].get('title', 'Unknown')}")
                    return data[0]
                else:
                    logger.warning(f"音频ID {audio_id} 不存在")
                    return None
            else:
                logger.error(f"获取音频数据失败: {response.status_code} - {response.text}")
                return None
                
        except Exception as e:
            logger.error(f"获取音频ID {audio_id} 出错: {str(e)}")
            return None
    
    def format_audio_for_frontend(self, audio_data: Dict) -> Dict:
        """将数据库数据格式化为前端需要的格式"""
        try:
            # 验证必要字段
            required_fields = ['id', 'title', 'artist', 'path', 'cover_path']
            for field in required_fields:
                if field not in audio_data:
                    logger.warning(f"音频数据缺少字段: {field}")
                    audio_data[field] = "Unknown"
            
            # 构建完整URL
            audio_url = f"{self.oss_base_url}{audio_data['path']}"
            cover_url = f"{self.oss_base_url}{audio_data['cover_path']}"
            
            formatted_audio = {
                "id": audio_data["id"],
                "title": audio_data["title"],
                "artist": audio_data["artist"],
                "src": audio_url,
                "cover": cover_url,
                "duration": 0,  # 前端会动态获取
                "path": audio_data["path"],
                "cover_path": audio_data["cover_path"]
            }
            
            logger.debug(f"格式化音频: {formatted_audio['title']} - {audio_url}")
            return formatted_audio
            
        except Exception as e:
            logger.error(f"格式化音频数据出错: {str(e)}")
            return {
                "id": audio_data.get("id", 0),
                "title": "Error",
                "artist": "Unknown",
                "src": "",
                "cover": "",
                "duration": 0,
                "error": str(e)
            }
    
    def get_formatted_audios(self) -> List[Dict]:
        """获取格式化后的音频数据列表"""
        try:
            audios = self.get_all_audios()
            if audios:
                formatted_audios = []
                for audio in audios:
                    formatted_audio = self.format_audio_for_frontend(audio)
                    if "error" not in formatted_audio:
                        formatted_audios.append(formatted_audio)
                
                logger.info(f"成功格式化 {len(formatted_audios)} 首音频")
                return formatted_audios
            else:
                logger.warning("没有获取到音频数据")
                return []
        except Exception as e:
            logger.error(f"格式化音频列表出错: {str(e)}")
            return []

# 创建全局实例
audio_service = AudioService()

def get_audios_api():
    """FastAPI路由函数 - 获取所有音频"""
    try:
        logger.info("API调用: 获取所有音频")
        
        # 测试连接
        if not audio_service.test_connection():
            logger.error("Supabase连接失败")
            raise HTTPException(status_code=503, detail="数据库连接失败")
        
        audios = audio_service.get_formatted_audios()
        
        if audios is None:
            raise HTTPException(status_code=500, detail="获取音频数据失败")
        
        response_data = {
            "success": True,
            "data": audios,
            "count": len(audios),
            "message": f"成功获取 {len(audios)} 首音频",
            "timestamp": datetime.now().isoformat()
        }
        
        logger.info(f"API响应: 返回 {len(audios)} 首音频")
        return response_data
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"获取音频API出错: {str(e)}")
        raise HTTPException(status_code=500, detail=f"服务器内部错误: {str(e)}")

def get_audio_by_id_api(audio_id: int):
    """FastAPI路由函数 - 根据ID获取音频"""
    try:
        logger.info(f"API调用: 获取音频ID {audio_id}")
        
        # 测试连接
        if not audio_service.test_connection():
            logger.error("Supabase连接失败")
            raise HTTPException(status_code=503, detail="数据库连接失败")
        
        audio = audio_service.get_audio_by_id(audio_id)
        
        if audio:
            formatted_audio = audio_service.format_audio_for_frontend(audio)
            response_data = {
                "success": True,
                "data": formatted_audio,
                "message": f"成功获取音频: {formatted_audio['title']}",
                "timestamp": datetime.now().isoformat()
            }
            
            logger.info(f"API响应: 返回音频 {formatted_audio['title']}")
            return response_data
        else:
            logger.warning(f"音频ID {audio_id} 不存在")
            raise HTTPException(status_code=404, detail=f"音频ID {audio_id} 不存在")
            
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"获取音频ID {audio_id} API出错: {str(e)}")
        raise HTTPException(status_code=500, detail=f"服务器内部错误: {str(e)}")
