import React from 'react';
import DatePicker from 'react-date-picker';
import { EndDateState } from '../../Types/interfaces';


const Calender2 = ({ end, onEndChange }: EndDateState) => {
    return (
        <div className="position-relative">
            <DatePicker onChange={onEndChange} value={end} />
        </div>
    );
};

export default Calender2;