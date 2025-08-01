from fastapi import APIRouter, HTTPException, Depends, File, UploadFile, Form, Header
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
from .butterfly_title_service import butterfly_title_service
import uuid

router = APIRouter()

# 配置常量
MAX_BUTTERFLIES_PER_USER = 5  # 每个用户最多可以拥有的七影蝶数量
MAX_LABEL_LENGTH = 200  # 标题最大长度

# Pydantic模型
class UserButterflyCreate(BaseModel):
    description: Optional[str] = None
    link: Optional[str] = None
    
    @validator('description')
    def validate_description(cls, v):
        if v is not None and len(v.strip()) == 0:
            return None
        return v.strip() if v else None

class UserButterflyUpdate(BaseModel):
    description: Optional[str] = None
    link: Optional[str] = None
    is_active: Optional[bool] = None
    
    @validator('description')
    def validate_description(cls, v):
        if v is not None and len(v.strip()) == 0:
            return None
        return v.strip() if v else None

class UserButterflyResponse(BaseModel):
    id: int
    label: str
    description: Optional[str] = None
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

def get_current_user_optional(authorization: Optional[str] = None, db: Session = Depends(get_db)) -> Optional[User]:
    """Get current user if authenticated, return None if not authenticated"""
    if not authorization or not authorization.startswith('Bearer '):
        return None
    
    try:
        token = authorization[7:]  # Remove 'Bearer ' prefix
        return get_current_user(token, db)
    except:
        # If authentication fails, return None (user not logged in)
        return None

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
        description=user_butterfly.description,
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
            description=butterfly.description,
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
        description=butterfly.description,
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
    
    # 自动生成标题
    auto_generated_label = butterfly_title_service.generate_title_from_user(current_user)
    
    # 创建新的七影蝶
    new_butterfly = UserButterfly(
        user_id=current_user.id,
        label=auto_generated_label,
        description=butterfly_data.description,
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
        description=new_butterfly.description,
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
    
    # 更新字段 (排除label字段，因为它是自动生成的)
    update_data = butterfly_data.dict(exclude_unset=True)
    # 确保label不被更新，始终保持自动生成的格式
    if 'label' in update_data:
        del update_data['label']
    
    for field, value in update_data.items():
        setattr(butterfly, field, value)
    
    # 确保标题始终是自动生成的格式
    butterfly.label = butterfly_title_service.generate_title_from_user(current_user)
    butterfly.updated_at = datetime.utcnow()
    
    db.commit()
    db.refresh(butterfly)
    
    return UserButterflyResponse(
        id=butterfly.id,
        label=butterfly.label,
        description=butterfly.description,
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
    
    # 更新字段 (排除label字段，因为它是自动生成的)
    update_data = butterfly_data.dict(exclude_unset=True)
    # 确保label不被更新，始终保持自动生成的格式
    if 'label' in update_data:
        del update_data['label']
    
    for field, value in update_data.items():
        setattr(butterfly, field, value)
    
    # 确保标题始终是自动生成的格式
    butterfly.label = butterfly_title_service.generate_title_from_user(current_user)
    butterfly.updated_at = datetime.utcnow()
    
    db.commit()
    db.refresh(butterfly)
    
    return UserButterflyResponse(
        id=butterfly.id,
        label=butterfly.label,
        description=butterfly.description,
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
            description=butterfly.description,
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
    description: Optional[str] = None
    link: Optional[str] = None
    butterfly_type: str  # 'official' 或 'user'
    created_at: Optional[str] = None
    updated_at: Optional[str] = None

# 随机七影蝶显示API
@router.get('/random-display', response_model=List[ButterflyDisplayResponse])
def get_random_butterflies_for_display(
    authorization: Optional[str] = Header(None),
    db: Session = Depends(get_db)
):
    """获取随机选择的七影蝶用于显示，根据登录状态过滤内容
    
    需求: 8, 9
    - 需求8: 未登录用户只显示官方七影蝶
    - 需求9: 登录用户显示官方+用户七影蝶，确保包含自己的七影蝶
    """
    import random
    
    # 尝试获取当前用户（如果已登录）
    current_user = get_current_user_optional(authorization, db)
    
    # 官方七影蝶配置（与前端保持一致）
    official_butterflies = [
        {
            'label': 'anitabi巡礼网站',
            'description': '动画巡礼地图网站',
            'link': 'https://anitabi.cn/map',
        },
        {
            'label': '空门苍睡觉的小道',
            'description': '男木岛上苍睡觉的地方',
            'link': None,
        },
        {
            'label': '小紬的灯塔',
            'description': '男木岛上紬的灯塔',
            'link': None,
        },
        {
            'label': '齐须千人的小红书巡礼笔记',
            'description': '小红书巡礼笔记分享',
            'link': 'https://www.xiaohongshu.com/discovery/item/67cb0ff80000000009015f05?source=webshare&xhsshare=pc_web&xsec_token=ABsqu3D76eAwSeSBQFe7MfGSblyZpnXnAJZN6ccVffjpg=&xsec_source=pc_share',
        },
        {
            'label': '空白的b站巡礼网站视频介绍',
            'description': 'B站巡礼网站视频介绍',
            'link': 'https://www.bilibili.com/video/BV16pgBz7EAs/?spm_id_from=333.337.search-card.all.click&vd_source=88afb36e81beb22aa12c2c69722c5c7f',
        },
    ]
    
    # 构建七影蝶列表
    all_butterflies = []
    
    # 始终添加官方七影蝶
    for official in official_butterflies:
        all_butterflies.append(ButterflyDisplayResponse(
            id=None,
            label=official['label'],
            description=official['description'],
            link=official['link'],
            butterfly_type='official'
        ))
    
    # 根据登录状态决定是否添加用户七影蝶
    if current_user:
        # 登录用户：显示所有用户七影蝶，确保包含自己的七影蝶
        user_butterflies = db.query(UserButterfly).filter(
            UserButterfly.is_active == True
        ).all()
        
        # 确保当前用户的七影蝶在列表中
        user_butterfly_found = False
        for user_butterfly in user_butterflies:
            all_butterflies.append(ButterflyDisplayResponse(
                id=user_butterfly.id,
                label=user_butterfly.label,
                description=user_butterfly.description,
                link=user_butterfly.link,
                butterfly_type='user',
                created_at=user_butterfly.created_at.isoformat() if user_butterfly.created_at else None,
                updated_at=user_butterfly.updated_at.isoformat() if user_butterfly.updated_at else None
            ))
            
            if user_butterfly.user_id == current_user.id:
                user_butterfly_found = True
        
        # 如果当前用户有七影蝶但不在活跃列表中，确保它被包含
        if not user_butterfly_found:
            current_user_butterfly = db.query(UserButterfly).filter(
                UserButterfly.user_id == current_user.id,
                UserButterfly.is_active == True
            ).first()
            
            if current_user_butterfly:
                all_butterflies.append(ButterflyDisplayResponse(
                    id=current_user_butterfly.id,
                    label=current_user_butterfly.label,
                    description=current_user_butterfly.description,
                    link=current_user_butterfly.link,
                    butterfly_type='user',
                    created_at=current_user_butterfly.created_at.isoformat() if current_user_butterfly.created_at else None,
                    updated_at=current_user_butterfly.updated_at.isoformat() if current_user_butterfly.updated_at else None
                ))
    
    # 未登录用户：只显示官方七影蝶（已经添加了）
    
    # 随机选择显示的七影蝶
    if current_user:
        # 登录用户：显示官方+其他用户七影蝶（最多5只），确保包含自己的七影蝶
        max_random_butterflies = 5
        
        # 分离用户自己的七影蝶和其他七影蝶
        user_own_butterflies = [b for b in all_butterflies if b.butterfly_type == 'user' and b.id and any(ub.id == b.id and ub.user_id == current_user.id for ub in db.query(UserButterfly).filter(UserButterfly.is_active == True).all())]
        other_butterflies = [b for b in all_butterflies if not (b.butterfly_type == 'user' and b.id and any(ub.id == b.id and ub.user_id == current_user.id for ub in db.query(UserButterfly).filter(UserButterfly.is_active == True).all()))]
        
        # 从其他七影蝶中随机选择最多5只
        if len(other_butterflies) <= max_random_butterflies:
            selected_butterflies = other_butterflies.copy()
        else:
            selected_butterflies = random.sample(other_butterflies, max_random_butterflies)
        
        # 添加用户自己的七影蝶（如果有的话）
        selected_butterflies.extend(user_own_butterflies)
        
        # 随机打乱顺序
        random.shuffle(selected_butterflies)
        return selected_butterflies
    else:
        # 未登录用户：只返回官方七影蝶
        official_only = [b for b in all_butterflies if b.butterfly_type == 'official']
        random.shuffle(official_only)
        return official_only