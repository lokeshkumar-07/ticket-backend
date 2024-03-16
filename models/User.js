import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        default: "User"
    },
    avatar: {
        type: String,
        default: "https://firebasestorage.googleapis.com/v0/b/mern-docapp.appspot.com/o/man-avatar.png?alt=media&token=f64ca0e5-b0e7-46e9-a963-27d50eebb401"
    },
},
{timestamps: true})

const User = mongoose.model('User', userSchema)

export default User