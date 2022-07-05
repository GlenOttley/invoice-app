import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { getInvoices, selectInvoices } from '../features/invoices/invoicesSlice'
import { selectUser } from '../features/user/userSlice'
import InvoicePreview from '../components/InvoicePreview'
import FilterMenu from '../components/FilterMenu'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {
  selectFilteredInvoices,
  selectStatus,
} from '../features/filters/filtersSlice'
import {
  useTheme,
  useMediaQuery,
  Typography,
  Button,
  Grid,
  Drawer,
} from '@mui/material'
import Image from 'mui-image'
import InvoiceCreateForm from '../components/InvoiceCreateForm'

const InvoicesScreen = (): JSX.Element => {
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const select = useAppSelector
  const navigate = useNavigate()

  const screenSm = useMediaQuery(theme.breakpoints.up('sm'))

  const invoicesList = select(selectInvoices)
  const {
    invoices,
    loading: loadingInvoices,
    error: errorInvoices,
  } = invoicesList

  const user = select(selectUser)
  const { userInfo } = user

  const status = select(selectStatus)

  const filteredInvoices = useAppSelector(selectFilteredInvoices)

  const [showCreateForm, setShowCreateForm] = useState(false)

  // fetch invoices if logged in
  useEffect(() => {
    if (userInfo) {
      dispatch(getInvoices())
    }
  }, [dispatch, userInfo])

  return (
    <div className='invoices-screen'>
      <Grid
        container
        justifyContent='space-between'
        alignItems='center'
        marginBottom={4}
      >
        <Grid container item xs='auto' direction='column'>
          <Typography variant='h1' className='page-title'>
            Invoices
          </Typography>
          <Typography
            variant='body1'
            sx={{
              color: 'text.secondary',
            }}
          >
            {!useMediaQuery(theme.breakpoints.down('sm')) && (
              <span>There are </span>
            )}
            {!invoices ? 'No' : filteredInvoices.length} {status} invoices
          </Typography>
        </Grid>
        <Grid container item xs='auto' justifyContent='flex-end'>
          <FilterMenu />

          <Button
            onClick={() =>
              userInfo ? setShowCreateForm(true) : navigate('/login')
            }
            variant='contained'
            className='btn--plus'
            sx={{
              backgroundColor: theme.palette.primary.purple,
              color: '#ffff',
              '&:hover': {
                backgroundColor: theme.palette.primary.purpleLight,
              },
            }}
          >
            New
            {!useMediaQuery(theme.breakpoints.down('sm')) && ' Invoice'}
          </Button>
        </Grid>
      </Grid>

      <Grid container direction='column' gap={2}>
        {loadingInvoices ? (
          <Loader />
        ) : errorInvoices ? (
          <Message severity='error'>{errorInvoices}</Message>
        ) : (
          filteredInvoices.map((invoice) => (
            <Link to={`/invoice/${invoice._id}`} key={invoice._id}>
              <Grid container item>
                <InvoicePreview invoice={invoice} />
              </Grid>
            </Link>
          ))
        )}

        {!invoices.length && (
          <Grid container justifyContent='center'>
            <Grid
              item
              width={{ xs: '217px', sm: '242px' }}
              marginBottom={{ xs: 5, sm: 8 }}
            >
              <Image
                src='/assets/images/megaphone-woman.svg'
                alt='woman appearing from envelope with megaphone'
                showLoading={<Loader />}
              />
            </Grid>

            <Grid
              container
              item
              xs={12}
              justifyContent='center'
              marginBottom={3}
            >
              <Typography variant='h2'>There is nothing here</Typography>
            </Grid>

            <Grid container item xs={12} justifyContent='center'>
              <Typography
                variant='body1'
                color='text.secondary'
                textAlign='center'
              >
                Create an invoice by clicking the <br />
                <strong>New {screenSm && 'Invoice'}</strong> button and get
                started
              </Typography>
            </Grid>
          </Grid>
        )}
      </Grid>

      <Drawer
        open={showCreateForm}
        onClose={() => setShowCreateForm(false)}
        anchor='left'
        sx={{
          [`& .MuiDrawer-paper`]: {
            top: theme.variables.header.offset.xs,
            height: 'calc(100% - 72px)',
            width: '100%',
            boxSizing: 'border-box',
            [theme.breakpoints.up('md')]: {
              borderTopRightRadius: '20px',
              borderBottomRightRadius: '20px',
              top: theme.variables.header.offset.md,
              width: '616px',
            },
            [theme.breakpoints.up('lg')]: {
              top: 0,
              height: '100%',
              width: `calc(616px + ${theme.variables.header.offset.lg})`,
            },
          },
        }}
      >
        <InvoiceCreateForm setShowCreateForm={setShowCreateForm} />
      </Drawer>
    </div>
  )
}

export default InvoicesScreen
