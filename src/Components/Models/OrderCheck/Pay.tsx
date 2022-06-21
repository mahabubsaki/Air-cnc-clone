import { loadStripe, Stripe } from '@stripe/stripe-js';
import axios from 'axios';
import React, { useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { ReviewState3 } from '../../Types/interfaces';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';
import SyncLoader from '../../Loaders/SyncLoader';

const Pay = ({ setPay, setMessage }: ReviewState3) => {
    const [stripePromise, setStripePromise] = useState(() => loadStripe(process.env.REACT_APP_PUBLISH_KEY!));
    const handleBack = () => {
        setPay(false)
        setMessage(true)
    }
    return (
        <div className="order-info px-1 animate__animated animate__backInUp">
            <button className="btn btn-info mb-4" onClick={handleBack}><BiArrowBack className='me-2'></BiArrowBack>Back</button>
            <div className='w-100'>
                <h5 className="fw-bold">Payment Selection</h5>
                <Elements stripe={stripePromise}>
                    <PaymentForm></PaymentForm>
                </Elements>
            </div>
        </div>
    );
};

export default Pay;