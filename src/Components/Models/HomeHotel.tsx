import React, { useEffect, useState } from 'react';
import { HotelComp } from '../Types/interfaces';
import { BsStarFill, BsStarHalf } from 'react-icons/bs'

const HomeHotel = ({ hotel }: HotelComp): JSX.Element => {
    const { img, name, location, pernight, rating, reviews } = hotel;
    const [ratingArray, setRatingArray] = useState<number[]>([])
    useEffect(() => {
        const empty = []
        for (let i = 0; i < Math.floor(rating); i++) {
            empty.push(i)
        }
        setRatingArray(empty)
    }, [rating])
    return (
        <div className="border rounded-3 d-flex flex-column align-items-center p-2 home-hotel">
            <img src={img} alt="" style={{ height: '200px', width: '100%' }} className='rounded-3' />
            <div className="me-auto">
                <b>{name}</b>
                <p>${pernight} Per Day</p>
                <p>Located in {location}</p>
                <p>{ratingArray.map(value => <BsStarFill style={{ color: '#00A799' }}
                    key={value}
                ></BsStarFill>)}
                    {parseInt(`${rating}`) !== rating && <BsStarHalf style={{ color: '#00A799' }}></BsStarHalf>} ({reviews})
                </p>
            </div>
        </div>
    );
};

export default HomeHotel;