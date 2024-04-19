import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../css/notification.css';
import { useNavigate } from "react-router-dom";

function SentPackages() {
  const [notify, setNotify] = useState([])
  const navigate = useNavigate();

  useEffect(() => 
  {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');
    if (!token) {
      navigate("/login");
      return;
    }
    const fetchNotifications = async () => {
      try {
        axios.get('/api/package')
        .then(response => {
            const userNotifs = response.data.filter(noti => noti.SenderID === id);
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
      <div className="container-notify" style={{'min-width':'1000px'}}>
        <div className="notification-header">
          <h1>Sent Packages</h1>
        </div>
        <div className="notifcation-container">
          <main className="notification-card">
            <div className="description-notify">
              {notify.length > 0 ? (
                <table>
                    <thead>
                        <th>Weight</th>
                        <th>Dimensions</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Date Sent</th>
                        <th>Destination</th>
                        <th>Receiver</th>
                        <th>Cost</th>
                    </thead>
                  <tbody>
                    {notify.map(notification => (
                      <tr key={notification.userID} className="notify-tr">
                        <td>{notification.Weight}</td>
                        <td>{notification.Dimensions}</td>
                        <td>{notification.Type}</td>
                        <td>{notification.Status}</td>
                        <td className="notify-td">{(new Date(notification.DateSent).toLocaleString("en-US", { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }))}</td>
                        <td>{notification.destination}</td>
                        <td>{notification.recipientFirstName} {notification.recipientLastName}</td>
                        <td>{notification.cost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No Sent Packages</p>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );  
};

export default SentPackages;

