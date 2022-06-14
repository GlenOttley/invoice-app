declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true
    sm: true
    md: true
    lg: true
    xl: false
  }
}

export const breakpoints = {
  values: {
    xs: 576,
    sm: 768,
    md: 992,
    lg: 1200,
  },
}
