import React, { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';

const MyProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [bookedEventsSummary, setBookedEventsSummary] = useState(null);

  useEffect(() => {
    // Fetch attendee profile from the backend API using fetch
    const token = localStorage.getItem('token');
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    fetch(`${apiUrl}attendee/profile`, {
      method: 'GET',
      headers: {
        'token': token,
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error fetching profile: ${response.statusText}`);
        }
        //console.log(response.json());
        return response.json();
      })
      .then(data => setProfileData(data))
      .catch(error => console.error(error.message));

      // Fetch booked events summary
    fetch(`${apiUrl}attendee/bookedEvents`, {
        method: 'GET',
        headers: {
          'token': token,
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Error fetching booked events: ${response.statusText}`);
          }
          return response.json();
        })
        .then(data => setBookedEventsSummary(data))
        .catch(error => console.error(error.message));
  }, []);

  

  return (
    <div className="my-profile">
      <h1>My Profile</h1>
      {profileData ? (
        <div>
          <p>Email: {profileData.email}</p>
          <p>Name: {profileData.name}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
      {bookedEventsSummary ? (
        <div>
          <p>Booked Events</p>
          <ul>
            {bookedEventsSummary.map(event => (
              <div>
              <Link to={`/event/${event.eventId}`}>
                 <h6>Event: {event.eventName}</h6>
              </Link> 
              <p>Regular Tickets: {event.regularTickets}</p>
              <p>VIP Tickets: {event.vipTickets}</p>
              <p>Total Tickets: {event.totalTickets}</p>
              </div>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading booked events...</p>
      )}
    </div>
  );
};

export default MyProfile;
