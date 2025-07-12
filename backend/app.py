from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import os
import json
import io
from datetime import datetime

app = Flask(__name__)
CORS(app)

# 配置上传文件夹
UPLOAD_FOLDER = 'uploads'
DATA_FOLDER = 'data'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(DATA_FOLDER, exist_ok=True)

# 中文字体处理
def get_font_name():
    """获取支持中文的字体名称"""
    try:
        # 尝试使用系统字体
        possible_fonts = [
            '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',
            '/System/Library/Fonts/PingFang.ttc',
            '/Windows/Fonts/simhei.ttf',
            '/usr/share/fonts/truetype/wqy/wqy-microhei.ttc',
            'fonts/NotoSansCJK-Regular.ttf'
        ]
        
        for font_path in possible_fonts:
            if os.path.exists(font_path):
                try:
                    pdfmetrics.registerFont(TTFont('ChineseFont', font_path))
                    return 'ChineseFont'
                except:
                    continue
        
        # 如果没有找到字体文件，尝试使用reportlab的内建支持
        return 'Helvetica'
    except Exception as e:
        print(f"字体注册失败: {e}")
        return 'Helvetica'

FONT_NAME = get_font_name()

def create_pilgrimage_checklist_pdf():
    """创建巡礼任务清单PDF - 中文版本"""
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=A4, topMargin=50, bottomMargin=50)
    story = []
    styles = getSampleStyleSheet()
    
    # 自定义样式 - 优先使用中文字体
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Title'],
        fontSize=24,
        spaceAfter=30,
        alignment=1,  # 居中
        fontName=FONT_NAME if FONT_NAME != 'Helvetica' else 'Helvetica-Bold'
    )
    
    heading_style = ParagraphStyle(
        'CustomHeading',
        parent=styles['Heading2'],
        fontSize=16,
        spaceAfter=12,
        fontName=FONT_NAME if FONT_NAME != 'Helvetica' else 'Helvetica-Bold',
        textColor=colors.HexColor('#FF6B35')
    )
    
    normal_style = ParagraphStyle(
        'CustomNormal',
        parent=styles['Normal'],
        fontSize=11,
        spaceAfter=6,
        fontName=FONT_NAME
    )
    
    # 标题
    title_text = "Summer Pockets 圣地巡礼任务清单" if FONT_NAME != 'Helvetica' else "Summer Pockets Pilgrimage Checklist"
    story.append(Paragraph(title_text, title_style))
    story.append(Spacer(1, 20))
    
    # 说明文字
    if FONT_NAME != 'Helvetica':
        intro_text = "这份清单将帮助您顺利完成 Summer Pockets 的圣地巡礼之旅。请逐项检查并在完成后打勾，确保不遗漏任何重要步骤。"
    else:
        intro_text = "This checklist will help you complete your Summer Pockets pilgrimage journey successfully. Please check each item after completion to ensure nothing is missed."
    
    story.append(Paragraph(intro_text, normal_style))
    story.append(Spacer(1, 20))
    
    # 任务清单内容
    if FONT_NAME != 'Helvetica':
        checklist_data = [
            ("出行前准备", [
                "□ 护照/签证办理",
                "□ 机票预订",
                "□ 住宿预订", 
                "□ 旅行保险购买",
                "□ 日元兑换/银行卡准备",
                "□ 手机卡/随身WiFi准备",
                "□ 行李打包（衣物、药品、充电器等）",
                "□ 重要文件复印/电子备份"
            ]),
            ("机票与交通", [
                "□ 选择出发城市及航班",
                "□ 机票购买平台比价",
                "□ 了解行李托运规定",
                "□ 熟悉值机与登机流程",
                "□ 了解日本入境流程",
                "□ 准备交通卡购买",
                "□ 查询机场换乘信息"
            ]),
            ("日本国内行程", [
                "□ 确定机场到高松的交通方式",
                "□ 查询详细换乘流程",
                "□ 学习购票机使用方法",
                "□ 规划景点交通路线",
                "□ 准备备用路线方案",
                "□ 下载相关交通APP",
                "□ 收藏实用网站链接"
            ]),
            ("行程安排与预算", [
                "□ 制定每日行程计划",
                "□ 预算分配（交通、住宿、餐饮等）",
                "□ 重要景点门票预约",
                "□ 热门餐厅预订",
                "□ 购物清单准备",
                "□ 应急联系方式准备"
            ]),
            ("实用工具推荐", [
                "□ Google Maps（路线规划）",
                "□ Yahoo!乗換案内（换乘查询）",
                "□ Google Translate（翻译工具）",
                "□ 大众点评（餐厅推荐）",
                "□ 汇率换算APP",
                "□ 天气预报APP"
            ]),
            ("圣地巡礼专项", [
                "□ 女木岛交通及景点信息",
                "□ 男木岛交通及景点信息",
                "□ 直岛交通及景点信息",
                "□ 轮船时刻表查询",
                "□ 景点开放时间确认",
                "□ 拍照点位标记",
                "□ 游戏场景对比图准备"
            ])
        ]
    else:
        # 英文版本作为备选
        checklist_data = [
            ("Pre-departure Preparation", [
                "[ ] Passport/Visa Processing",
                "[ ] Flight Booking",
                "[ ] Accommodation Booking",
                "[ ] Travel Insurance Purchase",
                "[ ] Currency Exchange/Card Preparation",
                "[ ] Mobile Card/WiFi Preparation",
                "[ ] Luggage Packing",
                "[ ] Important Documents Backup"
            ]),
            ("Flight & Transportation", [
                "[ ] Select Departure City & Flight",
                "[ ] Compare Flight Booking Platforms",
                "[ ] Understand Baggage Regulations",
                "[ ] Familiarize with Check-in Process",
                "[ ] Learn Japan Entry Procedures",
                "[ ] Prepare Transportation Card Purchase",
                "[ ] Check Airport Transfer Information"
            ]),
            ("Japan Domestic Itinerary", [
                "[ ] Determine Airport to Takamatsu Route",
                "[ ] Check Detailed Transfer Process",
                "[ ] Learn Ticket Machine Usage",
                "[ ] Plan Scenic Route Transportation",
                "[ ] Prepare Backup Route Plans",
                "[ ] Download Transportation Apps",
                "[ ] Bookmark Useful Websites"
            ]),
            ("Itinerary & Budget Planning", [
                "[ ] Create Daily Itinerary",
                "[ ] Budget Allocation",
                "[ ] Important Attraction Reservations",
                "[ ] Popular Restaurant Reservations",
                "[ ] Shopping List Preparation",
                "[ ] Emergency Contact Preparation"
            ]),
            ("Useful Tools", [
                "[ ] Google Maps",
                "[ ] Yahoo Transit Guide",
                "[ ] Google Translate",
                "[ ] Restaurant Review Apps",
                "[ ] Currency Converter",
                "[ ] Weather Forecast App"
            ]),
            ("Pilgrimage Specific", [
                "[ ] Megijima Transportation & Attractions",
                "[ ] Ogijima Transportation & Attractions", 
                "[ ] Naoshima Transportation & Attractions",
                "[ ] Ferry Timetable Check",
                "[ ] Attraction Opening Hours",
                "[ ] Photo Spot Marking",
                "[ ] Game Scene Comparison Images"
            ])
        ]
    
    for section_title, items in checklist_data:
        # 添加章节标题
        story.append(Paragraph(section_title, heading_style))
        story.append(Spacer(1, 10))
        
        # 创建任务列表
        for item in items:
            story.append(Paragraph(item, normal_style))
        
        story.append(Spacer(1, 20))
    
    # 页脚信息
    footer_text = f"生成时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}" if FONT_NAME != 'Helvetica' else f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
    story.append(Spacer(1, 30))
    story.append(Paragraph(footer_text, normal_style))
    
    # 生成PDF
    doc.build(story)
    buffer.seek(0)
    return buffer

