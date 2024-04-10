import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../css/adminUser.css';
import {useNavigate} from 'react-router-dom';


function AdminPack() {
  const [pack, setPack] = useState([])
   
  const navigate = useNavigate();

  useEffect(() => {
    // Try to load packages from local storage first
    const storedPackages = localStorage.getItem('packages');
    if (storedPackages) {
      setPack(JSON.parse(storedPackages));
    } else {
        // If not in local storage, fetch from the API
      fetchPackages();
    }
	}, []);

	const fetchPackages = async () => {
    try {
      const response = await axios.get('/api/package');
      setPack(response.data);
        // Also update local storage
      localStorage.setItem('packages', JSON.stringify(response.data));
    } catch (error) {
      console.error('Error fetching packages:', error);
    }
	};

	const handleChangeStatus = async (PackageID, newStatus) => 
	{
		let string = `/api/userspackages/${PackageID}`;
		let separatedArray = string.split('/');

		//console.log(separatedArray[3]); 
		//console.log(newStatus);

    try {
      const response = await axios.put(`/api/userspackages/${PackageID}`, { Status: newStatus });
			console.log(response);
      console.log('Update success:', response.data);

        // Update both the local state and local storage
      const updatedPackages = pack.map(p => p.PackageID === PackageID ? { ...p, Status: newStatus } : p);
      setPack(updatedPackages);
      localStorage.setItem('packages', JSON.stringify(updatedPackages));
    } catch (error) {
      console.error('Error updating package status:', error);
    }
	};
  

    const handleClick = () => {
        // Use navigate function to navigate to the desired page
      navigate('/Send Package');
    };


  return (
	<div className="user-container">
			<h2>Package Information</h2>
			<button onClick={handleClick}>Add</button>
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
													<td>
											<select value={p.Status} onChange={(e) => handleChangeStatus(p.PackageID, e.target.value)}>
													<option value="Pending">Pending</option>
													<option value="In Transit">In Transit</option>
													<option value="Delivered">Delivered</option>
													<option value="Cancelled">Cancelled</option>
											</select>
									</td>
													<td>{(new Date(p.DateSent).toLocaleString("en-US", { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }))}</td>
													<td>{p.VehicleID}</td>
													<td>{p.destination}</td>
													<td>{p.expeditedShipping}</td>
													<td>{p.recipientFirstName}</td>
													<td>{p.recipientLastName}</td>
													<td>{p.cost}</td>
													{/* <td> <button onClick={() => handleDeletePack(p.PackageID)}>Delete</button>  </td> */}

											</tr>
									)
							})}
					</tbody>
			</table>
		</div>
  )
}

export default AdminPack;
