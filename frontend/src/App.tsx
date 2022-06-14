import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import InvoicesScreen from './screens/InvoicesScreen'
import LoginScreen from './screens/LoginScreen'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { lightTheme, darkTheme } from './themes'

const App = (): JSX.Element => {
  const [darkMode, setDarkmode] = useState(false)
  const theme = darkMode ? darkTheme : lightTheme

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Router>
          <Header darkMode={darkMode} setDarkMode={setDarkmode} />
          <main>
            <Routes>
              <Route path='/' element={<InvoicesScreen />} />
              <Route path='/login' element={<LoginScreen />} />
            </Routes>
          </main>
        </Router>
      </CssBaseline>
    </ThemeProvider>
  )
}

export default App
