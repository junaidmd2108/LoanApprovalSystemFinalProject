// =====================================
// File: Login.jsx
// Purpose: Authentication component for user login
// Used in: Public routes, main authentication flow
// Features: Form validation, error handling, redirect after login
// Dependencies: React, AuthContext, react-router-dom
// =====================================

// Import necessary dependencies and hooks
import React, { useState, useContext, useEffect } from 'react';
// Import authentication context for login functionality
import { AuthContext } from '../context/AuthContext';
// Import navigation hook for programmatic routing
import { useNavigate } from 'react-router-dom';
// Import global styles
import '../index.css';

// Main login component definition
export default function Login() {
  // Extract login function from auth context
  const { login } = useContext(AuthContext);
  
  // Initialize form state with empty credentials
  const [formData, setFormData] = useState({
    username: '', // Store username input
    password: ''  // Store password input
  });
  
  // State for error message display
  const [error, setError] = useState('');
  
  // Initialize navigation function
  const navigate = useNavigate();

  // Clear any existing errors when component mounts
  useEffect(() => {
    setError('');
  }, []);

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update form state while preserving other fields
    setFormData(f => ({ ...f, [name]: value }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError('');      // Clear any existing errors
    
    try {
      // Attempt login with provided credentials
      await login(formData.username, formData.password);
      // Redirect to loan application page on success
      navigate('/apply-loan');
    } catch (err) {
      // Display error message on failed login
      setError('Invalid credentials. Please try again.');
    }
  };

  // Render login form
  return (
    <div className="form-container">
      {/* Form title */}
      <h2>Login to Your Account</h2>

      {/* Conditional error message display */}
      {error && <p className="form-error">{error}</p>}

      {/* Login form */}
      <form onSubmit={handleSubmit}>
        {/* Username input field */}
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          autoComplete="username"
          required
        />

        {/* Password input field */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="current-password"
          required
        />

        {/* Submit button */}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}