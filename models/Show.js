import mongoose from "mongoose";

const showSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    movieName: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    theatre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Theatre",
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    seats: []
    
},
{timestamps: true})

const Show = mongoose.model('Show', showSchema)

export default Show