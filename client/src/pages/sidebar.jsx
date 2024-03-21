import React, { useState } from 'react';
import "../css/sidebar.css";
import { useNavigate } from 'react-router-dom';


export default function Sidebar() {

  const handleNavigate = useNavigate();



  return (
    <div className="AdminDashboard">
      <div className="sidebar">
        <li onClick={() => handleNavigate('/')}>Dashboard</li>
          <li onClick={() => handleNavigate('/products')}>Products</li>
          <li onClick={() => handleNavigate('/orders')}>Orders</li>
      </div>
      <div className="main-content">
        <h2>Welcome Admin Dashboard</h2> 
       </div>
    </div>
  );
}
