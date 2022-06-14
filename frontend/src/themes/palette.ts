import { PaletteMode } from '@mui/material'

export const paletteLight = {
  mode: 'light' as PaletteMode,
  background: {
    default: '#f8f8fb',
    paper: '#ffff',
  },
  primary: {
    main: '#0c0e16',
    purple: '#7c5dfa',
    purpleLight: '#9277ff',
    peach: '#ec5757',
    peachLight: '#ff9797',
    green: '#33d69f',
    orange: '#ff8f00',
  },
  text: {
    primary: '#0c0e16',
    secondary: '#7e88c3',
  },
  grey: {
    50: '#141625',
    100: '#1e2139',
    150: '#252945',
    200: '#373b53',
    250: '#7e88c3',
    300: '#888eb0',
    350: '#dfe3fa',
    400: '#f8f8fb',
    450: '#f9fafe',
  },
}

export const paletteDark = {
  mode: 'dark' as PaletteMode,
  background: {
    ...paletteLight.background,
    default: '#141625',
    paper: '#1e2139',
  },
  primary: {
    ...paletteLight.primary,
    main: '#ffff',
  },
  text: {
    primary: '#ffff',
    secondary: '#dfe3fa',
  },
  grey: {
    ...paletteLight.grey,
    // 50: '#1e2139',
    // 100: '#dfe3fa',
    // 150: '#dfe3fa',
  },
}
