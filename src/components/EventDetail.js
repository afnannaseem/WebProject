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
      console.log(data.message);
      if(data.message!=='Feedback can be given'){
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
    <div className="px-4 py-5 my-5 text-center" >
    {event ? (
      <div className="col-lg-6 mx-auto" style={{ fontFamily:'Nunito, sans-serif', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor:'white', borderRadius:'20px', paddingTop:'30px', marginTop:'20px'}}>
        <h1 className="display-5 fw-bold text-body-emphasis">{event.eventName}</h1>
        <p style={{fontSize:'1.7rem', marginTop:'25px'}}>Event Type: {event.eventType}</p>
        <p style={{fontSize:'1.7rem', marginTop:'25px'}}>Date: {new Date(event.dateTime).toLocaleString()}</p>
        <p style={{fontSize:'1.7rem', marginTop:'25px'}}>Event Venue: {event.venue}</p>
        <p style={{fontSize:'1.7rem', marginTop:'25px'}}>Event Status: {event.status}</p>
        <p style={{fontSize:'1.7rem', marginTop:'25px'}}>Price of regular ticket: {event.priceOfRegularTicket}</p>
        <p style={{fontSize:'1.7rem', marginTop:'25px'}}>Price of VIP ticket: {event.priceOfVipTicket}</p>
        {purchaseStatus && (
          <div className="alert alert-info" role="alert">
            <p>{purchaseStatus}</p>
            <button type="button" className="btn-close" onClick={() => setPurchaseStatus(null)}></button>
          </div>
        )}
        <button style={{ margin:'30px'}} onClick={purchaseRegularTicket} className="btn btn-outline-secondary btn-lg px-4 gap-3">Purchase Regular Ticket</button>
        <button style={{ margin:'30px'}} onClick={purchaseVipTicket} className="btn btn-primary btn-lg px-4">Purchase VIP Ticket</button>
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
        {!feedbackSuccess && (
          <div className="alert alert-info" role="alert">
            <p style={{fontSize:'1.7rem', marginTop:'25px'}}>{feedbackStatus}</p>
          </div>
        )}
        {feedbackSuccess && (
          <div className="alert alert-info" role="alert">
            <p>{feedbackSuccess}</p>
            <button type="button" className="btn-close" onClick={() => setFeedbackSuccess(null)}></button>
          </div>
        )}
      </div>
    ) : (
      <p>Loading event details...</p>
    )}
    
  </div>
  );
};

export default EventDetail;
