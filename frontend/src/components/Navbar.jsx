// src/components/Navbar.jsx
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
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

      <div className="navbar-links">
        {/* Always show Home */}
        <Link to="/">Home</Link>

        {!token ? (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        ) : (
          <>
            <Link to="/apply-loan">Apply Loan</Link>
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