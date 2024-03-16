import mongoose from "mongoose";

const theatreSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    theatre_name: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true
    },  
    address: {
        type: String,
        required: true
    }
},
{timestamps: true})

const Theatre = mongoose.model('Theatre', theatreSchema)

export default Theatre