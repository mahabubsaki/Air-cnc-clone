import React, { ChangeEvent, useEffect, useState } from 'react';
import { useAuthState, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import { Link, NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import auth from '../firebase.init';
import LineLoader from '../Loaders/LineLoader';
import Loader from '../Loaders/Loader';

const Login = () => {
    const [user1, loading1] = useAuthState(auth)
    let location: any = useLocation();
    let from = location.state?.from?.pathname || "/";
    const navigate: NavigateFunction = useNavigate()
    const [myLoading, setMyloading] = useState(true)
    const [
        signInWithEmailAndPassword,
        ,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const handleSignIn = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        signInWithEmailAndPassword(e.target.userMail.value, e.target.userPass.value)
    }
    useEffect(() => {
        if (user1?.uid) {
            navigate(from, { replace: true });
        }
        else {
            setMyloading(false)
        }
    }, [user1])
    useEffect(() => {
        if (error?.message) {
            toast.error(error.message)
        }
    }, [error])
    if (loading1 || myLoading) {
        return <Loader />
    }
    return (
        <div style={{ height: '600px' }} className="w-100 d-flex justify-content-center align-items-center">
            <div className="signup-form px-2">
                <div className="d-flex justify-content-center mb-3">
                    <h1 className="text-center signup mx-auto">Log <span style={{ color: '#60E981' }}>In</span></h1>
                </div>
                <form onSubmit={handleSignIn}>
                    <label htmlFor="email"><p className='fw-bold'>Email</p></label>
                    <div className="input-group mb-3">
                        <input type="email" className="form-control"
                            name='userMail'
                            required
                            id='email' placeholder="E-mail" aria-label="E-mail" aria-describedby="basic-addon1" />
                    </div>
                    <label htmlFor="password"><p className='fw-bold'>Password</p></label>
                    <div className="input-group mb-3">
                        <input type="password" className="form-control"
                            name='userPass'
                            required
                            id='password' placeholder="Password" aria-label="Password" aria-describedby="basic-addon1" />
                    </div>
                    {loading && <LineLoader />}
                    <button className="mt-3 btn btn-success w-100" type='submit'>Log In</button>
                </form>
                <p>New User? <Link to="/register" style={{ color: '#60E981', textDecoration: 'none' }}>Sign Up</Link> Now</p>
            </div>
        </div>
    );
};

export default Login;