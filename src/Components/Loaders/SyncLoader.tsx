import React from 'react';
import { ClipLoader } from 'react-spinners';

const SyncLoader = () => {
    return (
        <div className="d-flex justify-content-center mt-3">
            <ClipLoader color={'#16DD29'} loading={true} speedMultiplier={2} size={50} />
        </div>
    );
};

export default SyncLoader;