import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = () => {
    const { user } = useAuth();

    return (
        <div className="home-container">
            <section className="hero-section glass-card">
                <div className="hero-content">
                    <img src="/logo.png" alt="EarlyCare Logo" className="hero-logo-large" />
                    <span className="hero-badge">Next-Gen Medical AI</span>
                    <h1 className="hero-title">EarlyCare Portal</h1>
                    <p className="hero-subtitle">
                        Experience precision medical diagnostics powered by the advanced EarlyCare AI engine. 
                        Your health, simplified.
                    </p>
                    <div className="cta-group">
                        {user ? (
                            <Link to="/dashboard" className="primary-cta">Go to Dashboard</Link>
                        ) : (
                            <>
                                <Link to="/register" className="primary-cta">Get Started</Link>
                                <Link to="/login" className="secondary-cta">Sign In</Link>
                            </>
                        )}
                    </div>
                </div>
            </section>

            <div className="features-grid-unique">
                <div className="feature-card-unique glass-card">
                    <div className="feature-icon-wrapper">🩺</div>
                    <h3>Symptom AI</h3>
                    <p>Instant prediction based on 270+ medical markers with multi-step precision.</p>
                </div>
                <div className="feature-card-unique glass-card">
                    <div className="feature-icon-wrapper">🧬</div>
                    <h3>Health Vault</h3>
                    <p>Securely store and track your medical history in an encrypted glass vault.</p>
                </div>
                <div className="feature-card-unique glass-card">
                    <div className="feature-icon-wrapper">📊</div>
                    <h3>Smart Analytics</h3>
                    <p>Visual health trends and automated report analysis using Gemini AI.</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
