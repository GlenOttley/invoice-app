import { styled, Container, ContainerProps } from '@mui/material'

interface CustomContainerProps extends ContainerProps {
  version: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const CustomContainer = styled(Container)<CustomContainerProps>(
  ({ version, theme }) => ({
    ...(version === 'xs' && {
      '&.MuiContainer-root': {
        padding: theme.spacing(3, 3),
        [theme.breakpoints.up('sm')]: {
          padding: theme.spacing(2, 3),
        },
        [theme.breakpoints.up('md')]: {
          padding: theme.spacing(2, 4),
        },
      },
    }),
    ...(version === 'sm' && {
      '&.MuiContainer-root': {
        padding: theme.spacing(3, 3),
        [theme.breakpoints.up('sm')]: {
          padding: theme.spacing(3, 4),
        },
      },
    }),
    ...(version === 'md' && {
      '&.MuiContainer-root': {
        padding: theme.spacing(3, 3),
        [theme.breakpoints.up('sm')]: {
          padding: theme.spacing(4, 4),
        },
      },
    }),
    ...(version === 'lg' && {
      '&.MuiContainer-root': {
        padding: theme.spacing(3, 3),
        [theme.breakpoints.up('sm')]: {
          padding: theme.spacing(4, 4),
        },
        [theme.breakpoints.up('md')]: {
          padding: theme.spacing(6, 6),
        },
      },
    }),
    ...(version === 'xl' && {
      '&.MuiContainer-root': {
        padding: theme.spacing(13, 3, 8, 3),
        [theme.breakpoints.up('md')]: {
          boxSizing: 'content-box',
          maxWidth: '672px',
          padding: theme.spacing(15, 6, 8, 6),
        },
        [theme.breakpoints.up('lg')]: {
          maxWidth: '730px',
          padding: theme.spacing(8, 6, 8, 6),
        },
      },
    }),
  })
)

export default CustomContainer
