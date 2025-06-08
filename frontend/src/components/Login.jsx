import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: ''
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
    setLoading(true);
    setError('');

    try {
      await login(formData.username, formData.password);
      alert('Login successful!');
      navigate('/apply-loan');
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid credentials or server issue. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <h1 style={mainHeading}>Welcome to LoanApp</h1>
      <h2 style={subHeading}>Login to continue</h2>
      {error && <p style={errorStyle}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <button type="submit" disabled={loading} style={buttonStyle}>
          {loading ? 'Logging in...' : 'Login'}
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

const mainHeading = {
  textAlign: 'center',
  fontSize: '2rem',
  marginBottom: '0.5rem',
  color: '#333'
};

const subHeading = {
  textAlign: 'center',
  marginBottom: '1rem',
  color: '#666'
};

const inputStyle = {
  width: '100%',
  padding: '0.9rem',
  margin: '0.6rem 0',
  fontSize: '1rem',
  border: '1px solid #ccc',
  borderRadius: '6px',
};

const buttonStyle = {
  width: '100%',
  padding: '0.9rem',
  backgroundColor: '#397eff',
  color: '#fff',
  fontWeight: 'bold',
  fontSize: '1rem',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
};

const errorStyle = {
  color: 'red',
  textAlign: 'center',
  marginBottom: '1rem',
};