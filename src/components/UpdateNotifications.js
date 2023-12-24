import React, { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';
import '../styles/AllNotifications.css'

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
        body: JSON.stringify({notificationId: id}),
      });
      
    } catch (error) {
      console.error('Error updating notification:', error.message);
    }
  };

  return (
    
      <div className="px-4 py-5 my-5 text-center">
        <div className="col-lg-6 mx-auto" id='allNotificationsSecondDiv'>
          <h1 className="display-5 fw-bold text-body-emphasis">Event Update Notifications</h1>
          {error ? <p>{error}</p> : (
            <div id='allNotificationsNotificationDiv'>
              {notifications.map((notification, index) => (
                <div key={index}>
                  {notification.isRead ? (
                    <div className="alert alert-secondary" role="alert" id='allNotificationsParagraph'>
                      <p>{notification.message}</p>
                    </div>
                  ) : (
                    <div className="alert alert-info" role="alert" id='allNotificationsParagraph'>
                      <p>{notification.message}</p>
                      <Link to={`/event/${notification.eventId}`} id='allNotificationsLinks'>
                        <p>Event ID: {notification.eventId}</p>
                      </Link>
                      <p>Date: {new Date(notification.createdAt).toLocaleString()}</p>
                      <button  type="button" className="btn-close" onClick={() => handleIsRead(notification._id)}>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
  );
};

export default UpdateNotifications;
