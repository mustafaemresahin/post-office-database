import React, { createContext, useState, useEffect } from "react";
import { PRODUCTS } from "../products";

export const ShopContext = createContext(null);

/*
const getDefaultCart = () => {
  const id = localStorage.getItem('id');
  const cartid = localStorage.getItem('cart');
  
  let cart = {};
  PRODUCTS.forEach(product => {
    cart[product.id] = 0;
  });
  return cart;
};
*/
const getDefaultCart = async () => {
  const id = localStorage.getItem('id');
  const cartId = localStorage.getItem('cartId');

  // Check if both id and cartId are available before making API call
  if (!id || !cartId) {
    return {}; // Return an empty cart if credentials are missing
  }

  try {
    const response = await axios.get('/api/cart_items'); // Replace with your actual API endpoint
    const cartItems = response.data.items || []; // Handle potential missing items data

    // Filter cart items based on user ID
    const filteredCartItems = cartItems.filter(item => item.userId === id);

    // Create a cart object with quantities for each product
    let cart = {};
    PRODUCTS.forEach(product => {
      cart[product.id] = 0;
      const matchingItem = filteredCartItems.find(cartItem => cartItem.productId === product.id);
      if (matchingItem) {
        cart[product.id] = matchingItem.quantity;
      }
    });

    return cart;
  } catch (error) {
    console.error("Error fetching cart:", error);
    return {}; // Return an empty cart on error
  }
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

  const checkout = () => {
    setCartItems(getDefaultCart());
    console.log("Cart Items Cleared - Checkout Complete");
  };

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
