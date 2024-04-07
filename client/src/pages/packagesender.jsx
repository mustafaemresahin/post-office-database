import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/packagesender.css';

const Packagesender = () => {
  const [packageData, setPackageData] = useState([]);

  useEffect(() => {
    const fetchPackageData = async () => {
      try {
        const response = await axios.get('/api/packagesender');
        setPackageData(response.data);
      } catch (error) {
        console.error('Error fetching package data:', error);
      }
    };

    fetchPackageData();
  }, []);

  return (
    <div className="packages-report-container">
        <a href="/reports" className='back-button'>Back</a>
      <h2>Package Sender Report</h2>
        <table>
          <thead>
            <tr>
              <th>Package ID</th>
              <th>Sender ID</th>
              <th>Weight</th>
              <th>Dimensions</th>
              <th>Type</th>
              <th>Status</th>
              <th>Date Sent</th>
              <th>Destination</th>
              <th>Sender Username</th>
              <th>Sender First Name</th>
              <th>Sender Last Name</th>
              <th>Sender Email</th>
            </tr>
          </thead>
          <tbody>
            {packageData.map((pkg) => (
              <tr key={pkg.PackageID}>
                <td>{pkg.PackageID}</td>
                <td>{pkg.SenderID}</td>
                <td>{pkg.Weight}</td>
                <td>{pkg.Dimensions}</td>
                <td>{pkg.Type}</td>
                <td>{pkg.Status}</td>
                <td>{new Date(pkg.DateSent).toLocaleDateString()}</td>
                <td>{pkg.destination}</td>
                <td>{pkg.CustomerUser}</td>
                <td>{pkg.firstname}</td>
                <td>{pkg.lastname}</td>
                <td>{pkg.Email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
};

export default Packagesender;
