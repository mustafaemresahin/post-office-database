import React, { useState } from 'react';
import '../css/register.css';
import '../css/package.css';

const ShippingForm = () => {
  const [userData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    password: '',
    address: '',
    phoneNumber: '',
  });

  const handleChange = (event) => {
    const { name, value, type } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? event.target.checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitted data:', userData);
    // TODO: Implement form submission logic here (e.g., send to server)
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
                value={userData.firstname}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="firstname">Receiver Name:</label>
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
              <label htmlFor="lastname">Receiver Surname:</label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={userData.firstname}
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
              <label htmlFor="address">Receiver Address:</label>
              <input
                 type="text"
                 id="address"
                 name="address"
                 value={userData.address}
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
