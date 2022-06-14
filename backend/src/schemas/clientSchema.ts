import { Schema } from 'mongoose'
import addressSchema from './addressSchema'
import IClient from '../interfaces/clientInterface'

const clientSchema: Schema<IClient> = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  address: addressSchema,
})

export default clientSchema
