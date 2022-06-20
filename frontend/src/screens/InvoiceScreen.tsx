import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { getInvoice, selectInvoice } from '../features/invoices/invoiceSlice'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import {
  useTheme,
  Typography,
  Button,
  Box,
  Grid,
  useMediaQuery,
} from '@mui/material'
import CustomContainer from '../components/CustomContainer'
import CustomCard from '../components/CustomCard'
import StatusBadge from '../components/StatusBadge'
import { selectUser } from '../features/user/userSlice'
import { format } from 'date-fns'
import Loader from '../components/Loader'
import Message from '../components/Message'
import InvoiceActions from '../components/InvoiceActions'

const InvoiceScreen = (): JSX.Element => {
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const select = useAppSelector

  const { id } = useParams()
  const invoiceState = select(selectInvoice)
  const { invoice, loading, error } = invoiceState

  const { userInfo } = select(selectUser)
  const screenSm = useMediaQuery(theme.breakpoints.up('sm'))

  useEffect(() => {
    id && dispatch(getInvoice(id))
  }, [dispatch, id])

  return (
    <div className='invoice-screen'>
      <Link to='/'>
        <Button
          variant='text'
          sx={{
            padding: 0,
            marginBottom: theme.spacing(4),
          }}
          startIcon={
            <KeyboardArrowLeftIcon
              sx={{
                fontSize: '15px',
                color: theme.palette.primary.purple,
              }}
            />
          }
        >
          Go Back
        </Button>
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message severity='error'>{error}</Message>
      ) : (
        userInfo &&
        invoice && (
          <>
            <CustomCard sx={{ marginBottom: theme.spacing(2) }}>
              <CustomContainer version='inner--small'>
                <Grid container justifyContent='space-between'>
                  <Grid
                    container
                    item
                    sm={4}
                    justifyContent={{ xs: 'space-between', sm: 'left' }}
                    alignItems='center'
                  >
                    <Grid item marginRight={{ sm: 2 }}>
                      <Typography variant='body1' color='text.secondary'>
                        Status
                      </Typography>
                    </Grid>

                    <Grid item>
                      <StatusBadge variant={invoice.status}>
                        {invoice.status}
                      </StatusBadge>
                    </Grid>
                  </Grid>

                  {screenSm && (
                    <Grid
                      container
                      item
                      sm={8}
                      spacing={1}
                      justifyContent='end'
                    >
                      <InvoiceActions />
                    </Grid>
                  )}
                </Grid>
              </CustomContainer>
            </CustomCard>

            <CustomCard>
              <CustomContainer version='inner'>
                <Grid container={screenSm} marginBottom={{ xs: 4, sm: 3 }}>
                  <Grid item sm={6} marginBottom={{ xs: 4, sm: 0 }}>
                    <Typography variant='h4'>
                      <Typography variant='subtitle1' color='text.secondary'>
                        #
                      </Typography>
                      {invoice._id}
                    </Typography>
                    <Typography variant='body1' color='text.secondary'>
                      {invoice.description}
                    </Typography>
                  </Grid>

                  <Grid item sm={6} textAlign={{ sm: 'end' }}>
                    <Typography variant='body2' color='text.secondary'>
                      {userInfo.address.street}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {userInfo.address.city}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {userInfo.address.postCode}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {userInfo.address.country}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container marginBottom={theme.spacing(5)}>
                  <Grid
                    container
                    item
                    xs={6}
                    sm={4}
                    direction='column'
                    justifyContent='space-between'
                  >
                    <Grid item>
                      <Typography
                        variant='body1'
                        color='text.secondary'
                        marginBottom={theme.spacing(1)}
                      >
                        Invoice Date
                      </Typography>
                      <Typography variant='h3'>
                        {format(new Date(invoice.createdAt), 'dd MMM yyyy')}
                      </Typography>
                    </Grid>

                    <Grid item>
                      <Typography
                        variant='body1'
                        color='text.secondary'
                        marginBottom={theme.spacing(1)}
                      >
                        Payment Due
                      </Typography>
                      <Typography variant='h3'>
                        {format(new Date(invoice.paymentDue), 'dd MMM yyyy')}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid item xs={6} sm={4}>
                    <Typography
                      variant='body1'
                      color='text.secondary'
                      marginBottom={theme.spacing(1)}
                    >
                      Bill To
                    </Typography>
                    <Typography variant='h3'>{invoice.client.name}</Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {invoice.client.address.street}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {invoice.client.address.city}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {invoice.client.address.postCode}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {invoice.client.address.country}
                    </Typography>
                  </Grid>

                  <Grid item sm={4} marginTop={{ xs: 4, sm: 0 }}>
                    <Typography
                      variant='body1'
                      color='text.secondary'
                      marginBottom={theme.spacing(1)}
                    >
                      Sent to
                    </Typography>
                    <Typography variant='h3'>{invoice.client.email}</Typography>
                  </Grid>
                </Grid>

                <CustomCard sx={{ backgroundColor: theme.palette.grey[450] }}>
                  <CustomContainer version='inner'>
                    <Grid container rowGap={3}>
                      {screenSm && (
                        <Grid container>
                          <Grid item xs={3}>
                            <Typography variant='body2' color='text.secondary'>
                              Item Name
                            </Typography>
                          </Grid>

                          <Grid item xs={3} textAlign='right'>
                            <Typography variant='body2' color='text.secondary'>
                              QTY.
                            </Typography>
                          </Grid>

                          <Grid item xs={3} textAlign='right'>
                            <Typography variant='body2' color='text.secondary'>
                              Price
                            </Typography>
                          </Grid>

                          <Grid item xs={3} textAlign='right'>
                            <Typography variant='body2' color='text.secondary'>
                              Total
                            </Typography>
                          </Grid>
                        </Grid>
                      )}

                      {invoice.items.map((item) => (
                        <Grid container key={item._id}>
                          <Grid container item alignItems='center'>
                            <Grid item xs={6} sm={3}>
                              <Typography variant='h4'>{item.name}</Typography>
                              {!screenSm && (
                                <Typography variant='h4' color='text.secondary'>
                                  {item.quantity}x £{' '}
                                  {item.price.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                  })}
                                </Typography>
                              )}
                            </Grid>

                            {screenSm && (
                              <Grid item sm={3} textAlign='end'>
                                <Typography variant='h4' color='text.secondary'>
                                  {item.quantity}
                                </Typography>
                              </Grid>
                            )}

                            {screenSm && (
                              <Grid item sm={3} textAlign='end'>
                                <Typography variant='h4' color='text.secondary'>
                                  £{' '}
                                  {item.price.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                  })}
                                </Typography>
                              </Grid>
                            )}

                            <Grid item textAlign='end' xs={6} sm={3}>
                              <Typography variant='h4'>
                                £{' '}
                                {item.total.toLocaleString(undefined, {
                                  minimumFractionDigits: 2,
                                })}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      ))}
                    </Grid>
                  </CustomContainer>

                  <Box sx={{ backgroundColor: theme.palette.grey[200] }}>
                    <CustomContainer version='inner'>
                      <Grid container alignItems='center'>
                        <Grid item xs={6}>
                          <Typography variant='body2' color='white'>
                            Amount Due
                          </Typography>
                        </Grid>
                        <Grid item xs={6} textAlign='end'>
                          <Typography variant='h2' color='white'>
                            £{' '}
                            {invoice.total.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                            })}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CustomContainer>
                  </Box>
                </CustomCard>
              </CustomContainer>
            </CustomCard>

            {!screenSm && (
              <CustomContainer
                version='inner'
                sx={{
                  backgroundColor: 'white',
                  marginTop: theme.spacing(7),
                  position: 'absolute',
                  left: '0',
                }}
              >
                <Grid container justifyContent='space-between'>
                  <InvoiceActions />
                </Grid>
              </CustomContainer>
            )}
          </>
        )
      )}
    </div>
  )
}

export default InvoiceScreen
