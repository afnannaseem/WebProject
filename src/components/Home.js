import React, { useState, useEffect } from 'react';
import EventTile from './EventTile';

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [searchParams, setSearchParams] = useState({
    eventName: '',
    eventType: '',
    date: '',
    venue: '',
  });
  
  useEffect(() => {
    // Fetch events from your backend API using fetch and include the token
    const token = localStorage.getItem('token');
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    const searchQuery = new URLSearchParams(searchParams).toString();

    fetch(`${apiUrl}event/search?${searchQuery}`, {
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
  }, [searchParams]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prevParams => ({
      ...prevParams,
      [name]: value,
    }));
  };

  

  return (
    <div className="home-page">
      <h1>All Events</h1>
        <div>
          <label>Event Name:</label>
          <input
            type="text"
            name="eventName"
            value={searchParams.eventName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Event Type:</label>
          <input
            type="text"
            name="eventType"
            value={searchParams.eventType}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={searchParams.date}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Venue:</label>
          <input
            type="text"
            name="venue"
            value={searchParams.venue}
            onChange={handleInputChange}
          />
        </div>

      <div className="event-list">
        {events.map(event => (
          <EventTile key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;