import React, { useState } from 'react';
import '../css/register.css';
import '../css/tracking.css'; 

const TrackingForm = () => {
  const [trackingNumber, setTrackingNumber] = 
  
  useState({trackingNumber: ''});

  const handleChange = (event) => {
    setTrackingNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Tracking Number:', trackingNumber);
    // TODO: Implement tracking logic here (e.g., call an API to track the package)
  };

  return (
    <div className="tracking-container">
      <div className="registration-card">
        <div className="registration-form"> 
          <h2>Package Tracking Form</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="trackingNumber">Tracking Number (in.):</label>
              <input
                type="number"
                id="trackingNumber"
                name="trackingNumber"
                value={trackingNumber.trackingNumber}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">
              Track Package
            </button>
          </form>
        </div>
      </div>
    </div> 
  );
};

export default TrackingForm;
