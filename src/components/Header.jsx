import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = () => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // Map paths to page titles
    const pageTitles = {
        '/': 'Home',
        '/login': 'Sign In',
        '/register': 'Create Account',
        '/dashboard': 'Health Hub',
        '/symptoms': 'Symptom Check',
        '/upload': 'Upload Reports',
        '/history': 'Medical History',
        '/settings': 'Settings'
    };

    const currentTitle = pageTitles[location.pathname] || 'EarlyCare';

    return (
        <header className="app-header glass-card">
            <div className="header-left">
                {!user ? (
                    <Link to="/" className="header-logo-link">
                        <img src="/logo.png" alt="EarlyCare Logo" className="header-logo-img" />
                        <span className="header-logo-text">EarlyCare</span>
                    </Link>
                ) : (
                    <h2 className="header-page-title">{currentTitle}</h2>
                )}
            </div>
            
            <div className="header-right">
                {!user ? (
                    <nav className="header-nav">
                        <Link to="/login" className="header-nav-link">Sign In</Link>
                        <Link to="/register" className="header-nav-btn glass-btn">Get Started</Link>
                    </nav>
                ) : (
                    <div className="header-actions-container">
                        <div className="header-icon-actions">
                            <Link to="/settings" className="icon-action-btn" title="Settings">
                                ⚙️
                            </Link>
                        </div>
                        <div className="header-divider"></div>
                        <div className="header-profile">
                            <div className="profile-info">
                                <span className="profile-greeting">Welcome back</span>
                                <span className="profile-name">{user.name || user.first_name || user.username || user.email || 'User'}</span>
                            </div>
                            <div className="profile-avatar">
                                {(user.name || user.first_name || user.username || user.email || 'U').charAt(0).toUpperCase()}
                            </div>
                        </div>
                        <button onClick={handleLogout} className="header-logout-btn" title="Logout">
                            <span className="logout-icon">🚪</span>
                            <span className="logout-text">Logout</span>
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
