import React from 'react';
import { Link} from 'react-router-dom';

const EventTile = ({ event }) => {
  const { eventName, eventType, dateTime, venue, status } = event;

  return (
    <div className="event-tile">

     <Link to={`/event/${event._id}`}>
        <h3>{eventName}</h3>
     </Link>  
      <p>{eventType}</p>
      <p>{new Date(dateTime).toLocaleString()}</p>
      <p>{venue}</p>
      <p>Status: {status}</p>
    </div>
  );
};

export default EventTile;
