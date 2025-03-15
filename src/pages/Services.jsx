// src/pages/Services.jsx
import React, { useState } from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import ServiceList from '../components/services/ServiceList';
import ServiceForm from '../components/services/ServiceForm';
import useServices from '../hooks/useServices';

const Services = () => {
  const token = localStorage.getItem('auth_token');
  const { services, loading, error, addService, removeService, updateServiceData } = useServices(token);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState(null);

  // Handle adding a new service
  const handleAddService = async (serviceData) => {
    try {
      await addService(serviceData);
      setShowForm(false);
    } catch (err) {
      console.error('Add service error:', err);
    }
  };

  // Handle editing a service (direct update)
  const handleEditService = async (serviceData) => {
    try {
      await updateServiceData(editingService.id, serviceData);
      setShowForm(false);
      setEditingService(null);
    } catch (err) {
      console.error('Edit service error:', err);
    }
  };

  // Handle deleting a service
  const handleDeleteService = async (serviceId) => {
    try {
      await removeService(serviceId);
    } catch (err) {
      console.error('Delete service error:', err);
    }
  };

  // When clicking "Edit" on a service, show the form with pre-filled data.
  const handleEditClick = (service) => {
    setEditingService(service);
    setShowForm(true);
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Services</h1>
          <button
            onClick={() => {
              setEditingService(null);
              setShowForm(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Add Service
          </button>
        </div>

        {loading ? (
          <div>Loading services...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <ServiceList
            services={services}
            onEdit={handleEditClick}
            onDelete={handleDeleteService}
          />
        )}
      </div>

      {/* Modal Popup for Service Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow p-6 w-full max-w-md">
            <ServiceForm
              onSubmit={editingService ? handleEditService : handleAddService}
              initialData={editingService}
            />
            <button
              onClick={() => setShowForm(false)}
              className="mt-4 w-full bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Services;
