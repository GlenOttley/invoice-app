import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { loginUser, selectUser } from '../features/user/userSlice'
import { Typography, Box, FormControl, InputLabel } from '@mui/material'
import CustomTextField from '../components/CustomTextField'

const LoginScreen = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

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
          <FormControl>
            <InputLabel htmlFor='email'>Email</InputLabel>
            <CustomTextField />
          </FormControl>
        </Box>

        {/* <form onSubmit={handleLogin}>
          <label>
            Email
            <input
              type='text'
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />
          </label>

          <label>
            Password
            <input
              type='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>

          <input type='submit' className='btn--purple' value='Submit' />
        </form> */}
      </div>
    </div>
  )
}

export default LoginScreen
