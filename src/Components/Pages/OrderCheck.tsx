import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { RootState } from '../App/store';
import Order from '../Models/OrderCheck/Order';
import Review from '../Models/OrderCheck/Review';
import Loading2 from '../Utility/Loading2';
import { IoIosArrowForward } from 'react-icons/io'
import Message from '../Models/OrderCheck/Message';

const OrderCheck = () => {
    const cost = useSelector((state: RootState) => state.order.cost)
    const navigate: NavigateFunction = useNavigate()
    const [loading, setLoading] = useState<boolean>(true)
    const [review, setReview] = useState<boolean>(false)
    const [message, setMessage] = useState<boolean>(false)
    const [pay, setPay] = useState<boolean>(false)
    useEffect(() => {
        if (cost === 0) {
            setLoading(false)
            navigate('/')
        }
        else {
            setLoading(false)
            setReview(true)
        }
    }, [cost, navigate])
    if (loading) {
        return <Loading2></Loading2>
    }
    return (
        <div>
            <div className="d-flex">
                <p className={`fs-6 ${review ? 'fw-bold' : 'fw-normal'}`}>1.Shedule and Rule<IoIosArrowForward></IoIosArrowForward></p>
                <p className={`fs-6 mx-1 ${message ? 'fw-bold' : 'fw-normal'}`}>2.Message<IoIosArrowForward></IoIosArrowForward></p>
                <p className={`fs-6 ${pay ? 'fw-bold' : 'fw-normal'}`}>3.Confirm & Pay</p>
            </div>
            <div className="check-in">
                {review && <Review setReview={setReview} setMessage={setMessage}></Review>}
                {message && <Message setMessage={setMessage} setPay={setPay} setReview={setReview}></Message>}
                <Order></Order>
            </div>
        </div>
    );
};

export default OrderCheck;