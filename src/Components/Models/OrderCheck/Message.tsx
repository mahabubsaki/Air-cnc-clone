import React, { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMessageText } from '../../App/confirmReducer';
import { AppDispatch, RootState } from '../../App/store';
import { ReviewState2 } from '../../Types/interfaces';
import { BiArrowBack } from 'react-icons/bi'

const Message = ({ setMessage, setPay, setReview }: ReviewState2) => {
    const hotel = useSelector((state: RootState) => state.order.orderedHotel);
    const message = useSelector((state: RootState) => state.order.message)
    const dispatch: AppDispatch = useDispatch()
    const { ownerimg, owner } = hotel || {}
    const handleSetMessage = (e: ChangeEvent<HTMLFormElement>) => {
        dispatch(setMessageText(e.target.message.value))
        setMessage(false)
        setPay(true)
    }
    const handleBack = () => {
        setMessage(false)
        setReview(true)
    }
    return (
        <div className="order-info px-1 animate__animated animate__backInUp">
            <button className="btn btn-info mb-4" onClick={handleBack}><BiArrowBack className='me-2'></BiArrowBack>Back</button>
            <div className="d-flex align-items-center justify-content-between mb-3">
                <div style={{ width: "90%" }}>
                    <b className="fs-4">Drop a Message to Hotel Owner</b>
                    <p className="my-3">Say Hello to your host</p>
                    <p>Let {owner} know a little bit about yourself and when you are coming</p>
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center w-25">
                    <img src={ownerimg} alt="" width="64px" height="64px" className="rounded-circle mb-2" />
                    <b>{owner}</b>
                </div>
            </div>
            <form onSubmit={handleSetMessage}>
                <textarea defaultValue={message && message} placeholder="Enter your message" required name="message" rows={5} className="w-75 mx-auto d-block p-3" ></textarea>
                <button className="checkout d-block mx-auto mt-3" type='submit'>Continue</button>
            </form>
        </div>
    );
};

export default Message