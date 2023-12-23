import React from 'react';
import { Link } from 'react-router-dom';

const Notifications = () => (
  <div>
    <p>Notifications</p>
    <ul>
      <li>
        <Link to="/updatenotifications">Event Updates</Link>
      </li>
      <li>
        <Link to="/cancellationnotifications">Event Cancellations</Link>
      </li>
      <li>
        <Link to="/insertionnotifications">New Events</Link>
      </li>
    </ul>
  </div>
);

export default Notifications;
