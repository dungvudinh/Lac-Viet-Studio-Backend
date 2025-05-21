import React from 'react'
import { Box, Accordion, AccordionSummary, AccordionDetails, List, ListItem, Typography, ListItemIcon, ListItemText, ListItemButton } from '@mui/material'
import { Category, EqualizerOutlined, ExpandMore } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Sidebar.module.scss'
import classNames from 'classnames/bind'
import logo from '~/assets/Images/logo.png'
import { DashboardIcon } from '~/assets/Icons'
// import routes from '~/configs/Routes'
const cx = classNames.bind(styles)
function Sidebar() {
  const navigate = useNavigate()
  return (
    <Box className={cx('sidebar')}>
      {/* Logo section */}
      <Box className={cx('logo-container')} sx={{ borderBlockEnd:'1px solid rgba(255, 255, 255, 0.1)' }}>
        <img src={logo}/>
      </Box>
      <Typography varient='h6' sx={{ padding:'10px 16px', color:'var(--sidebar-text-color)', fontWeight:700, fontSize:'var(--fs-sm)' }}>
        Thông tin chung
      </Typography>
      {/* Accordion Menu */}
      <Accordion
        sx={{
          backgroundColor:'transparent', 
          color:'#fff',
          '&.Mui-expanded':{ margin:0 },
          '&::after': {
            content: 'none'
          },
          '&::before': {
            content: 'none'
          }
        }}>
        <AccordionSummary
          expandIcon={<ExpandMore sx={{ color:'white.main' }}/>}
          aria-controls="dashboard-content"
        >
          <DashboardIcon />
          <Typography varient='h6' fontWeight={600} paddingLeft={'0.5rem'} fontSize={'var(--fs-lg)'}>Trang Chủ</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List sx={{ color:'#fff', padding:0 }}>
            <ListItem component={Link} to="/admin" className={cx('sidebar-item_child')}>
              {/* <HorizontalRuleOutlined fontSize='small'/> */}
              <Typography fontWeight={600} fontSize='var(--fs-md)' marginLeft={'0.5rem'} sx={{ display:'flex', alignItems:'center' }}>
                <EqualizerOutlined fontSize='small' sx={{ mr:1 }}/>
                Thống Kê Bán Hàng
              </Typography>
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>


      <Typography varient='h6' sx={{ padding:'10px 16px', color:'var(--sidebar-text-color)', fontWeight:700, fontSize:'var(--fs-sm)' }}>
        Danh mục
      </Typography>
      {/* Accordion Menu */}
      <ListItemButton sx={{ fontWeight:600 }} onClick={() => navigate('/admin/product-catalogs')}>
        <Category sx={{ mr:1 }}/>
        Quản lý sản phẩm
      </ListItemButton>
    </Box>
  )
}

export default Sidebar