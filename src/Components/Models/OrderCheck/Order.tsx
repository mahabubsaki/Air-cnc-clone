import React from 'react';
import { AiTwotoneStar } from 'react-icons/ai';
import { BsArrowRightSquareFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { RootState } from '../../App/store';

const Order = () => {
    const hotel = useSelector((state: RootState) => state.order.orderedHotel)
    const arrival = useSelector((state: RootState) => state.filter.arrival)
    const departure = useSelector((state: RootState) => state.filter.departure)
    const days = useSelector((state: RootState) => state.filter.days)
    const { name, img, reviews, rating, clean, service, pernight } = hotel || {}
    return (
        <div className='order'>
            <div className="mx-auto rounded-3 shadow-lg p-3" style={{ width: '98%' }}>
                <h1 className="text-center border-bottom mb-3">Order Info</h1>
                <div className="d-flex">
                    <div className="w-50 d-flex flex-column justify-content-between">
                        <b className="fs-5">{name}</b>
                        <p><AiTwotoneStar style={{ color: '#6bfc03', fontSize: '20px' }}></AiTwotoneStar> {rating} ({reviews} Reviews)</p>
                    </div>
                    <div className="w-50">
                        <img src={img} alt="" height="150px" className='w-100 border rounded-4' />
                    </div>
                </div>
                <p>Dates</p>
                <div className="d-flex border border-dark rounded-4 border-2 align-items-center justify-content-between w-100 fs-5 px-2">
                    <p className="date">{arrival.split(',')[0]}</p>
                    <BsArrowRightSquareFill></BsArrowRightSquareFill>
                    <p className="date">{departure.split(',')[0]}</p>
                </div>
                <div className="mt-2 d-flex justify-content-between mx-auto border-bottom" style={{ width: '90%' }}>
                    <p>${pernight} X {days} Days</p>
                    <p>${Number(pernight) * Number(days)}</p>
                </div>
                <div className="mt-2 d-flex justify-content-between mx-auto border-bottom" style={{ width: '90%' }}>
                    <p>Cleaning Fee</p>
                    <p>${clean}</p>
                </div>
                <div className="mt-2 d-flex justify-content-between mx-auto border-bottom" style={{ width: '90%' }}>
                    <p>Service Fee</p>
                    <p>${service}</p>
                </div>
                <div className="mt-2 d-flex justify-content-between mx-auto pb-3" style={{ width: '90%' }}>
                    <b>Total</b>
                    <b>${(Number(pernight) * Number(days) + Number(clean) + Number(service))}</b>
                </div>
            </div>
        </div>
    );
};

export default Order;