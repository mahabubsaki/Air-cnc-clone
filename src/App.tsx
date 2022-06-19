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

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/home" element={<ListHotel />}></Route>
        <Route path="/map" element={<ViewMap />}></Route>
        <Route path="/hotel/:hotelId" element={<SingleHotel />}></Route>
        <Route path="/check-in" element={<OrderCheck />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
