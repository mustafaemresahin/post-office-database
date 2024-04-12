import React, { useState } from 'react';
import axios from 'axios';
import '../css/vehicles.css';
import { useNavigate } from 'react-router-dom';

const EmployeeAdd = () => {
  const [employeeData, setEmployeeData] = useState({
    fname:'',
    minit:'',
    lname: '',
    ssn: '',
    dob:'',
    phone:'',
    email:'',
    address:'',
    sex:'',
    salary:'',
    role: '',
    hiredate:'',
    scedule:'',
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
    try {
      const response = await axios.post('/api/employeeadd', JSON.stringify(employeeData), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Employee added:', response.data);
      // reset form after successful submit
      setEmployeeData({
        fname:'',
        minit:'',
        lname: '',
        ssn: '',
        dob:'',
        phone:'',
        email:'',
        address:'',
        sex:'',
        salary:'',
        role: '',
        hiredate:'',
        scedule:'',
        departmentid: ''
      });
      navigate("/employees");
    } catch (error) {
      console.error('Error adding employee', error);
    }
  };

  return (
    <div className="registration-container">
    <div className="vehicle-card">
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}> 
        <label htmlFor="fname">First Name:</label>
        <input type="text" id="fname" name="fname" value={employeeData.fname} onChange={handleChange}
        placeholder='Enter First Name'/>
        
        <label htmlFor="minit">Middle Initial:</label>
        <input type="text" id="minit" name="minit" value={employeeData.minit} onChange={handleChange} 
        maxlength="1" placeholder='Enter Middle Initial'
        />
        
        <label htmlFor="lname">Last name:</label>
        <input type="text" id="lname" name="lname" value={employeeData.lname} onChange={handleChange}
        placeholder='Enter Last Name' />
       
        <label htmlFor="ssn">SSN:</label>
        <input type="text" id="ssn" name="ssn" value={employeeData.ssn} onChange={handleChange} 
         maxLength="9" placeholder='Enter 9-digit SSN' />
             
        <label htmlFor="dob">Date of Birth:</label>
        <input type="text" id="dob" name="dob" value={employeeData.dob} onChange={handleChange} 
        maxLength="10" pattern="\d{10}"placeholder='Enter YYYY-MM-DD'/>
       
        <label htmlFor="phone">Phone:</label>
        <input type="text" id="phone" name="phone" value={employeeData.phone} onChange={handleChange} placeholder='Enter Phone Number'/>

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={employeeData.email} onChange={handleChange} />
       
        <label htmlFor="address">Address:</label>
        <input type="text" id="address" name="address" value={employeeData.address} onChange={handleChange} 
        placeholder='Enter Address'/>
       
        <label htmlFor="sex">Sex:</label>
        <input type="text" id="sex" name="sex" value={employeeData.sex} onChange={handleChange} 
        maxLength={1} placeholder='Male(M) or Female(F)'/>

        <label htmlFor="salary">Salary:</label>
        <input type="text" id="salary" name="salary" value={employeeData.salary} onChange={handleChange} />

        <label htmlFor="role">Role:</label>
        <input type="text" id="role" name="role" value={employeeData.role} onChange={handleChange} 
        placeholder='Enter Role: e.g.: Service Clerk, Driver, Manager'/>

        <label htmlFor="hiredate">Hire Date:</label>
        <input type="text" id="hiredate" name="hiredate" value={employeeData.hiredate} onChange={handleChange} 
        maxLength={10} placeholder='YYYY-MM-DD'/>
       
        <button type="submit">Add Employee</button>
      </form>
    </div>
    </div>
  );
};

export default EmployeeAdd;