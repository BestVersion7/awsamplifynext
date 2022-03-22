const stripe = require("stripe")(process.env.stripeSecretKey);

const handler = async (req, res) => {
    if (req.method === "POST") {
        try {
            // create a user first (not splitting up in two routes because people don't like creating new accounts)
            const { name, email, amount } = req.body;
            const createUser = await stripe.customers.create({
                name,
                email,
            });

            const paymentIntent = await stripe.paymentIntents.create({
                amount: amount * 100,
                currency: "usd",
                description: "Payment",
                receipt_email: email,
                customer: createUser.id,
            });

            // sends client secret to front end to complete trx
            res.json({ clientSecret: paymentIntent.client_secret });
        } catch (err) {
            // console.log(err)
            res.status(400).send(err.message);
        }
    } else {
        res.status(500).send("bad request");
    }
};

export default handler;
