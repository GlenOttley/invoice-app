import { Schema } from 'mongoose'
import IAddress from '../interfaces/addressInterface'

const addressSchema: Schema<IAddress> = new Schema({
  street: {
    type: String,
  },
  city: {
    type: String,
  },
  postCode: {
    type: String,
  },
  country: {
    type: String,
  },
})

export default addressSchema
