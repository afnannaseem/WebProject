import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ServiceDetails = () => {
  const { serviceId } = useParams();
  const [serviceData, setServiceData] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [serviceName, setServiceName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [availabilityStart, setAvailabilityStart] = useState('');
  const [availabilityEnd, setAvailabilityEnd] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchServiceDetails();
  }, [serviceId]);

  const fetchServiceDetails = async () => {
    const token = localStorage.getItem('token');
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    try {
      const response = await fetch(`${apiUrl}service/${serviceId}`, {
        method: 'GET',
        headers: {
          'token': token,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching service: ${response.statusText}`);
      }

      const data = await response.json();
      setServiceData(data);
      setServiceName(data.serviceName);
      setDescription(data.description);
      setPrice(data.price);
      setAvailabilityStart(data.availability.start);
      setAvailabilityEnd(data.availability.end);
      setCategory(data.category);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdate = () => {
    setShowUpdateForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
  
    try {
      const updatedService = {
        serviceName,
        description,
        price: parseFloat(price), // Ensure price is a number
        availability: {
          start: new Date(availabilityStart).toISOString(), // Format the dates to ISO string
          end: new Date(availabilityEnd).toISOString(),
        },
        category,
      };
  
      const response = await fetch(`${apiUrl}service/update/${serviceId}`, {
        method: 'PUT',
        headers: {
          'token': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedService),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error updating service: ${response.statusText}`);
      }
  
      setError('Service Updated Successfully');
      setShowUpdateForm(false);
      fetchServiceDetails();
    } catch (error) {
      setError(error.message);
    }
  };
  

  return (
    <div className="service-details">
      <h1>Service Details</h1>
      {serviceData ? (
        <div>
          <p>Service Name: {serviceData.serviceName}</p>
          <p>Description: {serviceData.description}</p>
          <p>Price: {serviceData.price}</p>
          <p>Availability Start: {serviceData.availability.start}</p>
          <p>Availability End: {serviceData.availability.end}</p>
          <p>Category: {serviceData.category}</p>
          <button onClick={handleUpdate}>Update Service</button>
          {showUpdateForm && (
            <form onSubmit={handleSubmit}>
              <input type="text" value={serviceName} onChange={(e) => setServiceName(e.target.value)} placeholder="Service Name" />
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
              <input type="date" value={availabilityStart} onChange={(e) => setAvailabilityStart(e.target.value)} placeholder="Availability Start" />
              <input type="date" value={availabilityEnd} onChange={(e) => setAvailabilityEnd(e.target.value)} placeholder="Availability End" />
              <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" />
              <button type="submit">Submit</button>
            </form>
          )}
          {error && <p>{error}</p>}
        </div>
      ) : (
        <p>Loading service details...</p>
      )}
    </div>
  );
};

export default ServiceDetails;
