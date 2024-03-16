import express from 'express'
import { googleSignIn, loginUser, registerUser } from '../controllers/User.js'

const userRoutes = express.Router()

userRoutes.post('/login', loginUser)
userRoutes.post('/register', registerUser )
userRoutes.post('/googlelogin', googleSignIn)

export default userRoutes