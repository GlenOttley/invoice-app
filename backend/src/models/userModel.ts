import { Schema, model, Document } from 'mongoose'
import bcrypt from 'bcryptjs'
import addressSchema from '../schemas/addressSchema'
import IUser from '../interfaces/userInterface'

const userSchema = new Schema({
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

// model middleware for hashing passwords
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

export interface SavedUserDocument extends Omit<IUser, '_id'>, Document {
  matchPassword(enteredPassword: string): boolean
}

export default model<SavedUserDocument>('User', userSchema)
