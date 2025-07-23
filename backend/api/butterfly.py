from fastapi import APIRouter, HTTPException, Depends, File, UploadFile, Form
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
import os
import shutil
from .database import SessionLocal
from .models import User, UserButterfly
from .auth import get_current_user
import uuid
import threading
import subprocess
import time

router = APIRouter()

# Pydantic模型
class UserButterflyCreate(BaseModel):
    label: str
    hover_img: Optional[str] = None
    modal_img: Optional[str] = None
    link: Optional[str] = None

class UserButterflyResponse(BaseModel):
    id: int
    label: str
    hover_img: Optional[str] = None
    modal_img: Optional[str] = None
    link: Optional[str] = None
    is_active: bool
    created_at: Optional[str] = None
    updated_at: Optional[str] = None

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 获取当前用户的七影蝶
@router.get('/my-butterfly', response_model=Optional[UserButterflyResponse])
def get_my_butterfly(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """获取当前用户的七影蝶"""
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

# 创建或更新用户的七影蝶
@router.post('/my-butterfly', response_model=UserButterflyResponse)
def create_or_update_butterfly(
    butterfly_data: UserButterflyCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """创建或更新用户的七影蝶（每个用户只能有一只）"""
    
    # 验证输入
    if not butterfly_data.label or len(butterfly_data.label.strip()) == 0:
        raise HTTPException(status_code=400, detail="标题不能为空")
    
    if len(butterfly_data.label) > 200:
        raise HTTPException(status_code=400, detail="标题长度不能超过200个字符")
    
    # 检查是否已存在七影蝶
    existing_butterfly = db.query(UserButterfly).filter(
        UserButterfly.user_id == current_user.id,
        UserButterfly.is_active == True
    ).first()
    
    now = datetime.utcnow()
    
    if existing_butterfly:
        # 更新现有的七影蝶
        existing_butterfly.label = butterfly_data.label
        existing_butterfly.hover_img = butterfly_data.hover_img
        existing_butterfly.modal_img = butterfly_data.modal_img
        existing_butterfly.link = butterfly_data.link
        existing_butterfly.updated_at = now
    else:
        # 创建新的七影蝶
        existing_butterfly = UserButterfly(
            user_id=current_user.id,
            label=butterfly_data.label,
            hover_img=butterfly_data.hover_img,
            modal_img=butterfly_data.modal_img,
            link=butterfly_data.link,
            is_active=True,
            created_at=now,
            updated_at=now
        )
        db.add(existing_butterfly)
    
    db.commit()
    db.refresh(existing_butterfly)
    
    return UserButterflyResponse(
        id=existing_butterfly.id,
        label=existing_butterfly.label,
        hover_img=existing_butterfly.hover_img,
        modal_img=existing_butterfly.modal_img,
        link=existing_butterfly.link,
        is_active=existing_butterfly.is_active,
        created_at=existing_butterfly.created_at.isoformat() if existing_butterfly.created_at else None,
        updated_at=existing_butterfly.updated_at.isoformat() if existing_butterfly.updated_at else None
    )

# 删除用户的七影蝶
@router.delete('/my-butterfly')
def delete_my_butterfly(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """删除当前用户的七影蝶"""
    user_butterfly = db.query(UserButterfly).filter(
        UserButterfly.user_id == current_user.id,
        UserButterfly.is_active == True
    ).first()
    
    if not user_butterfly:
        raise HTTPException(status_code=404, detail="未找到七影蝶")
    
    user_butterfly.is_active = False
    user_butterfly.updated_at = datetime.utcnow()
    db.commit()
    
    return {"message": "七影蝶已删除"}

# 全局任务状态存储（可用redis等替换）
UPLOAD_TASKS = {}
UPLOAD_TASKS_LOCK = threading.Lock()

# 异步优化函数
def optimize_image_task(task_id, tmp_path, final_path, url_path):
    try:
        # 调用图片优化脚本
        optimize_script = '/home/devbox/project/sprb-web/素材/graphs/optimize_images_global.sh'
        subprocess.run([optimize_script, tmp_path, final_path], check=True)
        # 删除原图
        if os.path.exists(tmp_path):
            os.remove(tmp_path)
        # 标记任务完成
        with UPLOAD_TASKS_LOCK:
            UPLOAD_TASKS[task_id]['status'] = 'done'
            UPLOAD_TASKS[task_id]['url'] = url_path
    except Exception as e:
        with UPLOAD_TASKS_LOCK:
            UPLOAD_TASKS[task_id]['status'] = 'error'
            UPLOAD_TASKS[task_id]['error'] = str(e)

@router.post('/upload-butterfly-image')
def upload_butterfly_image(
    file: UploadFile = File(...),
    image_type: str = Form(...),  # 'hover' 或 'modal'
    current_user: User = Depends(get_current_user)
):
    """上传七影蝶图片，异步优化"""
    if image_type not in ['hover', 'modal']:
        raise HTTPException(status_code=400, detail="图片类型必须是 'hover' 或 'modal'")
    if not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="只能上传图片文件")
    file_size = 0
    file_content = file.file.read()
    file_size = len(file_content)
    if file_size > 5 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="图片大小不能超过5MB")
    # 临时目录
    tmp_dir = os.path.join('uploads', 'butterflies', str(current_user.id), 'tmp')
    os.makedirs(tmp_dir, exist_ok=True)
    file_extension = os.path.splitext(file.filename)[1]
    timestamp = datetime.utcnow().strftime('%Y%m%d_%H%M%S')
    task_id = str(uuid.uuid4())
    tmp_filename = f"{image_type}_{timestamp}_{task_id}{file_extension}"
    tmp_path = os.path.join(tmp_dir, tmp_filename)
    with open(tmp_path, 'wb') as f:
        f.write(file_content)
    # 优化后正式目录
    final_dir = os.path.join('uploads', 'butterflies', str(current_user.id))
    os.makedirs(final_dir, exist_ok=True)
    final_filename = f"{image_type}_{timestamp}_{task_id}.webp"
    final_path = os.path.join(final_dir, final_filename)
    url_path = f"/uploads/butterflies/{current_user.id}/{final_filename}"
    # 记录任务
    with UPLOAD_TASKS_LOCK:
        UPLOAD_TASKS[task_id] = {
            'status': 'processing',
            'url': None,
            'error': None
        }
    # 启动后台线程优化
    t = threading.Thread(target=optimize_image_task, args=(task_id, tmp_path, final_path, url_path))
    t.start()
    return {"task_id": task_id, "status": "processing", "url": None}

@router.get('/upload-status/{task_id}')
def get_upload_status(task_id: str):
    with UPLOAD_TASKS_LOCK:
        task = UPLOAD_TASKS.get(task_id)
        if not task:
            raise HTTPException(status_code=404, detail="任务不存在")
        return {
            "status": task['status'],
            "url": task['url'],
            "error": task['error']
        } 