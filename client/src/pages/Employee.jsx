import React, { useEffect, useState } from 'react';
 import axios from 'axios';
import '../css/Employee.css';
import { useNavigate } from "react-router-dom";


const Employee = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            // const result = await axios.get('http://localhost:5000/api/packages');
            // setOrders(result.data);
        };
        fetchOrders();
    }, []);


    const ProfilePage = () => {
      
        const navigate = useNavigate();
        const [user, setUser] = useState(null);
    
        const handleNavigation = (event, route) => {
            event.preventDefault();
            // Navigate to the specified route
            navigate(route);
        };
        useEffect(() => {
          const token = localStorage.getItem('token');
          const id = localStorage.getItem('id');
          if (!token) {
            // If no token found, redirect to login page
            navigate("/login");
          }
          else{
            axios.get('/api/users')
            .then(response => {
                const userData = response.data.find(user => user.UserID === id); // Find the user by id
                if (userData) {
                  setUser(userData); // Set the found user into the users state, as an array for consistency
                } else {
                  console.log('User not found');
                  // Handle the case where the user is not found
                }
              })
              .catch(error => console.error('Error:', error));
          }
        }, [navigate]);


    return (
        <div className='employee-container'>
            <br></br>
            <h1>Orders</h1>
            {/* <button onClick={()=>{window.location.href="/track"}}>Track Package</button> */}
            <button onClick={()=>{window.location.href="/add-package"}}>+</button>
            <ul>
                {orders.map((order) => (
                    <li key={order.trackingNumber}>
                        {order.recipientName} - {order.trackingNumber}
                    </li>
                ))}
            </ul>
            {/* Modal or Form Component for adding a new package */}
        </div>
    );
    }
}
export default Employee;
