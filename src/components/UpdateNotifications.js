import React, { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';

const UpdateNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
        const apiUrl = process.env.REACT_APP_API_BASE_URL;
        const response = await fetch(`${apiUrl}notification/event-update`, {
          method: 'GET',
          headers: {
            'token': token,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch notifications: ${response.status}`);
        }

        const data = await response.json();
        setNotifications(data.eventUpdateNotifications);
      } catch (error) {
        setError('Error fetching notifications.');
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  },); 

  const handleIsRead = async ({index}) => {
    const token = localStorage.getItem('token');
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    try {
      await fetch(`${apiUrl}notification/isReadByIndex`, {
        method: 'POST',
        headers: {
          'token': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({notificationIndex: index}),
      });
      
    } catch (error) {
      console.error('Error updating notification:', error.message);
    }
  };

  return (
    <div>
      <h2>Event Update Notifications</h2>
      {error && <p>{error}</p>}
      <ul>
        {notifications.map((notification, index) => (
          <div> 
          {notification.isRead ? 
          (<div>
          <p>{notification.message}</p>
           </div>
          )
          :(
           <div>
           <p>{notification.message}</p>
           <Link to={`/event/${notification.eventId}`}>
              <p>Event ID: {notification.eventId}</p>
           </Link> 
           <p>Date: {new Date(notification.createdAt).toLocaleString()}</p>
           <button onClick={() => handleIsRead({index})}>Mark as Read</button>
           </div> 
          )
          }
          
          </div>
        ))}
      </ul>
    </div>
  );
};

export default UpdateNotifications;
