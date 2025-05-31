import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import Registration from './components/Registration';
import Login        from './components/Login';
import ApplyLoan    from './components/ApplyLoan';

function App() {
  return (
    <Router>
      <div>
        <h1>Loan Approval System</h1>
        <nav>
          <Link to="/register">Register</Link> |{' '}
          <Link to="/login">Login</Link>     |{' '}
          <Link to="/apply-loan">ApplyLoan</Link> {/* ← AND ADD THIS LINK */}
        </nav>


        <Routes>
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/apply-loan" element={<ApplyLoan />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

