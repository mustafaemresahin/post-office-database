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
            {employees && employees.map((employee) => {
              return (
                <tr key={employee.EmployeeID} className="table-row">
                    <td className='row-item'>{employee.EmployeeID}</td>
                    <td className='row-item'>{employee.Fname}</td>
                    <td className='row-item'>{employee.Minit}</td>
                    <td className='row-item'>{employee.Lname}</td>
                    <td className='row-item'>{employee.Ssn}</td>
                    <td className='row-item'>{employee.Phone}</td>
                    <td className='row-item'>{employee.Email}</td>
                    <td className='row-item'>{employee.Address}</td>
                    <td className='row-item'>{employee.Sex}</td>
                    <td className='row-item'>{employee.Salary}</td>
                    <td className='row-item'>{employee.role}</td>
                    <td className='row-item'>{employee.DepartmentID}</td>
                    <td className='row-item'>{new Date(employee.HireDate).toLocaleDateString("en-US")}</td>
                    <td className='row-item'>{new Date(employee.Dob).toLocaleDateString("en-US")}</td>
                    <td className='row-item'>{employee.Schedule}</td>
                </tr>
              )
          
            })}
            </tbody>
          </table>
        </div>
    </div>
  );
};

export default EmployeeList;
