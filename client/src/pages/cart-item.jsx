// import React, { useContext } from "react";
// import { ShopContext } from "../context/shop-context";
// import '../css/cartItem.css';



// export const CartItem = (props) => {
//   const { id, productName, price, productImage} = props.data;
//   const { cartItems, addToCart, removeFromCart, updateCartItemCount } =
//     useContext(ShopContext);

//     const ShopProvider = ({ children }) => {
//       // Existing state and functions
    
//       const totalQuantity = Object.values(cartItems).reduce((acc, quantity) => acc + quantity, 0);
    
//       return (
//         <ShopContext.Provider value={{ cartItems, addToCart, removeFromCart, updateCartItemCount, totalQuantity }}>
//           {children}
//         </ShopContext.Provider>
//       );
//     };
  

//   return (
//     <div className="cartItem">
//       <img src={productImage} alt="product"/>
//       <div className="description">
//         <p>
//           <b>{productName}</b>
//         </p>
//         <p> Price: ${price}</p>
//         <div className="countHandler">
//           <button onClick={() => removeFromCart(id)}> - </button>
//           <input
//             value={cartItems[id]}
//             onChange={(e) => updateCartItemCount(Number(e.target.value), id)}
//           />
          
//           <button onClick={() => addToCart(id)}> + </button>
//         </div>
//       </div>
//     </div>
//   );
// };

import axios from 'axios';

import React, { useContext } from "react";
import { ShopContext } from "../context/shop-context"; // Assuming ShopContext is exported from here
import '../css/cartItem.css';

export const CartItem = (props) => {
  const { id, productName, price, productImage } = props.data;
  const { cartItems, addToCart, removeFromCart } = useContext(ShopContext);

  const handleAddToCart = async () => {
    try {
      // Assuming `props.data` contains the necessary item data
      const response = await axios.post('/api/cart-item', props.data);

      // If the API call is successful, update the local state to reflect the added item
      addToCart(id);
    } catch (error) {
      // Handle any errors from the API call
      console.error("Failed to add item to cart", error);
    }
  };

  return (
    <div className="cartItem">
      <img src={productImage} alt="product"/>
      <div className="description">
        <p><b>{productName}</b></p>
        <p> Price: ${price}</p>
        <div className="countHandler">
          <button onClick={() => removeFromCart(id)}> - </button>
          <input
            value={cartItems[id] || 0}
            readOnly // Assuming this input is for display purposes; otherwise, provide a mechanism to change the value
          />
          <button onClick={() => handleAddToCart(id)}> + </button>
        </div>
      </div>
    </div>
  );

  };

  export default CartItem;