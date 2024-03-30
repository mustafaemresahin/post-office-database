import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/register.css';
import '../css/vehicles.css';

const VehiclesTable = () => {
  const [vehicles, setVehicles] = useState([]);

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


  //done
  const handleDeleteVehicle = async (vehicleId) => {
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

  return (
    <div className='d-flex flex-column justify-content-center align-itmes-center bg-light vh-100'>
      <div className='w-75 rounded bg-white border shadow p-4'>
        <div className='d-flex justify-content-end'>
        <h1>Vehicle List</h1>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>VehicleID</th>
              <th>TimeStamp</th>
              <th>Location</th>
              <th>Status</th>
              <th>Type</th>
              <th>Unit</th>
              <td>EmployeeID</td>
            </tr>
          </thead>
          <tbody>
          {vehicles && vehicles.map((user) => {
          
                        return (
                            <tr key={user.VehicleID} className="user-tr">
                                <td>{user.VehicleID}</td>
                                <td>{user.Timestamp}</td>
                                <td>{user.Location}</td>
                                <td>{user.Status}</td>
                                <td>{user.Type}</td>
                                <td>{user.Unit}</td>
                                <td>{user.EmployeeID}</td>
                                <td>
                                  {/*<button onClick={("/addvehicles")}>Add</button>*/}
                                  <button>Edit </button>
                                  <button onClick={() => handleDeleteVehicle(user.VehicleID)}>Delete</button>                                </td>
                            </tr>
                        )
                    
                    })}
            {/* {vehicles.map(vehicle => (
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
            ))} */}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
};

export default VehiclesTable;