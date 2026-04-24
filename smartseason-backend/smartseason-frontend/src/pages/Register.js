import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import api from '../api';

export default function Register() {
  const [formData, setFormData] = useState({
    role: 'agent',
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      await api.post(`/auth/register/${formData.role}`, {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      toast.success(`${formData.role.charAt(0).toUpperCase() + formData.role.slice(1)} account created successfully!`);
      navigate('/');
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Registration failed. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #ecfdf5 0%, #f0f9ff 100%)',
      padding: '2rem 1rem'
    }}>
      <div style={{
        maxWidth: '420px',
        width: '100%',
        background: 'white',
        borderRadius: '16px',
        padding: '2rem',
        boxShadow: '0 20px 40px rgba(15, 23, 42, 0.08)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#166534',
            marginBottom: '0.5rem'
          }}>
            SmartSeason
          </h1>
          <p style={{ color: '#475569' }}>Create your account</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label htmlFor="role" style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '600',
              color: '#334155'
            }}>
              Account Type
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.75rem 0.85rem',
                border: '1px solid #cbd5e1',
                borderRadius: '0.75rem',
                fontSize: '1rem'
              }}
            >
              <option value="agent">Field Agent</option>
              <option value="admin">Administrator</option>
            </select>
          </div>

          <div>
            <label htmlFor="name" style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '600',
              color: '#334155'
            }}>
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.75rem 0.85rem',
                border: '1px solid #cbd5e1',
                borderRadius: '0.75rem',
                fontSize: '1rem'
              }}
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label htmlFor="email" style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '600',
              color: '#334155'
            }}>
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.75rem 0.85rem',
                border: '1px solid #cbd5e1',
                borderRadius: '0.75rem',
                fontSize: '1rem'
              }}
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '600',
              color: '#334155'
            }}>
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.75rem 0.85rem',
                border: '1px solid #cbd5e1',
                borderRadius: '0.75rem',
                fontSize: '1rem'
              }}
              placeholder="Create a password"
              minLength="6"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: '1rem',
              background: loading ? '#9ca3af' : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? (
              <span>
                <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite', marginRight: '0.5rem' }}>⟳</span>
                Creating Account...
              </span>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <button
            onClick={() => navigate('/')}
            style={{
              color: '#10b981',
              background: 'none',
              border: 'none',
              fontWeight: '500',
              cursor: 'pointer',
              textDecoration: 'none'
            }}
            onMouseOver={(e) => e.target.style.color = '#059669'}
            onMouseOut={(e) => e.target.style.color = '#10b981'}
          >
            Already have an account? Sign in
          </button>
        </div>
      </div>
    </div>
  );
}
