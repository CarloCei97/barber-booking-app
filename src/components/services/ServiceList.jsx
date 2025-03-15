// src/components/services/ServiceList.jsx
import React from 'react';

const ServiceList = ({ services, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      {/* Desktop Table: visible on small screens and up */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Service
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duration (min)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price (€)
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {services.map((service) => (
              <tr key={service.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {service.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {service.duration}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {service.price}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onEdit && onEdit(service)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete && onDelete(service.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Card Layout: visible only on extra small screens */}
      <div className="block sm:hidden space-y-4">
        {services.map((service) => (
          <div key={service.id} className="bg-gray-50 p-4 rounded-lg">
            <div className="mb-2">
              <span className="block text-xs text-gray-500 uppercase">Service</span>
              <span className="block text-sm font-medium text-gray-900">{service.name}</span>
            </div>
            <div className="mb-2">
              <span className="block text-xs text-gray-500 uppercase">Duration (min)</span>
              <span className="block text-sm text-gray-900">{service.duration}</span>
            </div>
            <div className="mb-2">
              <span className="block text-xs text-gray-500 uppercase">Price (€)</span>
              <span className="block text-sm text-gray-900">{service.price}</span>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => onEdit && onEdit(service)}
                className="text-blue-600 hover:text-blue-900 text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete && onDelete(service.id)}
                className="text-red-600 hover:text-red-900 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceList;
