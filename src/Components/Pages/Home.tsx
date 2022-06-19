import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setHotelInfo, setOrderInfo } from '../App/confirmReducer';
import { changeOnSearch } from '../App/filterReducer';
import { offLoading, selectedLocation } from '../App/isSearchedReducer';
import { AppDispatch } from '../App/store';
import Filter from '../Models/Home/Filter';
import Hotels from '../Models/Home/Hotels';
import { Hotel } from '../Types/interfaces';

const Home = () => {
    const locations: string[] = ['Dhaka', 'Khulna', 'Chittagong', 'Barisal', 'Mymensingh', 'Rajshahi', 'Rangpur', 'Syhlet']
    const dispatch: AppDispatch = useDispatch()
    useEffect(() => {
        dispatch(selectedLocation(''))
        dispatch(changeOnSearch({ arrival: '', days: 0, departure: '' }))
        dispatch(offLoading(true))
        dispatch(setOrderInfo(0))
        dispatch(setHotelInfo(null))
    }, [dispatch])
    const [hotels, setHotels] = useState<Hotel[]>([])
    return (
        <div className="container-fluid mt-5">
            <h5 className="fw-bold mb-4">Where do you want to go</h5>
            <section className="w-100 home-section">
                <Filter locations={locations} setHotels={setHotels}></Filter>
                <Hotels hotels={hotels} setHotels={setHotels}></Hotels>
            </section>
        </div>
    );
};

export default Home;