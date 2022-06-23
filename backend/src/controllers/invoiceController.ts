import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import Invoice from '../models/invoiceModel'
import { IInvoiceDB } from '../interfaces/invoiceInterface'
import generateID from '../utils/generateID'

// @desc    Fetch all invoices
// @route   GET /api/invoices
// @access  Private / Admin
const getInvoices = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const invoices: IInvoiceDB[] = await Invoice.find({})
    if (invoices.length > 0) {
      res.status(200).json(invoices)
    } else {
      res.status(404)
      throw new Error('No invoices found')
    }
  }
)

// @desc Get invoice by ID
// @route GET /api/invoice/:id
// @access Private
const getInvoiceById = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const invoice: IInvoiceDB | null = await Invoice.findById(req.params.id)

    if (invoice) {
      res.status(200).json(invoice)
    } else {
      res.status(404)
      throw new Error('Invoice not found')
    }
  }
)

// @desc    Get logged in users invoices
// @route   GET /api/invoices/myinvoices
// @access  Private
const getMyInvoices = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const invoices: IInvoiceDB[] = await Invoice.find({
      sender: req.user._id,
    })
    res.status(200).json(invoices)
  }
)

// @desc Create new invoice
// @route POST /api/invoices/new
// @access Private
const createInvoice = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const {
      createdAt,
      paymentTerms,
      paymentDue,
      description,
      status,
      client,
      items,
      total,
    } = req.body

    const invoice: IInvoiceDB = new Invoice({
      _id: generateID(),
      createdAt,
      paymentTerms,
      paymentDue,
      description,
      status,
      client,
      sender: req.user._id,
      items,
      total,
    })

    const createdInvoice = await invoice.save()
    res.status(201).json(createdInvoice)
  }
)

// @desc Update an invoice
// @route PUT /api/invoices/:id
// @access Private

const updateInvoice = asyncHandler(async (req: Request, res: Response) => {
  const {
    createdAt,
    paymentTerms,
    paymentDue,
    description,
    status,
    client,
    items,
    total,
  } = req.body

  const invoice = await Invoice.findById(req.params.id)

  if (invoice) {
    invoice.createdAt = createdAt
    invoice.paymentTerms = paymentTerms
    invoice.paymentDue = paymentDue
    invoice.description = description
    invoice.status = status
    invoice.client = client
    invoice.items = items
    invoice.total = total

    const updatedInvoice = await invoice.save()
    res.json(updatedInvoice)
  } else {
    res.status(404)
    throw new Error('Invoice not found')
  }
})

// @desc Delete an invoice
// @route DELETE /api/invoices/:id
// @access Private
const deleteInvoice = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    Invoice.findByIdAndDelete(req.params.id, (err: Error, docs: IInvoiceDB) => {
      if (err) {
        res.status(500).json(err)
      } else {
        res.status(200).json(`Invoice with id: ${docs._id} has been deleted`)
      }
    })
  }
)

export {
  getInvoices,
  getInvoiceById,
  getMyInvoices,
  createInvoice,
  updateInvoice,
  deleteInvoice,
}
