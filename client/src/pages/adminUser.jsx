import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../css/adminUser.css';



function AdminUser() {
    const [data, setData] = useState([])

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

    
    // const [addFormData, setAddFormData] = useState({
    //     firstname: '',
    //     lastname: '',
    //     email: '',
    //     username: '',
    //     password: '',
    //     address: '',
    //     phoneNumber: ''
    // })

// const handleAddChange = (event) => {
//     const { name, value } = event.target;
//     setAddFormData(prevState => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };


// const handleAddSubmit = async (event) => {
//     event.preventDefault();
//     try {
//         const response = await axios.post('/api/adminAdd',  JSON.stringify(addFormData));
//         console.log('Added Users successful:', response.data);
//         navigate('/login');
//       } catch (error) {
//         console.error('Added Users failed:', error);
//       }
//     };

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
    // const deleteUser = async (UserID) => {
    //     axios.delete('/api/users/' + UserID)
    //     .then((response) => {
    //         console.log(response);
    //         window.location.reload();
    //         navigate("/profile");
    //     }).catch((error) => {
    //         console.log(error)
    //     })
    // };

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

    return (
        <div className="user-container">
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
                                {/* <td>
                                <button onClick={() => handleDeleteUser(user.UserID)}>Delete</button>                               
                                </td> */}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {/* <h2>Add new user</h2>
            <form onSubmit={handleAddSubmit}>

            <div>
              <label htmlFor="firstname">First Name:</label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={addFormData.firstname}
                onChange={handleAddChange}
                required
              />
            </div>
            <div>
              <label htmlFor="lastname">Last Name:</label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={addFormData.lastname}
                onChange={handleAddChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={addFormData.email}
                onChange={handleAddChange}
                required
              />
            </div>
            <div>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={addFormData.username}
                onChange={handleAddChange}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={addFormData.password}
                onChange={handleAddChange}
                required
              />
            </div>
            <div>
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                name="address"
                value={addFormData.address}
                onChange={handleAddChange}
                required
              />
            </div>
            <div>
              <label htmlFor="phoneNumber">Phone Number:</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={addFormData.phoneNumber}
                onChange={handleAddChange}
                required
              />
            </div>
                <button type="submit">Add</button>
            </form> */}
        </div>
    )
}

export default AdminUser;
