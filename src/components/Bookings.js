import React, { useState, useEffect } from 'react';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const token = localStorage.getItem('token');
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    try {
      const response = await fetch(`${apiUrl}booking/`, {
        method: 'GET',
        headers: {
          'token': token,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching bookings: ${response.statusText}`);
      }

      const data = await response.json();
      setBookings(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId, newStatus) => {
    const token = localStorage.getItem('token');
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    const route = newStatus === 'confirmed' ? 'accept' : 'reject';

    try {
      const response = await fetch(`${apiUrl}booking/${route}/${bookingId}`, {
        method: 'PATCH',
        headers: {
          'token': token,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json(); // Fetch the detailed error message from response
      throw new Error(errorData.message || `Error updating booking status: ${response.statusText}`);
    }

      await fetchBookings(); // Refresh the bookings list
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Booking List</h1>
      {loading ? (
        <p>Loading bookings...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {bookings.map(booking => (
            <li key={booking.bookingId}>
              <p>Event Name: {booking.eventName}</p>
              <p>Date of Event: {new Date(booking.eventDate).toLocaleDateString()}</p>
              <p>Service: {booking.serviceName}</p>
              <p>Booking Date: {new Date(booking.bookingDate).toLocaleDateString()}</p>
              <p>Status: {booking.status}</p>
              {booking.status === 'pending' && (
                <>
                  <button onClick={() => updateBookingStatus(booking.bookingId, 'confirmed')}>Accept</button>
                  <button onClick={() => updateBookingStatus(booking.bookingId, 'cancelled')}>Reject</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookingList;
