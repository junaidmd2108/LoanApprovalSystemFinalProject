import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import '../index.css';

export default function ApplyLoan() {
  const { token, logout } = useContext(AuthContext);

  const loanOptions = {
    personal: 0.05,
    home: 0.04,
    education: 0.03,
    business: 0.06,
    auto: 0.06,
  };

  const [formData, setFormData] = useState({
    nameOfApplicant: '',
    loanType: '',
    amount: '',
    tenure: '',
    interestRate: '',
  });

  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'loanType') {
      const rate = loanOptions[value] ?? '';
      setFormData((fd) => ({ ...fd, loanType: value, interestRate: rate }));
    } else {
      setFormData((fd) => ({ ...fd, [name]: value }));
    }

    setError('');
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    const formDataToSend = new FormData();
    formDataToSend.append(
      'loan',
      new Blob(
        [
          JSON.stringify({
            nameOfApplicant: formData.nameOfApplicant,
            loanType: formData.loanType,
            amount: parseFloat(formData.amount),
            tenure: parseInt(formData.tenure, 10),
            interestRate: formData.interestRate,
          }),
        ],
        { type: 'application/json' }
      )
    );
    if (file) {
      formDataToSend.append('file', file);
    }

    try {
      const response = await axios.post(
        'http://localhost:8080/api/apply-loan',
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(response.data);
      setFormData({
        nameOfApplicant: '',
        loanType: '',
        amount: '',
        tenure: '',
        interestRate: '',
      });
      setFile(null);
    } catch (err) {
      if (err.response) {
        if (err.response.status === 401) {
          setError('Session expired. Please log in again.');
          logout();
          return;
        }
        setError(err.response.data?.message || err.response.data || 'Loan application failed.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Apply for a Loan</h2>

      {message && <p className="form-success">{message}</p>}
      {error && <p className="form-error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nameOfApplicant"
          placeholder="Full Name"
          value={formData.nameOfApplicant}
          onChange={handleChange}
          required
        />

        <select
          name="loanType"
          value={formData.loanType}
          onChange={handleChange}
          required
        >
          <option value="">Select loan type</option>
          {Object.keys(loanOptions).map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="interestRate"
          value={
            formData.interestRate !== ''
              ? (formData.interestRate * 100).toFixed(2) + '%'
              : ''
          }
          readOnly
        />

        <input
          type="number"
          name="amount"
          placeholder="Loan Amount"
          value={formData.amount}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="tenure"
          placeholder="Tenure (in months)"
          value={formData.tenure}
          onChange={handleChange}
          required
        />

        <input
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Applying...' : 'Submit Loan Application'}
        </button>
      </form>
    </div>
  );
}