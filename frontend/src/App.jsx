import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import LikedMeals from './pages/LikedMeals'
import AdminDashboard from './pages/AdminDashboard'
import LogoutButton from './components/LogoutButton'

function App() {
  const location = useLocation()
  const hideLogoutOn = ['/', '/login', '/register']
  const showLogout = !hideLogoutOn.includes(location.pathname)

  return (
    <div>
      {showLogout && <LogoutButton />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/liked" element={<LikedMeals />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
