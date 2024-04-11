import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProfile = () => {
    const navigate = useNavigate();

    // useEffect(() => {
    //     const fetchUserData = async () => {
    //         try {
    //             const userId = localStorage.getItem('editUserId');
    //             const response = await axios.get(`/api/users/${userId}`);
    //             const userData = response.data;
    //             setFormData(userData);
    //         } catch (error) {
    //             console.error('Failed to fetch user data', error);
    //         }
    //     };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate("/login");
        }
    }, [navigate]);

    const [formData, setFormData] = useState({
        Email: localStorage.getItem('Email'),
        firstname: localStorage.getItem('firstname'),
        lastname: localStorage.getItem('lastname'),
        address: localStorage.getItem('address'),
        phonenumber: localStorage.getItem('phonenumber')
    });


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

     const handleUserEdit = async (event) => {
         event.preventDefault();
         try {
             const userId = localStorage.getItem('editUserId');
             console.log('Form data:', formData);
             const response = await axios.put(`/api/profileEdit/${userId}`, formData);
             console.log('Profile updated successfully:', response.data);
             localStorage.removeItem('editUserId');
             navigate("/profile");
             window.location.reload();
         } catch (error) {
             console.error('Failed to update profile', error);
         }
     };

    return (
        <div className="package-container">
            <div className="registration-card">
                <div className="registration-form">
                    <h1>Profile Editor</h1>
                    <form onSubmit={handleUserEdit}>
                        <div>
                            <label htmlFor="Email">New e-mail:</label>
                            <input
                                type="string"
                                id="Email"
                                name="Email"
                                value={formData.Email}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="firstname">New first name:</label>
                            <input
                                type="string"
                                id="firstname"
                                name="firstname"
                                value={formData.firstname}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="lastname">New last name:</label>
                            <input
                                type="string"
                                id="lastname"
                                name="lastname"
                                value={formData.lastname}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="address">New address:</label>
                            <input
                                type="string"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="phonenumber">New phone number:</label>
                            <input
                                type="number"
                                id="phonenumber"
                                name="phonenumber"
                                value={formData.phonenumber}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit">
                            Submit
                        </button>
                        <button onClick={() => navigate("/profile")}>
                            Profile
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
