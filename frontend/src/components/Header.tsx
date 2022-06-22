import React, { SetStateAction } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import { selectUser } from '../features/user/userSlice'
import { Box, useTheme, PaletteMode, alpha } from '@mui/material'
import HomeButton from './HomeButton'

interface IHeaderProps {
  mode: PaletteMode
  setMode: React.Dispatch<SetStateAction<PaletteMode>>
}

const Header = ({ mode, setMode }: IHeaderProps): JSX.Element => {
  const theme = useTheme()
  const user = useAppSelector(selectUser)
  const { userInfo } = user

  return (
    <Box
      className='header'
      sx={{
        zIndex: theme.zIndex.drawer + 1,
        position: 'fixed',
        width: '100%',
        backgroundColor:
          theme.palette.mode === 'light' ? 'grey.200' : 'grey.100',
        [theme.breakpoints.up('lg')]: {
          borderTopRightRadius: '20px',
          width: 'auto',
        },
      }}
    >
      <Box
        className='row'
        sx={{
          [theme.breakpoints.up('lg')]: {
            flexDirection: 'column',
            height: '100vh',
          },
        }}
      >
        <Link to='/'>
          <HomeButton />
        </Link>

        <Box
          className='col'
          sx={{
            display: 'flex',
            alignSelf: 'stretch',
            justifyContent: 'space-between',
            gap: '27px',
            padding: '0 27px',
            [theme.breakpoints.up('lg')]: {
              flexDirection: 'column',
              padding: '24px 0',
            },
          }}
        >
          <button
            className='theme-button'
            onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
          >
            <img
              src={`/assets/icons/${
                theme.palette.mode === 'light' ? 'moon' : 'sun'
              }.svg`}
              alt=''
            />
          </button>
          <Box
            sx={{
              width: '1px',
              backgroundColor: alpha(theme.palette.grey[250], 0.3),
              [theme.breakpoints.up('lg')]: {
                width: '100%',
                height: '1px',
              },
            }}
          ></Box>
          {userInfo ? (
            <button className='user-button'>
              <Link to='/profile'>
                <img src={userInfo.image} alt='' />
              </Link>
            </button>
          ) : (
            <button className='login-button'>
              <Link to='/login'>
                <i className='fas fa-user'></i>
              </Link>
            </button>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default Header
