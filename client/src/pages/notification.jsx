import React from 'react';
import '../css/notification.css';

function Notification() {
  
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
                    </div>
                 </main>
            </div>
        </div>
    </div>

  );


};
export default Notification;

