import { styled, TextField, TextFieldProps } from '@mui/material'

const CustomTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
  borderRadius: '50px',
  'label + &': {
    marginTop: '40px',
  },
  '& .MuiInputBase-input': {
    borderRadius: '4px',
    position: 'relative',
    // border: `1px solid ${theme.palette.grey.}`,
    fontSize: 16,
    width: 'auto',
    padding: '10px 12px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    // '&:focus': {
    //   boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
    //   borderColor: theme.palette.primary.main,
    // },
  },
}))

export default CustomTextField
