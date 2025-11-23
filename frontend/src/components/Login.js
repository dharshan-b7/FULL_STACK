import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { loginUser } from '../services/authService';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',   // <-- CHANGED
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
      const response = await loginUser(formData);

      const user = {
        email: formData.email,
        role: response.data.role
      };

      onLogin(user);
      navigate('/dashboard');

    } catch (err) {
      setError("Invalid login credentials");
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
            <label>Email</label>
            <input
              type="text"
              name="email"        // <-- CHANGED
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn-primary">Login</button>

          <div className="login-footer">
            Don't have an account? <a href="/register">Register here</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
