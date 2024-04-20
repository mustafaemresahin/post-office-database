import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../css/adminUser.css';
import { useNavigate } from 'react-router-dom';

function AdminPack() {
  const [pack, setPack] = useState([]);;
  const [role, setRole] = useState(null);
  const [vehicles, setVehicles] = useState([]); // State to hold vehicle data
  const navigate = useNavigate();

  useEffect(() => {
    // Try to load packages from local storage first
    const token = localStorage.getItem('token');
    const storedPackages = localStorage.getItem('packages');
	const Userrole = localStorage.getItem('role');
    setRole(Userrole);
	  if (!token) {
      navigate("/login");
    } else if (Userrole === 'User') {
      navigate('/home');
    } else if (storedPackages) {
      setPack(JSON.parse(storedPackages));
    } else {
      fetchPackages();
    }
	}, []);

  const fetchPackages = async () => {
    try {
      const response = await axios.get('/api/package');
      setPack(response.data);
      console.log(pack);
      console.log("here00");
      // Also update local storage
      localStorage.setItem('packages', JSON.stringify(response.data));
    } catch (error) {
      console.error('Error fetching packages:', error);
    }
  };

  useEffect(() => {
	const fetchVehicles = async () => {
	  try {
		const response = await axios.get('/api/vehicleSelect');
		setVehicles(response.data);
	  } catch (error) {
		console.error('Error fetching vehicles:', error);
	  }
	};
  
	fetchVehicles();
  }, []);
  console.log('vehicles:',vehicles);

  const handleChangeStatus = async (PackageID, newStatus) => {

    const currentPackage = pack.find(p => p.PackageID === PackageID);
    if (!currentPackage) {
      alert("Package not found!");
      return;
    }

    if (currentPackage.Status === 'Delivered') {
      alert("Cannot change status once delivered!");
      return;
    }

    if (!currentPackage.VehicleID && (newStatus === 'In Transit' || newStatus === 'Delivered'|| newStatus === 'Cancelled'|| newStatus === 'Lost')) {
      alert("A vehicle must be assigned before updating the status.");
      return;
    }
    const isConfirmed = window.confirm('Are you sure you want to change the status of package?');
    if(!isConfirmed){
        return;
        }
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

  const handleChangeVehicle = async (PackageID, newVehicleID) => {
    try {
	  console.log('a',PackageID);
	  console.log('b',newVehicleID);
      const response = await axios.put(`/api/packageToVehicle/${PackageID}`, { VehicleID: newVehicleID });
      console.log(response);
      console.log('Update success:', response.data);

      // Update both the local state and local storage
      const updatedPackages = pack.map(p => p.PackageID === PackageID ? { ...p, VehicleID: newVehicleID } : p);
      setPack(updatedPackages);
      localStorage.setItem('packages', JSON.stringify(updatedPackages));
    } catch (error) {
      console.error('Error updating package vehicle:', error);
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
                  <select value={p.Status} onChange={(e) => handleChangeStatus(p.PackageID, e.target.value)} style={{'min-width':'80px'}}>
                    <option value="Pending">Pending</option>
                    <option value="In Transit">In Transit</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Lost">Lost</option>
                  </select>
                </td>
                <td>{(new Date(p.DateSent).toLocaleString("en-US", { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }))}</td>
                <td>
				<select onChange={(e) => handleChangeVehicle(p.PackageID, e.target.value)} value={p.VehicleID || ''} style={{'min-width':'150px'}}>
  						<option value="">Vehicle</option>
  						{vehicles.map((vehicle) => (
    					<option key={vehicle.VehicleID} value={vehicle.VehicleID}>
      						{`${vehicle.Type} - ${vehicle.Fname+' '+vehicle.Lname}`}
    					</option>
  						))}
					</select>
                </td>
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
