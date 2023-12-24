import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CancelNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
        const apiUrl = process.env.REACT_APP_API_BASE_URL;
        const response = await fetch(`${apiUrl}notification/event-cancellation`, {
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
        setNotifications(data.eventCancelNotifications);
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
      console.error('Error canceling notification:', error.message);
    }
  };

  return (
    <div className="px-4 py-5 my-5 text-center">
      <div className="col-lg-6 mx-auto" style={{ fontFamily: 'Nunito, sans-serif', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', backgroundColor: 'white', borderRadius: '20px', paddingTop: '30px', marginTop: '20px' }}>
        <h1 className="display-5 fw-bold text-body-emphasis">Cancellation Notifications</h1>

        {error ? (
          <p>{error}</p>
        ) : (
          <div style={{ fontSize: '1.5rem', marginTop: '25px', paddingBottom: '20px' }}>
            {notifications.map((notification, index) => (
              <div key={index}>
                {notification.isRead ? (
                  <div className="alert alert-secondary" role="alert" style={{ margin: '20px' }}>
                    <p>{notification.message}</p>
                  </div>
                ) : (
                  <div className="alert alert-info" role="alert" style={{ margin: '20px' }}>
                    <p>{notification.message}</p>
                    <Link to={`/event/${notification.eventId}`} style={{ textDecoration: 'none' }}>
                      <p>Event ID: {notification.eventId}</p>
                    </Link>
                    <p>Date: {new Date(notification.createdAt).toLocaleString()}</p>
                    <button type="button" className="btn-close" onClick={() => handleIsRead(notification._id)}></button>
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

export default CancelNotifications;
