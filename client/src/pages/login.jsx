import React, { useState } from 'react';
import '../css/LoginPage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const navigate = useNavigate();
  const [values] = useState({ username: "", password: "" });

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      // Send POST request to login endpoint
      const response = await axios.post("/login",values); 
      console.log('Login successful:', response.data);
      navigate('/profile');
    } catch (error) {
      // Handle login error
      console.error('Login failed:', error);
    }
  };


  return (
    <div className="login-page">
      <div className="login-form-container">
        <div className="login-card"> {/* Wrap in login-card */}
        <h1>Login</h1>
          <div className="login-form">
            <form onSubmit={handleSubmit}>
              <div className="username-field">
                <input
                  type="text"
                  placeholder="Username"
                  required
                  className="username-input"
                />
              </div>
              <div className="password-field">
                <input
                  type="password"
                  placeholder="Password"
                  required
                  className="password-input"
                />
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
