import { Box, FormControl, InputLabel, Typography } from '@mui/material'
import { useEffect } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import CustomButton from '../components/CustomButton'
import CustomTextField from '../components/CustomTextField'
import { loginUser, selectUser } from '../features/user/userSlice'

const LoginScreen = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const user = useAppSelector(selectUser)
  const { userInfo } = user

  interface IFormInput {
    email: string
    password: string
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>()

  const handleLogin: SubmitHandler<IFormInput> = (data) => {
    dispatch(loginUser(data))
  }

  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }
  }, [userInfo, navigate])

  return (
    <div className='login-screen'>
      <div className='container'>
        <Typography variant='h1'>Login</Typography>

        <Box component='form' onSubmit={handleSubmit(handleLogin)}>
          <Controller
            name='email'
            control={control}
            defaultValue=''
            rules={{
              required: "can't be empty",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'please use a valid email address',
              },
            }}
            render={({ field }) => (
              <FormControl error={!!errors.email}>
                <InputLabel htmlFor='email'>
                  Email
                  <Typography variant='overline'>
                    {errors.email && errors.email.message}
                  </Typography>
                </InputLabel>
                <CustomTextField
                  {...field}
                  type='email'
                  error={!!errors.email}
                />
              </FormControl>
            )}
          />

          <Controller
            name='password'
            control={control}
            defaultValue=''
            rules={{ required: "can't be empty" }}
            render={({ field }) => (
              <FormControl error={!!errors.password}>
                <InputLabel htmlFor='password'>
                  Password
                  <Typography variant='overline'>
                    {errors.password && errors.password.message}
                  </Typography>
                </InputLabel>
                <CustomTextField
                  {...field}
                  type='password'
                  error={!!errors.password}
                />
              </FormControl>
            )}
          />

          <CustomButton type='submit' version='purple'>
            Submit
          </CustomButton>
        </Box>
      </div>
    </div>
  )
}

export default LoginScreen
