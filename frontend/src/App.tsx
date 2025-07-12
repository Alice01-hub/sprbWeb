import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { MusicProvider } from './contexts/MusicContext'
import HomePage from './pages/HomePage'
import ContentsPage from './pages/ContentsPage'
import TrafficPage from './pages/TrafficPage'
import CheckinPage from './pages/CheckinPage'
import DivineRealmPage from './pages/DivineRealmPage'
import MusicPlayer from './components/MusicPlayer'
import './styles/global.css'

function App() {
  return (
    <MusicProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contents" element={<ContentsPage />} />
          <Route path="/traffic" element={<TrafficPage />} />
          <Route path="/checkin" element={<CheckinPage />} />
          <Route path="/divine-realm" element={<DivineRealmPage />} />
        </Routes>
        <MusicPlayer />
      </Router>
    </MusicProvider>
  )
}

export default App 