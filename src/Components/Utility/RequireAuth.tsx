import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../firebase.init';
import Loader from '../Loaders/Loader';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const [user, loading] = useAuthState(auth)
    let location = useLocation();
    if (loading) {
        return <Loader />
    }
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children
};

export default RequireAuth;