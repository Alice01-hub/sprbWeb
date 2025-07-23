import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { SystemStats } from '../types';
import { FaUsers, FaStar, FaChartLine, FaDatabase } from 'react-icons/fa';

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 28px;
  color: #2c3e50;
  margin-bottom: 30px;
  text-align: center;
`;

const SubTitle = styled.h2`
  font-size: 18px;
  color: #7f8c8d;
  text-align: center;
  margin-bottom: 20px;
  font-weight: 400;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
`;

const StatCard = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const StatIcon = styled.div`
  font-size: 32px;
  margin-bottom: 16px;
  color: #3498db;
`;

const StatValue = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 8px;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #7f8c8d;
  font-weight: 500;
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

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:8001/api/admin/stats');
        setStats(response.data);
      } catch (err) {
        setError('获取统计数据失败');
        console.error('获取统计数据失败:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <DashboardContainer>
        <Title>统一后台管理系统</Title>
        <SubTitle>支持多业务统一管理（七影蝶、交通信息等）</SubTitle>
        <LoadingContainer>加载中...</LoadingContainer>
      </DashboardContainer>
    );
  }

  if (error) {
    return (
      <DashboardContainer>
        <Title>统一后台管理系统</Title>
        <SubTitle>支持多业务统一管理（七影蝶、交通信息等）</SubTitle>
        <ErrorContainer>{error}</ErrorContainer>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <Title>统一后台管理系统</Title>
      <SubTitle>支持多业务统一管理（七影蝶、交通信息等）</SubTitle>
      
      <StatsGrid>
        <StatCard>
          <StatIcon>
            <FaUsers />
          </StatIcon>
          <StatValue>{stats?.total_users || 0}</StatValue>
          <StatLabel>总用户数</StatLabel>
        </StatCard>
        
        <StatCard>
          <StatIcon>
            <FaStar />
          </StatIcon>
          <StatValue>{stats?.total_butterflies || 0}</StatValue>
          <StatLabel>官方七影蝶</StatLabel>
        </StatCard>
        
        <StatCard>
          <StatIcon>
            <FaStar />
          </StatIcon>
          <StatValue>{stats?.total_user_butterflies || 0}</StatValue>
          <StatLabel>用户七影蝶</StatLabel>
        </StatCard>
        
        <StatCard>
          <StatIcon>
            <FaDatabase />
          </StatIcon>
          <StatValue>{stats?.active_user_butterflies || 0}</StatValue>
          <StatLabel>活跃用户七影蝶</StatLabel>
        </StatCard>
      </StatsGrid>
    </DashboardContainer>
  );
};

export default Dashboard; 