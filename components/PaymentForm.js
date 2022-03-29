import { useState, useContext } from "react";
import {
    useStripe,
    CardCvcElement,
    useElements,
    CardNumberElement,
    CardExpiryElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useRouter } from "next/router";
import { CartContext } from "./Layout";

export const PaymentForm = ({ total }) => {
    // this is just cart to 0
    const { setCartQuantity } = useContext(CartContext);

    const router = useRouter();
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [email, setEmail] = useState("test@test123.com");
    const [name, setName] = useState("halo there");
    const [openModal, setOpenModal] = useState(false);

    // payment intent for redirecting to success page with match.params.id
    const [payIntent, setPayIntent] = useState({});

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if stripe is failing
        if (!stripe || !elements) {
            return;
        }

        try {
            // don't double click the Credit cCardF
            setProcessing(true);
            // get the paymentintent secret key
            const { data } = await axios.post("/api/stripe", {
                name,
                email,
                amount: total,
            });
            // console.log(data);

            // confirm the card
            const { paymentIntent, error } = await stripe.confirmCardPayment(
                data.clientSecret,
                {
                    payment_method: {
                        card: elements.getElement(CardNumberElement),
                    },
                }
            );

            if (paymentIntent) {
                setPayIntent(paymentIntent);
                setSucceeded(true);
            }

            if (error) {
                setProcessing(false);
                setOpenModal(true);
            }
        } catch (err) {
            console.log(err);
            setProcessing(false);
            setOpenModal(true);
        }
    };
    // redirect if succeeded
    if (succeeded) {
        //clear cart after payment
        axios.delete("/api/cart");
        setCartQuantity(0);
        router.push({
            query: payIntent,
            pathname: `/checkout/${payIntent.id}`,
        });
    }

    return (
        <form>
            <textarea
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
            />
            <br />
            <textarea
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <p>Your card won't be charged. This is using stripe test keys.</p>
            <br />
            <p>Card Number: 4242424242424242 </p>
            <p>Expiry Date: Any date in the future </p>
            <p>CVC: Any </p>
            <div style={{ marginLeft: "-3em" }}>
                <CardNumberElement className="cardnumberelement" />
                <CardExpiryElement className="cardexpiryelement" />
                <CardCvcElement className="cardcvcelement" />
            </div>
            <b>
                <p style={{ color: "darkred" }}>Total amount: ${total}</p>
            </b>
            <button onClick={handleSubmit} disabled={processing || succeeded}>
                <span>{processing ? <p>loading...</p> : "Pay"}</span>
            </button>
            {openModal ? <p>Card failed</p> : <></>}
        </form>
    );
};
