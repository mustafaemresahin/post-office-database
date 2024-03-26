import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../css/customer.css';
import {useNavigate} from 'react-router-dom';


function AdminPackage() {
    const [pack, setPack] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/api/package')
        .then(res=>setPack(res.pack))
        .catch(err => console.log(err));
    },[])

    return (
        <div className="admin_pack">
            <br></br>
            <br></br>
            <h1>Package Information</h1>
            <table className="table table-striped" style={{width:"50%"}}>
                <thead>
                    <tr>
                        <th className="package-th">PackageID</th>
                        <th className="package-th">SenderID</th>
                        <th className="package-th">Weight</th>
                        <th className="package-th">Dimensions</th>
                        <th className="package-th">Type</th>
                        <th className="package-th">Status</th>
                        <th className="package-th">DateSent</th>
                        <th className="package-th">VehicleID</th>
                        <th className="package-th">Destination</th>
                        <th className="package-th">Expedited Shipping</th>
                        <th className="package-th">Recipient First Name</th>
                        <th className="package-th">Recipient Last Name</th>
                        <th className="package-th">Cost</th>
                    </tr>
                </thead>
                <tbody>
                    {pack && pack.map((p) => {
                        return (
                            <tr key={p.PackageID} className="pack-tr">
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

export default AdminPackage;
