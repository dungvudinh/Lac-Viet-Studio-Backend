import { useState } from 'react'
import { Box, Stack, Typography, Button, Menu, MenuItem, TableCell, TableRow, TableBody, TableContainer, Table, Grid2 as Grid, TableHead, ListItemAvatar, ListItemText, ListItem } from '@mui/material'
import styles from './Dashboard.module.scss'
import classNames from 'classnames/bind'
import { ArrowForwardOutlined, AttachMoneyOutlined, CalendarMonthOutlined, FilterListOutlined, KeyboardArrowDown, MoreVert, NorthOutlined, PeopleOutline, TrendingUpOutlined } from '@mui/icons-material'
import 'flatpickr/dist/themes/material_green.css'
import Flatpickr from 'react-flatpickr'
import { Vietnamese } from 'flatpickr/dist/l10n/vn.js'
import { CartIcon } from '~/assets/Icons'
import Chart from 'react-apexcharts'
const cx = classNames.bind(styles)
function Dashboard({ children }) {
  const [selectRange, setSelectRange] = useState(() => {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(today.getDate() -1)
    return [yesterday, today]
  })
  const handleChangeRange = (dates) => setSelectRange(dates)
  return ( 
    <Box >
      {/* DASHBOARD HEADER */}
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <Box sx={{ margin:'1rem 0' }}>
          <Stack direction={'row'} alignItems={'center'} sx={{ marginBottom:'1rem' }}>
            <Typography variant="h6" sx={{ fontSize:'var(--fs-lg)', marginRight:'1rem' }} color='primary'>Trang Chủ</Typography>
            <Typography variant='h6' sx={{ fontSize:'var(--fs-lg)', display:'flex', alignItems:'center' }}>
              <ArrowForwardOutlined fontSize='small' sx={{ width:'1.1rem', height:'1.1rem', marginRight:'1rem' }}/>
                            Thống Kê Bán Hàng
            </Typography>
          </Stack>
          <Typography variant='h1' fontSize='var(--fs-lg)' fontWeight={600}>Thống Kê Chung</Typography>
        </Box>

        <Box sx={{ display:'flex', flexDirection:'row', alignItems:'center' }}>
          <Box sx={{ padding:'0.9rem', marginRight:'0.2rem' }}>
            <CalendarMonthOutlined />
          </Box>
          <Flatpickr
            value={selectRange}
            inputMode="range"
            options={{
              dateFormat:'d-m-Y',
              mode:'range',
              // minDate:'today', 
              // maxDate:new Date().fp_incr(365)
              locale:Vietnamese
            }}
            style={{ border:'none', padding:'1rem', minWidth:'200px', textAlign:'center' }}
            onChange={handleChangeRange}
          />
          <Button sx={{ textTransform:'none', marginLeft:'2rem', color:'#FFF', fontSize:'1.4rem' }} variant='contained' color='primary'>
            <FilterListOutlined fontSize="small" sx={{ marginRight:'0.5rem' }}/>
              Lọc
          </Button>
        </Box>

      </Stack>
      {/* DASHBOARD CONTENT 1 */}
      <div className={cx('row-content_1')}>
        <div className={cx('row-content_item')}>
          <Stack direction={'row'} justifyContent={'space-between'} alignItems='center'>
            <Box>
              <Typography variant='h6' sx={{ fontSize:'1.4rem', color:'var(--text-muted)' }}>Tổng sản phẩm</Typography>
              <Typography variant="h3" sx={{ fontSize:'3rem', fontWeight:600 }}>854</Typography>
            </Box>
            <span style={{
              width:'4rem', height:'4rem',
              backgroundColor:'rgb(92, 103, 247)'
            }} 
            className="rounded-circle d-flex align-items-center justify-content-center">
              <CartIcon width={20} height={20} color={'#FFF'}/>
            </span>
          </Stack>
          <Box>
            <Typography variant="h6" sx={{ fontSize:'1.4rem', color:'var(--text-muted)', display:'flex', alignItems:'center' }}>
                            Tăng trưởng
              <span className='ms-2 d-flex align-items-center' style={{ color:'rgb(33, 206, 158)' }}>
                                2.56% 
                <NorthOutlined fontSize="small" sx={{ width:'1.5rem', height:'1.5rem' }}/>
              </span>
            </Typography>
          </Box>
        </div>
        <div className={cx('row-content_item')}>
          <Stack direction={'row'} justifyContent={'space-between'} alignItems='center'>
            <Box>
              <Typography variant='h6' sx={{ fontSize:'1.4rem', color:'var(--text-muted)' }}>Tổng người dùng</Typography>
              <Typography variant="h3" sx={{ fontSize:'3rem', fontWeight:600 }}>854</Typography>
            </Box>
            <span style={{
              width:'4rem', height:'4rem',
              backgroundColor:'rgb(227, 84, 212)'
            }} 
            className="rounded-circle d-flex align-items-center justify-content-center">
              <PeopleOutline sx={{ color:'#FFF' }} />
            </span>
          </Stack>
          <Box>
            <Typography variant="h6" sx={{ fontSize:'1.4rem', color:'var(--text-muted)', display:'flex', alignItems:'center' }}>
                            Tăng trưởng
              <span className='ms-2 d-flex align-items-center' style={{ color:'rgb(33, 206, 158)' }}>
                                2.56% 
                <NorthOutlined fontSize="small" sx={{ width:'1.5rem', height:'1.5rem' }}/>
              </span>
            </Typography>
          </Box>
        </div>
        <div className={cx('row-content_item')}>
          <Stack direction={'row'} justifyContent={'space-between'} alignItems='center'>
            <Box>
              <Typography variant='h6' sx={{ fontSize:'1.4rem', color:'var(--text-muted)' }}>Tổng doanh thu</Typography>
              <Typography variant="h3" sx={{ fontSize:'3rem', fontWeight:600 }}>854</Typography>
            </Box>
            <span style={{
              width:'4rem', height:'4rem',
              backgroundColor:'rgb(255, 93, 159)'
            }} 
            className="rounded-circle d-flex align-items-center justify-content-center">
              <AttachMoneyOutlined sx={{ color:'#FFF' }}/>
            </span>
          </Stack>
          <Box>
            <Typography variant="h6" sx={{ fontSize:'1.4rem', color:'var(--text-muted)', display:'flex', alignItems:'center' }}>
                            Tăng trưởng
              <span className='ms-2 d-flex align-items-center' style={{ color:'rgb(33, 206, 158)' }}>
                                2.56% 
                <NorthOutlined fontSize="small" sx={{ width:'1.5rem', height:'1.5rem' }}/>
              </span>
            </Typography>
          </Box>
        </div>
        <div className={cx('row-content_item')}>

        </div>
        <div className={cx('row-content_item')}>
          <TopSelling />
        </div>
        <div className={cx('row-content_item')}>
          <SaleOverview />
        </div>
        <div className={cx('row-content_item')}>
          <OrderStatistic />
        </div>
      </div>
      <div className={cx('row-content_2')}>
        <RecentOrder />
      </div>
    </Box>
  )
}
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein }
}
  
