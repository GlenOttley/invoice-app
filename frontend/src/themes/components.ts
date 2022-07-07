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
  MuiIconButton: {
    styleOverrides: {
      root: {
        padding: 0,
        '&:hover': {
          backgroundColor: 'transparent',
        },
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
  MuiPaper: {
    styleOverrides: {
      root: {
        // boxShadow: '0 10px 20px 0 rgba(72, 84, 159, 0.25)',
      },
    },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: {
        fontWeight: '600',
        padding: '16px 24px',

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
