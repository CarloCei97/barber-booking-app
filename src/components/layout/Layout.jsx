// src/components/layout/Layout.jsx
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { isAuthenticated, logoutUser } from '../../utils/auth';

const Layout = () => {
  const navigate = useNavigate();
  const authenticated = isAuthenticated();

  const handleLogout = async () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-900">
                  Lato Barber Shop
                </h1>
              </div>
            </div>
            <div className="flex items-center">
              {authenticated ? (
                <button
                  onClick={handleLogout}
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              ) : (
                <div className="space-x-4">
                  <button
                    onClick={() => navigate('/login')}
                    className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigate('/register')}
                    className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Register
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;