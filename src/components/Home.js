import React, { useState, useEffect } from 'react';
import EventTile from './EventTile';

const HomePage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events from your backend API using fetch and include the token
    const token = localStorage.getItem('token');
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    fetch(`${apiUrl}event/allevents`, {
        headers: {
            'token': token,
            'Content-Type': 'application/json',
          },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error fetching events: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => setEvents(data))
      .catch(error => console.error(error.message));
  }, []);

  return (
    <div className="home-page">
      <h1>All Events</h1>
      <div className="event-list">
        {events.map(event => (
          <EventTile key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;