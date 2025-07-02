// =====================================
// File: App.js
// Purpose: Main application component with routing
// Features: Protected routes, authentication, navigation
// Dependencies: React Router, AuthContext
// =====================================

// Import React and routing dependencies
import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// Import components
import Registration from './components/Registration';
import Login from './components/Login';
import ApplyLoan from './components/ApplyLoan';
import PastApplications from './components/PastApplications';
import Chatbot from './components/Chatbot';
import Navbar from './components/Navbar';
import { AuthContext, AuthProvider } from './context/AuthContext';
import LandingPage from './components/LandingPage';

// AppWrapper component handles routing logic
function AppWrapper() {
  // Get authentication token from context
  const { token } = useContext(AuthContext);

  return (
    <Router>
      {/* Global navigation */}
      <Navbar />
      
      {/* Main content container */}
      <div style={{ maxWidth: 600, margin: '2rem auto', position: 'relative' }}>
        <Routes>
          {/* Public home page route */}
          <Route path="/" element={<LandingPage />} />

          {/* Registration route - redirects if authenticated */}
          <Route
            path="/register"
            element={token ? <Navigate to="/apply-loan" replace /> : <Registration />}
          />

          {/* Login route - redirects if authenticated */}
          <Route
            path="/login"
            element={token ? <Navigate to="/apply-loan" replace /> : <Login />}
          />

          {/* Protected loan application route */}
          <Route
            path="/apply-loan"
            element={token ? <ApplyLoan /> : <Navigate to="/login" replace />}
          />

          {/* Protected past applications route */}
          <Route
            path="/past-applications"
            element={token ? <PastApplications /> : <Navigate to="/login" replace />}
          />

          {/* 404 catch-all route */}
          <Route
            path="*"
            element={<h2>404: Page Not Found</h2>}
          />
        </Routes>

        {/* Global chatbot component */}
        <Chatbot />
      </div>
    </Router>
  );
}

// Main App component wrapped with AuthProvider
export default function App() {
  return (
    <AuthProvider>
      <AppWrapper />
    </AuthProvider>
  );
}