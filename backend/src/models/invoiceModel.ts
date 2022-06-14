import mongoose, { Schema } from 'mongoose'
import { IInvoiceDB } from '../interfaces/invoiceInterface'
import clientSchema from '../schemas/clientSchema'
import itemSchema from '../schemas/itemSchema'

const invoiceSchema: Schema<IInvoiceDB> = new Schema({
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

export default mongoose.model<IInvoiceDB>('Invoice', invoiceSchema)
