import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Clear the error message when the user starts typing
    setErrorMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = process.env.REACT_APP_API_BASE_URL;
      const response = await fetch(`${apiUrl}auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.status === 200) {
        console.log('User logged in successfully');
        localStorage.setItem('token', data.token);
        // Navigate to the main page or the protected route
        navigate('/');
      } else {
        console.error('Login failed:', data.error);
        setErrorMessage(data.error || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
      <div className="px-4 py-5 my-5 text-center">
      <div className="col-lg-6 mx-auto" style={{ fontFamily: 'Nunito, sans-serif', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', backgroundColor: 'white', borderRadius: '20px', paddingTop: '30px', marginTop: '20px', paddingBottom:'20px' }}>
      <h1>Login Page</h1>
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          <p>{errorMessage}</p>
          <button onClick={() => setErrorMessage(null)} className="btn-close" aria-label="Close"></button>
        </div>
      )}
      <form onSubmit={handleSubmit}  style={{ width:'400px',marginLeft:'22%'}}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Log In
        </button>
      </form>
      </div>
      </div>
  );
};

export default Login;
