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
        CustomerUser: ' ',
        Email:' ',
        firstname: '',
        lastname:'',
        address:'',
        phonenumber:'',
        role:''
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
const handleAddSubmit = (event) => {
    event.preventDefault();
    axios.post('/api/users',addFormData);
    console.log('Adding successful');
    navigate ("/customer");

    const newData = {
    Email: addFormData.Email,
    CustomerUser: addFormData.CustomerUser ,
    firstname: addFormData.firstname,
    lastname:addFormData.lastname,
    address: addFormData.address,
    phonenumber:addFormData.phonenumber,
    role: addFormData.role
    };

    const newDatas = [...data, newData];
    setData(newDatas);
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
                    {data.map((user, index) => {
                        return (
                            <tr key={index} className="user-tr">
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
                                    <button className='btndelete'>Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            

            <h2>Add new user</h2>
            <form onSubmit={handleAddSubmit}>
                <input
                    type="text"
                    name="CustomerUser"
                    required="required"
                    placeholder="Enter a username..."
                    onChange={handleAddChange}

                />
                <input
                    type="email"
                    name="Email"
                    required="required"
                    placeholder="Enter an email..."
                    onChange={handleAddChange}
                />
                <input
                    type="text"
                    name="firstname"
                    required="required"
                    placeholder="Enter first name.."
                    onChange={handleAddChange}
                />
                <input
                    type="text"
                    name="lastname"
                    required="required"
                    placeholder="Enter last name.."
                    onChange={handleAddChange}
                />
                <input
                    type="text"
                    name="address"
                    required="required"
                    placeholder="Enter an address.."
                    onChange={handleAddChange}
                />
                <input
                    type="text"
                    name="phonenumber"
                    required="required"
                    placeholder="Enter a phone number.."
                    onChange={handleAddChange}
                />
                <input
                    type="text"
                    name="role"
                    required="required"
                    placeholder="Enter the role"
                    onChange={handleAddChange}
                />
                <button type="submit">Add</button>
            </form>
        </div>
    )
}

export default Customer;
