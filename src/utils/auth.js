// src/utils/auth.js
const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';

export const registerUser = (userData) => {
  try {
    // Simulate API call by storing user data in localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if user already exists
    if (users.some(user => user.email === userData.email)) {
      throw new Error('User already exists');
    }

    // Add new user
    const newUser = {
      ...userData,
      id: Date.now().toString(),
      password: btoa(userData.password) // Basic encoding (not secure, just for demo)
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Auto login after registration
    const token = `token_${newUser.id}`;
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify({
      id: newUser.id,
      email: newUser.email,
      name: newUser.name
    }));

    window.dispatchEvent(new Event("authChange")); // 🔄 Notify app of auth change

    return { user: newUser, token };
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

export const loginUser = (credentials) => {
  try {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => 
      u.email === credentials.email && 
      btoa(credentials.password) === u.password
    );

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const token = `token_${user.id}`;
    localStorage.setItem(TOKEN_KEY, token);
    console.log("Token set:", localStorage.getItem(TOKEN_KEY)); // Debug log
    localStorage.setItem(USER_KEY, JSON.stringify({
      id: user.id,
      email: user.email,
      name: user.username
    }));

    window.dispatchEvent(new Event("authChange")); // 🔄 Notify app of auth change

    return { user, token };
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const logoutUser = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  
  window.dispatchEvent(new Event("authChange")); // 🔄 Notify app of auth change
  window.location.href = "/login"; // ✅ Force redirect to login
};

  export const isAuthenticated = () => {
  const token = localStorage.getItem("auth_token");
  //console.log("[DEBUG] Checking auth token:", token);
  //console.log("[DEBUG] isAuthenticated() returns:", token !== null && token.startsWith("token_"));
  return token !== null && token.startsWith("token_");
};

/*export const isAuthenticated = () => {
  //console.log("[DEBUG] Forcing authentication to TRUE");
  return true; // ✅ Temporarily force authentication
};
window.isAuthenticated = isAuthenticated;
*/
export const getCurrentUser = () => {
  try {
    const userStr = localStorage.getItem(USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    console.error("Error parsing user data:", error);
    return null;
  }
};
