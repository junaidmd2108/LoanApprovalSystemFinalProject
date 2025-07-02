// =====================================
// File: Navbar.jsx
// Purpose: Navigation bar component with authentication-aware routing
// Used in: Main App layout
// Features: Responsive navigation, auth state management, dynamic routing
// Dependencies: React Router, AuthContext
// =====================================

// Import necessary dependencies
import React, { useContext } from 'react';
// Import routing components and hooks
import { Link, useNavigate } from 'react-router-dom';
// Import authentication context
import { AuthContext } from '../context/AuthContext';
// Import component styles
import './Navbar.css';

// Main navigation component
export default function Navbar() {
  // Extract authentication state and logout function
  const { token, logout } = useContext(AuthContext);
  // Initialize navigation function
  const navigate = useNavigate();

  // Handle user logout
  const handleLogout = () => {
    logout();                // Clear authentication state
    navigate('/login');      // Redirect to login page
  };

  // Render navigation bar
  return (
    <nav className="navbar">
      {/* Logo and branding section */}
      <div className="navbar-logo">
        <Link to="/" className="navbar-logo-link">
          <img
            src="/logo.png"
            alt="GetMeLoan"
            className="navbar-logo-img"
          />
          <span className="navbar-logo-text">GetMeLoan</span>
        </Link>
      </div>

      {/* Navigation links section */}
      <div className="navbar-links">
        {/* Home link - visible to all users */}
        <Link to="/">Home</Link>

        {/* Conditional rendering based on authentication state */}
        {!token ? (
          // Guest user links
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        ) : (
          // Authenticated user links
          <>
            <Link to="/apply-loan">Apply Loan</Link>
            <Link to="/past-applications">My Applications</Link>
            <button
              onClick={handleLogout}
              className="navbar-logout-btn"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}