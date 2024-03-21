import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/register.css';
import '../css/package.css';
import '../css/profile.css';

const EditProfile = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        Email: '',
        FirstName: '',
        LastName: '',
        Address: '',
        "City,State": '',
        Country:'',
        ZipCode:'',
        PhoneNumber:''
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
    
      const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Submitted data:', formData);
        navigate('/profile');
        // TODO: Implement form submission logic here (e.g., send to server)
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
                                <label htmlFor="FirstName">New first name:</label>
                                <input
                                type="string"
                                id="FirstName"
                                name="FirstName"
                                value={formData.FirstName}
                                onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="LastName">New last name:</label>
                                <input
                                type="string"
                                id="LastName"
                                name="LastName"
                                value={formData.LastName}
                                onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="Address">New address:</label>
                                <input
                                type="string"
                                id="Address"
                                name="Address"
                                value={formData.Address}
                                onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="City,State">New city, state:</label>
                                <input
                                type="string"
                                id="City,State"
                                name="LastName"
                                value={formData['City,State']}
                                onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="Country">New country:</label>
                                <input
                                type="string"
                                id="Country"
                                name="Country"
                                value={formData.Country}
                                onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="ZipCode">New zipcode:</label>
                                <input
                                type="number"
                                id="ZipCode"
                                name="ZipCode"
                                value={formData.ZipCode}
                                onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="PhoneNumber">New phone number:</label>
                                <input
                                type="number"
                                id="PhoneNumber"
                                name="PhoneNumber"
                                value={formData.PhoneNumber}
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