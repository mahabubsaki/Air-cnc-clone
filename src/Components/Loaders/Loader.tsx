import React from 'react';
import { RingLoader } from 'react-spinners';

const Loader = () => {
    return (
        <div className="d-flex justify-content-center align-items-center mt-3" style={{ height: '500px' }}>
            <RingLoader color={'#16DD29'} loading={true} size={200} speedMultiplier={2}></RingLoader>
        </div>
    );
};

export default Loader;