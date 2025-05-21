import { Navigate, useLocation } from 'react-router-dom'

const AuthRoute = ({ children }) => {
  const accessToken = localStorage.getItem('accessToken')
  const location = useLocation()

  if (accessToken) {
    // Nếu người dùng đã đăng nhập, chuyển hướng đến trang chính
    return <Navigate to="/admin" state={{ from: location }} replace />
  }

  return children
}

export default AuthRoute
