import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/shop-context";
import { PRODUCTS } from "../products";
import { CartItem } from "./cart-item";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import _ from 'lodash';

import "../css/cart.css";
export const Cart = () => {
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