import React from 'react';

const LoadingSpinner = ({ message = 'Loading SmartSeason...' }) => {
  return (
    <div className="loading-screen">
      <div style={{ textAlign: 'center' }}>
        <div style={{
          display: 'inline-block',
          width: '3rem',
          height: '3rem',
          border: '2px solid #166534',
          borderRadius: '50%',
          borderTopColor: 'transparent',
          animation: 'spin 1s linear infinite',
          marginBottom: '1rem'
        }}></div>
        <p style={{ fontSize: '1.25rem', fontWeight: '600', color: '#166534' }}>{message}</p>
      </div>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;