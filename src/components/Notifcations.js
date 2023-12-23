import React from 'react';
import { Link } from 'react-router-dom';

const Notifications = () => (
  <div>
    <p>Notifications</p>
    <ul>
      <li>
        <Link to="/notifications/event-update">Event Updates</Link>
      </li>
      <li>
        <Link to="/notifications/event-cancellation">Event Cancellations</Link>
      </li>
      <li>
        <Link to="/notifications/new-events">New Events</Link>
      </li>
    </ul>
  </div>
);

export default Notifications;
