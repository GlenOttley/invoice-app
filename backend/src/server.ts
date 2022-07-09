import dotenv from 'dotenv'
import express, { Application, Request, Response } from 'express'
import morgan from 'morgan'
import connectDB from './config/db'
import { errorHandler, notFound } from './middleware/errorMiddleware'
import invoiceRoutes from './routes/invoiceRoutes'
import uploadRoutes from './routes/uploadRoutes'
import userRoutes from './routes/userRoutes'
import path from 'path'

dotenv.config({ path: __dirname + '/.env' })

const app: Application = express()
app.use(express.json())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

connectDB()

app.get('/', (req: Request, res: Response) => {
  res.json('API is running...')
})

app.use('/api/invoices', invoiceRoutes)
app.use('/api/users', userRoutes)
app.use('/api/upload', uploadRoutes)

// const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
