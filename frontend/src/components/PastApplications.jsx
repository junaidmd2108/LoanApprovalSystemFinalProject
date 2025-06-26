// src/components/PastApplications.jsx
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import '../index.css';

export default function PastApplications() {
  const { token } = useContext(AuthContext);
  const [apps, setApps]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    axios.get('http://localhost:8080/api/loans/my-applications', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setApps(res.data || []))
    .catch(() => setError('Could not load past applications.'))
    .finally(() => setLoading(false));
  }, [token]);

  if (loading) {
    return (
      <div className="form-container">
        <h2>Your Past Applications</h2>
        <p>Loading…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="form-container">
        <h2>Your Past Applications</h2>
        <p className="form-error">{error}</p>
      </div>
    );
  }

  if (!apps.length) {
    return (
      <div className="form-container">
        <h2>Your Past Applications</h2>
        <p>You have no past applications.</p>
      </div>
    );
  }

  return (
    <div className="form-container">
      <h2>Your Past Applications</h2>
      <div className="table-wrapper">
        <table className="applications-table">
          <thead>
            <tr>
              <th>Loan Type</th>
              <th>Amount</th>
              <th>Interest Rate</th>    {/* new column */}
              <th>Tenure</th>
            </tr>
          </thead>
          <tbody>
            {apps.map(app => (
              <tr key={app.id}>
                <td data-label="Loan Type">{app.loanType}</td>
                <td data-label="Amount">${app.amount.toLocaleString()}</td>
                <td data-label="Interest Rate">{app.interestRate}%</td> {/* show as percent */}
                <td data-label="Tenure">{app.tenure} mo</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}