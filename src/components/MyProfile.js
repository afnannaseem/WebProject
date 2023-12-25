import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {
  const [vendorData, setVendorData] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    fetch(`${apiUrl}vendor/profile`, {
      method: 'GET',
      headers: {
        'token': token,
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error fetching profile: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        setVendorData(data);
        setName(data.name);
        setEmail(data.email);
        setPhone(data.phone);
        setAddress(data.address);
        setDescription(data.description);
      })
      .catch(error => console.error(error.message));
  }, []);

  const handleUpdate = () => {
    setShowUpdateForm(true);
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    try {
      const response = await fetch(`${apiUrl}vendor/update`, {
        method: 'PUT',
        headers: {
          'token': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone, address, description }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Error updating profile');
      }
      setError('Profile Updated Successfully');
      setShowUpdateForm(false);
      setVendorData({ ...vendorData, name, email, phone, address, description });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="my-profile">
      <h1>My Vendor Profile</h1>
      {vendorData ? (
        <div>
          <p>Email: {vendorData.email}</p>
          <p>Name: {vendorData.name}</p>
          <p>Phone: {vendorData.phone}</p>
          <p>Address: {vendorData.address}</p>
          <p>Description: {vendorData.description}</p>
          <button onClick={handleUpdate}>Update Your Profile</button>
          {showUpdateForm && (
            <div>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
              <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description"></textarea>
              <button onClick={handleSubmit}>Submit</button>
            </div>
          )}
          
          {error && <p>{error}</p>}
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default MyProfile;
