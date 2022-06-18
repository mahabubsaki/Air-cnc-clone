import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Hotel } from '../Types/interfaces';
import Loading2 from '../Utility/Loading2';
import Notfound from './Notfound';

const SingleHotel = () => {
    const [loading, setLoading] = useState<boolean>(true)
    const [invalid, setInvalid] = useState<boolean>(false)
    const [hotel, setHotel] = useState<Hotel | null>(null)
    const { hotelId } = useParams()
    useEffect(() => {
        if (hotelId) {
            const setHotelInfo = async () => {
                const { data } = await axios({ method: 'GET', url: `http://localhost:5000/api/hotel?hotelId=${hotelId}` })
                if (data.error) {
                    setLoading(false)
                    setInvalid(true)
                }
                else {
                    setHotel(data)
                    setLoading(false)
                }
            }
            setHotelInfo()
        }
    }, [hotelId])
    if (loading) {
        return <Loading2></Loading2>
    }
    if (invalid) {
        return <Notfound></Notfound>
    }
    return (
        <div>
            <p>{hotel?.name}</p>
        </div>
    );
};

export default SingleHotel;