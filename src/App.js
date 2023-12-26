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
import Bookings from './components/Bookings';
import Bids from './components/Bids';
import Feedback from './components/Feedback';
/*import CancelNotifications from './components/CancellationNotifications';
import InsertNotifications from './components/InsertionNotifications';
 */
const App = () => {
  return (
    <Router>
      <div style={{backgroundColor:'#f4e8e0', minHeight:'100vh', display: 'Flex', flexDirection: 'column', justifyContent: 'space-between'}}>
        <NavBar />
        <Routes>
        <Route path="/vendor/login" element={<Login />} />
        <Route path="/vendor/home" element={<HomePage />} />
        <Route path="/vendor/logout" element={<LogoutButton />} />
        <Route path="/vendor/event/:eventId" element={<EventDetail />} />
        <Route path="/vendor/profile" element={<Profile />} />
        <Route path="/vendor/myprofile" element={<MyProfile />} />
        <Route path="/vendor/services" element={<Services />} />
        <Route path="/vendor/service/:serviceId" element={<ServiceDetails />} />
        <Route path="/vendor/bookings" element={<Bookings />} />
        <Route path="/vendor/bids" element={<Bids />} />
        <Route path="/vendor/feedback" element={<Feedback />} />
        {/*<Route path="/cancellationnotifications" element={<CancelNotifications />} />
        <Route path="/insertionnotifications" element={<InsertNotifications />} /> */}
        </Routes>
        <div></div>
      </div>
    </Router>
  );
};

export default App;