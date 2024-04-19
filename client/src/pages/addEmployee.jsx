import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/addEmployee.css';

const AddEmployee = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [selectedRoles, setSelectedRoles] = useState({});

    const handleRoleSelection = (userId, newRole) => {
        setSelectedRoles((prevSelectedRoles) => ({
        ...prevSelectedRoles,
        [userId]: newRole,
        }));
    };

    useEffect(() => {
      const fetchData = async () => {
        try {
            const response = await axios.get('/api/users');
            const usersWithRoleUser = response.data.filter(user => user.role === "User");
            setData(usersWithRoleUser);
        } catch (error) {
          console.error('Error users:', error);
        }
      };
  
      fetchData();
    }, []);

    const handleChangeRole = async (user) => {
        const isConfirmed = window.confirm('Are you sure you want to change the role ');
         if(!isConfirmed){
             return;
             }
        if (selectedRoles[user.UserID]) {
            try {
                const newRole = selectedRoles[user.UserID];
                const response = await axios.post(`/api/users/changerole`, {
                    ...user, 
                    newRole
                });
                console.log(response);
                console.log(`Update ${user.UserID} role to ${newRole}`);
                navigate('/employees');
            } catch (error) {
                console.error('Error changing user role:', error);
            }
        }
    };

  return (
    <div className="user-container">
        <a href="/employees" className='back-button'>Back</a>
            <h2>User information</h2>
            <table>
                <thead>
                    <tr>
                        <th>UserID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Address</th>
                        <th>Phone Number</th>
                        <th>Role</th>
                        <th>Employee Role</th>
                        <th>Make Employee</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((user) => {
                        return (
                            <tr key={user.UserID}>
                                <td>{user.UserID}</td>
                                <td>{user.CustomerUser}</td>
                                <td>{user.Email}</td>
                                <td>{user.firstname}</td>
                                <td>{user.lastname}</td>
                                <td>{user.address}</td>
                                <td>{user.phonenumber}</td>
                                <td>{user.role}</td>
                                <td>
                                    <select
                                        style={{'min-width':'100px'}}
                                        value={selectedRoles[user.UserID] || ''}
                                        onChange={(e) => handleRoleSelection(user.UserID, e.target.value)}
                                        >
                                        <option value="" disabled>Select role</option>
                                        <option value="driver">Driver</option>
                                        <option value="manager">Manager</option>
                                        <option value="service clerk">Service Clerk</option>
                                    </select>
                                </td>
                                <td>
                                    <button onClick={() => handleChangeRole(user)}>Make Employee</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
    </div>
  );
};

export default AddEmployee;
