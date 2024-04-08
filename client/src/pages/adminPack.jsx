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

    //   const handleDeletePack = async (PackageID) => {
    //     // Display a confirmation dialog
    //     const isConfirmed = window.confirm('Are you sure you want to delete this user?');
        
    //     // If the user confirms, proceed with the deletion
    //     if (isConfirmed) {
    //         axios.delete('/api/package/' + PackageID)
    //             .then((response) => {
    //                 console.log(response);
    //                 window.location.reload();
    //                 // Use navigate() here if you're using React Router and it's defined in your context
    //                 // navigate("/profile");
    //             }).catch((error) => {
    //                 console.log(error)
    //             });
    //     } else {
    //         // If the user cancels, you can log a message or handle as needed
    //         console.log('User deletion cancelled');
    //     }
    // };


    

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
                                <td>{p.Status}</td> 
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
