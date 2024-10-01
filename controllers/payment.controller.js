const Stripe= require("stripe")(process.env.STRIPE_SECRET)

const stripe = async (req, res) =>{
    Stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency:"usd",

    },
    (stripeErr, stripeRes) => {
        if (stripeErr) {
            res.status(500).send({ success: false, message: stripeErr })
            } 
            else {
                res.send({ success: true, message: stripeRes })
            }
    }
);
};

module.exports= {
    stripe,
}