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
import { selectUser } from '../features/user/userSlice'
import _ from 'lodash'

interface ComponentProps extends UseControllerProps {
  section: 'invoice' | 'user'
  filled: boolean
  path: string
  label: string
  type?: string
}

const ControlledInput = ({
  section,
  filled,
  path,
  name,
  rules,
  label,
  type,
}: ComponentProps): JSX.Element => {
  const select = useAppSelector

  const { invoice } = select(selectInvoice)
  const { userInfo } = select(selectUser)

  const rootState = section === 'invoice' ? invoice : userInfo

  const {
    control,
    formState: { errors },
  }: { control: Control; formState: { errors: any } } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={filled ? _.get(rootState, path) : ''}
      rules={
        type === 'password'
          ? {
              ...rules,
            }
          : {
              required: "can't be empty",
              ...rules,
            }
      }
      render={({ field }) => (
        <FormControl fullWidth error={!!_.get(errors, name)}>
          <InputLabel htmlFor={name}>
            {label}
            <Typography variant='overline'>
              {_.get(errors, name)?.message}
            </Typography>
          </InputLabel>

          <CustomTextField
            {...field}
            type={type || 'text'}
            autoComplete={type === 'password' ? 'new-password' : 'off'}
            error={!!_.get(errors, name)}
          />
        </FormControl>
      )}
    />
  )
}

export default ControlledInput
