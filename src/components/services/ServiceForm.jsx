// src/components/services/ServiceForm.jsx
import React, { useState } from 'react';

const ServiceForm = ({ onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    duration: '',
    price: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Service Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          required
        />
      </div>
      <div>
        <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
          Duration (minutes)
        </label>
        <input
          type="number"
          name="duration"
          id="duration"
          value={formData.duration}
          onChange={handleChange}
          min="0"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          required
        />
      </div>
      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
          Price (€)
        </label>
        <input
          type="number"
          name="price"
          id="price"
          value={formData.price}
          onChange={handleChange}
          min="0"
          step="0.01"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
      >
        {initialData ? 'Update Service' : 'Add Service'}
      </button>
    </form>
  );
};

export default ServiceForm;