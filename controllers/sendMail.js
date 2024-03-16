import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS_CODE
    }
})


export const sendMail = async (details) => {

    const {ticketId, email, movieName, theatre, address, timing, date, city} = details

    const htmlMessage = `
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    font-size: 16px;
                }
                /* Add more CSS styles here */
            </style>
        </head>
        <body>
            <p style="font-family: Arial, sans-serif; font-size: 16px;">Hello User,</p>
            <p style="font-family: Arial, sans-serif; font-size: 16px;">Your ticket is Booked!</p>
            <p style="font-family: Arial, sans-serif; font-size: 16px;">Here are the details:</p>
            <div style="font-family: Arial, sans-serif; font-size: 16px; padding-left: 10px">
                <h5>Ticket Number: ${ticketId}</h5>
                <h5>Movie: ${movieName}</h5>
                <h5>Date: ${date}</h5>
                <h5>Time: ${timing}</h5>
                <h5>Location: ${theatre}, ${address} ${city}</h5>
            </div>
        </body>
        `;


    try{
        await transporter.sendMail({
        from: {
            name: 'BOOK Show',
            address: process.env.PASS_CODE
        },
        to: email,
        subject: "Your ticked Booked!",
        html: htmlMessage
        })

        console.log("Mail SENT!")
    }catch(error){
        console.log(error)
    }
}