import React, { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';

function TotalAmountUser() {
      const [selectedUserID, setSelectedUserID] = useState('');
      const [values, setValues] = useState([]); // This should be populated as before
      const [selectedUserDetails, setSelectedUserDetails] = useState(null);
      const navigate = useNavigate();
      
      useEffect(() => {
        const fetchTotalAmount= async () => {
          try {
            const response = await axios.get('/api/amountforallusers');
            setValues(response.data);
          } catch (error) {
            console.error('Error fetching employees:', error);
          }
        };
    
        fetchTotalAmount();
      }, []);
    
      const handleChange = (e) => {
        const userID = e.target.value;
        setSelectedUserID(userID);
        // Assuming `values` includes detailed info, or you could fetch the details here
        const userDetails = values.find(user => user.UserID === userID);
        setSelectedUserDetails(userDetails);
      };

      const handleClick = () => {
        // Use navigate function to navigate to the desired page
        navigate('/reports');
      };
    
      return (
        <div className='reports-page'>
             <button onClick={handleClick}>Back</button>

            <h1>Report total amount that the selected user has spent on packages and/or store items</h1>


          {/* Existing structure */}
          <select onChange={handleChange} value={selectedUserID}>
            <option value="">Select a User</option>
            {values.map((option, index) => (
              <option key={index} value={option.UserID}>
                 {`${option.firstname} ${option.lastname}`}
              </option>
            ))}
          </select>

        
          {selectedUserDetails && (
            <table>
              <thead>
                <tr> 
                  <th>First Name</th>
                  <th>Last Name </th>
                  <th>Total Spent </th>
                </tr>
              </thead>
              <tbody>
                {/* Example details - adjust according to actual data structure */}
                <tr>
                    <td>{selectedUserDetails.firstname}</td>
                    <td>{selectedUserDetails.lastname}</td>
                    <td>{selectedUserDetails.TotalSpent}</td>
                  </tr>
                {/* Add more rows as needed based on the details you want to show */}
              </tbody>
            </table>
          )}
        </div>
      );
    }
    

export default TotalAmountUser;