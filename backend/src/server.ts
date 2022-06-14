import express, { Application, Request, Response, NextFunction } from 'express'
import { notFound, errorHandler } from './middleware/errorMiddleware'
import invoiceRoutes from './routes/invoiceRoutes'
import userRoutes from './routes/userRoutes'
import connectDB from './config/db'
import dotenv from 'dotenv'
import morgan from 'morgan'

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

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
