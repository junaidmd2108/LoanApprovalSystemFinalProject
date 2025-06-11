import React from 'react';
import { Link } from 'react-router-dom';


export default function LandingPage() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to the Loan Approval System</h1>
      <p style={styles.description}>
        Our system helps you apply for various types of loans like personal, home, education, and business with ease.
        Simply register, login, and apply — it's that simple!
      </p>

      <div style={styles.buttonContainer}>
        <Link to="/register" style={styles.link}>Register</Link>
        <Link to="/login" style={styles.link}>Login</Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '3rem auto',
    padding: '2rem',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
    textAlign: 'center'
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '1.5rem',
    color: '#1f1f1f'
  },
  description: {
    fontSize: '1.2rem',
    color: '#555',
    marginBottom: '2rem'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem'
  },
  link: {
    textDecoration: 'none',
    padding: '0.8rem 2rem',
    backgroundColor: '#337af7',
    color: 'white',
    fontWeight: 'bold',
    borderRadius: '8px',
    transition: 'background 0.3s ease'
  }
};
