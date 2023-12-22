import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EventDetail = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [purchaseStatus, setPurchaseStatus] = useState('');
  const [feedbackStatus, setFeedbackStatus] = useState('');
  const [feedbackSuccess, setFeedbackSuccess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState('');
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  

  useEffect(() => {
    // Fetch event details from your backend API using fetch
    const token = localStorage.getItem('token');
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    fetch(`${apiUrl}event/${eventId}`, {
        method: 'GET',
      headers: {
        'token': token,
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error fetching event details: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => setEvent(data))
      .catch(error => console.error(error.message));
  }, [eventId]);

  const purchaseRegularTicket = async () => {
     // Make a POST request to the backend route for purchasing regular tickets
    const token = localStorage.getItem('token');
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    try {
      const response = await fetch(`${apiUrl}ticket/purchaseregular/${eventId}`, {
        method: 'POST',
        headers: {
          'token': token,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setPurchaseStatus(data.message); 
      checkForFeedback();
    } catch (error) {
      console.error('Error purchasing regular ticket:', error.message);
    }
  };

  const purchaseVipTicket = async () => {
    // Make a POST request to the backend route for purchasing VIP tickets
    const token = localStorage.getItem('token');
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    try {
      const response = await fetch(`${apiUrl}ticket/purchasevip/${eventId}`, {
        method: 'POST',
        headers: {
          'token': token,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setPurchaseStatus(data.message);
      checkForFeedback();
    } catch (error) {
      console.error('Error purchasing VIP ticket:', error.message);
    }
  };

  const checkForFeedback = async () => {
    const token = localStorage.getItem('token');
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    try {
      const response = await fetch(`${apiUrl}event/checkForFeedback/${eventId}`, {
        headers: {
          'token': token,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        setShowFeedbackForm(false);
      }
      else{
        setShowFeedbackForm(true);
      }
      const data = await response.json();
      if(data.message==='Feedback submitted for this event'){
        setFeedbackStatus(data.message);
      }
    } catch (error) {
      console.error('Error submitting feedback:', error.message);
    }

  };

  const submitFeedback = async () => {
    if (!feedback.trim() || !rating.trim()) {
      setFeedbackSuccess('Enter the details');
      return;
    }
    const token = localStorage.getItem('token');
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    try {
      const response = await fetch(`${apiUrl}event/give-feedback/${eventId}`, {
        method: 'POST',
        headers: {
          'token': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ feedback, rating }),
      });
      const data = await response.json();
      setFeedbackSuccess(data.message);
      if(data.message==='Feedback submitted successfully') {
        setShowFeedbackForm(false); 
      }
    } catch (error) {
      console.error('Error submitting feedback:', error.message);
    }
  };

  return (
    <div className="event-detail">
      {event ? (
        <div>
          <h1>{event.eventName}</h1>
          <p>Event Type: {event.eventType}</p>
          <p>Date: {new Date(event.dateTime).toLocaleString()}</p>
          <p>Event Venue: {event.venue}</p>
          <p>Price of regular ticket: {event.priceOfRegularTicket}</p>
          <p>Price of vip ticket: {event.priceOfVipTicket}</p>
          <button onClick={purchaseRegularTicket}>Purchase Regular Ticket</button>
          <button onClick={purchaseVipTicket}>Purchase VIP Ticket</button>
          {checkForFeedback() && showFeedbackForm && (
            <div>
              <label htmlFor="feedback">Feedback:</label>
              <input
                type="text"
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
              <label htmlFor="rating">Rating:</label>
              <input
                type="number"
                id="rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
              <button onClick={submitFeedback}>Submit Feedback</button>
            </div>
          )}
        </div>
      ) : (
        <p>Loading event details...</p>
      )}
      {purchaseStatus && (
        <div>
          <p>{purchaseStatus}</p>
          <button onClick={() => setPurchaseStatus(null)}>Close</button>
        </div>
      )}
      {!feedbackSuccess &&  (
        <div>
          <p>{feedbackStatus}</p>
        </div>
      )}
      {feedbackSuccess && (
        <div>
          <p>{feedbackSuccess}</p>
          <button onClick={() => setFeedbackSuccess(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default EventDetail;
