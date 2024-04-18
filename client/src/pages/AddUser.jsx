import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom';
import '../css/adminUser.css';



function AddUser() {
    const [data, setData] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('/api/users');
          setData(response.data.filter(user => user.role === "User"));
          console.log(data);
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


const handleAddSubmit = async (event) => {
    event.preventDefault();
    try {
        const response = await axios.post('/api/adminAdd',  JSON.stringify(addFormData));
        console.log('Added Users successful:', response.data);
        navigate('/adminUser');
      } catch (error) {
        console.error('Added Users failed:', error);
      }
    };

    

    return (
        <div className="user-container">
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

export default AddUser;
