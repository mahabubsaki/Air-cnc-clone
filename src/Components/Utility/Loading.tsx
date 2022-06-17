import React from 'react';

const Loading = () => {
    return (
        <div className="border places d-flex justify-content-around align-items-center">
            <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
};

export default Loading;