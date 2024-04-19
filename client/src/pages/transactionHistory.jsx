import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../css/notification.css';
import { useNavigate } from "react-router-dom";

function TransactionHistory() {
  const [notify, setNotify] = useState([])
  const navigate = useNavigate();

  useEffect(() => 
  {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('cartId');
    if (!token) {
      navigate("/login");
      return;
    }
    const fetchNotifications = async () => {
      try {
        axios.get('/api/transaction')
        .then(response => {
            const userNotifs = response.data.filter(noti => noti.CartID === id);
            if (!userNotifs) {
              console.log('No Notifications');
            }
            else{
              setNotify(userNotifs);
              console.log(userNotifs);
            }
        })
        .catch(error => console.error('Error:', error));
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    fetchNotifications();
  }, [navigate]);
    
  return (
    <div className='notification-page'>
      <div className="container-notify">
        <div className="notification-header">
          <h1>Transaction History</h1>
        </div>
        <div className="notifcation-container">
          <main className="notification-card">
            <div className="description-notify">
              {notify.length > 0 ? (
                <table>
                    <thead>
                        <th>Transaction ID</th>
                        <th>Transaction Type</th>
                        <th>Total Amount</th>
                        <th>Date</th>
                    </thead>
                  <tbody>
                    {notify.map(notification => (
                      <tr key={notification.userID} className="notify-tr">
                        <td>{notification.TransactionID}</td>
                        <td>{notification.TransactionType}</td>
                        <td className="notify-td">{notification.TotalAmount}</td>
                        <td className="notify-td">{(new Date(notification.TransactionDate).toLocaleString("en-US", { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }))}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No Transaction History</p>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );  
};

export default TransactionHistory;

