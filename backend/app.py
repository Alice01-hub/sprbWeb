#!/usr/bin/env python3
"""
Summer Pockets 巡礼网站后端API - 简化版本

主要功能：
- 旅游攻略数据管理
- 音乐播放服务
- PDF生成服务
- 基础健康检查

环境支持：
- development: 开发环境
- production: 生产环境
"""

import sys
import os
from pathlib import Path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '.')))
from fastapi import FastAPI, HTTPException, Response
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from pydantic import BaseModel
from typing import List, Optional
import json
import io
from datetime import datetime
import tempfile
# performance_monitor 已移除
from config_loader import ConfigLoader
import psutil

# 导入音频服务
from api.audio_service import get_audios_api, get_audio_by_id_api

# 导入神域服务
from api.divine_realm_service import get_divine_scenes_api, get_random_scene_api, get_scene_by_id_api

app = FastAPI(title="Summer Pockets 巡礼网站 API", version="2.0.0", description="简化版本 - 专注于旅游攻略和音乐服务")

# CORS中间件
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 配置文件夹
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# 加载环境变量
def load_env_file():
    """加载环境变量文件"""
    env_file = Path(__file__).parent.parent / '.env'  # 从项目根目录加载
    if env_file.exists():
        print(f"🔍 加载环境变量文件: {env_file}")
        with open(env_file, 'r', encoding='utf-8') as f:
            for line_num, line in enumerate(f, 1):
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    key, value = line.split('=', 1)
                    key = key.strip()
                    value = value.strip()
                    
                    # 移除引号
                    if value.startswith('"') and value.endswith('"'):
                        value = value[1:-1]
                    elif value.startswith("'") and value.endswith("'"):
                        value = value[1:-1]
                    
                    os.environ[key] = value
                    print(f"✅ 加载环境变量: {key}")
        print("🎉 环境变量加载完成")
    else:
        print(f"⚠️  环境变量文件不存在: {env_file}")

# 在导入其他模块前加载环境变量
load_env_file()

# 设置环境变量默认值
if 'ENVIRONMENT' not in os.environ:
    os.environ['ENVIRONMENT'] = 'development'

if 'DEBUG' not in os.environ:
    os.environ['DEBUG'] = 'true' if os.environ['ENVIRONMENT'] == 'development' else 'false'

if 'LOG_LEVEL' not in os.environ:
    os.environ['LOG_LEVEL'] = 'DEBUG' if os.environ['ENVIRONMENT'] == 'development' else 'INFO'

# Pydantic模型

class AudioFile(BaseModel):
    name: str
    path: str

class MusicTrack(BaseModel):
    id: str
    name: str
    artist: str
    album: str
    duration: Optional[float] = None
    src: str
    cover: Optional[str] = None
    
class PlaylistInfo(BaseModel):
    total: int
    tracks: List[MusicTrack]


# 中文字体处理
def get_font_name():
    """获取支持中文的字体名称"""
    try:
        # 尝试使用系统字体
        possible_fonts = [
            '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',
            '/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf',
            '/usr/share/fonts/truetype/noto/NotoSansCJK-Regular.ttc',
            '/usr/share/fonts/truetype/wqy/wqy-microhei.ttc',
            '/usr/share/fonts/truetype/wqy/wqy-zenhei.ttc',
            '/System/Library/Fonts/PingFang.ttc',
            '/Windows/Fonts/simhei.ttf',
            'fonts/NotoSansCJK-Regular.ttf'
        ]
        
        for font_path in possible_fonts:
            if os.path.exists(font_path):
                try:
                    pdfmetrics.registerFont(TTFont('ChineseFont', font_path))
                    print(f"成功注册字体: {font_path}")
                    return 'ChineseFont'
                except Exception as e:
                    print(f"注册字体失败 {font_path}: {e}")
                    continue
        
        # 如果没有找到中文字体，使用Helvetica并处理中文字符
        print("未找到中文字体，使用Helvetica")
        return 'Helvetica'
    except Exception as e:
        print(f"字体注册失败: {e}")
        return 'Helvetica'

FONT_NAME = get_font_name()

