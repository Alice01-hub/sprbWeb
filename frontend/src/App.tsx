import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { MusicProvider } from './contexts/MusicContext'
import HomePage from './pages/HomePage'
import ContentsPage from './pages/ContentsPage'
import TrafficPage from './pages/TrafficPage'
import CheckinPage from './pages/CheckinPage'
import DivineRealmPage from './pages/DivineRealmPage'
import OtherPilgrimagePage from './pages/OtherPilgrimagePage'
import MegijimaPage from './pages/MegijimaPage'
import OgijimaPage from './pages/OgijimaPage'
import NaoshimaPage from './pages/NaoshimaPage'
import ProgressPage from './pages/ProgressPage'
import MusicPlayer from './components/MusicPlayer'
import ButterflyCustomCursor from './components/ButterflyCustomCursor'
import './styles/global.css'

function App() {
  return (
    <MusicProvider>
      <Router>
        <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/contents" element={<ContentsPage />} />
            <Route path="/traffic" element={<TrafficPage />} />
            <Route path="/checkin" element={<CheckinPage />} />
            <Route path="/divine-realm" element={<DivineRealmPage />} />
            <Route path="/other-pilgrimage" element={<OtherPilgrimagePage />} />
            <Route path="/megijima" element={<MegijimaPage />} />
            <Route path="/ogijima" element={<OgijimaPage />} />
            <Route path="/naoshima" element={<NaoshimaPage />} />
            <Route path="/progress" element={<ProgressPage />} />
          </Routes>
          <MusicPlayer />
          {/* 🦋 蝴蝶扇动翅膀自定义鼠标特效 */}
          <ButterflyCustomCursor />
        </div>
      </Router>
    </MusicProvider>
  )
}

export default App 