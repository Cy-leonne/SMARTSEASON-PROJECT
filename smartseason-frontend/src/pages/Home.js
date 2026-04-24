import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ user, onLogout }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">SmartSeason</h1>
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
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Welcome to SmartSeason, {user.name || user.email}!
            </h2>
            <p className="text-gray-600 mb-8">
              Your smart farming management platform
            </p>
            <div className="space-y-4">
              {user.role === 'admin' ? (
                <Link
                  to="/admin"
                  className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg mr-4"
                >
                  Go to Admin Dashboard
                </Link>
              ) : (
                <Link
                  to="/agent"
                  className="inline-block bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg mr-4"
                >
                  Go to Agent Dashboard
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;