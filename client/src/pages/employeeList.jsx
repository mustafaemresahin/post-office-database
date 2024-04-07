import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/employeeList.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('/api/employees');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className='container'>
        <h1 className='title'>Employee List</h1>
        <div className='table-responsive'>
          <table className='table'>
            <thead>
              <tr className='table-header'>
                <th className='header-item'>EmployeeID</th>
                <th className='header-item'>First Name</th>
                <th className='header-item'>Middle Init</th>
                <th className='header-item'>Last Name</th>
                <th className='header-item'>SSN</th>
                <th className='header-item'>Phone Number</th>
                <th className='header-item'>Email</th>
                <th className='header-item'>Address</th>
                <th className='header-item'>Sex</th>
                <th className='header-item'>Salary</th>
                <th className='header-item'>Role</th>
                <th className='header-item'>Department ID</th>
                <th className='header-item'>Hire Date</th>
                <th className='header-item'>DOB</th>
                <th className='header-item'>Schedule</th>
              </tr>
            </thead>
            <tbody>
            {employees && employees.map((employee) => (
                <tr key={employee.EmployeeID}>
                  <td>{employee.EmployeeID}</td>
                    <td>{employee.Fname}</td>
                    <td>{employee.Minit}</td>
                    <td>{employee.Lname}</td>
                    <td>{employee.Ssn}</td>
                    <td>{employee.Phone}</td>
                    <td>{employee.Email}</td>
                    <td>{employee.Address}</td>
                    <td>{employee.Sex}</td>
                    <td>{employee.Salary}</td>
                    <td>{employee.role}</td>
                    <td>{employee.DepartmentID}</td>
                    <td>{employee.HireDate ? new Date(employee.HireDate).toLocaleDateString("en-US") : ''}</td>
                    <td>{employee.Dob ? new Date(employee.Dob).toLocaleDateString("en-US") : ''}</td>
                </tr>
              )
          
            )}
            </tbody>
          </table>
          <div className='button-div'>
            <a href="/addEmployee" className='add-employee'>Add Employee</a>
          </div>
        </div>
        </div>

  );
};

export default EmployeeList;
