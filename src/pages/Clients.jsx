// src/pages/Clients.jsx
import React, { useState } from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import ClientList from '../components/clients/ClientList';
import ClientSettings from '../components/clients/ClientSettings';

const Clients = () => {
  const [activeTab, setActiveTab] = useState('list');

  return (
    <DashboardLayout>
      {/* Responsive container with proper horizontal padding */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('list')}
              className={`${
                activeTab === 'list'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Client List
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`${
                activeTab === 'settings'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Settings
            </button>
          </nav>
        </div>

        {activeTab === 'list' ? <ClientList /> : <ClientSettings />}
      </div>
    </DashboardLayout>
  );
};

export default Clients;
