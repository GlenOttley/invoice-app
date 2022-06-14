export const components = {
  MuiTypography: {
    defaultProps: {
      variantMapping: {
        subtitle1: 'span',
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        padding: '15px 25px',
        borderRadius: '24px',
      },
    },
  },
  // MuiList: {
  //   styleOverrides: {
  //     root: {
  //       padding: '4px 10px',
  //     },
  //   },
  // },
  MuiMenuItem: {
    styleOverrides: {
      root: {
        paddingTop: '4px',
        paddingBottom: '4px',
      },
    },
  },
}
