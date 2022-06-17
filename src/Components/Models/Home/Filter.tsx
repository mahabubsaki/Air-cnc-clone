import axios from 'axios';
import { format } from 'date-fns';
import React, { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { changeOnSearch } from '../../App/filterReducer';
import { offLoading, selectedArray, selectedLocation } from '../../App/isSearchedReducer';
import { AppDispatch } from '../../App/store';
import { FilterInput, GuestInput, SearchQuery } from '../../Types/interfaces';
import Calender from './Calender';
import Calender2 from './Calender2';
import GuestSelect from './GuestSelect';

const Filter = ({ locations, setHotels }: FilterInput): JSX.Element => {
    const dispatch: AppDispatch = useDispatch()
    const [guests, setGuests] = useState<GuestInput>({ adults: 1, babies: 1, childs: 1 })
    const [start, onStartChange] = useState<Date>(new Date());
    const [end, onEndChange] = useState<Date>(new Date());
    const filterLocation = async (e: ChangeEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()
        window.scrollTo(0, 0)
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
        if (Object.values(guests).reduce((pre, cur) => {
            return pre + cur
        }, 0) === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Guest Selection',
                text: 'You should have at least 1 guest to book a hotel',
            })
            return
        }
        const searchQuery: SearchQuery = {
            arrival: format(new Date(start), 'PP'),
            departure: format(new Date(end), 'PP'),
            days: ((new Date(end).getTime() - new Date(start).getTime()) / 86400000) + 1
        }
        dispatch(offLoading(true))
        dispatch(changeOnSearch(searchQuery))
        if (e.target.location.value !== 'all') {
            dispatch(selectedLocation(e.target.location.value))
        }
        else {
            dispatch(selectedLocation(''))
        }
        const { data } = await axios({
            url: 'http://localhost:5000/api/filter',
            method: 'POST',
            data: {
                location: e.target.location.value,
                adults: guests.adults,
                childs: guests.childs,
                babies: guests.babies,
                days: ((new Date(end).getTime() - new Date(start).getTime()) / 86400000) + 1
            },
        })
        console.log(data)
        dispatch(selectedArray(data))
        setHotels(data)
        dispatch(offLoading(false))
    }
    return (
        <div className="filter border mx-auto">
            <form onSubmit={filterLocation}>
                {/* Location select section */}
                <div className="shadow p-3 rounded-3">
                    <p className="text-center">Location</p>
                    <select name="location" className="form-select form-select-md mb-3 shadow-sm" defaultValue="" aria-label=".form-select-lg example" required>
                        <option value={''} disabled>Choose Location</option>
                        <option value={'all'}>Anywhere</option>
                        {locations.sort().map((loc, index) => <option
                            key={index}
                            value={loc}>{loc}</option>)}
                    </select>
                </div>
                {/* vacation start and end section */}
                <div className="my-3">
                    <div className="shadow p-2 rounded-3">
                        <p className="mb-1 text-center">Select Arrival</p>
                        <div className="d-flex justify-content-center justify-content-md-start">
                            <Calender start={start} onStartChange={onStartChange} />
                        </div>
                    </div>
                    <div className="shadow p-2 rounded-3">
                        <p className="mb-1 text-center">Select Departure</p>
                        <div className="d-flex justify-content-center justify-content-md-start">
                            <Calender2 end={end} onEndChange={onEndChange} />
                        </div>
                    </div>
                </div>
                <GuestSelect guests={guests} setGuests={setGuests}></GuestSelect>
                <button type="submit" className="common-btn d-block mx-auto w-50 my-3">Search</button>
            </form>
        </div>
    );
};

export default Filter;