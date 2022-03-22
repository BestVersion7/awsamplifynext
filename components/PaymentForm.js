import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useRouter } from "next/router";

export const PaymentForm = ({ total }) => {
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
                        card: elements.getElement(CardElement),
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
        // console.log(payIntent.id);
        router.push(
            {
                pathname: `/checkout/${payIntent.id}`,
                query: payIntent,
            },
            `/checkout/${payIntent.id}`
        );
    }

    return (
        <form className="container-donation-form">
            <textarea
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
            />
            <br />
            <textarea
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <CardElement options={CARD_OPTIONS} />

            <p>Amount: {total}</p>
            <button onClick={handleSubmit} disabled={processing || succeeded}>
                <span>{processing ? <p>loading...</p> : "Pay"}</span>
            </button>
            {openModal ? <p>Card failed</p> : <></>}
        </form>
    );
};

const CARD_OPTIONS = {
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
