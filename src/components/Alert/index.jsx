import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

// import { setOpenAlert } from '~/shared/redux/alertSlice';
import { setOpenAlert } from '~/redux/features/slices/alertSlice'
import { IconButton, Collapse, Alert } from '@mui/material'
import { Close } from '@mui/icons-material'
function CustomAlert()
{
  const dispatch = useDispatch()
  const { isOpenAlert, status, message } = useSelector(state => state.sharedAlert)
  useEffect(() => {
    if (isOpenAlert) {
      const timer = setTimeout(() => {
        dispatch(setOpenAlert(false))
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [isOpenAlert, dispatch])
  return (
    <Collapse in={isOpenAlert} sx={{ position:'fixed', bottom:'1rem', right:'1rem', zIndex:1500 }}>
      <Alert
        severity={status}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              dispatch(setOpenAlert(false))
            }}
          >
            <Close fontSize="inherit" />
          </IconButton>
        }
        sx={{ mb: 2 }}
      >
        {message}
      </Alert>
    </Collapse>
  )
}
export default CustomAlert