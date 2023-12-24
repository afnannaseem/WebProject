import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem('token');
    
    // You can also perform additional logout actions if needed

    // Redirect to the login page or any other desired page
    navigate('/login');
  };

  return (
    <div className="px-4 py-5 my-5 text-center">
      <div className="col-lg-6 mx-auto" style={{ fontFamily: 'Nunito, sans-serif', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', backgroundColor: 'white', borderRadius: '20px', paddingTop: '30px', marginTop: '20px', paddingBottom:'20px' }}>
        <h1 className="display-5 fw-bold text-body-emphasis">Logout</h1>
        <button onClick={handleLogout} className="btn btn-danger" style={{ marginTop: '20px' }}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default LogoutButton;
