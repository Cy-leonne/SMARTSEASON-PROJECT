import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './components/AdminDashboard';
import AgentDashboard from './components/AgentDashboard';
import LoadingSpinner from './components/LoadingSpinner';
import api from './api';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');

      if (token && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          setUser(parsedUser);
        } catch (error) {
          // Invalid stored data, clear it
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const handleLogin = (userData, token) => {
    setUser(userData);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete api.defaults.headers.common['Authorization'];
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <Navigate to={user.role === 'admin' ? '/admin' : '/agent'} replace />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/admin"
            element={
              user?.role === 'admin' ? (
                <AdminDashboard user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/agent"
            element={
              user?.role === 'agent' ? (
                <AgentDashboard user={user} onLogout={handleLogout} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
