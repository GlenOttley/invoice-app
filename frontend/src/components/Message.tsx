import { Alert } from '@mui/material'

interface IMessageProps {
  severity: 'error' | 'warning' | 'info' | 'success'
  children: string
}

const Message = ({ severity, children }: IMessageProps): JSX.Element => {
  return (
    <Alert severity={severity} sx={{ margin: '32px 0' }}>
      {children}
    </Alert>
  )
}

export default Message
