import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/register.css';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from "react-toastify";

const Registration = () => {
  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    password: '',
    address: '',
    phoneNumber: '',

  });

  const navigate = useNavigate();

  const generateError = (error) =>
    toast.error(error, {
      position: "top-left",
    });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uuid = uuidv4();
    try {
      const { data } = await axios.post("http://localhost:4000/register", {
        userid: 12345,
        ...userData,
      },{
        withCredentials: true,
      });
      if (data) {
        if(data.errors) {
          const { userid , username, password, email, phoneNumber ,address,lastname, firstname } = data.errors;
          if(username) generateError(username);
          else if(userid) generateError(userid);
          else if(email) generateError(email);
          else if (password) generateError(password);
          else if (address) generateError(address);
          else if (phoneNumber) generateError(phoneNumber);
          else if (lastname) generateError(lastname);
          else if (firstname) generateError(firstname);
        } else {
          navigate("/login");
        }
      }
    } catch(err) {
      console.log(err);
    }
  };

  return (
    <div className="registration-container">
      <div className='registration-card'>
        <div className='registration-form'>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="firstname">First Name:</label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={userData.firstname}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="lastname">Last Name:</label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={userData.lastname}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={userData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                name="address"
                value={userData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="phoneNumber">Phone Number:</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={userData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Register</button>
          </form>
          <div>
            <p>If you have an account <a href="/login">Login</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;