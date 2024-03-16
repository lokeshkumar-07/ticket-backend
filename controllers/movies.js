import Movie from "../models/Movie.js"

export const createMovie = async (req,res,next) => {
    try{
        console.log('Creating movie...')
        const movie = new Movie({
            ...req.body,
            genre: req.body.genre,
            language: req.body.language,
            userId: req.userId,
        })

        await movie.save()
        console.log(movie)

        res.status(201).send(movie)
    }catch(err){
        next(err)
    }
}

export const allMovies = async (req, res, next) => {

    
    try {
        console.log(req.query);
        const genre = req.query.genre || "All";
        let lcategory = req.query.lcategory || "All";
        const search = req.query.search || "";

        const languageCatOptions = ['Hindi', 'English', 'Tamil', 'Telugu', 'Bengali', 'Marathi', 'Japnese', 'Kannada', 'Malayalam', 'Spanish'];
        const genreCatOptions = ['Horror','Sci-Fy','Comedy','Thriller','Romantic', 'Fantasy', 'Musical' , 'Animation', 'Drama', 'Family', 'Action'];

        // If genre is not provided or empty string, set it to "All"
        const selectedGenres = genre === "All" ? genreCatOptions : genre.split(",").filter(genre => genre !== "");

        // If lcategory is not provided or empty string, set it to "All"
        const selectedLanguages = lcategory === "All" ? languageCatOptions : lcategory.split(",").filter(language => language !== "");

        const movies = await Movie.find({
            title: { $regex: search, $options: "i" },
            language: { $in: selectedLanguages },
            genre: { $in: selectedGenres }
        });

        res.status(200).send(movies);

    } catch (err) {
        next(err);
    }
};

export const getMovie = async (req,res,next) => {
    try{

        const { movie }= req.params
        
        const movies = await Movie.findOne({
            title: movie
        })


        res.status(200).send(movies)
    }catch(err){
        next(err)
    }
}

export const deleteMovie = async (req,res,next) => {
    try{

        const { id }= req.params
        
        const movie = await Movie.deleteOne({
            _id: id
        })


        res.status(200).send("movie Deleted")
    }catch(err){
        next(err)
    }
}