def create_pilgrimage_checklist_pdf():
    """创建巡礼任务清单PDF - 改进版本"""
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=A4, topMargin=50, bottomMargin=50)
    story = []
    styles = getSampleStyleSheet()
    
    # 自定义样式
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Title'],
        fontSize=24,
        spaceAfter=30,
        alignment=1,  # 居中
        fontName=FONT_NAME,
        textColor=colors.HexColor('#FF6B35')
    )
    
    heading_style = ParagraphStyle(
        'CustomHeading',
        parent=styles['Heading2'],
        fontSize=16,
        spaceAfter=12,
        fontName=FONT_NAME,
        textColor=colors.HexColor('#FF6B35')
    )
    
    normal_style = ParagraphStyle(
        'CustomNormal',
        parent=styles['Normal'],
        fontSize=11,
        spaceAfter=6,
        fontName=FONT_NAME,
        leftIndent=20
    )
    
    # 标题
    if FONT_NAME == 'ChineseFont':
        title_text = "Summer Pockets 圣地巡礼任务清单"
        intro_text = "这份清单将帮助您顺利完成 Summer Pockets 的圣地巡礼之旅。请逐项检查并在完成后打勾，确保不遗漏任何重要步骤。"
    else:
        title_text = "Summer Pockets Pilgrimage Checklist"
        intro_text = "This checklist will help you complete your Summer Pockets pilgrimage journey successfully. Please check each item after completion to ensure nothing is missed."
    
    story.append(Paragraph(title_text, title_style))
    story.append(Spacer(1, 20))
    story.append(Paragraph(intro_text, normal_style))
    story.append(Spacer(1, 20))
    
    # 巡礼清单内容
    if FONT_NAME == 'ChineseFont':
        checklist_sections = [
            {
                "title": "✈️ 出行前准备",
                "items": [
                    "护照/签证办理",
                    "机票预订",
                    "住宿预订",
                    "旅行保险购买",
                    "日元兑换/银行卡准备",
                    "手机卡/随身WiFi准备",
                    "行李打包（衣物、药品、充电器等）",
                    "重要文件复印/电子备份"
                ]
            },
            {
                "title": "🚌 机票与交通",
                "items": [
                    "选择出发城市及航班",
                    "机票购买平台比价",
                    "了解行李托运规定",
                    "熟悉值机与登机流程",
                    "了解日本入境流程",
                    "准备交通卡购买",
                    "查询机场换乘信息"
                ]
            },
            {
                "title": "🎌 日本国内行程",
                "items": [
                    "确定机场到高松的交通方式",
                    "查询详细换乘流程",
                    "学习购票机使用方法",
                    "规划景点交通路线",
                    "准备各种路线方案",
                    "下载相关交通APP",
                    "收藏实用网站链接"
                ]
            },
            {
                "title": "📅 行程安排与预算",
                "items": [
                    "制定每日行程计划",
                    "预算分配（交通、住宿、餐饮等）",
                    "预订热门景点门票",
                    "安排购物时间和地点",
                    "制定应急预案",
                    "准备离境相关安排"
                ]
            },
            {
                "title": "🛠️ 实用工具推荐",
                "items": [
                    "Google Maps （路线规划）",
                    "Yahoo!乘换案内 （换乘查询）",
                    "Google Translate （语言翻译）",
                    "日本旅游APP下载",
                    "天气预报查询",
                    "汇率查询工具",
                    "紧急联系方式记录"
                ]
            },
            {
                "title": "🌟 圣地巡礼专项",
                "items": [
                    "女木岛交通及景点信息",
                    "男木岛交通及景点信息",
                    "直岛交通及景点信息",
                    "拍照地点标记",
                    "开放时间确认",
                    "门票或预约信息",
                    "特殊交通工具安排"
                ]
            }
        ]
    else:
        checklist_sections = [
            {
                "title": "Pre-travel Preparation",
                "items": [
                    "Passport/Visa processing",
                    "Flight booking",
                    "Accommodation booking",
                    "Travel insurance purchase",
                    "Yen exchange/bank card preparation",
                    "Phone card/portable WiFi preparation",
                    "Luggage packing (clothes, medicine, charger, etc.)",
                    "Important documents copying/electronic backup"
                ]
            },
            {
                "title": "Flight & Transportation",
                "items": [
                    "Choose departure city and flight",
                    "Flight booking platform comparison",
                    "Understand baggage check-in regulations",
                    "Familiar with check-in and boarding process",
                    "Understand Japanese entry process",
                    "Prepare transportation card purchase",
                    "Query airport transfer information"
                ]
            },
            {
                "title": "Domestic Travel in Japan",
                "items": [
                    "Determine transportation from airport to Takamatsu",
                    "Query detailed transfer process",
                    "Learn how to use ticket machines",
                    "Plan scenic spot transportation routes",
                    "Prepare various route options",
                    "Download relevant transportation APPs",
                    "Bookmark useful website links"
                ]
            },
            {
                "title": "Itinerary Planning & Budget",
                "items": [
                    "Make daily itinerary plan",
                    "Budget allocation (transportation, accommodation, dining, etc.)",
                    "Book popular attraction tickets",
                    "Arrange shopping time and location",
                    "Develop emergency plan",
                    "Prepare departure arrangements"
                ]
            },
            {
                "title": "Practical Tools Recommendation",
                "items": [
                    "Google Maps (route planning)",
                    "Yahoo!乗換案内 (transfer query)",
                    "Google Translate (language translation)",
                    "Japanese travel APP download",
                    "Weather forecast query",
                    "Exchange rate query tool",
                    "Emergency contact record"
                ]
            },
            {
                "title": "Sacred Site Pilgrimage Special",
                "items": [
                    "Megijima transportation and attraction information",
                    "Ogijima transportation and attraction information",
                    "Naoshima transportation and attraction information",
                    "Photo location marking",
                    "Opening hours confirmation",
                    "Ticket or reservation information",
                    "Special transportation arrangements"
                ]
            }
        ]
    
    # 生成清单内容
    for section in checklist_sections:
        story.append(Paragraph(section["title"], heading_style))
        for item in section["items"]:
            checkbox = "☐ " if FONT_NAME == 'ChineseFont' else "☐ "
            story.append(Paragraph(checkbox + item, normal_style))
        story.append(Spacer(1, 15))
    
    # 生成PDF
    doc.build(story)
    buffer.seek(0)
    return buffer

