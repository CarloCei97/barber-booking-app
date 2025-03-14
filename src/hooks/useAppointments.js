// src/hooks/useAppointments.js
import { useState, useEffect } from 'react';
import { getAppointments } from '../utils/api';

const useAppointments = (currentDate, token) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const data = await getAppointments(token);
      setAppointments(data);
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchAppointments();
    }
  }, [token, currentDate]);

  const refreshAppointments = () => {
    fetchAppointments();
  };

  return { appointments, loading, error, refreshAppointments };
};

export default useAppointments;
