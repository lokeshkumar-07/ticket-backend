import express from 'express'
import { allTheatre, createTheatre } from '../controllers/theatre.js'
import { verifyAdmin, verifyUser } from '../middleware/verifyUser.js'

const theatreRoutes = express.Router()

theatreRoutes.post('/create', verifyUser,  createTheatre)
theatreRoutes.get('/all', verifyUser, allTheatre)

export default theatreRoutes