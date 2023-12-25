import React, { useState, useEffect } from 'react';

const BidsList = () => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBids();
  }, []);

  const fetchBids = async () => {
    const token = localStorage.getItem('token');
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    try {
      const response = await fetch(`${apiUrl}bidding/`, {
        method: 'GET',
        headers: {
          'token': token,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching bids: ${response.statusText}`);
      }

      const data = await response.json();
      setBids(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const deleteBid = async (bidId) => {
    const token = localStorage.getItem('token');
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    try {
      const response = await fetch(`${apiUrl}bidding/delete/${bidId}`, {
        method: 'DELETE',
        headers: {
          'token': token,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error deleting bid: ${response.statusText}`);
      }

      // Refresh the list of bids after deletion
      await fetchBids();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Bid List</h1>
      {loading ? (
        <p>Loading bids...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {bids.map(bid => (
            <li key={bid.bidId}>
              <p>Event Name: {bid.eventName}</p>
              <p>Event Date: {new Date(bid.eventDate).toLocaleDateString()}</p>
              <p>Service Type: {bid.serviceType}</p>
              <p>Bid Amount: {bid.bidAmount}</p>
              <p>Message: {bid.message}</p>
              <p>Status: {bid.status}</p>
              <p>Submitted Date: {new Date(bid.dateSubmitted).toLocaleDateString()}</p>
              {bid.status === 'submitted' && (
                <button onClick={() => deleteBid(bid.bidId)}>Delete</button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BidsList;
