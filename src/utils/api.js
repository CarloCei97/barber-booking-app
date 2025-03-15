// // src/utils/api.js
// import { registerUser, loginUser, logoutUser } from './auth';

// // Simulate API delay
// const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// export const authAPI = {
//   register: async (userData) => {
//     try {
//       await delay(500); // Simulate network delay
//       return registerUser(userData);
//     } catch (error) {
//       throw error;
//     }
//   },

//   login: async (credentials) => {
//     try {
//       await delay(500); // Simulate network delay
//       return loginUser(credentials);
//     } catch (error) {
//       throw error;
//     }
//   },

//   logout: async () => {
//     try {
//       await delay(300); // Simulate network delay
//       logoutUser();
//     } catch (error) {
//       throw error;
//     }
//   }
// };

// barber-booking-app/src/utils/api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:3001'; // Your backend runs on port 3001

//------------ profile data ------------------------------------------------
export const register = async (userData) => {
  const response = await axios.post(`${BASE_URL}/auth/register`, userData);
  return response.data;
};

export const login = async (credentials) => {
  const response = await axios.post(`${BASE_URL}/auth/login`, credentials);
  return response.data;
};

export const logout = async (token) => {
  const response = await axios.post(
    `${BASE_URL}/auth/logout`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const getProfile = async (token) => {
  const response = await axios.get(`${BASE_URL}/auth/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

//------------ appointments data ------------------------------------------------
// Create a new appointment
export const createAppointment = async (appointmentData, token) => {
  const response = await axios.post(`${BASE_URL}/appointments`, appointmentData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Update an appointment
export const updateAppointment = async (appointmentId, updateData, token) => {
  const response = await axios.put(`${BASE_URL}/appointments/${appointmentId}`, updateData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Delete an appointment
export const deleteAppointment = async (appointmentId, token) => {
  const response = await axios.delete(`${BASE_URL}/appointments/${appointmentId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Get appointments for the authenticated user (optionally you can pass a date parameter)
export const getAppointments = async (token, date = null) => {
  const url = date ? `${BASE_URL}/appointments?date=${date}` : `${BASE_URL}/appointments`;
  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

//----------------- Service data -----------------------------------------------------
// Create a new service
export const createService = async (serviceData, token) => {
  const response = await axios.post(`${BASE_URL}/services`, serviceData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Delete a service
export const deleteService = async (serviceId, token) => {
  const response = await axios.delete(`${BASE_URL}/services/${serviceId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Edit a service 
export const editService = async (serviceId, serviceData, token) => {
  // Delete the existing service
  await deleteService(serviceId, token);
  // Create a new service with the updated data
  const newService = await createService(serviceData, token);
  return newService;
};

// Get services for the authenticated user
export const getServices = async (token) => {
  const response = await axios.get(`${BASE_URL}/services`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};