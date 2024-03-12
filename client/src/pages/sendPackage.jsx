import React, { useState } from 'react';
import '../css/register.css';
import '../css/package.css';

const ShippingForm = () => {
  const [formData, setFormData] = useState({
    length: '',
    width: '',
    height: '',
    weight: '',
    expeditedShipping: false,
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
    console.log('Submitted data:', formData);
    // TODO: Implement form submission logic here (e.g., send to server)
  };

  return (
    <div className="package-container">
      <div className="registration-card">
        <div className="registration-form"> 
          <h2>Shipping Form</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="length">Length (in.):</label>
              <input
                type="number"
                id="length"
                name="length"
                value={formData.length}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="width">Width (in.):</label>
              <input
                type="number"
                id="width"
                name="width"
                value={formData.width}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="height">Height (in.):</label>
              <input
                type="number"
                id="height"
                name="height"
                value={formData.height}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="weight">Weight (lbs.):</label>
              <input
                type="number"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                required
              />
            </div>
            <div className='expedited-shipping-container'>
              <label htmlFor="expeditedShipping">Expedited Shipping:</label>
              <input
                type="checkbox"
                id="expeditedShipping"
                name="expeditedShipping"
                checked={formData.expeditedShipping}
                onChange={handleChange}
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
