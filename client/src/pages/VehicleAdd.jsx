import React, { useState } from 'react';
import axios from 'axios';
import '../css/register.css';
import '../css/vehicles.css';

const VehicleAdd = () => {
  const [vehicleData, setVehicleData] = useState({
   // make: '',
    //model: '',
    //year: '',
    type: '',
    unit: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicleData({
      ...vehicleData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/vehicleadd', JSON.stringify(vehicleData), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Vehicle added:', response.data);
      // Optionally, reset the form after successful submission
      setVehicleData({
        type: '',
        unit: ''
      });
    } catch (error) {
      console.error('Error adding vehicle:', error);
    }
  };

  return (
    <div className="registration-container">
    <div className="vehicle-card">
      <h2>Add Vehicle</h2>
      <form onSubmit={handleSubmit}>
{/*
      <label htmlFor="year">Year:</label>
        <input type="text" id="year" name="year" value={vehicleData.year} onChange={handleChange} />
        <label htmlFor="make">Make:</label>
        <input type="text" id="make" name="make" value={vehicleData.make} onChange={handleChange} />
        <label htmlFor="model">Model:</label>
        <input type="text" id="model" name="model" value={vehicleData.model} onChange={handleChange} />
  */}
  
        <label htmlFor="type">type:</label>
        <input type="text" id="type" name="type" value={vehicleData.type} onChange={handleChange} />
        <label htmlFor="unit">unit:</label>
        <input type="text" id="unit" name="unit" value={vehicleData.unit} onChange={handleChange} />
  
        <button type="submit">Add Vehicle</button>
      </form>
    </div>
    </div>
  );
};

export default VehicleAdd;