import { Typography, Grid, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import CustomButton from '../components/CustomButton'
import { clearInvoices } from '../features/invoices/invoicesSlice'
import { clearUser, selectUser } from '../features/user/userSlice'
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form'
import ControlledInput from '../components/ControlledInput'

interface IFormInput {
  email: string
  street: string
  city: string
  postCode: string
  country: string
}

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

  const methods = useForm<IFormInput>({
    mode: 'onSubmit',
  })

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = methods

  const handleFormSubmit: SubmitHandler<IFormInput> = (data: IFormInput) => {
    console.log(data)
  }

  return (
    <div className='profile-screen'>
      {userInfo && (
        <Box>
          <Typography variant='h2' marginBottom={3}>
            Hi, {userInfo.name}
          </Typography>
          {/* <CustomButton version='peach' onClick={handleLogout}>
            Sign Out
          </CustomButton> */}

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
                    Address
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <ControlledInput
                    filled={true}
                    name='name'
                    path='user.name'
                    label='Name'
                  />
                </Grid>

                <Grid item xs={12}>
                  <ControlledInput
                    filled={true}
                    name='email'
                    path='client.email'
                    label="Client's Email"
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
                    filled={true}
                    name='street'
                    path='client.address.street'
                    label='Street'
                  />
                </Grid>

                <Grid item xs={6} md={4}>
                  <ControlledInput
                    filled={true}
                    name='city'
                    path='client.address.city'
                    label='City'
                  />
                </Grid>

                <Grid item xs={6} md={4}>
                  <ControlledInput
                    filled={true}
                    name='postCode'
                    path='client.address.postCode'
                    label='Post Code'
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <ControlledInput
                    filled={true}
                    name='country'
                    path='client.address.country'
                    label='Country'
                  />
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
