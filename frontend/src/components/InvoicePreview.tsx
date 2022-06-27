import { Typography, useMediaQuery, useTheme, Grid } from '@mui/material'
import { format } from 'date-fns'
import StatusBadge from '../components/StatusBadge'
import IInvoice from '../interfaces/invoiceInterface'
import CustomCard from './CustomCard'
import CustomContainer from './CustomContainer'

interface IAppProps {
  invoice: IInvoice
}

const InvoicePreview = ({ invoice }: IAppProps): JSX.Element => {
  const theme = useTheme()

  return (
    <Grid container item maxHeight={{ xs: '134px', md: '72px' }}>
      <CustomCard
        className='invoice-preview'
        sx={{
          width: '100%',
          backgroundColor: 'background.paper',
          '&:hover': {
            outline: `1px solid ${theme.palette.primary.purple}`,
          },
        }}
      >
        <CustomContainer version='xs'>
          <Grid container justifyContent='space-between' alignItems='stretch'>
            <Grid
              container
              item
              xs={6}
              md={8}
              justifyContent='space-between'
              direction={{ xs: 'column', md: 'row' }}
            >
              <Grid
                container
                item
                md={2}
                alignItems='center'
                marginBottom={{ xs: 3, md: 0 }}
              >
                <Typography variant='h4' className='id'>
                  <Typography
                    variant='h4'
                    component='span'
                    color='text.secondary'
                  >
                    #
                  </Typography>
                  {invoice._id}
                </Typography>
              </Grid>

              <Grid
                container
                item
                md={3}
                alignItems='center'
                marginBottom={{ xs: 1, md: 0 }}
              >
                <Typography
                  variant='body1'
                  className='date'
                  sx={{
                    color: 'text.secondary',
                  }}
                >
                  Due {format(new Date(invoice.paymentDue), 'dd MMM yyyy')}
                </Typography>
              </Grid>

              {useMediaQuery(theme.breakpoints.up('md')) && (
                <Grid container item md={3} alignItems='center'>
                  <Typography
                    variant='body1'
                    className='name'
                    color='text.secondary'
                  >
                    {invoice.client.name}
                  </Typography>
                </Grid>
              )}
              <Grid
                container
                item
                md={3}
                alignItems='center'
                justifyContent={{ md: 'end' }}
              >
                <Typography variant='h3' className='price'>
                  £
                  {invoice.total.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </Typography>
              </Grid>
            </Grid>

            <Grid
              container
              item
              xs={6}
              md={3}
              spacing={3}
              direction={{ xs: 'column', md: 'row' }}
              alignItems={{ xs: 'end', md: 'auto' }}
              justifyContent='end'
            >
              {useMediaQuery(theme.breakpoints.down('md')) && (
                <Grid item>
                  <Typography
                    variant='body1'
                    className='name'
                    sx={{
                      color: 'text.secondary',
                    }}
                  >
                    {invoice.client.name}
                  </Typography>
                </Grid>
              )}
              <Grid item xs={6}>
                <StatusBadge variant={invoice.status}>
                  {invoice.status}
                </StatusBadge>
              </Grid>

              {useMediaQuery(theme.breakpoints.up('md')) && (
                <Grid
                  container
                  item
                  md={1}
                  alignSelf='center'
                  justifyContent='end'
                >
                  <Typography
                    variant='subtitle1'
                    component='span'
                    className='icon icon--caret-right'
                  ></Typography>
                </Grid>
              )}
            </Grid>
          </Grid>
        </CustomContainer>
      </CustomCard>
    </Grid>
  )
}

export default InvoicePreview