const rows = [
  createData('Frozen yoghurt', 159, 6.0, '24%', 4.0),
  createData('Ice cream sandwich', 237, 9.0, '35%', 4.3),
  createData('Eclair', 262, 16.0, '25%', 6.0),
  createData('Cupcake', 305, 3.7, '57%', 4.3),
  createData('Gingerbread', 356, 16.0, '14%   ', 3.9)
]

const TopSelling = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <Box>
      <Stack direction='row' justifyContent={'space-between'} alignItems={'center'} padding={'5px'}>
        <Typography variant='h1' sx={{ fontSize:'1.6rem', fontWeight:600 }}>Sản Phẩm Bán Chạy</Typography>
                
        <button className={cx('sort-btn')} onClick={handleClick}>
            Sắp Xếp Theo
          <KeyboardArrowDown fontSize="small"/>
        </button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          sx={{ top:'0.5rem' }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem sx={{ fontSize:'1.4rem !important', fontWeight:500 }}>Tuần này</MenuItem>
          <MenuItem sx={{ fontSize:'1.4rem !important', fontWeight:500 }}>Tuần trước</MenuItem>
          <MenuItem sx={{ fontSize:'1.4rem !important', fontWeight:500 }}>Tháng này</MenuItem>
        </Menu>
      </Stack>
      <Box padding={'15px 5px'}>
        <div className={cx('progress-stack')}>
          <span className={cx('progress-bar')} style={{ width:'25%' }}>
          </span>
          <span className={cx('progress-bar')} style={{ width:'15%' }}>
                        
          </span>
          <span className={cx('progress-bar')} style={{ width:'15%' }}>
                        
          </span>
          <span className={cx('progress-bar')} style={{ width:'25%' }}>
                        
          </span>
          <span className={cx('progress-bar')} style={{ width:'20%' }}>
                        
          </span>
        </div>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <Typography variant="h6" sx={{ fontSize:'1.5rem' }}>
                        Tổng quan kinh doanh
          </Typography>
          <Typography variant="h6" sx={{ display:'flex', flexDirection:'row', alignItems:'center', fontWeight:600 }}>
            <span className='me-2 d-flex align-items-center' style={{ color:'rgb(33, 206, 158)', fontSize:'1.2rem' }}>
                            2.56% 
              <NorthOutlined fontSize="small" sx={{ width:'1.2rem', height:'1.2rem' }}/>
            </span>
                        125,875
          </Typography>
        </Stack>
        <TableContainer >
          <Table >
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row" sx={{ fontWeight:600, fontSize:'1.4rem' }}>
                    <span className={cx('top-category_name')}>
                      {row.name}
                    </span>
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight:600, fontSize:'1.4rem' }}>{row.calories}</TableCell>
                  <TableCell align="right" sx={{ color:'var(--text-muted)', fontSize:'1.4rem' }}>{row.fat}</TableCell>
                  <TableCell align="right">
                    <span className={cx('top-category_trending')}>
                      {row.carbs}
                      <TrendingUpOutlined fontSize="small" sx={{ width:'1.5rem', height:'1.5rem' }}/>
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
}

