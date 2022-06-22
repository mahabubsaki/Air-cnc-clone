import React, { ChangeEvent, useEffect, useState } from 'react';
import { BiUserCircle } from 'react-icons/bi'
import { MdOutlineAlternateEmail, MdOutlinePassword } from 'react-icons/md'
import { RiLockPasswordLine } from 'react-icons/ri'
import { useAuthState, useUpdateProfile } from 'react-firebase-hooks/auth';
import PasswordStrengthBar from 'react-password-strength-bar';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import LineLoader from '../Loaders/LineLoader';
import toast from 'react-hot-toast';
import axios from 'axios';
import Loader from '../Loaders/Loader';
import { NavigateFunction, useNavigate } from 'react-router-dom';

const Register = () => {
    const [user, loading2] = useAuthState(auth);
    const navigate: NavigateFunction = useNavigate()
    const [myLoading, setMyloading] = useState(true)
    useEffect(() => {
        if (user?.uid) {
            navigate('/')
        }
        else {
            setMyloading(false)
        }
    }, [user])
    const [name, setName] = useState<string>('')
    const [type, setType] = useState<string>('')
    const [
        createUserWithEmailAndPassword,
        user1,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const [updateProfile, updating] = useUpdateProfile(auth);
    useEffect(() => {
        if (error?.message) {
            toast.error(error.message)
        }
    }, [error])
    useEffect(() => {
        if (user1) {
            const saveUserInfo = async () => {
                const { data } = await axios({
                    data: {
                        name: name,
                        type: type,
                        email: user1.user.email
                    },
                    method: 'POST',
                    url: 'http://localhost:5000/api/create-user'
                })
                if (!data.acknowledged) {
                    toast.error('Something went wrong, Please Try Again Later')
                }
            }
            saveUserInfo()
        }
    }, [user1])
    const handleSignUp = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (e.target.userPass.value !== e.target.confirm.value) {
            toast.error('Password did not mail')
            return
        }
        await createUserWithEmailAndPassword(e.target.userMail.value, e.target.userPass.value)
        await updateProfile({ displayName: e.target.userName.value })
    }
    const [showPass, setShowPass] = useState<boolean>(false)
    const [password, setPassword] = useState<string>('')
    if (loading2 || myLoading) {
        return <Loader></Loader>
    }
    return (
        <div style={{ height: '600px' }} className="w-100 d-flex justify-content-center align-items-center">
            <div className="signup-form px-2">
                <div className="d-flex justify-content-center mb-3">
                    <h1 className="text-center signup mx-auto">Sign <span style={{ color: '#60E981' }}>Up</span></h1>
                </div>
                <form onSubmit={handleSignUp}>
                    <div className="d-flex justify-content-between align-items-center">
                        <label htmlFor="name"><p className='fw-bold w-25'>Name</p></label>
                        <div className="input-group mb-3 w-75">
                            <span className="input-group-text" id="basic-addon1"><BiUserCircle></BiUserCircle></span>
                            <input type="text" className="form-control"
                                name="userName"
                                required
                                onChange={(e) => setName(e.target.value)}
                                id='name' placeholder="Name" aria-label="Name" aria-describedby="basic-addon1" />
                        </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <label htmlFor="email"><p className='fw-bold w-25'>Email</p></label>
                        <div className="input-group mb-3 w-75">
                            <span className="input-group-text" id="basic-addon1"><MdOutlineAlternateEmail></MdOutlineAlternateEmail></span>
                            <input type="email" className="form-control"
                                name='userMail'
                                required
                                id='email' placeholder="E-mail" aria-label="E-mail" aria-describedby="basic-addon1" />
                        </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <label htmlFor="type"><p className='fw-bold w-25'>Profile Type</p></label>
                        <select className="form-select w-75 mb-3" aria-label="Default select example" id='type' defaultValue={''} required onChange={(e) => setType(e.target.value)}>
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
                                name='confirm'
                                required
                                id='confirm-password' placeholder="Confirm Password" aria-label="Confirm Password" aria-describedby="basic-addon1" />
                        </div>
                    </div>
                    <input type="checkbox" id="show-pass" className='me-2' onChange={(e) => setShowPass(e.target.checked)} />
                    <label htmlFor="show-pass" style={{ position: 'relative', top: '1px' }}>Show Password</label><br />
                    {(loading || updating) && <LineLoader />}
                    <button className="mt-3 btn btn-success w-100" type='submit'>Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default Register;