import DeleteIcon from '@mui/icons-material/Delete'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import {
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Typography,
  useMediaQuery,
  useTheme,
  Box,
} from '@mui/material'
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import React, { SetStateAction, useEffect, useState } from 'react'
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  selectInvoice,
  updateInvoice,
  invoiceUpdateReset,
} from '../features/invoices/invoiceSlice'
import { selectUser } from '../features/user/userSlice'
import IItem from '../interfaces/itemInterface'
import ControlledInput from './ControlledInput'
import ControlledItemInput from './ControlledItemInput'
import CustomButton from './CustomButton'
import CustomTextField from './CustomTextField'
import Loader from './Loader'
import Message from './Message'
import _ from 'lodash'
import toPriceValue from '../utils/toPriceValue'
import { useNavigate } from 'react-router-dom'

interface IInvoiceEditFormProps {
  setShowEditForm: React.Dispatch<SetStateAction<boolean>>
}

interface IFormInput {
  name: string
  email: string
  street: string
  city: string
  postCode: string
  country: string
  date: Date
  paymentTerms: number
  description: string
  items: IItem[]
}

const InvoiceEditForm = ({
  setShowEditForm,
}: IInvoiceEditFormProps): JSX.Element => {
  const theme = useTheme()
  const select = useAppSelector
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { userInfo } = select(selectUser)
  const { invoice, loading, error, successUpdate } = select(selectInvoice)

  const [validating, setValidating] = useState<boolean>(false)

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

  const calculateDueDate = (createdAt: Date, paymentTerms: number) => {
    createdAt = new Date(createdAt)
    const dueDateNum = createdAt.setDate(createdAt.getDate() + paymentTerms)
    const dueDate = new Date(dueDateNum)
    return dueDate
  }

  const calculateItemTotal = (items: IItem[]): IItem[] => {
    items.forEach((item) => {
      item.total = item.quantity * item.price
    })
    return items
  }

  const calculateTotal = (items: IItem[]): number => {
    let total: number = 0
    items.forEach((item) => {
      total += item.total
    })
    // total = Number(total.toFixed(2))
    return total
  }

  const validate = (data: IFormInput) => {
    if (!data.items.length || !_.isEmpty(errors)) {
      return false
    } else {
      return true
    }
  }

  const methods = useForm<IFormInput>({
    defaultValues: {
      items: [...invoice.items],
    },
    mode: 'onSubmit',
  })

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = methods

  const { fields, append, remove } = useFieldArray({
    name: 'items',
    control,
  })

  const handleFormSubmit: SubmitHandler<IFormInput> = (data: IFormInput) => {
    if (validate(data)) {
      dispatch(
        updateInvoice({
          _id: invoice._id,
          createdAt: invoice.createdAt,
          paymentTerms: data.paymentTerms,
          paymentDue: calculateDueDate(invoice.createdAt, data.paymentTerms),
          description: data.description,
          status: 'pending',
          client: {
            _id: invoice.client._id,
            name: data.name,
            email: data.email,
            address: {
              street: data.street,
              city: data.city,
              postCode: data.postCode,
              country: data.country,
            },
          },
          sender: invoice.sender,
          items: calculateItemTotal(data.items),
          total: calculateTotal(data.items),
        })
      )
      setShowEditForm(false)
    }
  }

  useEffect(() => {
    if (successUpdate) {
      dispatch(invoiceUpdateReset())
      navigate(`/invoice/${invoice._id}`)
    }
  }, [successUpdate, dispatch, navigate, invoice])

  return (
    <Container
      sx={{
        backgroundColor:
          theme.palette.mode === 'light' ? 'white' : 'background.default',
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

      {error && <Message severity='error'>{error}</Message>}

      {loading ? (
        <Loader />
      ) : (
        invoice &&
        userInfo && (
          <Box>
            <Typography variant='h2' marginBottom={3}>
              Edit{' '}
              <Typography variant='h2' component='span' color='grey.300'>
                #
              </Typography>
              {invoice._id}
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
                      Bill From
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor='userStreet'>
                        Street Address
                      </InputLabel>
                      <CustomTextField
                        disabled
                        // fetch 'sender' in database call so that sender info does not change after
                        // user profile is updated
                        value={userInfo.address.street}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={6} md={4}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor='userCity'>City</InputLabel>
                      <CustomTextField disabled value={userInfo.address.city} />
                    </FormControl>
                  </Grid>

                  <Grid item xs={6} md={4}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor='userPostcode'>Post Code</InputLabel>
                      <CustomTextField
                        disabled
                        value={userInfo.address.postCode}
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor='userCountry'>Country</InputLabel>
                      <CustomTextField
                        disabled
                        value={userInfo.address.country}
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
                    <ControlledInput
                      section='invoice'
                      filled={true}
                      name='name'
                      path='client.name'
                      label="Client's Name"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <ControlledInput
                      section='invoice'
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
                      section='invoice'
                      filled={true}
                      name='street'
                      path='client.address.street'
                      label='Street'
                    />
                  </Grid>

                  <Grid item xs={6} md={4}>
                    <ControlledInput
                      section='invoice'
                      filled={true}
                      name='city'
                      path='client.address.city'
                      label='City'
                    />
                  </Grid>

                  <Grid item xs={6} md={4}>
                    <ControlledInput
                      section='invoice'
                      filled={true}
                      name='postCode'
                      path='client.address.postCode'
                      label='Post Code'
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <ControlledInput
                      section='invoice'
                      filled={true}
                      name='country'
                      path='client.address.country'
                      label='Country'
                    />
                  </Grid>
                </Grid>

                <Grid item container columnSpacing={3}>
                  <Grid item xs={12} md={6}>
                    <Controller
                      name='date'
                      control={control}
                      defaultValue={invoice.createdAt}
                      rules={{
                        required: "can't be empty",
                      }}
                      render={({ field }) => (
                        <FormControl fullWidth error={!!errors.date}>
                          <InputLabel htmlFor='date'>
                            Invoice Date
                            <Typography variant='overline'>
                              {errors.date?.message}
                            </Typography>
                          </InputLabel>
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                              value={field.value}
                              onChange={(e) => field.onChange(e)}
                              disabled
                              renderInput={(params) => (
                                <CustomTextField
                                  {...params}
                                  type='date'
                                  error={!!errors.date}
                                />
                              )}
                            ></DesktopDatePicker>
                          </LocalizationProvider>
                        </FormControl>
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Controller
                      name='paymentTerms'
                      control={control}
                      defaultValue={invoice.paymentTerms}
                      rules={{
                        required: "can't be empty",
                      }}
                      render={({ field }) => (
                        <FormControl fullWidth error={!!errors.paymentTerms}>
                          <InputLabel htmlFor='paymentTerms'>
                            Payment Terms
                            <Typography variant='overline'>
                              {errors.paymentTerms?.message}
                            </Typography>
                          </InputLabel>
                          <CustomTextField
                            {...field}
                            type='number'
                            select
                            error={!!errors.paymentTerms}
                            SelectProps={{
                              IconComponent: KeyboardArrowDownIcon,
                            }}
                          >
                            {paymentTermOptions.map((option) => (
                              <MenuItem
                                key={option.value}
                                value={option.value}
                                sx={{
                                  backgroundColor:
                                    theme.palette.mode === 'light'
                                      ? 'transparent'
                                      : `${theme.palette.grey[150]} !important`,
                                  '&:not(:last-child)': {
                                    borderBottom: '1px solid',
                                    borderColor:
                                      theme.palette.mode === 'light'
                                        ? 'grey.350'
                                        : 'grey.100',
                                  },
                                }}
                              >
                                {option.label}
                              </MenuItem>
                            ))}
                          </CustomTextField>
                        </FormControl>
                      )}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <ControlledInput
                      section='invoice'
                      filled={true}
                      name='description'
                      path='description'
                      label='Project Description'
                    />
                  </Grid>
                </Grid>

                <Grid item container columnSpacing={3}>
                  <Grid item xs={12}>
                    <Typography variant='h4' color='primary.purple'>
                      Item List
                    </Typography>
                  </Grid>

                  {fields.map((field, index) => (
                    <Grid
                      item
                      container
                      columnSpacing={2}
                      key={field.id}
                      alignItems='flex-end'
                      marginBottom={1}
                    >
                      <Grid item xs={12} md={5}>
                        <ControlledItemInput
                          name='name'
                          label='Item Name'
                          defaultValue={field.name}
                          index={index}
                        />
                      </Grid>

                      <Grid item xs={3} md={2}>
                        <ControlledItemInput
                          name='quantity'
                          label='Qty.'
                          defaultValue={field.quantity}
                          index={index}
                          rules={{
                            pattern: {
                              value: /^\d+$/i,
                              message: 'must be a whole number',
                            },
                          }}
                        />
                      </Grid>

                      <Grid item xs={4} md={2}>
                        <ControlledItemInput
                          name='price'
                          label='Price'
                          defaultValue={field.price}
                          index={index}
                          rules={{
                            pattern: {
                              value: /^\d{0,8}(\.\d{2,2})?$/i,
                              message: 'must be a valid price value',
                            },
                          }}
                        />
                      </Grid>

                      <Grid item xs={3} md={2}>
                        <FormControl fullWidth>
                          <InputLabel htmlFor='itemTotal'>Total</InputLabel>
                          <CustomTextField
                            value={
                              isNaN(
                                watch(`items.${index}.quantity`) *
                                  watch(`items.${index}.price`)
                              )
                                ? 0
                                : toPriceValue(
                                    watch(`items.${index}.quantity`) *
                                      watch(`items.${index}.price`)
                                  )
                            }
                            disabled
                            sx={{
                              fieldset: {
                                border: 'none !important',
                              },
                            }}
                          />
                        </FormControl>
                      </Grid>

                      <Grid item xs={1} marginBottom={1} md={1}>
                        <IconButton
                          aria-label='delete item'
                          onClick={() => remove(index)}
                        >
                          <DeleteIcon
                            sx={{
                              color: 'grey.300',
                              '&:hover': { color: 'warning.main' },
                            }}
                          />
                        </IconButton>
                      </Grid>
                    </Grid>
                  ))}
                  <Grid item xs={12} marginTop={2}>
                    <CustomButton
                      version='slate'
                      fullWidth
                      onClick={() =>
                        append({
                          name: '',
                          quantity: 0,
                          price: 0,
                          total: 0,
                        })
                      }
                    >
                      + Add New Item
                    </CustomButton>
                  </Grid>
                  {validating && (
                    <Grid item xs={12} marginTop={4}>
                      <Typography variant='overline'>
                        {!_.isEmpty(errors) && '- All fields must be added'}
                      </Typography>
                      <Typography variant='overline'>
                        {!watch('items').length && '- An item must be added'}
                      </Typography>
                    </Grid>
                  )}
                </Grid>
                <Grid container item spacing={1} justifyContent='end'>
                  <Grid item>
                    <CustomButton
                      version='slate'
                      onClick={() => setShowEditForm(false)}
                    >
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
        )
      )}
    </Container>
  )
}

export default InvoiceEditForm
