import React, { useState } from 'react';
import '../css/tracking.css';
import axios from 'axios';

const TrackingForm = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingInfo, setTrackingInfo] = useState([]);  // Initialize as an empty array
  const [errorMessage, setErrorMessage] = useState('');
  const [clicked, setClicked] = useState(false);

  const handleChange = (event) => {
    setTrackingNumber(event.target.value);
    //setTrackingInfo([]);
    setErrorMessage('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      axios.get(`/api/trackpackages?trackingNumber=${trackingNumber}`)
      .then(response => {
        if (response.data.length === 0) {
            setErrorMessage('No packages that correspond to that tracking number');
        } else {
          const sortedInfo = [...response.data].sort((a, b) => new Date(b.Timestamp) - new Date(a.Timestamp));
          setTrackingInfo(sortedInfo);
          setClicked(true);
        }
    })
      .catch(error => {
        console.error('Error:', error);
        setTrackingInfo([]);
        setErrorMessage('An error occurred while fetching the tracking information.');
      });
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An unexpected error occurred.');
    }
  };

  return (
    <div className='tracking-page'>
      <div className="tracking-container">
        <div className="registration-card">
          <div className="registration-form"> 
            <h2>Package Tracking Form</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="trackingNumber">Tracking Number:</label>
                <input
                  type="text"
                  id="trackingNumber"
                  name="trackingNumber"
                  value={trackingNumber}
                  onChange={handleChange}
                  required
                  maxLength="16"
                  pattern="[0-9a-f]{16}"
                />
              </div>
              <button type="submit">Track Package</button>
            </form>

            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {trackingInfo.length > 0 ? (
              <div className="tracking-info">
                
                {trackingInfo.map((info, index) => (
                  <div key={index} className={`tracking-details ${index === 0 ? 'recent' : 'past'}`}>
                    <div className="details-wrapper">
                    <p>Package Status: {info.Status}</p>
                    <p>Location: {info.Location}</p>
                    <p>Status last updated on {
                      new Date(info.Timestamp).toLocaleString("en-US", {
                        year: 'numeric',
                        month: 'long', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                      })
                    }</p>
                     {index === 0 && (
                  <>
                    <p className="type">Package Type: {info.Description}</p>
                    {info.Status !== "Delivered" && <p className="delivery">Estimated Delivery: {info.EstimatedDeliveryTime}</p>}
                  </>
                )}
              </div>
              </div>
                ))}
              </div>
            ) : clicked && <p>No tracking information available.</p>}
          </div>
        </div>
      </div> 
    </div>
  );
};

export default TrackingForm;
