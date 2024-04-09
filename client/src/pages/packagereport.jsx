import React, { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';

function PackageReport() {
      const [selectedUserID, setSelectedUserID] = useState('');
      const [values, setValues] = useState([]); // This should be populated as before
      const [selectedUserDetails, setSelectedUserDetails] = useState(null);
      const navigate = useNavigate();
      
      useEffect(() => {
        const fetchTotalAmount= async () => {
          try {
            const response = await axios.get('/api/packageinfo');
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
        navigate('/reports');
      };
    
      return (
        <div className='reports-page'>
             <button onClick={handleClick}>Back</button>
            <h1>Report on packages</h1>
          <select onChange={handleChange} value={selectedUserID}>
            <option value="">Select a User</option>
            {values.map((option, index) => (
              <option key={index} value={option.UserID}>
                {`${option.UserID} - ${option.firstname} ${option.lastname}`}
              </option>
            ))}
          </select>
          <h2>Details for User: {selectedUserID}</h2>
        
          {selectedUserDetails && (
            <table>
              <thead>
                <tr> 
                  <th>First Name</th>
                  <th>Last Name </th>
                  <th>Total Packages</th>
                  <th>Pending Packages</th>
                  <th>Accepted Packages</th>
                  <th>Delivered Packages</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                    <td>{selectedUserDetails.firstname}</td>
                    <td>{selectedUserDetails.lastname}</td>
                    <td>{selectedUserDetails.TotalPackages}</td>
                    <td>{selectedUserDetails.PendingPackages}</td>
                    <td>{selectedUserDetails.AcceptedPackages}</td>
                    <td>{selectedUserDetails.DeliveredPackages}</td>
                  </tr>
              </tbody>
            </table>
          )}
        </div>
      );
    }
    

export default PackageReport;