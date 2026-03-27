import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../api/axiosConfig';
import { ENDPOINTS } from '../api/endpoints';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Register = () => {
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        date_of_birth: '',
        gender: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const { full_name, email, password, confirmPassword, date_of_birth, gender } = formData;
        if (full_name.length < 4) {
            return 'Full name must be at least 4 characters.';
        }
        if (!email.endsWith('@gmail.com')) {
            return 'Email must be a valid @gmail.com address.';
        }
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!strongPasswordRegex.test(password)) {
            return 'Password must be min 8 chars, 1 upper, 1 lower, 1 number, 1 special char.';
        }
        if (password !== confirmPassword) {
            return 'Passwords do not match.';
        }
        if (!date_of_birth) return 'Date of Birth is required.';
        if (!gender) return 'Gender is required.';
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);
        setError('');
        try {
            const response = await axios.post(ENDPOINTS.REGISTER, {
                full_name: formData.full_name,
                email: formData.email,
                password: formData.password,
                confirm_password: formData.confirmPassword,
                phone_number: formData.phone,
                date_of_birth: formData.date_of_birth,
                gender: formData.gender,
            });
            const { user: newUser, token } = response.data;
            if (token) {
                login(newUser, token);
                navigate('/dashboard');
            } else {
                navigate('/login');
            }
        } catch (err) {
            console.error("Registration Error Object:", err);
            console.error("Error Response Data:", err.response?.data);

            let errorMsg = 'Registration failed. Please check your inputs.';
            if (!err.response) {
                errorMsg = 'No response from server. Check if backend is running at ' + process.env.REACT_APP_API_BASE_URL;
            } else if (typeof err.response.data === 'string') {
                errorMsg = 'Server Error: ' + err.response.status;
            } else {
                // If it's a validation object, join errors
                if (err.response.data && typeof err.response.data === 'object') {
                    errorMsg = Object.values(err.response.data).flat().join(' ') || errorMsg;
                }
            }

            setError(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Create Account</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Full Name</label>
                        <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <label>Email (Gmail only)</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <label>Phone Number</label>
                        <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
                    </div>
                    <div className="input-group">
                        <label>Date of Birth</label>
                        <input type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <label>Gender</label>
                        <select name="gender" value={formData.gender} onChange={handleChange} required>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <label>Confirm Password</label>
                        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                    </div>
                    <button type="submit" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
                </form>
                <p>Already have an account? <Link to="/login">Login here</Link></p>
            </div>
        </div>
    );
};

export default Register;
