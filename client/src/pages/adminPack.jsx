import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../css/adminUser.css';
import {useNavigate} from 'react-router-dom';


function AdminPack() {
    const [pack, setPack] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPackage = async () => {
          try {
            const response = await axios.get('/api/package');
            setPack(response.data);
          } catch (error) {
            console.error('Error fetching vehicles:', error);
          }
        };
    
        fetchPackage();
      }, []);
    


    return (
        <div className="user-container">
            <h2>Package Information</h2>
            <table>
                <thead>
                    <tr>
                        <th>PackageID</th>
                        <th>SenderID</th>
                        <th>Weight</th>
                        <th>Dimensions</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>DateSent</th>
                        <th>VehicleID</th>
                        <th>Destination</th>
                        <th>Expedited Shipping</th>
                        <th>Recipient First Name</th>
                        <th>Recipient Last Name</th>
                        <th>Cost</th>
                    </tr>
                </thead>
                <tbody>
                    {pack && pack.map((p) => {
                        return (
                            <tr key={p.PackageID}>
                                <td>{p.PackageID}</td>
                                <td>{p.SenderID}</td>
                                <td>{p.Weight}</td>
                                <td>{p.Dimensions}</td>
                                <td>{p.Type}</td>
                                <td>{p.Status}</td>
                                <td>{p.DateSent}</td>
                                <td>{p.VehicleID}</td>
                                <td>{p.destination}</td>
                                <td>{p.expeditedShipping}</td>
                                <td>{p.recipientFirstName}</td>
                                <td>{p.recipientLastName}</td>
                                <td>{p.cost}</td>
                            </tr>
                        )
                   })}
                </tbody>
            </table>
        </div>
    )
}

export default AdminPack;