# API端点

@app.get("/api/health")
async def health_check():
    """健康检查端点"""
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "version": "2.0.0",
        "environment": os.getenv("ENVIRONMENT", "development"),
        "description": "Summer Pockets 巡礼网站 API - 简化版本"
    }

@app.get("/api/audio-files")
async def get_audio_files():
    """获取音频文件列表"""
    audio_dir = Path("frontend/public/audio")
    if not audio_dir.exists():
        return {"files": []}
    
    audio_files = []
    for file_path in audio_dir.glob("*"):
        if file_path.is_file() and file_path.suffix.lower() in ['.mp3', '.flac', '.wav', '.ogg']:
            audio_files.append({
                "name": file_path.name,
                "path": f"/audio/{file_path.name}",
                "size": file_path.stat().st_size,
                "type": file_path.suffix.lower()
            })
    
    return {"files": audio_files}

@app.get("/api/music/playlist")
async def get_music_playlist():
    """获取音乐播放列表"""
    try:
        # 从OSS配置获取音乐列表
        music_data = [
            {
                "id": "1",
                "name": "Summer Pockets",
                "artist": "水月陵",
                "album": "Summer Pockets Original Soundtrack",
                "duration": 0,
                "src": "https://oss.sprb.love/audio/1-水月陵 - Summer Pockets.mp3",
                "cover": "https://oss.sprb.love/images/covers/1-summerpockets.webp"
            },
            {
                "id": "2",
                "name": "Sea, You & Me",
                "artist": "麻枝准",
                "album": "Summer Pockets Original Soundtrack",
                "duration": 0,
                "src": "https://oss.sprb.love/audio/2-麻枝准 - Sea, You & Me.mp3",
                "cover": "https://oss.sprb.love/images/covers/2-sea-you-me.webp"
            },
            {
                "id": "3",
                "name": "アルカテイル",
                "artist": "折戸伸治,水月陵",
                "album": "Summer Pockets Original Soundtrack",
                "duration": 0,
                "src": "https://oss.sprb.love/audio/3-折戸伸治,水月陵 - アルカテイル -story-.mp3",
                "cover": "https://oss.sprb.love/images/covers/3-op.webp"
            }
        ]
        
        return PlaylistInfo(
            total=len(music_data),
            tracks=music_data
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"获取播放列表失败: {str(e)}")

