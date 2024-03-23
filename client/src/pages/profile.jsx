import React, {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import '../css/register.css';
import '../css/package.css';
import '../css/profile.css';
import axios from 'axios';

const ProfilePage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    const handleNavigation = (event, route) => {
        event.preventDefault();
        // Navigate to the specified route
        navigate(route);
    };
    useEffect(() => {
      const token = localStorage.getItem('token');
      const id = localStorage.getItem('id');
      if (!token) {
        // If no token found, redirect to login page
        navigate("/login");
      }
      else{
        axios.get('/api/users')
        .then(response => {
            const userData = response.data.find(user => user.UserID === id); // Find the user by id
            if (userData) {
              setUser(userData); // Set the found user into the users state, as an array for consistency
            } else {
              console.log('User not found');
              // Handle the case where the user is not found
            }
          })
          .catch(error => console.error('Error:', error));
      }
    }, [navigate]);
    

    const handleLogout = (event) => {
      event.preventDefault(); // Prevent default form submission behavior
  
      // Remove token from localStorage
      localStorage.removeItem('token');
  
      // Navigate to the home route
      navigate('/home');
    };
    const handleEditProfile = (event) => {
      event.preventDefault();
      navigate('/editProfile');
    };

    return (
        <div className="package-container">
        
        <div className="registration-card">
           <form onSubmit={handleNavigation}>
            <table className="profile-table">
                
            </table>
            <thead>
                <tr>
                <h1 className="centered-header">Profile</h1>
                </tr>
            </thead>
            {user ? (
                <>
                <tbody>
                    <tr>
                        <td className="profile-element">Email</td>
                        <td className="profile-element">{user.Email}</td>
                    </tr>
                    <tr>
                        <td className="profile-element">First Name</td>
                        <td className="profile-element">{user.firstname}</td>
                    </tr>
                    <tr>
                        <td className="profile-element">Last Name</td>
                        <td className="profile-element">{user.lastname}</td>
                    </tr>
                    <tr>
                        <td className="profile-element">Address</td>
                        <td className="profile-element">{user.address}</td>
                    </tr>
                    <tr>
                        <td className="profile-element">Role</td>
                        <td className="profile-element">{user.role}</td>
                    </tr>
                    <tr>
                        <td className="profile-element">Date Signed Up</td>
                        <td className="profile-element">{user && !isNaN(new Date(user.dateSignedUp)) ? new Date(user.dateSignedUp).toLocaleDateString("en-US") : 'Invalid date'}</td>
                    </tr>
                    <tr>
                        <td className="profile-element">Phone Number</td>
                        <td className="profile-element">{user.phonenumber}</td>
                    </tr>
                </tbody>
                </>
            ) : (
                <p>User not found.</p>
            )}
            <button className="logout-button" type="button" onClick={handleEditProfile}>Edit</button>
            <button className="logout-button" type="button" onClick={handleLogout}>Log out</button>
            </form>
        </div>
        
        </div>
    );
}

export default ProfilePage;