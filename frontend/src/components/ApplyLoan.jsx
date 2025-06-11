import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

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

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'loanType') {
      const rate = loanOptions[value] ?? '';
      setFormData((fd) => ({
        ...fd,
        loanType: value,
        interestRate: rate,
      }));
    } else {
      setFormData((fd) => ({
        ...fd,
        [name]: value,
      }));
    }

    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const formDataToSend = new FormData();
    formDataToSend.append(
      'loan',
      new Blob(
        [JSON.stringify({
          nameOfApplicant: formData.nameOfApplicant,
          loanType: formData.loanType,
          amount: parseFloat(formData.amount),
          tenure: parseInt(formData.tenure, 10),
          interestRate: formData.interestRate,
        })],
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

      setSuccess(response.data);
      setFormData({
        nameOfApplicant: '',
        loanType: '',
        amount: '',
        tenure: '',
        interestRate: '',
      });
      setFile(null);
    } catch (err) {
      setSuccess('');
      if (err.response) {
        const status = err.response.status;
        const message =
          err.response.data?.message || err.response.data || 'Loan application failed due to credit score or input error';

        if (status === 401) {
          setError('Session expired. Please log in again.');
          logout();
          return;
        }

        setError(message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Apply for a Loan</h2>

      {error && <p style={errorStyle}>{error}</p>}
      {success && <p style={successStyle}>{success}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nameOfApplicant"
          placeholder="Enter your full name"
          value={formData.nameOfApplicant}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <select
          name="loanType"
          value={formData.loanType}
          onChange={handleChange}
          required
          style={inputStyle}
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
          style={{ ...inputStyle, backgroundColor: '#f9f9f9', color: '#555' }}
        />

        <input
          type="number"
          name="amount"
          placeholder="Loan Amount"
          value={formData.amount}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="number"
          name="tenure"
          placeholder="Tenure in months"
          value={formData.tenure}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="file"
          name="file"
          onChange={e => setFile(e.target.files[0])}
          style={{ margin: '0.6rem 0' }}
        />

        <button type="submit" disabled={loading} style={buttonStyle}>
          {loading ? 'Applying...' : 'Apply'}
        </button>
      </form>
    </div>
  );
}

const containerStyle = {
  maxWidth: '500px',
  margin: '2rem auto',
  padding: '2rem',
  background: '#fff',
  borderRadius: '12px',
  boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
};

const titleStyle = {
  textAlign: 'center',
  fontSize: '1.5rem',
  marginBottom: '1.2rem',
};

const inputStyle = {
  width: '100%',
  padding: '0.9rem',
  margin: '0.6rem 0',
  fontSize: '1rem',
  border: '1px solid #ccc',
  borderRadius: '6px',
};

const buttonStyle = {
  width: '100%',
  padding: '0.9rem',
  marginTop: '1rem',
  backgroundColor: '#397eff',
  color: '#fff',
  fontWeight: 'bold',
  fontSize: '1rem',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
};

const errorStyle = {
  color: 'red',
  textAlign: 'center',
  marginBottom: '1rem',
};

const successStyle = {
  color: 'green',
  textAlign: 'center',
  marginBottom: '1rem',
};