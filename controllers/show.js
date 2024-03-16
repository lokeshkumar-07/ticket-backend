import Movie from "../models/Movie.js"
import Show from "../models/Show.js"

export const createShow = async (req,res,next) => {
    try{
        const {date, days} = req.body
        let currentDate = new Date(date);
        let upcomingDays = [currentDate.toDateString()];

        for (let i = 1; i <= days; i++) {
            let newDate = new Date(currentDate);
            newDate.setDate(currentDate.getDate() + i);
            upcomingDays.push(newDate.toDateString());
        }

        console.log(upcomingDays)

        upcomingDays.forEach(async (day) => {
            function getAlphabet(index) {
                return String.fromCharCode(65 + index); // 65 is the ASCII code for 'A'
            }
            
            const seats = [];
            const rows = 6; // Assuming you have 5 rows
            const numbers = 8; // Assuming you have 4 seats in each row
            
            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < numbers; j++) {
                    const seatDetail = {
                        row: getAlphabet(i), // Convert row index to alphabet
                        seatNo: getAlphabet(i) + "-" + (j + 1), // Convert seat number to alphabet
                        isBooked: false
                    };
                    seats.push(seatDetail);
                }
            }
    
            const show = new Show({
                ...req.body,
                seats: seats,
                movie: req.body.movieId,
                date: day,
                userId: req.userId
            })
    
            await show.save()
        })

        console.log("All created")

        res.status(201).send("All Show Created")

    }catch(err){
        next(err)
    }
}

export const allShows = async (req, res, next) => {
    try {
        const { movie, date, city } = req.query;

        const currentDate = new Date();
        const queryDate = new Date(date);

        let allShows;
        if (queryDate.toDateString() === currentDate.toDateString()) {
            // If date is the current date, filter shows based on start time
            const currentTime = currentDate.getHours() * 60 + currentDate.getMinutes();
            allShows = await Show.find({
                movieName: movie,
                date: date,
                city: city
            }).populate('movie').populate('theatre');

            // Filter shows with start time greater than current time
            allShows = allShows.filter(show => {
                const [startTime, period] = show.startTime.split(' ');
                const [hours, minutes] = startTime.split(':').map(Number);
                let timeInMinutes = hours * 60 + minutes;
                if (period === 'PM' && hours !== 12) {
                    timeInMinutes += 12 * 60;
                }
                return timeInMinutes > currentTime;
            });
        } else {
            // If date is greater than current date, return all shows
            allShows = await Show.find({
                movieName: movie,
                date: date,
                city: city
            }).populate('movie').populate('theatre');
        }

        res.status(200).send(allShows);
    } catch (err) {
        next(err);
    }
};

export const allShowsNoFilter = async (req,res,next) => {
    try{
        const allshows = await Show.find({
        }).populate('movie').populate('theatre')
        
        
        res.status(200).send(allshows)

        
    }catch(err){
        next(err)
    }
}

export const getShow = async (req,res,next) => {
    try{
        const {showId} = req.params
        const show = await Show.findOne({
            _id: showId
        }).populate('movie').populate('theatre')
        
        res.status(200).send(show)

    }catch(err){
        next(err)
    }
}