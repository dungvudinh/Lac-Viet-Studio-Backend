import { useLocation, Navigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { setLoading } from '~/redux/features/slices/loadingSlice'
import { useEffect, useState } from 'react'
import { checkSession } from '~/apis/userAPI'
import Loading from '~/pages/Loading'
function ProtectedRoute({ children }) {
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(true)
  const [isSessionValid, setIsSessionValid] = useState(false)
  const accessToken = localStorage.getItem('accessToken')
  useEffect(() =>
  {
    async function verifySession()
    {
      if (accessToken)
      {
        const isValid = await checkSession()
        setIsSessionValid(isValid)
        setIsLoading(false)
      }
      else 
        setIsLoading(false)
    }
    verifySession()
  }, [accessToken])
  
  if (isLoading)
    return <Loading />
  if (!accessToken && !isSessionValid) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace state={{ from: location }} />
  }
  try 
  {
    const decoded = jwtDecode(accessToken)
    const userRole = decoded.role
    if (userRole === 'admin' || userRole === 'sale') {
      return children
    } else {
      return <Navigate to="/unauthorized" replace />
    }
  }
  catch (error)
  {
    console.error('Lỗi giải mã access token:', error)
    return <Navigate to="/login" replace state={{ from: location }} />
  }
}

export default ProtectedRoute
