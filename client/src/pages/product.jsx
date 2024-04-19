import React, { useContext } from "react";
import { ShopContext } from "../context/shop-context";
import { useNavigate } from 'react-router-dom';

export const Product = (props) => {
   const { id, productName, price, productImage, quantity } = props.data;
   const { addToCart, cartItems } = useContext(ShopContext);
   const navigate = useNavigate();
   console.log(quantity);
    function addToCartCheck(id){
        const token = localStorage.getItem('token');
        if (!token) {
            navigate("/login");
        }
        else{
            addToCart(id);
        }
    }

  const cartItemCount = cartItems[id];
  return (
   <div className = "product">
       <img src={productImage} alt="product"/>
       <div className="description">
           <p>
               <b>{productName}</b>
           </p>
           <p> ${price} </p>
       </div>
        {quantity > 0 && <><button className="addToCartBttn" onClick={() => addToCartCheck(id)} style={{'margin-bottom':'20px'}}>
                            Add To Cart {cartItemCount > 0 && <> ({cartItemCount})</>}
                        </button></>}
        {quantity === 0 && <><button className="addToCartBttn"style={{'margin-bottom':'20px', "backgroundColor":'grey'}}>
                                Out of Stock {cartItemCount > 0 && <> ({cartItemCount})</>}
                            </button></>}
   </div>
  );
};