const OrderStatistic = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [state, setState]= useState({
    series: [44, 55, 13, 43],
    options: {
      chart: {
        width: '100%',
        height: '100%',
        type: 'pie',
        fontFamily: 'Manrope, sans-serif'
      },
      labels: ['Đã vận chuyển', 'Đã huỷ', 'Đang chờ', 'Hoàn trả'],
      legend: {
        position: 'bottom'
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: '100%',
            height: '100%'
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    }
  })
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <Box>
      <Stack direction='row' justifyContent={'space-between'} alignItems={'center'} padding={'5px'} marginBottom='2rem'>
        <Typography variant='h1' sx={{ fontSize:'1.6rem', fontWeight:600 }}>Số Liệu Đơn Hàng</Typography>
        {/* <Button sx={{textTransform:'none', fontSize:'1.3rem', backgroundColor:'rgb(249, 249, 250)', color:'var(--text-muted)'}} 
                variant='contained' onClick={handleClick}>
                </Button> */}
        <button className={cx('sort-btn')} onClick={handleClick}>
          <MoreVert sx={{ color:'var(--text-muted)' }} fontSize='small'/>
        </button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          sx={{ top:'0.5rem' }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem sx={{ fontSize:'1.4rem !important', fontWeight:500 }}>Tuần này</MenuItem>
          <MenuItem sx={{ fontSize:'1.4rem !important', fontWeight:500 }}>Tuần trước</MenuItem>
          <MenuItem sx={{ fontSize:'1.4rem !important', fontWeight:500 }}>Tháng này</MenuItem>
        </Menu>
      </Stack>
      <Stack direction='row'>
        <Box sx={{
          backgroundColor:'var(--primary-color-bg)', 
          width:'4rem', height:'4rem', 
          borderRadius:'5px',
          display:'flex',
          alignItems:'center', 
          justifyContent:'center'
        }}>
          <TrendingUpOutlined color='primary'/>
        </Box>
        <Box marginLeft={'2rem'}>
          <Typography variant='h6' fontWeight={600} fontSize={'1.3rem'}>TỔNG ĐƠN HÀNG</Typography>
          <Typography variant='h6' fontWeight={700} fontSize='2rem'>
                        3,765
            <span className="text-success fs-small fw-medium ms-2">
                            0.57% 
              <TrendingUpOutlined fontSize={'small'} sx={{ width:'1.5rem', height:'1.5rem' }}/>
            </span>
          </Typography>
        </Box>
      </Stack>
      <Box sx={{ display: 'flex', justifyContent: 'center', height: '100%', marginTop:'1rem' }}>
        <Chart options={state.options} series={state.series} type="pie" width="100%" height="100%" />
      </Box>
    </Box>
  )
}

