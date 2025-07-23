import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaStar, FaHome } from 'react-icons/fa';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: 250px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  height: 100vh;
  padding: 20px 0;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  color: white;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 40px;
  padding: 0 20px;
`;

const NavItem = styled(Link)<{ active?: boolean }>`
  display: flex;
  align-items: center;
  padding: 15px 20px;
  color: ${props => props.active ? '#fff' : 'rgba(255, 255, 255, 0.8)'};
  text-decoration: none;
  font-weight: ${props => props.active ? '600' : '400'};
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
  border-left: 3px solid ${props => props.active ? '#fff' : 'transparent'};
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
  }
  
  svg {
    margin-right: 12px;
    font-size: 16px;
  }
`;

const menuItems = [
  { path: '/', label: '仪表盘', icon: <FaTachometerAlt /> },
  { path: '/users', label: '用户管理', icon: <FaUsers /> },
  { path: '/butterflies', label: '七影蝶管理', icon: <FaStar /> }
];

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <SidebarContainer>
      <Logo>Summer Pockets 统一后台管理</Logo>
      {menuItems.map((item) => (
        <NavItem
          key={item.path}
          to={item.path}
          active={location.pathname === item.path}
        >
          {item.icon}
          {item.label}
        </NavItem>
      ))}
    </SidebarContainer>
  );
};

export default Sidebar; 