import {
  Controller,
  useFormContext,
  // FieldError,
  Control,
  UseControllerProps,
} from 'react-hook-form'
import { Typography, InputLabel, FormControl } from '@mui/material'
import CustomTextField from './CustomTextField'
import { useAppSelector } from '../app/hooks'
import { selectInvoice } from '../features/invoices/invoiceSlice'
import _ from 'lodash'

interface ComponentProps extends UseControllerProps {
  path: string
  label: string
  index?: number
}

const ControlledInput = ({
  path,
  name,
  rules,
  label,
}: ComponentProps): JSX.Element => {
  const select = useAppSelector

  const { invoice } = select(selectInvoice)

  // type ObjectKey = keyof typeof invoice

  // const myVar = name as ObjectKey

  const {
    control,
    formState: { errors },
  }: { control: Control; formState: { errors: any } } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={_.get(invoice, path)}
      rules={{
        required: "can't be empty",
        ...rules,
      }}
      render={({ field }) => (
        <FormControl fullWidth error={!!errors[name]}>
          <InputLabel htmlFor={name}>
            {label}
            <Typography variant='overline'>{errors[name]?.message}</Typography>
          </InputLabel>

          <CustomTextField {...field} type='text' error={!!errors[name]} />
        </FormControl>
      )}
    />
  )
}

export default ControlledInput
