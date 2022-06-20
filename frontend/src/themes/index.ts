import { PaletteMode } from '@mui/material'
import { breakpoints } from './breakpoints'
import { components } from './components'
import { paletteLight, paletteDark } from './palette'
import { typography } from './typography'

declare module '@mui/material/styles' {
  interface Theme {
    palette: {
      mode: PaletteMode
      shadows: {
        1: string
      }
      primary: {
        main: string
        purple: string
        purpleLight: string
        green: string
        orange: string
        peach: string
        peachLight: string
      }
      text: {
        primary: string
        secondary: string
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

const getDesignTokens = (mode: PaletteMode) => ({
  breakpoints,
  components,
  typography,
  palette: {
    mode,
    ...(mode === 'light' ? paletteLight : paletteDark),
  },
})

export { getDesignTokens }
