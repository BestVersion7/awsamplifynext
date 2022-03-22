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
    const { setTotal } = useContext(CartContext);

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
        setTotal(0);
        router.push(
            {
                pathname: `/checkout/${payIntent.id}`,
                query: payIntent,
            },
            `/checkout/${payIntent.id}`
        );
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
            <div style={{ marginLeft: "-3em" }}>
                <CardNumberElement
                    className="cardnumberelement"
                    options={CARD_OPTIONS1}
                />
                <CardExpiryElement
                    className="cardexpiryelement"
                    options={CARD_OPTIONS2}
                />
                <CardCvcElement
                    className="cardcvcelement"
                    options={CARD_OPTIONS3}
                />
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

const CARD_OPTIONS1 = {
    iconStyle: "solid",
    style: {
        base: {
            color: "#32325d",
            fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
                color: "#aab7c4",
            },
        },
        invalid: {
            color: "#fa755a",
        },
    },
};
const CARD_OPTIONS2 = {
    style: {
        base: {
            color: "#32325d",
            fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
                color: "#aab7c4",
            },
        },
        invalid: {
            color: "#fa755a",
        },
    },
};
const CARD_OPTIONS3 = {
    style: {
        base: {
            color: "#32325d",
            fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
                color: "#aab7c4",
            },
        },
        invalid: {
            color: "#fa755a",
        },
    },
};
