import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Profile from './pages/home/Profile'
import Login from './pages/login'
import { RequireAuth } from './components/routes/ProtectedRoute'

function App() {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<RequireAuth />}>
        <Route path="/repos" element={<Home />} />
        <Route path="/repos/:owner/:repo" element={<Profile />} />
      </Route>
    </Routes>
  )
}

export default App
