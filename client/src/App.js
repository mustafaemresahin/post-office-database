import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import About from './pages/About';
import LoginScreen from './pages/login';
import Registration from './pages/register';
import Package from './pages/sendPackage';
import Track from './pages/TrackPackage';
import "./css/App.css";
import ProfilePage from './pages/profile';
import {Shop} from './pages/shop';
import { Cart } from "./pages/cart";
import EditProfile from './pages/editprofile';
import { ShopContextProvider } from "./context/shop-context";
import { AuthProvider } from './context/AuthContext'; // Import your AuthProvider


const App = () => {
  return (
    <Router>
      <div className="app-container"> {/* Wrap header and routes in a container */}
        <Header />
        <ShopContextProvider>
        <Routes>
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/home" element={<About />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/Send Package" element={<Package />} />
          <Route path="/track" element={<Track />} />
          <Route path="/Shop" element={<Shop />} />
          <Route path ="/Cart" element={<Cart />} />
          <Route path="/editprofile" element={<EditProfile />} />
        </Routes>
        </ShopContextProvider>
      </div>
    </Router>
  );
};

export default App;
