import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Dashboard from './pages/Dashboard';
import UsersPage from './pages/UsersPage';
import ButterfliesPage from './pages/ButterfliesPage';
import TrafficCardsPage from './pages/TrafficCardsPage';
import Sidebar from './components/Sidebar';

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

const MainContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
`;

const App: React.FC = () => {
  return (
    <AppContainer>
      <Sidebar />
      <MainContent>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/butterflies" element={<ButterfliesPage />} />
        </Routes>
      </MainContent>
    </AppContainer>
  );
};

export default App; 