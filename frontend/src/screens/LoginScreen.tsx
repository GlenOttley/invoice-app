import { Box, Grid, Typography } from '@mui/material'
import { useEffect } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import ControlledInput from '../components/ControlledInput'
import CustomButton from '../components/CustomButton'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {
  clearUserError,
  loginUser,
  selectUser,
} from '../features/user/userSlice'

const LoginScreen = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const user = useAppSelector(selectUser)
  const { loading, error, successLogin } = user

  interface IFormInput {
    email: string
    password: string
  }

  const methods = useForm<IFormInput>({
    mode: 'onSubmit',
  })

  const { handleSubmit } = methods

  const handleFormSubmit: SubmitHandler<IFormInput> = (data) => {
    dispatch(loginUser(data))
  }

  useEffect(() => {
    dispatch(clearUserError())
    if (successLogin) {
      navigate('/')
    }
  }, [successLogin, navigate, dispatch])

  return (
    <div className='login-screen'>
      {loading ? (
        <Loader />
      ) : (
        <Box>
          <Typography variant='h2' marginBottom={3}>
            Log In
          </Typography>
          {error && <Message severity='error'>{error}</Message>}
          <Grid
            item
            container
            spacing={5}
            component='form'
            onSubmit={handleSubmit(handleFormSubmit)}
          >
            <FormProvider {...methods}>
              <Grid item container columnSpacing={3}>
                <Grid item xs={12}>
                  <ControlledInput
                    section='user'
                    filled={false}
                    name='email'
                    path='email'
                    label='Email'
                    rules={{
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'please use a valid email address',
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <ControlledInput
                    section='user'
                    filled={false}
                    name='password'
                    path='password'
                    label='Password'
                    type='password'
                    rules={{
                      required: "can't be empty",
                    }}
                  />
                </Grid>
              </Grid>

              <Grid container item spacing={1} justifyContent='end'>
                <Grid item>
                  <CustomButton version='slate' onClick={() => navigate('/')}>
                    Cancel
                  </CustomButton>
                </Grid>
                <Grid item>
                  <CustomButton type='submit' version='purple'>
                    Log In
                  </CustomButton>
                </Grid>
              </Grid>
            </FormProvider>
          </Grid>
        </Box>
      )}
    </div>
  )
}

export default LoginScreen
