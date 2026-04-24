import React, { useEffect, useState } from 'react';
import api from '../api';
import FieldTable from './FieldTable';

function AgentDashboard({ user, onLogout }) {
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFields();
  }, []);

  const fetchFields = async () => {
    try {
      const response = await api.get(`/fields/agent/${user.id}`);
      setFields(response.data);
    } catch (error) {
      console.error('Error fetching fields:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Agent Dashboard</h1>
          <button
            onClick={onLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">My Fields</h2>
          {loading ? (
            <div>Loading fields...</div>
          ) : (
            <FieldTable fields={fields} onUpdate={fetchFields} />
          )}
        </div>
      </main>
    </div>
  );
}

export default AgentDashboard;

export default AgentDashboard;
