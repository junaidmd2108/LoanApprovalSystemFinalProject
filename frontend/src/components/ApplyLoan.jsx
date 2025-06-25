import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../index.css';

export default function ApplyLoan() {
  const { token, logout } = useContext(AuthContext);
  const navigate          = useNavigate();

  const loanOptions = {
    personal:  0.05,
    home:      0.04,
    education: 0.03,
    business:  0.06,
    auto:      0.06,
  };

  const [formData, setFormData] = useState({
    nameOfApplicant: '',
    loanType:        '',
    amount:          '',
    tenure:          '',
    interestRate:    '',
  });
  const [file,    setFile]    = useState(null);
  const [message, setMessage] = useState('');
  const [error,   setError]   = useState('');
  const [loading, setLoading] = useState(false);

  // clear any old messages
  useEffect(() => {
    setError('');
    setMessage('');
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'loanType') {
      const rate = loanOptions[value] ?? '';
      setFormData(f => ({
        ...f,
        loanType:     value,
        interestRate: rate
      }));
    } else {
      setFormData(f => ({ ...f, [name]: value }));
    }

    if (error)   setError('');
    if (message) setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    // build multipart payload
    const payload = new FormData();
    payload.append(
      'loan',
      new Blob([JSON.stringify({
        nameOfApplicant: formData.nameOfApplicant,
        loanType:        formData.loanType,
        amount:          parseFloat(formData.amount),
        tenure:          parseInt(formData.tenure, 10),
        interestRate:    formData.interestRate,
      })], { type: 'application/json' })
    );
    if (file) payload.append('file', file);

    try {
      const res = await axios.post(
        'http://localhost:8080/api/apply-loan',
        payload,
        {
          headers: {
            'Content-Type':        'multipart/form-data',
            Authorization:         `Bearer ${token}`,
          }
        }
      );

      setMessage(res.data.message || 'Loan application submitted!');
      setFormData({
        nameOfApplicant: '',
        loanType:        '',
        amount:          '',
        tenure:          '',
        interestRate:    '',
      });
      setFile(null);

    } catch (err) {
      // expired session?
      if (err.response?.status === 401) {
        setError('Session expired. Redirecting to login…');
        logout();
        navigate('/login');
        return;
      }
      setError(
        err.response?.data?.message ||
        err.response?.data       ||
        'Loan application failed.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container applyloan-container">
      <h2>Apply for a Loan</h2>

      {message && <p className="form-success">{message}</p>}
      {error   && <p className="form-error"  >{error  }</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nameOfApplicant"
          placeholder="Full Name"
          autoComplete="name"
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
          {Object.keys(loanOptions).map(type => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="interestRate"
          placeholder="Interest Rate"
          value={
            formData.interestRate !== ''
              ? `${(formData.interestRate * 100).toFixed(2)}%`
              : ''
          }
          readOnly
        />

        <input
          type="number"
          name="amount"
          placeholder="Loan Amount"
          autoComplete="off"
          value={formData.amount}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="tenure"
          placeholder="Tenure (months)"
          autoComplete="off"
          value={formData.tenure}
          onChange={handleChange}
          required
        />

        <input
          type="file"
          name="file"
          onChange={e => setFile(e.target.files[0])}
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Applying…' : 'Submit Loan Application'}
        </button>
      </form>
    </div>
  );
}