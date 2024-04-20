import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../css/styles.css'; // Ensure this is the correct path to your CSS file
import axios from 'axios';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const [name, setName] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');
    setIsLoggedIn(!!token);
    if (!token) {
      // If no token found, do nothing
    }
    else{
        axios.get('/api/users')
        .then(response => {
            const userData = response.data.find(user => user.UserID === id); // Find the user by id
            if (userData) {
              setName(userData.firstname);
              if (userData.role === "User"){
                setIsUser(true);
              }
              else if (userData.role === "Driver" || userData.role === "Manager" ||userData.role === "Service Clerk"){
                setIsEmployee(true);
              }
              else{
                setIsAdmin(true);
              }
            } else {
              console.log('User not found');
              // Handle the case where the user is not found
            }
          })
          .catch(error => console.error('Error:', error));
    }
  }, []);

  return (
    <header className="custom-header">
      <div className="container">
        <button className="menu-toggle" onClick={toggleMenu}>☰</button>
        <nav onClick={toggleMenu} className={`header-nav ${isMenuOpen ? 'show' : ''}`}>
          <NavLink to="/home" className={({ isActive }) => isActive ? "activeLink" : ""}>Home</NavLink>          
          {isUser && <NavLink to="/Send Package" className={({ isActive }) => isActive ? "activeLink" : ""}>Send Package</NavLink>}
          {!isAdmin && !isEmployee && <NavLink to="/Shop" className={({ isActive }) => isActive ? "activeLink" : ""}>Shop</NavLink>}
          {isUser && <NavLink to="/Cart" className={({ isActive }) => isActive ? "activeLink" : ""}>Cart</NavLink>}
          {!isAdmin && !isEmployee && <NavLink to="/track" className={({ isActive }) => isActive ? "activeLink" : ""}>Track Package</NavLink>}
          {isAdmin && <NavLink to="/adminDash" className={({ isActive }) => isActive ? "activeLink" : ""}>Admin Dashboard</NavLink>}
          {isAdmin && <NavLink to="/adminPack" className={({ isActive }) => isActive ? "activeLink" : ""}>Packages</NavLink>}
          {isEmployee && <NavLink to="/adminPack" className={({ isActive }) => isActive ? "activeLink" : ""}>Packages</NavLink>}
          {isAdmin && <NavLink to="/adminUser" className={({ isActive }) => isActive ? "activeLink" : ""}>Customers</NavLink>}
          {isAdmin && <NavLink to="/employees" className={({ isActive }) => isActive ? "activeLink" : ""}>Employees</NavLink>}
          {isAdmin && <NavLink to="/adminStoreItems" className={({ isActive }) => isActive ? "activeLink" : ""}>Store Items</NavLink>}
          {isAdmin && <NavLink to="/reports" className={({ isActive }) => isActive ? "activeLink" : ""}>Reports</NavLink>}
          {isEmployee && <NavLink to="/Employees" className={({ isActive }) => isActive ? "activeLink" : ""}>Employee</NavLink>}
          {isAdmin && <NavLink to="/vehicles" className={({ isActive }) => isActive ? "activeLink" : ""}>Vehicles</NavLink>}
          {isEmployee && <NavLink to="/vehicles" className={({ isActive }) => isActive ? "activeLink" : ""}>Vehicles</NavLink>}
          {!isLoggedIn && <NavLink to="/login" className={({ isActive }) => isActive ? "activeLink" : ""}>Login/Signup</NavLink>}
          {isUser && <NavLink to="/transactionHistory" className={({ isActive }) => isActive ? "activeLink" : ""}>Transaction History</NavLink>}
          {isUser && <NavLink to="/sentPackages" className={({ isActive }) => isActive ? "activeLink" : ""}>Sent Packages</NavLink>}
          {isLoggedIn && <NavLink to="/Profile" className={({ isActive }) => isActive ? "activeLink" : ""}>Logged in as {name}</NavLink>}
          {isLoggedIn && <NavLink to="/notification" className={({ isActive }) => isActive ? "activeLink" : ""}>Notifications</NavLink>}

        </nav>
      </div>
    </header>
  );
};

export default Header;
