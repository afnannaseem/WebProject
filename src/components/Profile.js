import React from 'react';
import { Link } from 'react-router-dom';
const Profile = () => (
  <div>
    <p>Profile</p>
    <ul>
      <li>
        <Link to="/myprofile">My Profile</Link>
      </li>
      <li>
      <Link to="/login">My Tickets</Link>
      </li>
      <li>
      <Link to="/logout">My Notifications</Link>
      </li>
    </ul>
  </div>
);

export default Profile;