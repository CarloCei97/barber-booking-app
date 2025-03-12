// src/components/clients/ClientList.jsx
import React, { useState } from 'react';

const ClientList = () => {
  const [clients, setClients] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      status: 'active'
    },
    // More clients would be fetched from the backend
  ]);

  const handleBlockClient = (id) => {
    setClients(clients.map(client => 
      client.id === id
        ? { ...client, status: client.status === 'active' ? 'blocked' : 'active' }
        : client
    ));
  };

  return (
    <div className="bg-white shadow rounded-lg">
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
                  client.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {client.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => handleBlockClient(client.id)}
                  className={`${
                    client.status === 'active' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'
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
  );
};

export default ClientList;