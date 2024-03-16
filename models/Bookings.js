import mongoose from "mongoose";

const bookingsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    show: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Show',
        required: true
    },
    seats: [],
    totalAmount: {
        type: String,
        required: true
    }
},
{timestamps: true})

const Bookings = mongoose.model('Bookings', bookingsSchema)

export default Bookings