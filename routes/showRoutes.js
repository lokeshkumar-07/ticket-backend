import express from 'express'
import { allShows, allShowsNoFilter, createShow, getShow } from '../controllers/Show.js'
import { verifyAdmin, verifyUser } from '../middleware/verifyUser.js'

const showRoutes = express.Router()

showRoutes.post('/create', verifyUser, createShow)
showRoutes.get('/allshows', allShows)
showRoutes.get('/allshows_nofilter', verifyUser, allShowsNoFilter)
showRoutes.get('/get/:showId', verifyUser, getShow)

export default showRoutes