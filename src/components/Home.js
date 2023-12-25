import React, { useState, useEffect } from 'react';
import EventTile from './EventTile';

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [searchParams, setSearchParams] = useState({
    eventName: '',
    eventType: '',
    venue: '',
    serviceType: ''
  });

  useEffect(() => {
    fetchAllEvents();
  }, []);

  const fetchAllEvents = () => {
    const token = localStorage.getItem('token');
    const apiUrl = process.env.REACT_APP_API_BASE_URL; // Update with your API URL

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
    const apiUrl = process.env.REACT_APP_API_BASE_URL; // Update with your API URL
    const searchQuery = new URLSearchParams(searchParams).toString();

    fetch(`${apiUrl}search/events?${searchQuery}`, {
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
    if (searchParams.eventName || searchParams.eventType || searchParams.venue || searchParams.serviceType) {
      searchEvents();
    }
  }, [searchParams]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prevParams => ({
      ...prevParams,
      [name]: value
    }));
  };

  return (
    <div className="container home-page" style={{ fontFamily: 'Nunito, sans-serif', backgroundColor: '#E3F4F4' }}>
      <h1 className="mt-4">Search Events</h1>
      <div className="row mt-4">
        <div className="col-md-3">
          {/* Search Filters */}
          <div className="mb-3">
            <label className="form-label">Event Name:</label>
            <input
              type="text"
              className="form-control"
              name="eventName"
              value={searchParams.eventName}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Event Type:</label>
            <input
              type="text"
              className="form-control"
              name="eventType"
              value={searchParams.eventType}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Venue:</label>
            <input
              type="text"
              className="form-control"
              name="venue"
              value={searchParams.venue}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Service Type:</label>
            <input
              type="text"
              className="form-control"
              name="serviceType"
              value={searchParams.serviceType}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="col-md-9">
          {/* Event Tiles */}
          <div className="event-list">
            {events.map(event => (
              <EventTile key={event._id} event={event} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
