// src/components/clients/ClientSettings.jsx
import React, { useState } from 'react';

const ClientSettings = () => {
  const [settings, setSettings] = useState({
    maxSimultaneousBookings: 2,
    cancellationTimeLimit: 60,
    requireRegistration: true
  });

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setSettings({
      ...settings,
      [e.target.name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Save settings to backend
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium mb-6">Client Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="maxSimultaneousBookings" className="block text-sm font-medium text-gray-700">
            Maximum Simultaneous Bookings
          </label>
          <input
            type="number"
            name="maxSimultaneousBookings"
            id="maxSimultaneousBookings"
            value={settings.maxSimultaneousBookings}
            onChange={handleChange}
            min="1"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="cancellationTimeLimit" className="block text-sm font-medium text-gray-700">
            Cancellation Time Limit (minutes)
          </label>
          <input
            type="number"
            name="cancellationTimeLimit"
            id="cancellationTimeLimit"
            value={settings.cancellationTimeLimit}
            onChange={handleChange}
            min="0"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="requireRegistration"
            id="requireRegistration"
            checked={settings.requireRegistration}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="requireRegistration" className="ml-2 block text-sm text-gray-900">
            Require Registration for Booking
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default ClientSettings;