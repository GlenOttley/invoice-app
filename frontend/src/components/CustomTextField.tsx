import { styled, TextField, TextFieldProps } from '@mui/material'

const CustomTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
  'label + &': {
    marginTop: '40px',
  },
  '.MuiOutlinedInput-root': {
    fontWeight: '600',
    backgroundColor:
      theme.palette.mode === 'light'
        ? 'transparent'
        : theme.palette.background.paper,
    '& fieldset': {
      border:
        theme.palette.mode === 'light'
          ? `1px solid ${theme.palette.grey[350]}`
          : `1px solid ${theme.palette.grey[150]}`,

      borderRadius: '4px',
      color: 'white !important',
    },
    '&.Mui-focused fieldset': {
      border: `1px solid ${theme.palette.primary.purple}`,
    },
    '&:hover fieldset': {
      border: `1px solid ${theme.palette.primary.purple}`,
    },
    '&.Mui-disabled': {
      '& fieldset': {
        border:
          theme.palette.mode === 'light'
            ? `1px solid ${theme.palette.grey[350]}`
            : `1px solid ${theme.palette.grey[150]}`,
      },
      '&:hover fieldset': {
        border:
          theme.palette.mode === 'light'
            ? `1px solid ${theme.palette.grey[350]}`
            : `1px solid ${theme.palette.grey[150]}`,
      },
    },

    '.MuiSelect-select': {
      // outline: '1px solid red',
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
