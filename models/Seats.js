import mongoose from "mongoose";

const seatsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    showId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shows',
        required: true,
    },
    
    
},
{timestamps: true})

const Seats = mongoose.model('Seats', seatsSchema)

export default Seats