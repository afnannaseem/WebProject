import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Tickets.css";

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const apiUrl = process.env.REACT_APP_API_BASE_URL;
        const response = await fetch(`${apiUrl}ticket/`, {
          method: "GET",
          headers: {
            token: token,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching tickets: ${response.statusText}`);
        }

        const data = await response.json();
        setTickets(data);
        setLoading(false);
      } catch (error) {
       console.lof(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="px-4 py-5 my-5 text-center">
      <div className="col-lg-6 mx-auto" id="ticketsSecondDiv">
        <h1 className="display-5 fw-bold text-body-emphasis">Ticket List</h1>

        {loading ? (
          <div
          class="alert alert-danger"
          role="alert"
          id="ticketsNoBookedTicketsDiv"
        >
          <p id="ticketsNoBookedTickets">Loading Tickets</p>
        </div>
        ) : !tickets ? (
          <div
            class="alert alert-danger"
            role="alert"
            id="ticketsNoBookedTicketsDiv"
          >
            <p id="ticketsNoBookedTickets">No bookings yet</p>
          </div>
        ) : (
          <ul id="ticketsUnorderedList">
            {tickets.map((ticket) => (
              <li key={ticket._id} id="ticketsListElements">
                <Link to={`/ticket/${ticket._id}`} id="ticketsLinks">
                  <p id="ticketsParagraphs">{ticket._id}</p>
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
