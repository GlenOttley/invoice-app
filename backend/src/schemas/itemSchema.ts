import { Schema } from 'mongoose'
import IItem from '../interfaces/itemInterface'

const itemSchema: Schema<IItem> = new Schema({
  name: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  price: {
    type: Number,
  },
  total: {
    type: Number,
  },
})

export default itemSchema
