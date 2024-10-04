import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from '../components/Login'; // Example component
import Dashboard from '../components/Dashboard'; // Example protected component
import Chat from '../components/Chat'; // Example Chat component
import useAuth from '../hooks/useAuth'; // Hook to check if user is authenticated

const AppRoutes = () => {
  const { isAuthenticated } = useAuth(); // Custom hook to check authentication

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route path="/chat" element={<Chat />} />
        {/* Default route */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
