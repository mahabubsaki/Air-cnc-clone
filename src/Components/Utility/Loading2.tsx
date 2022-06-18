import React from 'react';

const Loading2 = () => {
    return (
        <div style={{ height: '500px', width: '100%' }} className="d-flex justify-content-center align-items-center">
            <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
};

export default Loading2;