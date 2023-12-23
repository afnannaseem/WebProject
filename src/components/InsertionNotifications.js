import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const InsertNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
        const apiUrl = process.env.REACT_APP_API_BASE_URL;
        const response = await fetch(`${apiUrl}notification/new-event`, {
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
        setNotifications(data.eventNewNotifications);
      } catch (error) {
        setError('Error fetching notifications.');
      }
    };

    fetchNotifications();
  },); 

  const handleIsRead = async (id) => {
    const token = localStorage.getItem('token');
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    try {
      await fetch(`${apiUrl}notification/isReadById`, {
        method: 'POST',
        headers: {
          'token': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ notificationId: id }),
      });
    } catch (error) {
      console.error('Error marking notification as read:', error.message);
    }
  };

  return (
    <div>
      <h2>Insertion Notifications</h2>
      {error ? <p>{error}</p> :
        <div>
          {notifications.map((notification, index) => (
            <div key={index}>
              {notification.isRead ? (
                <div>
                  <p>{notification.message}</p>
                </div>
              ) : (
                <div>
                  <p>{notification.message}</p>
                  <Link to={`/event/${notification.eventId}`}>
                    <p>Event ID: {notification.eventId}</p>
                  </Link>
                  <p>Date: {new Date(notification.createdAt).toLocaleString()}</p>
                  <button onClick={() => handleIsRead(notification._id)}>Mark as Read</button>
                </div>
              )}
            </div>
          ))}
        </div>
      }
    </div>
  );
};

export default InsertNotifications;
