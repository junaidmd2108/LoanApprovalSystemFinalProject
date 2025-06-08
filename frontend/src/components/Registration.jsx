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
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        username: formData.username,
        password: formData.password
      };

      const response = await axios.post('http://localhost:8080/api/register', payload);
      alert(response.data); // Show backend success message
      navigate('/login');
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setError(err.response.data.message || 'Username already exists');
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Register</h2>
      {error && <p style={errorStyle}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Choose a username"
          value={formData.username}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <button type="submit" disabled={loading} style={buttonStyle}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}

const containerStyle = {
  maxWidth: '400px',
  margin: '2rem auto',
  padding: '2rem',
  background: '#fff',
  borderRadius: '10px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
};

const titleStyle = {
  textAlign: 'center',
  marginBottom: '1rem'
};

const inputStyle = {
  width: '100%',
  padding: '0.8rem',
  margin: '0.5rem 0',
  border: '1px solid #ccc',
  borderRadius: '5px',
  fontSize: '1rem'
};

const buttonStyle = {
  width: '100%',
  padding: '0.8rem',
  backgroundColor: '#397eff',
  color: '#fff',
  fontWeight: 'bold',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
};

const errorStyle = {
  color: 'red',
  textAlign: 'center',
  marginBottom: '1rem'
};