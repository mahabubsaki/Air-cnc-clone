import React from 'react';
import { BarLoader } from 'react-spinners';

const LineLoader = () => {
    return (
        <div className="d-flex justify-content-center mt-3">
            <BarLoader color={'#16DD29'} loading={true} speedMultiplier={3} width={200} height={20}></BarLoader>
        </div>
    );
};

export default LineLoader;