import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { ButterflyInfo, ButterflyUpdate } from '../types';
import { FaEdit, FaTrash, FaEye, FaEyeSlash, FaLink, FaUser, FaCrown, FaImage, FaCalendar, FaExternalLinkAlt } from 'react-icons/fa';

const ButterfliesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 28px;
  color: #2c3e50;
  margin-bottom: 30px;
  text-align: center;
`;

const ButterfliesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 25px;
`;

const ButterflyCard = styled.div`
  background: white;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.15);
  }
`;

const ButterflyHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #ecf0f1;
`;

const ButterflyTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #2c3e50;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 10px;
    color: #f39c12;
    font-size: 18px;
  }
`;

const ButterflyOwner = styled.div`
  font-size: 12px;
  color: white;
  padding: 6px 12px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  font-weight: 600;
  background: ${props => props.children === '官方' ? '#e74c3c' : '#3498db'};
  
  svg {
    margin-right: 6px;
    font-size: 10px;
  }
`;

const ButterflyContent = styled.div`
  margin-bottom: 20px;
`;

const ImageSection = styled.div`
  margin-bottom: 20px;
`;

const ImageTitle = styled.h4`
  font-size: 14px;
  color: #34495e;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  font-weight: 600;
  
  svg {
    margin-right: 8px;
    color: #3498db;
  }
`;

const ButterflyImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  border: 2px solid #ecf0f1;
  margin-bottom: 8px;
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #7f8c8d;
  font-size: 16px;
  border: 2px dashed #bdc3c7;
  margin-bottom: 8px;
`;

const ImagePath = styled.div`
  font-size: 12px;
  color: #7f8c8d;
  background: #f8f9fa;
  padding: 8px 12px;
  border-radius: 6px;
  border-left: 3px solid #3498db;
  word-break: break-all;
`;

const InfoSection = styled.div`
  margin-bottom: 15px;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  font-size: 14px;
  color: #2c3e50;
  
  svg {
    margin-right: 10px;
    color: #3498db;
    width: 14px;
    flex-shrink: 0;
  }
`;

const InfoLabel = styled.span`
  font-weight: 600;
  margin-right: 8px;
  min-width: 80px;
`;

const InfoValue = styled.span`
  color: #7f8c8d;
  flex: 1;
`;

const LinkItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  font-size: 14px;
  color: #2c3e50;
  
  svg {
    margin-right: 10px;
    color: #3498db;
    width: 14px;
    flex-shrink: 0;
  }
`;

const LinkValue = styled.a`
  color: #3498db;
  text-decoration: none;
  word-break: break-all;
  
  &:hover {
    text-decoration: underline;
  }
`;

const StatusBadge = styled.div<{ isActive: boolean }>`
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  background: ${props => props.isActive ? '#27ae60' : '#e74c3c'};
  color: white;
  
  svg {
    margin-right: 6px;
  }
`;

