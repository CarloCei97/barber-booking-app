import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import Dashboard from './components/Dashboard';
import Calendar from "./pages/Calendar";  
import Services from "./pages/Services";  
import Clients from "./pages/Clients"; 
import Reports from "./pages/Reports";  
import ProtectedRoute from './components/auth/ProtectedRoute';
import { isAuthenticated } from './utils/auth';


function App() {
  const [auth, setAuth] = useState(false); // ✅ Set the default value of the `false`

  useEffect(() => {
    //console.log("[DEBUG] Checking initial authentication...");
    setAuth(isAuthenticated()); // ✅ Set `auth` before rendering Routes

    const handleAuthChange = () => {
      //console.log("[DEBUG] Auth change detected! Updating state...");
      setAuth(isAuthenticated());
    };

    window.addEventListener("authChange", handleAuthChange);

    return () => {
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

  // ✅ Prevent routing until `auth` is determined (null check)
  if (auth === null) {
    //console.log("[DEBUG] Waiting for authentication state...");
    return <div>Loading...</div>; // Or a custom loading spinner
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/login" element={<LoginForm setAuth={setAuth} />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/services" element={<Services />} />  
          <Route path="/Clients" element={<Clients />} />  
          <Route path="/Reports" element={<Reports />} />  
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute isAuthenticated={auth}>
                <Dashboard setAuth={setAuth} />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
