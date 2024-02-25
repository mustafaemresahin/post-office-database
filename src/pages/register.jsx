import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../register.css';

const Registration = () => {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log('Submitting:', userData);
    navigate('/login');
  };

  return (
    <div className="registration-container">
      <div className='registration-card'>
        <div className='registration-form'>
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
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
          
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;