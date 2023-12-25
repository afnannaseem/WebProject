import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newService, setNewService] = useState({ 
    serviceName: '', 
    description: '', 
    price: '', 
    availabilityStart: '', 
    availabilityEnd: '', 
    category: '' 
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const token = localStorage.getItem('token');
      const apiUrl = process.env.REACT_APP_API_BASE_URL;
      const response = await fetch(`${apiUrl}service/`, {
        method: 'GET',
        headers: {
          'token': token,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching services: ${response.statusText}`);
      }

      const data = await response.json();
      setServices(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const deleteService = async (serviceId) => {
    const token = localStorage.getItem('token');
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    try {
      const response = await fetch(`${apiUrl}service/delete/${serviceId}`, {
        method: 'DELETE',
        headers: {
          'token': token,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json(); // Get the detailed error message from the response
        throw new Error(errorData.message || `Error deleting service: ${response.statusText}`);
      }

      // Refresh the list of services after deletion
      await fetchServices();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService({ ...newService, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    try {
      const serviceData = {
        ...newService,
        availability: {
          start: new Date(newService.availabilityStart),
          end: new Date(newService.availabilityEnd)
        }
      };

      const response = await fetch(`${apiUrl}service/add`, {
        method: 'POST',
        headers: {
          'token': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(serviceData),
      });

      if (!response.ok) {
        throw new Error(`Error adding service: ${response.statusText}`);
      }

      await fetchServices();
      setShowAddForm(false);
      setNewService({ serviceName: '', description: '', price: '', availabilityStart: '', availabilityEnd: '', category: '' });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Service List</h1>
      {loading ? (
        <p>Loading services...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
            {services.map(service => {
                console.log('Service ID:', service._id); // Debugging: Check the service ID
                return (
                <li key={service._id}>
                    <Link to={`/service/${service._id}`}>
                    <h6>{service.serviceName}</h6>
                    </Link> 
                    <button onClick={() => {
                    console.log('Deleting service with ID:', service._id); // Debugging: Log when attempting to delete
                    deleteService(service._id);
                    }}>Delete</button> 
                </li>
                );
            })}
        </ul>
      )}
      <button onClick={() => setShowAddForm(true)}>Add a Service</button>
      {showAddForm && (
        <form onSubmit={handleSubmit}>
          <input type="text" name="serviceName" value={newService.serviceName} onChange={handleInputChange} placeholder="Service Name" required />
          <textarea name="description" value={newService.description} onChange={handleInputChange} placeholder="Description"></textarea>
          <input type="number" name="price" value={newService.price} onChange={handleInputChange} placeholder="Price" required />
          <input 
            type="date" 
            name="availabilityStart" 
            value={newService.availabilityStart} 
            onChange={handleInputChange} 
            placeholder="Availability Start Date" 
            required 
          />
          <input 
            type="date" 
            name="availabilityEnd" 
            value={newService.availabilityEnd} 
            onChange={handleInputChange} 
            placeholder="Availability End Date" 
            required 
          />
          <input type="text" name="category" value={newService.category} onChange={handleInputChange} placeholder="Category" required />
          <button type="submit">Submit</button>
          <button type="button" onClick={() => setShowAddForm(false)}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default ServiceList;
