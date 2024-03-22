import React from "react";
import { PRODUCTS } from "../products";
import { Product } from "./product";
import '../css/shop.css';


export const Shop = () => {
      return  (
       <div className="shopTitle">
           <div>
               <h3>Post Office Shop</h3>
           </div>
           <div className ="products"> {PRODUCTS.map((product) => (
               <Product data= {product} />
           ))}
               </div>
           </div>
      );
};
