// =====================================
// File: ApplyLoan.jsx
// Description: React component for loan application form
// Author: Junaid Mohammad
// Created: 2025
// Dependencies: React, axios, AuthContext, react-router-dom
// =====================================

// Import React and required hooks for state management and side effects
import React, { useState, useContext, useEffect } from 'react';
// Import axios for making HTTP requests to the backend API
import axios from 'axios';
// Import AuthContext to access authentication state and methods
import { AuthContext } from '../context/AuthContext';
// Import useNavigate hook for programmatic navigation
import { useNavigate } from 'react-router-dom';
// Import global CSS styles
import '../index.css';

// Define main loan application component
export default function ApplyLoan() {
  // Destructure token and logout function from AuthContext
  const { token, logout } = useContext(AuthContext);
  // Initialize navigation function for redirecting users
  const navigate = useNavigate();

  // Define loan types and their corresponding interest rates as constants
  const loanOptions = {
    personal: 0.05,    // 5% interest rate for personal loans
    home: 0.04,        // 4% interest rate for home loans
    education: 0.03,   // 3% interest rate for education loans
    business: 0.06,    // 6% interest rate for business loans
    auto: 0.06,        // 6% interest rate for auto loans
  };

  // Initialize form state with empty values using useState hook
  const [formData, setFormData] = useState({
    nameOfApplicant: '', // Store applicant's full name
    loanType: '',        // Store selected loan type
    amount: '',          // Store loan amount requested
    tenure: '',          // Store loan duration in months
    interestRate: '',    // Store calculated interest rate
  });

  // State for managing file upload
  const [file, setFile] = useState(null);
  // State for success message display
  const [message, setMessage] = useState('');
  // State for error message display
  const [error, setError] = useState('');
  // State for tracking form submission status
  const [loading, setLoading] = useState(false);

  // useEffect hook to clear messages when component mounts
  useEffect(() => {
    setError('');
    setMessage('');
  }, []);

  // Handle changes in form input fields
  const handleChange = (e) => {
    // Destructure name and value from event target
    const { name, value } = e.target;

    // Special handling for loan type selection to auto-calculate interest rate
    if (name === 'loanType') {
      const rate = loanOptions[value] ?? '';
      setFormData(f => ({
        ...f,
        loanType: value,
        interestRate: rate // Automatically set interest rate based on loan type
      }));
    } else {
      // Handle all other form field changes
      setFormData(f => ({ ...f, [name]: value }));
    }

    // Clear any existing error or success messages when user makes changes
    if (error) setError('');
    if (message) setMessage('');
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLoading(true);  // Set loading state to true
    setError('');      // Clear any existing error messages
    setMessage('');    // Clear any existing success messages

    // Create FormData object for multipart/form-data submission
    const payload = new FormData();
    
    // Append loan application data as JSON blob
    payload.append(
      'loan',
      new Blob([JSON.stringify({
        nameOfApplicant: formData.nameOfApplicant,
        loanType: formData.loanType,
        amount: parseFloat(formData.amount),      // Convert amount to float
        tenure: parseInt(formData.tenure, 10),    // Convert tenure to integer
        interestRate: formData.interestRate,
      })], { type: 'application/json' })
    );

    // Append file if one was selected
    if (file) payload.append('file', file);

    try {
      // Make POST request to backend API
      const res = await axios.post(
        'http://localhost:8080/api/apply-loan',
        payload,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`, // Include auth token
          }
        }
      );

      // Set success message from response
      setMessage(res.data.message || 'Loan application submitted!');

      // Reset form to initial state after successful submission
      setFormData({
        nameOfApplicant: '',
        loanType: '',
        amount: '',
        tenure: '',
        interestRate: '',
      });
      setFile(null); // Clear uploaded file

    } catch (err) {
      // Handle session expiration
      if (err.response?.status === 401) {
        setError('Session expired. Redirecting to login…');
        logout();
        navigate('/login');
        return;
      }

      // Handle other API errors
      setError(
        err.response?.data?.message ||
        err.response?.data ||
        'Loan application failed.'
      );
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Render component UI
  return (
    <div className="form-container applyloan-container">
      <h2>Apply for a Loan</h2>

      {/* Display success/error messages if present */}
      {message && <p className="form-success">{message}</p>}
      {error && <p className="form-error">{error}</p>}

      {/* Loan application form */}
      <form onSubmit={handleSubmit}>
        {/* Input field for applicant's name */}
        <input
          type="text"
          name="nameOfApplicant"
          placeholder="Full Name"
          autoComplete="name"
          value={formData.nameOfApplicant}
          onChange={handleChange}
          required
        />

        {/* Dropdown for loan type selection */}
        <select
          name="loanType"
          value={formData.loanType}
          onChange={handleChange}
          required
        >
          <option value="">Select loan type</option>
          {/* Map through loan options to create dropdown items */}
          {Object.keys(loanOptions).map(type => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>

        {/* Read-only field to display interest rate */}
        <input
          type="text"
          name="interestRate"
          placeholder="Interest Rate"
          value={formData.interestRate !== '' 
            ? `${(formData.interestRate * 100).toFixed(2)}%` 
            : ''}
          readOnly
        />

        {/* Input field for loan amount */}
        <input
          type="number"
          name="amount"
          placeholder="Loan Amount"
          autoComplete="off"
          value={formData.amount}
          onChange={handleChange}
          required
        />

        {/* Input field for loan tenure */}
        <input
          type="number"
          name="tenure"
          placeholder="Tenure (months)"
          autoComplete="off"
          value={formData.tenure}
          onChange={handleChange}
          required
        />

        {/* File upload input */}
        <input
          type="file"
          name="file"
          onChange={e => setFile(e.target.files[0])}
        />

        {/* Submit button with loading state */}
        <button type="submit" disabled={loading}>
          {loading ? 'Applying…' : 'Submit Loan Application'}
        </button>
      </form>
    </div>
  );
}