import React, { MouseEvent } from 'react';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import CustomLink from '../Utility/CustomLink';

const Navbar = () => {
    const navigate: NavigateFunction = useNavigate()
    return (
        <nav className="navbar navbar-expand-md bg-light border">
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
                        <li className="nav-item">
                            <CustomLink to="/experience" className="nav-link">Host your experience</CustomLink>
                        </li>
                        <li className="nav-item">
                            <CustomLink to="/help" className="nav-link">Help</CustomLink>
                        </li>
                        <li className="nav-item">
                            <CustomLink to="/login" className="nav-link">Log in</CustomLink>
                        </li>
                        <li className="nav-item mx-md-2 mx-0 mt-3 mt-md-0">
                            <span onClick={() => navigate('/signup')} className="nav-link common-btn d-inline d-md-block px-3">Sign up</span>
                        </li>
                    </ul>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;