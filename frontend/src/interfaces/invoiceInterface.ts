import IItem from './itemInterface'
import IClient from './clientInterface'

export default interface IInvoice {
  _id: string
  createdAt: Date
  paymentTerms: number
  paymentDue: Date
  description: string
  status: 'paid' | 'pending' | 'draft'
  client: IClient
  sender: string
  items: IItem[]
  total: number
}
