// src/components/Navbar.jsx

import React from 'react';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/logo.png" alt="GetMeLoan" className="navbar-logo-img" />
        <span className="navbar-logo-text">GetMeLoan</span>
      </div>
      <div className="navbar-links">
        <a href="/register">Register</a>
        <a href="/login">Login</a>
        <a href="/apply-loan">Apply Loan</a>
      </div>
    </nav>
  );
}