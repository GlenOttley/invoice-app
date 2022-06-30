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
  MuiInputLabel: {
    styleOverrides: {
      root: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        left: '-13px',
      },
    },
  },
  MuiList: {
    styleOverrides: {
      root: {
        padding: '0px',
      },
    },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: {
        fontWeight: '600',
        paddingTop: '4px',
        paddingBottom: '4px',
        '&:hover': {
          color: '#7c5dfa',
          backgroundColor: 'transparent',
        },
        '&.Mui-selected, &.Mui-selected:hover': {
          backgroundColor: 'transparent',
        },
        '&:not(:last-child)': {
          borderBottom: '1px solid #DFE3FA',
        },
      },
    },
  },
}
