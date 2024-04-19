import React, { useState } from 'react';
import axios from 'axios';
import '../css/employeeAdd.css';
import { useNavigate } from 'react-router-dom';

const EmployeeAdd = () => {
  const [employeeData, setEmployeeData] = useState({
    fname: '',
    minit: '',
    lname: '',
    ssn: '',
    dob: '',
    phone: '',
    email: '',
    address: '',
    sex: '',
    salary: '',
    role: '',
    hiredate: '',
    schedule: '',
    departmentid: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({
      ...employeeData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isConfirmed = window.confirm('Are you sure you want to add the employee?');
         if(!isConfirmed){
             return;
             }
    try {
      const response = await axios.post('/api/employeeadd', JSON.stringify(employeeData), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Employee added:', response.data);
      setEmployeeData({
        fname: '',
        minit: '',
        lname: '',
        ssn: '',
        dob: '',
        phone: '',
        email: '',
        address: '',
        sex: '',
        salary: '',
        role: '',
        hiredate: '',
        schedule: '',
        departmentid: ''
      });
      navigate("/employees");
    } catch (error) {
      console.error('Error adding employee', error);
    }
  };

  return (
    <div className="add-container">
      <div className="employeeAdd-card">
      <a href="/employees" className='back-button'>Back</a>
        <h2>Add Employee</h2>
        <form onSubmit={handleSubmit}> 
          <label htmlFor="fname">First Name:</label>
          <input type="text" id="fname" name="fname" value={employeeData.fname} onChange={handleChange} placeholder='Enter First Name'/>
          
          <label htmlFor="minit">Middle Initial:</label>
          <input type="text" id="minit" name="minit" value={employeeData.minit} onChange={handleChange} maxLength="1" placeholder='Enter Middle Initial'/>
          
          <label htmlFor="lname">Last name:</label>
          <input type="text" id="lname" name="lname" value={employeeData.lname} onChange={handleChange} placeholder='Enter Last Name' />
         
          <label htmlFor="ssn">SSN:</label>
          <input type="text" id="ssn" name="ssn" value={employeeData.ssn} onChange={handleChange} maxLength="9" pattern="\d{9}" placeholder='Enter 9-digit SSN' />
               
          <label htmlFor="dob">Date of Birth:</label>
          <input type="date" id="dob" name="dob" value={employeeData.dob} onChange={handleChange}/>
         
          <label htmlFor="phone">Phone:</label>
          <input type="tel" id="phone" name="phone" value={employeeData.phone} onChange={handleChange} placeholder='Enter Phone Number'/>
  
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={employeeData.email} onChange={handleChange} />
         
          <label htmlFor="address">Address:</label>
          <input type="text" id="address" name="address" value={employeeData.address} onChange={handleChange} placeholder='Enter Address'/>
         
          <label htmlFor="sex">Sex:</label>
          <select id="sex" name="sex" value={employeeData.sex} onChange={handleChange}>
            <option value="">Select</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="O">Other</option>
          </select>

          <label htmlFor="salary">Salary:</label>
          <input type="number" id="salary" name="salary" value={employeeData.salary} onChange={handleChange} placeholder='Enter Salary'/>
  
          <label htmlFor="role">Role:</label>
          <select id="role" name="role" value={employeeData.role} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Service Clerk">Service Clerk</option>
            <option value="Driver">Driver</option>
            <option value="Manager">Manager</option>
          </select>
  
          <label htmlFor="hiredate">Hire Date:</label>
          <input type="date" id="hiredate" name="hiredate" value={employeeData.hiredate} onChange={handleChange}/>
         
          <button type="submit">Add Employee</button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeAdd;
