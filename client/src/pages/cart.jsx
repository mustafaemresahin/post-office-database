
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/shop-context";
import { PRODUCTS } from "../products";
import { CartItem } from "./cart-item";
import { useNavigate } from "react-router-dom";
import axios from 'axios';



import "../css/cart.css";
export const Cart = () => {
  const { cartItems, getTotalCartAmount, checkout, updateCartItemCount } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  const [pendingPackages, setPendingPackages] = useState([]);
  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();


// useEffect(() => {
//   async function fetchData() {
//     try {
//       // Make a request to your API endpoint to fetch cartItems
//       const res = await axios.get('api/cart-items');
//       updateCartItemCount(res.data);
//     } catch (error) {
//       console.error('Error fetching cartItems data: ', error);
//     }
//   }

//   fetchData();
// }, [updateCartItemCount]);

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
          // Move axios.get request here
          axios.post("/api/sentPackages/pending", {userId: id })
            .then(packagesResponse => {
              console.log('Pending packages:', packagesResponse.data); // Log the pending packages data
              setPendingPackages(packagesResponse.data);
            })
            .catch(error => console.error("Error fetching pending packages:", error));
        } else {
          console.log('User not found');
          // Handle the case where the user is not found
        }
      })
      .catch(error => console.error('Error:', error));
  }, []);


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
      {totalAmount > 0 ? (
        <div className="checkout">
          <p> Subtotal: ${totalAmount} </p>
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


