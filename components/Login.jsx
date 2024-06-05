// components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://last-change-4.onrender.com/auth/login', formData);
      console.log('Login successful');
      // Save token to localStorage
      localStorage.setItem('token', response.data.token);
      // Redirect to another page, e.g., dashboard
      navigate('/shorten'); 
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Function to handle redirect to registration page
  const redirectToRegister = () => {
    navigate('/');
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <button type="button" onClick={redirectToRegister}>Register</button></p>
    </div>
  );
};

export default Login;
