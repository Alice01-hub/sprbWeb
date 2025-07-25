from fastapi import APIRouter, HTTPException, Depends, status, Request, BackgroundTasks, File, UploadFile
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from jose import jwt, JWTError
from pydantic import BaseModel, EmailStr, ValidationError
from email_validator import validate_email, EmailNotValidError
from datetime import datetime, timedelta
from .database import SessionLocal
from .models import User, UserSession
import os
import random
import uuid
import logging
from fastapi.responses import JSONResponse
import shutil
from typing import Optional

# 配置日志
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

SECRET_KEY = os.environ.get('SHENYU_SECRET_KEY', 'shenyu_dev_secret')
ALGORITHM = 'HS256'
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24

# 增强密码加密配置 - 使用更高的rounds数提高安全性
pwd_context = CryptContext(
    schemes=["bcrypt"], 
    deprecated="auto",
    bcrypt__rounds=12  # 增加rounds数提高安全性
)

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
    expires_in: int
    user_id: int
    username: str

class UserResponse(BaseModel):
    id: int
    username: str
    avatar_url: Optional[str] = None
    created_at: datetime
    
class LogoutResponse(BaseModel):
    message: str
    success: bool

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

# JWT生成和会话管理

def create_access_token(data: dict, expires_delta: timedelta = None):
    """创建JWT访问令牌"""
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire, "iat": datetime.utcnow()})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt, expire

def create_user_session(user_id: int, db: Session) -> str:
    """创建用户会话记录"""
    session_token = str(uuid.uuid4())
    expires_at = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    # 清理过期的会话
    db.query(UserSession).filter(
        UserSession.user_id == user_id,
        UserSession.expires_at < datetime.utcnow()
    ).delete()
    
    # 创建新会话
    session = UserSession(
        user_id=user_id,
        session_token=session_token,
        expires_at=expires_at,
        is_active=True,
        created_at=datetime.utcnow()
    )
    db.add(session)
    db.commit()
    
    return session_token

def invalidate_user_sessions(user_id: int, db: Session):
    """使用户所有会话无效"""
    db.query(UserSession).filter(
        UserSession.user_id == user_id,
        UserSession.is_active == True
    ).update({"is_active": False})
    db.commit()

# 注册接口
@router.post('/register', response_model=Token)
def register(user: UserRegister, db: Session = Depends(get_db)):
    try:
        # 增强的用户名校验
        if not (3 <= len(user.username) <= 20):
            raise HTTPException(
                status_code=400, 
                detail={
                    "message": "用户名长度需为3-20个字符",
                    "field": "username",
                    "code": "INVALID_LENGTH"
                }
            )
        if not all(c.isalnum() or c == '_' or '\u4e00' <= c <= '\u9fa5' for c in user.username):
            raise HTTPException(
                status_code=400, 
                detail={
                    "message": "用户名仅支持中英文、数字和下划线",
                    "field": "username",
                    "code": "INVALID_CHARACTERS"
                }
            )
        
        # 增强的密码校验
        if not (6 <= len(user.password) <= 20):
            raise HTTPException(
                status_code=400, 
                detail={
                    "message": "密码长度需为6-20位",
                    "field": "password",
                    "code": "INVALID_LENGTH"
                }
            )
        if ' ' in user.password:
            raise HTTPException(
                status_code=400, 
                detail={
                    "message": "密码不能包含空格",
                    "field": "password",
                    "code": "INVALID_CHARACTERS"
                }
            )
        
        # 检查密码强度
        if not any(c.isdigit() for c in user.password):
            raise HTTPException(
                status_code=400,
                detail={
                    "message": "密码必须包含至少一个数字",
                    "field": "password",
                    "code": "WEAK_PASSWORD"
                }
            )
        
        # 用户名唯一性检查
        existing_user = db.query(User).filter_by(username=user.username).first()
        if existing_user:
            raise HTTPException(
                status_code=400, 
                detail={
                    "message": "用户名已存在",
                    "field": "username",
                    "code": "USERNAME_EXISTS"
                }
            )
        
        # 密码加密
        hashed_pw = hash_password(user.password)
        db_user = User(
            username=user.username, 
            password_hash=hashed_pw, 
            created_at=datetime.utcnow(), 
            updated_at=datetime.utcnow()
        )
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        
        # 生成token和会话
        token, expires_at = create_access_token({"sub": db_user.username, "user_id": db_user.id})
        session_token = create_user_session(db_user.id, db)
        
        logger.info(f"User registered successfully: {db_user.username}")
        
        return {
            "access_token": token, 
            "token_type": "bearer",
            "expires_in": ACCESS_TOKEN_EXPIRE_MINUTES * 60,
            "user_id": db_user.id,
            "username": db_user.username
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Registration error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail={
                "message": "注册过程中发生错误，请稍后重试",
                "code": "INTERNAL_ERROR"
            }
        )

