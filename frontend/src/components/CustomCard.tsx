import { styled, Card, CardProps } from '@mui/material'

const CustomCard = styled(Card)<CardProps>(({ theme }) => ({
  '&.MuiCard-root': {
    boxShadow: 'rgba(0, 0, 0, 0.04) 0px 3px 5px;',
    borderRadius: '8px',
  },
}))

export default CustomCard
