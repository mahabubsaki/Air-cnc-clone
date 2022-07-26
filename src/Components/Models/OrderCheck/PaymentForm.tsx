import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import { format } from 'date-fns/esm';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { RootState } from '../../App/store';
import auth from '../../firebase.init';
import SyncLoader from '../../Loaders/SyncLoader';

const PaymentForm = () => {
    const [user] = useAuthState(auth)
    const stripe = useStripe();
    const stripeElements = useElements();
    const navigate: NavigateFunction = useNavigate()
    const hotel = useSelector((state: RootState) => state.order.orderedHotel);
    const cost = useSelector((state: RootState) => state.order.cost)
    const days = useSelector((state: RootState) => state.filter.days)
    const arrival = useSelector((state: RootState) => state.filter.arrival)
    const departure = useSelector((state: RootState) => state.filter.departure)
    const message = useSelector((state: RootState) => state.order.message)
    const [loading, setLoading] = useState<boolean>(false)
    const [incomingSecret, setIncomingSecret] = useState<string>('')
    useEffect(() => {
        const requestSecret = async () => {
            const { data } = await axios({
                method: 'POST',
                data: { cost: cost },
                url: `http://localhost:5000/createpayment`
            })
            setIncomingSecret(data.clientSecret)
        };
        requestSecret()
    }, [cost])
    const handleSubmit = async (e: ChangeEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()
        setLoading(true)
        if (!stripe || !stripeElements) {
            setLoading(false)
            return
        }
        const card = stripeElements.getElement(CardElement)
        if (!card) {
            setLoading(false)
            return
        }
        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card,
            billing_details: {
                name: 'First Last',
                address: { postal_code: '90210' }
            },
        });
        if (error?.message) {
            toast.error(error.message!)
            setLoading(false)
            return
        }
        const { paymentIntent, error: error1 } = await stripe.confirmCardPayment(
            incomingSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: e.target.username.value,
                        email: e.target.usermail.value,
                        address: e.target.useraddress.value,
                        phone: e.target.usernumber.value,
                    },
                },
            },
        );
        if (error1?.message) {
            toast.error(error1.message!)
            setLoading(false)
            return
        }
        const { data } = await axios({
            method: 'PUT',
            url: 'http://localhost:5000/api/save-hotel-order',
            data: {
                email: user?.email,
                days: days,
                cost: cost,
                img: hotel?.img,
                cancel: hotel?.cancel,
                pernight: hotel?.pernight,
                hotelId: hotel?.hotelId,
                arrival: arrival,
                transactionId: paymentIntent?.id,
                paidAt: format(new Date(), 'PP'),
                departure: departure,
                status: "paid",
                message: message,
                name: hotel?.name,
            },
        })
        if (data.acknowledged) {
            toast.success('Payment Success')
            setLoading(false)
            navigate('/my-orders')
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit} className='d-flex flex-column border p-3 rounded-2'>
                <p>Safe money transfer using your bank account. Visa, Maestro, Discover, American Express</p>
                <CardElement className="border p-3"
                    options={{
                        style: {
                            base: {
                                fontSize: '20px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },

                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <input type="text" placeholder="Name On Card" className="px-3 py-2 mt-2" style={{
                    fontSize: '20px',
                    color: '#424770',
                    borderColor: '#ccc',
                    borderWidth: '0.4px'
                }} name="username" required />
                <input type="text" placeholder="Address" className="px-3 py-2 mt-2" style={{
                    fontSize: '20px',
                    color: '#424770',
                    borderColor: '#ccc',
                    borderWidth: '0.4px'
                }} name="useraddress" required />
                <input type="email" value={user?.email!} readOnly={true} disabled placeholder="Email" className="px-3 py-2 mt-2" style={{
                    fontSize: '20px',
                    color: '#424770',
                    borderColor: '#e6e6e6',
                    borderWidth: '0.4px'
                }} name="usermail" required />
                <input type="text" placeholder="Phone" className="px-3 py-2 mt-2" style={{
                    fontSize: '20px',
                    color: '#424770',
                    borderColor: '#edebe6',
                    borderWidth: '0.4px'
                }} name="usernumber" required />
                {loading && <SyncLoader></SyncLoader>}
                <button className='btn btn-warning mt-2' disabled={(!incomingSecret || !stripe) ? true : false} type='submit'>Pay ${cost}</button>
            </form>
        </div>
    );
};

export default PaymentForm;