import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AdminPanel from './components/AdminPanel';
import MaterialAnalysis from './components/MaterialAnalysis';
import ByProductManagement from './components/ByProductManagement';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={
            user ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />
          } />
          <Route path="/register" element={
            user ? <Navigate to="/dashboard" /> : <Register />
          } />
          <Route path="/dashboard" element={
            user ? <Dashboard user={user} onLogout={handleLogout} /> : <Navigate to="/login" />
          } />
          <Route path="/admin" element={
            user?.role === 'admin' ? <AdminPanel user={user} onLogout={handleLogout} /> : <Navigate to="/login" />
          } />
          <Route path="/analysis" element={
            user ? <MaterialAnalysis user={user} onLogout={handleLogout} /> : <Navigate to="/login" />
          } />
          <Route path="/byproducts" element={
            user ? <ByProductManagement user={user} onLogout={handleLogout} /> : <Navigate to="/login" />
          } />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;