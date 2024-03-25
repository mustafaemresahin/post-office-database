import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/register.css';
import '../css/package.css';
import axios from 'axios';

const ShippingForm = () => {
  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    firstnamer: '',
    lastnamer: '',
    email: '',
    username: '',
    address: '',
    addressr: '',
    phoneNumber: '',
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/add-package', userData);
      console.log('Package added', response.data);
      navigate('/Employee');
    } catch (error) {
      console.error('Package creation failed:', error);
    }
  };

  return (
    <div className="package-container">
      <div className="registration-card">
        <div className="registration-form"> 
          <h2>New Shipment</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="firstname">Sender Name:</label>
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
              <label htmlFor="lastname">Sender Surname:</label>
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
              <label htmlFor="firstnamer">Receiver Name:</label>
              <input
                  type="text"
                  id="firstnamer"
                  name="firstnamer"
                  value={userData.firstnamer}
                  onChange={handleChange}
                  required
              />
            </div>
            <div>
              <label htmlFor="lastnamer">Receiver Surname:</label>
              <input
                type="text"
                id="lastnamer"
                name="lastnamer"
                value={userData.lastnamer}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="address">Sender Address:</label>
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
              <label htmlFor="addressr">Receiver Address:</label>
              <input
                 type="text"
                 id="addressr"
                 name="addressr"
                 value={userData.addressr}
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
            <button type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div> 
  );
};

export default ShippingForm;
