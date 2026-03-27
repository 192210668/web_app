import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../api/axiosConfig';
import { ENDPOINTS } from '../api/endpoints';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await axios.post(ENDPOINTS.LOGIN, {
                email: formData.email,
                password: formData.password,
            });
            // response.data should contain user details and access token
            const { user, token } = response.data;
            login(user, token);
            navigate('/dashboard');
        } catch (err) {
            console.error("Login Error Object:", err);
            console.error("Error Response Data:", err.response?.data);

            let errorMsg = 'Login failed. Please check your credentials.';
            if (!err.response) {
                errorMsg = 'No response from server. Check if backend is running at ' + process.env.REACT_APP_API_BASE_URL;
            } else if (typeof err.response.data === 'string') {
                errorMsg = 'Server Error: ' + err.response.status;
            } else {
                errorMsg = err.response.data.error || err.response.data.detail || err.response.data.message || errorMsg;
            }

            setError(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Login</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                    </div>
                    <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
                </form>
                <p>Don't have an account? <Link to="/register">Register here</Link></p>
            </div>
        </div>
    );
};

export default Login;
