// src/components/calendar/AppointmentForm.jsx
import React, { useState, useEffect } from 'react';
import useServices from '../../hooks/useServices';

const AppointmentForm = ({ selectedDate, initialData, onSubmit, onClose }) => {
  // Initialize formData using initialData if provided
  const [formData, setFormData] = useState({
    clientName: initialData?.clientName || '',
    service: initialData?.service || '', // This will hold the service id
    timeSlot: initialData?.timeSlot || ''
  });

  // Available time slots from 9 AM to 5 PM
  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00'
  ];

  const token = localStorage.getItem('auth_token');
  const { services: availableServices, loading: servicesLoading, error: servicesError } = useServices(token);

  // Update formData if initialData changes (for editing)
  useEffect(() => {
    if (initialData) {
      setFormData({
        clientName: initialData.clientName,
        service: initialData.service, // assume initialData.service is already the service name or id
        timeSlot: initialData.timeSlot
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert selected service id to its corresponding service name
    const selectedServiceObj = availableServices.find(s => s.id === formData.service);
    const serviceName = selectedServiceObj ? selectedServiceObj.name : '';
    onSubmit({
      ...formData,
      service: serviceName,
      date: selectedDate.toISOString() // Send date in ISO format
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {initialData ? "Edit Appointment" : "Book Appointment"}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        <div className="mb-4">
          <p className="text-gray-600">
            Selected Date: {selectedDate.toLocaleDateString()}
          </p>
        </div>

        {servicesLoading ? (
          <div>Loading services...</div>
        ) : servicesError ? (
          <div className="text-red-500">{servicesError}</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Service
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="">Select a service</option>
                {availableServices.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Time Slot
              </label>
              <select
                name="timeSlot"
                value={formData.timeSlot}
                onChange={handleChange}
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="">Select a time slot</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {initialData ? "Save Changes" : "Book Appointment"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AppointmentForm;
