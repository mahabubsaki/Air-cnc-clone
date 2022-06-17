import React from 'react';
import DatePicker from 'react-date-picker';
import { StartDateState } from '../../Types/interfaces';


const Calender = ({ start, onStartChange }: StartDateState) => {
    return (
        <div className="position-relative">
            <DatePicker onChange={onStartChange} value={start} />
        </div>
    );
};

export default Calender;