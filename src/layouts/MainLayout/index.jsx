import { Container, Box } from '@mui/material'
import Sidebar from '../Components/Sidebar'
import Navbar from '../Components/Navbar'
function MainLayout({ children }) {
  return (
    <Container maxWidth={false} sx={{ padding: '0 !important' }}>
      <Sidebar />
      <Box sx={{ marginLeft: 'var(--sidebar-width)', width: 'calc(100% - var(--sidebar-width))', backgroundColor:'var(--default-body-bg-color)', minHeight:'100vh' }}>
        <Navbar />
        <Box sx={{ marginTop:'5rem', padding: '1rem' }}>
          {children}
        </Box>
      </Box>
    </Container>
  )
}

export default MainLayout