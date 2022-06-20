import express from 'express'
import {
  getInvoices,
  getInvoiceById,
  getMyInvoices,
  createInvoice,
  updateInvoice,
  deleteInvoice,
} from '../controllers/invoiceController'
import { protect } from '../middleware/authMiddleware'

const router = express.Router()

router.route('/').get(getInvoices).post(protect, createInvoice)

router.route('/myinvoices').get(protect, getMyInvoices)

router
  .route('/:id')
  .get(protect, getInvoiceById)
  .put(protect, updateInvoice)
  .delete(protect, deleteInvoice)

export default router
