import React from 'react';
import { Link } from 'react-router-dom';

const Notifications = () => (
  <div className="px-4 py-5 my-5 text-center">
  <div className="col-lg-6 mx-auto" style={{ fontFamily: 'Nunito, sans-serif', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', backgroundColor: 'white', borderRadius: '20px', paddingTop: '30px', marginTop: '20px' }}>
    <h1 className="display-5 fw-bold text-body-emphasis">Notifications</h1>

    <div style={{ fontSize: '1.7rem', marginTop: '25px' }}>
      <ul style={{ listStyleType: 'none', padding: 0, paddingBottom: '10px' }}>
        <li style={{ marginTop: '15px' }}>
          <Link to="/updatenotifications" style={{ textDecoration: 'none' }}>
            <p style={{ fontSize: '1.7rem', marginTop: '25px' }}>Event Updates</p>
          </Link>
        </li>
        <li style={{ marginTop: '15px' }}>
          <Link to="/cancellationnotifications" style={{ textDecoration: 'none' }}>
            <p style={{ fontSize: '1.7rem', marginTop: '25px' }}>Event Cancellations</p>
          </Link>
        </li>
        <li style={{ marginTop: '15px' }}>
          <Link to="/insertionnotifications" style={{ textDecoration: 'none' }}>
            <p style={{ fontSize: '1.7rem', marginTop: '25px' }}>New Events</p>
          </Link>
        </li>
      </ul>
    </div>
  </div>
</div>
);

export default Notifications;
