import React, {useState, useEffect} from "react";
import '../css/register.css';
import '../css/package.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ShippingForm = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [formData, setFormData] = useState({
    length: '',
    width: '',
    height: '',
    weight: '',
    expeditedShipping: 0,
    address: '',
    packageType: '',
    recipientFirstName: '',
    recipientLastName: '',
  });
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
            setUserId(id); // Set the found user into the users state, as an array for consistency
          } else {
            console.log('User not found');
            // Handle the case where the user is not found
          }
        })
        .catch(error => console.error('Error:', error));
    }
  }, [navigate]);

  const handleChange = (event) => {
    const { name, value, type } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? (event.target.checked ? 1 : 0) : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formDataWithUserId = {
        ...formData,
        userId: userId // Include user ID in formData
      };
      // Send POST request to package endpoint
      const response = await axios.post("/api/sentPackages",formDataWithUserId ); 
      console.log('Package successfully submitted:', response.data);
      // Redirect to cart page with label data
      navigate('/cart', { state: { label: response.data.label } });
    } catch (error) {
      // Handle package error
      console.error('Package submission failed:', error);
    }
  };

  return (
    <div className="package-container">
      <div className="registration-card">
        <div className="registration-form"> 
          <h2>Shipping Form</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="length">Length (in.):</label>
              <input
                type="number"
                id="length"
                name="length"
                value={formData.length}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="width">Width (in.):</label>
              <input
                type="number"
                id="width"
                name="width"
                value={formData.width}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="height">Height (in.):</label>
              <input
                type="number"
                id="height"
                name="height"
                value={formData.height}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="weight">Weight (lbs.):</label>
              <input
                type="number"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="address">Recipient Address:</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="recipientFirstName">Recipient First Name:</label>
              <input
                type="text"
                id="recipientFirstName"
                name="recipientFirstName"
                value={formData.recipientFirstName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="recipientLastName">Recipient Last Name:</label>
              <input
                type="text"
                id="recipientLastName"
                name="recipientLastName"
                value={formData.recipientLastName}
                onChange={handleChange}
                required
              />
            </div>
              <label htmlFor="packageType">Package Type:</label>
              <select
                type="dropdown"
                id="packageType"
                name="packageType"
                value={formData.packageType}
                onChange={handleChange}
                required
              >
                <option value="">Select package type</option>
                <option value="envelope">Envelope</option>
                <option value="oversized">Oversized</option>
                <option value="parcel">Parcel</option>
              </select>
            <div className='expedited-shipping-container'>
              <label htmlFor="expeditedShipping">Expedited Shipping:</label>
              <input
                type="checkbox"
                id="expeditedShipping"
                name="expeditedShipping"
                checked={formData.expeditedShipping}
                onChange={handleChange}
              />
            </div>
            <button type="submit">
              Print Label
            </button>
          </form>
        </div>
      </div>
    </div> 
  );
};

export default ShippingForm;
