import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/register.css';
import '../css/vehicles.css';

const VehiclesTable = () => {
  const [vehicles, setVehicles] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);

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

  const toggleRowExpansion = (rowId) => {
    if (expandedRows.includes(rowId)) {
      setExpandedRows(expandedRows.filter(id => id !== rowId));
    } else {
      setExpandedRows([...expandedRows, rowId]);
    }
  };

  const renderAdditionalInfo = (vehicle) => {
    if (expandedRows.includes(vehicle.id)) {
      return (
        <tr className="tr-padded" key={vehicle.id + '-info'}>
          <td colSpan="4">
            {/*
            <p>Make: {vehicle.make}</p>
            <p>Model: {vehicle.model}</p>
      <p>Year: {vehicle.year}</p> */}
              <p>type: {vehicle.type}</p>
              <p>unit: {vehicle.unit}</p> 
          </td>
        </tr>
      );
    }
    return null;
  };

  //not done
  const handleDeleteVehicle = async (vehicleId) => {
    try {
      // Send DELETE request vehicle
      await axios.delete(`/api/vehicles/${vehicleId}`);
      // Refresh list after deletion
      const updatedVehicles = vehicles.filter(vehicle => vehicle.id !== vehicleId);
      setVehicles(updatedVehicles);
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
  };

  return (
    <div className="registration-container">
      <div className="vehicle-card">
        <h1>Vehicle List</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map(vehicle => (
              <React.Fragment key={vehicle.id}>
                <tr onClick={() => toggleRowExpansion(vehicle.id)}>
                  <td>{vehicle.id}</td>
                  <td>Vehicle {vehicle.id}</td>
                  <td>
                    <button onClick={() => handleDeleteVehicle(vehicle.id)}>Delete</button>
                  </td>
                </tr>
                {renderAdditionalInfo(vehicle)}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VehiclesTable;