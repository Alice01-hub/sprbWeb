#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
神域页面服务模块 - 从Supabase获取神域场景数据
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

class DivineRealmService:
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
        
        logger.info(f"DivineRealmService初始化完成 - Supabase URL: {self.supabase_url}")
    
    def test_connection(self) -> bool:
        """测试Supabase连接"""
        try:
            url = f"{self.supabase_url}/rest/v1/DivineRealmPage_graph?select=count"
            response = requests.get(url, headers=self.headers, timeout=10)
            if response.status_code == 200:
                logger.info("Supabase神域数据连接测试成功")
                return True
            else:
                logger.error(f"Supabase神域数据连接测试失败: {response.status_code} - {response.text}")
                return False
        except Exception as e:
            logger.error(f"Supabase神域数据连接测试异常: {str(e)}")
            return False
    
    def get_all_scenes(self) -> Optional[List[Dict]]:
        """获取所有神域场景数据"""
        try:
            url = f"{self.supabase_url}/rest/v1/DivineRealmPage_graph"
            params = {
                "select": "id,created_at,graph_url,is_published,graph_name",
                "is_published": "eq.true",
                "order": "created_at.desc"
            }
            
            response = requests.get(url, headers=self.headers, params=params, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                logger.info(f"成功获取神域场景数据: {len(data)} 条记录")
                return data
            else:
                logger.error(f"获取神域场景数据失败: {response.status_code} - {response.text}")
                return None
                
        except Exception as e:
            logger.error(f"获取神域场景数据异常: {str(e)}")
            return None
    
    def get_scene_by_id(self, scene_id: int) -> Optional[Dict]:
        """根据ID获取单个神域场景"""
        try:
            url = f"{self.supabase_url}/rest/v1/DivineRealmPage_graph"
            params = {
                "select": "id,created_at,graph_url,is_published,graph_name",
                "id": f"eq.{scene_id}",
                "is_published": "eq.true"
            }
            
            response = requests.get(url, headers=self.headers, params=params, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data:
                    logger.info(f"成功获取神域场景: {data[0]['graph_name']}")
                    return data[0]
                else:
                    logger.warning(f"未找到ID为 {scene_id} 的神域场景")
                    return None
            else:
                logger.error(f"获取神域场景失败: {response.status_code} - {response.text}")
                return None
                
        except Exception as e:
            logger.error(f"获取神域场景异常: {str(e)}")
            return None
    
    def get_random_scene(self) -> Optional[Dict]:
        """获取随机神域场景"""
        try:
            # 先获取所有已发布的场景
            all_scenes = self.get_all_scenes()
            if not all_scenes or len(all_scenes) == 0:
                logger.warning("没有可用的神域场景")
                return None
            
            # 随机选择一个场景
            import random
            random_scene = random.choice(all_scenes)
            logger.info(f"随机选择神域场景: {random_scene['graph_name']}")
            return random_scene
            
        except Exception as e:
            logger.error(f"获取随机神域场景异常: {str(e)}")
            return None

# 创建服务实例
divine_realm_service = DivineRealmService()

# API接口函数
async def get_divine_scenes_api():
    """获取所有神域场景API"""
    try:
        scenes = divine_realm_service.get_all_scenes()
        if scenes is None:
            raise HTTPException(status_code=500, detail="获取神域场景数据失败")
        
        return {
            "success": True,
            "data": scenes,
            "count": len(scenes),
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        logger.error(f"获取神域场景API异常: {str(e)}")
        raise HTTPException(status_code=500, detail=f"获取神域场景数据失败: {str(e)}")

async def get_random_scene_api():
    """获取随机神域场景API"""
    try:
        scene = divine_realm_service.get_random_scene()
        if scene is None:
            raise HTTPException(status_code=404, detail="没有可用的神域场景")
        
        return {
            "success": True,
            "data": scene,
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        logger.error(f"获取随机神域场景API异常: {str(e)}")
        raise HTTPException(status_code=500, detail=f"获取随机神域场景失败: {str(e)}")

async def get_scene_by_id_api(scene_id: int):
    """根据ID获取神域场景API"""
    try:
        scene = divine_realm_service.get_scene_by_id(scene_id)
        if scene is None:
            raise HTTPException(status_code=404, detail=f"未找到ID为 {scene_id} 的神域场景")
        
        return {
            "success": True,
            "data": scene,
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        logger.error(f"获取神域场景API异常: {str(e)}")
        raise HTTPException(status_code=500, detail=f"获取神域场景失败: {str(e)}")
