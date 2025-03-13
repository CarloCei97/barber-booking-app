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