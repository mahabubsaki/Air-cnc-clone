import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import { OrderInterface } from '../Types/interfaces';
import SingleOrder from '../Models/OrderCheck/SingleOrder';

const MyOrders = () => {
    const [user] = useAuthState(auth)
    const [orders, setOrders] = useState<OrderInterface[]>([])
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios({ method: 'GET', url: `http://localhost:5000/api/my-orders?email=${user?.email}` })
            setOrders(data)
        }
        fetchData()
    }, [user])
    return (
        <div>
            <h1 className="text-center">Account Owner: {user?.displayName}</h1>
            <h2 className="text-center my-3">Total Hotel Booked : {orders.length}</h2>
            <div className="row mx-auto row-cols-1 row-cols-sm-2 row-cols-md-3" style={{ width: '90%' }}>
                {orders.map((order, index) => <SingleOrder key={index} order={order} />)}
            </div>
        </div>
    );
};

export default MyOrders;