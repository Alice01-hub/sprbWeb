from fastapi import APIRouter, HTTPException, Depends, File, UploadFile, Form
from sqlalchemy.orm import Session
from pydantic import BaseModel, validator
from typing import Optional, List
from datetime import datetime
import os
import shutil
from .database import SessionLocal
from .models import User, UserButterfly, ImageProcessingTask, ProcessingStatusEnum
from .auth import get_current_user
from .image_processing import image_processor
import uuid

router = APIRouter()

# 配置常量
MAX_BUTTERFLIES_PER_USER = 5  # 每个用户最多可以拥有的七影蝶数量
MAX_LABEL_LENGTH = 200  # 标题最大长度

# Pydantic模型
class UserButterflyCreate(BaseModel):
    label: str
    hover_img: Optional[str] = None
    modal_img: Optional[str] = None
    link: Optional[str] = None
    
    @validator('label')
    def validate_label(cls, v):
        if not v or len(v.strip()) == 0:
            raise ValueError('标题不能为空')
        if len(v) > MAX_LABEL_LENGTH:
            raise ValueError(f'标题长度不能超过{MAX_LABEL_LENGTH}个字符')
        return v.strip()

class UserButterflyUpdate(BaseModel):
    label: Optional[str] = None
    hover_img: Optional[str] = None
    modal_img: Optional[str] = None
    link: Optional[str] = None
    is_active: Optional[bool] = None
    
    @validator('label')
    def validate_label(cls, v):
        if v is not None:
            if len(v.strip()) == 0:
                raise ValueError('标题不能为空')
            if len(v) > MAX_LABEL_LENGTH:
                raise ValueError(f'标题长度不能超过{MAX_LABEL_LENGTH}个字符')
            return v.strip()
        return v

class UserButterflyResponse(BaseModel):
    id: int
    label: str
    hover_img: Optional[str] = None
    modal_img: Optional[str] = None
    link: Optional[str] = None
    is_active: bool
    created_at: Optional[str] = None
    updated_at: Optional[str] = None

