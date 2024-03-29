import React from "react";
import { PRODUCTS } from "../products";
import { Product } from "./product";
import '../css/shop.css';


export const Shop = () => {
    return (
      <div className="shopTitle">
        <br></br>
        <div>
          <h3>Post Office Shop</h3>
        </div>
        <div className="products">
          {PRODUCTS.map((product) => (
            <Product key={product.id} data={product} />
          ))}
        </div>
      </div>
    );
  };
  
