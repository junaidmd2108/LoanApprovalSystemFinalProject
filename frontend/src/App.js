// src/App.js
import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Registration from './components/Registration';
import Login from './components/Login';
import ApplyLoan from './components/ApplyLoan';
import Chatbot from './components/Chatbot';
import Navbar from './components/Navbar'; //  Using the new Navbar
import { AuthContext, AuthProvider } from './context/AuthContext';
import LandingPage from './components/LandingPage';

function AppWrapper() {
  const { token } = useContext(AuthContext);

  return (
    <Router>
      <Navbar /> {/*  New navbar always visible */}
      <div style={{ maxWidth: 600, margin: '2rem auto', position: 'relative' }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route
            path="/register"
            element={token ? <Navigate to="/apply-loan" replace /> : <Registration />}
          />

          <Route
            path="/login"
            element={token ? <Navigate to="/apply-loan" replace /> : <Login />}
          />

          <Route
            path="/apply-loan"
            element={token ? <ApplyLoan /> : <Navigate to="/login" replace />}
          />

          <Route
            path="*"
            element={<h2>404: Page Not Found</h2>}
          />
        </Routes>

        <Chatbot />
      </div>
    </Router>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppWrapper />
    </AuthProvider>
  );
}