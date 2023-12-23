import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const TicketDetails = () => {
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState(null);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [ticketType, setTicketType]= useState('regular');
  const [flag, setFlag]= useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const apiUrl = process.env.REACT_APP_API_BASE_URL;
        const response= await fetch(`${apiUrl}ticket/${ticketId}`, {
            method: 'GET',
          headers: {
            'token': token,
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`Error fetching ticket details: ${response.statusText}`);
        }

        const data = await response.json();
        setTicket(data.ticket);
        setEvent(data.event);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [ticketId, flag]);

  const handleCancelTicket = async () => {
    try {
      const token = localStorage.getItem('token');
      const apiUrl = process.env.REACT_APP_API_BASE_URL;
      const response = await fetch(`${apiUrl}ticket/cancel/${ticketId}`, {
        method: 'POST',
        headers: {
          'token': token,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      setError(data.message);
    } catch (error) {
      console.error('Error canceling ticket:', error.message);
    }
  };
  const handleUpdateTicket = async () => {
   setShowUpdateForm(true);
  };

  const handleSubmit = async () => {
   
    const token = localStorage.getItem('token');
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    try {
      const response = await fetch(`${apiUrl}ticket/update/${ticketId}`, {
        method: 'PUT',
        headers: {
          'token': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ticketType
        }),
      });
      const data = await response.json();
      setError(data.message);
      setFlag(!flag)
    } catch (error) {
      console.error('Error updating ticket', error.message);
    }
  };

  return (
    <div>
      <h1>Ticket Details</h1>
      {loading ? (
        <p>Loading ticket details...</p>
      ) : (
        <div>
          <p>Ticket ID: {ticket._id}</p>
          <p>Event Name: {event.eventName}</p>
          <p>type: {ticket.type}</p>
          <p>price: {ticket.price}</p>
          <p>purchase date:{new Date(ticket.purchaseDate).toLocaleString()}</p>
          <button onClick={handleCancelTicket}>Cancel Ticket</button>
          <button onClick={handleUpdateTicket}>Update Ticket</button>
          {showUpdateForm && (
            <div>
              <label htmlFor="ticketType">Ticket Type:</label>
             <select
              id="ticketType"
              value={ticketType}
              onChange={(e) => setTicketType(e.target.value)}
            >
            <option value="regular">Regular</option>
            <option value="vip">VIP</option>
             </select>
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={() => setShowUpdateForm(false)}>Close</button>
            </div>
          )}
        </div>
        
      )}
      {error && (
        <div>
          <p>{error}</p>
          <button onClick={() => setError(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default TicketDetails;
