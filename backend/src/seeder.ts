import dotenv from 'dotenv'
import users from './data/userData'
import invoices from './data/invoiceData'
import User from './models/userModel'
import Invoice from './models/invoiceModel'
import connectDB from './config/db'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await User.deleteMany()
    await Invoice.deleteMany()

    await User.insertMany(users)
    await Invoice.insertMany(invoices)

    console.log('Data imported!')
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await User.deleteMany()
    await Invoice.deleteMany()

    console.log('Data destroyed!')
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
