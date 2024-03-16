import Theatre from "../models/Theatre.js"

export const createTheatre = async (req,res,next) => {
    try{
        const theatre = new Theatre({
            ...req.body,
            userId: req.userId
        })

        await theatre.save()

        res.status(201).send(theatre)
    }catch(err){
        next(err)
    }
}

export const allTheatre = async (req,res,next) => {
    try{
        const theatres = await Theatre.find({})

        res.status(200).send(theatres)
    }catch(err){
        next(err)
    }
}

