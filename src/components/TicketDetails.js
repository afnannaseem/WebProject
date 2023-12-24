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
    <div className="px-4 py-5 my-5 text-center">
  {loading ? (
    <p style={{ fontSize: '1.7rem', marginTop: '25px' }}>Loading ticket details...</p>
  ) : (
    <div className="col-lg-6 mx-auto" style={{ fontFamily: 'Nunito, sans-serif', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', backgroundColor: 'white', borderRadius: '20px', paddingTop: '30px', marginTop: '20px', paddingBottom:'20px' }}>
      <h1 className="display-5 fw-bold text-body-emphasis">Ticket Details</h1>
      
      <div style={{ fontSize: '1.4rem', marginTop: '25px' }}>
        <p>Ticket ID: {ticket._id}</p>
        <p>Event Name: {event.eventName}</p>
        <p>Type: {ticket.type}</p>
        <p>Price: {ticket.price}</p>
        <p>Purchase Date: {new Date(ticket.purchaseDate).toLocaleString()}</p>
        {error && (
        <div className="alert alert-info" role="alert">
          <p style={{ fontSize: '1.4rem' }}>{error}</p>
          <button  type="button" className="btn-close" onClick={() => setError(null)}></button>
        </div>
        )}
        <button style={{ marginTop: '15px' }} onClick={handleCancelTicket} className="btn btn-danger">Cancel Ticket</button>
        <button style={{ marginTop: '15px', marginLeft: '10px' }} onClick={handleUpdateTicket} className="btn btn-primary">Update Ticket</button>

        {showUpdateForm && (
          <div style={{ marginTop: '15px', width:'400px', marginLeft:'22%'}}>
            <label htmlFor="ticketType">Ticket Type:</label>
            <select
              id="ticketType"
              value={ticketType}
              onChange={(e) => setTicketType(e.target.value)}
              className="form-select"
            >
              <option value="regular">Regular</option>
              <option value="vip">VIP</option>
            </select>

            <button style={{ marginTop: '10px' }} onClick={handleSubmit} className="btn btn-success">Submit</button>
            <button style={{ marginTop: '10px', marginLeft: '10px' }} onClick={() => setShowUpdateForm(false)} className="btn btn-secondary">Close</button>
          </div>
        )}
      </div>

     
    </div>
  )}
</div>
  );
};

export default TicketDetails;
