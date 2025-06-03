import React, { useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login } = React.useContext(AuthContext);
  const navigate = useNavigate();
  // State to hold form data
  // and handle form submission
  // and error handling
  // and success message
  // and loading state
  // and form data
  // and handle form submission
  // and error handling
  // and success message    
  const [formData, setFormData] = useState({
    name: '',
    password: ''
  });

  const [error, setError] = useState('null');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Call the login function from AuthContext
      await login(formData.name, formData.password);
      const response = await axios.post('http://localhost:8080/api/login', {
        name: formData.name,
        password: formData.password
      });

      alert(response.data); // Should say: Login successful
    } catch (error) {
        if (error.response && (error.response.status === 401|| error.response.status === 404)) {
            alert(error.response.data.message); // Show the error message from the server
              }
              else {

                console.error('Login error:', error);
      alert('Login failed');
    }
              }      
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Username"
          value={formData.name}
          onChange={handleChange}
          required
        /><br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

