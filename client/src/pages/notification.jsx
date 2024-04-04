import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../css/notification.css';

function Notification() {
    const [notify, setNotify] = useState([])


    useEffect(() => {
        const fetchPackage = async () => {
          try {
            const response = await axios.get('/api/notify');
            setNotify(response.data);
          } catch (error) {
            console.error('Notify error:', error);
          }
        };
    
        fetchPackage();
      }, []);
    

  
  return (
    <div class='notification-page'>
         <div class="container-notify">
             <div class="notifcation-container">
                 <header class="header-notify">   
                    <div class="notification-header">
                        <h1>Notification</h1>
                    </div>
                 </header>
                 <main class="notification-card">
                    <div class="description-notify">
                        <p> Your Package has arrived </p>
                        <tbody>
                             {notify && notify.map((notify) => {
                                 return (
                                     <tr key={notify.userID} className="notify-tr">
                                          <td>{notify.notification_id}</td> 
                                          <td>{notify.userID}</td>
                                          <td class="notify-td">{notify.message}</td>
                                          <td class="notify-td">{notify.timestamp}</td>
                                           </tr>
                                           ) })}
                                           </tbody>
                                           </div>
                                           </main>
            </div>
        </div>
    </div>

  );


};
export default Notification;

