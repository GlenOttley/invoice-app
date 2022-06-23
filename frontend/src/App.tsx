import { useState, useMemo } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import InvoicesScreen from './screens/InvoicesScreen'
import InvoiceScreen from './screens/InvoiceScreen'
import LoginScreen from './screens/LoginScreen'
import ProfileScreen from './screens/ProfileScreen'
import {
  ThemeProvider,
  CssBaseline,
  PaletteMode,
  createTheme,
  Box,
} from '@mui/material'
import { getDesignTokens } from './themes'
import CustomContainer from './components/CustomContainer'

const App = (): JSX.Element => {
  const [mode, setMode] = useState<PaletteMode>('light')
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Router>
          <Box
            sx={{
              [theme.breakpoints.up('lg')]: {
                display: 'flex',
                flexDirection: 'row',
              },
            }}
          >
            <Header mode={mode} setMode={setMode} />
            <CustomContainer version='xl'>
              <Routes>
                <Route path='/' element={<InvoicesScreen />} />
                <Route path='/login' element={<LoginScreen />} />
                <Route path='/profile' element={<ProfileScreen />} />
                <Route path='/invoice'>
                  <Route path=':id' element={<InvoiceScreen />} />
                </Route>
              </Routes>
            </CustomContainer>
          </Box>
        </Router>
      </CssBaseline>
    </ThemeProvider>
  )
}

export default App
