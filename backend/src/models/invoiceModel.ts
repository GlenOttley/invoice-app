import { Schema, model, Document } from 'mongoose'
import clientSchema from '../schemas/clientSchema'
import itemSchema from '../schemas/itemSchema'
import IInvoice from '../interfaces/invoiceInterface'

const invoiceSchema = new Schema({
  _id: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  paymentTerms: {
    type: Number,
  },
  paymentDue: {
    type: Date,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
  },
  client: clientSchema,
  sender: {
    type: String,
    ref: 'User',
  },
  items: [itemSchema],
  total: {
    type: Number,
  },
})

export interface SavedInvoiceDocument extends IInvoice, Omit<Document, '_id'> {}

export default model<SavedInvoiceDocument>('Invoice', invoiceSchema)
