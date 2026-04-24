import React, { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import FieldTable from './FieldTable';
import LoadingSpinner from './LoadingSpinner';
import api from '../api';

export default function AgentDashboard({ user, onLogout }) {
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    myFields: 0,
    activeFields: 0,
    completedFields: 0
  });

  const fetchFields = useCallback(async () => {
    try {
      const response = await api.get(`/fields/agent/${user.id}`);
      setFields(response.data);

      // Calculate stats
      const myFields = response.data.length;
      const activeFields = response.data.filter(field => field.status === 'active').length;
      const completedFields = response.data.filter(field => field.status === 'completed').length;

      setStats({ myFields, activeFields, completedFields });
    } catch (error) {
      toast.error('Failed to load your fields');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [user.id]);

  useEffect(() => {
    fetchFields();
  }, [fetchFields]);

  const handleLogout = () => {
    toast.success('Logged out successfully');
    onLogout();
  };

  if (loading) {
    return <LoadingSpinner message="Loading your fields..." />;
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f9fafb',
      padding: '2rem 1rem'
    }}>
      {/* Header */}
      <header style={{
        background: 'white',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        borderBottom: '1px solid #e5e7eb',
        borderRadius: '12px',
        marginBottom: '2rem',
        padding: '2rem'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h1 style={{
              fontSize: '2.25rem',
              fontWeight: 'bold',
              color: '#111827',
              marginBottom: '0.5rem'
            }}>
              Agent Dashboard
            </h1>
            <p style={{ color: '#6b7280' }}>
              Welcome back, {user.name}
            </p>
          </div>
          <button
            onClick={handleLogout}
            style={{
              background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Stats Cards */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{
              padding: '0.5rem',
              background: '#dbeafe',
              borderRadius: '0.5rem',
              marginRight: '1rem'
            }}>
              <svg style={{ width: '1.5rem', height: '1.5rem', color: '#2563eb' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>My Fields</p>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111827' }}>{stats.myFields}</p>
            </div>
          </div>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{
              padding: '0.5rem',
              background: '#dcfce7',
              borderRadius: '0.5rem',
              marginRight: '1rem'
            }}>
              <svg style={{ width: '1.5rem', height: '1.5rem', color: '#16a34a' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>Active</p>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111827' }}>{stats.activeFields}</p>
            </div>
          </div>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{
              padding: '0.5rem',
              background: '#dbeafe',
              borderRadius: '0.5rem',
              marginRight: '1rem'
            }}>
              <svg style={{ width: '1.5rem', height: '1.5rem', color: '#2563eb' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>Completed</p>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111827' }}>{stats.completedFields}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Fields Table */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
      }}>
        <div style={{
          padding: '1.5rem',
          borderBottom: '1px solid #e5e7eb'
        }}>
          <h2 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#111827'
          }}>
            My Assigned Fields
          </h2>
          <p style={{ color: '#6b7280', marginTop: '0.25rem' }}>
            Track and update your field assignments
          </p>
        </div>
        <div style={{ padding: '1.5rem' }}>
          {fields.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '3rem 1rem',
              color: '#6b7280'
            }}>
              <svg style={{ width: '3rem', height: '3rem', margin: '0 auto 1rem', color: '#d1d5db' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                No fields assigned
              </h3>
              <p style={{ color: '#6b7280' }}>
                You don't have any fields assigned yet.
              </p>
            </div>
          ) : (
            <FieldTable fields={fields} onUpdate={fetchFields} isAgent />
          )}
        </div>
      </div>
    </div>
  );
}