# 登录接口
@router.post('/login', response_model=Token)
def login(user: UserLogin, db: Session = Depends(get_db)):
    try:
        # 查找用户
        db_user = db.query(User).filter_by(username=user.username).first()
        
        # 验证用户名和密码
        if not db_user or not verify_password(user.password, db_user.password_hash):
            logger.warning(f"Failed login attempt for username: {user.username}")
            raise HTTPException(
                status_code=401, 
                detail={
                    "message": "用户名或密码错误",
                    "code": "INVALID_CREDENTIALS"
                }
            )
        
        # 更新用户最后登录时间
        db_user.updated_at = datetime.utcnow()
        db.commit()
        
        # 生成token和会话
        token, expires_at = create_access_token({"sub": db_user.username, "user_id": db_user.id})
        session_token = create_user_session(db_user.id, db)
        
        logger.info(f"User logged in successfully: {db_user.username}")
        
        return {
            "access_token": token, 
            "token_type": "bearer",
            "expires_in": ACCESS_TOKEN_EXPIRE_MINUTES * 60,
            "user_id": db_user.id,
            "username": db_user.username
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Login error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail={
                "message": "登录过程中发生错误，请稍后重试",
                "code": "INTERNAL_ERROR"
            }
        )

# 获取当前用户
from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    """获取当前认证用户，增强安全验证"""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail={
            "message": "无法验证凭证",
            "code": "INVALID_TOKEN"
        },
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        # 解码JWT令牌
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        user_id: int = payload.get("user_id")
        exp: int = payload.get("exp")
        
        if username is None or user_id is None:
            logger.warning("Token missing required claims")
            raise credentials_exception
            
        # 检查令牌是否过期
        if exp and datetime.utcfromtimestamp(exp) < datetime.utcnow():
            logger.warning(f"Expired token for user: {username}")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail={
                    "message": "令牌已过期",
                    "code": "TOKEN_EXPIRED"
                },
                headers={"WWW-Authenticate": "Bearer"},
            )
            
    except JWTError as e:
        logger.warning(f"JWT decode error: {str(e)}")
        raise credentials_exception
    except ValidationError as e:
        logger.warning(f"Token validation error: {str(e)}")
        raise credentials_exception
    
    # 查找用户
    user = db.query(User).filter_by(username=username, id=user_id).first()
    if user is None:
        logger.warning(f"User not found for token: {username}")
        raise credentials_exception
    
    # 验证用户会话是否仍然有效
    active_session = db.query(UserSession).filter(
        UserSession.user_id == user_id,
        UserSession.is_active == True,
        UserSession.expires_at > datetime.utcnow()
    ).first()
    
    if not active_session:
        logger.warning(f"No active session for user: {username}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                "message": "会话已失效，请重新登录",
                "code": "SESSION_EXPIRED"
            },
            headers={"WWW-Authenticate": "Bearer"},
        )
    
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

# 允许的图片格式和最大文件大小
ALLOWED_IMAGE_TYPES = {'image/jpeg', 'image/png', 'image/gif', 'image/webp'}
MAX_AVATAR_SIZE = 5 * 1024 * 1024  # 5MB

