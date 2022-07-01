import {
  Controller,
  useFormContext,
  // FieldError,
  Control,
  UseControllerProps,
} from 'react-hook-form'
import { Typography, InputLabel, FormControl } from '@mui/material'
import CustomTextField from './CustomTextField'
import _ from 'lodash'

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
  }: { control: Control; formState: { errors: any } } = useFormContext()

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
          <InputLabel htmlFor={name}>
            {label}
            <Typography variant='overline'>
              {errors?.items?.[index]?.[name]?.message}
            </Typography>
          </InputLabel>
          {name === 'name' ? (
            <CustomTextField
              {...field}
              type='text'
              error={!!errors?.items?.[index]?.[name]}
            />
          ) : (
            <CustomTextField
              {...field}
              type='number'
              error={!!errors?.items?.[index]?.[name]}
              onChange={({ target }) => field.onChange(+target.value)}
            />
          )}
        </FormControl>
      )}
    />
  )
}

export default ControlledItemInput
