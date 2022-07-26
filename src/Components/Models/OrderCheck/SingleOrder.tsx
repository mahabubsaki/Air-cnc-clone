import React from 'react';
import { Link } from 'react-router-dom';
import { SingleOrderInterface } from '../../Types/interfaces';

const SingleOrder = ({ order }: SingleOrderInterface) => {
    const { hotelId, arrival, cancel, cost, days, departure, img, message, name, paidAt, transactionId } = order;
    return (
        <div className="card col">
            <img src={img} className="card-img-top" alt="..." width="100%" height="200px" />
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <small className="my-3 d-block">{transactionId}</small>
                <p>Arrival Date : {arrival}</p>
                <p>Departure Date : {departure}</p>
                <p>Total Days : {days}</p>
                <p>Payment Date : {paidAt}</p>
                <p>Total Cost : ${cost}</p>
                <p>{message}</p>
                <Link to={`/hotel/${hotelId}`}><button className="btn btn-primary">See Hotel Details</button></Link>
            </div>
        </div>
    );
};

export default SingleOrder;