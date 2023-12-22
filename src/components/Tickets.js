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
    <div>
      <h1>Ticket List</h1>
      {loading ? (
        <p>Loading tickets...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {tickets.map(ticket => (
            <li key={ticket._id}>
              <Link to={`/ticket/${ticket._id}`}>
                   <h6>{ticket._id}</h6>
              </Link>  
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TicketList;
