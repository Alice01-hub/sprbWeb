from fastapi import FastAPI, HTTPException, Depends, status, Body
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime
import os
import sys
import json

# 添加主项目路径到sys.path
sys.path.append(os.path.join(os.path.dirname(__file__), '..', '..', 'backend'))

from api.database import SessionLocal
from api.models import User, UserButterfly
from api.auth import get_current_user

app = FastAPI(title="Summer Pockets Admin API", version="1.0.0")

# CORS中间件
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 官方七影蝶配置（从前端复制）
OFFICIAL_BUTTERFLIES = [
    {
        "id": 1,
        "label": "七影蝶",
        "hoverImg": "/images/webps/七影蝶.webp",
        "modalImg": "/images/webps/七影蝶.webp",
        "link": None,
        "is_active": True
    },
    {
        "id": 2,
        "label": "七影蝶",
        "hoverImg": "/images/webps/七影蝶.webp",
        "modalImg": "/images/webps/七影蝶.webp",
        "link": None,
        "is_active": True
    },
    {
        "id": 3,
        "label": "七影蝶",
        "hoverImg": "/images/webps/七影蝶.webp",
        "modalImg": "/images/webps/七影蝶.webp",
        "link": None,
        "is_active": True
    },
    {
        "id": 4,
        "label": "七影蝶",
        "hoverImg": "/images/webps/七影蝶.webp",
        "modalImg": "/images/webps/七影蝶.webp",
        "link": None,
        "is_active": True
    },
    {
        "id": 5,
        "label": "七影蝶",
        "hoverImg": "/images/webps/七影蝶.webp",
        "modalImg": "/images/webps/七影蝶.webp",
        "link": None,
        "is_active": True
    },
    {
        "id": 6,
        "label": "七影蝶",
        "hoverImg": "/images/webps/七影蝶.webp",
        "modalImg": "/images/webps/七影蝶.webp",
        "link": None,
        "is_active": True
    },
    {
        "id": 7,
        "label": "七影蝶",
        "hoverImg": "/images/webps/七影蝶.webp",
        "modalImg": "/images/webps/七影蝶.webp",
        "link": None,
        "is_active": True
    }
]

# 数据库依赖
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Pydantic模型
from pydantic import BaseModel

class UserInfo(BaseModel):
    id: int
    username: str
    email: Optional[str] = None
    avatar_url: Optional[str] = None
    energy: int
    max_energy: int
    level: int
    experience: int
    created_at: Optional[str] = None
    updated_at: Optional[str] = None

class ButterflyInfo(BaseModel):
    id: int
    label: str
    hover_img: Optional[str] = None
    modal_img: Optional[str] = None
    link: Optional[str] = None
    is_active: bool
    created_at: Optional[str] = None
    updated_at: Optional[str] = None
    user_id: Optional[int] = None
    username: Optional[str] = None

class ButterflyUpdate(BaseModel):
    label: str
    hover_img: Optional[str] = None
    modal_img: Optional[str] = None
    link: Optional[str] = None
    is_active: bool = True

class SystemStats(BaseModel):
    total_users: int
    total_butterflies: int
    active_butterflies: int
    total_user_butterflies: int
    active_user_butterflies: int

# 获取系统统计信息
@app.get("/api/admin/stats", response_model=SystemStats)
def get_system_stats(db: Session = Depends(get_db)):
    """获取系统统计信息"""
    total_users = db.query(User).count()
    total_butterflies = len(OFFICIAL_BUTTERFLIES)  # 官方七影蝶数量
    active_butterflies = len([b for b in OFFICIAL_BUTTERFLIES if b["is_active"]])  # 活跃官方七影蝶
    total_user_butterflies = db.query(UserButterfly).count()
    active_user_butterflies = db.query(UserButterfly).filter(UserButterfly.is_active == True).count()
    
    return SystemStats(
        total_users=total_users,
        total_butterflies=total_butterflies,
        active_butterflies=active_butterflies,
        total_user_butterflies=total_user_butterflies,
        active_user_butterflies=active_user_butterflies
    )

# 获取所有用户信息
@app.get("/api/admin/users", response_model=List[UserInfo])
def get_all_users(db: Session = Depends(get_db)):
    """获取所有用户信息"""
    users = db.query(User).all()
    return [
        UserInfo(
            id=user.id,
            username=user.username,
            email=user.email,
            avatar_url=user.avatar_url,
            energy=user.energy,
            max_energy=user.max_energy,
            level=user.level,
            experience=user.experience,
            created_at=user.created_at.isoformat() if user.created_at else None,
            updated_at=user.updated_at.isoformat() if user.updated_at else None
        )
        for user in users
    ]

