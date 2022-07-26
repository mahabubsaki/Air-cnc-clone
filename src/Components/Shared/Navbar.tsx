import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import auth from '../firebase.init';
import CustomLink from '../Utility/CustomLink';

const Navbar = () => {
    const navigate: NavigateFunction = useNavigate()
    const [user] = useAuthState(auth);
    const handleLogout = () => {
        Swal.fire({
            title: 'Log Out',
            text: "Are You sure you want to log out?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: 'red',
            cancelButtonColor: '#16DD29',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                signOut(auth)
                navigate('/')
            }
        })
    }
    return (
        <nav className="navbar navbar-expand-md bg-light border border-2 sticky-top">
            <div className="container-fluid">
                <Link to="/" className="logo">Aircnc</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <CustomLink to="/" className="nav-link" aria-current="page">Home</CustomLink>
                        </li>
                        <li className="nav-item">
                            <CustomLink to="/home" className="nav-link">Host your home</CustomLink>
                        </li>
                        {user ? <>
                            <li className="nav-item">
                                <CustomLink to="/my-orders" className="nav-link">My Orders</CustomLink>
                            </li>
                            <li className="nav-item">
                                <span onClick={handleLogout} className="nav-link common-btn d-inline d-md-block px-3">Log Out</span>
                            </li>
                        </> : <>
                            <li className="nav-item">
                                <CustomLink to="/login" className="nav-link">Log in</CustomLink>
                            </li>
                            <li className="nav-item mx-md-2 mx-0 mt-2 mt-md-0">
                                <span onClick={() => navigate('/register')} className="nav-link common-btn d-inline d-md-block px-3">Sign up</span>
                            </li>
                        </>}
                    </ul>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;