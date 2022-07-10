import {
  Box,
  Dialog,
  DialogActions,
  Grid,
  Typography,
  useTheme,
} from '@mui/material'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import ControlledInput from '../components/ControlledInput'
import CustomButton from '../components/CustomButton'
import CustomContainer from '../components/CustomContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { clearInvoice } from '../features/invoices/invoiceSlice'
import { clearInvoices } from '../features/invoices/invoicesSlice'
import {
  clearUser,
  deleteUser,
  selectUser,
  updateUser,
  userUpdateReset,
  clearUserError,
} from '../features/user/userSlice'
import IUser from '../interfaces/userInterface'

export interface IFormInput
  extends Omit<IUser, '_id' | 'invoices' | 'token' | 'image'> {}

const ProfileScreen = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const select = useAppSelector
  const navigate = useNavigate()
  const theme = useTheme()

  const userState = select(selectUser)
  const { userInfo, loading, error, successUpdate, successDelete } = userState

  const [validating, setValidating] = useState<boolean>(false)

  const methods = useForm<IFormInput>({
    mode: 'onSubmit',
  })

  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false)

  const handleDeleteAccount = () => {
    setShowDeleteDialog(false)
    dispatch(deleteUser())
  }

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
    dispatch(clearUserError())
    if (successUpdate) {
      dispatch(userUpdateReset())
    }
    if (successDelete) {
      dispatch(clearUser())
      dispatch(clearInvoices())
      dispatch(clearInvoice())
      navigate('/')
    }
  }, [successUpdate, successDelete, navigate, dispatch])

  return (
    <div className='profile-screen'>
      {loading ? (
        <Loader />
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

              <Grid container item alignItems='center'>
                <Grid item xs={3}>
                  <CustomButton
                    version='peach'
                    onClick={() => setShowDeleteDialog(true)}
                  >
                    Delete Account
                  </CustomButton>
                </Grid>
                <Grid
                  container
                  item
                  xs={9}
                  columnSpacing={1}
                  justifyContent='end'
                >
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
              </Grid>
            </FormProvider>
          </Grid>
        </Box>
      )}
      {error && <Message severity='error'>{error}</Message>}
      <Dialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
      >
        <CustomContainer
          version='lg'
          sx={{
            backgroundColor:
              theme.palette.mode === 'light'
                ? 'white'
                : theme.palette.grey[100],
          }}
        >
          <Typography variant='h2' marginBottom={1}>
            Cofirm Deletion
          </Typography>

          <Typography
            variant='body1'
            color='grey.300'
            lineHeight={2}
            marginBottom={3}
          >
            Are you sure you want to delete your account? This action cannot be
            undone.
          </Typography>

          <DialogActions>
            <CustomButton
              version='grey'
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancel
            </CustomButton>
            <CustomButton version='peach' onClick={handleDeleteAccount}>
              Delete
            </CustomButton>
          </DialogActions>
        </CustomContainer>
      </Dialog>
    </div>
  )
}

export default ProfileScreen
