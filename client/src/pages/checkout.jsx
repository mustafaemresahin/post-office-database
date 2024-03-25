import React, { useEffect,useState, useContext } from 'react'; // Import useContext here
import { ShopContext } from '../context/shop-context'; 
import '../css/checkout.css'; // Import your CSS file for styling
import '../css/cart.css';
import axios from 'axios';
import { CartItem } from './cart-item';
import { PRODUCTS } from "../products";
import { useNavigate } from 'react-router-dom';


function Checkout() {
    const { cartItem, getTotalCartAmount } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');
    // Payment info
    const [cardNumber, setCardNumber] = useState('');
    const [cardHolder, setCardHolder] = useState('');
    const [expiration, setExpiration] = useState('');
    const [CVV, setCVV] = useState('');
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    
        useEffect(() => {
            // Fetch cart items when component mounts
            const fetchCartItems = async () => {
                try {
                    const response = await axios.get('/api/cart-items'); // Make sure this matches your GET endpoint
                    setCartItems(response.data); // Update state with fetched cart items
                } catch (error) {
                    console.error('Failed to fetch cart items:', error);
                }
            };
            fetchCartItems();
        }, []); 

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation (expand as needed)
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


        };
        



        try {
            // Using Axios for the API call
            const response = await axios.post('/api/checkout', orderData);

            // Check for success response (status code 2xx)
            if (response.status >= 200 && response.status < 300) {
                // Handle successful checkout
                alert("Checkout successful!");
                navigate('/About');
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

<div className="checkout-container">
            {/* Checkout form fields */}
            <tr>
    <h1>Cart Items</h1>
</tr>
            {/* Displaying fetched cart items */}
            <div className="cart-items">
                {cartItems.map(item => (
                    <div key={item.id}>
                        <div>{item.name} - Quantity: {item.quantity}</div>
                    </div>
                ))}
            </div>
            {/* Total amount and submit button */}
        </div>
    
    </div>            
            <div className="checkout-confirm">
                <div className="confirm-header">Cart Totals</div>
                {/* Dynamically display subtotal and total using totalAmount */}
                <div className="confirm-total">Subtotal: ${totalAmount}</div>
                <div className="confirm-total">Total: ${totalAmount}</div> {/* Adjust if additional fees apply */}
                <button onClick={handleSubmit}>Place order</button>
                </div>
                {/* </div> */}
                
                 </div>


    );
};
export default Checkout;
