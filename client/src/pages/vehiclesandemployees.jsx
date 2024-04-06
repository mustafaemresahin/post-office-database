import React, { useState, useEffect } from 'react';
import '../css/vehiclesAndEmployees.css';

function Vehiclesandemployees() {
  const [vehiclesEmployees, setVehiclesEmployees] = useState([]);

  useEffect(() => {
    const fetchVehiclesAndEmployees = async () => {
      try {
        const response = await fetch('/api/vehiclesandemployees');
        if (!response.ok) throw new Error('Data could not be fetched');
        const data = await response.json();
        setVehiclesEmployees(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchVehiclesAndEmployees();
  }, []);

  return (
    <div className="vehicles-employees-container">
        <a href="/reports" className='back-button'>Back</a>
      <h2>Vehicles and Their Assigned Employees</h2>
      <table>
        <thead>
          <tr>
            <th>Vehicle ID</th>
            <th>Location</th>
            <th>Status</th>
            <th>Type</th>
            <th>Employee ID</th>
            <th>Employee Name</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {vehiclesEmployees.map((ve, index) => (
            <tr key={index}>
              <td>{ve.VehicleID}</td>
              <td>{ve.Location}</td>
              <td>{ve.Status}</td>
              <td>{ve.Type}</td>
              <td>{ve.EmployeeID}</td>
              <td>{`${ve.Fname} ${ve.Lname}`}</td>
              <td>{ve.Phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Vehiclesandemployees;
