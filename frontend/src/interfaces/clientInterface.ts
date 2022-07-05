import IUser from './userInterface'

// export default interface IClient
//   extends Omit<IUser, '_id' | 'password' | 'invoices'> {}

export default interface IClient
  extends Omit<IUser, 'image' | 'password' | 'invoices'> {
  // fieldName?: string
}
