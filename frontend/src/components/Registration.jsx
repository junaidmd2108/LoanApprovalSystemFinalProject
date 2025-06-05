// src/components/Registration.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Registration() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check that password and confirmPassword match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      // Only send { username, password } to the backend
      const payload = {
        username: formData.username,
        password: formData.password
      };
 
      const response = await axios.post(
        'http://localhost:8080/api/register',
        payload
      );

      // On success, redirect to /login
      alert(response.data); // e.g. "User registered successfully"
      navigate('/login');
    } catch (err) {
      console.error('Registration error:', err);
      if (err.response && err.response.status === 409) {
        alert(err.response.data.message); // e.g. "Username already exists"
      } else {
        alert('Registration failed');
      }
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto' }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Username:</label><br/>
          <input
            type="text"
            name="username"
            placeholder="Choose a username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Password:</label><br/>
          <input
            type="password"
            name="password"
            placeholder="Choose a password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Confirm Password:</label><br/>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}