import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import api from '../api';

export default function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/auth/login', formData);
      const { user, token } = response.data;
      toast.success(`Welcome back, ${user.name}!`);
      onLogin(user, token);
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Login failed. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-screen">
      <div className="login-card">
        <h1>SmartSeason</h1>
        <p>Farm management for agents and admins.</p>

        <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem' }}>
          <div className="form-row">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-row">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" disabled={loading} style={{ marginTop: '1rem' }}>
            {loading ? (
              <span>
                <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite', marginRight: '0.5rem' }}>⟳</span>
                Signing in...
              </span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <a
            href="/register"
            style={{
              color: '#10b981',
              textDecoration: 'none',
              fontWeight: '500'
            }}
            onMouseOver={(e) => e.target.style.color = '#059669'}
            onMouseOut={(e) => e.target.style.color = '#10b981'}
          >
            Don't have an account? Sign up
          </a>
        </div>
      </div>
    </div>
  );
}
