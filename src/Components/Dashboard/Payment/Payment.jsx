import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import CheckoutForm from "./CheckoutForm";
import { useLoaderData } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)
const Payment = () => {
    const eachPayment = useLoaderData();
    const { _id, photo, name, instructor, email, seats, price, student, sEmail} = eachPayment;
    return (
        <div className="my-8">
            <h2 className="font-serif font-bold text-3xl text-center">Payment</h2>
            <Elements stripe={stripePromise}>
                <CheckoutForm eachPayment={eachPayment} price={price}></CheckoutForm>
            </Elements>
        </div>
    );
}
export default Payment;