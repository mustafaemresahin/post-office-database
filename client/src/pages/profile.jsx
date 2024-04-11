import React, {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import '../css/register.css';
import '../css/package.css';
import '../css/profile.css';
import axios from 'axios';

const ProfilePage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [email, setemail] = useState(null);
    const [first, setfirst] = useState(null);
    const [last, setlast] = useState(null);
    const [address, setaddress] = useState(null);
    const [phone, setphone] = useState(null);

    const handleNavigation = (event, route) => {
        event.preventDefault();
        // Navigate to the specified route
        navigate(route);
    };
    useEffect(() => {
      const token = localStorage.getItem('token');
      const id = localStorage.getItem('id');
      const Userrole = localStorage.getItem('role');
      console.log(Userrole);
      setRole(Userrole);
      if (!token) {
        // If no token found, redirect to login page
        navigate("/login");
      }
        
        axios.get('/api/users')
        .then(response => {
            const userData = response.data.find(user => user.UserID === id); // Find the user by id
            if (userData) {
            setUser(userData); // Set the found user into the users state, as an array for consistency
            setRole(localStorage.getItem('role'));
            setemail(userData.Email);
            setfirst(userData.firstname);
            setlast(userData.lastname);
            setaddress(userData.address);
            setphone(userData.phonenumber);
            } else {
            console.log('User not found');
            // Handle the case where the user is not found
            }
        })
        .catch(error => console.error('Error:', error));
    }, [navigate]);
    

    const handleLogout = (event) => {
      event.preventDefault(); // Prevent default form submission behavior
  
      // Remove token from localStorage
      localStorage.clear();
  
      // Navigate to the home route
      navigate('/login');
      window.location.reload();
    };
    const handleEditProfile = (event) => {
      event.preventDefault();
      navigate('/editProfile');
    };

    return (
        <div className="package-container">
            <div className="registration-card">
                <form onSubmit={handleNavigation}>
                    {/* Conditionally render the profile type header */}
                    {role === "Admin" && <h1 className="centered-header">Admin Profile</h1>}
                    {(role === "Driver" || role === "Service Clerk" || role === "Manager") && <h1 className="centered-header">Employee Profile</h1>}
                    {role === "User" && <h1 className="centered-header">Customer Profile</h1>}
    
                    <table className="profile-table">
                        <tbody>
                            <tr>
                                <td className="profile-element">Email</td>
                                <td className="profile-element">{email}</td>
                            </tr>
                            <tr>
                                <td className="profile-element">First Name</td>
                                <td className="profile-element">{first}</td>
                            </tr>
                            <tr>
                                <td className="profile-element">Last Name</td>
                                <td className="profile-element">{last}</td>
                            </tr>
                            <tr>
                                <td className="profile-element">Address</td>
                                <td className="profile-element">{address}</td>
                            </tr>
                            <tr>
                                <td className="profile-element">Role</td>
                                <td className="profile-element">{role}</td>
                            </tr>
                            {!(role === "admin") && (
                                <tr>
                                    <td className="profile-element">Date Signed Up</td>
                                    <td className="profile-element">
                                        {user && !isNaN(new Date(user.dateSignedUp)) ? new Date(user.dateSignedUp).toLocaleDateString("en-US") : 'Invalid date'}
                                    </td>
                                </tr>
                            )}
                            <tr>
                                <td className="profile-element">Phone Number</td>
                                <td className="profile-element">{phone}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="buttons">
                        <button className="logout-button" type="button" onClick={handleEditProfile}>Edit</button>
                        <button className="logout-button" type="button" onClick={handleLogout}>Log out</button>
                    </div>
                </form>
            </div>
        </div>
    );
    
}

export default ProfilePage;