import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EventDetail = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    // Fetch event details from your backend API using fetch
    const token = localStorage.getItem('token');
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    fetch(`${apiUrl}event/${eventId}`, {
        method: 'GET',
      headers: {
        'token': token,
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error fetching event details: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => setEvent(data))
      .catch(error => console.error(error.message));
  }, [eventId]);

  return (
    <div className="event-detail">
      {event ? (
        <div>
          <h1>{event.eventName}</h1>
          <p>Event Type: {event.eventType}</p>
          <p>Event Date: {event.dateTime}</p>
          <p>Event Venue: {event.venue}</p>
          <p>Price of regular ticket: {event.priceOfRegularTicket}</p>
          <p>Price of vip ticket: {event.priceOfVipTicket}</p>
        </div>
      ) : (
        <p>Loading event details...</p>
      )}
    </div>
  );
};

export default EventDetail;