@app.route('/api/download-checklist', methods=['GET'])
def download_checklist():
    """下载巡礼任务清单PDF"""
    try:
        pdf_buffer = create_pilgrimage_checklist_pdf()
        return send_file(
            pdf_buffer,
            as_attachment=True,
            download_name='Summer_Pockets_巡礼任务清单.pdf',
            mimetype='application/pdf'
        )
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/traffic-data', methods=['GET'])
def get_traffic_data():
    """获取交通攻略数据"""
    try:
        data_file = os.path.join(DATA_FOLDER, 'traffic_data.json')
        if os.path.exists(data_file):
            with open(data_file, 'r', encoding='utf-8') as f:
                return jsonify(json.load(f))
        else:
            return jsonify({'error': 'No data found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/traffic-data', methods=['POST'])
def save_traffic_data():
    """保存交通攻略数据"""
    try:
        data = request.get_json()
        data_file = os.path.join(DATA_FOLDER, 'traffic_data.json')
        with open(data_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        return jsonify({'message': 'Data saved successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/traffic-guides', methods=['GET'])
def get_traffic_guides():
    """获取所有交通攻略"""
    try:
        guides_file = os.path.join(DATA_FOLDER, 'traffic_guides.json')
        if os.path.exists(guides_file):
            with open(guides_file, 'r', encoding='utf-8') as f:
                return jsonify(json.load(f))
        else:
            # 返回默认数据结构
            default_data = {
                'international': {
                    'guangzhou': {
                        'name': '广州-春秋航空',
                        'cards': []
                    }
                },
                'domestic': {
                    'kansai-takamatsu': {
                        'name': '关西机场→高松（电车）',
                        'cards': []
                    }
                }
            }
            return jsonify(default_data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/traffic-guides', methods=['POST'])
def save_traffic_guides():
    """保存交通攻略"""
    try:
        data = request.get_json()
        guides_file = os.path.join(DATA_FOLDER, 'traffic_guides.json')
        with open(guides_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        return jsonify({'message': 'Guides saved successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """健康检查"""
    return jsonify({'status': 'ok', 'message': 'Backend is running'})

@app.route('/api/audio-files', methods=['GET'])
def get_audio_files():
    """获取可用的音频文件列表"""
    try:
        audio_dir = '../frontend/public/audio'
        audio_files = []
        
        if os.path.exists(audio_dir):
            for filename in os.listdir(audio_dir):
                if filename.lower().endswith(('.mp3', '.wav', '.ogg', '.m4a')):
                    # 解析文件名，提取艺术家和歌曲名
                    name_without_ext = os.path.splitext(filename)[0]
                    if ' - ' in name_without_ext:
                        parts = name_without_ext.split(' - ', 1)
                        artist = parts[0].strip()
                        title = parts[1].strip()
                        display_name = f"{title} - {artist}"
                    else:
                        display_name = name_without_ext
                    
                    audio_files.append({
                        'id': filename.lower().replace(' ', '-').replace('.', '-'),
                        'name': display_name,
                        'filename': filename,
                        'src': f'/audio/{filename}'
                    })
        
        # 按文件名排序
        audio_files.sort(key=lambda x: x['filename'])
        
        return jsonify(audio_files)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000) 