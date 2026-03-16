import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

const Sidebar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <img src="/logo.png" alt="EarlyCare Logo" className="logo-image" />
                <div className="logo-text">EarlyCare</div>
            </div>

            <nav className="sidebar-nav">
                <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} end>
                    <span className="icon">🏠</span>
                    <span className="label">Home</span>
                </NavLink>

                {!user ? (
                    <>
                        <NavLink to="/login" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                            <span className="icon">🔑</span>
                            <span className="label">Login</span>
                        </NavLink>
                        <NavLink to="/register" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                            <span className="icon">📝</span>
                            <span className="label">Register</span>
                        </NavLink>
                    </>
                ) : (
                    <>
                        <NavLink to="/dashboard" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                            <span className="icon">📊</span>
                            <span className="label">Health Hub</span>
                        </NavLink>
                        <NavLink to="/symptoms" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                            <span className="icon">🩺</span>
                            <span className="label">Symptom Check</span>
                        </NavLink>
                        <NavLink to="/upload" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                            <span className="icon">📤</span>
                            <span className="label">Upload Reports</span>
                        </NavLink>
                        <NavLink to="/history" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                            <span className="icon">📜</span>
                            <span className="label">Medical History</span>
                        </NavLink>
                        <NavLink to="/settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                            <span className="icon">⚙️</span>
                            <span className="label">Settings</span>
                        </NavLink>
                    </>
                )}
            </nav>

            <div className="sidebar-footer">
                {user ? (
                    <button onClick={handleLogout} className="logout-button">
                        <span className="icon">🚪</span>
                        <span className="label">Logout</span>
                    </button>
                ) : (
                    <div className="logo-icon small">🛡️</div>
                )}
            </div>
        </aside>
    );
};

export default Sidebar;
