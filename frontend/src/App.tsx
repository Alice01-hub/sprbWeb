import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AudioProvider } from './contexts/AudioContext'
import HomePage from './pages/HomePage'
import ContentsPage from './pages/ContentsPage'
import TrafficPage from './pages/TrafficPage'
import CheckinPage from './pages/CheckinPage'
import OtherPilgrimagePage from './pages/OtherPilgrimagePage'
import './styles/global.css'

function App() {
  return (
    <AudioProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contents" element={<ContentsPage />} />
          <Route path="/traffic" element={<TrafficPage />} />
          <Route path="/checkin" element={<CheckinPage />} />
          <Route path="/other-pilgrimage" element={<OtherPilgrimagePage />} />
        </Routes>
      </Router>
    </AudioProvider>
  )
}

export default App 