import express from 'express'
import { allMovies, createMovie, deleteMovie, getMovie } from '../controllers/Movies.js'
import { verifyAdmin, verifyUser } from '../middleware/verifyUser.js'

const movieRoutes = express.Router()

movieRoutes.post('/create', verifyUser, createMovie)
movieRoutes.get('/all', allMovies)
movieRoutes.get('/get/:movie', getMovie)
movieRoutes.delete('/delete/:id', verifyUser, deleteMovie)

export default movieRoutes