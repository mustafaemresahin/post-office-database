import React, { createContext, useState, useEffect } from "react";
import { PRODUCTS } from "../products";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  PRODUCTS.forEach(product => {
    cart[product.id] = 0;
  });
  return cart;
};

export const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());

  useEffect(() => {
    console.log("Cart Items Updated:", cartItems);
  }, [cartItems]);

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = PRODUCTS.find((product) => product.id === Number(item));
        totalAmount += cartItems[item] * itemInfo.price;
      }
    }
    return totalAmount;
  };

  const addToCart = (itemId) => {
    console.log("Adding item to cart. Item ID:", itemId);
    setCartItems((prev) => {
      const updatedCart = { ...prev, [itemId]: (prev[itemId] || 0) + 1 };
      console.log("Item Added to Cart:", itemId, "Updated Cart:", updatedCart);
      return updatedCart;
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev, [itemId]: Math.max((prev[itemId] || 0) - 1, 0) };
      console.log("Item Removed from Cart:", itemId, "Updated Cart:", updatedCart);
      return updatedCart;
    });
  };

  const updateCartItemCount = (newAmount, itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev, [itemId]: Math.max(newAmount, 0) };
      console.log("Cart Item Count Updated:", itemId, "New Amount:", newAmount, "Updated Cart:", updatedCart);
      return updatedCart;
    });
  };

  async function checkout() {
    try {
      const cartId = localStorage.getItem('cartId');
  
      // Construct API endpoint URL
      const apiEndpoint = `/api/cart_items_deletion/${cartId}`;
  
      // Make the API request to delete cart items
      const response = await axios.delete(apiEndpoint);
  
      if (response.data.success) {
        // Clear cart items locally if API deletion is successful
        setCartItems(getDefaultCart());
        console.log("Cart Items Cleared - Checkout Complete");
      } else {
        // Handle error from API response
        console.error("Error clearing cart:", response.data.error);
        // Consider displaying a user-friendly error message or retrying the operation
      }
    } catch (error) {
      // Handle general errors during the request or response handling
      console.error("Error clearing cart:", error);
      // Consider implementing more specific error handling or retries
    }
  }

  const contextValue = {
    cartItems,
    addToCart,
    updateCartItemCount,
    removeFromCart,
    getTotalCartAmount,
    checkout,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
