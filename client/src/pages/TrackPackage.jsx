
import React, { useState } from 'react';
import '../css/register.css';
import '../css/tracking.css';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const TrackingForm = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingInfo, setTrackingInfo] = useState(''); 
  const [errorMessage, setErrorMessage] = useState(''); 
  // const navigate = useNavigate();

  const handleChange = (event) => {
    setTrackingNumber(event.target.value);
    setTrackingInfo(null);
    setErrorMessage('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      axios.get('/api/trackpackages')
      .then(response => {
          const foundPackage = response.data.find(pkg => pkg.TrackingID === trackingNumber);
          if (!foundPackage) {
            // Update the errorMessage state to display a message
            setErrorMessage('No packages that correspond to that tracking number');
          } else {
            // Update the trackingInfo state with the found package details
            setTrackingInfo(foundPackage);
            console.log(foundPackage);
          }
      })
      .catch(error => {
        console.error('Error:', error);
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
            
            {errorMessage && <p>{errorMessage}</p>}
            {trackingInfo && (
              <div>
                <p>Package Status: {trackingInfo.Status}</p>
                <p>Location: {trackingInfo.Location}</p>
                <p>Status last updated on {trackingInfo.Description}</p>
                { (trackingInfo.Status === 'Pending Shipment' || trackingInfo.Status === 'In Transit'||trackingInfo.Status === 'Accepted') ? (
                <p>Estimated Delivery: {trackingInfo.EstimatedDeliveryTime}</p>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div> 
    </div>
  );
};

export default TrackingForm;
