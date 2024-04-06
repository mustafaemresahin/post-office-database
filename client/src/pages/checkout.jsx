import React, { useContext, useEffect, useState } from "react";
import '../css/checkout.css'; 
import axios from 'axios';
import { ShopContext } from "../context/shop-context";
import { PRODUCTS } from "../products";
import { CartItem } from "./cart-item";
import { useNavigate } from "react-router-dom";
import _ from 'lodash';

function Checkout() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [address, setAddress] = useState(''); 
  const [city, setCity] = useState(''); 
  const [zip, setZip] = useState(''); 
  const [cardNumber, setCardNumber] = useState(''); 
  const [cardHolder, setCardHolder] = useState(''); 
  const [expiration, setExpiration] = useState(''); 
  const [CVV, setCVV] = useState(''); 
  const [userId, setUserId] = useState(null);
  const { cartItems, getTotalCartAmount, checkout } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  const [unreceivedPackages, setUnreceivedPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  


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
        console.log(totalAmount);
        
        

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

  

  useEffect(() => {
      const token = localStorage.getItem('token');
      const id = localStorage.getItem('id');
      if (!token) {
      navigate("/login");}
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
            return;
        }

      
  
        const fetchUserData = async () => {
          try {
            axios.get('/api/package')
            .then(response => {
                const packageData = response.data.filter(pkg => pkg.SenderID === id && pkg.Status === 'Pending'); // Find the package by id
                if (!packageData) {
                  console.log('No pending packages');
                }
                else{
                  setUnreceivedPackages(packageData);
                  console.log(packageData);
                }
            })
            .catch(error => console.error('Error:', error));
          } catch (error) {
            console.error('Error:', error);
          }
        };    
      fetchUserData();
      setIsLoading(false);
  }, [navigate]);

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
        <div style={{ display: 'flex'}}>
          <div className="cartItem">                
            <div className="description">
              <p>Shopping Cart</p>
              {Object.keys(cartItems).some(itemId => cartItems[itemId] > 0) ?(
                <ul className="cart-item-list"> {/* Added unordered list with class */}
                  {Object.keys(cartItems).map((itemId) => {
                    const product = PRODUCTS.find(product => product.id === parseInt(itemId));
                    if (product && cartItems[itemId] > 0) {
                      return (
                        <li key={product.id}> {/* Each item now within a list item */}
                          {product.productName},
                          quantity: {cartItems[itemId]}
                        </li>
                      );
                    }
                    // Handle cases where the product might not exist in PRODUCTS
                    return null;
                  })}
                </ul>
              ) : (
                <p>Cart Empty</p>
              )}
              <p>Packages</p>
              {unreceivedPackages.length > 0 ? (
              <div className="pending-packages">
                <ul>
                  {_.uniqBy(unreceivedPackages, 'PackageID').map((pendingpackage) => (
                    <li key={pendingpackage.PackageID}> {/* Corrected key prop */}
                      Package ID: {pendingpackage.PackageID},
                      Cost: {pendingpackage.cost}
                    </li>
                  ))}
                </ul>
              </div>
              ) : (
                <p>No pending packages found.</p>
              )}
            </div>
          </div>
            <div className="checkout-confirm">
              <div className="confirm-header">Cart Totals</div>
              {totalAmount > 0 || unreceivedPackages.length > 0 ? (
                <div className="checkout">
                  <p>Subtotal from cart: ${totalAmount} </p>
                  <p>Pending package fees: ${unreceivedPackages.reduce((sum, pendingpackage) => sum + parseFloat(pendingpackage.cost || 0), 0)}</p>
                  <p>Total: ${totalAmount + (unreceivedPackages.reduce((sum, pendingpackage) => sum + parseFloat(pendingpackage.cost || 0), 0))}</p>
                  <button onClick={() => navigate("/shop")}> Continue Shopping </button>
                </div>
              ) : (
                <h1> Your Shopping Cart is Empty</h1>
              )}
                <button onClick={handleSubmit}>Place order</button>
              </div>
            </div>
          </div> 
        </div>                            
  );
};
export default Checkout;
