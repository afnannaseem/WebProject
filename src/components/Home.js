import React, { useState, useEffect } from 'react';
import EventTile from './EventTile';
import '../style/HomePage.css';


const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchAllEvents();
  }, []);

  const fetchAllEvents = () => {
    const token = localStorage.getItem('token');
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    fetch(`${apiUrl}search/allevents`, {
      method: 'GET',
      headers: {
        'token': token,
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => setEvents(data))
    .catch(error => console.error('Error fetching all events:', error));
  };

  const searchEvents = () => {
    const token = localStorage.getItem('token');
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    fetch(`${apiUrl}search/events?query=${searchTerm}`, {
      method: 'GET',
      headers: {
        'token': token,
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => setEvents(data))
    .catch(error => console.error('Error searching for events:', error));
  };

  useEffect(() => {
    if (searchTerm) {
      searchEvents();
    } else {
      fetchAllEvents();
    }
  }, [searchTerm]);

  return (
    <div className="container home-page">
      <h1 className="mt-4">Search Events</h1>
      <div className="search-bar">
        <input
          type="text"
          className="form-control"
          placeholder="Search by event name, type, venue, or service type"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
