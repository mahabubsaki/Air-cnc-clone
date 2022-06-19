import React from 'react';
import { MdOutlineChildFriendly } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { RootState } from '../../App/store';
import { ReviewState } from '../../Types/interfaces';
import { GrFanOption } from 'react-icons/gr'
import { AiOutlineWifi } from 'react-icons/ai';
import { FcCancel } from 'react-icons/fc'
import { GiPartyHat } from 'react-icons/gi'
import { RiParkingBoxLine } from 'react-icons/ri'
import { TbToolsKitchen } from 'react-icons/tb'
import { MdOutlinePool, MdSpa, MdSmokingRooms, MdOutlinePets } from 'react-icons/md'

const Review = ({ setReview, setMessage }: ReviewState) => {
    const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const hotel = useSelector((state: RootState) => state.order.orderedHotel)
    const days = useSelector((state: RootState) => state.filter.days)
    const arrival = useSelector((state: RootState) => state.filter.arrival)
    const departure = useSelector((state: RootState) => state.filter.departure)
    const { location, ac, wifi, cancel, party, parking, kitchen, pool, spa, smoking, pet } = hotel || {}
    const handleShowMsg = () => {
        setReview(false)
        setMessage(true)
    }
    return (
        <div className="order-info px-1">
            <h3 className="fw-bold">Review Shedule and Rules</h3>
            <h5 className="fw-bold">{days} Days in {location}</h5>
            <div className="mx-auto d-flex justify-content-between" style={{ width: '100%' }}>
                <div className="d-flex me-2 align-items-center">
                    <div className="border d-flex align-items-center px-3 py-2 flex-column" style={{ backgroundColor: '#EAEAEA' }}>
                        <p className="m-0">{arrival.split(',')[0].split(' ')[1]}</p>
                        <p className="m-0">{arrival.split(',')[0].split(' ')[0]}</p>
                    </div>
                    <div className="ms-2">
                        <p className="m-0 mb-2">{week[new Date(arrival).getDay()]} Check-in</p>
                        <p className="m-0 mt-2">After 10:00 AM</p>
                    </div>
                </div>
                <div className="d-flex me-2 align-items-center">
                    <div className="border d-flex align-items-center px-3 py-2 flex-column" style={{ backgroundColor: '#EAEAEA' }}>
                        <p className="m-0">{departure.split(',')[0].split(' ')[1]}</p>
                        <p className="m-0">{departure.split(',')[0].split(' ')[0]}</p>
                    </div>
                    <div className="ms-2">
                        <p className="m-0 mb-2">{week[new Date(departure).getDay()]} Check-Out</p>
                        <p className="m-0 mt-2">After 10:00 PM</p>
                    </div>
                </div>
            </div>
            <hr className="my-3 mx-auto" style={{ width: '90%' }} />
            <div className='rules'>
                <h2 className="fw-bold mb-2">Things to keep in mind</h2>
                <p><MdOutlineChildFriendly className="bg-light border fs-2 me-1"></MdOutlineChildFriendly><span className="fs-5 ms-1 text-success" style={{ position: 'relative', top: '4px' }}>Suitable for Childrens</span></p>
                <p><GrFanOption className="bg-light border fs-2 me-1"></GrFanOption>{ac ? <span className="fs-5 text-success ms-1">Air Conditioner Avalilable</span> : <span className="fs-5 text-danger ms-1">Air Conditioner Not Avalilable</span>}</p>
                <p><AiOutlineWifi className="bg-light border fs-2 me-1"></AiOutlineWifi>{wifi ? <span className="fs-5 text-success ms-1">Wi-Fi Avalilable</span> : <span className="fs-5 text-danger ms-1">Wi-Fi Not Avalilable</span>}</p>
                <p><FcCancel className="bg-light border fs-2 me-1"></FcCancel>{cancel ? <span className="fs-5 text-success ms-1">Canceling Facility Avalilable</span> : <span className="fs-5 text-danger ms-1">Canceling Facility Not Avalilable</span>}</p>
                <p><GiPartyHat className="bg-light border fs-2 me-1"></GiPartyHat>{party ? <span className="fs-5 text-success ms-1">Parties Allowed</span> : <span className="fs-5 text-danger ms-1">Parties Not Allowed</span>}</p>
                <p><RiParkingBoxLine className="bg-light border fs-2 me-1"></RiParkingBoxLine>{parking ? <span className="fs-5 text-success ms-1">Parking Allowed</span> : <span className="fs-5 text-danger ms-1">Parking Not Allowed</span>}</p>
                <p><TbToolsKitchen className="bg-light border fs-2 me-1"></TbToolsKitchen>{kitchen ? <span className="fs-5 text-success ms-1">Kitchen Available</span> : <span className="fs-5 text-danger ms-1">Kitchen Not Avalilable</span>}</p>
                <p><MdOutlinePool className="bg-light border fs-2 me-1"></MdOutlinePool>{pool ? <span className="fs-5 text-success ms-1">Pool Avalilable</span> : <span className="fs-5 text-danger ms-1">Pool Not Avalilable</span>}</p>
                <p><MdSpa className="bg-light border fs-2 me-1"></MdSpa>{spa ? <span className="fs-5 text-success ms-1">Spa Avalilable</span> : <span className="fs-5 text-danger ms-1">Spa Not Avalilable</span>}</p>
                <p><MdSmokingRooms className="bg-light border fs-2 me-1"></MdSmokingRooms>{smoking ? <span className="fs-5 text-success ms-1">Smoking Allowed</span> : <span className="fs-5 text-danger ms-1">Smoking Not Allowed</span>}</p>
                <p><MdOutlinePets className="bg-light border fs-2 me-1"></MdOutlinePets>{pet ? <span className="fs-5 text-success ms-1">Pets Allowed</span> : <span className="fs-5 text-danger ms-1">Pets Not Allowed</span>}</p>
            </div>
            <button className="checkout d-block mx-auto" onClick={handleShowMsg}>Agree & Continue</button>
        </div>
    );
};

export default Review;