@router.post('/upload-avatar')
def upload_avatar(file: UploadFile = File(...), user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """上传用户头像，增强错误处理"""
    try:
        # 验证文件类型
        if file.content_type not in ALLOWED_IMAGE_TYPES:
            raise HTTPException(
                status_code=400,
                detail={
                    "message": f"不支持的文件类型: {file.content_type}。支持的格式: JPEG, PNG, GIF, WebP",
                    "field": "file",
                    "code": "INVALID_FILE_TYPE"
                }
            )
        
        # 读取文件内容以检查大小
        file_content = file.file.read()
        file_size = len(file_content)
        
        # 验证文件大小
        if file_size > MAX_AVATAR_SIZE:
            raise HTTPException(
                status_code=400,
                detail={
                    "message": f"文件大小超过限制。最大允许: {MAX_AVATAR_SIZE // (1024*1024)}MB，当前: {file_size // (1024*1024)}MB",
                    "field": "file",
                    "code": "FILE_TOO_LARGE"
                }
            )
        
        if file_size == 0:
            raise HTTPException(
                status_code=400,
                detail={
                    "message": "文件为空",
                    "field": "file",
                    "code": "EMPTY_FILE"
                }
            )
        
        # 验证文件名
        if not file.filename:
            raise HTTPException(
                status_code=400,
                detail={
                    "message": "文件名不能为空",
                    "field": "file",
                    "code": "INVALID_FILENAME"
                }
            )
        
        # 创建用户专用目录
        user_upload_dir = os.path.join(UPLOAD_DIR, str(user.id))
        os.makedirs(user_upload_dir, exist_ok=True)
        
        # 生成安全的文件名
        ext = os.path.splitext(file.filename)[-1].lower()
        if not ext:
            ext = '.jpg'  # 默认扩展名
        
        timestamp = datetime.utcnow().strftime('%Y%m%d_%H%M%S')
        filename = f"avatar_{timestamp}{ext}"
        file_path = os.path.join(user_upload_dir, filename)
        
        # 删除旧头像文件（如果存在）
        if user.avatar_url:
            old_file_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), user.avatar_url.lstrip('/'))
            if os.path.exists(old_file_path):
                try:
                    os.remove(old_file_path)
                    logger.info(f"Removed old avatar: {old_file_path}")
                except OSError as e:
                    logger.warning(f"Failed to remove old avatar: {e}")
        
        # 保存新文件
        try:
            with open(file_path, 'wb') as f:
                f.write(file_content)
        except IOError as e:
            logger.error(f"Failed to save avatar file: {e}")
            raise HTTPException(
                status_code=500,
                detail={
                    "message": "文件保存失败，请稍后重试",
                    "code": "FILE_SAVE_ERROR"
                }
            )
        
        # 更新用户avatar_url
        rel_path = f"/uploads/avatars/{user.id}/{filename}"
        user.avatar_url = rel_path
        user.updated_at = datetime.utcnow()
        
        try:
            db.commit()
        except Exception as e:
            # 如果数据库更新失败，删除已保存的文件
            if os.path.exists(file_path):
                os.remove(file_path)
            logger.error(f"Database update failed for avatar upload: {e}")
            raise HTTPException(
                status_code=500,
                detail={
                    "message": "头像信息保存失败，请稍后重试",
                    "code": "DATABASE_ERROR"
                }
            )
        
        logger.info(f"Avatar uploaded successfully for user: {user.username}")
        
        return {
            "avatar_url": rel_path,
            "message": "头像上传成功",
            "file_size": file_size
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Avatar upload error for user {user.username}: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail={
                "message": "头像上传过程中发生错误，请稍后重试",
                "code": "INTERNAL_ERROR"
            }
        )

# 登出接口
@router.post('/logout', response_model=LogoutResponse)
def logout(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """用户登出，使所有会话无效"""
    try:
        # 使用户所有会话无效
        invalidate_user_sessions(user.id, db)
        
        logger.info(f"User logged out successfully: {user.username}")
        
        return {
            "message": "登出成功",
            "success": True
        }
        
    except Exception as e:
        logger.error(f"Logout error for user {user.username}: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail={
                "message": "登出过程中发生错误",
                "code": "INTERNAL_ERROR"
            }
        )

@router.get('/me', response_model=UserResponse)
def get_me(user: User = Depends(get_current_user)):
    """获取当前用户信息"""
    return {
        "id": user.id,
        "username": user.username,
        "avatar_url": user.avatar_url,
        "created_at": user.created_at
    } 