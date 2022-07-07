import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  useTheme,
  Grid,
  Typography,
  Dialog,
  DialogActions,
  Drawer,
} from '@mui/material'
import {
  selectInvoice,
  updateInvoice,
  deleteInvoice,
} from '../features/invoices/invoiceSlice'
import CustomButton from './CustomButton'
import CustomContainer from './CustomContainer'

import InvoiceEditForm from './InvoiceEditForm'

const InvoiceActions = (): JSX.Element => {
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const select = useAppSelector
  const navigate = useNavigate()

  const invoiceState = select(selectInvoice)
  const { invoice } = invoiceState

  const [showEditForm, setShowEditForm] = useState<boolean>(false)

  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false)

  const handleDelete = () => {
    setShowDeleteDialog(false)
    dispatch(deleteInvoice(invoice._id))
    navigate('/')
  }

  const handleStatusChange = () => {
    dispatch(
      updateInvoice({
        ...invoice,
        status: invoice.status === 'paid' ? 'pending' : 'paid',
      })
    )
  }

  return (
    <>
      <Grid item>
        <CustomButton version='grey' onClick={() => setShowEditForm(true)}>
          Edit
        </CustomButton>
      </Grid>
      <Grid item>
        <CustomButton version='peach' onClick={() => setShowDeleteDialog(true)}>
          Delete
        </CustomButton>
      </Grid>
      <Grid item>
        {invoice.status !== 'draft' && (
          <CustomButton version='purple' onClick={handleStatusChange}>
            {invoice.status === 'paid' ? 'Mark as Pending' : 'Mark as Paid'}
          </CustomButton>
        )}
      </Grid>
      <Dialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
      >
        <CustomContainer
          version='lg'
          sx={{
            backgroundColor:
              theme.palette.mode === 'light'
                ? 'white'
                : theme.palette.grey[100],
          }}
        >
          <Typography variant='h2' marginBottom={1}>
            Cofirm Deletion
          </Typography>

          <Typography
            variant='body1'
            color='grey.300'
            lineHeight={2}
            marginBottom={3}
          >
            Are you sure you want to delete invoice #{invoice._id} This action
            cannot be undone.
          </Typography>

          <DialogActions>
            <CustomButton
              version='grey'
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancel
            </CustomButton>
            <CustomButton version='peach' onClick={handleDelete}>
              Delete
            </CustomButton>
          </DialogActions>
        </CustomContainer>
      </Dialog>

      <Drawer
        open={showEditForm}
        onClose={() => setShowEditForm(false)}
        anchor='left'
        sx={{
          [`& .MuiDrawer-paper`]: {
            top: theme.variables.header.offset.xs,
            height: 'calc(100% - 72px)',
            width: '100%',
            boxSizing: 'border-box',
            [theme.breakpoints.up('md')]: {
              borderTopRightRadius: '20px',
              borderBottomRightRadius: '20px',
              top: theme.variables.header.offset.md,
              width: '616px',
            },
            [theme.breakpoints.up('lg')]: {
              top: 0,
              height: '100%',
              width: `calc(616px + ${theme.variables.header.offset.lg})`,
            },
          },
        }}
      >
        <InvoiceEditForm setShowEditForm={setShowEditForm} />
      </Drawer>
    </>
  )
}

export default InvoiceActions
