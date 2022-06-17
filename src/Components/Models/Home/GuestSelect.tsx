import React from 'react';
import { GuestState } from '../../Types/interfaces';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'

const GuestSelect = ({ guests, setGuests }: GuestState) => {
    const { adults, childs, babies } = guests
    const handleGuestInput = (type: string, action: string): void => {
        if (type === 'adults' && action === 'plus') {
            if (guests.adults < 3) {
                setGuests({
                    childs,
                    babies,
                    adults: adults + 1
                })
            }
        }
        else if (type === 'childs' && action === 'plus') {
            if (guests.childs < 4) {
                setGuests({
                    childs: childs + 1,
                    babies,
                    adults
                })
            }
        }
        else if (type === 'babies' && action === 'plus') {
            if (guests.babies < 4) {
                setGuests({
                    childs,
                    babies: babies + 1,
                    adults
                })
            }
        }
        else if (type === 'babies' && action === 'minus') {
            if (guests.babies >= 1) {
                setGuests({
                    childs,
                    babies: babies - 1,
                    adults
                })
            }
        }
        else if (type === 'childs' && action === 'minus') {
            if (guests.childs >= 1) {
                setGuests({
                    childs: childs - 1,
                    babies,
                    adults
                })
            }
        }
        else if (type === 'adults' && action === 'minus') {
            if (guests.adults >= 1) {
                setGuests({
                    childs,
                    babies,
                    adults: adults - 1,
                })
            }
        }
    }
    return (
        <div className="accordion" id="accordionExample">
            <div className="accordion-item shadow">
                <h2 className="accordion-header" id="headingOne">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        <span>Guest</span>
                    </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div className="accordion-body guest-section">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h5><strong>Adults</strong></h5>
                                <small>18+ Aged</small><br />
                                <small>(max 3)</small>
                            </div>
                            <div>
                                <div className="d-flex align-items-center">
                                    <h3 onClick={() => handleGuestInput('adults', 'plus')}><strong><AiOutlinePlus></AiOutlinePlus></strong></h3>
                                    <h6 className="mx-3"><strong>{adults}</strong></h6>
                                    <h3 onClick={() => handleGuestInput('adults', 'minus')}><strong><AiOutlineMinus></AiOutlineMinus></strong></h3>
                                </div>
                            </div>
                        </div>
                        <hr className="my-2" />
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h5><strong>Childs</strong></h5>
                                <small>Aged 3-17</small><br />
                                <small>(max 4)</small>
                            </div>
                            <div>
                                <div className="d-flex align-items-center">
                                    <h3 onClick={() => handleGuestInput('childs', 'plus')}><strong><AiOutlinePlus></AiOutlinePlus></strong></h3>
                                    <h6 className="mx-3"><strong>{childs}</strong></h6>
                                    <h3 onClick={() => handleGuestInput('childs', 'minus')}><strong><AiOutlineMinus></AiOutlineMinus></strong></h3>
                                </div>
                            </div>
                        </div>
                        <hr className="my-2" />
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h5><strong>Babies</strong></h5>
                                <small>Aged &lt; 2</small><br />
                                <small>(max 4)</small>
                            </div>
                            <div>
                                <div className="d-flex align-items-center">
                                    <h3 onClick={() => handleGuestInput('babies', 'plus')}><strong><AiOutlinePlus></AiOutlinePlus></strong></h3>
                                    <h6 className="mx-3"><strong>{guests.babies}</strong></h6>
                                    <h3 onClick={() => handleGuestInput('babies', 'minus')}><strong><AiOutlineMinus></AiOutlineMinus></strong></h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GuestSelect;