import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const VehicleEdit = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    location: '',
    status: '',
    unit: ''
  });


  const handleChange = (event) => {
    const { name, value, type } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? event.target.checked : value,
    }));
  };

  const handleEditVehicle = async () => {
    try {
      const response = await axios.put('/api/vehicleEdit', formData);
      console.log('Vehicle updated successfully:', response.data);
      localStorage.removeItem('editVehicleId');
      navigate("/vehicles")
      //const updatedVehicles = updatedResponse.data;
      //setVehicles(updatedVehicles);
    } catch (error) {
      console.error('Failed to update vehicle', error);
      // Handle error, show error message, etc.
    }
  };

  return (
    <div>
      <h2>Edit Vehicle</h2>
      <form onSubmit={handleEditVehicle}>
        <label>
          Location:
          <input type="string" id="location" name="location" value={formData.location} onChange={handleChange} />
        </label>
        <label>
          Status:
          <input type="string" id = "status" name="status" value={formData.status} onChange={handleChange} />
        </label>
        <label>
          Unit:
          <input type="string" id = "unit" name="unit" value={formData.unit} onChange={handleChange} />
        </label>
        <button type="submit">Update Vehicle</button>
      </form>
      {/* Button to navigate back to the vehicle list */}
      <button onClick={() => navigate("/vehicles")}>Back to Vehicle List</button>
    </div>
  );
};

export default VehicleEdit;