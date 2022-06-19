import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import { Hotel } from '../Types/interfaces';
import Loading2 from '../Utility/Loading2';
import Notfound from './Notfound';
import { AiFillHome, AiFillCheckSquare, AiTwotoneStar } from 'react-icons/ai'
import { BiSprayCan } from 'react-icons/bi'
import { BsArrowRightSquareFill } from 'react-icons/bs'
import { FaUserAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../App/store';
import Calender from '../Models/Home/Calender';
import Calender2 from '../Models/Home/Calender2';
import Swal from 'sweetalert2';
import { changeOnSearch } from '../App/filterReducer';
import { format } from 'date-fns';
import { setHotelInfo, setOrderInfo } from '../App/confirmReducer';

const SingleHotel = () => {
    const [loading, setLoading] = useState<boolean>(true)
    const [invalid, setInvalid] = useState<boolean>(false)
    const [hotel, setHotel] = useState<Hotel | null>(null)
    const [start, onStartChange] = useState<Date>(new Date());
    const [end, onEndChange] = useState<Date>(new Date());
    const { hotelId } = useParams()
    const arrival = useSelector((state: RootState) => state.filter.arrival)
    const departure = useSelector((state: RootState) => state.filter.departure)
    const days = useSelector((state: RootState) => state.filter.days)
    const dispatch: AppDispatch = useDispatch()
    const navigate: NavigateFunction = useNavigate()
    const { img, pernight, service, clean, adults, childs, babies, description, owner, ownerimg, name, location, rating, reviews } = hotel || {}
    const handleConfirm = () => {
        dispatch(setHotelInfo(hotel));
        const cost = (Number(pernight) * Number(days) + Number(clean) + Number(service));
        dispatch(setOrderInfo(cost))
        navigate('/check-in')
    }
    const handleRange = () => {
        const today: number = new Date().getTime()
        const from: number = new Date(start).getTime()
        const to: number = new Date(end).getTime()
        if (from - today < 0) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Arrival Date',
                text: 'You have to skip atleast 1 day from today',
            })
            return
        }
        if (to - from < 172800000) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Vacation Range',
                text: 'Your Vacation should be at least 3 days.',
            })
            return
        }
        if (to - from > 1296000000) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Vacation Range',
                text: 'Your Vacation can be maximum of 15 days.',
            })
            return
        }
        dispatch(changeOnSearch({
            arrival: format(new Date(start), 'PP'),
            departure: format(new Date(end), 'PP'),
            days: ((new Date(end).getTime() - new Date(start).getTime()) / 86400000) + 1
        }))
    }
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
                    <hr className="my-4" style={{ color: 'grey', borderWidth: '2.5px' }} />
                    <div className="d-flex align-items-center">
                        <AiFillHome className="mx-2 fs-3"></AiFillHome>
                        <div className="mx-2">
                            <b>Entire Home</b>
                            <p>You'll have condiminium to yourself.</p>
                        </div>
                    </div>
                    <div className="d-flex align-items-center">
                        <AiFillCheckSquare className="mx-2 fs-3"></AiFillCheckSquare>
                        <div className="mx-2">
                            <b>Self Check-in</b>
                            <p>You can check in with the doorman.</p>
                        </div>
                    </div>
                    <div className="d-flex align-items-center">
                        <BiSprayCan className="mx-2 fs-3"></BiSprayCan>
                        <div className="mx-2">
                            <b>Sparkling Clean</b>
                            <p>{Math.round(Math.random() * 20)} recent guests said this place was sparkling clean.</p>
                        </div>
                    </div>
                    <div className="d-flex align-items-center">
                        <FaUserAlt className="mx-2 fs-3"></FaUserAlt>
                        <div className="mx-2">
                            <b>{owner} is a Superhost</b>
                            <p>Superhosts are experienced, highly rated hosts who are commited to providing great stays for guests</p>
                        </div>
                    </div>
                    <hr className="my-4" style={{ color: 'grey', borderWidth: '2.5px' }} />
                    <h1 className="text-center">Hotel Description</h1>
                    <p className="text-center">{description}</p>
                </div>
                <div className="pricing">
                    <div style={{ width: '90%' }} className="mx-auto mb-3 shadow-lg rounded-3 p-3">
                        {days === 0 && <div>
                            <p className="text-center text-danger">You Still has not selected your vacation night range</p>
                            <div className="w-100 d-flex justify-content-center align-items-center flex-column mb-3">
                                <p>Select Starting Day</p>
                                <Calender start={start} onStartChange={onStartChange} />
                            </div>
                            <div className="w-100 d-flex justify-content-center align-items-center flex-column mb-3">
                                <p>Select Ending Day</p>
                                <Calender2 end={end} onEndChange={onEndChange} />
                            </div>
                            <button className="btn btn-success d-block mx-auto" onClick={handleRange}>Set Vacation Range</button>
                        </div>}
                        <p className="fs-5"><b>${pernight}/</b> Day</p>
                        <p><AiTwotoneStar style={{ color: '#6bfc03', fontSize: '20px' }}></AiTwotoneStar> {rating} ({reviews} Reviews)</p>
                        {(arrival && departure) && <div>
                            <p>Dates</p>
                            <div className="d-flex border border-dark rounded-4 border-2 align-items-center justify-content-between w-100 fs-5 px-2">
                                <p className="date">{arrival.split(',')[0]}</p>
                                <BsArrowRightSquareFill></BsArrowRightSquareFill>
                                <p className="date">{departure.split(',')[0]}</p>
                            </div>
                            <button className="btn btn-danger d-block mx-auto mt-3" onClick={() => dispatch(changeOnSearch({ arrival: '', departure: '', days: 0 }))}>Reset Vacation Days</button>
                        </div>}
                        <p className="mt-3">Guest Capacity (max)</p>
                        <p>Adults : {adults}</p>
                        <p>Childs : {childs}</p>
                        <p>Babies : {babies}</p>
                        {days > 0 && <>
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
                            <button className="checkout d-block w-75 mx-auto" onClick={handleConfirm}>Checkout</button>
                        </>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleHotel;