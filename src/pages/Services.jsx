// src/pages/Services.jsx
import React, { useState } from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import ServiceList from '../components/services/ServiceList';
import ServiceForm from '../components/services/ServiceForm';

const Services = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const handleAddService = (serviceData) => {
    // TODO: Call API to add service
    setShowForm(false);
  };

  const handleEditService = (serviceData) => {
    // TODO: Call API to update service
    setShowForm(false);
    setEditingService(null);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Services</h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Add Service
          </button>
        </div>
        
        {showForm && (
          <div className="bg-white shadow rounded-lg p-6">
            <ServiceForm
              onSubmit={editingService ? handleEditService : handleAddService}
              initialData={editingService}
            />
          </div>
        )}
        
        <ServiceList />
      </div>
    </DashboardLayout>
  );
};

export default Services;