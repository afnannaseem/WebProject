import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const EventBidDetail = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [message, setMessage] = useState('');
  const [selectedServiceType, setSelectedServiceType] = useState('');
  const [submitStatus, setSubmitStatus] = useState('');
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch event details
    const token = localStorage.getItem('token');
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    fetch(`${apiUrl}search/event/${eventId}`, {
      headers: {
        'token': token,
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error fetching event: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => setEvent(data))
    .catch(error => console.error('Error fetching event:', error.message));
  }, [eventId]);

  const handleBidSubmission = async () => {
    if (!selectedServiceType || !bidAmount.trim() || !message.trim()) {
      setSubmitStatus('Please fill all required fields.');
      return;
    }
    setConfirmSubmit(true);
  };

  const confirmAndSubmitBid = async () => {
    const token = localStorage.getItem('token');
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    try {
      const response = await fetch(`${apiUrl}bidding/submit`, {
        method: 'POST',
        headers: {
          'token': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventId,
          serviceType: selectedServiceType,
          bidAmount,
          message,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Error submitting bid');
      }
      setSubmitStatus('Bid submitted successfully');
      setTimeout(() => navigate('/bids'), 3000); // Redirect to bids page after 3 seconds
    } catch (error) {
      setSubmitStatus(error.message);
    }
  };

  return (
    <div className="event-bid-detail">
      {event ? (
        <div>
          <h1>{event.eventName}</h1>
          <p>Type: {event.eventType}</p>
          <p>Date: {new Date(event.dateTime).toLocaleString()}</p>
          <p>Venue: {event.venue}</p>
          <p>Services Available: {event.servicesType.join(', ')}</p>
          <div>
            <select value={selectedServiceType} onChange={e => setSelectedServiceType(e.target.value)}>
              <option value="">Select Service Type</option>
              {event.servicesType.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </select>
            <input type="number" placeholder="Bid Amount" value={bidAmount} onChange={e => setBidAmount(e.target.value)} />
            <textarea placeholder="Message" value={message} onChange={e => setMessage(e.target.value)}></textarea>
            <button onClick={handleBidSubmission}>Submit Bid</button>
          </div>
        </div>
      ) : (
        <p>Loading event details...</p>
      )}
      {submitStatus && <p>{submitStatus}</p>}
      {confirmSubmit && (
        <div>
          <p>Are you sure you want to submit this bid? You cannot edit it later.</p>
          <button onClick={confirmAndSubmitBid}>Yes, Submit</button>
          <button onClick={() => setConfirmSubmit(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default EventBidDetail;
