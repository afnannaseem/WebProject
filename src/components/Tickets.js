import React, { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const token = localStorage.getItem('token');
        const apiUrl = process.env.REACT_APP_API_BASE_URL;
        const response= await fetch(`${apiUrl}ticket/`, {
            method: 'GET',
          headers: {
            'token': token,
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`Error fetching tickets: ${response.statusText}`);
        }

        const data = await response.json();
        setTickets(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="px-4 py-5 my-5 text-center">
    <div className="col-lg-6 mx-auto" style={{ fontFamily: 'Nunito, sans-serif', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', backgroundColor: 'white', borderRadius: '20px', paddingTop: '30px', marginTop: '20px' }}>
      <h1 className="display-5 fw-bold text-body-emphasis">Ticket List</h1>

      {loading ? (
        <p style={{ fontSize: '1.7rem', marginTop: '25px' }}>Loading tickets...</p>
      ) : error ? (
        <p style={{ fontSize: '1.7rem', marginTop: '25px' }}>Error: {error}</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0, paddingBottom:'10px'}}>
          {tickets.map(ticket => (
            <li key={ticket._id} style={{ marginTop: '15px'}}>
              <Link to={`/ticket/${ticket._id}`} style={{ textDecoration: 'none' }}>
                <p style={{fontSize:'1.7rem', marginTop:'25px'}}>{ticket._id}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
  );
};

export default TicketList;
