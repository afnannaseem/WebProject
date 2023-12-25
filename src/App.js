import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/Navbar';
import Login from './components/Login';
import HomePage from './components/Home';
import LogoutButton from './components/Logout';
import EventDetail from './components/EventDetail';
import Profile from './components/Profile';
import MyProfile from './components/MyProfile';
import Services from './components/Services';
import ServiceDetails from './components/ServiceDetails';
/*import Notifications from './components/Notifcations';
import UpdateNotifications from './components/UpdateNotifications';
import CancelNotifications from './components/CancellationNotifications';
import InsertNotifications from './components/InsertionNotifications';
 */
const App = () => {
  return (
    <Router>
      <div style={{backgroundColor:'#E3F4F4'}}>
        <NavBar />
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/logout" element={<LogoutButton />} />
        <Route path="/event/:eventId" element={<EventDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/services" element={<Services />} />
        <Route path="/service/:serviceId" element={<ServiceDetails />} />
        {/*<Route path="/notifications" element={<Notifications />} />
        <Route path="/updatenotifications" element={<UpdateNotifications />} />
        <Route path="/cancellationnotifications" element={<CancelNotifications />} />
        <Route path="/insertionnotifications" element={<InsertNotifications />} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;