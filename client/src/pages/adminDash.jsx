import React, { useEffect, useState } from "react";
import '../css/adminDash.css';
import axios from 'axios';


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

      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <a href="/adminDash">
            Dashboard
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="/adminPack">
            Packages
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="/vehicles">
            Vehicles
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="/adminUser">
            Customers
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="/employees">
            Employees
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="/adminStoreItems">
            Items
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="/reports">
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

  const [userCount, setUsers] = useState(null);
  const [itemCount, setItems] = useState(null);
  const [inventoryCount, setInventoryCount] = useState(null);
  const [vehicleCount, setVehicleCount] = useState(null);
  const [employeeCount, setEmployeeCount] = useState(null);
  const [packageCount, setPackageCount] = useState(null);
  const [departmentCount, setDepartmentCount] = useState(null);

  // Fetch counts from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await axios.get('/api/users');
        const items = await axios.get('/api/storeitem');
        const vehicles = await axios.get('/api/vehiclelist');
        const employees = await axios.get('/api/employees');
        const packages = await axios.get('/api/package');
        const departments = await axios.get('/api/departments');

        // Update state with the fetched counts
        const usersCount = users.data.filter(user => user.role === "User").length;
        setUsers(usersCount);

        setItems(items.data.length);

        setVehicleCount(vehicles.data.length);

        const totalInventory = items.data.reduce((acc, currentItem) => acc + currentItem.Inventory, 0);
        setInventoryCount(totalInventory);

        setEmployeeCount(employees.data.length);

        setPackageCount(packages.data.length);

        setDepartmentCount(departments.data.length);

      } catch (error) {
        console.error('Failed to fetch counts:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3 className='header-dashboard'>DASHBOARD</h3>
      </div>

      <div className='main-cards'>
      <div className='card'>
          <div className='card-inner'>
            <h3>CUSTOMERS</h3>
          </div>
          <h1>{userCount}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>INVENTORY</h3>
          </div>
          <h1>{inventoryCount}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>STORE ITEMS</h3>
          </div>
          <h1>{itemCount}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>VEHICLES</h3>
          </div>
          <h1>{vehicleCount}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>EMPLOYEES</h3>
          </div>
          <h1>{employeeCount}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>PACKAGES</h3>
          </div>
          <h1>{packageCount}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>DEPARTMENTS</h3>
          </div>
          <h1>{departmentCount}</h1>
        </div>
      </div>
    </main>
  );
}

export default AdminApp;
