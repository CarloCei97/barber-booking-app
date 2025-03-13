// src/App.jsx
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
  // Set initial state to null so we can show a loading indicator until auth is determined
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    // Check initial authentication status
    setAuth(isAuthenticated());

    // Listen for auth changes
    const handleAuthChange = () => {
      setAuth(isAuthenticated());
    };

    window.addEventListener("authChange", handleAuthChange);

    return () => {
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

  // Show a loading state while auth status is being determined
  if (auth === null) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/login" element={<LoginForm setAuth={setAuth} />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/calendar" element={
            <ProtectedRoute isAuthenticated={auth}>
              <Calendar />
            </ProtectedRoute>
          } />
          <Route path="/services" element={
            <ProtectedRoute isAuthenticated={auth}>
              <Services />
            </ProtectedRoute>
          } />
          <Route path="/clients" element={
            <ProtectedRoute isAuthenticated={auth}>
              <Clients />
            </ProtectedRoute>
          } />
          <Route path="/reports" element={
            <ProtectedRoute isAuthenticated={auth}>
              <Reports />
            </ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute isAuthenticated={auth}>
              <Dashboard setAuth={setAuth} />
            </ProtectedRoute>
          } />
          {/* Redirect root to dashboard if authenticated */}
          <Route path="/" element={
            auth ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
          } />
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
