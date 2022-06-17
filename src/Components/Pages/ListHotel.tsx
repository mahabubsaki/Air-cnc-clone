import axios from 'axios';
import React, { ChangeEvent } from 'react';
import Swal from 'sweetalert2';

const ListHotel = () => {
    const locations: string[] = ['Dhaka', 'Khulna', 'Chittagong', 'Barisal', 'Mymensingh', 'Rajshahi', 'Rangpur', 'Syhlet']
    const handleSubmit = async (e: ChangeEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        if (parseInt(e.target.mindays.value) >= parseInt(e.target.maxdays.value)) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Vacation Day Range',
                text: 'Minimum vacation day cannot be greater than maximum vacation day',
            })
            return
        }
        const { data } = await axios({
            url: 'http://localhost:5000/api/add-hotel',
            method: 'POST',
            data: {
                name: e.target.hotel.value,
                adults: parseInt(e.target.adults.value),
                childs: parseInt(e.target.childs.value),
                babies: parseInt(e.target.babies.value),
                position: [Number(e.target.latitude.value), Number(e.target.longitude.value)],
                rating: Number(e.target.rating.value),
                reviews: parseInt(e.target.reviews.value),
                owner: e.target.owner.value,
                ownerimg: e.target.ownerimg.value,
                img: e.target.img.value,
                pernight: parseInt(e.target.perguest.value),
                service: parseInt(e.target.service.value),
                clean: parseInt(e.target.cleaning.value),
                location: e.target.location.value,
                cancel: e.target.cancel.checked,
                wifi: e.target.wifi.checked,
                ac: e.target.ac.checked,
                spa: e.target.spa.checked,
                pet: e.target.pet.checked,
                party: e.target.party.checked,
                smoking: e.target.smoking.checked,
                pool: e.target.pool.checked,
                parking: e.target.parking.checked,
                kitchen: e.target.kitchen.checked,
                description: e.target.description.value,
                hotelId: Math.round(Math.random() * 1000000000000000).toString(16),
            }
        })
        console.log(data);
        e.target.reset()
    }
    return (
        <div className="w-50 mx-auto">
            <h1 className="text-center">List your hotel to Air CNC</h1>
            <form className="form-inline add-to-form" onSubmit={handleSubmit}>
                <input type="text" name='hotel' className="form-control my-2 border-0" placeholder="Hotel Name" required />
                <input type="url" name='img' className="form-control my-2 border-0" placeholder="Hotel Thumbnail URL" required />
                <input type="text" name='owner' className="form-control my-2 border-0" placeholder="Owner Name" required />
                <input type="url" name='ownerimg' className="form-control my-2 border-0" placeholder="Owner Avatar URL" required />
                <select name="location" className="form-select form-select-md my-2 border-0" defaultValue="" aria-label=".form-select-lg example" required  >
                    <option value={''} disabled>Choose Location</option>
                    {locations.sort().map((loc, index) => <option
                        key={index}
                        value={loc}>{loc}</option>)}
                </select>
                <textarea name="description" placeholder="Hotel Description" rows={5} className="w-100 border-0 form-control my-2" required></textarea>
                <input type="number" name='perguest' className="form-control my-2 border-0" placeholder="Per Day Price" required min={0} />
                <input type="number" name='service' className="form-control my-2 border-0" placeholder="Service Fee" required min={0} />
                <input type="number" name='cleaning' className="form-control my-2 border-0" placeholder="Cleaning Fee" required min={0} />
                <input type="number" name='rating' className="form-control my-2 border-0" placeholder="Current Hotel Rating" required min={0} step={0.1} />
                <input type="number" name='reviews' className="form-control my-2 border-0" placeholder="Current Hotel Reviews" min={0} required />
                <div className="d-flex">
                    <input type="number" name="longitude" className='w-50 form-control me-2' placeholder="Longitude" min={0} step={0.000000000000001} />
                    <input type="number" name="latitude" className='w-50 form-control ms-2' placeholder="Latitude" min={0} step={0.000000000000001} />
                </div>
                <div className="d-flex">
                    <input type="number" name="adults" className='form-control my-2' placeholder="Adults" min={0} max={3} style={{ width: '33%' }} />
                    <input type="number" name="childs" className='form-control mx-3 my-2' placeholder="Childs" min={0} max={4} style={{ width: '33%' }} />
                    <input type="number" name="babies" className='form-control my-2' placeholder="Babies" min={0} max={4} style={{ width: '33%' }} />
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" name="cancel" id='cancel' />
                    <label className="form-check-label" htmlFor="cancel">Canceling facility</label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" name="party" id='allow' />
                    <label className="form-check-label" htmlFor="allow">Allow Party</label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" name="parking" id='parking' />
                    <label className="form-check-label" htmlFor="parking">Allow Parking</label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" name="kitchen" id='kitchen' />
                    <label className="form-check-label" htmlFor="kitchen">Allow Kitchen</label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" name="ac" id="ac" />
                    <label className="form-check-label" htmlFor="ac">Allow AC</label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" name="wifi" id='wifi' />
                    <label className="form-check-label" htmlFor="wifi">Allow Wi-Fi</label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" name="pool" id='pool' />
                    <label className="form-check-label" htmlFor="pool">Allow Pool</label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" name="spa" id='spa' />
                    <label className="form-check-label" htmlFor="spa">Allow Spa</label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" name="smoking" id='smoking' />
                    <label className="form-check-label" htmlFor="smoking">Allow Smoking</label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" name="pet" id='pet' />
                    <label className="form-check-label" htmlFor="pet">Allow Pet</label>
                </div>
                <button type="submit" className="btn btn-success mt-2">Submit</button>
            </form>
        </div>
    );
};

export default ListHotel;