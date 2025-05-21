import { useState } from 'react'
import { Box, Badge, Menu, MenuItem, ListItemText, ListItemIcon, Divider, Typography, Stack,
  Button
} from '@mui/material'
import styles from './Navbar.module.scss'
import classNames from 'classnames/bind'
import { CartIcon, RingIcon } from '~/assets/Icons'
import defaultAvtUser from '~/assets/Images/defaultAvtUser.jpg'
import { ClearOutlined, LockOutlined, LogoutOutlined, ShoppingCartOutlined } from '@mui/icons-material'
import { logout } from '~/apis/userAPI'
import { useNavigate } from 'react-router-dom'
const cx = classNames.bind(styles)

function Navbar() {
  return ( 
    <Box className={cx('navbar-container')} sx={{ position: 'fixed', top: 0, right: 0 }}>
      {/* <Box className='navbar-left'></Box> */}
      {/* navbar right */}
      <Box sx={{ display:'flex', justifyContent:'flex-end', alignItems:'center', height:'100%' }}>
        <ul className={cx('navbar-list')}>
          <li className={cx('navbar-list_item')}>
            <Box sx={{
              border:'1px solid var(--navbar-border-color)', 
              borderRadius:'5px',
              padding:'2px 5px 5px 5px'
            }}>
              <Badge badgeContent='4' sx={{ '.MuiBadge-badge':{ color:'#fff', backgroundColor:'var(--text-black)' } }}>
                <CartIcon width={18} height={18} color={'var(--icon-prime-color)'}/>
              </Badge>
            </Box>
          </li>
          <li className={cx('navbar-list_item')}>
            <Notification />
          </li>
          <li className={cx('navbar-list_item')}>
            <UserMenu />
          </li>
                    
        </ul>
      </Box>
    </Box>
  )
}

const UserMenu = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')))
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleLogout = async () =>
  {
    try 
    {
      const response = await logout()
      if (response.status === 200)
      {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('user')
        navigate('/login')
        window.location.reload()
      }
      else 
        console.log('Logout Fail')
    }
    catch (error)
    {
      console.log(error)
    } 
  }
  return (
    <>
      <Button 
        onClick={handleClick} 
        sx={{ 
          minWidth: 'auto', 
          padding: 0, 
          border: 'none', 
          backgroundColor: 'transparent',
          '&:hover': {
            backgroundColor: 'transparent'
          }
        }}
      >
        <img src={defaultAvtUser} alt="" style={{ width:'2rem', height:'2rem', borderRadius:'5px' }}/>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ top:'1rem' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem sx={{ display:'flex', direction:'column', paddingTop:'10px', paddingBottom:'10px' }}>
          <Stack direction='column' justifyContent='center' alignItems='center'>
            <Typography varient='p' sx={{ fontSize:'var(--fs-lg)', fontWeight:600 }}>{user.name}</Typography>
            <Typography varient='p' sx={{ fontSize:'var(--fs-md)', color:'var(--text-muted)' }}>{user.email}</Typography>
          </Stack>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <span className='icon-bg'>
              <LockOutlined color='primary' fontSize='small'/>
            </span>
          </ListItemIcon>
          <Typography variant='h6' fontSize={'var(--fs-lg)'}>Đổi mật khẩu</Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <span className='icon-bg'>
              <LogoutOutlined color='primary' fontSize='small' />
            </span>
          </ListItemIcon>
          <Typography variant='h6' fontSize={'var(--fs-lg)'}>Đăng xuất</Typography>
        </MenuItem>
      </Menu>
    </>
  )
}

const Notification = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <>
      <Box sx={{
        border:'1px solid var(--navbar-border-color)',
        borderRadius:'5px',
        padding:'2px 5px 5px 5px'
      }}
      onClick={handleClick}>
        <Badge overlap="circular" badgeContent=" " variant="dot" color="primary"
          sx={{
            '.MuiBadge-badge': {
              padding: '0 3px',
              backgroundColor: 'var(--noti-icon-color)',
              '&::after': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                animation: 'ripple 1.2s infinite ease-in-out',
                border: '1px solid var(--noti-icon-color)',
                content: '""'
              },
              '@keyframes ripple': {
                '0%': {
                  transform: 'scale(.8)',
                  opacity: 1
                },
                '100%': {
                  transform: 'scale(2.4)',
                  opacity: 0
                }
              }
            }
          }}>
          <RingIcon width={18} height={18} color={'var(--icon-prime-color)'}/>
        </Badge>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        sx={{ top:'20px' }}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        slotProps={{
          paper:{
            sx:{ width:'35rem', height:'46.5rem' }
          }
        }}
      >
        <Box sx={{ position:'fixed', width:'35rem', backgroundColor:'#fff', zIndex:1 }}>
          <Stack direction={'row'} justifyContent={'space-between'} sx={{ padding:'1.5rem !important' }}>
            <Typography varient='h6' fontSize='1.6rem' fontWeight={600}>Thông báo</Typography>
            <Box sx={{
              padding:'5px 8px', backgroundColor:'var(--primary-color)', 
              fontSize:'1.2rem', color:'#fff',
              borderRadius:'5px'
            }}>
                            5 chưa đọc
            </Box>
          </Stack>
          <Divider sx={{ backgroundColor:'var(--default-border)' }}/>
        </Box>
        <Box sx={{
          marginTop:'58px', 
          maxHeight:'calc(45rem - 58px - 65px)', 
          overflowY:'auto'
        }}>
          {[1, 2, 3, 4, 5, 6].map(menuItem => (
            <MenuItem key={menuItem} sx={{ borderBottom:'1px solid var(--default-border)', padding:'1rem 1.5rem' }}>
              <ListItemIcon>
                {/* <Avatar src='' sx={{width:'35px', height:'35px'}}/> */}
                <span style={{ backgroundColor:'var(--primary-color)', padding:'8px 12px', borderRadius:'50%' }}>
                  <ShoppingCartOutlined fontSize='small' sx={{ color:'#fff' }}/>
                </span>
              </ListItemIcon>
              <ListItemText sx={{ marginLeft:'1rem' }}>
                <Typography varient='h6' fontWeight={700} fontSize={'1.4rem'}>Đơn Hàng Mới</Typography>
                <Typography varient='h6' fontSize={'1.3rem'} color='var(--text-muted)'>
                                    Đơn hàng <span style={{ color:'var(--text-sec-color)' }}>#54321</span> đã được tạo nháp.
                </Typography>
                <Typography varient='p' fontSize={'1.1rem'} color='var(--text-muted)'>now</Typography>
              </ListItemText>
              <Stack sx={{ marginLeft:'1rem' }}>
                                    
              </Stack>
              <ClearOutlined fontSize='small' sx={{ width:'15px', height:'15px', color:'var(--text-muted)' }}/>
            </MenuItem>
          ))}
        </Box>
        <Box sx={{ position:'fixed', width:'35rem', backgroundColor:'#fff', padding:'16px', zIndex:1,
          borderTop:'1px solid var(--default-border)' }}
        >
          <Button variant='contained' sx={{ width:'100%', textTransform:'none', color:'#fff' }}>Xem Tất Cả</Button>
        </Box>
      </Menu>
    </>
  )
}
export default Navbar