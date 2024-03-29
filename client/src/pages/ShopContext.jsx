import React, { createContext, useState } from 'react';
import { PRODUCTS } from "../products";

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});

  const addToCart = (id) => {
    console.log(`Adding item to cart: ${id}`);
    setCartItems(prevItems => ({
      ...prevItems,
      [id]: (prevItems[id] || 0) + 1
    }));
  };

  const removeFromCart = (id) => {
    console.log(`Removing item from cart: ${id}`);
    setCartItems(prevItems => {
      const newItems = { ...prevItems };
      if (newItems[id]) {
        newItems[id] -= 1;
        if (newItems[id] <= 0) {
          delete newItems[id];
        }
      }
      return newItems;
    });
  };

  const updateCartItemCount = (quantity, id) => {
    setCartItems(prevItems => {
      if (quantity <= 0) {
        const {[id]: _, ...rest} = prevItems; // Remove item with given id
        return rest;
      }
      return {
        ...prevItems,
        [id]: quantity
      };
    });
  };

  const getTotalCartAmount = () => {
    return Object.entries(cartItems).reduce((total, [id, quantity]) => {
      const product = PRODUCTS.find(p => p.id === id); // Assuming 'products' is defined and accessible
      return total + (quantity * (product ? product.price : 0));
    }, 0);
  };
  

  return (
    <ShopContext.Provider
      value={{
        PRODUCTS,
        addToCart,
        setCartItems,
        updateCartItemCount,
        removeFromCart,
        cartItems,
        getTotalCartAmount: (cartItems) => getTotalCartAmount(cartItems || cartItems),
      }}
    >
      {props.children}
    </ShopContext.Provider>
  );


  const totalQuantity = Object.values(cartItems).reduce((acc, quantity) => acc + quantity, 0);

  return (
    <ShopContext.Provider value={{ cartItems, addToCart, removeFromCart, updateCartItemCount, totalQuantity, getTotalCartAmount }}>
      {children}
    </ShopContext.Provider>
  );
};
