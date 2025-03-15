// src/components/clients/ClientList.jsx
import React from 'react';

const ClientList = () => {
  // Dummy data; in a real scenario, this would be fetched from the backend.
  const clients = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      status: 'active'
    },
    // More clients...
  ];

  const handleBlockClient = (id) => {
    // In a real scenario, you'd also call an API to update the client's status.
    // For now, we'll just simulate by updating local data.
    // This demo doesn't support state updates because it's using static dummy data.
    console.log(`Toggle block for client ${id}`);
  };

  return (
    <div className="bg-white shadow rounded-lg p-4">
      {/* Desktop Table Layout */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {clients.map((client) => (
              <tr key={client.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{client.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{client.email}</div>
                  <div className="text-sm text-gray-500">{client.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    client.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {client.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleBlockClient(client.id)}
                    className={`${
                      client.status === 'active'
                        ? 'text-red-600 hover:text-red-900'
                        : 'text-green-600 hover:text-green-900'
                    }`}
                  >
                    {client.status === 'active' ? 'Block' : 'Unblock'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="block sm:hidden space-y-4">
        {clients.map((client) => (
          <div key={client.id} className="bg-gray-50 p-4 rounded-lg shadow">
            <div className="mb-2">
              <span className="block text-xs text-gray-500 uppercase">Name</span>
              <span className="block text-sm font-medium text-gray-900">{client.name}</span>
            </div>
            <div className="mb-2">
              <span className="block text-xs text-gray-500 uppercase">Email</span>
              <span className="block text-sm text-gray-900">{client.email}</span>
            </div>
            <div className="mb-2">
              <span className="block text-xs text-gray-500 uppercase">Phone</span>
              <span className="block text-sm text-gray-900">{client.phone}</span>
            </div>
            <div className="mb-2">
              <span className="block text-xs text-gray-500 uppercase">Status</span>
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                client.status === 'active'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {client.status}
              </span>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => handleBlockClient(client.id)}
                className={`${
                  client.status === 'active'
                    ? 'text-red-600 hover:text-red-900'
                    : 'text-green-600 hover:text-green-900'
                } text-sm`}
              >
                {client.status === 'active' ? 'Block' : 'Unblock'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientList;
