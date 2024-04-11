import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ReportEmployeePackage() {
  const [selectedUserID, setSelectedUserID] = useState('all'); // Default to 'all'
  const [values, setValues] = useState([]); // This will be populated with data from your API
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTotalAmount = async () => {
      try {
        const response = await axios.get('/api/employeepackage');
        setValues(response.data);
      } catch (error) {
        console.error('Error fetching total amount:', error);
      }
    };

    fetchTotalAmount();
  }, []);

  const handleChange = (e) => {
    setSelectedUserID(e.target.value);
  };

  const handleClick = () => {
    navigate('/reports');
  };

  // Filter or find the user details based on the selection
  const selectedUserDetails = selectedUserID === 'all'
    ? values
    : values.filter(user => user.EmployeeID === selectedUserID);

  return (
    <div className='reports-page'>
      <button onClick={handleClick}>Back</button>
      <h1>Report on employee working on total package</h1>
      <select onChange={handleChange} value={selectedUserID}>
        <option value="">Select a User</option>
        <option value="all">All Users</option>
        {values.map((option, index) => (
          <option key={index} value={option.EmployeeID}>
            {`${option.Fname} ${option.Lname}`}
          </option>
        ))}
      </select>

      <table>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Type</th>
            <th>Works on total packages</th>
          </tr>
        </thead>
        <tbody>
          {selectedUserDetails.map((user, index) => (
            <tr key={index}>
                <td>{user.EmployeeID}</td>
                <td>{user.Fname}</td>
                <td>{user.Lname}</td>
                <td>{user.Email}</td>
                <td>{user.Phone}</td>
                <td>{user.Type}</td>
                <td>{user.TotalPackages}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReportEmployeePackage;
