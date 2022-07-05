import { styled, Card, CardProps } from '@mui/material'

const CustomCard = styled(Card)<CardProps>(({ theme }) => ({
  '&.MuiCard-root': {
    boxShadow: '0 10px 10px -10px rgba(72, 84, 159, 0.10)',
    borderRadius: '8px',
  },
}))

export default CustomCard
