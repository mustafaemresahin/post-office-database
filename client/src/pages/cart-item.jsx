import React, { useContext } from "react";
import { ShopContext } from "../context/shop-context";
import '../css/cartItem.css';

export const CartItem = (props) => {
  console.log(props.data, "props");
  const { id, productName, price, productImage, quantity } = props.data;
  const { cartItems, addToCart, removeFromCart } = useContext(ShopContext);


  return (
    <div className="cartItem">
      <div className="content">
        <img src={productImage} alt="product"/>
        <div className="description">
          <p><b>{productName}</b></p>
          <p>Price: ${price}</p>
        </div>
      </div>
      <div className="button-div-cart">
        <button style={{'margin':'10px', 'fontSize':'18px', 'padding-bottom':'1px', 'padding-top':'1px', 'padding-left':'10px', 'padding-right':'10px'}} onClick={() => removeFromCart(id, 1)}> - </button>
        <input
          className="cart-input"
          value={cartItems[id] || 0}
          readOnly
        />
        <button style={{'margin':'10px', 'fontSize':'18px', 'padding-bottom':'1px', 'padding-top':'1px', 'padding-left':'10px', 'padding-right':'10px'}} onClick={() => addToCart(id)} className="cart-button"> + </button>
        <button style={{'backgroundColor':'#ff6258', 'margin':'20px'} } className="cart-remove" onClick={() => removeFromCart(id, cartItems[id])}> Remove </button>
        <p style={{'margin-left':'150px'}}>Total: ${parseFloat(price*quantity).toFixed(2)}</p>
      </div>
    </div>

  );

  };

  export default CartItem;