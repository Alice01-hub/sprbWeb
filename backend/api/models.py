from sqlalchemy import Column, Integer, String, Boolean, Float, Text, Enum, ForeignKey, TIMESTAMP
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
import enum

Base = declarative_base()

class MemoryTypeEnum(enum.Enum):
    image = 'image'
    text = 'text'
    video = 'video'

class ActionTypeEnum(enum.Enum):
    view_memory = 'view_memory'
    interact = 'interact'
    sleep = 'sleep'
    upload = 'upload'
    create = 'create'

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
    is_admin = Column(Boolean, default=False)  # 是否为管理员
    created_at = Column(TIMESTAMP)
    updated_at = Column(TIMESTAMP)
    butterflies = relationship('Butterfly', back_populates='user')
    sessions = relationship('UserSession', back_populates='user')
    game_records = relationship('GameRecord', back_populates='user')

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