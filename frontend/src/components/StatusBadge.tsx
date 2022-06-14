import { styled, Box, BoxProps, alpha } from '@mui/material'

interface IStatusBadgeProps extends BoxProps {
  variant: 'draft' | 'pending' | 'paid'
}

export const StatusBadge = styled(Box)<IStatusBadgeProps>(
  ({ variant, theme }) => ({
    padding: '13px 0',
    borderRadius: '6px',
    textTransform: 'capitalize',
    width: '104px',
    textAlign: 'center',
    fontSize: '1.2rem',
    fontWeight: 600,
    lineHeight: '1.5rem',
    letterSpacing: '0.25px',
    ...(variant === 'draft' && {
      backgroundColor: alpha(theme.palette.grey[100], 0.1),
      color: theme.palette.grey[100],
    }),
    ...(variant === 'pending' && {
      backgroundColor: alpha(theme.palette.primary.orange, 0.1),
      color: theme.palette.primary.orange,
    }),
    ...(variant === 'paid' && {
      backgroundColor: alpha(theme.palette.primary.green, 0.1),
      color: theme.palette.primary.green,
    }),
  })
)
