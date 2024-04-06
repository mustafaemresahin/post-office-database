import React, { useContext } from "react";
import { ShopContext } from "../context/shop-context"; // Assuming ShopContext is exported from here
import '../css/cartItem.css';

export const CartItem = (props) => {
  const { id, productName, price, productImage } = props.data;
  const { cartItems, addToCart, removeFromCart } = useContext(ShopContext);


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
          <button onClick={() => addToCart(id)}> + </button>
        </div>
      </div>
    </div>
  );

  };

  export default CartItem;