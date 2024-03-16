import React from 'react';
import '../css/profile.css';
import '../css/register.css';
import '../css/package.css';

const ProfilePage = () => {
    return (
        <div className="package-container">

        <div className="registration-card">
           {/* <div className="registration-form">*/}

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
            {/*</div>*/}
        </div>
        </div>
    );
}

export default ProfilePage;