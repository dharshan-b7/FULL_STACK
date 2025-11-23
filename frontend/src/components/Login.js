import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { authService } from '../services/authService';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  try {
    const data = await authService.login(formData.email, formData.password);
    onLogin(data.user);
    navigate('/dashboard');
  } catch (err) {
    setError(err.error || 'Login failed. Please try again.');
  }
};

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>🔬 Aluminum Recovery System</h1>
          <p>Smart Workflow for Enhanced Processing</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <h2>Login</h2>
          
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="btn-primary">
            Login
          </button>

          <div className="login-footer">
            <p>Don't have an account? <a href="/register">Register here</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;