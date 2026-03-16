import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import SymptomCheck from './pages/SymptomCheck';
import UploadReports from './pages/UploadReports';
import History from './pages/History';
import Settings from './pages/Settings';
import './App.css';

function AppContent() {
  const { user } = useAuth();

  return (
    <div className={`App ${user ? 'has-sidebar' : 'no-sidebar'}`}>
      <div className="earlycare-bg"></div>
      {user && <Sidebar />}
      <main className="main-content page-fade-in">
        <div className="glow-accent" style={{ top: '10%', left: '10%' }}></div>
        <div className="glow-accent" style={{ bottom: '20%', right: '5%' }}></div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/symptoms" element={
            <ProtectedRoute>
              <SymptomCheck />
            </ProtectedRoute>
          } />
          <Route path="/upload" element={
            <ProtectedRoute>
              <UploadReports />
            </ProtectedRoute>
          } />
          <Route path="/history" element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
