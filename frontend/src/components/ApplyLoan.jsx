import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ApplyLoan() {
  const navigate = useNavigate();

  // Define loan types and their interest rates (as decimals)
  const loanOptions = {
    personal: 0.05,
    home:      0.04,
    education: 0.03,
    business:  0.06,
    auto:      0.06
  };

  const [formData, setFormData] = useState({
    loanType:     '',
    amount:       '',
    tenure:       '',
    interestRate: ''
  });
  const [error,   setError]   = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;

    if (name === 'loanType') {
      const rate = loanOptions[value] ?? '';
      setFormData(fd => ({
        ...fd,
        loanType: value,
        interestRate: rate
      }));
    } else {
      setFormData(fd => ({
        ...fd,
        [name]: value
      }));
    }

    setError('');
    setSuccess('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    // Prepare the payload with proper number types
    const payload = {
      loanType:     formData.loanType,
      amount:       parseFloat(formData.amount),
      tenure:       parseInt(formData.tenure, 10),
      interestRate: formData.interestRate
    };

    try {
      const response = await axios.post(
        'http://localhost:8080/api/apply-loan',
        payload
      );
      setSuccess(response.data); // e.g. "Loan application submitted successfully."
      // Clear form
      setFormData({ loanType: '', amount: '', tenure: '', interestRate: '' });
      // Optionally redirect:
      // navigate('/transactions');
    } catch (err) {
      console.error('Loan application error:', err);
      if (err.response?.data) setError(err.response.data);
      else setError('Loan application failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Apply for a Loan</h2>

      {error   && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <form onSubmit={handleSubmit}>
        <label>
          Loan Type:
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
        </label>
        <br />

        <label>
          Interest Rate:
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
        </label>
        <br />

        <label>
          Amount:
          <input
            type="number"
            name="amount"
            placeholder="Loan Amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Tenure (months):
          <input
            type="number"
            name="tenure"
            placeholder="Tenure in months"
            value={formData.tenure}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <button type="submit" disabled={loading}>
          {loading ? 'Applying…' : 'Apply'}
        </button>
      </form>
    </div>
  );
}