import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/Navbar';
import Login from './components/Login';
import HomePage from './components/Home';
import LogoutButton from './components/Logout';
import EventDetail from './components/EventDetail';
import Profile from './components/Profile';
import MyProfile from './components/MyProfile';
import TicketList from './components/Tickets';
import TicketDetails from './components/TicketDetails';
import Notifications from './components/Notifcations';
import UpdateNotifications from './components/UpdateNotifications';
import CancelNotifications from './components/CancellationNotifications';
import InsertNotifications from './components/InsertionNotifications';
import Footer from './components/Footer';
import './App.css';
const App = () => {
  return (
    <Router>
      <div id='mainDiv'>
        <NavBar />
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/logout" element={<LogoutButton />} />
        <Route path="/event/:eventId" element={<EventDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/tickets" element={<TicketList />} />
        <Route path="/ticket/:ticketId" element={<TicketDetails />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/updatenotifications" element={<UpdateNotifications />} />
        <Route path="/cancellationnotifications" element={<CancelNotifications />} />
        <Route path="/insertionnotifications" element={<InsertNotifications />} />
        </Routes>
        <Footer/>
      </div>
    </Router>
    
  );
};

export default App;