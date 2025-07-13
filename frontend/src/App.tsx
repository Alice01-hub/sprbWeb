import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { MusicProvider } from './contexts/MusicContext'
import HomePage from './pages/HomePage'
import ContentsPage from './pages/ContentsPage'
import TrafficPage from './pages/TrafficPage'
import CheckinPage from './pages/CheckinPage'
import DivineRealmPage from './pages/DivineRealmPage'
import MusicPlayer from './components/MusicPlayer'
import ImageCursor from './components/ImageCursor'
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
          </Routes>
          <MusicPlayer />
          {/* 🦋 七影碟图片拖尾特效 - 基于TextCursor逻辑实现 */}
          <div style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            width: '100vw', 
            height: '100vh', 
            pointerEvents: 'none',
            zIndex: 999
          }}>
            <ImageCursor
              imageSrc="/images/七影碟.png"
              delay={0.01}
              spacing={80}
              followMouseDirection={true}
              randomFloat={false}
              exitDuration={0.3}
              removalInterval={20}
              maxPoints={10}
              imageSize={40}
            />
          </div>
        </div>
      </Router>
    </MusicProvider>
  )
}

export default App 