import React, { useState } from 'react';
import '../css/sidebar.css';
import { Link } from "react-router-dom"



function AdminApp() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <Home />
    </div>
  );
}

function Header({ OpenSidebar }) {
  return (
    <header className='header'>
      <div className='menu-toggle' onClick={OpenSidebar}>
        <span className='icon'></span>
      </div>
      <div className='header-title'>Admin Panel</div>
    </header>
  );
}

function Sidebar({ openSidebarToggle, OpenSidebar }) {
 

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
         <Link to="/shop">Shop</Link>
        </div>
        <span className='icon close_icon' onClick={OpenSidebar}>X</span>
      </div>

      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <a href="/sidebar">
            Dashboard
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="">
            Products
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="">
            Categories
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="/customer">
            Customers
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="">
            Inventory
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="">
            Reports
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="/profile">
            Profile
          </a>
        </li>
      </ul>
    </aside>
  );
}

function Home() {
  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>DASHBOARD</h3>
      </div>

      <div className='main-cards'>
        <div className='card'>
          <div className='card-inner'>
            <h3>PRODUCTS</h3>
          </div>
          <h1>300</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>CATEGORIES</h3>
          </div>
          <h1>12</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>CUSTOMERS</h3>
          </div>
          <h1>33</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>ALERTS</h3>
          </div>
          <h1>42</h1>
        </div>
      </div>
    </main>
  );
}

export default AdminApp;