class UserButterflyListResponse(BaseModel):
    butterflies: List[UserButterflyResponse]
    total_count: int
    active_count: int

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 获取当前用户的活跃七影蝶
@router.get('/my-butterfly', response_model=Optional[UserButterflyResponse])
def get_my_active_butterfly(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """获取当前用户的活跃七影蝶"""
    user_butterfly = db.query(UserButterfly).filter(
        UserButterfly.user_id == current_user.id,
        UserButterfly.is_active == True
    ).first()
    
    if not user_butterfly:
        return None
    
    return UserButterflyResponse(
        id=user_butterfly.id,
        label=user_butterfly.label,
        hover_img=user_butterfly.hover_img,
        modal_img=user_butterfly.modal_img,
        link=user_butterfly.link,
        is_active=user_butterfly.is_active,
        created_at=user_butterfly.created_at.isoformat() if user_butterfly.created_at else None,
        updated_at=user_butterfly.updated_at.isoformat() if user_butterfly.updated_at else None
    )

# 获取当前用户的所有七影蝶
@router.get('/my-butterflies', response_model=UserButterflyListResponse)
def get_my_butterflies(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """获取当前用户的所有七影蝶（包括非活跃的）"""
    butterflies = db.query(UserButterfly).filter(
        UserButterfly.user_id == current_user.id
    ).order_by(UserButterfly.created_at.desc()).all()
    
    butterfly_responses = []
    active_count = 0
    
    for butterfly in butterflies:
        if butterfly.is_active:
            active_count += 1
        
        butterfly_responses.append(UserButterflyResponse(
            id=butterfly.id,
            label=butterfly.label,
            hover_img=butterfly.hover_img,
            modal_img=butterfly.modal_img,
            link=butterfly.link,
            is_active=butterfly.is_active,
            created_at=butterfly.created_at.isoformat() if butterfly.created_at else None,
            updated_at=butterfly.updated_at.isoformat() if butterfly.updated_at else None
        ))
    
    return UserButterflyListResponse(
        butterflies=butterfly_responses,
        total_count=len(butterflies),
        active_count=active_count
    )

# 根据ID获取特定七影蝶（用于编辑时的数据预填充）
@router.get('/my-butterfly/{butterfly_id}', response_model=UserButterflyResponse)
def get_butterfly_by_id(
    butterfly_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """根据ID获取特定七影蝶，用于编辑时的数据预填充"""
    butterfly = db.query(UserButterfly).filter(
        UserButterfly.id == butterfly_id,
        UserButterfly.user_id == current_user.id
    ).first()
    
    if not butterfly:
        raise HTTPException(status_code=404, detail="未找到指定的七影蝶")
    
    return UserButterflyResponse(
        id=butterfly.id,
        label=butterfly.label,
        hover_img=butterfly.hover_img,
        modal_img=butterfly.modal_img,
        link=butterfly.link,
        is_active=butterfly.is_active,
        created_at=butterfly.created_at.isoformat() if butterfly.created_at else None,
        updated_at=butterfly.updated_at.isoformat() if butterfly.updated_at else None
    )

# 创建新的七影蝶
@router.post('/my-butterfly', response_model=UserButterflyResponse)
def create_butterfly(
    butterfly_data: UserButterflyCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """创建新的七影蝶"""
    
    # 检查用户七影蝶数量限制
    total_count = db.query(UserButterfly).filter(
        UserButterfly.user_id == current_user.id
    ).count()
    
    if total_count >= MAX_BUTTERFLIES_PER_USER:
        raise HTTPException(
            status_code=400, 
            detail=f"每个用户最多只能创建{MAX_BUTTERFLIES_PER_USER}只七影蝶"
        )
    
    # 检查是否已有活跃的七影蝶
    active_butterfly = db.query(UserButterfly).filter(
        UserButterfly.user_id == current_user.id,
        UserButterfly.is_active == True
    ).first()
    
    now = datetime.utcnow()
    
    # 创建新的七影蝶
    new_butterfly = UserButterfly(
        user_id=current_user.id,
        label=butterfly_data.label,
        hover_img=butterfly_data.hover_img,
        modal_img=butterfly_data.modal_img,
        link=butterfly_data.link,
        is_active=active_butterfly is None,  # 如果没有活跃的七影蝶，则设为活跃
        created_at=now,
        updated_at=now
    )
    
    db.add(new_butterfly)
    db.commit()
    db.refresh(new_butterfly)
    
    return UserButterflyResponse(
        id=new_butterfly.id,
        label=new_butterfly.label,
        hover_img=new_butterfly.hover_img,
        modal_img=new_butterfly.modal_img,
        link=new_butterfly.link,
        is_active=new_butterfly.is_active,
        created_at=new_butterfly.created_at.isoformat() if new_butterfly.created_at else None,
        updated_at=new_butterfly.updated_at.isoformat() if new_butterfly.updated_at else None
    )

# 更新活跃七影蝶（向后兼容）
@router.put('/my-butterfly', response_model=UserButterflyResponse)
def update_active_butterfly(
    butterfly_data: UserButterflyUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """更新当前用户的活跃七影蝶（向后兼容）"""
    
    # 查找活跃的七影蝶
    butterfly = db.query(UserButterfly).filter(
        UserButterfly.user_id == current_user.id,
        UserButterfly.is_active == True
    ).first()
    
    if not butterfly:
        raise HTTPException(status_code=404, detail="未找到活跃的七影蝶")
    
    # 更新字段
    update_data = butterfly_data.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(butterfly, field, value)
    
    butterfly.updated_at = datetime.utcnow()
    
    db.commit()
    db.refresh(butterfly)
    
    return UserButterflyResponse(
        id=butterfly.id,
        label=butterfly.label,
        hover_img=butterfly.hover_img,
        modal_img=butterfly.modal_img,
        link=butterfly.link,
        is_active=butterfly.is_active,
        created_at=butterfly.created_at.isoformat() if butterfly.created_at else None,
        updated_at=butterfly.updated_at.isoformat() if butterfly.updated_at else None
    )

# 更新特定七影蝶
@router.put('/my-butterfly/{butterfly_id}', response_model=UserButterflyResponse)
def update_butterfly(
    butterfly_id: int,
    butterfly_data: UserButterflyUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """更新特定的七影蝶"""
    
    # 查找要更新的七影蝶
    butterfly = db.query(UserButterfly).filter(
        UserButterfly.id == butterfly_id,
        UserButterfly.user_id == current_user.id
    ).first()
    
    if not butterfly:
        raise HTTPException(status_code=404, detail="未找到指定的七影蝶")
    
    # 如果要激活这只七影蝶，需要先将其他七影蝶设为非活跃
    if butterfly_data.is_active is True and not butterfly.is_active:
        # 将当前用户的其他活跃七影蝶设为非活跃
        db.query(UserButterfly).filter(
            UserButterfly.user_id == current_user.id,
            UserButterfly.is_active == True
        ).update({"is_active": False, "updated_at": datetime.utcnow()})
    
    # 更新字段
    update_data = butterfly_data.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(butterfly, field, value)
    
    butterfly.updated_at = datetime.utcnow()
    
    db.commit()
    db.refresh(butterfly)
    
    return UserButterflyResponse(
        id=butterfly.id,
        label=butterfly.label,
        hover_img=butterfly.hover_img,
        modal_img=butterfly.modal_img,
        link=butterfly.link,
        is_active=butterfly.is_active,
        created_at=butterfly.created_at.isoformat() if butterfly.created_at else None,
        updated_at=butterfly.updated_at.isoformat() if butterfly.updated_at else None
    )

# 软删除特定七影蝶
@router.delete('/my-butterfly/{butterfly_id}')
def delete_butterfly(
    butterfly_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """软删除特定的七影蝶"""
    butterfly = db.query(UserButterfly).filter(
        UserButterfly.id == butterfly_id,
        UserButterfly.user_id == current_user.id
    ).first()
    
    if not butterfly:
        raise HTTPException(status_code=404, detail="未找到指定的七影蝶")
    
    # 软删除：设置为非活跃状态
    butterfly.is_active = False
    butterfly.updated_at = datetime.utcnow()
    db.commit()
    
    return {"message": "七影蝶已删除", "butterfly_id": butterfly_id}

# 删除当前用户的活跃七影蝶（保持向后兼容）
@router.delete('/my-butterfly')
def delete_my_active_butterfly(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """删除当前用户的活跃七影蝶（向后兼容）"""
    user_butterfly = db.query(UserButterfly).filter(
        UserButterfly.user_id == current_user.id,
        UserButterfly.is_active == True
    ).first()
    
    if not user_butterfly:
        raise HTTPException(status_code=404, detail="未找到活跃的七影蝶")
    
    # 软删除：设置为非活跃状态
    user_butterfly.is_active = False
    user_butterfly.updated_at = datetime.utcnow()
    db.commit()
    
    return {"message": "活跃七影蝶已删除", "butterfly_id": user_butterfly.id}

# 激活特定七影蝶
@router.post('/my-butterfly/{butterfly_id}/activate')
def activate_butterfly(
    butterfly_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """激活特定的七影蝶"""
    butterfly = db.query(UserButterfly).filter(
        UserButterfly.id == butterfly_id,
        UserButterfly.user_id == current_user.id
    ).first()
    
    if not butterfly:
        raise HTTPException(status_code=404, detail="未找到指定的七影蝶")
    
    if butterfly.is_active:
        return {"message": "七影蝶已经是活跃状态", "butterfly_id": butterfly_id}
    
    # 将当前用户的其他活跃七影蝶设为非活跃
    db.query(UserButterfly).filter(
        UserButterfly.user_id == current_user.id,
        UserButterfly.is_active == True
    ).update({"is_active": False, "updated_at": datetime.utcnow()})
    
    # 激活指定的七影蝶
    butterfly.is_active = True
    butterfly.updated_at = datetime.utcnow()
    db.commit()
    
    return {"message": "七影蝶已激活", "butterfly_id": butterfly_id}

# 图片上传状态响应模型
class ImageUploadResponse(BaseModel):
    task_id: str
    status: str
    message: Optional[str] = None
    error: Optional[str] = None

class ImageUploadStatusResponse(BaseModel):
    task_id: str
    status: str
    result_url: Optional[str] = None
    error_message: Optional[str] = None

@router.post('/upload-butterfly-image', response_model=ImageUploadResponse)
def upload_butterfly_image(
    file: UploadFile = File(...),
    image_type: str = Form(...),  # 'hover' 或 'modal'
    current_user: User = Depends(get_current_user)
):
    """上传七影蝶图片，使用优化的异步处理服务"""
    # 验证图片类型参数
    if image_type not in ['hover', 'modal']:
        raise HTTPException(status_code=400, detail="图片类型必须是 'hover' 或 'modal'")
    
    # 验证文件类型
    if not file.content_type or not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="只能上传图片文件")
    
    # 读取文件内容
    try:
        file_content = file.file.read()
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"读取文件失败: {str(e)}")
    
    # 使用优化的图片处理服务
    result = image_processor.process_upload(
        user_id=current_user.id,
        file_content=file_content,
        filename=file.filename or "unknown.jpg",
        content_type=file.content_type,
        image_type=image_type,
        upload_type="butterfly"
    )
    
    # 处理结果
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    
    return ImageUploadResponse(
        task_id=result["task_id"],
        status=result["status"],
        message=result.get("message")
    )

@router.get('/upload-status/{task_id}', response_model=ImageUploadStatusResponse)
def get_upload_status(task_id: str, db: Session = Depends(get_db)):
    """获取图片上传处理状态"""
    # 首先从内存中查找（快速响应）
    memory_task = image_processor.get_task_status(task_id)
    if memory_task:
        return ImageUploadStatusResponse(
            task_id=task_id,
            status=memory_task['status'],
            result_url=memory_task['result_url'],
            error_message=memory_task['error_message']
        )
    
    # 如果内存中没有，从数据库查找
    db_task = db.query(ImageProcessingTask).filter(ImageProcessingTask.id == task_id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="任务不存在")
    
    return ImageUploadStatusResponse(
        task_id=task_id,
        status=db_task.status.value,
        result_url=db_task.result_url,
        error_message=db_task.error_message
    )

@router.post('/upload-avatar-image', response_model=ImageUploadResponse)
def upload_avatar_image(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user)
):
    """上传用户头像图片，使用优化的异步处理服务"""
    # 验证文件类型
    if not file.content_type or not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="只能上传图片文件")
    
    # 读取文件内容
    try:
        file_content = file.file.read()
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"读取文件失败: {str(e)}")
    
    # 使用优化的图片处理服务
    result = image_processor.process_upload(
        user_id=current_user.id,
        file_content=file_content,
        filename=file.filename or "avatar.jpg",
        content_type=file.content_type,
        upload_type="avatar"
    )
    
    # 处理结果
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    
    return ImageUploadResponse(
        task_id=result["task_id"],
        status=result["status"],
        message=result.get("message")
    )

# 获取所有活跃的用户七影蝶（用于随机显示）
@router.get('/active-butterflies', response_model=List[UserButterflyResponse])
def get_all_active_butterflies(db: Session = Depends(get_db)):
    """获取所有活跃的用户七影蝶，用于随机显示系统"""
    active_butterflies = db.query(UserButterfly).filter(
        UserButterfly.is_active == True
    ).all()
    
    butterfly_responses = []
    for butterfly in active_butterflies:
        butterfly_responses.append(UserButterflyResponse(
            id=butterfly.id,
            label=butterfly.label,
            hover_img=butterfly.hover_img,
            modal_img=butterfly.modal_img,
            link=butterfly.link,
            is_active=butterfly.is_active,
            created_at=butterfly.created_at.isoformat() if butterfly.created_at else None,
            updated_at=butterfly.updated_at.isoformat() if butterfly.updated_at else None
        ))
    
    return butterfly_responses

# 七影蝶显示响应模型（包含类型标识）
class ButterflyDisplayResponse(BaseModel):
    id: Optional[int] = None  # 用户七影蝶有ID，官方七影蝶为None
    label: str
    hover_img: Optional[str] = None
    modal_img: Optional[str] = None
    link: Optional[str] = None
    butterfly_type: str  # 'official' 或 'user'
    created_at: Optional[str] = None
    updated_at: Optional[str] = None

# 随机七影蝶显示API
@router.get('/random-display', response_model=List[ButterflyDisplayResponse])
def get_random_butterflies_for_display(db: Session = Depends(get_db)):
    """获取随机选择的七影蝶用于显示（官方+用户，最多5只）
    
    需求: 7.1, 7.3
    - 7.1: 当页面加载或改变夜晚场景时，系统应随机选择并显示最多5只七影蝶
    - 7.3: 当七影蝶被显示时，系统应在随机选择中包含官方和用户创建的七影蝶
    """
    import random
    
    # 官方七影蝶配置（与前端保持一致）
    official_butterflies = [
        {
            'label': 'anitabi巡礼网站',
            'modal_img': None,
            'hover_img': None,
            'link': 'https://anitabi.cn/map',
        },
        {
            'label': '空门苍睡觉的小道',
            'modal_img': '/images/webps/男木岛/男木岛-苍睡觉小道.webp',
            'hover_img': '/images/webps/男木岛/男木岛-苍睡觉小道.webp',
            'link': None,
        },
        {
            'label': '小紬的灯塔',
            'modal_img': '/images/webps/男木岛/男木岛-紬的灯塔.webp',
            'hover_img': '/images/webps/男木岛/男木岛-紬的灯塔.webp',
            'link': None,
        },
        {
            'label': '齐须千人的小红书巡礼笔记',
            'modal_img': None,
            'hover_img': None,
            'link': 'https://www.xiaohongshu.com/discovery/item/67cb0ff80000000009015f05?source=webshare&xhsshare=pc_web&xsec_token=ABsqu3D76eAwSeSBQFe7MfGSblyZpnXnAJZN6ccVffjpg=&xsec_source=pc_share',
        },
        {
            'label': '空白的b站巡礼网站视频介绍',
            'modal_img': None,
            'hover_img': None,
            'link': 'https://www.bilibili.com/video/BV16pgBz7EAs/?spm_id_from=333.337.search-card.all.click&vd_source=88afb36e81beb22aa12c2c69722c5c7f',
        },
    ]
    
    # 获取所有活跃的用户七影蝶
    user_butterflies = db.query(UserButterfly).filter(
        UserButterfly.is_active == True
    ).all()
    
    # 构建所有七影蝶列表
    all_butterflies = []
    
    # 添加官方七影蝶
    for official in official_butterflies:
        all_butterflies.append(ButterflyDisplayResponse(
            id=None,
            label=official['label'],
            hover_img=official['hover_img'],
            modal_img=official['modal_img'],
            link=official['link'],
            butterfly_type='official'
        ))
    
    # 添加用户七影蝶
    for user_butterfly in user_butterflies:
        all_butterflies.append(ButterflyDisplayResponse(
            id=user_butterfly.id,
            label=user_butterfly.label,
            hover_img=user_butterfly.hover_img,
            modal_img=user_butterfly.modal_img,
            link=user_butterfly.link,
            butterfly_type='user',
            created_at=user_butterfly.created_at.isoformat() if user_butterfly.created_at else None,
            updated_at=user_butterfly.updated_at.isoformat() if user_butterfly.updated_at else None
        ))
    
    # 随机选择最多5只七影蝶
    max_butterflies = 5
    if len(all_butterflies) <= max_butterflies:
        # 如果总数不超过5只，返回所有七影蝶（随机打乱顺序）
        random.shuffle(all_butterflies)
        return all_butterflies
    else:
        # 如果超过5只，随机选择5只
        return random.sample(all_butterflies, max_butterflies)