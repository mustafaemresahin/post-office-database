import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/employeesanddepartments.css';

function EmployeesandDepartments() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/employeesanddepartments');
        if (!response.ok) {
          throw new Error('Data could not be fetched!');
        } else {
          const data = await response.json();
          setData(data);
        }
      } catch (error) {
        console.error('Fetching error:', error);
      }
    };

    fetchData();
  }, []); 

  return (
    <div className="employees-departments">
        <a href="/reports" className='back-button'>Back</a>
      <h2>Employee Department Assignments</h2>
      <table>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Department ID</th>
            <th>Department Address</th>
            <th>Operating Hours</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.EmployeeID}>
              <td>{row.EmployeeID}</td>
              <td>{row.Fname}</td>
              <td>{row.Lname}</td>
              <td>{row.Phone}</td>
              <td>{row.Email}</td>
              <td>{row.DepartmentID}</td>
              <td>{row.DepartmentAddress}</td>
              <td>{row.OperatingHours}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeesandDepartments;
