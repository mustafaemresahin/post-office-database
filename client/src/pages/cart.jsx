
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/shop-context";
import { PRODUCTS } from "../products";
import { CartItem } from "./cart-item";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import _ from 'lodash';
import "../css/cart.css";

export const Cart = () => {
  const { cartItems, getTotalCartAmount} = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  const [unreceivedPackages, setUnreceivedPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(totalAmount);
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
  
  const deleteCartItem = async (packageID) => {
    try {
      const response = await axios.delete('/api/cart_item/delete/'+ packageID, {
        headers: {
          'Content-Type': 'application/json',
          // Include the token in the request if your API requires authentication
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log('Package deletion successful:', response.data);
      
      // Update the UI to reflect the package removal without reloading the page
      setUnreceivedPackages(currentPackages => currentPackages.filter(pkg => pkg.PackageID !== packageID));
      
      // navigate('/cart'); // This might not be necessary unless you want to force a reload of the cart page
    } catch (error) {
      console.error('Package deletion failed:', error);
    }
  };

  



  console.log(unreceivedPackages);



  return (
    <div className="cart">

      <div>
        <h1 className="cartHeader">Your Cart Items</h1>
      </div>
      <div>
        {Object.keys(cartItems).map(itemId => {
          const product = PRODUCTS.find(product => product.id === parseInt(itemId));
          if (product && cartItems[itemId] > 0) {
            return <CartItem key={product.id} data={product} />;
          }
          return null;
        })}
      </div>
      <h1>Pending Packages</h1>
      {isLoading ? (
        <p>Loading...</p>
            ) : unreceivedPackages.length > 0 ? (
              <div className="pending-packages">
                <ul>
                {_.uniqBy(unreceivedPackages, 'PackageID').map((pendingpackage) => (
                  <li key={pendingpackage.PackageID}>
                    Package ID: {pendingpackage.PackageID},
                    Cost: {pendingpackage.cost}
                    <button 
                      className="packageRemove" 
                      onClick={() => deleteCartItem(pendingpackage.PackageID)}
                    >
                      Remove
                    </button>
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
                <p>Total: ${parseFloat((totalAmount + unreceivedPackages.reduce((sum, pendingpackage) => sum + parseFloat(pendingpackage.cost || 0), 0)).toFixed(2))}</p>
                <button onClick={() => navigate("/shop")}> Continue Shopping </button>
                <button
                  onClick={() => {
                    // checkout();
                    navigate("/checkout");
                  }}
                >
                  {" "}
                  Checkout{" "}
                </button>
              </div>
            ) : (
              ""
            )}
    </div>
  );
};
