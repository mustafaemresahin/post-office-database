import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../css/adminUser.css';



function AdminUser() {
    const [data, setData] = useState([])
    const navigate = useNavigate();

    // useEffect(() => {
    //     axios.get('/api/users')
    //         .then(res => setData(res.data))
    //         .catch(err => console.log(err));
    // }, [])

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('/api/users');
          setData(response.data.filter(user => user.role === "User"));
        } catch (error) {
          console.error('Error users:', error);
        }
      };
  
      fetchData();
    }, []);

    

//     const updateUser = async () => {
//       axios.put("/api/users/" + userId)
//       .then((response) => {
//           console.log(response);
//           window.location.reload();
//       }).catch((error) => {
//           console.log(error);
//       });
//   };

    // Delete A User
    const handleDeleteUser = async (UserID) => {
        // Display a confirmation dialog
        const isConfirmed = window.confirm('Are you sure you want to delete this user?');
        
        // If the user confirms, proceed with the deletion
        if (isConfirmed) {
            axios.delete('/api/users/' + UserID)
                .then((response) => {
                    console.log(response);
                    window.location.reload();
                    // Use navigate() here if you're using React Router and it's defined in your context
                    // navigate("/profile");
                }).catch((error) => {
                    console.log(error)
                });
        } else {
            // If the user cancels, you can log a message or handle as needed
            console.log('User deletion cancelled');
        }
    };
    

    // const handleDeleteUser = async (userId) => {
    //   try {
    //     // Send DELETE request to delete the vehicle with the specified ID
    //     await axios.delete(`/api/userdelete/${userId}`);
    //     // Refresh list after deletion
    //     const updatedUsers = data.filter(data => data.UserID !== userId);
    //     setData(updatedUsers);
    //   } catch (error) {
    //     console.error('Error user vehicle:', error);
    //   }
    // };





    const handleClick = () => {
      // Use navigate function to navigate to the desired page
      navigate('/AddUser');
    };

    return (
        <div className="user-container">
            <h2>User information</h2>
            <button onClick={handleClick}>Add</button>
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
                        {/* <th className="user-th">Action</th> */}
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
                                <button onClick={() => handleDeleteUser(user.UserID)}>Delete</button>                               
                                </td>
                                {/* <td>
                                <button onClick={() => handleUpdateUser(user.UserID)}>Delete</button>                               
                                </td> */}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default AdminUser;
