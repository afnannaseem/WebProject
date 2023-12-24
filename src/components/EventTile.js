import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/EventTile.css'

const EventTile = ({ event }) => {
  const { eventName, eventType, dateTime, venue} = event;

  return (
    <div className="card text-center" id='eventTileMainDiv'>
      <div className="card-header" id='eventTileHeaderDiv'>
          <h3>Event Name: {eventName}</h3>
      </div>
      <div className="card-body" id='eventTileBodyDiv'>
        <p className="card-text">Type: {eventType}</p>
        <p className="card-text">Date: {new Date(dateTime).toLocaleString()}</p>
        <p className="card-text">Venue: {venue}</p>
        <Link to={`/event/${event._id}`} className="btn btn-primary">
          View
        </Link>
      </div>
      <div className="card-footer text-body-secondary" id='eventTileFooterDiv'>
        Posted at EMS
      </div>
    </div>
  );
};

export default EventTile;
