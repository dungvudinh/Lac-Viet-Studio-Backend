import Backdrop from '@mui/material/Backdrop'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setBackdrop } from '~/redux/features/slices/backdropSlice'
function BackdropCustom({ children })
{
  const dispatch = useDispatch()
  const { isOpen } = useSelector(state => state.sharedBackdrop)
  return (
    <Backdrop open={isOpen} sx={{ zIndex:1211 }} onClick={() => dispatch(setBackdrop(false))}>
      {children}
    </Backdrop>
  )
}
export default BackdropCustom