import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/register.css';
import '../css/package.css';
import '../css/profile.css';

const ProfilePage = () => {

    const navigate = useNavigate();

    const handleNavigation = (event, route) => {
        event.preventDefault();
        // Navigate to the specified route
        navigate(route);
    };
    
    /*const navigate = useNavigate();

    const handleLogout = (event) => {
        event.preventDefault();

        // Navigate to the home route
        navigate('/home');
    };*/

    return (
        <div className="package-container">
        
        <div className="registration-card">
           {/* <div className="registration-form">*/}
           <form onSubmit={handleNavigation}>
            <table className="profile-table">
                <thead>
                    <tr>
                    <h1 className="centered-header">Profile</h1>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="profile-element">Email</td>
                        <td className="profile-element">1</td>
                    </tr>
                    <tr>
                        <td className="profile-element">First Name</td>
                        <td className="profile-element">2</td>
                    </tr>
                    <tr>
                        <td className="profile-element">Last Name</td>
                        <td className="profile-element">3</td>
                    </tr>
                    <tr>
                        <td className="profile-element">Address</td>
                        <td className="profile-element">4</td>
                    </tr>
                    <tr>
                        <td className="profile-element">City, State</td>
                        <td className="profile-element">5</td>
                    </tr>
                    <tr>
                        <td className="profile-element">Country</td>
                        <td className="profile-element">6</td>
                    </tr>
                    <tr>
                        <td className="profile-element">Zip Code</td>
                        <td className="profile-element">7</td>
                    </tr>
                    <tr>
                        <td className="profile-element">Phone Number</td>
                        <td className="profile-element">8</td>
                    </tr>
                </tbody>
            </table>
            <button className="logout-button" type="submit" onClick={(event) => handleNavigation(event, '/editProfile')}>Edit</button>
            <button className="logout-button" type="submit" onClick={(event) => handleNavigation(event, '/home')}>Log out</button>
            {/*<button className="logout-button" type="submit">Log out</button>
            <button onClick={(event) => handleNavigation(event, '/home')}>Logout</button>
            {/*<button type="submit">Log out</button>*/}
            </form>
        </div>
        
        </div>
    );
}

export default ProfilePage;