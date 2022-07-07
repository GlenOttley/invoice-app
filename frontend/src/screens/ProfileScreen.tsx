import { Typography, Grid, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import CustomButton from '../components/CustomButton'
import {
  userUpdateReset,
  selectUser,
  updateUser,
} from '../features/user/userSlice'
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form'
import ControlledInput from '../components/ControlledInput'
import Loader from '../components/Loader'
import Message from '../components/Message'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import IUser from '../interfaces/userInterface'

export interface IFormInput
  extends Omit<IUser, '_id' | 'invoices' | 'token' | 'image'> {}

const ProfileScreen = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const select = useAppSelector
  const navigate = useNavigate()

  const userState = select(selectUser)
  const { userInfo, loading, error, successUpdate } = userState

  const [validating, setValidating] = useState<boolean>(false)

  const methods = useForm<IFormInput>({
    mode: 'onSubmit',
  })

  const {
    handleSubmit,
    watch,
    formState: { errors },
  } = methods

  const validate = (data: IFormInput) => {
    if (!_.isEmpty(errors)) {
      return false
    } else {
      return true
    }
  }

  const handleFormSubmit: SubmitHandler<IFormInput> = (data: IFormInput) => {
    if (validate(data)) {
      dispatch(
        updateUser({
          email: data.email,
          password: data.password,
          name: data.name,
          address: {
            street: data.address.street,
            city: data.address.city,
            postCode: data.address.postCode,
            country: data.address.country,
          },
        })
      )
    }
  }

  useEffect(() => {
    if (successUpdate) {
      dispatch(userUpdateReset())
    }
  }, [successUpdate, dispatch])

  return (
    <div className='profile-screen'>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message severity='error'>{error}</Message>
      ) : (
        <Box>
          <Typography variant='h2' marginBottom={3}>
            Hi, {userInfo?.name}
          </Typography>

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
                  <Typography variant='h4' color='primary.purple'>
                    Login Details
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <ControlledInput
                    section='user'
                    filled={true}
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
                  />
                </Grid>

                <Grid item xs={12}>
                  <ControlledInput
                    section='user'
                    filled={false}
                    name='confirmPassword'
                    path='confirmPassword'
                    label='Confirm Password'
                    type='password'
                    rules={{
                      validate: (val: string) => {
                        if (watch('password') !== val) {
                          return 'Your passwords do not match'
                        }
                      },
                    }}
                  />
                </Grid>
              </Grid>

              <Grid item container columnSpacing={3}>
                <Grid item xs={12}>
                  <Typography variant='h4' color='primary.purple'>
                    Address
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <ControlledInput
                    section='user'
                    filled={true}
                    name='name'
                    path='name'
                    label='Name'
                  />
                </Grid>

                <Grid item xs={12}>
                  <ControlledInput
                    section='user'
                    filled={true}
                    name='address.street'
                    path='address.street'
                    label='Street'
                  />
                </Grid>

                <Grid item xs={6} md={4}>
                  <ControlledInput
                    section='user'
                    filled={true}
                    name='address.city'
                    path='address.city'
                    label='City'
                  />
                </Grid>

                <Grid item xs={6} md={4}>
                  <ControlledInput
                    section='user'
                    filled={true}
                    name='address.postCode'
                    path='address.postCode'
                    label='Post Code'
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <ControlledInput
                    section='user'
                    filled={true}
                    name='address.country'
                    path='address.country'
                    label='Country'
                  />
                </Grid>
              </Grid>

              <Grid container item spacing={1} justifyContent='end'>
                {validating && (
                  <Grid item xs={12}>
                    <Typography variant='overline'>
                      {!_.isEmpty(errors) && '- All fields must be added'}
                    </Typography>
                  </Grid>
                )}
                <Grid item>
                  <CustomButton version='slate' onClick={() => navigate('/')}>
                    Cancel
                  </CustomButton>
                </Grid>
                <Grid item>
                  <CustomButton
                    type='submit'
                    version='purple'
                    onClick={() => setValidating(true)}
                  >
                    Save Changes
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

export default ProfileScreen
