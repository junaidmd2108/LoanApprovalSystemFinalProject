// =====================================
// File: Registration.jsx
// Purpose: User registration form component
// Used in: Public routes for new user signup
// Features: Form validation, password confirmation, error handling
// Dependencies: React, axios, react-router-dom
// =====================================

// Import core React library and useState hook for managing component state
import React, { useState } from 'react';
// Import axios for making HTTP requests to the backend API
import axios from 'axios';
// Import navigation hook for redirecting after successful registration
import { useNavigate } from 'react-router-dom';
// Import global styles
import '../index.css';

// Define and export the main registration component
export default function Register() {
  // Initialize navigation function for programmatic routing
  const navigate = useNavigate();

  // Initialize form state with empty fields using useState hook
  const [formData, setFormData] = useState({
    username: '',         // Store user's chosen username
    password: '',         // Store user's password
    firstName: '',        // Store user's first name
    middleName: '',       // Store user's middle name (optional)
    lastName: '',         // Store user's last name
    contactNumber: '',    // Store user's contact number
    email: '',           // Store user's email address
    address: '',         // Store user's physical address
    dob: '',             // Store user's date of birth
    idType: '',          // Store type of ID document
    idNumber: '',        // Store ID document number
    employmentStatus: '', // Store current employment status
    annualIncome: '',    // Store annual income amount
  });

  // State for password confirmation field
  const [confirmPassword, setConfirmPassword] = useState('');
  // State for success message display
  const [message, setMessage] = useState('');
  // State for error message display
  const [error, setError] = useState('');

  // Define ID type options for dropdown selection
  const idTypes = [
    { value: '', label: 'Select ID Type' },           // Default placeholder
    { value: 'driver_license', label: "Driver's License" }, // Driver's license option
    { value: 'passport', label: 'Passport' },         // Passport option
    { value: 'ssn', label: 'Social Security Card' },  // SSN card option
    { value: 'state_id', label: 'State ID' },        // State ID option
  ];

  // Define employment status options for dropdown
  const employmentOptions = [
    { value: '', label: 'Select Employment Status' }, // Default placeholder
    { value: 'employed', label: 'Employed' },         // Full-time employment
    { value: 'self_employed', label: 'Self-Employed' }, // Self-employment
    { value: 'unemployed', label: 'Unemployed' },     // Unemployment
    { value: 'student', label: 'Student' },          // Student status
    { value: 'retired', label: 'Retired' },          // Retirement status
  ];

  // Handle changes in form input fields
  const handleChange = (e) => {
    const { name, value } = e.target;  // Extract field name and new value
    setFormData(f => ({ ...f, [name]: value })); // Update form state
    setMessage('');  // Clear any existing success message
    setError('');    // Clear any existing error message
  };

  // Handle changes in password confirmation field
  const handleConfirmChange = (e) => {
    setConfirmPassword(e.target.value); // Update confirmation password
    setMessage('');  // Clear any existing success message
    setError('');    // Clear any existing error message
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent default form submission
    setError('');       // Clear any existing error
    setMessage('');     // Clear any existing message

    // Validate password match
    if (formData.password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Send registration request to backend
      await axios.post('http://localhost:8080/api/register', formData);
      // Navigate to login page on success
      navigate('/login', { replace: true });
    } catch (err) {
      // Handle and display registration errors
      setError(err.response?.data || 'Registration failed. Please try again.');
    }
  };

  // Render registration form
  return (
    <div className="register-container">
      <h2>Create New Account</h2>
      
      {/* Display success/error messages */}
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}

      {/* Registration form */}
      <form onSubmit={handleSubmit}>
        {/* Account Information Section */}
        <div className="form-section">
          <h3>Account Information</h3>
          <input
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmChange}
            required
          />
        </div>

        {/* Personal Information Section */}
        <div className="form-section">
          <h3>Personal Information</h3>
          <input
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            name="middleName"
            placeholder="Middle Name (Optional)"
            value={formData.middleName}
            onChange={handleChange}
          />
          <input
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Contact Information Section */}
        <div className="form-section">
          <h3>Contact Information</h3>
          <input
            name="contactNumber"
            placeholder="Contact Number"
            value={formData.contactNumber}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="address"
            placeholder="Physical Address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        {/* Identity Information Section */}
        <div className="form-section">
          <h3>Identity Information</h3>
          <input
            type="date"
            name="dob"
            placeholder="Date of Birth"
            value={formData.dob}
            onChange={handleChange}
            required
          />
          <select
            name="idType"
            value={formData.idType}
            onChange={handleChange}
            required
          >
            {idTypes.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <input
            name="idNumber"
            placeholder="ID Number"
            value={formData.idNumber}
            onChange={handleChange}
            required
          />
        </div>

        {/* Employment Information Section */}
        <div className="form-section">
          <h3>Employment Information</h3>
          <select
            name="employmentStatus"
            value={formData.employmentStatus}
            onChange={handleChange}
            required
          >
            {employmentOptions.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <input
            type="number"
            name="annualIncome"
            placeholder="Annual Income"
            value={formData.annualIncome}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-button">
          Register
        </button>
      </form>
    </div>
  );
}