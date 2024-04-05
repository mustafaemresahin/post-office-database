import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const VehicleEdit = () => {
  const { vehicleId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    location: '',
    status: '',
    unit: ''
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleEditVehicle = async () => {
    try {
      const response = await axios.put(`/api/vehicleEdit/${vehicleId}`);
      console.log('Vehicle updated successfully:', response.data);
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
          <input type="text" name="location" value={formData.location} onChange={handleChange} />
        </label>
        <label>
          Status:
          <input type="text" name="status" value={formData.status} onChange={handleChange} />
        </label>
        <label>
          Unit:
          <input type="text" name="unit" value={formData.unit} onChange={handleChange} />
        </label>
        <button type="submit">Update Vehicle</button>
      </form>
      {/* Button to navigate back to the vehicle list */}
      <button onClick={() => navigate("/vehicles")}>Back to Vehicle List</button>
    </div>
  );
};

export default VehicleEdit;