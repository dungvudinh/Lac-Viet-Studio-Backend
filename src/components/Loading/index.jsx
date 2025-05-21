import { Backdrop, CircularProgress } from '@mui/material'
import { useSelector } from 'react-redux'
function Loading()
{
  const { isLoading } = useSelector(state => state.sharedLoading)
  return (
    <Backdrop open={isLoading} sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 200 })}>
      <CircularProgress />
    </Backdrop>
  )
}
export default Loading