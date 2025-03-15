// // src/pages/Services.jsx
// import React, { useState } from 'react';
// import DashboardLayout from '../components/dashboard/DashboardLayout';
// import ServiceList from '../components/services/ServiceList';
// import ServiceForm from '../components/services/ServiceForm';

// const Services = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [editingService, setEditingService] = useState(null);

//   const handleAddService = (serviceData) => {
//     // TODO: Call API to add service
//     setShowForm(false);
//   };

//   const handleEditService = (serviceData) => {
//     // TODO: Call API to update service
//     setShowForm(false);
//     setEditingService(null);
//   };

//   return (
//     <DashboardLayout>
//       <div className="space-y-6">
//         <div className="flex justify-between items-center">
//           <h1 className="text-2xl font-semibold text-gray-900">Services</h1>
//           <button
//             onClick={() => setShowForm(true)}
//             className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
//           >
//             Add Service
//           </button>
//         </div>
        
//         {showForm && (
//           <div className="bg-white shadow rounded-lg p-6">
//             <ServiceForm
//               onSubmit={editingService ? handleEditService : handleAddService}
//               initialData={editingService}
//             />
//           </div>
//         )}
        
//         <ServiceList />
//       </div>
//     </DashboardLayout>
//   );
// };

// export default Services;

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

  // Handle editing a service (delete + create new)
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
      <div className="space-y-6">
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

        {showForm && (
          <div className="bg-white shadow rounded-lg p-6">
            <ServiceForm
              onSubmit={editingService ? handleEditService : handleAddService}
              initialData={editingService}
            />
          </div>
        )}

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
    </DashboardLayout>
  );
};

export default Services;
