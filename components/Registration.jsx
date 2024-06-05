// components/Registration.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Registration.css'; // Import the CSS file

const Registration = () => {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: ''
  });
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://last-change-4.onrender.com/auth/register', formData);
      console.log(response.data);
      navigate('/login'); // Redirect to login page after successful registration
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Function to handle redirect to login page
  const redirectToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
        <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <button type="button" onClick={redirectToLogin}>Login</button></p>
    </div>
  );
};

export default Registration;
