import React, { useContext, useEffect, useState } from "react";
import '../css/checkout.css'; // Import your CSS file for styling
import axios from 'axios';
import { ShopContext } from "../context/shop-context";
import { PRODUCTS } from "../products";
import { CartItem } from "./cart-item";
import { useNavigate } from "react-router-dom";
import _ from 'lodash';

function Checkout() {
    // State variables to hold form data
    // user info
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');
    // payment info
    const [cardNumber, setCardNumber] = useState('');
    const [cardHolder, setCardHolder] = useState('');
    const [expiration, setExpiration] = useState('');
    const [CVV, setCVV] = useState('');

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic for handling form submission goes here
    };

    const { cartItems, getTotalCartAmount, checkout } = useContext(ShopContext);
    const totalAmount = getTotalCartAmount();
    const [unreceivedPackages, setUnreceivedPackages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('id');
        if (!token) {
        navigate("/login");
        return;
        }
    
        const fetchUserData = async () => {
        try {
            axios.get('/api/package')
            .then(response => {
                const packageData = response.data.filter(pkg => pkg.SenderID === id); // Find the package by id
                if (!packageData) {
                console.log('No packages');
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
            

            {/*input form ends here */}
            <div style={{ display: 'flex'}}>
                <div className="cartItem">
                    <div className="description">
                    <div className="description">
                        <p>Shopping Cart</p>
                        {PRODUCTS.some(product => cartItems[product.id] !== 0) ? (
                        PRODUCTS.map(product => {
                            if (cartItems[product.id] !== 0) {
                            return <CartItem key={product.id} data={product} />;
                            }
                            return null;
                        })
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
            <button type ="submit">Place order</button>
                </div>
            </div>
        </div>

    );
}

export default Checkout;