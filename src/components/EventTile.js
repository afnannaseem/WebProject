import React from 'react';
import { Link } from 'react-router-dom';

const EventTile = ({ event }) => {
  const { eventName, eventType, dateTime, venue} = event;

  return (
    <div className="card text-center" style={{ fontFamily:'Nunito, sans-serif', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', marginBottom:'10px', backgroundColor:'white', border:'4px solid snow'}}>
      <div className="card-header" style={{backgroundColor:'snow', borderBottom:'3px solid #66BFBF'}}>
          <h3>Event Name: {eventName}</h3>
      </div>
      <div className="card-body" style={{ fontSize: '18px', backgroundColor:'snow' }}>
        <p className="card-text">Type: {eventType}</p>
        <p className="card-text">Date: {new Date(dateTime).toLocaleString()}</p>
        <p className="card-text">Venue: {venue}</p>
        <Link to={`/event/${event._id}`} className="btn btn-primary">
          View
        </Link>
      </div>
      <div className="card-footer text-body-secondary" style={{backgroundColor:'snow', borderTop:'3px solid #66BFBF'}}>
        Posted at EMS
      </div>
    </div>
  );
};

export default EventTile;
