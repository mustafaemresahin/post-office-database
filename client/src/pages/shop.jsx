import React, { useState, useEffect } from "react";
import { fetchProducts } from "../products";
import { Product } from "./product";
import '../css/shop.css';

export const Shop = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts().then(data => {
            setProducts(data);
        });
    }, []);  // Dependency array is empty to ensure this runs only once

    return (
      <div className="shopTitle">
        <br />
        <div>
          <h3>Post Office Shop</h3>
        </div>
        <div className="products">
          {products.map((product) => (
            <Product key={product.id} data={product} />
          ))}
        </div>
      </div>
    );
};