const SaleOverview = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [state, setState] = useState({
    series: [
      {
        name: 'Tăng Trưởng',
        type: 'column',
        data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 12]
      },
      {
        name: 'Lợi Nhuận',
        type: 'area',
        data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43, 35]
      },
      {
        name: 'Kinh Doanh',
        type: 'line',
        data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 52]
      }
    ],
    options: {
      chart: {
        height: 350,
        type: 'line',
        stacked: false,
        fontFamily: 'Manrope, sans-serif' // Sets the global font family
      },
      stroke: {
        width: [0, 1, 2],
        curve: 'smooth'
      },
      plotOptions: {
        bar: {
          columnWidth: '30%'
        }
      },
      fill: {
        opacity: [0.85, 0.05, 1],
        gradient: {
          inverseColors: false,
          shade: 'light',
          type: 'vertical',
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100]
        }
      },
      labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
      legend: {
        labels: {
          fontWeight: 600, // Set fontWeight to 600 for legend (series name)
          fontSize: '14px' // You can also adjust the fontSize if needed
        }

      }
    }
  })

  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
    
  return (
    <Box>
      <Stack direction='row' justifyContent={'space-between'} alignItems={'center'} padding={'5px'}>
        <Typography variant='h1' sx={{ fontSize:'1.6rem', fontWeight:600 }}>Tổng Quan Kinh Doanh</Typography>
        <button className={cx('sort-btn')} onClick={handleClick}>
                    Sắp Xếp Theo
          <KeyboardArrowDown fontSize="small"/>
        </button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          sx={{ top:'0.5rem' }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem sx={{ fontSize:'1.4rem !important', fontWeight:500 }}>Tuần này</MenuItem>
          <MenuItem sx={{ fontSize:'1.4rem !important', fontWeight:500 }}>Tuần trước</MenuItem>
          <MenuItem sx={{ fontSize:'1.4rem !important', fontWeight:500 }}>Tháng này</MenuItem>
        </Menu>
      </Stack>
      <Box marginTop={'2rem'}>
        <Chart options={state.options} series={state.series} type="line" height={350}/>
      </Box>
    </Box>
  )
}

  
const recentOrderHead = [
  {
    title:'Khách hàng' 
  }, 
  {
    title:'Đơn Hàng'
  }, 
  {
    title:'Thành Tiền'
  }, 
  {
    title:'Trạng Thái'
  }, 
  {
    title:'Hành Động'
  }
]
const recentOrderData = [
  {
    customer:{
      avatar: 'https://spruko.com/demo/xintra/blazor/web-app/dist/assets/images/faces/1.jpg', 
      fullName:'Elena Smith',
      email:'elenasmith387@gmail.com'
    },
    order:'#1234',
    amount:'1,000,000',
    status:1
  }, 
  {
    customer:{
      avatar: 'https://spruko.com/demo/xintra/blazor/web-app/dist/assets/images/faces/1.jpg', 
      fullName:'Elena Smith',
      email:'elenasmith387@gmail.com'
    },
    order:'#1234',
    amount:'1,000,000',
    status:0
  }, 
  {
    customer:{
      avatar: 'https://spruko.com/demo/xintra/blazor/web-app/dist/assets/images/faces/1.jpg', 
      fullName:'Elena Smith',
      email:'elenasmith387@gmail.com'
    },
    order:'#1234',
    amount:'1,000,000',
    status:1
  }, 
  {
    customer:{
      avatar: 'https://spruko.com/demo/xintra/blazor/web-app/dist/assets/images/faces/1.jpg', 
      fullName:'Elena Smith',
      email:'elenasmith387@gmail.com'
    },
    order:'#1234',
    amount:'1,000,000',
    status:1
  } 

]

const RecentOrder = () => {
    
  return (
    <Grid container spacing={2} >
      <Grid size={9} sx={{ backgroundColor:'#FFF', borderRadius:'0.5rem', padding:'1rem' }}>
        <Box>
          <Stack direction='row' justifyContent={'space-between'} alignItems={'center'} padding={'5px'}>
            <Typography variant='h1' sx={{ fontSize:'1.6rem', fontWeight:600 }}>Đơn Hàng Gần Đây</Typography>
            <button className={cx('sort-btn')}>
                            Xem Tất Cả
            </button>
          </Stack>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {recentOrderHead.map((item, ix) => (
                  <TableCell key={ix} sx={{ fontWeight:'600 !important', fontSize:'1.4rem !important' }}>{item.title}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {recentOrderData.map((item, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <ListItem>
                      <ListItemAvatar sx={{ width:'3rem', height:'3rem' }}>
                        <img src={item.customer.avatar} className={cx('img-style')}/>
                      </ListItemAvatar>
                      <ListItemText primary={item.customer.fullName} secondary={item.customer.email} sx={{ fontSize:'1.3rem !important' }}/>
                    </ListItem>
                  </TableCell>
                                
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid size={3} sx={{ backgroundColor:'#FFF', borderRadius:'0.5rem', padding:'1rem' }}>

      </Grid>
    </Grid>
  )
}
export default Dashboard