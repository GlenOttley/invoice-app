import { styled, TextField, TextFieldProps } from '@mui/material'

const CustomTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
  'label + &': {
    marginTop: '40px',
  },
  '& .MuiOutlinedInput-root': {
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
}))

export default CustomTextField