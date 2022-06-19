import { LatLngTuple } from 'leaflet';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { RootState } from '../App/store';
import Map from '../Models/ViewMap/Map';
import MapLocation from '../Models/ViewMap/MapLocation';
import { Hotel } from '../Types/interfaces';
import { AiOutlineArrowLeft } from 'react-icons/ai'

const ViewMap = () => {
    const mapLocations = useSelector((state: RootState) => state.searched.locationArray)
    const [allLocations, setAllLocations] = useState<Hotel[]>([])
    const city = useSelector((state: RootState) => state.searched.location)
    const from = useSelector((state: RootState) => state.filter.arrival)
    const to = useSelector((state: RootState) => state.filter.departure)
    const [currentHotel, setCurrentHotel] = useState(0)
    const [cordinate, setCordinate] = useState<LatLngTuple>(mapLocations[0]?.position)
    const [popUp, setPopUp] = useState<string>(mapLocations[0]?.name)
    const [clicked, setClicked] = useState(false)
    const handleChangeHotel = (location: Hotel, position: LatLngTuple): void => {
        setClicked(true)
        setCurrentHotel(allLocations.indexOf(location))
        setCordinate(position)
        setPopUp(location.name)
        setTimeout(() => {
            window.scrollTo(0, 0)
            setClicked(false)
        }, 1000)
    }
    const [loading, setLoading] = useState(true)
    const navigate: NavigateFunction = useNavigate()
    useEffect(() => {
        if (!mapLocations.length) {
            navigate('/')
        }
        else if (mapLocations.length > 0) {
            setAllLocations(mapLocations)
            setLoading(false)
        }
    }, [mapLocations, navigate])
    const handleSorting = (e: ChangeEvent<HTMLSelectElement>): void => {
        if (e.target.value) {
            setLoading(true)
            if (e.target.value === 'price-low') {
                const sort = [...mapLocations].sort((a, b) => a.pernight - b.pernight)
                setAllLocations(sort)
                setCordinate(sort[0]?.position)
                setPopUp(sort[0]?.name)
            }
            else if (e.target.value === 'price-high') {
                const sort = [...mapLocations].sort((a, b) => b.pernight - a.pernight)
                setAllLocations(sort)
                setCordinate(sort[0]?.position)
                setPopUp(sort[0]?.name)
            }
            else if (e.target.value === 'rating') {
                const sort = [...mapLocations].sort((a, b) => (b.rating * 10) - (a.rating * 10))
                setAllLocations(sort)
                setCordinate(sort[0]?.position)
                setPopUp(sort[0]?.name)
            }
            else if (e.target.value === 'reviews') {
                const sort = [...mapLocations].sort((a, b) => b.reviews - a.reviews)
                setAllLocations(sort)
                setCordinate(sort[0]?.position)
                setPopUp(sort[0]?.name)

            }
            else if (e.target.value === 'cancel') {
                const sort = [...mapLocations].filter(l => l.cancel === true)
                setAllLocations(sort)
                setCordinate(sort[0]?.position)
                setPopUp(sort[0]?.name)
            }
            setCurrentHotel(0)
            setTimeout(() => {
                setLoading(false)
            }, 2000)
        }
    }
    return (
        <>

            <div>
                {allLocations.length > 0 && <p className="ms-4">{allLocations.length} Hotels Found For Your Preference from {from.split(',')[0]} to {to.split(',')[0]}</p>}
                <b className="fs-2 ms-4">Stay in {city !== 'all' ? city : 'Any Divison'}</b>
                <div className="w-25 ms-4 mb-2">
                    <select className="form-select form-select-sm" aria-label=".form-select-sm example" defaultValue={''} onChange={handleSorting}>
                        <option value="" disabled className='fw-bolder'>Sort By</option>
                        <option value="price-low">Price (Low to High)</option>
                        <option value="price-high">Price (High to Low)</option>
                        <option value="cancel">Canceling Facility</option>
                        <option value="rating">Rating</option>
                        <option value="reviews">Reviews</option>
                    </select>
                </div>
                <div className="map-container">
                    <div className="mx-2 map-locations">
                        {allLocations.length > 0 && allLocations.map((location, inder) => <MapLocation allLocations={allLocations} location={location} loading={loading} currentHotel={currentHotel} handleChangeHotel={handleChangeHotel} key={inder}></MapLocation>)}
                        {allLocations.length === 0 && <div className="h-100 w-100 d-flex justify-content-center align-items-center">
                            <div>
                                <b className="fs-3">No Hotel Found with given preference</b>
                                <button className="btn btn-success d-block mx-auto mt-3" onClick={() => navigate('/')}><AiOutlineArrowLeft></AiOutlineArrowLeft> Back to Home</button>
                            </div>
                        </div>}
                    </div>
                    <div className="mx-2 p-2 border rounded-4 map-div">
                        {allLocations.length > 0 && <Map popUp={popUp} cordinate={cordinate} loading={loading} clicked={clicked}></Map>}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ViewMap;