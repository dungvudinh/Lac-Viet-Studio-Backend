import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { setOpenAlert, setAlertStatus, setAlertMessage } from '~/redux/features/slices/alertSlice'

export const useAlert = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  return (status, message) => {
    const translatedMessage = t(message)
    dispatch(setAlertStatus(status))
    dispatch(setAlertMessage(translatedMessage))
    dispatch(setOpenAlert(true))
  }
}