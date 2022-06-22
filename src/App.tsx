import React from 'react';
import './Components/Styles/main.scss'
import Navbar from './Components/Shared/Navbar';
import Footer from './Components/Shared/Footer';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Pages/Home';
import ListHotel from './Components/Pages/ListHotel';
import ViewMap from './Components/Pages/ViewMap';
import SingleHotel from './Components/Pages/SingleHotel';
import OrderCheck from './Components/Pages/OrderCheck';
import { Toaster } from 'react-hot-toast';
import 'animate.css';
import Login from './Components/Pages/Login';
import Register from './Components/Pages/Register';
import RequireAuth from './Components/Utility/RequireAuth';

function App() {
  return (
    <div className="App">
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/home" element={<ListHotel />}></Route>
        <Route path="/map" element={<ViewMap />}></Route>
        <Route path="/hotel/:hotelId" element={<RequireAuth><SingleHotel /></RequireAuth>}></Route>
        <Route path="/check-in" element={<RequireAuth><OrderCheck /></RequireAuth>}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
