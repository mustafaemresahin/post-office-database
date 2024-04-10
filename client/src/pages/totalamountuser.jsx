import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function TotalAmountUser() {
  const [selectedUserID, setSelectedUserID] = useState('all'); // Default to 'all'
  const [values, setValues] = useState([]); // This will be populated with data from your API
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTotalAmount = async () => {
      try {
        const response = await axios.get('/api/amountforallusers');
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
    : values.filter(user => user.UserID === selectedUserID);

  return (
    <div className='reports-page'>
      <button onClick={handleClick}>Back</button>
      <h1>Report on total amount spent</h1>
      <select onChange={handleChange} value={selectedUserID}>
        <option value="">Select a User</option>
        <option value="all">All Users</option>
        {values.map((option, index) => (
          <option key={index} value={option.UserID}>
            {`${option.firstname} ${option.lastname}`}
          </option>
        ))}
      </select>

      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Total Spent</th>
          </tr>
        </thead>
        <tbody>
          {selectedUserDetails.map((user, index) => (
            <tr key={index}>
              <td>{user.UserID}</td>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.TotalSpent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TotalAmountUser;
