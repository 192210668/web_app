import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';
import { useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import SymptomCheck from './pages/SymptomCheck';
import UploadReports from './pages/UploadReports';
import History from './pages/History';
import Settings from './pages/Settings';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Cookie from './pages/Cookie';
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
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/cookie" element={<Cookie />} />

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
          <Footer />
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