# 获取所有七影蝶信息（官方+用户）
@app.get("/api/admin/butterflies", response_model=List[ButterflyInfo])
def get_all_butterflies(db: Session = Depends(get_db)):
    """获取所有七影蝶信息（官方+用户）"""
    butterflies = []
    
    # 添加官方七影蝶
    for butterfly in OFFICIAL_BUTTERFLIES:
        butterflies.append(ButterflyInfo(
            id=butterfly["id"],
            label=butterfly["label"],
            hover_img=butterfly["hoverImg"],
            modal_img=butterfly["modalImg"],
            link=butterfly["link"],
            is_active=butterfly["is_active"],
            user_id=None,
            username="官方"
        ))
    
    # 添加用户七影蝶
    user_butterflies = db.query(UserButterfly).all()
    for butterfly in user_butterflies:
        user = db.query(User).filter(User.id == butterfly.user_id).first()
        butterflies.append(ButterflyInfo(
            id=butterfly.id + 1000,  # 避免与官方ID冲突
            label=butterfly.label,
            hover_img=butterfly.hover_img,
            modal_img=butterfly.modal_img,
            link=butterfly.link,
            is_active=butterfly.is_active,
            created_at=butterfly.created_at.isoformat() if butterfly.created_at else None,
            updated_at=butterfly.updated_at.isoformat() if butterfly.updated_at else None,
            user_id=butterfly.user_id,
            username=user.username if user else "未知用户"
        ))
    
    return butterflies

# 更新官方七影蝶
@app.put("/api/admin/butterflies/{butterfly_id}", response_model=ButterflyInfo)
def update_official_butterfly(
    butterfly_id: int,
    butterfly_data: ButterflyUpdate,
    db: Session = Depends(get_db)
):
    """更新官方七影蝶"""
    # 找到对应的官方七影蝶
    official_butterfly = None
    for i, butterfly in enumerate(OFFICIAL_BUTTERFLIES):
        if butterfly["id"] == butterfly_id:
            official_butterfly = butterfly
            break
    
    if not official_butterfly:
        raise HTTPException(status_code=404, detail="官方七影蝶不存在")
    
    # 更新官方七影蝶
    official_butterfly.update({
        "label": butterfly_data.label,
        "hoverImg": butterfly_data.hover_img,
        "modalImg": butterfly_data.modal_img,
        "link": butterfly_data.link,
        "is_active": butterfly_data.is_active
    })
    
    return ButterflyInfo(
        id=official_butterfly["id"],
        label=official_butterfly["label"],
        hover_img=official_butterfly["hoverImg"],
        modal_img=official_butterfly["modalImg"],
        link=official_butterfly["link"],
        is_active=official_butterfly["is_active"],
        user_id=None,
        username="官方"
    )

# 更新用户七影蝶
@app.put("/api/admin/user-butterflies/{butterfly_id}", response_model=ButterflyInfo)
def update_user_butterfly(
    butterfly_id: int,
    butterfly_data: ButterflyUpdate,
    db: Session = Depends(get_db)
):
    """更新用户七影蝶"""
    # 从ID中提取真实的用户七影蝶ID
    real_butterfly_id = butterfly_id - 1000
    
    butterfly = db.query(UserButterfly).filter(UserButterfly.id == real_butterfly_id).first()
    if not butterfly:
        raise HTTPException(status_code=404, detail="用户七影蝶不存在")
    
    # 更新用户七影蝶
    butterfly.label = butterfly_data.label
    butterfly.hover_img = butterfly_data.hover_img
    butterfly.modal_img = butterfly_data.modal_img
    butterfly.link = butterfly_data.link
    butterfly.is_active = butterfly_data.is_active
    butterfly.updated_at = datetime.now()
    
    db.commit()
    db.refresh(butterfly)
    
    user = db.query(User).filter(User.id == butterfly.user_id).first()
    return ButterflyInfo(
        id=butterfly.id + 1000,
        label=butterfly.label,
        hover_img=butterfly.hover_img,
        modal_img=butterfly.modal_img,
        link=butterfly.link,
        is_active=butterfly.is_active,
        created_at=butterfly.created_at.isoformat() if butterfly.created_at else None,
        updated_at=butterfly.updated_at.isoformat() if butterfly.updated_at else None,
        user_id=butterfly.user_id,
        username=user.username if user else "未知用户"
    )

# 删除用户七影蝶
@app.delete("/api/admin/user-butterflies/{butterfly_id}")
def delete_user_butterfly(butterfly_id: int, db: Session = Depends(get_db)):
    """删除用户七影蝶"""
    # 从ID中提取真实的用户七影蝶ID
    real_butterfly_id = butterfly_id - 1000
    
    butterfly = db.query(UserButterfly).filter(UserButterfly.id == real_butterfly_id).first()
    if not butterfly:
        raise HTTPException(status_code=404, detail="用户七影蝶不存在")
    
    db.delete(butterfly)
    db.commit()
    
    return {"message": "用户七影蝶删除成功"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001) 