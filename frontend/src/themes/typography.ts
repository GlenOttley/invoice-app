export const typography = {
  fontFamily: ['League Spartan', 'sans-serif'].join(','),
  htmlFontSize: 10,
  h1: {
    fontSize: '3.2rem',
    fontWeight: 600,
    lineHeight: '3.6rem',
    letterSpacing: '1px',
    '@media (max-width: 576px)': {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: '2.2rem',
      letterSpacing: '0.63px',
    },
  },
  h2: {
    fontSize: '2rem',
    fontWeight: 600,
    lineHeight: '2.2rem',
    letterSpacing: '0.63px',
  },
  h3: {
    fontSize: '1.6rem',
    fontWeight: 600,
    lineHeight: '2.4rem',
    letterSpacing: '0.8px',
  },
  h4: {
    fontSize: '1.2rem',
    fontWeight: 600,
    lineHeight: '1.5rem',
    letterSpacing: '0.25px',
  },
  body1: {
    fontSize: '1.2rem',
    fontWeight: 300,
    lineHeight: '1.5rem',
    letterSpacing: '0.25px',
  },
  body2: {
    fontSize: '1.1rem',
    fontWeight: 300,
    lineHeight: '1.8rem',
    letterSpacing: '0.23px',
  },
  button: {
    fontSize: '1.2rem',
    fontWeight: 600,
    lineHeight: '1.8rem',
    letterSpacing: '0.25px',
    textTransform: 'none' as const,
  },
}
