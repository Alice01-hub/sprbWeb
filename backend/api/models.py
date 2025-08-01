from sqlalchemy import Column, Integer, String, Boolean, Float, Text, Enum, ForeignKey, TIMESTAMP
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
import enum
import datetime

Base = declarative_base()

class MemoryTypeEnum(enum.Enum):
    image = 'image'
    text = 'text'
    video = 'video'

class ActionTypeEnum(enum.Enum):
    view = 'view'
    like = 'like'
    upload = 'upload'
    sleep = 'sleep'

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(50), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    email = Column(String(100), unique=True)
    avatar_url = Column(String(255))
    energy = Column(Integer, default=100)
    max_energy = Column(Integer, default=100)
    last_sleep_time = Column(TIMESTAMP)
    total_sleep_time = Column(Integer, default=0)
    level = Column(Integer, default=1)
    experience = Column(Integer, default=0)
    created_at = Column(TIMESTAMP)
    updated_at = Column(TIMESTAMP)
    butterflies = relationship('Butterfly', back_populates='user')
    user_butterflies = relationship('UserButterfly', back_populates='user')
    sessions = relationship('UserSession', back_populates='user')
    game_records = relationship('GameRecord', back_populates='user')
    image_processing_tasks = relationship('ImageProcessingTask', back_populates='user')

class Butterfly(Base):
    __tablename__ = 'butterflies'
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    name = Column(String(100), nullable=False)
    description = Column(Text)
    memory_type = Column(Enum(MemoryTypeEnum), nullable=False)
    memory_content = Column(Text, nullable=False)
    memory_thumbnail = Column(String(255))
    memory_size = Column(Integer, default=0)
    is_uploaded = Column(Boolean, default=False)
    upload_time = Column(TIMESTAMP)
    position_x = Column(Float, default=0)
    position_y = Column(Float, default=0)
    view_count = Column(Integer, default=0)
    like_count = Column(Integer, default=0)
    created_at = Column(TIMESTAMP)
    updated_at = Column(TIMESTAMP)
    user = relationship('User', back_populates='butterflies')
    game_records = relationship('GameRecord', back_populates='butterfly')

class UserButterfly(Base):
    """用户自定义七影蝶表"""
    __tablename__ = 'user_butterflies'
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    label = Column(String(200), nullable=False)  # 悬停时显示的标题
    description = Column(Text, nullable=True)  # 可选说明文本
    link = Column(String(500))  # 点击时跳转的链接
    is_active = Column(Boolean, default=True)  # 是否激活
    created_at = Column(TIMESTAMP)
    updated_at = Column(TIMESTAMP)
    user = relationship('User', back_populates='user_butterflies')

class GameRecord(Base):
    __tablename__ = 'game_records'
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    action_type = Column(Enum(ActionTypeEnum), nullable=False)
    energy_consumed = Column(Integer, default=0)
    energy_gained = Column(Integer, default=0)
    target_butterfly_id = Column(Integer, ForeignKey('butterflies.id'))
    session_id = Column(String(100))
    ip_address = Column(String(45))
    user_agent = Column(Text)
    created_at = Column(TIMESTAMP)
    user = relationship('User', back_populates='game_records')
    butterfly = relationship('Butterfly', back_populates='game_records')

class UserSession(Base):
    __tablename__ = 'user_sessions'
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    session_token = Column(String(255), unique=True, nullable=False)
    expires_at = Column(TIMESTAMP, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(TIMESTAMP)
    user = relationship('User', back_populates='sessions')

class ProcessingStatusEnum(enum.Enum):
    """图片处理任务状态枚举"""
    processing = 'processing'
    done = 'done'
    failed = 'failed'

class ImageProcessingTask(Base):
    """图片处理任务数据模型"""
    __tablename__ = 'image_processing_tasks'
    
    id = Column(String(36), primary_key=True)  # UUID作为主键
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    original_filename = Column(String(255), nullable=False)  # 原始文件名
    status = Column(Enum(ProcessingStatusEnum), default=ProcessingStatusEnum.processing)  # 处理状态
    result_url = Column(String(500))  # 处理结果URL
    error_message = Column(Text)  # 错误信息（如果处理失败）
    file_size = Column(Integer)  # 原始文件大小
    processed_size = Column(Integer)  # 处理后文件大小
    image_type = Column(String(50))  # 图片类型 (hover, modal, avatar等)
    upload_type = Column(String(50))  # 上传类型 (butterfly, avatar等)
    created_at = Column(TIMESTAMP, default=datetime.datetime.utcnow)  # 创建时间
    
    # 关联到用户
    user = relationship('User', back_populates='image_processing_tasks')