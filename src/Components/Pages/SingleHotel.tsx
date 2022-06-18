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
    const { img, pernight, service, clean, adults, childs, babies, description, owner, ownerimg, name, location } = hotel || {}
    console.log(hotel)
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
        <div className="single-hotel-section mt-3">
            <img src={img} alt="" className='mb-4 rounded-2' />
            <div className="single-hotel-info container-fluid">
                <div className="description px-3">
                    <div className="d-flex justify-content-between align-items-center w-100">
                        <h1>{name}</h1>
                        <div>
                            <img src={ownerimg} alt="" style={{ width: '64px', height: '64px' }} className='rounded-circle' />
                            <b>Owner : {owner}</b>
                        </div>
                    </div>
                    <p>{location}, Bangladesh</p>
                    <pre className="fs-6">{(Number(adults) + Number(childs) + Number(babies))} Guests  2 Beds  2 Bedrooms  2 Baths</pre>
                    <hr style={{ color: 'grey', borderWidth: '2.5px' }} />
                    <div className="d-flex">

                    </div>
                </div>
                <div className="shadow-lg pricing">
                    <h1>hi</h1>
                </div>
            </div>
        </div>
    );
};

export default SingleHotel;