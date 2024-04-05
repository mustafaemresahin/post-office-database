import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../css/styles.css'; // Ensure this is the correct path to your CSS file
import axios from 'axios';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const [name, setName] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');
    const role = localStorage.getItem('role');
    setIsLoggedIn(!!token);
    if (!token) {
      // If no token found, do nothing
    }
    else{
      if(role === "admin"){
        axios.get('/api/admin')
        .then(response => {
            const userData = response.data.find(user => user.AdminID === id); // Find the user by id
            if (userData) {
              setName(userData.Fname);
              setIsAdmin(true);
            } else {
              console.log('User not found');
              // Handle the case where the user is not found
            }
          })
          .catch(error => console.error('Error:', error));
      }
      else if(role === "employee"){
        axios.get('/api/users')
        .then(response => {
            const userData = response.data.find(user => user.UserID === id); // Find the user by id
            if (userData) {
              setName(userData.firstname);
              setIsEmployee(true);
            } else {
              console.log('User not found');
              // Handle the case where the user is not found
            }
          })
          .catch(error => console.error('Error:', error));
      }
      else{
        axios.get('/api/users')
        .then(response => {
            const userData = response.data.find(user => user.UserID === id); // Find the user by id
            if (userData) {
              setName(userData.firstname);
            } else {
              console.log('User not found');
              // Handle the case where the user is not found
            }
          })
          .catch(error => console.error('Error:', error));
      }
    }
  }, []);

  return (
    <header className="custom-header">
      <div className="container">
        <button className="menu-toggle" onClick={toggleMenu}>☰</button>
        <nav onClick={toggleMenu} className={`header-nav ${isMenuOpen ? 'show' : ''}`}>
          <NavLink to="/home" className={({ isActive }) => isActive ? "activeLink" : ""}>Home</NavLink>
          <NavLink to="/Send Package" className={({ isActive }) => isActive ? "activeLink" : ""}>Send Package</NavLink>
          <NavLink to="/Shop" className={({ isActive }) => isActive ? "activeLink" : ""}>Shop</NavLink>
          <NavLink to="/Cart" className={({ isActive }) => isActive ? "activeLink" : ""}>Cart</NavLink>
          <NavLink to="/track" className={({ isActive }) => isActive ? "activeLink" : ""}>Track Package</NavLink>
          {isAdmin && <NavLink to="/adminDash" className={({ isActive }) => isActive ? "activeLink" : ""}>Admin</NavLink>}
          {isAdmin && <NavLink to="/Employee" className={({ isActive }) => isActive ? "activeLink" : ""}>Employee</NavLink>}
          {isEmployee && <NavLink to="/Employee" className={({ isActive }) => isActive ? "activeLink" : ""}>Employee</NavLink>}
          {isAdmin && <NavLink to="/vehicles" className={({ isActive }) => isActive ? "activeLink" : ""}>Vehicles</NavLink>}
          {isEmployee && <NavLink to="/vehicles" className={({ isActive }) => isActive ? "activeLink" : ""}>Vehicles</NavLink>}
          {!isLoggedIn && <NavLink to="/login" className={({ isActive }) => isActive ? "activeLink" : ""}>Login/Signup</NavLink>}
          {isLoggedIn && <NavLink to="/Profile" className={({ isActive }) => isActive ? "activeLink" : ""}>Logged in as {name}</NavLink>}
          {isLoggedIn && <NavLink to="/notification" className={({ isActive }) => isActive ? "activeLink" : ""}>Notification</NavLink>}

        </nav>
      </div>
    </header>
  );
};

export default Header;
