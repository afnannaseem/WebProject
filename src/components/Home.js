import React, { useState, useEffect } from 'react';
import EventTile from './EventTile';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';

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
    <div className="container home-page px-3" style={{ fontFamily:'Nunito, sans-serif', backgroundColor:'#EAF6F6', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius:'20px', paddingTop:'1px', marginTop:'20px', paddingBottom:'10px'}}>
    <h2 className="mt-4">Search <SearchSharpIcon fontSize='large'/></h2>
    <div className="row mt-4">
      <div className="col-md-3">
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
          <label className="form-label">Date:</label>
          <input
            type="date"
            className="form-control"
            name="date"
            value={searchParams.date}
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
      </div>
      <div className="col-md-9">
        <div className="event-list" >
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