import React, { useState } from 'react';
import axios from 'axios';
import '../css/vehicles.css';
import { useNavigate } from 'react-router-dom';

const VehicleAdd = () => {
  const [vehicleData, setVehicleData] = useState({
    location: '',
    status: '',
    type: '',
    unit: '',
    employeeID: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicleData({
      ...vehicleData,
      [name]: value,
    });
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/vehicleadd', JSON.stringify(vehicleData), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Vehicle added:', response.data);
      // reset form after successful submit
      setVehicleData({
        location:'',
        status:'',
        type: '',
        unit: '',
        employeeID:''
      });
      navigate("/vehicles");
    } catch (error) {
      console.error('Error adding vehicle:', error);
    }
  };

  return (
    <div className="registration-container">
    <div className="vehicle-card">
      <h2>Add Vehicle</h2>
      <form onSubmit={handleSubmit}> 
        <label htmlFor="location">Location:</label>
        <input type="text" id="location" name="location" value={vehicleData.location} onChange={handleChange} />
        <label htmlFor="status">Status:</label>
        <input type="text" id="status" name="status" value={vehicleData.status} onChange={handleChange} />
        <label htmlFor="type">type:</label>
        <input type="text" id="type" name="type" value={vehicleData.type} onChange={handleChange} />
        <label htmlFor="unit">unit:</label>
        <input type="text" id="unit" name="unit" value={vehicleData.unit} onChange={handleChange} />
        <label htmlFor="employeeID">Employee ID:</label>
        <input type="text" id="employeeID" name="employeeID" value={vehicleData.employeeID} onChange={handleChange} />
        <button type="submit">Add Vehicle</button>
      </form>
    </div>
    </div>
  );
};

export default VehicleAdd;