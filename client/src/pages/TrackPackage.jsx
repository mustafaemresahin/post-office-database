import React, { useState } from 'react';
import '../css/register.css';
import '../css/tracking.css';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const TrackingForm = () => {
  const [trackingNumber, setTrackingNumber] =  useState({trackingNumber: ''});
  const navigate = useNavigate();
  const statusRef = useRef('');
  const locationRef = useRef('');
  const descriptionRef = useRef('');
  const estDeliveryRef = useRef('');

  const handleChange = (event) => {
    setTrackingNumber(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userPackageId = trackingNumber.trackingNumber;
    try {
      axios.get('/api/trackpackages')
      .then(response => {
          const foundPackage = response.data.find(pkg => pkg.TrackingID === userPackageId); // Find the package by trackingID
          if (!foundPackage) {
            console.log('No packages that correspond to that tracking number');
          }
          else{
            const { status, location, description, estimatedDelivery } = foundPackage;
            statusRef.current = status;
            locationRef.current = location;
            descriptionRef.current = description;
            estDeliveryRef.current = estimatedDelivery
            console.log(foundPackage);
          }
      })
      .catch(error => console.error('Error:', error));
    } catch (error) {
      console.error('Error:', error);
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
            {/* Conditionally render the message or package details */}
            {statusRef.current === 'No record found' ? (
              <p>Tracking ID does not exist in our system.</p>
            ) : (
              statusRef.current && (
                <div>
                  <p>Package Status: {statusRef.current}</p>
                  <p>Location: {locationRef.current}</p>
                  <p>Description: {descriptionRef.current}</p>
                  <p>Estimated Delivery: {estDeliveryRef.current}</p>
                </div>
              )
            )}
          </div>
        </div>
      </div> 
    </div>
  );
};

export default TrackingForm;
