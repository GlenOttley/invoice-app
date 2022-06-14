import React, { SetStateAction } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import { selectUser } from '../features/user/userSlice'
import { Box, useTheme } from '@mui/material'

interface IHeaderProps {
  darkMode: boolean
  setDarkMode: React.Dispatch<SetStateAction<boolean>>
}

const Header = ({ darkMode, setDarkMode }: IHeaderProps): JSX.Element => {
  const theme = useTheme()
  const user = useAppSelector(selectUser)
  const { userInfo } = user

  return (
    <Box
      className='header'
      sx={{
        backgroundColor:
          theme.palette.mode === 'light' ? 'grey.200' : 'grey.100',
      }}
    >
      <div className='row'>
        <Link to='/'>
          <button className='home-button'>
            <img src='/assets/icons/logo.svg' alt='' />
          </button>
        </Link>

        <div className='col'>
          <button
            className='theme-button'
            onClick={() => setDarkMode(!darkMode)}
          >
            <img
              src={`/assets/icons/${darkMode ? 'sun' : 'moon'}.svg`}
              alt=''
            />
          </button>
          <div className='divider'></div>
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
        </div>
      </div>
    </Box>
  )
}

export default Header
