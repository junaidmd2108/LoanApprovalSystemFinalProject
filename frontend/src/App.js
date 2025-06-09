// src/App.js
import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';

import Registration from './components/Registration';
import Login        from './components/Login';
import ApplyLoan    from './components/ApplyLoan';
import Chatbot      from './components/Chatbot'; // ✅ Import Chatbot component

import { AuthContext, AuthProvider } from './context/AuthContext';

function AppWrapper() {
  const { token, logout } = useContext(AuthContext);

  return (
    <Router>
      <div style={{ maxWidth: 600, margin: '2rem auto', position: 'relative' }}>
        <h1>Loan Approval System</h1>
        <nav style={{ marginBottom: '1rem' }}>
          {token ? (
            <>
              <Link to="/">Home</Link> |{' '}
              <Link to="/apply-loan">Apply Loan</Link> |{' '}
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/register">Register</Link> |{' '}
              <Link to="/login">Login</Link>
            </>
          )}
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              token ? (
                <h2>Welcome back! Ready to apply for a loan?</h2>
              ) : (
                <h2>Please register or login to continue.</h2>
              )
            }
          />

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

        {/* ✅ Floating Chatbot assistant */}
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