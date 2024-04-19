
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/shop-context";
import { PRODUCTS } from "../products";
import { CartItem } from "./cart-item";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import _ from 'lodash';
import "../css/cart.css";

export const Cart = () => {
  const { cartItems, getTotalCartAmount} = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  const [unreceivedPackages, setUnreceivedPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');
    if (!token) {
      navigate("/login");
      return;
    }
  
    const fetchUserData = async () => {
      try {
        axios.get('/api/package')
        .then(response => {
            const packageData = response.data.filter(pkg => pkg.SenderID === id && pkg.Status === 'Pending'); // Find the package by id
            if (!packageData) {
              console.log('No pending packages');
            }
            else{
              setUnreceivedPackages(packageData);
              console.log(packageData);
            }
        })
        .catch(error => console.error('Error:', error));
      } catch (error) {
        console.error('Error:', error);
      }
    };    

    async function fetchCartItems() {
      const fetchedCartItems = await getTotalCartAmount();
      console.log(Object.keys(fetchedCartItems).length, "cartItems length");
      console.log(fetchedCartItems, "cartItems");
      setIsLoaded(true);
    }
    
    fetchCartItems();
  
    fetchUserData();
    setIsLoading(false);
  }, [navigate]);
  
  const deleteCartItem = async (packageID) => {
    const isConfirmed = window.confirm('Are you sure you want to delete remove the package?');
    if(!isConfirmed){
      return;
    }
    try {
      const response = await axios.delete('/api/cart_item_package/delete/'+ packageID, {
        headers: {
          'Content-Type': 'application/json',
          // Include the token in the request if your API requires authentication
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log('Package deletion successful:', response.data);
      
      // Update the UI to reflect the package removal without reloading the page
      setUnreceivedPackages(currentPackages => currentPackages.filter(pkg => pkg.PackageID !== packageID));
      
      // navigate('/cart'); // This might not be necessary unless you want to force a reload of the cart page
    } catch (error) {
      console.error('Package deletion failed:', error);
    }
  };


  return (
    <div className="cart">
      <div>
        <h1 className="cartHeader">Your Cart Items</h1>
      </div>
      <div style={{'margin-left':'30px'}}>
        {Object.keys(cartItems).reduce((sum, key) => {
        const product = PRODUCTS.find(p => p.id.toString() === key);
        return sum + (product ? cartItems[key] * product.price : 0);
      }, 0) > 0 ? (
          // Render CartItem components for products that are in the cart (quantity > 0)
          PRODUCTS.filter(product => cartItems[product.id] > 0)
            .map(product => {
              return (
                <CartItem 
                  key={product.id} 
                  data={{ ...product, quantity: cartItems[product.id] }} 
                />
              );
            })
        ) : isLoaded && (
          <div className="cart-message cart-message-empty">
            <p>No store items in cart</p>
          </div>
        )}
      </div>
      <div>
      {Object.keys(cartItems).reduce((sum, key) => {
        const product = PRODUCTS.find(p => p.id.toString() === key);
        return sum + (product ? cartItems[key] * product.price : 0);
      }, 0) > 0 ? (
          <div>
            <p style={{'textAlign':'right', 'margin-right':'100px'}}>Subtotal from cart: ${parseFloat(totalAmount).toFixed(2)} </p>
            <hr></hr>
            <br></br>
          </div>
        ) : (
          <div>
            
          </div>
        )}
      </div>
      <h1 className="cartHeader">Pending Packages</h1>
      {isLoading ? (
        <p>Loading...</p>
            ) : unreceivedPackages.length > 0 ? (
              <div className="packageTable">
              <table>
                <thead>
                  <tr>
                    <th>Recipient</th>
                    <th>Destination</th>
                    <th>Type</th>
                    <th>Dimensions</th>
                    <th>Weight</th>
                    <th>Expedited Shipping</th>
                    <th>Cost</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {_.uniqBy(unreceivedPackages, 'PackageID').map((pendingpackage) => (
                    <tr key={pendingpackage.PackageID}>
                      <td>{pendingpackage.recipientFirstName} {pendingpackage.recipientLastName}</td>
                      <td>{pendingpackage.destination}</td>
                      <td>{pendingpackage.Type}</td>
                      <td>{pendingpackage.Dimensions}</td>
                      <td>{parseFloat(pendingpackage.Weight).toFixed(2)} lbs</td>
                      <td>{pendingpackage.expeditedShipping ? "Yes" : "No"}</td>
                      <td>${pendingpackage.cost}</td>
                      <td>
                        <button className="packageRemove" onClick={() => deleteCartItem(pendingpackage.PackageID)}>
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p style={{'textAlign':'right', 'margin-right':'125px'}}>Total: ${unreceivedPackages.reduce((sum, pendingpackage) => sum + parseFloat(pendingpackage.cost || 0), 0).toFixed(2)}</p>
            </div>

            ) : isLoaded && (
              <div className="cart-message cart-message-empty">
                  <p>No pending packages found.</p>
              </div>
            )}
            {isLoading ? (
              <p>Loading...</p>
            ) : unreceivedPackages.length > 0 ? (
              <div>
                <hr></hr>
                <br></br>
              </div>
            ) : (
              <div>
              </div>
            )}
              <div className="checkout">
                <p>Subtotal from cart: ${parseFloat(totalAmount).toFixed(2)} </p>
                <p>Pending package fees: ${unreceivedPackages.reduce((sum, pendingpackage) => sum + parseFloat(pendingpackage.cost || 0), 0).toFixed(2)}</p>
                <p>Total: ${parseFloat((totalAmount + unreceivedPackages.reduce((sum, pendingpackage) => sum + parseFloat(pendingpackage.cost || 0), 0)).toFixed(2))}</p>
                <button onClick={() => navigate("/shop")}> Continue Shopping </button>
                {totalAmount > 0 || unreceivedPackages.length > 0 ? (
                      <button
                        onClick={() => {
                          navigate("/checkout");
                        }}
                      >
                        {" "}
                        Checkout{" "}
                      </button>
                  ) : (
                    ""
                  )}
              </div>
    </div>
  );
};
