import {
  Controller,
  useFormContext,
  // FieldError,
  Control,
  UseControllerProps,
} from 'react-hook-form'
import { Typography, InputLabel, FormControl } from '@mui/material'
import CustomTextField from './CustomTextField'

interface ComponentProps extends UseControllerProps {
  defaultValue: string | number
  label: string
  index: number
}

const ControlledItemInput = ({
  defaultValue,
  name,
  rules,
  label,
  index,
}: ComponentProps): JSX.Element => {
  const {
    control,
    formState: { errors },
  }: {
    control: Control
    watch: any
    formState: { errors: any }
  } = useFormContext()

  return (
    <Controller
      name={`items.${index}.${name}`}
      control={control}
      defaultValue={defaultValue}
      rules={{
        required: "can't be empty",
        ...rules,
      }}
      render={({ field }) => (
        <FormControl fullWidth error={!!errors?.items?.[index]?.[name]}>
          <InputLabel htmlFor={`items.${index}.${name}`}>
            {label}
            <Typography variant='overline'>
              {errors?.items?.[index]?.[name]?.message}
            </Typography>
          </InputLabel>
          {name === 'name' ? (
            <CustomTextField
              {...field}
              error={!!errors?.items?.[index]?.[name]}
            />
          ) : name === 'quantity' ? (
            <CustomTextField
              {...field}
              type='tel'
              inputMode='numeric'
              error={!!errors?.items?.[index]?.[name]}
              // onChange={({ target }) => field.onChange(+target.value)}
            />
          ) : (
            <CustomTextField
              {...field}
              // type='tel'
              inputMode='numeric'
              error={!!errors?.items?.[index]?.[name]}
              // onChange={({ target }) => field.onChange(+target.value)}
            />
          )}
        </FormControl>
      )}
    />
  )
}

export default ControlledItemInput
