// =====================================
// File: PastApplications.jsx
// Purpose: Display user's loan application history
// Used in: Protected routes after authentication
// Features: Data fetching, loading states, error handling
// Dependencies: React, axios, AuthContext
// =====================================

// Import React and required hooks for component lifecycle and state management
import React, { useEffect, useState, useContext } from 'react';
// Import axios HTTP client for making API requests
import axios from 'axios';
// Import authentication context to access user token
import { AuthContext } from '../context/AuthContext';
// Import global styles for consistent UI
import '../index.css';

// Define and export the PastApplications component
export default function PastApplications() {
  // Extract authentication token from context for API requests
  const { token } = useContext(AuthContext);
  
  // Initialize state for storing loan applications array
  const [apps, setApps] = useState([]);
  // Initialize loading state to show loading indicator
  const [loading, setLoading] = useState(true);
  // Initialize error state to handle and display API errors
  const [error, setError] = useState('');

  // Effect hook to fetch applications when component mounts or token changes
  useEffect(() => {
    // Set loading state to true before fetching
    setLoading(true);
    // Clear any existing errors
    setError('');
    
    // Make GET request to fetch user's applications
    axios.get('http://localhost:8080/api/loans/my-applications', {
      // Include authentication token in request headers
      headers: { Authorization: `Bearer ${token}` }
    })
    // Handle successful response
    .then(res => setApps(res.data || []))
    // Handle error response
    .catch(() => setError('Could not load past applications.'))
    // Always execute after request completes
    .finally(() => setLoading(false));
  }, [token]); // Re-run effect if token changes

  // Show loading state while fetching data
  if (loading) {
    return (
      <div className="form-container">
        <h2>Your Past Applications</h2>
        <p>Loading…</p>
      </div>
    );
  }

  // Show error state if request failed
  if (error) {
    return (
      <div className="form-container">
        <h2>Your Past Applications</h2>
        <p className="form-error">{error}</p>
      </div>
    );
  }

  // Show empty state if no applications exist
  if (!apps.length) {
    return (
      <div className="form-container">
        <h2>Your Past Applications</h2>
        <p>You have no past applications.</p>
      </div>
    );
  }

  // Render applications table if data exists
  return (
    <div className="form-container">
      {/* Page title */}
      <h2>Your Past Applications</h2>
      
      {/* Table container for responsive design */}
      <div className="table-wrapper">
        {/* Applications data table */}
        <table className="applications-table">
          {/* Table header row */}
          <thead>
            <tr>
              <th>Loan Type</th>          {/* Column for loan type */}
              <th>Amount</th>             {/* Column for loan amount */}
              <th>Interest Rate</th>      {/* Column for interest rate */}
              <th>Tenure</th>             {/* Column for loan tenure */}
            </tr>
          </thead>
          {/* Table body with application data */}
          <tbody>
            {/* Map through applications array to create rows */}
            {apps.map(app => (
              // Create row for each application with unique key
              <tr key={app.id}>
                {/* Loan type cell with data attribute for responsive design */}
                <td data-label="Loan Type">{app.loanType}</td>
                {/* Amount cell with formatted currency */}
                <td data-label="Amount">${app.amount.toLocaleString()}</td>
                {/* Interest rate cell with percentage format */}
                <td data-label="Interest Rate">{app.interestRate}%</td>
                {/* Tenure cell with month indicator */}
                <td data-label="Tenure">{app.tenure} mo</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}