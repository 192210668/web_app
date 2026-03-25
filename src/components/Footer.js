import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer-container glass-card">
      <div className="footer-content">
        <div className="footer-section brand">
          <h3 className="footer-logo">EarlyCare</h3>
          <p className="footer-tagline">Empowering your health journey with advanced, accessible care.</p>
        </div>
        
        <div className="footer-section links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/symptoms">Symptom Check</Link></li>
            <li><Link to="/upload">Upload Reports</Link></li>
          </ul>
        </div>
        
        <div className="footer-section legal">
          <h4>Legal</h4>
          <ul>
            <li><Link to="/terms">Terms & Conditions</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/cookie">Cookie Policy</Link></li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h4>Support</h4>
          <ul>
            <li><a href="mailto:EarlyCare@gmail.com">EarlyCare@gmail.com</a></li>
            <li><a href="tel:8484848484">8484848484</a></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} EarlyCare. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
