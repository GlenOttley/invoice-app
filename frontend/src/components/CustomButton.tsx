import { styled, Button, ButtonProps } from '@mui/material'

interface ICustomButtonProps extends ButtonProps {
  version: 'purple' | 'peach' | 'grey' | 'slate' | 'dark'
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
    ...(version === 'peach' && {
      color: 'white',
      backgroundColor: theme.palette.primary.peach,
      '&:hover': {
        backgroundColor: theme.palette.primary.peachLight,
      },
    }),
    ...(version === 'grey' && {
      color: theme.palette.grey[250],
      backgroundColor: theme.palette.grey[450],
      '&:hover': {
        backgroundColor:
          theme.palette.mode === 'light' ? theme.palette.grey[350] : 'white',
      },
    }),
    ...(version === 'slate' && {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[250]
          : theme.palette.grey[350],
      backgroundColor:
        theme.palette.mode === 'light'
          ? theme.palette.grey[450]
          : theme.palette.grey[150],
      '&:hover': {
        backgroundColor:
          theme.palette.mode === 'light'
            ? theme.palette.grey[350]
            : theme.palette.grey[100],
      },
    }),
    ...(version === 'dark' && {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[300]
          : theme.palette.grey[350],
      backgroundColor: theme.palette.grey[200],
      '&:hover': {
        backgroundColor:
          theme.palette.mode === 'light'
            ? theme.palette.grey[0]
            : theme.palette.grey[100],
      },
    }),
  })
)

export default CustomButton
