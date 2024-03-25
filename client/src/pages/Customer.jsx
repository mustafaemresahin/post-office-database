import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../css/customer.css';
import {useNavigate} from 'react-router-dom';


function Customer() {
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('/api/users')
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, [])
    
    const [addFormData, setAddFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        username: '',
        password: '',
        address: '',
        phoneNumber: '',
    })

const handleAddChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;

    const newFormData = {...addFormData};
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
};

const navigate = useNavigate();

const handleAddSubmit = async (event) => {
    event.preventDefault();
    // axios.post('/api/users',addFormData);
    // console.log('Adding successful');
    // navigate ("/customer");
    // const newData = {
    // Email: addFormData.Email,
    // CustomerUser: addFormData.CustomerUser ,
    // firstname: addFormData.firstname,
    // lastname:addFormData.lastname,
    // address: addFormData.address,
    // phonenumber:addFormData.phonenumber,
    // role: addFormData.role
    // };
    // const newDatas = [...data, newData];
    // setData(newDatas);

    try {
        const response = await axios.post('/api/adminAdd', addFormData);
        console.log('Added Users successful:', response.data);
        navigate('/login');
      } catch (error) {
        console.error('Added Users failed:', error);
      }
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
                    {data.map((user) => {
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
                                    <button className='btnedit'>Edit</button>
                                    <button onClick={() => {
                                            deleteUser(user.userid)}
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
                {/* <input
                    type="text"
                    name="username"
                    required="required"
                    placeholder="Enter a username..."
                    value={addFormData.username}
                    onChange={handleAddChange}

                />
                <input
                type="text"
                name="password"
                required="required"
                placeholder="Enter a password..."
                value={addFormData.password}
                onChange={handleAddChange}

            />
            <input
                    type="email"
                    name="email"
                    required="required"
                    placeholder="Enter an email..."
                    value = {addFormData.email}
                    onChange={handleAddChange}
                />
                <input
                    type="text"
                    name="firstname"
                    required="required"
                    placeholder="Enter first name.."
                    value = {addFormData.firstname}
                    onChange={handleAddChange}
                />
                <input
                    type="text"
                    name="lastname"
                    required="required"
                    placeholder="Enter last name.."
                    value = {addFormData.lastname}
                    onChange={handleAddChange}
                />
                <input
                    type="text"
                    name="address"
                    required="required"
                    placeholder="Enter an address.."
                    value = {addFormData.address}
                    onChange={handleAddChange}
                />
                <input
                    type="text"
                    name="phoneNumber"
                    required="required"
                    placeholder="Enter a phone number.."
                    value = {addFormData.phoneNumber}
                    onChange={handleAddChange}
                />
                <input
                    type="text"
                    name="role"
                    required="required"
                    placeholder="Enter the role"
                    value = {addFormData.role}
                    onChange={handleAddChange}
                /> */}
                <button type="submit">Add</button>
            </form>
        </div>
    )
}

export default Customer;
