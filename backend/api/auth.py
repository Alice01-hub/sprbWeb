from fastapi import APIRouter, HTTPException, Depends, status, Request, BackgroundTasks, File, UploadFile
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from jose import jwt, JWTError
from pydantic import BaseModel, EmailStr, ValidationError
from email_validator import validate_email, EmailNotValidError
from datetime import datetime, timedelta
from .database import SessionLocal
from .models import User
import os
import random
from fastapi.responses import JSONResponse
import shutil

SECRET_KEY = os.environ.get('SHENYU_SECRET_KEY', 'shenyu_dev_secret')
ALGORITHM = 'HS256'
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

router = APIRouter()

# Pydantic模型
class UserRegister(BaseModel):
    username: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

# 数据库依赖

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 密码加密与校验

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

# JWT生成

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# 注册接口
@router.post('/register', response_model=Token)
def register(user: UserRegister, db: Session = Depends(get_db)):
    # 用户名校验
    if not (3 <= len(user.username) <= 20):
        raise HTTPException(status_code=400, detail="用户名长度需为3-20个字符")
    if not all(c.isalnum() or c == '_' or '\u4e00' <= c <= '\u9fa5' for c in user.username):
        raise HTTPException(status_code=400, detail="用户名仅支持中英文、数字和下划线")
    # 密码校验
    if not (6 <= len(user.password) <= 20):
        raise HTTPException(status_code=400, detail="密码长度需为6-20位")
    if ' ' in user.password:
        raise HTTPException(status_code=400, detail="密码不能包含空格")
    # 用户名唯一性
    if db.query(User).filter_by(username=user.username).first():
        raise HTTPException(status_code=400, detail="用户名已存在")
    # 密码加密
    hashed_pw = hash_password(user.password)
    db_user = User(username=user.username, password_hash=hashed_pw, created_at=datetime.utcnow(), updated_at=datetime.utcnow())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    # 生成token
    token = create_access_token({"sub": db_user.username, "user_id": db_user.id})
    return {"access_token": token, "token_type": "bearer"}

# 登录接口
@router.post('/login', response_model=Token)
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter_by(username=user.username).first()
    if not db_user or not verify_password(user.password, db_user.password_hash):
        raise HTTPException(status_code=401, detail="用户名或密码错误")
    token = create_access_token({"sub": db_user.username, "user_id": db_user.id})
    return {"access_token": token, "token_type": "bearer"}

# 获取当前用户
from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="无法验证凭证",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except (JWTError, ValidationError):
        raise credentials_exception
    user = db.query(User).filter_by(username=username).first()
    if user is None:
        raise credentials_exception
    return user

# 权限系统（普通用户/管理员）

# 密码重置（伪实现，实际应结合邮箱验证码等）
class PasswordReset(BaseModel):
    username: str
    new_password: str

@router.post('/reset-password')
def reset_password(data: PasswordReset, db: Session = Depends(get_db)):
    user = db.query(User).filter_by(username=data.username).first()
    if not user:
        raise HTTPException(status_code=404, detail="用户不存在")
    user.password_hash = hash_password(data.new_password)
    user.updated_at = datetime.utcnow()
    db.commit()
    return {"msg": "密码重置成功"} 

UPLOAD_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'uploads', 'avatars')
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post('/upload-avatar')
def upload_avatar(file: UploadFile = File(...), user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    # 保存文件
    ext = os.path.splitext(file.filename)[-1]
    filename = f"{user.id}{ext}"
    file_path = os.path.join(UPLOAD_DIR, filename)
    with open(file_path, 'wb') as f:
        shutil.copyfileobj(file.file, f)
    # 更新用户avatar_url
    rel_path = f"/uploads/avatars/{filename}"
    user.avatar_url = rel_path
    db.commit()
    return {"avatar_url": rel_path}

@router.get('/me')
def get_me(user: User = Depends(get_current_user)):
    return {"username": user.username, "avatar_url": user.avatar_url} 