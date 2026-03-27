import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
    const { user } = useAuth();

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>Welcome, {user?.full_name || 'User'}!</h1>
                <p>Your personal health overview.</p>
            </div>

            <div className="user-info-card">
                <h3>Profile Quick View</h3>
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Full Name:</strong> {user?.full_name}</p>
                {user?.phone_number && <p><strong>Phone:</strong> {user.phone_number}</p>}
            </div>

            <div className="dashboard-actions">
                <Link to="/symptoms" className="action-card">
                    <div className="action-icon">🩺</div>
                    <h3>Symptom Check</h3>
                    <p>Analyze your symptoms and get predictions.</p>
                </Link>
                <Link to="/upload" className="action-card">
                    <div className="action-icon">📄</div>
                    <h3>Upload Reports</h3>
                    <p>Get insights from your medical documents.</p>
                </Link>
                <Link to="/history" className="action-card">
                    <div className="action-icon">⏳</div>
                    <h3>History</h3>
                    <p>View your past checkups and results.</p>
                </Link>
                <Link to="/settings" className="action-card">
                    <div className="action-icon">⚙️</div>
                    <h3>Settings</h3>
                    <p>Manage your account and preferences.</p>
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;
