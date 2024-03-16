import Bookings from "../models/Bookings.js"
import Show from "../models/Show.js"
import User from "../models/User.js";
import { sendMail } from "./sendMail.js";

export const createBooking = async (req, res, next) => {
    try {
        const { seats } = req.body;
        const booking = new Bookings({
            ...req.body,
            userId: req.userId
        });

        const show = await Show.findById(req.body.show).populate('movie').populate('theatre')
        show.seats.forEach(seatObj => {
            if (seats.includes(seatObj.seatNo)) {
                console.log('updating...');
                seatObj.isBooked = true;
            }
        });

        show.markModified('seats'); // Mark the seats array as modified

        await show.save();
        await booking.save();

        const booking1 = await Bookings.findById(booking._id)
        .populate({
            path: 'show',
            populate: [
                { path: 'movie' },
                { path: 'theatre' }
            ]
        });

        const user = await User.findById(req.userId)

        const ticketDetails = {
            email: user.email,
            ticketId: booking._id,
            movieName: show.movie.title,
            theatre: show.theatre.theatre_name,
            address: show.theatre.address,
            timing: show.startTime,
            city: show.city,
            date: show.date
        }

        sendMail(ticketDetails)

        res.status(201).send(booking1);
    } catch (err) {
        next(err);
    }
}

export const myBookings = async (req,res,next) => {
    try{
        const myBookings = await Bookings.find({ userId: req.userId })
        .populate({
            path: 'show',
            populate: [
                { path: 'movie' },
                { path: 'theatre' }
            ]
        });

        console.log(myBookings)

        res.status(200).send(myBookings)
        
    }catch(err){
        next(err)
    }
}