import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    language: {
        type: [String],
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    genre: [],
    release_year: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
    
},
{timestamps: true})

const Movie = mongoose.model('Movie', movieSchema)

export default Movie