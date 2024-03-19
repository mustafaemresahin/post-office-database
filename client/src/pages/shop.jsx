import React from "react";
import { PRODUCTS } from "../products";
import { Product } from "./product";
import '../css/shop.css';


export const Shop = () => {
      return  (
       <div className="shopTitle">
           <div>
               <h1>Post Office Shop</h1>
           </div>
           <div className ="products"> {PRODUCTS.map((product) => (
               <Product data= {product} />
           ))}
               </div>
           </div>
      );
};
