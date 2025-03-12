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

// src/utils/api.js
import { registerUser, loginUser, logoutUser } from './auth';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const authAPI = {
  register: async (userData) => {
    try {
      await delay(500); // Simulate network delay
      return registerUser(userData);
    } catch (error) {
      throw error;
    }
  },

  login: async (credentials) => {
    try {
      await delay(500); // Simulate network delay
      return loginUser(credentials);
    } catch (error) {
      throw error;
    }
  },

  logout: async () => {
    try {
      await delay(300); // Simulate network delay
      logoutUser();
    } catch (error) {
      throw error;
    }
  }
};