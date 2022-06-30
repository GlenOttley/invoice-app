import { styled, TextField, TextFieldProps } from '@mui/material'

const CustomTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
  'label + &': {
    marginTop: '40px',
  },
  '& .MuiOutlinedInput-root': {
    fontWeight: '600',
    '& fieldset': {
      border: `1px solid ${theme.palette.grey[350]}`,
      borderRadius: '4px',
    },
    '&.Mui-focused fieldset': {
      border: `1px solid ${theme.palette.primary.purple}`,
    },
    '&:hover fieldset': {
      border: `1px solid ${theme.palette.primary.purple}`,
    },
  },
  // error outline
  '.MuiOutlinedInput-input[aria-invalid="true"] + fieldset': {
    borderColor: theme.palette.warning.main,
  },
  '.MuiSelect-icon': {
    color: theme.palette.primary.purple,
    fontSize: '18px',
  },
}))

export default CustomTextField
