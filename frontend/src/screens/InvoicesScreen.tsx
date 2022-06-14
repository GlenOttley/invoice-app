import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { getInvoices, selectInvoices } from '../features/invoices/invoicesSlice'
import { selectUser } from '../features/user/userSlice'
import InvoicePreview from '../components/InvoicePreview'
import FilterMenu from '../components/FilterMenu'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { selectFilteredInvoices } from '../features/filters/filtersSlice'
import { useTheme, useMediaQuery, Typography, Button } from '@mui/material'
import Image from 'mui-image'

const InvoicesScreen = (): JSX.Element => {
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const select = useAppSelector

  const invoiceList = select(selectInvoices)
  const {
    invoices,
    loading: loadingInvoices,
    error: errorInvoices,
  } = invoiceList

  const user = select(selectUser)
  const { userInfo } = user

  const filteredInvoices = useAppSelector(selectFilteredInvoices)

  // fetch invoices if logged in
  useEffect(() => {
    if (userInfo) {
      dispatch(getInvoices())
    }
  }, [dispatch, userInfo])

  console.log(theme)

  return (
    <div className='invoices-screen'>
      <div className='container'>
        <div className='row top-panel'>
          <div className='col'>
            <Typography variant='h1' className='page-title'>
              Invoices
            </Typography>
            <Typography
              variant='body1'
              sx={{
                color: 'text.secondary',
              }}
            >
              {!useMediaQuery(theme.breakpoints.down('xs')) && (
                <span>There are </span>
              )}
              {!invoices ? 'No' : invoices.length} invoices
            </Typography>
          </div>
          <div className='col'>
            <FilterMenu />

            <Button
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
              {!useMediaQuery(theme.breakpoints.down('xs')) && ' Invoice'}
            </Button>
          </div>
        </div>

        {!invoices.length && (
          <div className='nothing-here'>
            <Image
              src='/assets/images/megaphone-woman.svg'
              alt='woman appearing from envelope with megaphone'
              showLoading={<Loader />}
            />
            <Typography variant='h2'>There is nothing here</Typography>
            <Typography
              variant='body1'
              sx={{
                color: 'grey.150',
              }}
            >
              Create an invoice by clicking the <br />
              <strong>New</strong> button and get started
            </Typography>
          </div>
        )}

        {loadingInvoices && <Loader />}
        {errorInvoices && <Message severity='error'>{errorInvoices}</Message>}

        {filteredInvoices &&
          filteredInvoices.map((invoice) => (
            <InvoicePreview invoice={invoice} key={invoice._id} />
          ))}
      </div>
    </div>
  )
}

export default InvoicesScreen
