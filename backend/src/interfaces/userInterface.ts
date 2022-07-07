import IAddress from './addressInterface'

export default interface IUser {
  _id: string
  name: string
  email: string
  address: IAddress
  password: string
  image: string
  invoices: string[]
}
