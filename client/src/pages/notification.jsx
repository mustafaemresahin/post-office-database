import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../css/notification.css';
import { useNavigate } from "react-router-dom";

function Notification() {
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
        axios.get('/api/notify')
        .then(response => {
            const userNotifs = response.data.filter(noti => noti.userID === id); // Find the package by id
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
        <div className="notifcation-container">
          <header className="header-notify">   
            <div className="notification-header">
              <h1>Notification</h1>
            </div>
          </header>
          <main className="notification-card">
            <div className="description-notify">
              {notify.length > 0 ? (
                <table>
                  <tbody>
                    {notify.map(notification => (
                      <tr key={notification.userID} className="notify-tr">
                        <td>{notification.notification_id}</td> 
                        <td className="notify-td">{notification.message}</td>
                        <td className="notify-td">{notification.timestamp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No notifications</p>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );  
};

export default Notification;

