import IInvoice from '../interfaces/invoiceInterface'
import { format } from 'date-fns'
import { useMediaQuery, Box, Typography } from '@mui/material'
import { useTheme } from '@mui/material'
import { StatusBadge } from '../components/StatusBadge'

interface IAppProps {
  invoice: IInvoice
}

const InvoicePreview = ({ invoice }: IAppProps): JSX.Element => {
  const theme = useTheme()

  return (
    <Box
      className='invoice-preview'
      sx={{
        backgroundColor: 'background.paper',
      }}
    >
      <div className='row'>
        <div className='col col--left'>
          <Typography variant='h4' className='id'>
            <Typography
              variant='subtitle1'
              sx={{
                color: 'text.secondary',
              }}
            >
              #
            </Typography>
            {invoice._id}
          </Typography>
          <Typography
            variant='body1'
            className='date'
            sx={{
              color: 'text.secondary',
            }}
          >
            Due {format(new Date(invoice.paymentDue), 'dd MMM yyyy')}
          </Typography>
          {useMediaQuery(theme.breakpoints.up('xs')) && (
            <Typography
              variant='body1'
              className='name'
              sx={{
                color: 'text.secondary',
              }}
            >
              {invoice.client.name}
            </Typography>
          )}
          <Typography variant='h3' className='price'>
            £
            {invoice.total.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </Typography>
        </div>

        <div className='col col--right'>
          {!useMediaQuery(theme.breakpoints.up('xs')) && (
            <Typography
              variant='body1'
              className='name'
              sx={{
                color: 'text.secondary',
              }}
            >
              {invoice.client.name}
            </Typography>
          )}

          <StatusBadge variant={invoice.status}>{invoice.status}</StatusBadge>
          {useMediaQuery(theme.breakpoints.up('xs')) && (
            <Typography
              variant='subtitle1'
              className='icon icon--caret-right'
            ></Typography>
          )}
        </div>
      </div>
    </Box>
  )
}

export default InvoicePreview
