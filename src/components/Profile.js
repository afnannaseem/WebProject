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
      <Link to="/services">My Services</Link>
      </li>
      <li>
      <Link to="/bookings">My Bookings</Link>
      </li>
      <li>
      <Link to="/bids">My Bids</Link>
      </li>
    </ul>
  </div>
);

export default Profile;