import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';
import '../css/vehicles.css';

const VehiclesTable = () => {
  const navigate = useNavigate();

  const [vehicles, setVehicles] = useState([]);
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

 const handleVehicleEdit = (event, vehicleID) => {
  event.preventDefault();
  // Set the vehicle ID in local storage
  localStorage.setItem('editVehicleId', vehicleID);
  // Navigate to the vehicle edit page
  navigate('/vehicleEdit');
  };

  return (
    <div className='vehicles-employees-container'>
      <div className='inner'>
        <h1>Vehicle List</h1>
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
                                <td>{user.EmployeeID}</td>
                                <td>
                                  <button onClick={(event) => handleVehicleEdit(event, user.VehicleID)}>Edit</button>
                                  <button onClick={() => handleDeleteVehicle(user.VehicleID)}>Delete</button>
                                </td>
                            </tr>
                        )
                    
                    })}
          </tbody>
        </table>
        <div className='add-vehicle-div'>
          <Link to="/addvehicles" className="add-vehicle-link">Add Vehicle</Link>
        </div>
        
      </div>
    </div>
  );
  
};

export default VehiclesTable;