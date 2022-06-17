import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../App/store';
import { AiOutlineArrowRight } from 'react-icons/ai'
import { HotelState } from '../Types/interfaces';
import HomeHotel from './HomeHotel';
import Loading from '../Utility/Loading';
import { offLoading, selectedLocation } from '../App/isSearchedReducer';
const Hotels = ({ hotels, setHotels }: HotelState): JSX.Element => {
    const dispatch: AppDispatch = useDispatch()
    const location = useSelector((state: RootState) => state.searched.location)
    const isLoading = useSelector((state: RootState) => state.searched.isLoading)
    useEffect(() => {
        const getHotels = async () => {
            const { data } = await axios({ url: 'http://localhost:5000/api/hotels', method: 'GET' })
            const randomize = data.sort(() => Math.random() - 0.5)
            setHotels(randomize)
            dispatch(offLoading(false))
            window.scrollTo(0, 0)
        }
        getHotels()
    }, [dispatch, setHotels])
    const handleLoadAll = () => {
        dispatch(offLoading(true))
        dispatch(selectedLocation(''))
        const getHotels = async () => {
            const { data } = await axios({ url: 'http://localhost:5000/api/hotels', method: 'GET' })
            const randomize = data.sort(() => Math.random() - 0.5)
            setHotels(randomize)
            dispatch(offLoading(false))
            window.scrollTo(0, 0)
        }
        getHotels()
    }
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className="border places">
            {hotels.length > 0 && <div>
                {location && <button className="btn btn-info d-block ms-auto my-3 me-3">See On Map <AiOutlineArrowRight></AiOutlineArrowRight></button>}
                <p className="text-center my-2 fs-3">Total {hotels.length} Hotels Found {location && <span>in {location}</span>}</p>
                <div className="row row-cols-sm-2 row-cols-1 p-2 w-100 gy-2 mx-auto">
                    {hotels.map((hotel, index) => <HomeHotel
                        key={index}
                        hotel={hotel}
                    ></HomeHotel>)}
                </div>
            </div>}
            {!hotels.length && <div className='w-100 h-100 d-flex justify-content-center align-items-center px-4'><div>
                <b className='fs-3'>No hotels found with the following criteria</b>
                <button className="btn btn-success d-block mx-auto mt-3" onClick={handleLoadAll}>Load All Hotels</button></div></div>}
        </div>
    );
};

export default Hotels;