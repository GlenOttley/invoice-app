import DeleteIcon from '@mui/icons-material/Delete'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import {
  Box,
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
import { selectUser } from '../features/user/userSlice'
import IItem from '../interfaces/itemInterface'
import ControlledInput from './ControlledInput'
import ControlledItemInput from './ControlledItemInput'
import CustomButton from './CustomButton'
import CustomTextField from './CustomTextField'
import Loader from './Loader'
import Message from './Message'

import _ from 'lodash'
import { useNavigate } from 'react-router-dom'
import {
  createInvoice,
  invoiceCreateReset,
  selectInvoice,
} from '../features/invoices/invoiceSlice'
import generateId from '../utils/generateId'
import toPriceValue from '../utils/toPriceValue'

interface IInvoiceCreateFormProps {
  setShowCreateForm: React.Dispatch<SetStateAction<boolean>>
}

interface IFormInput {
  createdAt: Date
  status: 'paid' | 'pending' | 'draft'
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

const InvoiceCreateForm = ({
  setShowCreateForm,
}: IInvoiceCreateFormProps): JSX.Element => {
  const theme = useTheme()
  const select = useAppSelector
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

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

  const { userInfo, loading, error } = select(selectUser)
  const { invoice, successCreate } = select(selectInvoice)

  const saveDraft = () => {
    const id = generateId()
    dispatch(
      createInvoice({
        _id: id,
        createdAt: watch().createdAt,
        paymentTerms: watch().paymentTerms,
        paymentDue: calculateDueDate(watch().createdAt, watch().paymentTerms),
        description: watch().description,
        status: 'draft',
        client: {
          _id: '',
          name: watch().name,
          email: watch().email,
          address: {
            street: watch().street,
            city: watch().city,
            postCode: watch().postCode,
            country: watch().country,
          },
        },
        sender: '',
        items: calculateItemTotal(watch().items),
        total: calculateTotal(watch().items),
      })
    )
  }

  const handleFormSubmit: SubmitHandler<IFormInput> = (data: IFormInput) => {
    if (validate(data)) {
      const id = generateId()
      dispatch(
        createInvoice({
          _id: id,
          createdAt: data.createdAt,
          paymentTerms: data.paymentTerms,
          paymentDue: calculateDueDate(data.createdAt, data.paymentTerms),
          description: data.description,
          status: 'pending',
          client: {
            _id: '',
            name: data.name,
            email: data.email,
            address: {
              street: data.street,
              city: data.city,
              postCode: data.postCode,
              country: data.country,
            },
          },
          sender: '',
          items: calculateItemTotal(data.items),
          total: calculateTotal(data.items),
        })
      )
    }
  }

  useEffect(() => {
    if (successCreate) {
      dispatch(invoiceCreateReset())
      navigate(`/invoice/${invoice._id}`)
    }
  }, [successCreate, dispatch, navigate, invoice])

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
          onClick={() => setShowCreateForm(false)}
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
        userInfo && (
          <Box>
            <Typography variant='h2' marginBottom={3}>
              New Invoice
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
                      filled={false}
                      name='name'
                      path='client.name'
                      label="Client's Name"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <ControlledInput
                      section='invoice'
                      filled={false}
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
                      filled={false}
                      name='street'
                      path='client.address.street'
                      label='Street'
                    />
                  </Grid>

                  <Grid item xs={6} md={4}>
                    <ControlledInput
                      section='invoice'
                      filled={false}
                      name='city'
                      path='client.address.city'
                      label='City'
                    />
                  </Grid>

                  <Grid item xs={6} md={4}>
                    <ControlledInput
                      section='invoice'
                      filled={false}
                      name='postCode'
                      path='client.address.postCode'
                      label='Post Code'
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <ControlledInput
                      section='invoice'
                      filled={false}
                      name='country'
                      path='client.address.country'
                      label='Country'
                    />
                  </Grid>
                </Grid>

                <Grid item container columnSpacing={3}>
                  <Grid item xs={12} md={6}>
                    <Controller
                      name='createdAt'
                      control={control}
                      defaultValue={new Date()}
                      rules={{
                        required: "can't be empty",
                      }}
                      render={({ field }) => (
                        <FormControl fullWidth error={!!errors.createdAt}>
                          <InputLabel htmlFor='createdAt'>
                            Invoice Date
                            <Typography variant='overline'>
                              {errors.createdAt?.message}
                            </Typography>
                          </InputLabel>
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                              value={field.value}
                              onChange={(e) => field.onChange(e)}
                              renderInput={(params) => (
                                <CustomTextField
                                  {...params}
                                  type='date'
                                  error={!!errors.createdAt}
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
                      defaultValue={30}
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
                      filled={false}
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
                <Grid container item justifyContent='space-between'>
                  <Grid item xs={3}>
                    <CustomButton
                      version='grey'
                      onClick={() => setShowCreateForm(false)}
                    >
                      Discard
                    </CustomButton>
                  </Grid>
                  <Grid container item xs={9} spacing={1} justifyContent='end'>
                    <Grid item>
                      <CustomButton version='dark' onClick={saveDraft}>
                        Save as Draft
                      </CustomButton>
                    </Grid>
                    <Grid item>
                      <CustomButton
                        type='submit'
                        version='purple'
                        onClick={() => setValidating(true)}
                      >
                        {'Save & Send'}
                      </CustomButton>
                    </Grid>
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

export default InvoiceCreateForm
