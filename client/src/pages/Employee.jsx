import React, { /*useEffect,*/ useState } from 'react';
// import axios from 'axios';
import '../css/Employee.css';

const Employee = () => {
    const [orders, /*setOrders*/] = useState([]);

    // useEffect(() => {
    //     const fetchOrders = async () => {
    //         // const result = await axios.get('http://localhost:5000/api/packages');
    //         setOrders(result.data);
    //     };
    //     fetchOrders();
    // }, []);



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
};

export default Employee;
