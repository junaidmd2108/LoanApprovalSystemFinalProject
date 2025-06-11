import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { token, logout } = useContext(AuthContext);
  const [showConfirm, setShowConfirm] = useState(false);

  // Extract username from JWT if available
  const username = token ? JSON.parse(atob(token.split('.')[1])).sub : null;

  const handleLogoutClick = () => {
    setShowConfirm(true);
  };

  const confirmLogout = () => {
    logout();
    setShowConfirm(false);
  };

  const cancelLogout = () => {
    setShowConfirm(false);
  };

  return (
    <>
      <nav style={navStyle}>
        <div style={leftStyle}>
          <Link to="/" style={linkStyle}>Home</Link>
          {token ? (
            <Link to="/apply-loan" style={linkStyle}>Apply Loan</Link>
          ) : (
            <>
              <Link to="/register" style={linkStyle}>Register</Link>
              <Link to="/login" style={linkStyle}>Login</Link>
            </>
          )}
        </div>
        {token && (
          <div style={rightStyle}>
            <span style={{ marginRight: '1rem' }}>
              Welcome, <strong>{username}</strong>
            </span>
            <span onClick={handleLogoutClick} style={logoutStyle}>Logout</span>
          </div>
        )}
      </nav>

      {showConfirm && (
        <div style={modalOverlay}>
          <div style={modalBox}>
            <p>Are you sure you want to logout?</p>
            <div style={buttonGroup}>
              <button onClick={confirmLogout} style={yesButton}>Yes</button>
              <button onClick={cancelLogout} style={noButton}>No</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Styles
const navStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#f0f0f0',
  padding: '1rem 2rem',
  borderBottom: '1px solid #ddd',
};

const leftStyle = {
  display: 'flex',
  gap: '1rem',
};

const rightStyle = {
  display: 'flex',
  alignItems: 'center',
};

const linkStyle = {
  textDecoration: 'none',
  color: '#0077cc',
  fontWeight: '500',
};

const logoutStyle = {
  color: '#0077cc',
  cursor: 'pointer',
  textDecoration: 'underline',
};

// Modal confirmation
const modalOverlay = {
  position: 'fixed',
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000
};

const modalBox = {
  background: 'white',
  padding: '2rem',
  borderRadius: '10px',
  textAlign: 'center',
  boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)'
};

const buttonGroup = {
  marginTop: '1rem',
  display: 'flex',
  justifyContent: 'center',
  gap: '1rem'
};

const yesButton = {
  backgroundColor: '#337af7',
  color: 'white',
  padding: '0.5rem 1rem',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer'
};

const noButton = {
  backgroundColor: '#ccc',
  color: 'black',
  padding: '0.5rem 1rem',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer'
};