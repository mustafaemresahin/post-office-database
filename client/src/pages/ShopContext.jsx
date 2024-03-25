import React, { createContext, useState } from 'react';

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});

  const addToCart = (id) => {
    setCartItems(prevItems => ({
      ...prevItems,
      [id]: (prevItems[id] || 0) + 1
    }));
  };

  const removeFromCart = (id) => {
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

  const getTotalCartAmount = (inputCartItems) => {
    return inputCartItems.reduce((total, product) => {
      return product.quantity * product.pricePerItem + total;
    }, 0);
  }

  const totalQuantity = Object.values(cartItems).reduce((acc, quantity) => acc + quantity, 0);

  return (
    <ShopContext.Provider value={{ cartItems, addToCart, removeFromCart, updateCartItemCount, totalQuantity, getTotalCartAmount }}>
      {children}
    </ShopContext.Provider>
  );
};