@app.get("/api/music/track/{track_id}")
async def get_music_track(track_id: str):
    """获取特定音轨信息"""
    try:
        # 这里可以根据track_id返回特定音轨信息
        # 简化版本直接返回成功状态
        return {
            "id": track_id,
            "status": "success",
            "message": "音轨信息获取成功"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"获取音轨信息失败: {str(e)}")

@app.post("/api/music/play-stats")
async def record_play_stats():
    """记录播放统计（简化版本）"""
    return {
        "status": "success",
        "message": "播放统计记录成功",
        "timestamp": datetime.now().isoformat()
    }


@app.get("/api/download-checklist")
async def download_checklist():
    """下载巡礼任务清单PDF"""
    try:
        buffer = create_pilgrimage_checklist_pdf()
        filename = f"Summer_Pockets_巡礼任务清单_{datetime.now().strftime('%Y%m%d_%H%M%S')}.pdf"
        
        return Response(
            content=buffer.getvalue(),
            media_type="application/pdf",
            filename=filename,
            headers={
                "Content-Disposition": f"attachment; filename*=UTF-8''{filename}",
                "Cache-Control": "no-cache",
                "Content-Type": "application/pdf; charset=utf-8"
            }
        )
        
    except Exception as e:
        print(f"下载失败: {str(e)}")
        raise HTTPException(status_code=500, detail=f"下载失败: {str(e)}")

# 基础健康检查端点
@app.get("/health")
async def health_check():
    """健康检查端点"""
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "version": "2.0.0",
        "environment": os.getenv("ENVIRONMENT", "development"),
        "description": "Summer Pockets 巡礼网站 API - 简化版本"
    }

# 音频API路由
@app.get("/api/audios")
async def get_audios():
    """获取所有音频数据"""
    return get_audios_api()

@app.get("/api/audios/{audio_id}")
async def get_audio_by_id(audio_id: int):
    """根据ID获取音频数据"""
    return get_audio_by_id_api(audio_id)

# 神域相关API
@app.get("/api/divine-realm/scenes")
async def get_divine_scenes():
    """获取所有神域场景"""
    return await get_divine_scenes_api()

@app.get("/api/divine-realm/random-scene")
async def get_random_divine_scene():
    """获取随机神域场景"""
    return await get_random_scene_api()

@app.get("/api/divine-realm/scenes/{scene_id}")
async def get_divine_scene_by_id(scene_id: int):
    """根据ID获取神域场景"""
    return await get_scene_by_id_api(scene_id)

# 静态文件服务
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads") 

# 根路径路由
@app.get("/")
async def root():
    """根路径 - 显示API信息"""
    return {
        "message": "Summer Pockets 巡礼网站 API",
        "version": "2.0.0",
        "status": "running",
        "endpoints": {
            "health": "/health",
            "audios": "/api/audios",
            "divine_realm": "/api/divine-realm",
            "docs": "/docs"
        },
        "timestamp": datetime.now().isoformat()
    }

# 数据库连接测试端点
@app.get("/api/test-db")
async def test_database_connection():
    """测试数据库连接"""
    try:
        # 测试Supabase连接
        from api.audio_service import audio_service
        test_audios = audio_service.get_all_audios()
        
        return {
            "success": True,
            "message": "数据库连接正常",
            "supabase": "connected" if test_audios is not None else "failed",
            "audio_count": len(test_audios) if test_audios else 0,
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        return {
            "success": False,
            "message": f"数据库连接失败: {str(e)}",
            "error": str(e),
            "timestamp": datetime.now().isoformat()
        }

# 启动服务器
# 启动代码已移至 run.py
# 使用 python run.py 启动服务