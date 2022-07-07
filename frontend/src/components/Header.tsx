import {
  alpha,
  Box,
  PaletteMode,
  useTheme,
  Menu,
  MenuItem,
  IconButton,
} from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import React, { SetStateAction, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { selectUser, clearUser } from '../features/user/userSlice'
import HomeButton from './HomeButton'
import { clearInvoices } from '../features/invoices/invoicesSlice'
import { clearFilters } from '../features/filters/filtersSlice'
import Image from 'mui-image'

interface IHeaderProps {
  mode: PaletteMode
  setMode: React.Dispatch<SetStateAction<PaletteMode>>
}

const Header = ({ mode, setMode }: IHeaderProps): JSX.Element => {
  const theme = useTheme()
  const user = useAppSelector(selectUser)
  const dispatch = useAppDispatch()
  const { userInfo } = user

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    dispatch(clearUser())
    dispatch(clearInvoices())
    dispatch(clearFilters())
    handleMenuClose()
  }

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
            <>
              <IconButton
                id='user-button'
                onClick={handleMenuOpen}
                aria-controls={open ? 'user-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
              >
                {userInfo.image ? (
                  <Image
                    src={userInfo.image}
                    alt={`${userInfo.name}'s avatar`}
                    style={{
                      borderRadius: '50%',
                      width: '32px',
                      height: '32px',
                    }}
                  />
                ) : (
                  <PersonIcon sx={{ color: 'grey.250', fontSize: '32px' }} />
                )}
              </IconButton>

              <Menu
                id='user-menu'
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                MenuListProps={{
                  'aria-labelledby': 'user-button',
                }}
              >
                <Link to='/profile'>
                  <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                </Link>
                <Link to='/'>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Link>
              </Menu>
            </>
          ) : (
            <>
              <IconButton
                id='login-button'
                onClick={handleMenuOpen}
                aria-controls={open ? 'login-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
              >
                <PersonIcon sx={{ color: 'grey.250', fontSize: '32px' }} />
              </IconButton>
              <Menu
                id='login-menu'
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                MenuListProps={{
                  'aria-labelledby': 'login-button',
                }}
              >
                <Link to='/signup'>
                  <MenuItem onClick={handleMenuClose}>Sign Up</MenuItem>
                </Link>
                <Link to='/login'>
                  <MenuItem onClick={handleMenuClose}>Login</MenuItem>
                </Link>
              </Menu>
            </>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default Header
