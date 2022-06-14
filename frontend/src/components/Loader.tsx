import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress'
import { styled } from '@mui/material/styles'

// styles
const StyledCircularProgress = styled(CircularProgress)<CircularProgressProps>(
  ({ theme }) => ({
    color: '#7c5dfa',
  })
)

const Loader = (): JSX.Element => {
  return <StyledCircularProgress />
}

export default Loader
