import Stripe from "stripe"

export const processPayment = async(req,res,next) => {
    try{
        const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY)

        const payment = await stripeClient.paymentIntents.create({
            amount: req.body.amount * 100,
            currency: 'inr'
        })

        res.status(200).send({
            clientSecret: payment.client_secret
        })

    }catch(err){
        next(err)
    }
}