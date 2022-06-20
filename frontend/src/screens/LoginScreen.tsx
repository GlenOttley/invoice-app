import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { loginUser, selectUser } from '../features/user/userSlice'
import {
  useTheme,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Button,
} from '@mui/material'
import CustomTextField from '../components/CustomTextField'
import CustomButton from '../components/CustomButton'

const LoginScreen = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const theme = useTheme()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleLogin = (e: React.SyntheticEvent) => {
    e.preventDefault()
    const loginData = { email: email, password: password }
    dispatch(loginUser(loginData))
  }

  const user = useAppSelector(selectUser)
  const { userInfo } = user

  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }
  }, [userInfo])

  return (
    <div className='login-screen'>
      <div className='container'>
        <Typography variant='h1'>Login</Typography>

        <Box component='form' autoComplete='off'>
          <div>
            <FormControl>
              <InputLabel htmlFor='email'>Email</InputLabel>
              <CustomTextField
                value={email}
                onChange={({ target }) => setEmail(target.value)}
              />
            </FormControl>
          </div>

          <div>
            <FormControl>
              <InputLabel htmlFor='password'>Password</InputLabel>
              <CustomTextField
                type='password'
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </FormControl>
          </div>

          <div>
            <CustomButton
              type='submit'
              value='submit'
              onClick={handleLogin}
              version='purple'
            >
              Submit
            </CustomButton>
          </div>
        </Box>
      </div>
    </div>
  )
}

export default LoginScreen
