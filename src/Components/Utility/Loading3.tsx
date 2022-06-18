import React from 'react';

const Loading3 = () => {
    return (
        <div style={{ height: '250px', width: '100%' }} className="d-flex justify-content-center align-items-center">
            <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
};

export default Loading3;