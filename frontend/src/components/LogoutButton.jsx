import { useNavigate } from 'react-router-dom'

export default function LogoutButton() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    alert('Logged out successfully')
    navigate('/login')
  }

  return (
    <button onClick={handleLogout} style={{ position: 'absolute', top: 10, right: 10 }}>
      Logout
    </button>
  )
}

