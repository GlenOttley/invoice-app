import React, { useEffect, useState, SetStateAction } from 'react'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import {
  useMediaQuery,
  useTheme,
  Container,
  Button,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  IconButton,
} from '@mui/material'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { selectInvoice, updateInvoice } from '../features/invoices/invoiceSlice'
import { selectUser } from '../features/user/userSlice'
import Loader from './Loader'
import Message from './Message'
import CustomTextField from './CustomTextField'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers'
import IItem from '../interfaces/itemInterface'
import DeleteIcon from '@mui/icons-material/Delete'
import CustomButton from './CustomButton'

interface IInvoiceEditFormProps {
  setShowEditForm: React.Dispatch<SetStateAction<boolean>>
}

const InvoiceEditForm = ({
  setShowEditForm,
}: IInvoiceEditFormProps): JSX.Element => {
  const theme = useTheme()
  const select = useAppSelector
  const dispatch = useAppDispatch()

  const { userInfo } = select(selectUser)
  const { invoice, loading, error } = select(selectInvoice)

  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [street, setStreet] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [postCode, setPostCode] = useState<string>('')
  const [country, setCountry] = useState<string>('')
  const [paymentTerms, setPaymentTerms] = useState<number>(1)
  const [description, setDescription] = useState<string>('')
  const [items, setItems] = useState<IItem[]>([])

  const paymentTermOptions = [
    {
      value: 1,
      label: 'Net 1 Day',
    },
    {
      value: 7,
      label: 'Net 7 Days',
    },
    {
      value: 14,
      label: 'Net 14 Days',
    },
    {
      value: 30,
      label: 'Net 30 Days',
    },
  ]

  const handleItemValueChange = (
    key: string,
    id: string,
    value: string | number
  ) => {
    const index = items.findIndex((item) => item._id === id)
    let total: number
    if (key === 'quantity') {
      total = Number(value) * items[index].price
    } else if (key === 'price') {
      total = items[index].quantity * Number(value)
    } else {
      total = items[index].total
    }
    setItems([
      ...items.slice(0, index),
      { ...items[index], [key]: value, total },
      ...items.slice(index + 1),
    ])
  }

  const handleItemDelete = (id: string) => {
    const index = items.findIndex((item) => item._id === id)
    setItems([...items.slice(0, index), ...items.slice(index + 1)])
  }

  const calculateDueDate = (createdAt: Date, paymentTerms: number) => {
    createdAt = new Date(createdAt)
    const dueDateNum = createdAt.setDate(createdAt.getDate() + paymentTerms)
    const dueDate = new Date(dueDateNum)
    return dueDate
  }

  const calculateTotal = (items: IItem[]): number => {
    let total: number = 0
    items.forEach((item) => {
      total += item.total
    })
    return total
  }

  const handleFormSubmit = () => {
    // TO DO: add form validation
    dispatch(
      updateInvoice({
        _id: invoice._id,
        createdAt: invoice.createdAt,
        paymentTerms,
        paymentDue: calculateDueDate(invoice.createdAt, paymentTerms),
        description,
        status: 'pending',
        client: {
          _id: invoice.client._id,
          name,
          email,
          address: {
            street,
            city,
            postCode,
            country,
          },
        },
        sender: invoice.sender,
        items,
        total: calculateTotal(items),
      })
    )
    setShowEditForm(false)
  }

  useEffect(() => {
    setName(invoice.client.name)
    setEmail(invoice.client.email)
    setStreet(invoice.client.address.street)
    setCity(invoice.client.address.city)
    setPostCode(invoice.client.address.postCode)
    setCountry(invoice.client.address.country)
    setPaymentTerms(invoice.paymentTerms)
    setDescription(invoice.description)
    setItems(invoice.items)
  }, [invoice])

  return (
    <Container
      sx={{
        '&.MuiContainer-root': {
          padding: theme.spacing(4, 3),
          [theme.breakpoints.up('md')]: {
            padding: theme.spacing(7, 7),
          },
          [theme.breakpoints.up('lg')]: {
            padding: theme.spacing(7, 7),
            paddingLeft: `calc(${
              theme.variables.header.offset.lg
            } + ${theme.spacing(7)})`,
          },
        },
      }}
    >
      {useMediaQuery(theme.breakpoints.down('md')) && (
        <Button
          onClick={() => setShowEditForm(false)}
          variant='text'
          sx={{
            padding: 0,
            marginBottom: theme.spacing(3),
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
      )}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message severity='error'>{error}</Message>
      ) : (
        invoice &&
        userInfo && (
          <>
            <Typography variant='h2' marginBottom={3}>
              Edit{' '}
              <Typography variant='h2' component='span' color='grey.300'>
                #
              </Typography>
              {invoice._id}
            </Typography>

            <Grid item container spacing={5} component='form'>
              <Grid item container columnSpacing={3}>
                <Grid item xs={12}>
                  <Typography variant='h4' color='primary.purple'>
                    Bill From
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor='userStreet'>Street Address</InputLabel>
                    <CustomTextField
                      disabled
                      value={userInfo.address.street}
                      // onChange={({ target }) => setStreet(target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={6} md={4}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor='userCity'>City</InputLabel>
                    <CustomTextField
                      disabled
                      value={userInfo.address.city}
                      // onChange={({ target }) => setCity(target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={6} md={4}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor='userPostcode'>Post Code</InputLabel>
                    <CustomTextField
                      disabled
                      value={userInfo.address.postCode}
                      // onChange={({ target }) => setPostCode(target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor='userCountry'>Country</InputLabel>
                    <CustomTextField
                      disabled
                      value={userInfo.address.country}
                      // onChange={({ target }) => setCountry(target.value)}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid item container columnSpacing={3}>
                <Grid item xs={12}>
                  <Typography variant='h4' color='primary.purple'>
                    Bill To
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor='name'>Client's Name</InputLabel>
                    <CustomTextField
                      value={name}
                      onChange={({ target }) => setName(target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor='email'>Client's Email</InputLabel>
                    <CustomTextField
                      value={email}
                      onChange={({ target }) => setEmail(target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor='street'>Street</InputLabel>
                    <CustomTextField
                      value={street}
                      onChange={({ target }) => setStreet(target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={6} md={4}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor='city'>City</InputLabel>
                    <CustomTextField
                      value={city}
                      onChange={({ target }) => setCity(target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={6} md={4}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor='postCode'>Post Code</InputLabel>
                    <CustomTextField
                      value={postCode}
                      onChange={({ target }) => setPostCode(target.value)}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor='country'>Country</InputLabel>
                    <CustomTextField
                      value={country}
                      onChange={({ target }) => setCountry(target.value)}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid item container columnSpacing={3}>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor='date'>Invoice Date</InputLabel>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DesktopDatePicker
                        value={invoice.createdAt}
                        onChange={() => null}
                        disabled
                        renderInput={(params) => (
                          <CustomTextField {...params} />
                        )}
                      ></DesktopDatePicker>
                    </LocalizationProvider>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor='paymentTerms'>
                      Payment Terms
                    </InputLabel>
                    <CustomTextField
                      onChange={({ target }) =>
                        setPaymentTerms(Number(target.value))
                      }
                      value={paymentTerms}
                      select
                      SelectProps={{
                        IconComponent: KeyboardArrowDownIcon,
                      }}
                    >
                      {paymentTermOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </CustomTextField>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor='description'>
                      Project Description
                    </InputLabel>
                    <CustomTextField
                      value={description}
                      onChange={({ target }) => setDescription(target.value)}
                    />
                  </FormControl>
                </Grid>
              </Grid>

              <Grid item container columnSpacing={3}>
                <Grid item xs={12}>
                  <Typography variant='h4' color='primary.purple'>
                    Item List
                  </Typography>
                </Grid>

                {items.map((item) => (
                  <Grid
                    item
                    container
                    columnSpacing={2}
                    key={item._id}
                    alignItems='flex-end'
                    marginBottom={1}
                  >
                    <Grid item xs={12} md={5}>
                      <FormControl fullWidth>
                        <InputLabel htmlFor='itemName'>Item Name</InputLabel>
                        <CustomTextField
                          value={item.name}
                          id={item._id}
                          onChange={(event) =>
                            handleItemValueChange(
                              'name',
                              event.target.id,
                              event.target.value
                            )
                          }
                        />
                      </FormControl>
                    </Grid>

                    <Grid item xs={3} md={2}>
                      <FormControl fullWidth>
                        <InputLabel htmlFor='itemQuantity'>Qty.</InputLabel>
                        <CustomTextField
                          value={item.quantity}
                          id={item._id}
                          onChange={(event) =>
                            handleItemValueChange(
                              'quantity',
                              event.target.id,
                              event.target.value
                            )
                          }
                        />
                      </FormControl>
                    </Grid>

                    <Grid item xs={4} md={2}>
                      <FormControl fullWidth>
                        <InputLabel htmlFor='itemPrice'>Price</InputLabel>
                        <CustomTextField
                          value={item.price}
                          id={item._id}
                          onChange={(event) =>
                            handleItemValueChange(
                              'price',
                              event.target.id,
                              event.target.value
                            )
                          }
                        />
                      </FormControl>
                    </Grid>

                    <Grid item xs={3} md={2}>
                      <FormControl fullWidth>
                        <InputLabel htmlFor='itemTotal'>Total</InputLabel>
                        <CustomTextField
                          value={item.total}
                          id={item._id}
                          disabled
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                border: 'none',
                              },
                            },
                          }}
                        />
                      </FormControl>
                    </Grid>

                    <Grid item xs={1} marginBottom={1} md={1}>
                      <IconButton
                        aria-label='delete item'
                        onClick={() => handleItemDelete(item._id)}
                      >
                        <DeleteIcon sx={{ color: 'grey.300' }} />
                      </IconButton>
                    </Grid>
                  </Grid>
                ))}
                <Grid item xs={12} marginTop={2}>
                  <CustomButton version='grey' fullWidth>
                    + Add New Item
                  </CustomButton>
                </Grid>
              </Grid>
              <Grid container item spacing={1} justifyContent='end'>
                <Grid item>
                  <CustomButton
                    version='grey'
                    onClick={() => setShowEditForm(false)}
                  >
                    Cancel
                  </CustomButton>
                </Grid>
                <Grid item>
                  <CustomButton version='purple' onClick={handleFormSubmit}>
                    Save Changes
                  </CustomButton>
                </Grid>
              </Grid>
            </Grid>
          </>
        )
      )}
    </Container>
  )
}

// new comment only on new branch

export default InvoiceEditForm
