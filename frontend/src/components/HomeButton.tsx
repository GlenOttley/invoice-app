import { Box, Grid, useTheme } from '@mui/material'

const HomeButton = (): JSX.Element => {
  const theme = useTheme()
  return (
    <Grid
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        padding: '0',
        borderRadius: '0 20px 20px 0',
        overflow: 'hidden',
        height: '72px',
        width: '72px',
        backgroundColor: theme.palette.primary.purple,
        [theme.breakpoints.up('md')]: {
          height: '80px',
          width: '80px',
        },
        [theme.breakpoints.up('lg')]: {
          height: '103px',
          width: '103px',
        },
        '&::after': {
          display: 'inline-block',
          position: 'absolute',
          content: '""',
          backgroundColor: theme.palette.primary.purpleLight,
          borderRadius: '20px 0 20px 0',
          height: '36px',
          width: '72px',
          [theme.breakpoints.up('md')]: {
            height: '40px',
            width: '80px',
          },
          [theme.breakpoints.up('lg')]: {
            height: '56.5px',
            width: '103px',
          },
        },
      }}
    >
      <Grid
        item
        alignSelf='center'
        sx={{
          height: '27px',
          width: '27px',
          [theme.breakpoints.up('md')]: {
            height: '31px',
            width: '31px',
          },
          [theme.breakpoints.up('lg')]: {
            height: '40px',
            width: '40px',
          },
        }}
      >
        <img
          src='/assets/icons/logo.svg'
          alt='Awesome Invoice App'
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            zIndex: '2',
          }}
        />
      </Grid>
    </Grid>
  )
}

export default HomeButton
