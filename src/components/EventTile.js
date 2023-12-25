import React from 'react';
import { Link } from 'react-router-dom';

const EventTile = ({ event }) => {
  const { _id, eventName, eventType, dateTime, venue, servicesType, status } = event;

  return (
    <div className="card text-center" style={{ fontFamily: 'Nunito, sans-serif' }}>
      <div className="card-header">
        <h3>Event Name: {eventName}</h3>
      </div>
      <div className="card-body">
        <p className="card-text">Type: {eventType}</p>
        <p className="card-text">Date: {new Date(dateTime).toLocaleString()}</p>
        <p className="card-text">Venue: {venue}</p>
        <p className="card-text">Services: {servicesType.join(', ')}</p> {/* Displaying servicesType */}
        <p className="card-text">Status: {status}</p>
        <Link to={`/event/${_id}`} className="btn btn-primary">
          Submit Bid
        </Link>
      </div>
      <div className="card-footer text-muted">
        2 days ago
      </div>
    </div>
  );
};

export default EventTile;