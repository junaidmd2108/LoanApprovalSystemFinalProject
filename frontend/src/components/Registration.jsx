import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
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
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const idTypes = [
    { value: '', label: 'Select ID Type' },
    { value: 'driver_license', label: "Driver's License" },
    { value: 'passport',      label: 'Passport' },
    { value: 'ssn',           label: 'Social Security Card' },
    { value: 'state_id',      label: 'State ID' },
  ];

  const employmentOptions = [
    { value: '', label: 'Select Employment Status' },
    { value: 'employed',      label: 'Employed' },
    { value: 'self_employed', label: 'Self-Employed' },
    { value: 'unemployed',    label: 'Unemployed' },
    { value: 'student',       label: 'Student' },
    { value: 'retired',       label: 'Retired' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(f => ({ ...f, [name]: value }));
    setMessage('');
    setError('');
  };

  const handleConfirmChange = (e) => {
    setConfirmPassword(e.target.value);
    setMessage('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (formData.password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await axios.post('http://localhost:8080/api/register', formData);

      // ← NEW: immediately send them to login upon success
      navigate('/login', { replace: true });

    } catch (err) {
      setError(err.response?.data || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="register-container" style={containerStyle}>
      <h2 style={titleStyle}>Register</h2>
      {message && <p style={successStyle}>{message}</p>}
      {error   && <p style={errorStyle  }>{error  }</p>}

      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          {/* Row 1 */}
          <input
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
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmChange}
            required
            style={inputStyle}
          />

          {/* Row 2 */}
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

          {/* Row 3 */}
          <input
            name="contactNumber"
            placeholder="Contact Number"
            value={formData.contactNumber}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          {/* Row 4 */}
          <input
            type="date"
            name="dob"
            placeholder="Date of Birth"
            value={formData.dob}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <select
            name="idType"
            value={formData.idType}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            {idTypes.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <input
            name="idNumber"
            placeholder="ID Number"
            value={formData.idNumber}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          {/* Row 5 */}
          <select
            name="employmentStatus"
            value={formData.employmentStatus}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            {employmentOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <input
            type="number"
            name="annualIncome"
            placeholder="Annual Income"
            value={formData.annualIncome}
            onChange={handleChange}
            style={inputStyle}
          />
          <div /> {/* empty cell */}

          {/* Row 6 */}
          <button type="submit" style={buttonStyle}>
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

const containerStyle = {
  maxWidth: '600px',
  margin: '2rem auto',
  padding: '2rem',
  background: 'rgba(255, 255, 255, 0.95)',
  borderRadius: '16px',
  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
};

const titleStyle = {
  textAlign: 'center',
  fontSize: '1.8rem',
  marginBottom: '1.5rem',
  fontWeight: 'bold',
};

const inputStyle = {
  width: '100%',
  padding: '0.8rem',
  margin: '0.5rem 0',
  fontSize: '1rem',
  border: '1px solid #ccc',
  borderRadius: '8px',
};

const buttonStyle = {
  width: '100%',
  padding: '0.9rem',
  marginTop: '1rem',
  backgroundColor: '#337af7',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '1rem',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
};

const successStyle = {
  color: 'green',
  textAlign: 'center',
  marginBottom: '1rem',
};

const errorStyle = {
  color: 'red',
  textAlign: 'center',
  marginBottom: '1rem',
};