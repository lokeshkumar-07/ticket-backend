import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import fileUpload from "express-fileupload";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import theatreRoutes from "./routes/theatreRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
import showRoutes from "./routes/showRoutes.js";
import bookingRouter from "./routes/bookingRouotes.js";
import paymentRouter from "./routes/paymentRoutes.js";


const app = express()
dotenv.config()

const PORT = process.env.PORT || 3001
const MONGO_URL = process.env.MONGO_URL

app.use(express.json())
app.use(cors())
app.use(express.json({ limit: "100mb" })); app.use(express.urlencoded({ limit: "100mb", extended: true }))
app.use(fileUpload())

app.use('/api/auth', userRoutes)
app.use('/api/theatre', theatreRoutes)
app.use('/api/movie', movieRoutes)
app.use('/api/shows', showRoutes)
app.use('/api/bookings', bookingRouter)
app.use('/api/payment', paymentRouter)

app.use((err,req,res,next) => {
    const errStatus = err.status || 500
    const errMessage = err.message || 'Something went wrong!'
    
    res.status(errStatus).json({
        status: errStatus,
        success: false,
        message: errMessage,
        stack: err.stack
    })
})

mongoose.connect(MONGO_URL, {
})
.then(() => {
    app.listen(PORT, () => console.log(`Server Running on port: ${PORT}`))
})
