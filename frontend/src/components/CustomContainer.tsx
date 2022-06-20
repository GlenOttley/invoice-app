import { styled, Container, ContainerProps } from '@mui/material'

interface CustomContainerProps extends ContainerProps {
  version: 'outer' | 'inner' | 'inner--small'
}

const CustomContainer = styled(Container)<CustomContainerProps>(
  ({ version, theme }) => ({
    ...(version === 'outer' && {
      '&.MuiContainer-root': {
        maxWidth: '730px',
        padding: theme.spacing(4, 3),
        [theme.breakpoints.up('md')]: {
          padding: theme.spacing(8, 6),
        },
      },
    }),
    ...(version === 'inner' && {
      '&.MuiContainer-root': {
        padding: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
          padding: theme.spacing(4),
        },
        // [theme.breakpoints.up('lg')]: {
        //   padding: '48px',
        // },
      },
    }),
    ...(version === 'inner--small' && {
      '&.MuiContainer-root': {
        padding: theme.spacing(2, 3),
      },
    }),
  })
)

export default CustomContainer
