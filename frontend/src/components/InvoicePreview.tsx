import IInvoice from '../interfaces/invoiceInterface'
import { format } from 'date-fns'
import { useTheme, useMediaQuery, Typography } from '@mui/material'
import StatusBadge from '../components/StatusBadge'
import CustomContainer from './CustomContainer'
import CustomCard from './CustomCard'

interface IAppProps {
  invoice: IInvoice
}

const InvoicePreview = ({ invoice }: IAppProps): JSX.Element => {
  const theme = useTheme()

  return (
    <CustomCard
      className='invoice-preview'
      sx={{
        marginBottom: '16px',
        backgroundColor: 'background.paper',
        '&:hover': {
          outline: `1px solid ${theme.palette.primary.purple}`,
        },
      }}
    >
      <CustomContainer version='xs'>
        <div className='row'>
          <div className='col col--left'>
            <Typography variant='h4' className='id'>
              <Typography variant='subtitle1' color='text.secondary'>
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
            {useMediaQuery(theme.breakpoints.up('sm')) && (
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
            {!useMediaQuery(theme.breakpoints.up('sm')) && (
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
            {useMediaQuery(theme.breakpoints.up('sm')) && (
              <Typography
                variant='subtitle1'
                className='icon icon--caret-right'
              ></Typography>
            )}
          </div>
        </div>
      </CustomContainer>
    </CustomCard>
  )
}

export default InvoicePreview
