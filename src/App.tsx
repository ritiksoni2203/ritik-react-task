import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Profile from './pages/home/Profile'
import Login from './pages/login'
import Callback from './pages/callback'
import ProtectedRoute from './components/routes/ProtectedRoute'
import NotFound from './pages/notfound'

function App() {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/callback" element={<Callback />} />
      <Route path="/repos" element={<ProtectedRoute element={Home} />} />
      <Route path="/repos/:owner/:repo" element={<ProtectedRoute element={Profile} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
