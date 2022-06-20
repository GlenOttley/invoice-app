import { styled, Button, ButtonProps } from '@mui/material'

interface ICustomButtonProps extends ButtonProps {
  version: 'purple' | 'grey' | 'slate' | 'peach'
}

const CustomButton = styled(Button)<ICustomButtonProps>(
  ({ version, theme }) => ({
    ...(version === 'purple' && {
      color: 'white',
      backgroundColor: theme.palette.primary.purple,
      '&:hover': {
        backgroundColor: theme.palette.primary.purpleLight,
      },
    }),
    ...(version === 'grey' && {
      color: theme.palette.grey[250],
      backgroundColor: theme.palette.grey[450],
      '&:hover': {
        backgroundColor: theme.palette.grey[350],
      },
    }),
    ...(version === 'slate' && {
      color: theme.palette.grey[300],
      backgroundColor: theme.palette.grey[200],
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
      },
    }),
    ...(version === 'peach' && {
      color: 'white',
      backgroundColor: theme.palette.primary.peach,
      '&:hover': {
        backgroundColor: theme.palette.primary.peachLight,
      },
    }),
  })
)

export default CustomButton
