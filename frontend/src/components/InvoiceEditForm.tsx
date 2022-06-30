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
} from '@mui/material'
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import React, { SetStateAction } from 'react'
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
  FormProvider,
} from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { selectInvoice, updateInvoice } from '../features/invoices/invoiceSlice'
import { selectUser } from '../features/user/userSlice'
import IItem from '../interfaces/itemInterface'
import CustomButton from './CustomButton'
import CustomTextField from './CustomTextField'
import Loader from './Loader'
import Message from './Message'

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

  const { userInfo } = select(selectUser)
  const { invoice, loading, error } = select(selectInvoice)

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
    return total
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
                    <Controller
                      name='name'
                      control={control}
                      defaultValue={invoice.client.name}
                      rules={{
                        required: "can't be empty",
                      }}
                      render={({ field }) => (
                        <FormControl fullWidth error={!!errors.name}>
                          <InputLabel htmlFor='name'>
                            Client's Name
                            <Typography variant='overline'>
                              {errors.name?.message}
                            </Typography>
                          </InputLabel>

                          <CustomTextField
                            {...field}
                            type='text'
                            error={!!errors.name}
                          />
                        </FormControl>
                      )}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Controller
                      name='email'
                      control={control}
                      defaultValue={invoice.client.email}
                      rules={{
                        required: "can't be empty",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'please use a valid email address',
                        },
                      }}
                      render={({ field }) => (
                        <FormControl fullWidth error={!!errors.email}>
                          <InputLabel htmlFor='email'>
                            Client's Email
                            <Typography variant='overline'>
                              {errors.email?.message}
                            </Typography>
                          </InputLabel>
                          <CustomTextField
                            {...field}
                            type='email'
                            error={!!errors.email}
                          />
                        </FormControl>
                      )}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Controller
                      name='street'
                      control={control}
                      defaultValue={invoice.client.address.street}
                      rules={{
                        required: "can't be empty",
                      }}
                      render={({ field }) => (
                        <FormControl fullWidth error={!!errors.street}>
                          <InputLabel htmlFor='street'>
                            Street
                            <Typography variant='overline'>
                              {errors.street?.message}
                            </Typography>
                          </InputLabel>
                          <CustomTextField
                            {...field}
                            type='text'
                            error={!!errors.street}
                          />
                        </FormControl>
                      )}
                    />
                  </Grid>

                  <Grid item xs={6} md={4}>
                    <Controller
                      name='city'
                      control={control}
                      defaultValue={invoice.client.address.city}
                      rules={{
                        required: "can't be empty",
                      }}
                      render={({ field }) => (
                        <FormControl fullWidth error={!!errors.city}>
                          <InputLabel htmlFor='city'>
                            City
                            <Typography variant='overline'>
                              {errors.city?.message}
                            </Typography>
                          </InputLabel>
                          <CustomTextField
                            {...field}
                            type='text'
                            error={!!errors.city}
                          />
                        </FormControl>
                      )}
                    />
                  </Grid>

                  <Grid item xs={6} md={4}>
                    <Controller
                      name='postCode'
                      control={control}
                      defaultValue={invoice.client.address.postCode}
                      rules={{
                        required: "can't be empty",
                      }}
                      render={({ field }) => (
                        <FormControl fullWidth error={!!errors.postCode}>
                          <InputLabel htmlFor='postCode'>
                            Post Code
                            <Typography variant='overline'>
                              {errors.postCode?.message}
                            </Typography>
                          </InputLabel>
                          <CustomTextField
                            {...field}
                            type='text'
                            error={!!errors.postCode}
                          />
                        </FormControl>
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Controller
                      name='country'
                      control={control}
                      defaultValue={invoice.client.address.country}
                      rules={{
                        required: "can't be empty",
                      }}
                      render={({ field }) => (
                        <FormControl fullWidth error={!!errors.country}>
                          <InputLabel htmlFor='country'>
                            Country
                            <Typography variant='overline'>
                              {errors.country?.message}
                            </Typography>
                          </InputLabel>
                          <CustomTextField
                            {...field}
                            error={!!errors.country}
                          />
                        </FormControl>
                      )}
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
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </CustomTextField>
                        </FormControl>
                      )}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Controller
                      name='description'
                      control={control}
                      defaultValue={invoice.description}
                      rules={{
                        required: "can't be empty",
                      }}
                      render={({ field }) => (
                        <FormControl fullWidth error={!!errors.description}>
                          <InputLabel htmlFor='description'>
                            Project Description
                            <Typography variant='overline'>
                              {errors.description?.message}
                            </Typography>
                          </InputLabel>
                          <CustomTextField
                            {...field}
                            type='text'
                            error={!!errors.description}
                          />
                        </FormControl>
                      )}
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
                        <Controller
                          name={`items.${index}.name`}
                          control={control}
                          defaultValue={field.name}
                          rules={{
                            required: "can't be empty",
                          }}
                          render={({ field }) => (
                            <FormControl
                              fullWidth
                              error={!!errors?.items?.[index]?.name}
                            >
                              <InputLabel htmlFor='itemName'>
                                Item Name
                                <Typography variant='overline'>
                                  {errors?.items?.[index]?.name?.message}
                                </Typography>
                              </InputLabel>
                              <CustomTextField
                                {...field}
                                type='text'
                                error={!!errors?.items?.[index]?.name}
                              />
                            </FormControl>
                          )}
                        />
                      </Grid>

                      <Grid item xs={3} md={2}>
                        <Controller
                          name={`items.${index}.quantity`}
                          control={control}
                          defaultValue={field.quantity}
                          rules={{
                            required: "can't be empty",
                          }}
                          render={({ field }) => (
                            <FormControl
                              fullWidth
                              error={!!errors?.items?.[index]?.quantity}
                            >
                              <InputLabel htmlFor='itemQuantity'>
                                Qty.
                                <Typography variant='overline'>
                                  {errors?.items?.[index]?.quantity?.message}
                                </Typography>
                              </InputLabel>
                              <CustomTextField
                                {...field}
                                // convert value to number
                                onChange={({ target }) =>
                                  field.onChange(+target.value)
                                }
                                error={!!errors?.items?.[index]?.quantity}
                              />
                            </FormControl>
                          )}
                        />
                      </Grid>

                      <Grid item xs={4} md={2}>
                        <Controller
                          name={`items.${index}.price`}
                          control={control}
                          defaultValue={field.price}
                          rules={{
                            required: "can't be empty",
                            pattern: {
                              value: /^\d{0,8}(\.\d{1,4})?$/i,
                              message: 'must be a valid price value',
                            },
                          }}
                          render={({ field }) => (
                            <FormControl
                              fullWidth
                              error={!!errors?.items?.[index]?.price}
                            >
                              <InputLabel htmlFor='itemPrice'>
                                Price
                                <Typography variant='overline'>
                                  {errors.items?.[index]?.price?.message}
                                </Typography>
                              </InputLabel>
                              <CustomTextField
                                {...field}
                                // convert value to number
                                onChange={({ target }) =>
                                  field.onChange(+target.value)
                                }
                                error={!!errors?.items?.[index]?.price}
                              />
                            </FormControl>
                          )}
                        />
                      </Grid>

                      <Grid item xs={3} md={2}>
                        <FormControl fullWidth>
                          <InputLabel htmlFor='itemTotal'>Total</InputLabel>
                          <CustomTextField
                            value={
                              watch(`items.${index}.quantity`) *
                              watch(`items.${index}.price`)
                            }
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
                          onClick={() => remove(index)}
                        >
                          <DeleteIcon sx={{ color: 'grey.300' }} />
                        </IconButton>
                      </Grid>
                    </Grid>
                  ))}
                  <Grid item xs={12} marginTop={2}>
                    <CustomButton
                      version='grey'
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
                    <CustomButton type='submit' version='purple'>
                      Save Changes
                    </CustomButton>
                  </Grid>
                </Grid>
              </FormProvider>
            </Grid>
          </>
        )
      )}
    </Container>
  )
}

export default InvoiceEditForm
