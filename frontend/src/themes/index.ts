import { createTheme, PaletteMode, PaletteColorOptions } from '@mui/material'
import { breakpoints } from './breakpoints'
import { components } from './components'
import { paletteLight, paletteDark } from './palette'
import { typography } from './typography'

declare module '@mui/material/styles' {
  interface Theme {
    palette: {
      mode: PaletteMode
      primary: {
        purple: string
        purpleLight: string
        green: string
        orange: string
      }
      grey: {
        50: string
        100: string
        150: string
        200: string
        250: string
        300: string
        350: string
        400: string
        450: string
      }
    }
  }
}

let lightTheme = createTheme({
  breakpoints: breakpoints,
  components: components,
  palette: paletteLight,
  typography: typography,
})

let darkTheme = createTheme({
  breakpoints: breakpoints,
  components: components,
  palette: paletteDark,
  typography: typography,
})

export { lightTheme, darkTheme }
