import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress'
import { styled } from '@mui/material/styles'
import { Grid } from '@mui/material'

// styles
const StyledCircularProgress = styled(CircularProgress)<CircularProgressProps>(
  ({ theme }) => ({
    color: '#7c5dfa',
  })
)

const Loader = (): JSX.Element => {
  return (
    <Grid container justifyContent='center'>
      <StyledCircularProgress size={80} />
    </Grid>
  )
}

export default Loader
