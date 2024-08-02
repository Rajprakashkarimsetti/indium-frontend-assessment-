// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register'; 
import DashboardPage from './pages/DashboardPage';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} /> {/* Default route */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      {/* Remove the NotFound route if not needed */}
    </Routes>
  </Router>
);

export default App;
