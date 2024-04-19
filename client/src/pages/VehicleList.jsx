import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';
import '../css/vehicles.css';

const VehiclesTable = () => {
  const navigate = useNavigate();

  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  //const navigate = useNavigate();

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get('/api/vehiclelist');
        setVehicles(response.data);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };

    fetchVehicles();
  }, []);


  // added here for employees drop down menu
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
      const response = await axios.get('/api/employeeDrivers');
      setDrivers(response.data);
      } catch (error) {
      console.error('Error fetching drivers:', error);
      }
    };
    
    fetchDrivers();
    }, []);
    console.log('drivers:',drivers);

    const handleSetDriver = async (VehicleID, DriverID) => {
      try {
        const response = await axios.put(`/api/vehiclelist/${VehicleID}`, { EmployeeID: DriverID });
        console.log(response);
        console.log('Update success:', response.data);
  
        // Update both the local state and local storage
        const updatedVehicles = vehicles.map(user => user.VehicleID === VehicleID ? { ...user, EmployeeID: DriverID } : user);
        setVehicles(updatedVehicles);
        localStorage.setItem('vehicles', JSON.stringify(updatedVehicles));
      } catch (error) {
        console.error('Error designating driver:', error);
      }
    };


  const handleDeleteVehicle = async (vehicleId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this vehicle?');
    if(!isConfirmed){
      return;
    }
    try {
      // Send DELETE request to delete the vehicle with the specified ID
      await axios.delete(`/api/vehicledelete/${vehicleId}`);
      // Refresh list after deletion
      const updatedVehicles = vehicles.filter(vehicle => vehicle.VehicleID !== vehicleId);
      setVehicles(updatedVehicles);
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
  };

 const handleVehicleEdit = (event, vehicleID, location, status, unit) => {
  event.preventDefault();
  // Set the vehicle ID in local storage
  localStorage.setItem('editVehicleId', vehicleID);
  localStorage.setItem('location', location);
  localStorage.setItem('status', status);
  localStorage.setItem('unit', unit);
  // Navigate to the vehicle edit page
  navigate('/vehicleEdit');
  };

  return (
    <div className='vehicles-employees-container'>
      <div className='inner'>
        <h1>Vehicle List</h1>
        <div className='add-vehicle-div'>
          <Link to="/addvehicles" className="add-vehicle-link">Add Vehicle</Link>
        </div>
        <table className='vehicles-table table-striped'>
          <thead>
            <tr>
              <th>VehicleID</th>
              <th>TimeStamp</th>
              <th>Location</th>
              <th>Status</th>
              <th>Type</th>
              <th>Unit</th>
              <th>EmployeeID</th>
            </tr>
          </thead>
          <tbody>
          {vehicles && vehicles.map((user) => {
          
                        return (
                            <tr key={user.VehicleID} className="user-tr">
                                <td>{user.VehicleID}</td>
                                <td>{(new Date(user.Timestamp).toLocaleString("en-US", { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }))}</td>
                                <td>{user.Location}</td>
                                <td>{user.Status}</td>
                                <td>{user.Type}</td>
                                <td>{user.Unit}</td>
                                <br></br>
                                <select onChange={(e) => handleSetDriver(user.VehicleID, e.target.value)} value={user.EmployeeID || ''} style={{'min-width':'220px', display:'block', margin: 'auto', textAlign: 'center'}}>
  						                    <option value="">Driver</option>
  						                    {drivers.map((driver) => (
    					                    <option key={driver.EmployeeID} value={driver.EmployeeID}>
      				                		{`${driver.EmployeeID} - ${driver.Fname+' '+driver.Lname}`}
    					                    </option>
  				                    		))}
					                      </select>
                                <td>
                                  <button onClick={(event) => handleVehicleEdit(event, user.VehicleID, user.Location, user.Status, user.Unit)}>Edit</button>
                                  <button onClick={() => handleDeleteVehicle(user.VehicleID)}>Delete</button>
                                </td>
                            </tr>
                        )
                    
                    })}
          </tbody>
        </table>
        {/* <div className='add-vehicle-div'>
          <Link to="/addvehicles" className="add-vehicle-link">Add Vehicle</Link>
        </div> */}
        
      </div>
    </div>
  );
  
};

export default VehiclesTable;