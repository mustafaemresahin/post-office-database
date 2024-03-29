import React, { useState, useContext, useEffect } from 'react';
import { ShopContext } from '../context/shop-context';
import '../css/checkout.css';
import '../css/cart.css';
import axios from 'axios';
import { CartItem } from './cart-item';
import { PRODUCTS } from "../products";
import { useNavigate } from 'react-router-dom';


function Checkout() {
    const { cartItems, getTotalCartAmount } = useContext(ShopContext);
    const totalAmount = getTotalCartAmount();
    const [firstName, setFirstName] = useState('');
    // Include other state variables here...
    const navigate = useNavigate();
    const [lastName, setLastName] = useState(''); // Missing state for lastName
    const [email, setEmail] = useState(''); // Missing state for email
    const [address, setAddress] = useState(''); // Missing state for address
    const [city, setCity] = useState(''); // Missing state for city
    const [zip, setZip] = useState(''); // Missing state for zip
    // Payment info
    const [cardNumber, setCardNumber] = useState(''); // Missing state for cardNumber
    const [cardHolder, setCardHolder] = useState(''); // Missing state for cardHolder
    const [expiration, setExpiration] = useState(''); // Missing state for expiration
    const [CVV, setCVV] = useState(''); // Missing state for CVV
    const [userId, setUserId] = useState(null);

    

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
   

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (!email || !cardNumber || !CVV) {
            alert("Please fill out all required fields.");
            return;
        }
        const Items = Object.entries(CartItem).map(([id, quantity]) => {
            // Assuming PRODUCTS is an array where each product has an `id` and a `price`
            const product = PRODUCTS.find(product => product.id.toString() === id);
            return {
              itemID: id,
              quantity: quantity,
              pricePerItem: product ? product.price : 0, // Default to 0 if product not found
            };
          });
          console.log("Transformed Items:", Items);
          
          

        // Prepare data to send to the backend
        const orderData = {
            firstName,
            lastName,
            email,
            address,
            city,
            zip,
            cardNumber,
            cardHolder,
            expiration,
            CVV,
           Items,
           userId: userId 
        };
        



        try {
            // Using Axios for the API call
            const response = await axios.post('/api/checkout', orderData);

            // Check for success response (status code 2xx)
            if (response.status >= 200 && response.status < 300) {
                // Handle successful checkout
                alert("Checkout successful!");
                navigate('/home');
                // Reset form fields or redirect to success page here
            } else {
                // Handle errors or unsuccessful checkout
                alert("Checkout failed. Please try again.");
            }
        } catch (error) {
            console.error("Error during checkout:", error);
            alert("An error occurred. Please try again.");
        }
    };


    // JSX for the checkout form
    return (

    <div className="checkout-container">
        <h1>Checkout</h1>
        {/* <form onSubmit={handleSubmit}> */}
        <div className="checkout-container-split">
            <div className="container-split">
                <h2>Customer Info</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name:</label>
                        <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name:</label>
                        <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address:</label>
                        <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">City:</label>
                        <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="zip">ZIP Code:</label>
                        <input type="text" id="zip" value={zip} onChange={(e) => setZip(e.target.value)} required />
                    </div>
                </form>
            </div>
            {/* PAYMENT */}
            <div className="container-split">
                <h2>Payment Info</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="cardNumber">Card number:</label>
                        <input type="text" id="cardNumber" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cardHolder">Cardholder:</label>
                        <input type="text" id="cardHolder" value={cardHolder} onChange={(e) => setCardHolder(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="expiration">Expiration date:</label>
                        <input type="text" id="expiration" value={expiration} onChange={(e) => setExpiration(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="CVV">CVV (3-digit number on card):</label>
                        <input type="text" id="CVV" value={CVV} onChange={(e) => setCVV(e.target.value)} required />
                    </div>
                </form>
            </div>
            </div>
           
             
<div className='checkout-items'>

    </div>            
            <div className="checkout-confirm">
                <div className="confirm-header">Cart Totals</div>
                <div className="confirm-total">Subtotal: ${totalAmount}</div>
                <div className="confirm-total">Total: ${totalAmount}</div> {/* Adjust if additional fees apply */}
                <button onClick={handleSubmit}>Place order</button>
                {PRODUCTS.map((product) => {
          const quantity = cartItems[product.id]; // Get quantity from cartItems
          if (quantity > 0) { // Only display items that are in the cart
            return (
              <CartItem 
                key={product.id} 
                data={product} 
                quantity={quantity} // Pass quantity as a prop to CartItem
              />
              
            );
            
          }
          
          return null;
        })}
                      </div>
                      </div>


    );
};
export default Checkout;
