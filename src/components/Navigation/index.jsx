import { useParams, useLocation, Link } from 'react-router-dom'
import { Box, Stack, Typography } from '@mui/material'
import { ArrowForwardOutlined } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
function Navigation()
{
  const location = useLocation()
  const { t, i18n } = useTranslation()
  const pathParts = location.pathname
    .split('/')
    .filter(part => part && part !== 'admin') // <-- bỏ 'admin'
  return (
    <Box sx={{ margin:'1rem 0', display:'flex', justifyContent:'space-between' }}>
      <Typography variant='h1' fontSize='var(--desc-fs-sm)' fontWeight={600}>{t(`${pathParts[pathParts.length -1]}`)}</Typography>
      <Stack direction={'row'} alignItems={'center'} sx={{ marginBottom:'1rem' }}>
        <Link to='/admin'>
          <Typography variant="h6" sx={{ fontSize:'var(--fs-md)', marginRight:'0.5rem' }} color='primary'>Trang Chủ</Typography>
        </Link>
        {pathParts && pathParts.map((path, index) => {
          const pathTo = '/admin/' + pathParts.slice(0, index + 1).join('/')
          return (
            <Link to={pathTo} key={index}>
              <Typography variant='h6' sx={{ fontSize:'var(--fs-md)', display:'flex', alignItems:'center' }}>
                <ArrowForwardOutlined fontSize='small' sx={{ width:'1.1rem', height:'1.1rem', marginRight:'0.5rem' }}/>
                {t(`${path}`)}
              </Typography>
            </Link>
          )
        })}
        {/* <Typography variant='h6' sx={{ fontSize:'var(--fs-md)', display:'flex', alignItems:'center' }}>
                <ArrowForwardOutlined fontSize='small' sx={{ width:'1.1rem', height:'1.1rem', marginRight:'0.5rem' }}/>
                Thống Kê Bán Hàng
            </Typography> */}
      </Stack>
    </Box>
  )
}
export default Navigation