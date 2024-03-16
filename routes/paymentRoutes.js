import express from 'express'
import { verifyUser } from '../middleware/verifyUser.js'
import { processPayment } from '../controllers/payments.js'

const paymentRouter = express.Router()

paymentRouter.post('/process', verifyUser, processPayment)

export default paymentRouter