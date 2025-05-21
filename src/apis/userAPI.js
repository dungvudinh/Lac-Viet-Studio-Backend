import { API_ROOT } from '~/utils/constants'
import axiosClient from '~/configs/axios'

export const login = async (email, password) => 
{
  const response = await axiosClient.post('/v1/user/login', { email, password }, { withCredentials:true })
  localStorage.setItem('accessToken', response.data.result.accessToken)
  localStorage.setItem('user', JSON.stringify(response.data.result.user))
}
export const refreshToken = async () => 
{
  const response = await axiosClient.post('v1/user/refresh-token')
  localStorage.setItem('accessToken', response.data.accessToken)
  return response.data.accessToken
}
export const logout = async () =>
{
  try 
  {
    return await axiosClient.post('v1/user/logout')
  }
  catch (error)
  {
    throw error 
  }
}
export const checkSession = async () =>
{
  try 
  {
    const response= await axiosClient.get('v1/user/check-session')
    if (response.status === 200)
      return true
    return false
  }
  catch (error)
  {
    console.log('error')
    return false
  }
}