import {
  Controller,
  useFormContext,
  FieldError,
  Control,
} from 'react-hook-form'
import { Typography, InputLabel, FormControl } from '@mui/material'
import CustomTextField from './CustomTextField'
import { useAppSelector } from '../app/hooks'
import { selectInvoice } from '../features/invoices/invoiceSlice'

const ControlledInput = () => {
  const select = useAppSelector

  const { invoice } = select(selectInvoice)

  const {
    control,
    formState: { errors },
  }: { control: Control; formState: { errors: any } } = useFormContext()

  return (
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
            <Typography variant='overline'>{errors.name?.message}</Typography>
          </InputLabel>

          <CustomTextField {...field} type='text' error={!!errors.name} />
        </FormControl>
      )}
    />
  )
}

export default ControlledInput
