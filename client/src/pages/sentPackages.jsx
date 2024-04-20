import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/notification.css';
import { useNavigate } from "react-router-dom";

function SentPackages() {
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');
    if (!token) {
      navigate("/login");
      return;
    }

    // Function to fetch packages and their tracking information
    const fetchPackagesAndTracking = async () => {
      try {
        const packagesResponse = await axios.get('/api/package');
        const trackingResponse = await axios.get('/api/trackinghistory');

        // Filtering packages for the current user
        const userPackages = packagesResponse.data.filter(pkg => pkg.SenderID === id);

        // Map over packages to include tracking information
        const combinedData = userPackages.map(pkg => {
          // Find tracking info for each package
          const trackingInfo = trackingResponse.data.find(track => track.PackageID === pkg.PackageID) || {};
          return {
            ...pkg,
            trackingID: trackingInfo.TrackingID || 'No Tracking Info'
          };
        });

        setPackages(combinedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPackagesAndTracking();
  }, [navigate]);

  return (
    <div className='notification-page'>
      <div className="container-notify" style={{'min-width':'1200px'}}>
        <div className="notification-header">
          <h1>Sent Packages</h1>
        </div>
        <div className="notifcation-container">
          <main className="notification-card">
            <div className="description-notify">
              {packages.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Tracking #</th>
                            <th>Weight</th>
                            <th>Dimensions</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Date Sent</th>
                            <th>Destination</th>
                            <th>Receiver</th>
                            <th>Cost</th>
                        </tr>
                    </thead>
                  <tbody>
                    {packages.map(pkg => (
                      <tr key={pkg.PackageID} className="notify-tr">
                        <td>{pkg.trackingID}</td>
                        <td>{pkg.Weight}</td>
                        <td>{pkg.Dimensions}</td>
                        <td>{pkg.Type}</td>
                        <td>{pkg.Status}</td>
                        <td>{(new Date(pkg.DateSent).toLocaleString("en-US", { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }))}</td>
                        <td>{pkg.destination}</td>
                        <td>{pkg.recipientFirstName} {pkg.recipientLastName}</td>
                        <td>{pkg.cost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No Sent Packages</p>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );  
};

export default SentPackages;
