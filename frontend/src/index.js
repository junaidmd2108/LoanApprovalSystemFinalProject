// =====================================
// File: index.js
// Purpose: Application entry point
// Features: React 18 setup, StrictMode, Auth context
// Dependencies: React, ReactDOM, AuthContext
// =====================================

// Import React core
import React from 'react';
// Import React 18 DOM rendering method
import ReactDOM from 'react-dom/client';
// Import global styles
import './index.css';
// Import root App component
import App from './App';
// Import performance monitoring
import reportWebVitals from './reportWebVitals';
// Import authentication context provider
import { AuthProvider } from './context/AuthContext';

// Create root container using React 18 concurrent features
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render application with StrictMode and Auth context
root.render(
  <React.StrictMode>      {/* Enable strict mode checks */}
    <AuthProvider>        {/* Provide authentication context */}
      <App />            {/* Render main application */}
    </AuthProvider>
  </React.StrictMode>
);

// Enable performance monitoring
// To measure app performance, pass a function:
// - console.log for development
// - Analytics service for production
// Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
