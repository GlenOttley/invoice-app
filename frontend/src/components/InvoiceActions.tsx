import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material'
import CustomButton from './CustomButton'
import {
  selectInvoice,
  updateInvoice,
  deleteInvoice,
} from '../features/invoices/invoiceSlice'

const InvoiceActions = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const select = useAppSelector
  const navigate = useNavigate()

  const invoiceState = select(selectInvoice)
  const { invoice } = invoiceState

  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false)

  const handleDelete = () => {
    setShowDeleteDialog(false)
    dispatch(deleteInvoice(invoice._id))
    navigate('/')
  }

  const handleMarkPaid = () => {
    dispatch(
      updateInvoice({
        ...invoice,
        status: 'paid',
      })
    )
  }

  return (
    <>
      <Grid item>
        <CustomButton version='grey'>Edit</CustomButton>
      </Grid>
      <Grid item>
        <CustomButton version='peach' onClick={() => setShowDeleteDialog(true)}>
          Delete
        </CustomButton>
      </Grid>
      <Grid item>
        <CustomButton
          version='purple'
          disabled={invoice.status === 'paid'}
          onClick={handleMarkPaid}
        >
          Mark as Paid
        </CustomButton>
      </Grid>
      <Dialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
      >
        <DialogTitle>Delete Invoice #{invoice._id}?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This will permanently delete the invoice from your account.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDelete}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default InvoiceActions
