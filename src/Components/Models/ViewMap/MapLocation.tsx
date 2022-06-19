import React from 'react';
import { LocationComp } from '../../Types/interfaces';
import { MdOutlineDoneOutline } from 'react-icons/md'
import { TiCancel } from 'react-icons/ti'
import { AiTwotoneStar } from 'react-icons/ai'
import { NavigateFunction, useNavigate } from 'react-router-dom';
import Loading3 from '../../Utility/Loading3';

const MapLocation = ({ location, currentHotel, handleChangeHotel, allLocations, loading }: LocationComp) => {
    const { name, img, rating, reviews, adults, childs, babies, cancel, pernight, position, hotelId } = location;
    const navigate: NavigateFunction = useNavigate()
    if (loading) {
        return <Loading3></Loading3>
    }
    return (
        <div className="d-flex align-items-center border-bottom map-location-div my-3 p-2" style={{ backgroundColor: allLocations.indexOf(location) === currentHotel ? 'gray' : 'white' }} onClick={() => handleChangeHotel(location, position)}>
            <div style={{ width: '40%' }}>
                <img src={img} alt="" className='rounded-4 w-100' style={{ height: '150px' }} />
            </div>
            <div style={{ width: '60%' }} className="ms-2">
                <b className="fs-5">{name}</b>
                <p className="mt-3">Capacity : {adults} Adults, {childs} Childs, {babies} Babies</p>
                {cancel ? <p className="my-0"><MdOutlineDoneOutline className='text-success'> </MdOutlineDoneOutline> Canceling Facility Available</p> : <p className="my-0"><TiCancel className='text-danger'></TiCancel> Canceling Facility Not Available</p>}
                <div className="d-flex justify-content-between mx-3 mt-3">
                    <p><AiTwotoneStar style={{ color: '#6bfc03', fontSize: '20px' }}></AiTwotoneStar> {rating} ({reviews} Reviews)</p>
                    <p><b>${pernight}/</b>night</p>
                </div>
                <button className="btn btn-warning d-block mx-auto mb-3" onClick={() => navigate(`/hotel/${hotelId}`)}>Book Now</button>
            </div>
        </div>
    );
};

export default MapLocation;