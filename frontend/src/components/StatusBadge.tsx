import CircleIcon from '@mui/icons-material/Circle'
import { alpha, Box, BoxProps, styled } from '@mui/material'

interface IStatusBadgeProps extends BoxProps {
  variant: 'draft' | 'pending' | 'paid'
}

const StyledStatusBadge = styled(Box)<IStatusBadgeProps>(
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
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[200]
          : theme.palette.grey[350],
      backgroundColor: alpha(
        theme.palette.grey[200],
        theme.palette.mode === 'light' ? 0.1 : 0.4
      ),
    }),
    ...(variant === 'pending' && {
      color: theme.palette.primary.orange,
      backgroundColor: alpha(theme.palette.primary.orange, 0.1),
    }),
    ...(variant === 'paid' && {
      color: theme.palette.primary.green,
      backgroundColor: alpha(theme.palette.primary.green, 0.1),
    }),
  })
)

const StatusBadge = ({ variant, children }: IStatusBadgeProps): JSX.Element => {
  return (
    <StyledStatusBadge variant={variant}>
      <CircleIcon
        sx={{
          fontSize: '9px',
          marginRight: '8px',
          transform: 'translateY(1px)',
        }}
      />
      {children}
    </StyledStatusBadge>
  )
}

export default StatusBadge
