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
import sqlite3
from datetime import datetime
import tempfile
from performance_monitor import get_monitor
from config_loader import ConfigLoader
import psutil

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
DATA_FOLDER = 'data'
DATABASE_PATH = 'data/traffic_cards.db'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(DATA_FOLDER, exist_ok=True)

# 加载环境变量
def load_env_file():
    """加载环境变量文件"""
    env_file = Path(__file__).parent / '.env'
    if env_file.exists():
        with open(env_file, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    key, value = line.split('=', 1)
                    os.environ[key] = value

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
class TrafficCard(BaseModel):
    id: Optional[int] = None
    title: str
    icon: str
    content: str
    category: str
    subcategory: Optional[str] = None
    order_index: int = 0
    created_at: Optional[str] = None
    updated_at: Optional[str] = None

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

# 数据库初始化
def init_database():
    """初始化数据库"""
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    
    # 创建交通攻略卡片表
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS traffic_cards (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            icon TEXT,
            content TEXT NOT NULL,
            category TEXT NOT NULL,
            subcategory TEXT,
            order_index INTEGER DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # 插入默认数据
    default_cards = [
        ('机票购买指南', '💳', '''推荐购票平台：
• 春秋航空官网/APP - 官方直销，价格透明
• 携程/去哪儿 - 比价便捷，促销活动多
• 飞猪 - 阿里系平台，信用保障

购票注意事项：
• 建议提前1-2个月预订，价格更优惠
• 注意行李额度，春秋航空需单独购买
• 确认护照有效期至少6个月以上''', 'international', 'guangzhou', 1),
        
        ('行李托运与安检', '🧳', '''行李规格：
• 手提行李：20cm×30cm×40cm，重量≤7kg
• 托运行李：需单独购买，规格详见官网
• 禁止携带：液体>100ml、充电宝>20000mAh

安检须知：
• 提前2小时到达机场办理手续
• 电子设备需单独过检
• 液体化妆品需装入透明袋''', 'international', 'guangzhou', 2),
        
        ('登机流程', '🛫', '''值机流程：
• 在线值机：起飞前24小时开放
• 机场值机：柜台或自助值机设备
• 选择座位：在线值机可免费选择

登机须知：
• 提前30分钟到达登机口
• 准备好护照和登机牌
• 注意登机口变更广播''', 'international', 'guangzhou', 3),
        
        ('到达日本入境', '🏛️', '''入境流程：
• 填写入境记录卡（飞机上发放）
• 护照检查 → 行李提取 → 海关申报
• 准备好返程机票和住宿证明

注意事项：
• 入境记录卡需如实填写
• 携带现金需申报（超过100万日元）
• 保持手机联系方式畅通''', 'international', 'guangzhou', 4),
        
        ('交通卡购买', '💳', '''推荐交通卡：
• ICOCA卡 - 关西地区通用
• SUICA卡 - 全国通用
• 购买地点：机场、车站自助售票机

使用方法：
• 首次购买包含500日元押金
• 可在便利店、餐厅使用
• 余额不足时可随时充值''', 'international', 'guangzhou', 5),
        
        ('机场内换乘指引', '🚌', '''交通方式选择：
• 电车：关西机场线 → 大阪/神户方向
• 大巴：利木津巴士 → 各主要城市
• 出租车：价格较高，适合多人出行

换乘指引：
• 跟随"电车"标识前往车站
• 购票后通过检票口
• 确认列车方向和终点站''', 'international', 'guangzhou', 6)
    ]
    
    # 检查是否已有数据
    cursor.execute('SELECT COUNT(*) FROM traffic_cards')
    count = cursor.fetchone()[0]
    
    if count == 0:
        cursor.executemany('''
            INSERT INTO traffic_cards (title, icon, content, category, subcategory, order_index)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', default_cards)
    
    conn.commit()
    conn.close()

# 初始化数据库
init_database()

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

@app.get("/api/traffic-cards")
async def get_traffic_cards():
    """获取交通攻略卡片"""
    try:
        conn = sqlite3.connect(DATABASE_PATH)
        cursor = conn.cursor()
        cursor.execute('''
            SELECT id, title, icon, content, category, subcategory, order_index, created_at, updated_at
            FROM traffic_cards
            ORDER BY order_index, created_at
        ''')
        rows = cursor.fetchall()
        conn.close()
        
        cards = []
        for row in rows:
            cards.append({
                "id": row[0],
                "title": row[1],
                "icon": row[2],
                "content": row[3],
                "category": row[4],
                "subcategory": row[5],
                "order_index": row[6],
                "created_at": row[7],
                "updated_at": row[8]
            })
        
        return {"cards": cards}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"获取交通攻略卡片失败: {str(e)}")

@app.post("/api/traffic-cards")
async def create_traffic_card(card: TrafficCard):
    """创建交通攻略卡片"""
    try:
        conn = sqlite3.connect(DATABASE_PATH)
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO traffic_cards (title, icon, content, category, subcategory, order_index)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (card.title, card.icon, card.content, card.category, card.subcategory, card.order_index))
        conn.commit()
        card_id = cursor.lastrowid
        conn.close()
        
        return {"id": card_id, "message": "交通攻略卡片创建成功"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"创建交通攻略卡片失败: {str(e)}")

@app.put("/api/traffic-cards/{card_id}")
async def update_traffic_card(card_id: int, card: TrafficCard):
    """更新交通攻略卡片"""
    try:
        conn = sqlite3.connect(DATABASE_PATH)
        cursor = conn.cursor()
        cursor.execute('''
            UPDATE traffic_cards 
            SET title=?, icon=?, content=?, category=?, subcategory=?, order_index=?, updated_at=CURRENT_TIMESTAMP
            WHERE id=?
        ''', (card.title, card.icon, card.content, card.category, card.subcategory, card.order_index, card_id))
        conn.commit()
        conn.close()
        
        return {"message": "交通攻略卡片更新成功"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"更新交通攻略卡片失败: {str(e)}")

@app.delete("/api/traffic-cards/{card_id}")
async def delete_traffic_card(card_id: int):
    """删除交通攻略卡片"""
    try:
        conn = sqlite3.connect(DATABASE_PATH)
        cursor = conn.cursor()
        cursor.execute('DELETE FROM traffic_cards WHERE id=?', (card_id,))
        conn.commit()
        conn.close()
        
        return {"message": "交通攻略卡片删除成功"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"删除交通攻略卡片失败: {str(e)}")

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
    try:
        # 检查数据库连接
        conn = sqlite3.connect(DATABASE_PATH)
        cursor = conn.cursor()
        cursor.execute("SELECT 1").fetchone()
        conn.close()
        
        return {
            "status": "healthy",
            "timestamp": datetime.now().isoformat(),
            "version": "2.0.0",
            "environment": os.getenv("ENVIRONMENT", "development"),
            "description": "Summer Pockets 巡礼网站 API - 简化版本"
        }
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"Service unhealthy: {str(e)}")

# 静态文件服务
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads") 