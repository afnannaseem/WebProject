import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/Navbar';
import Login from './components/Login';
import HomePage from './components/Home';
import LogoutButton from './components/Logout';
import EventDetail from './components/EventDetail';

const App = () => {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/logout" element={<LogoutButton />} />
        <Route path="/event/:eventId" element={<EventDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;