const ButterflyActions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid #ecf0f1;
`;

const ActionButton = styled.button<{ variant?: 'edit' | 'delete' | 'toggle' }>`
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  
  background: ${props => {
    if (props.variant === 'delete') return '#e74c3c';
    if (props.variant === 'toggle') return '#f39c12';
    return '#3498db';
  }};
  color: white;
  
  &:hover {
    opacity: 0.8;
    transform: translateY(-2px);
  }
  
  svg {
    margin-right: 6px;
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

const ButterfliesPage: React.FC = () => {
  const [butterflies, setButterflies] = useState<ButterflyInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchButterflies = async () => {
      try {
        const response = await axios.get('http://localhost:8001/api/admin/butterflies');
        setButterflies(response.data);
      } catch (err) {
        setError('获取七影蝶数据失败');
        console.error('获取七影蝶数据失败:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchButterflies();
  }, []);

  const handleToggleActive = async (butterfly: ButterflyInfo) => {
    try {
      const updateData: ButterflyUpdate = {
        label: butterfly.label,
        hover_img: butterfly.hover_img,
        modal_img: butterfly.modal_img,
        link: butterfly.link,
        is_active: !butterfly.is_active
      };

      if (butterfly.user_id) {
        // 用户七影蝶
        await axios.put(`http://localhost:8001/api/admin/user-butterflies/${butterfly.id}`, updateData);
      } else {
        // 官方七影蝶
        await axios.put(`http://localhost:8001/api/admin/butterflies/${butterfly.id}`, updateData);
      }

      // 更新本地状态
      setButterflies(prev => prev.map(b => 
        b.id === butterfly.id ? { ...b, is_active: !b.is_active } : b
      ));
    } catch (err) {
      console.error('更新七影蝶状态失败:', err);
    }
  };

  const handleDelete = async (butterfly: ButterflyInfo) => {
    if (!butterfly.user_id) {
      alert('官方七影蝶不能删除');
      return;
    }

    if (window.confirm('确定要删除这个七影蝶吗？')) {
      try {
        await axios.delete(`http://localhost:8001/api/admin/user-butterflies/${butterfly.id}`);
        setButterflies(prev => prev.filter(b => b.id !== butterfly.id));
      } catch (err) {
        console.error('删除七影蝶失败:', err);
      }
    }
  };

  if (loading) {
    return (
      <ButterfliesContainer>
        <Title>七影蝶管理</Title>
        <LoadingContainer>加载中...</LoadingContainer>
      </ButterfliesContainer>
    );
  }

  if (error) {
    return (
      <ButterfliesContainer>
        <Title>七影蝶管理</Title>
        <ErrorContainer>{error}</ErrorContainer>
      </ButterfliesContainer>
    );
  }

  return (
    <ButterfliesContainer>
      <Title>七影蝶管理 ({butterflies.length} 个七影蝶)</Title>
      
      <ButterfliesGrid>
        {butterflies.map((butterfly) => (
          <ButterflyCard key={butterfly.id}>
            <ButterflyHeader>
              <ButterflyTitle>
                {butterfly.user_id ? <FaUser /> : <FaCrown />}
                {butterfly.label}
              </ButterflyTitle>
              <ButterflyOwner>
                {butterfly.user_id ? <FaUser /> : <FaCrown />}
                {butterfly.username}
              </ButterflyOwner>
            </ButterflyHeader>
            
            <ButterflyContent>
              {/* 悬停图片 */}
              <ImageSection>
                <ImageTitle>
                  <FaImage />
                  悬停图片
                </ImageTitle>
                {butterfly.hover_img ? (
                  <>
                    <ButterflyImage src={`http://localhost:8000${butterfly.hover_img}`} alt="悬停图片" />
                    <ImagePath>{butterfly.hover_img}</ImagePath>
                  </>
                ) : (
                  <>
                    <ImagePlaceholder>暂无悬停图片</ImagePlaceholder>
                    <ImagePath>未设置</ImagePath>
                  </>
                )}
              </ImageSection>

              {/* 模态框图片 */}
              <ImageSection>
                <ImageTitle>
                  <FaImage />
                  模态框图片
                </ImageTitle>
                {butterfly.modal_img ? (
                  <>
                    <ButterflyImage src={`http://localhost:8000${butterfly.modal_img}`} alt="模态框图片" />
                    <ImagePath>{butterfly.modal_img}</ImagePath>
                  </>
                ) : (
                  <>
                    <ImagePlaceholder>暂无模态框图片</ImagePlaceholder>
                    <ImagePath>未设置</ImagePath>
                  </>
                )}
              </ImageSection>

              {/* 基本信息 */}
              <InfoSection>
                <InfoItem>
                  <FaUser />
                  <InfoLabel>ID:</InfoLabel>
                  <InfoValue>{butterfly.id}</InfoValue>
                </InfoItem>
                
                <InfoItem>
                  {butterfly.is_active ? <FaEye /> : <FaEyeSlash />}
                  <InfoLabel>状态:</InfoLabel>
                  <InfoValue>
                    <StatusBadge isActive={butterfly.is_active}>
                      {butterfly.is_active ? <FaEye /> : <FaEyeSlash />}
                      {butterfly.is_active ? '活跃' : '禁用'}
                    </StatusBadge>
                  </InfoValue>
                </InfoItem>

                {butterfly.link && (
                  <LinkItem>
                    <FaLink />
                    <InfoLabel>链接:</InfoLabel>
                    <LinkValue href={butterfly.link} target="_blank" rel="noopener noreferrer">
                      {butterfly.link}
                      <FaExternalLinkAlt style={{ marginLeft: '5px', fontSize: '10px' }} />
                    </LinkValue>
                  </LinkItem>
                )}

                {butterfly.created_at && (
                  <InfoItem>
                    <FaCalendar />
                    <InfoLabel>创建时间:</InfoLabel>
                    <InfoValue>{new Date(butterfly.created_at).toLocaleString()}</InfoValue>
                  </InfoItem>
                )}

                {butterfly.updated_at && (
                  <InfoItem>
                    <FaCalendar />
                    <InfoLabel>更新时间:</InfoLabel>
                    <InfoValue>{new Date(butterfly.updated_at).toLocaleString()}</InfoValue>
                  </InfoItem>
                )}
              </InfoSection>
            </ButterflyContent>
            
            <ButterflyActions>
              <ActionButton variant="toggle" onClick={() => handleToggleActive(butterfly)}>
                {butterfly.is_active ? <FaEyeSlash /> : <FaEye />}
                {butterfly.is_active ? '禁用' : '启用'}
              </ActionButton>
              {butterfly.user_id && (
                <ActionButton variant="delete" onClick={() => handleDelete(butterfly)}>
                  <FaTrash />
                  删除
                </ActionButton>
              )}
            </ButterflyActions>
          </ButterflyCard>
        ))}
      </ButterfliesGrid>
    </ButterfliesContainer>
  );
};

export default ButterfliesPage; 