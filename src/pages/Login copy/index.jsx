import { useState } from 'react'
import styles from './Login.module.scss'
import classNames from 'classnames/bind'
import { Typography, TextField, Box, InputAdornment, Checkbox, IconButton, Button } from '@mui/material'
import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material'
import { FacebookIcon, GoogleIcon } from '~/client/assets/Icons'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setLoading } from '~/redux/features/shared/slices/loadingSlice'
import { setOpenAlert, setAlertStatus, setAlertMessage } from '~/redux/features/shared/slices/alertSlice'
import { login } from '~/shared/apis/userAPI'
import validator from 'validator'

const cx = classNames.bind(styles)

function Login()
{
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const [account, setAccount] = useState({
    email: '',
    password: ''
  })
  const [message, setMessage] = useState({
    email: '',
    password: ''
  })
  const [validateAccount, setValidateAccount] = useState({
    isValidateEmail: false,
    isValidatePassword: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const from = location.state?.from?.pathname || '/'
  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }
  const handleLogin = async () => {
    dispatch(setLoading(true))
    try {
      await login(account.email, account.password)
      dispatch(setOpenAlert(true))
      dispatch(setAlertStatus('success'))
      dispatch(setAlertMessage('Đăng nhập thành công'))
      dispatch(setLoading(false))
      setTimeout(() => {
        navigate('/admin')
      }, 2000)
    } catch (error) {
      console.log(error)
      setMessage(error)
    }
  }
    
  const handleValidateAccount = () => {
    if (account.email !== '') {
      if (!validator.isEmail(account.email)) {
        setValidateAccount({ ...validateAccount, isValidateEmail: true })
        setMessage({ ...message, email: 'Email không hợp lệ' })
      } else 
        setValidateAccount({ ...validateAccount, isValidateEmail: false })
    } else {
      setValidateAccount({ ...validateAccount, isValidateEmail: true })
      setMessage({ ...message, email: 'Email is required' })
    }
    if (account.password === '') {
      setValidateAccount({ ...validateAccount, isValidatePassword: true })
      setMessage({ ...message, password: 'Password is required' })
    }
  }

  return (
    <Box className={cx('login-container')}>
      <Box className={cx('login-form')}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 500, textAlign: 'center', fontSize: 'var(--title-fs-sm)' }}>
                    Tài Khoản Lạc Việt Studio
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 500, textAlign: 'center', fontSize: 'var(--title-fs-sm)', mt: 3 }}>
                    Đăng Nhập
        </Typography>
        <Box component="form" sx={{ width: '100%', maxWidth: 400, margin: '0 auto' }}>
                    
          <TextField
            required
            fullWidth
            size="small"
            variant="standard"
            error={validateAccount.isValidateEmail}
            helperText={validateAccount.isValidateEmail ? message.email : ''}
            onChange={(e) => setAccount({ ...account, email: e.target.value })}
            onBlur={handleValidateAccount}
            placeholder='Địa chỉ Email*'
            sx={{ '& input': { fontSize: 'var(--desc-fs-xs)' } }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            size="small"
            variant="standard"
            error={validateAccount.isValidatePassword}
            helperText={validateAccount.isValidatePassword ? message.password : ''}
            onChange={(e) => setAccount({ ...account, password: e.target.value })}
            onBlur={handleValidateAccount}
            placeholder='Mật khẩu*'
            type={showPassword ? 'text' : 'password'}
            sx={{ '& input': { fontSize: 'var(--desc-fs-xs)' } }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? 
                      <VisibilityOutlined fontSize='small' sx={{ width: 15, height: 15, color: '#111' }} /> :
                      <VisibilityOffOutlined fontSize='small' sx={{ width: 15, height: 15, color: '#111' }} />
                    }
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, color: '#fff', textTransform: 'none', fontSize: 'var(--fs-md)', fontWeight: 600 }}
            onClick={handleLogin}
            disabled={!(agreed && account.email && account.password)}
          >
                        Đăng Nhập
          </Button>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 1, marginTop: 2 }}>
            <Typography sx={{ fontSize: 'var(--fs-md)', color: '#f77919', cursor: 'pointer' }}
              onClick={() => navigate('/register')}>
                            Tạo tài khoản
            </Typography>
            <Typography sx={{ fontSize: 'var(--fs-md)', color: '#f77919', cursor: 'pointer' }}
              onClick={() => navigate('/forgot-password')}>
                            Quên mật khẩu?
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <Checkbox
              size="small"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <Typography sx={{ fontSize: 'var(--fs-sm)' }}>
                            Tôi đồng ý với <span style={{ color: '#f77919' }}>Điều khoản sử dụng</span> và <span style={{ color: '#f77919' }}> Chính sách bảo mật</span>
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 1 }}>
            <Typography sx={{ fontSize: 'var(--fs-lg)', color: 'rgb(137, 137, 137)', mb: 1 }} className={cx('login-other_text')}>
                            Đăng nhập với tài khoản khác
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
              <IconButton sx={{ p: 1 }} size='small'>
                <GoogleIcon width={30} height={30} />
              </IconButton>
              <IconButton sx={{ p: 1 }} size="small">
                <FacebookIcon width={35} height={35} />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Login