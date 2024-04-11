import React, { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';

function PackageReport() {
      const [selectedUserID, setSelectedUserID] = useState('');
      const [values, setValues] = useState([]); // This should be populated as before
      // const [selectedUserDetails, setSelectedUserDetails] = useState(null);
      const navigate = useNavigate();
      
      useEffect(() => {
        const fetchPackage= async () => {
          try {
            const response = await axios.get('/api/packageinfo');
            setValues(response.data);
          } catch (error) {
            console.error('Error fetching employees:', error);
          }
        };
    
        fetchPackage();
      }, []);
    
      const handleChange = (e) => {
        setSelectedUserID(e.target.value);
      };

      const handleClick = () => {
        navigate('/reports');
      };

      const selectedUserDetails = selectedUserID === 'all'
      ? values
      : values.filter(user => user.UserID === selectedUserID);
  
    
      return (
        <div className='reports-page'>
             <button onClick={handleClick}>Back</button>
            <h1>Report on packages</h1>
          <select onChange={handleChange} value={selectedUserID}>
            <option value="">Select a User</option>
            <option value="all">All Users</option>
            {values.map((option, index) => (
              <option key={index} value={option.UserID}>
                {`${option.firstname} ${option.lastname}`}
              </option>
            ))}
          </select>
          {/* <h2>Details for User: {selectedUserDetails.firstname} {selectedUserDetails.lastname}</h2> */}
        
          {selectedUserDetails && (
            <table>
              <thead>
                <tr> 
                  <th>User ID</th>
                  <th>First Name</th>
                  <th>Last Name </th>
                  <th>Email</th>
                  <th>Total Packages</th>
                  <th>Pending Packages</th>
                  <th>Accepted Packages</th>
                  <th>Delivered Packages</th>
                </tr>
              </thead>
              <tbody>
                {selectedUserDetails.map((user, index) => (
                   <tr key={index}>

                  <td>{user.UserID}</td>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.Email}</td>
                  <td>{user.TotalPackages}</td>
                  <td>{user.PendingPackages}</td>
                  <td>{user.AcceptedPackages}</td>
                  <td>{user.DeliveredPackages}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      );
    }
    

export default PackageReport;

