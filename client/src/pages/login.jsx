import React, { useState } from 'react';
import '../css/LoginPage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({username:"",password:"",role:"User"});

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      // Send POST request to login endpoint
      const response = await axios.post("/api/login",values); 
      console.log('Login successful:', response.data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('id', response.data.id);
      localStorage.setItem('role', values.role);
      navigate('/profile');
      window.location.reload();
    } catch (error) {
      // Handle login error
      console.error('Login failed:', error);
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
  };

  return (
    
    <div className="login-page">
      <div className="login-form-container">
        <div className="login-card"> {/* Wrap in login-card */}
        <div className='login'>
          <h1>Login</h1>
        </div>
          <div className="login-form">
            <form onSubmit={handleSubmit}>
              <div className="username-field">
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  required
                  className="username-input"
                />
              </div>
              <div className="password-field">
                <input
                  type="password"
                  placeholder="Password"
                  onChange={handleChange}
                  name="password" // added this line
                  value={values.password} // added this line
                  required
                  className="password-input"
                />
              </div>
              <div className="select-container">
                <select id="role" name="role" value={values.role} onChange={handleChange}>
                  <option value="customer">Customer</option>
                  <option value="employee">Employee</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="submit-button">
                <button variant="primary" type="submit">
                  Submit
                </button>
              </div>
            </form>
            
          </div>
          <div className="register-link">
            <p>If you don't have an account <a href="/register">Register Account</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
