import { useAppDispatch, useAppSelector } from '../app/hooks'
import { useNavigate } from 'react-router-dom'
import { selectUser, clearUser } from '../features/user/userSlice'
import { clearInvoices } from '../features/invoices/invoicesSlice'
import { Typography } from '@mui/material'
import CustomButton from '../components/CustomButton'

const ProfileScreen = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const select = useAppSelector
  const navigate = useNavigate()

  const user = select(selectUser)
  const { userInfo } = user

  const handleLogout = () => {
    dispatch(clearUser())
    dispatch(clearInvoices())
    navigate('/')
  }

  return (
    <div className='profile-screen'>
      <div className='container'>
        <Typography variant='body1'>Hello {userInfo?.name}</Typography>
        <CustomButton version='peach' onClick={handleLogout}>
          Sign Out
        </CustomButton>
      </div>
    </div>
  )
}

export default ProfileScreen
