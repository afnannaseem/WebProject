import React from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';
import '../styles/NavBar.css'

const NavBar = () => (
  
  <nav className="navbar navbar-expand-lg " id='nav'>
    <div className="container-fluid">
      <Link className="navbar-brand"  to="/">
        <EventIcon/>
        <span style={{fontFamily:'Nunito, sans-serif', marginLeft:'5px'}}>EMS</span>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" aria-current="page" to="/">
              <HomeIcon />
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              <LoginIcon />
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/profile">
              <PersonIcon />
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/logout">
              <LogoutIcon />
            </Link>
          </li>
          
        </ul>
      </div>
    </div>
  </nav>
);

export default NavBar;
