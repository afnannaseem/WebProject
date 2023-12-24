import React, { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [bookedEventsSummary, setBookedEventsSummary] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [name, setName]= useState(null);
  const [email, setEmail]=useState(null);
  const [error, setError]= useState(null);
  const navigate = useNavigate();

  useEffect(() => {
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
  },[]);

  const handleUpdate = async () => {
    setShowUpdateForm(true);
  };

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim()) {
      setError('Enter the details');
      return;
    }
    const token = localStorage.getItem('token');
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    try {
      const response = await fetch(`${apiUrl}attendee/profile`, {
        method: 'PUT',
        headers: {
          'token': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });
      const data = await response.json();
      setError(data.message);
      if(data.message==='Profile Updated Successfully') {
        setShowUpdateForm(false); 
        setTimeout(() => {
          localStorage.removeItem('token');
          navigate('/login')
        }, 3000);
      }
    } catch (error) {
      console.error('Error submitting feedback:', error.message);
    }
  };

  return (
    <div className="my-profile">
      <h1>My Profile</h1>
      {profileData ? (
        <div>
          <p>Email: {profileData.email}</p>
          <p>Name: {profileData.name}</p>
          <button onClick={handleUpdate}>Update Your Profile</button>
          {showUpdateForm && (
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button onClick={handleSubmit}>Submit</button>
            </div>
          )}
          {error && (
          <div>
          <p>{error}</p>
          <button onClick={() => setError(null)}>Close</button>
        </div>
           )}
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
      {bookedEventsSummary ? (
        <div>
          <h3>Booked Events</h3>
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
