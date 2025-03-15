// src/hooks/useServices.js
import { useState, useEffect, useCallback } from 'react';
import { getServices, createService, deleteService, editService } from '../utils/api';

const useServices = (token) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchServices = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getServices(token);
      setServices(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const addService = async (serviceData) => {
    const newService = await createService(serviceData, token);
    setServices((prev) => [...prev, newService]);
    return newService;
  };

  const removeService = async (serviceId) => {
    await deleteService(serviceId, token);
    setServices((prev) => prev.filter((svc) => svc.id !== serviceId));
  };

  const updateServiceData = async (serviceId, serviceData) => {
    const updatedService = await editService(serviceId, serviceData, token);
    setServices((prev) =>
      prev.map((svc) => (svc.id === serviceId ? updatedService : svc))
    );
    return updatedService;
  };

  return {
    services,
    loading,
    error,
    fetchServices,
    addService,
    removeService,
    updateServiceData,
  };
};

export default useServices;
