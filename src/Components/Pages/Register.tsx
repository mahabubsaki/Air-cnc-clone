import React, { ChangeEvent, useState } from 'react';
import { BiUserCircle } from 'react-icons/bi'
import { MdOutlineAlternateEmail, MdOutlinePassword } from 'react-icons/md'
import { RiLockPasswordLine } from 'react-icons/ri'
import PasswordStrengthBar from 'react-password-strength-bar';

const Register = () => {
    const [showPass, setShowPass] = useState<boolean>(false)
    const [password, setPassword] = useState<string>('')
    const handleShowPass = (e: ChangeEvent<HTMLInputElement>) => {
        setShowPass(e.target.checked)
    }
    return (
        <div style={{ height: '600px' }} className="w-100 d-flex justify-content-center align-items-center">
            <div className="signup-form px-2">
                <div className="d-flex justify-content-center mb-3">
                    <h1 className="text-center signup mx-auto">Sign <span style={{ color: '#60E981' }}>Up</span></h1>
                </div>
                <form>
                    <div className="d-flex justify-content-between align-items-center">
                        <label htmlFor="name"><p className='fw-bold w-25'>Name</p></label>
                        <div className="input-group mb-3 w-75">
                            <span className="input-group-text" id="basic-addon1"><BiUserCircle></BiUserCircle></span>
                            <input type="text" className="form-control"
                                name="userName"
                                required
                                id='name' placeholder="Name" aria-label="Name" aria-describedby="basic-addon1" />
                        </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <label htmlFor="email"><p className='fw-bold w-25'>Email</p></label>
                        <div className="input-group mb-3 w-75">
                            <span className="input-group-text" id="basic-addon1"><MdOutlineAlternateEmail></MdOutlineAlternateEmail></span>
                            <input type="email" className="form-control"
                                name='userName'
                                required
                                id='email' placeholder="E-mail" aria-label="E-mail" aria-describedby="basic-addon1" />
                        </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <label htmlFor="type"><p className='fw-bold w-25'>Profile Type</p></label>
                        <select className="form-select w-75 mb-3" aria-label="Default select example" id='type' defaultValue={''}>
                            <option value={''} disabled>Choose Your Profile Type</option>
                            <option value="user">User</option>
                            <option value="brand">Brand</option>
                        </select>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <label htmlFor="password"><p className='fw-bold w-25'>Password</p></label>
                        <div className="input-group w-75">
                            <span className="input-group-text" id="basic-addon1"><MdOutlinePassword></MdOutlinePassword></span>
                            <input type={showPass ? 'text' : 'password'} className="form-control"
                                name='userPass'
                                required
                                id='password' placeholder="Password" aria-label="Password" aria-describedby="basic-addon1"
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>
                    <PasswordStrengthBar className="w-75 ms-auto" password={password} />
                    <div className="d-flex justify-content-between align-items-center">
                        <label htmlFor="confirm-password"><p className='fw-bold w-25'>Confirm</p></label>
                        <div className="input-group mb-3 w-75">
                            <span className="input-group-text" id="basic-addon1"><RiLockPasswordLine></RiLockPasswordLine></span>
                            <input type={showPass ? 'text' : 'password'} className="form-control"
                                name='userPass'
                                required
                                id='confirm-password' placeholder="Confirm Password" aria-label="Confirm Password" aria-describedby="basic-addon1" />
                        </div>
                    </div>
                    <input type="checkbox" id="show-pass" className='me-2' onChange={handleShowPass} />
                    <label htmlFor="show-pass" style={{ position: 'relative', top: '1px' }}>Show Password</label><br />
                    <button className="mt-3 btn btn-success w-100">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default Register;