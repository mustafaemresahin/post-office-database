import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/shop-context";
import { PRODUCTS } from "../products";
import { CartItem } from "./cart-item";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


import "../css/cart.css";
export const Cart = () => {
  const { cartItems, getTotalCartAmount, checkout, updateCartItemCount } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();

  const navigate = useNavigate();


useEffect(() => {
  async function fetchData() {
    try {
      // Make a request to your API endpoint to fetch cartItems
      const res = await axios.get('api/cart-items');
      updateCartItemCount(res.data);
    } catch (error) {
      console.error('Error fetching cartItems data: ', error);
    }
  }

  fetchData();
}, [updateCartItemCount]);

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


