// src/components/Registration.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Registration() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    contactNumber: '',
    email: '',
    address: '',
    dob: '',
    idType: '',
    idNumber: '',
    employmentStatus: '',
    annualIncome: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(f => ({ ...f, [name]: value }));
    setError('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      setLoading(true);
      // strip out confirmPassword before sending
      const { confirmPassword, ...payload } = formData;
      // Optionally build a fullName for later
      payload.fullName = `${payload.firstName} ${payload.middleName} ${payload.lastName}`.trim();

      const res = await axios.post('http://localhost:8080/api/register', payload);
      alert(res.data);
      navigate('/login');
    } catch (err) {
      if (err.response?.status === 409) {
        setError(err.response.data || 'Username already exists');
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form style={formGridStyle} onSubmit={handleSubmit}>
      <h2 style={titleStyle}>Register</h2>
      {error && <p style={errorStyle}>{error}</p>}

      {/* Row 1: Names */}
      <input
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
        required
        style={inputStyle}
      />
      <input
        name="middleName"
        placeholder="Middle Name"
        value={formData.middleName}
        onChange={handleChange}
        style={inputStyle}
      />
      <input
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
        required
        style={inputStyle}
      />

      {/* Row 2: Contact / Email / DOB */}
      <input
        name="contactNumber"
        type="tel"
        placeholder="Contact Number"
        value={formData.contactNumber}
        onChange={handleChange}
        required
        style={inputStyle}
      />
      <input
        name="email"
        type="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={handleChange}
        required
        style={inputStyle}
      />
      <input
        name="dob"
        type="date"
        placeholder="Date of Birth"
        value={formData.dob}
        onChange={handleChange}
        required
        style={inputStyle}
      />

      {/* Row 3: Address spans all 3 */}
      <input
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        required
        style={{ ...inputStyle, gridColumn: '1 / -1' }}
      />

      {/* Row 4: ID type, ID number, Employment */}
      <select
        name="idType"
        value={formData.idType}
        onChange={handleChange}
        required
        style={inputStyle}
      >
        <option value="">Select ID Type</option>
        <option>Passport</option>
        <option>Driver’s License</option>
        <option>National ID</option>
      </select>
      <input
        name="idNumber"
        placeholder="ID Number"
        value={formData.idNumber}
        onChange={handleChange}
        required
        style={inputStyle}
      />
      <select
        name="employmentStatus"
        value={formData.employmentStatus}
        onChange={handleChange}
        required
        style={inputStyle}
      >
        <option value="">Employment Status</option>
        <option>Employed</option>
        <option>Unemployed</option>
        <option>Student</option>
      </select>

      {/* Row 5: Annual Income spans 2 if Employed */}
      <input
        name="annualIncome"
        type="number"
        placeholder="Annual Income"
        value={formData.annualIncome}
        onChange={handleChange}
        style={{
          ...inputStyle,
          gridColumn: formData.employmentStatus === 'Employed' ? '1 / span 2' : '1 / -1'
        }}
        disabled={formData.employmentStatus !== 'Employed'}
      />

      {/* Row 6: Username / Passwords */}
      <input
        name="username"
        placeholder="Choose a Username"
        value={formData.username}
        onChange={handleChange}
        required
        style={inputStyle}
      />
      <input
        name="password"
        type="password"
        placeholder="Enter Password"
        value={formData.password}
        onChange={handleChange}
        required
        style={inputStyle}
      />
      <input
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
        style={inputStyle}
      />

      {/* Row 7: Submit spans all */}
      <button
        type="submit"
        disabled={loading}
        style={{ ...buttonStyle, gridColumn: '1 / -1' }}
      >
        {loading ? 'Registering…' : 'Register'}
      </button>
    </form>
  );
}

// Styles
const formGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '1rem',
  padding: '2rem',
  maxWidth: '800px',
  margin: '2rem auto',
  background: '#fff',
  borderRadius: '12px',
  boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
};
const titleStyle = {
  gridColumn: '1 / -1',
  textAlign: 'center',
  fontSize: '1.8rem',
  marginBottom: '0.5rem'
};
const inputStyle = {
  width: '100%',
  padding: '0.8rem',
  fontSize: '1rem',
  border: '1px solid #ccc',
  borderRadius: '6px'
};
const buttonStyle = {
  padding: '0.9rem',
  backgroundColor: '#397eff',
  color: '#fff',
  fontWeight: 'bold',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer'
};
const errorStyle = {
  gridColumn: '1 / -1',
  color: 'red',
  textAlign: 'center',
  marginBottom: '0.5rem'
};