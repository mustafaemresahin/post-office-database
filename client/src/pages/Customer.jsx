import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../css/customer.css';
import {useNavigate} from 'react-router-dom';


function Customer() {
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
          setData(response.data);
        } catch (error) {
          console.error('Error users:', error);
        }
      };
  
      fetchData();
    }, []);

    
    const [addFormData, setAddFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        username: '',
        password: '',
        address: '',
        phoneNumber: ''
    })

const handleAddChange = (event) => {
    const { name, value } = event.target;
    setAddFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

const navigate = useNavigate();

const handleAddSubmit = async (event) => {
    event.preventDefault();
    try {
        const response = await axios.post('/api/adminAdd',  JSON.stringify(addFormData));
        console.log('Added Users successful:', response.data);
        navigate('/login');
      } catch (error) {
        console.error('Added Users failed:', error);
      }
    };

    const updateUser = async () => {
      axios.put("/api/users" + UserID)
      .then((response) => {
          console.log(response);
          window.location.reload();
      }).catch((error) => {
          console.log(error);
      });
  };

    // Delete A User
    const deleteUser = async (UserID) => {
        axios.delete('https://post-office-database-web-795a025bc915.herokuapp.com/api/users', + UserID)
        .then((response) => {
            console.log(response);
            window.location.reload();
            navigate("/profile");
        }).catch((error) => {
            console.log(error)
        })
    };

    return (
        <div className="user-container">
            <br></br>
            <br></br>
            <h1>User information</h1>
            <table className="user-table">
                <thead>
                    <tr>
                        <th className="user-th">UserID</th>
                        <th className="user-th">Username</th>
                        <th className="user-th">Email</th>
                        <th className="user-th">First Name</th>
                        <th className="user-th">Last Name</th>
                        <th className="user-th">Address</th>
                        <th className="user-th">Phone Number</th>
                        <th className="user-th">Role</th>
                        <th className="user-th">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((user) => {
                        return (
                            <tr key={user.UserID} className="user-tr">
                                <td>{user.UserID}</td>
                             <td>{user.CustomerUser}</td>
                                <td>{user.Email}</td>
                                <td>{user.firstname}</td>
                                <td>{user.lastname}</td>
                                <td>{user.address}</td>
                                <td>{user.phonenumber}</td>
                                <td>{user.role}</td>
                                <td>
                                 <button className='btnedit'>Read</button>
                                    <button onClick={() => updateUser(user.UserID) }className='btnedit'>Edit</button>
                                    <button onClick={() => {
                                            deleteUser(user.UserID)}
                                        } className="btn-delete"> Delete </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <h2>Add new user</h2>
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
            </form>
        </div>
    )
}

export default Customer;
