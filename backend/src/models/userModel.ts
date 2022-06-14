import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcryptjs'
import { IUserDB } from '../interfaces/userInterface'
import addressSchema from '../schemas/addressSchema'

const userSchema: Schema<IUserDB> = new Schema({
  _id: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  address: addressSchema,
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  invoices: [
    {
      type: String,
      ref: 'Invoice',
    },
  ],
})

userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password)
}

export default mongoose.model<IUserDB>('User', userSchema)
