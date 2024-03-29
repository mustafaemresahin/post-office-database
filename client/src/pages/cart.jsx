
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/shop-context";
import { PRODUCTS } from "../products";
import { CartItem } from "./cart-item";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import _ from 'lodash';



import "../css/cart.css";
export const Cart = () => {
  const { cartItems, getTotalCartAmount, checkout, updateCartItemCount } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  const [unreceivedPackages, setUnreceivedPackages] = useState([]);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');
    if (!token) {
      // If no token found, redirect to login page
      navigate("/login");
      return; // Exit early if no token
    }
  
    axios.get('/api/users')
      .then(response => {
        const userData = response.data.find(user => user.UserID === id); // Find the user by id
        if (userData) {
          setUserId(id); // Set the found user into the users state
          if (!unreceivedPackages.length) {
            axios.get("/api/package")
              .then(packagesResponse => {
                const packageData = packagesResponse.data.find(packageInfo => packageInfo.SenderID === id);
                setUnreceivedPackages((currentData) => [...currentData, packageData]);
              })
              .catch(error => setUnreceivedPackages([]) && console.error("Error fetching pending packages:", error));
          }
        } else {
          console.log('User not found');
          // Handle the case where the user is not found
        }
      })
      .catch(error => {
        setUnreceivedPackages([]);
        console.error('Error:', error)
      });
    setIsLoading(false);
  }, []);


  console.log(unreceivedPackages);


  return (
    <div className="cart">
      <div>
        <h1>Your Cart Items</h1>
      </div>
      <div className="cart">
        {PRODUCTS.map((product) => {
          if (cartItems[product.id] !== 0) {
            return <CartItem data={product} />;
          }
          return null;
        })}
      </div>
       {isLoading ? (
        <p>Loading pending packages...</p>
      ) : unreceivedPackages.length > 0 ? (
        <div className="pending-packages">
          <h1>Pending Packages</h1>
          <ul>
            {_.uniqBy(unreceivedPackages, 'PackageID').map((pendingpackage) => (
              <li key={pendingpackage.id}> Use a key prop for performance 
                 Package ID: {pendingpackage.PackageID}, 
                Cost: {pendingpackage.cost}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No pending packages found.</p>
      )} 
      
       {totalAmount > 0 || unreceivedPackages.length > 0 ? (
        <div className="checkout">
          <p>Subtotal from cart: ${totalAmount} </p>
          <p>Pending package fees: ${unreceivedPackages.reduce((sum, pendingpackage) => sum + parseFloat(pendingpackage.cost || 0), 0)}</p>
          <p>Total: ${totalAmount + (unreceivedPackages.reduce((sum, pendingpackage) => sum + parseFloat(pendingpackage.cost || 0), 0))}</p>
          <button onClick={() => navigate("/shop")}> Continue Shopping </button>
          <button
            onClick={() => {
              checkout();
              navigate("/checkout");
            }}
          >
            {" "}
            Checkout{" "}
          </button>
        </div>
      ) : (
        <h1> Your Shopping Cart is Empty</h1>
      )} 
    </div>
  );
};


