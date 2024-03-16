import express from 'express'
import { verifyUser } from '../middleware/verifyUser.js'
import { createBooking, myBookings } from '../controllers/bookings.js'

const bookingRouter = express.Router()

bookingRouter.post('/create', verifyUser, createBooking)
bookingRouter.get('/my', verifyUser, myBookings)

export default bookingRouter