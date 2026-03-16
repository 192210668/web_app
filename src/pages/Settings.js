import React, { useState, useEffect } from 'react';
import axios from '../api/axiosConfig';
import { ENDPOINTS } from '../api/endpoints';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Settings.css';

const Settings = () => {
    const { user, login, logout } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        phone_number: '',
        date_of_birth: '',
        gender: '',
    });
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user?.id) return;
            try {
                const response = await axios.get(ENDPOINTS.PROFILE(user.id));
                const data = response.data;
                setFormData({
                    full_name: data.full_name || '',
                    email: data.email || '',
                    phone_number: data.phone_number || '',
                    date_of_birth: data.date_of_birth || '',
                    gender: data.gender || '',
                });
            } catch (err) {
                console.error("Failed to fetch profile", err);
            }
        };
        fetchProfile();
    }, [user?.id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const response = await axios.patch(ENDPOINTS.PROFILE(user.id), {
                full_name: formData.full_name,
                phone_number: formData.phone_number,
                date_of_birth: formData.date_of_birth,
                gender: formData.gender,
            });

            login({ ...user, ...response.data }, localStorage.getItem('token'));
            setMessage({ type: 'success', text: 'Settings updated successfully!' });
        } catch (err) {
            setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to update settings.' });
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleDeleteAccount = async () => {
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            try {
                // Assuming there's a delete endpoint or just calling logout for now as placeholder
                // await axios.delete(ENDPOINTS.PROFILE(user.id));
                setMessage({ type: 'error', text: 'Delete account functionality not yet implemented on backend.' });
            } catch (err) {
                setMessage({ type: 'error', text: 'Failed to delete account.' });
            }
        }
    };

    const initials = formData.full_name?.split(" ").map(n => n[0]).join("").toUpperCase() || "EC";

    return (
        <div className="settings-container">
            <div className="settings-header">
                <h1>Settings</h1>
                <p>Manage your account and app preferences</p>
            </div>

            {message.text && <div className={`status-message ${message.type}`}>{message.text}</div>}

            <div className="settings-grid">
                {/* Profile Header Card */}
                <div className="settings-card profile-info-card glass-card">
                    <div className="profile-header-content">
                        <div className="avatar-large">{initials}</div>
                        <div className="profile-text">
                            <h2>{formData.full_name || 'EarlyCare User'}</h2>
                            <p>{formData.email}</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="settings-form">
                    {/* Personal Information Section */}
                    <div className="settings-section glass-card">
                        <h3 className="section-title">Personal Information</h3>
                        <div className="input-row">
                            <div className="settings-input-group">
                                <label>Full Name</label>
                                <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} required />
                            </div>
                            <div className="settings-input-group">
                                <label>Phone Number</label>
                                <input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="input-row">
                            <div className="settings-input-group">
                                <label>Date of Birth</label>
                                <input type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} />
                            </div>
                            <div className="settings-input-group">
                                <label>Gender</label>
                                <select name="gender" value={formData.gender} onChange={handleChange}>
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* App Settings Section */}
                    <div className="settings-section glass-card">
                        <h3 className="section-title">App Settings</h3>
                        <div className="setting-toggle-row">
                            <div className="toggle-info">
                                <h4>Notifications</h4>
                                <p>Receive health updates and report analysis alerts.</p>
                            </div>
                            <label className="switch">
                                <input type="checkbox" checked={notificationsEnabled} onChange={() => setNotificationsEnabled(!notificationsEnabled)} />
                                <span className="slider round"></span>
                            </label>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="save-btn" disabled={loading}>
                            {loading ? 'Saving...' : 'Save Settings'}
                        </button>
                    </div>
                </form>

                {/* Account Actions Section */}
                <div className="settings-section danger-zone glass-card">
                    <h3 className="section-title">Account Security</h3>
                    <div className="danger-actions">
                        <button onClick={handleLogout} className="logout-btn-full">
                            <span>🚪</span> Log Out
                        </button>
                        <div className="delete-info">
                            <p>Once you delete your account, there is no going back. Please be certain.</p>
                            <button onClick={handleDeleteAccount} className="delete-btn">
                                🗑️ Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
