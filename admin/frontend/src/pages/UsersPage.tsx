import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { UserInfo } from '../types';
import { FaUser, FaEnvelope, FaBolt, FaStar } from 'react-icons/fa';

const UsersContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 28px;
  color: #2c3e50;
  margin-bottom: 30px;
  text-align: center;
`;

const UsersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const UserCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const UserHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const UserAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 12px;
  object-fit: cover;
  border: 2px solid #3498db;
  background: #ecf0f1;
`;

const UserInfoDiv = styled.div`
  flex: 1;
`;

const Username = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 4px;
`;

const UserEmail = styled.div`
  font-size: 14px;
  color: #7f8c8d;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 6px;
  }
`;

const UserStats = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 16px;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background: #f8f9fa;
  border-radius: 6px;
  
  svg {
    margin-right: 8px;
    color: #3498db;
  }
  
  span {
    font-size: 14px;
    color: #2c3e50;
    font-weight: 500;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 18px;
  color: #7f8c8d;
`;

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 18px;
  color: #e74c3c;
`;

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8001/api/admin/users');
        setUsers(response.data);
      } catch (err) {
        setError('获取用户数据失败');
        console.error('获取用户数据失败:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <UsersContainer>
        <Title>用户管理</Title>
        <LoadingContainer>加载中...</LoadingContainer>
      </UsersContainer>
    );
  }

  if (error) {
    return (
      <UsersContainer>
        <Title>用户管理</Title>
        <ErrorContainer>{error}</ErrorContainer>
      </UsersContainer>
    );
  }

  return (
    <UsersContainer>
      <Title>用户管理 ({users.length} 个用户)</Title>
      
      <UsersGrid>
        {users.map((user) => (
          <UserCard key={user.id}>
            <UserHeader>
              <UserAvatar 
                src={user.avatar_url || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjUiIGN5PSIyNSIgcj0iMjUiIGZpbGw9IiMzNDk4ZGIiLz4KPHN2ZyB4PSIxMiIgeT0iMTIiIHdpZHRoPSIyNiIgaGVpZ2h0PSIyNiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJ3aGl0ZSI+CjxwYXRoIGQ9Ik0xMiAxMmMyLjIxIDAgNC0xLjc5IDQtNHMtMS43OS00LTQtNC00IDEuNzktNCA0IDEuNzkgNCA0IDR6bTAgMmMtMi42NyAwLTggMS4zNC04IDR2MmgxNnYtMmMwLTIuNjYtNS4zMy00LTgtNHoiLz4KPC9zdmc+Cjwvc3ZnPgo='} 
                alt={user.username}
                onError={(e) => {
                  // 如果头像加载失败，使用默认的SVG头像
                  e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjUiIGN5PSIyNSIgcj0iMjUiIGZpbGw9IiMzNDk4ZGIiLz4KPHN2ZyB4PSIxMiIgeT0iMTIiIHdpZHRoPSIyNiIgaGVpZ2h0PSIyNiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJ3aGl0ZSI+CjxwYXRoIGQ9Ik0xMiAxMmMyLjIxIDAgNC0xLjc5IDQtNHMtMS43OS00LTQtNC00IDEuNzktNCA0IDEuNzkgNCA0IDR6bTAgMmMtMi42NyAwLTggMS4zNC04IDR2MmgxNnYtMmMwLTIuNjYtNS4zMy00LTgtNHoiLz4KPC9zdmc+Cjwvc3ZnPgo=';
                }}
              />
              <UserInfoDiv>
                <Username>{user.username}</Username>
                {user.email && (
                  <UserEmail>
                    <FaEnvelope />
                    {user.email}
                  </UserEmail>
                )}
              </UserInfoDiv>
            </UserHeader>
            
            <UserStats>
              <StatItem>
                <FaBolt />
                <span>体力: {user.energy}/{user.max_energy}</span>
              </StatItem>
              <StatItem>
                <FaStar />
                <span>等级: {user.level}</span>
              </StatItem>
            </UserStats>
          </UserCard>
        ))}
      </UsersGrid>
    </UsersContainer>
  );
};

export default UsersPage; 