import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/register.css';
import '../css/package.css';
import '../css/profile.css';
import axios from 'axios'; 

const EditProfile = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        UserID: '',
        Email: '',
        firstname: '',
        lastname: '',
        address: '',
        phonenumber:''
      });

      useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
          // If no token found, redirect to login page
          navigate("/login");
        }
      }, [navigate]);
    
      const handleChange = (event) => {
        const { name, value, type } = event.target;
        setFormData((prevState) => ({
          ...prevState,
          [name]: type === 'checkbox' ? event.target.checked : value,
        }));
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Submitted data:', formData);
        // TODO: Implement form submission logic here (e.g., send to server)
        try {
            const response = await axios.put('/api/users', formData);
            console.log('Registration successful:', response.data);
            navigate('/login');
          } catch (error) {
            console.error('Registration failed:', error);
          }
      };

    return (
        <div className="package-container">
            <div className="registration-card">
                <div className="registration-form"> 
                    <h1>Profile Editor</h1>
                        <form onSubmit={handleSubmit}>
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
                                id="firstName"
                                name="firstName"
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
                            {/* <div>
                                <label htmlFor="City,State">New city, state:</label>
                                <input
                                type="string"
                                id="City,State"
                                name="LastName"
                                value={formData['City,State']}
                                onChange={handleChange}
                                />
                            </div> */}
                            {/* <div>
                                <label htmlFor="Country">New country:</label>
                                <input
                                type="string"
                                id="Country"
                                name="Country"
                                value={formData.Country}
                                onChange={handleChange}
                                />
                            </div> */}
                            {/* <div>
                                <label htmlFor="ZipCode">New zipcode:</label>
                                <input
                                type="number"
                                id="ZipCode"
                                name="ZipCode"
                                value={formData.ZipCode}
                                onChange={handleChange}
                                />
                            </div> */}
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
                        </form>
                </div>
            </div>
        </div>
    )

}

export default EditProfile;